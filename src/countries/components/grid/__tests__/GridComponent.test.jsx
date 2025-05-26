import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GridComponent } from '../GridComponent';
import { BrowserRouter } from 'react-router-dom';

const mockCountries = [
    {
        cca2: 'ES',
        name: { common: 'Spain' },
        population: 47000000,
        area: 505990,
        region: 'Europe',
        flags: { png: 'spain-flag.png' }
    },
    {
        cca2: 'FR',
        name: { common: 'France' },
        population: 67000000,
        area: 551695,
        region: 'Europe',
        flags: { png: 'france-flag.png' }
    }
];

describe('GridComponent', () => {
    test('should render headers correctly', () => {
        render(
            <BrowserRouter>
                <GridComponent countriesList={mockCountries} />
            </BrowserRouter>
        );
        
        const headers = ['Flag', 'Name', 'Population', 'Area (km²)', 'Region'];
        headers.forEach(header => {
            expect(screen.getByText(header)).toBeInTheDocument();
        });
    });

    test('should render a GridItem for each country', () => {
        render(
            <BrowserRouter>
                <GridComponent countriesList={mockCountries} />
            </BrowserRouter>
        );

        mockCountries.forEach(country => {
            expect(screen.getByText(country.name.common)).toBeInTheDocument();
        });

        const countryElements = screen.getAllByRole('link');
        expect(countryElements).toHaveLength(mockCountries.length);
    });

    test('should handle empty country list', () => {
        render(
            <BrowserRouter>
                <GridComponent countriesList={[]} />
            </BrowserRouter>
        );

        const headers = screen.getByText('Flag');
        expect(headers).toBeInTheDocument();
 
        const countryElements = screen.queryAllByRole('link');
        expect(countryElements).toHaveLength(0);
    });
}); 