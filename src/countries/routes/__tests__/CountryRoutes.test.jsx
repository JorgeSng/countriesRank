import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CountryRoutes } from '../CountryRoutes';

vi.mock('../../pages/CountryPage', () => ({
    CountryPage: () => <div data-testid="country-page">CountryPage</div>,
}));

vi.mock('../../pages/CountryDetailsPage', () => ({
    CountryDetailsPage: () => <div data-testid="country-details-page">CountryDetailsPage</div>,
}));

describe('CountryRoutes', () => {
    it('should render CountryPage on /countries', () => {
        render(
            <MemoryRouter initialEntries={["/countries"]}>
                <CountryRoutes />
            </MemoryRouter>
        );
        expect(screen.getByTestId('country-page')).toBeInTheDocument();
    });

    it('should render CountryDetailsPage on /details/:code', () => {
        render(
            <MemoryRouter initialEntries={["/details/ES"]}>
                <CountryRoutes />
            </MemoryRouter>
        );
        expect(screen.getByTestId('country-details-page')).toBeInTheDocument();
    });

    it('should redirect / to /countries', () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/*" element={<CountryRoutes />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByTestId('country-page')).toBeInTheDocument();
    });
});
