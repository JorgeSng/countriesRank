import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../AppRouter';
import { AuthContext } from '../../auth/context/AuthContext';

vi.mock('../../auth/pages/LoginPage', () => ({
    LoginPage: () => <div data-testid="login-page">LoginPage</div>,
}));

vi.mock('../../countries/routes/CountryRoutes', () => ({
    CountryRoutes: () => <div data-testid="country-routes">CountryRoutes</div>,
}));

describe('AppRouter', () => {
    const renderWithAuth = (authState, initialEntries = ['/']) =>
        render(
            <AuthContext.Provider value={{ authState }}>
                <MemoryRouter initialEntries={initialEntries}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );

    it('should render LoginPage if not authenticated and path is /login', () => {
        renderWithAuth({ logged: false }, ['/login']);
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });

    it('should redirect to /countries if authenticated and path is /login', () => {
        renderWithAuth({ logged: true }, ['/login']);
        expect(screen.getByTestId('country-routes')).toBeInTheDocument();
    });

    it('should render CountryRoutes if authenticated and path is /', () => {
        renderWithAuth({ logged: true }, ['/']);
        expect(screen.getByTestId('country-routes')).toBeInTheDocument();
    });

    it('should redirect to /login if not authenticated and path is /', () => {
        renderWithAuth({ logged: false }, ['/']);
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });
}); 