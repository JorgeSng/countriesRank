import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HeaderComponent } from '../HeaderComponent';
import { AuthContext } from '../../../../auth/context/AuthContext';

const mockNavigate = vi.fn();
const mockLogout = vi.fn();
const authState = { user: { name: 'Jorge' } };

vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('HeaderComponent', () => {
    beforeEach(() => {
        mockLogout.mockClear();
        mockNavigate.mockClear();
    });

    const renderHeader = (props = {}) =>
        render(
            <AuthContext.Provider value={{ authState, logout: mockLogout }}>
                <HeaderComponent totalCountries={42} searchTerm="" {...props} />
            </AuthContext.Provider>
        );

    it('displays the total number of countries', () => {
        renderHeader();
        expect(screen.getByText(/found 42 countries/i)).toBeInTheDocument();
    });

    it('renders the input with the given searchTerm', () => {
        renderHeader({ searchTerm: 'Spain' });
        expect(screen.getByPlaceholderText(/search country/i)).toHaveValue('Spain');
    });

    it('calls onSearchSubmit when pressing Enter', () => {
        const handleSubmit = vi.fn();
        renderHeader({ searchTerm: '', onSearchSubmit: handleSubmit });

        const input = screen.getByPlaceholderText(/search country/i);
        fireEvent.change(input, { target: { value: 'France' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

        expect(handleSubmit).toHaveBeenCalledWith('France');
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('displays the user name', () => {
        renderHeader();
        expect(screen.getByText('Jorge')).toBeInTheDocument();
    });

    it('calls logout and navigates to /login on logout click', () => {
        renderHeader();
        fireEvent.click(screen.getByText(/logout/i));
        expect(mockLogout).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
    });
});
