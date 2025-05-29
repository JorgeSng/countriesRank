import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginPage } from '../LoginPage';
import { AuthContext } from '../../../auth/context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = vi.fn();
const mockLogin = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('LoginPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    const renderLoginPage = () =>
        render(
            <AuthContext.Provider value={{ login: mockLogin }}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </AuthContext.Provider>
        );

    it('should render title and login button', () => {
        renderLoginPage();

        const loginTexts = screen.getAllByText('Login');
        expect(loginTexts).toHaveLength(2);
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    it('should call login and navigate to lastPath in localStorage', () => {
        localStorage.setItem('lastPath', '/countries');

        renderLoginPage();
        fireEvent.click(screen.getByRole('button', { name: 'Login' }));

        expect(mockLogin).toHaveBeenCalledWith('Jorge Almeida');
        expect(mockNavigate).toHaveBeenCalledWith('/countries', { replace: true });
    });

    it('should default to root path if no lastPath in localStorage', () => {
        renderLoginPage();
        fireEvent.click(screen.getByRole('button', { name: 'Login' }));

        expect(mockLogin).toHaveBeenCalledWith('Jorge Almeida');
        expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    });
});
