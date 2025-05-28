import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PrivateRoute } from '../PrivateRouter';
import { AuthContext } from '../../auth/context/AuthContext';

vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useLocation: () => ({ pathname: '/private', search: '' }),
        Navigate: ({ to }) => <div data-testid="navigate">Redirected to {to}</div>,
    };
});

describe('PrivateRoute', () => {
    const renderWithAuth = (authState, children = <div data-testid="private-child">Private</div>) =>
        render(
            <AuthContext.Provider value={{ authState }}>
                <MemoryRouter>
                    <PrivateRoute>{children}</PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

    beforeEach(() => {
        localStorage.clear();
    });

    it('should render children if authenticated', () => {
        renderWithAuth({ logged: true });
        expect(screen.getByTestId('private-child')).toBeInTheDocument();
    });

    it('should redirect to /login if not authenticated', () => {
        renderWithAuth({ logged: false });
        expect(screen.getByTestId('navigate')).toHaveTextContent('Redirected to /login');
    });

    it('should save last path in localStorage', () => {
        renderWithAuth({ logged: true });
        expect(localStorage.getItem('lastPath')).toBe('/private');
    });
}); 