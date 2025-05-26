import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GridComponent } from '../GridComponent';

vi.mock('../GridItem', () => ({
    GridItem: ({ country }) => (
        <div data-testid="mock-grid-item">{country.name.common}</div>
    ),
}));

const mockCountries = [
    {
        cca2: 'US',
        name: { common: 'United States' },
        flags: { png: 'https://flagcdn.com/us.png' },
        population: 331002651,
        area: 9833517,
        region: 'Americas',
    },
    {
        cca2: 'FR',
        name: { common: 'France' },
        flags: { png: 'https://flagcdn.com/fr.png' },
        population: 67399000,
        area: 551695,
        region: 'Europe',
    },
];

describe('GridComponent', () => {
    it('should render desktop headers', () => {
        render(<GridComponent countriesList={mockCountries} />);

        expect(screen.getByText('Flag')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Population')).toBeInTheDocument();
        expect(screen.getByText('Area (km²)')).toBeInTheDocument();
        expect(screen.getByText('Region')).toBeInTheDocument();
    });

    it('should render mobile headers', () => {
        render(<GridComponent countriesList={mockCountries} />);

        expect(screen.getByText('Info')).toBeInTheDocument();
        expect(screen.getByText('Details')).toBeInTheDocument();
    });

    it('should render a GridItem for each country', () => {
        render(<GridComponent countriesList={mockCountries} />);

        const items = screen.getAllByTestId('mock-grid-item');
        expect(items.length).toBe(mockCountries.length);
        expect(items[0]).toHaveTextContent('United States');
        expect(items[1]).toHaveTextContent('France');
    });

    it('should handle countriesList wrapped in object under "countries" key', () => {
        render(<GridComponent countriesList={{ countries: mockCountries }} />);

        const items = screen.getAllByTestId('mock-grid-item');
        expect(items.length).toBe(mockCountries.length);
    });

    it('should render nothing if countriesList is empty', () => {
        render(<GridComponent countriesList={[]} />);

        expect(screen.queryAllByTestId('mock-grid-item').length).toBe(0);
    });
});
