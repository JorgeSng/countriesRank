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

const renderComponent = (country = mockCountry) => {
    return render(
        <MemoryRouter>
            <GridItem country={country} />
        </MemoryRouter>
    );
};

describe('GridItem', () => {
    it('should render country name and region', () => {
        renderComponent();

        expect(screen.getAllByText('United States').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Americas').length).toBeGreaterThan(0);
    });

    it('should render country population and area formatted', () => {
        renderComponent();

        const populationText = mockCountry.population.toLocaleString();
        const areaText = mockCountry.area.toLocaleString();

        expect(screen.getAllByText(populationText)[0]).toBeInTheDocument();
        expect(screen.getAllByText(areaText)[0]).toBeInTheDocument();
    });

    it('should render country flag image', () => {
        renderComponent();

        const image = screen.getAllByRole('img', { name: /united states/i })[0];
        expect(image).toHaveAttribute('src', mockCountry.flags.png);
    });

    it('should link to the correct country details page', () => {
        renderComponent();

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', `/details/${mockCountry.cca2}`);
    });

    it('should render N/A if area is missing', () => {
        const countryWithoutArea = { ...mockCountry, area: null };
        renderComponent(countryWithoutArea);

        expect(screen.getAllByText('N/A').length).toBeGreaterThan(0);
    });
});
