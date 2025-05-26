import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AdditionalInfoComponent } from '../AdditionalInfoComponent';

const mockCountryDetails = {
    area: 9833517,
    currencies: {
        USD: { name: 'United States dollar', symbol: '$' },
    },
    languages: {
        eng: 'English',
    },
    unMember: true,
    independent: false,
    maps: {
        googleMaps: 'https://maps.google.com/?q=usa',
    },
};

describe('AdditionalInfoComponent', () => {
    describe('with complete data', () => {
        beforeEach(() => {
            render(<AdditionalInfoComponent countryDetails={mockCountryDetails} />);
        });

        it('should render area with formatting', () => {
            expect(screen.getByText('9.833.517 km²')).toBeInTheDocument();
        });

        it('should render currencies correctly', () => {
            expect(screen.getByText('United States dollar ($)')).toBeInTheDocument();
        });

        it('should render languages correctly', () => {
            expect(screen.getByText('English')).toBeInTheDocument();
        });

        it('should render UN membership and independence status with correct colors', () => {
            const statusDots = screen.getAllByTestId('status-dot');
            expect(statusDots[0].className).toContain('bg-green-500');
            expect(statusDots[1].className).toContain('bg-red-500');
        });

        it('should render Google Maps link if available', () => {
            const link = screen.getByRole('link', { name: /view on google maps/i });
            expect(link).toHaveAttribute('href', mockCountryDetails.maps.googleMaps);
        });
    });

    describe('with missing Google Maps', () => {
        it('should not render Google Maps section if link is missing', () => {
            const countryWithoutMap = { ...mockCountryDetails, maps: null };
            render(<AdditionalInfoComponent countryDetails={countryWithoutMap} />);
            expect(screen.queryByText(/view on google maps/i)).not.toBeInTheDocument();
        });
    });

    describe('with missing area, currencies, and languages', () => {
        it('should fallback to N/A for missing area, currencies, and languages', () => {
            const emptyCountry = {
                unMember: false,
                independent: true,
            };
            render(<AdditionalInfoComponent countryDetails={emptyCountry} />);
            expect(screen.getByText('N/A km²')).toBeInTheDocument();
            expect(screen.getAllByText('N/A').length).toBeGreaterThan(0);
        });
    });
});
