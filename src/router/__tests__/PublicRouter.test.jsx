import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PublicRoute } from '../PublicRouter';
import { AuthContext } from '../../auth/context/AuthContext';

vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        Navigate: ({ to }) => <div data-testid="navigate">Redirected to {to}</div>,
    };
});

describe('PublicRoute', () => {
    const renderWithAuth = (authState, children = <div data-testid="public-child">Public</div>) =>
        render(
            <AuthContext.Provider value={{ authState }}>
                <MemoryRouter>
                    <PublicRoute>{children}</PublicRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

    it('should render children if not authenticated', () => {
        renderWithAuth({ logged: false });
        expect(screen.getByTestId('public-child')).toBeInTheDocument();
    });

    it('should redirect to /countries if authenticated', () => {
        renderWithAuth({ logged: true });
        expect(screen.getByTestId('navigate')).toHaveTextContent('Redirected to /countries');
    });
}); 