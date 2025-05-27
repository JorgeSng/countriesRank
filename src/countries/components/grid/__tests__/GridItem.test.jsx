import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GridItem } from '../GridItem';

const mockCountry = {
    cca2: 'US',
    name: { common: 'United States' },
    flags: { png: 'https://flagcdn.com/us.png' },
    population: 331002651,
    area: 9833517,
    region: 'Americas',
};

describe('GridItem', () => {
    it('should render country name, flag, population, area and region', () => {
        render(
            <MemoryRouter>
                <GridItem country={mockCountry} />
            </MemoryRouter>
        );

        expect(screen.getAllByText(/United States/i)).toHaveLength(2); 
        expect(screen.getAllByText(/Americas/i)).toHaveLength(2);

        const img = screen.getAllByRole('img', { name: /United States/i })[0];
        expect(img).toHaveAttribute('src', mockCountry.flags.png);

        expect(screen.getAllByText(/331.002.651/)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/9.833.517/)[0]).toBeInTheDocument();
    });

    it('should navigate to the correct details page on click', () => {
        render(
            <MemoryRouter>
                <GridItem country={mockCountry} />
            </MemoryRouter>
        );

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/details/US');
    });

    it('should render "N/A" if area is missing', () => {
        const countryWithoutArea = { ...mockCountry, area: null };

        render(
            <MemoryRouter>
                <GridItem country={countryWithoutArea} />
            </MemoryRouter>
        );

        expect(screen.getAllByText(/N\/A/)[0]).toBeInTheDocument();
    });
});
