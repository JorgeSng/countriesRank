import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MainInfoComponent } from '../MainInfoComponent';

const mockCountryDetails = {
    flags: {
        svg: 'https://flagcdn.com/us.svg',
        png: 'https://flagcdn.com/us.png',
        alt: 'Flag of United States',
    },
    name: {
        common: 'United States',
        official: 'United States of America',
    },
    capital: ['Washington D.C.'],
    region: 'Americas',
    subregion: 'Northern America',
    population: 331002651,
};

describe('MainInfoComponent', () => {
    it('should render flag image with correct src and alt', () => {
        render(<MainInfoComponent countryDetails={mockCountryDetails} />);
        const img = screen.getByRole('img', { name: /flag of united states/i });
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', mockCountryDetails.flags.svg);
        expect(img).toHaveAttribute('alt', mockCountryDetails.flags.alt);
    });

    it('should render common and official country names', () => {
        render(<MainInfoComponent countryDetails={mockCountryDetails} />);
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(mockCountryDetails.name.common);
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(mockCountryDetails.name.official);
    });

    it('should render capital, region, subregion and formatted population', () => {
        render(<MainInfoComponent countryDetails={mockCountryDetails} />);
        expect(screen.getByText('Capital').nextSibling).toHaveTextContent('Washington D.C.');
        expect(screen.getByText('Region').nextSibling).toHaveTextContent('Americas');
        expect(screen.getByText('Subregion').nextSibling).toHaveTextContent('Northern America');
        expect(screen.getByText('Population').nextSibling).toHaveTextContent('331.002.651');
    });

    it('should render N/A for missing capital, region, subregion, and population', () => {
        const incompleteCountry = {
            flags: {},
            name: {},
            capital: null,
            region: null,
            subregion: null,
            population: null,
        };
        render(<MainInfoComponent countryDetails={incompleteCountry} />);

        expect(screen.getByText('Capital').nextSibling).toHaveTextContent('N/A');
        expect(screen.getByText('Region').nextSibling).toHaveTextContent('N/A');
        expect(screen.getByText('Subregion').nextSibling).toHaveTextContent('N/A');
        expect(screen.getByText('Population').nextSibling).toHaveTextContent('N/A');

        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('alt', 'Flag of ');
    });
});
