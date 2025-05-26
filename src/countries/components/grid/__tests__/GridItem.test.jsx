import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GridItem } from '../GridItem';
import { BrowserRouter } from 'react-router-dom';

const mockCountry = {
    cca2: 'ES',
    name: { common: 'Spain' },
    population: 47000000,
    area: 505990,
    region: 'Europe',
    flags: { 
        png: 'https://example.com/spain-flag.png'
    }
};

const renderWithRouter = (component) => { 
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('GridItem', () => {
    test('should render country information correctly', () => {
        renderWithRouter(<GridItem country={mockCountry} />);

        expect(screen.getByText('Spain')).toBeInTheDocument();
        expect(screen.getByText('Europe')).toBeInTheDocument();

        const flagImage = screen.getByAltText('Spain');
        expect(flagImage).toBeInTheDocument();
        expect(flagImage).toHaveAttribute('src', 'https://example.com/spain-flag.png');
    });

    test('should format numbers correctly', () => {
        renderWithRouter(<GridItem country={mockCountry} />);

        const populationText = screen.getByText((content) => {
            return content.includes('47') && content.includes('000') && content.includes('000');
        });
        expect(populationText).toBeInTheDocument();

        const areaText = screen.getByText((content) => {
            return content.includes('505') && content.includes('990');
        });
        expect(areaText).toBeInTheDocument();
    });

    test('should render N/A for missing area', () => {
        const countryWithoutArea = {
            ...mockCountry,
            area: null
        };
        renderWithRouter(<GridItem country={countryWithoutArea} />);
        
        expect(screen.getByText('N/A')).toBeInTheDocument();
    });

    test('should have correct link to details', () => {
        renderWithRouter(<GridItem country={mockCountry} />);
        
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/details/ES');
    });
}); 