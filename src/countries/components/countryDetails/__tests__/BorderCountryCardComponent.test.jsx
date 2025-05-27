import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BorderCountryCardComponent } from '../BorderCountryCardComponent';
import * as api from '../../../../store/api/countriesApi';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}));

describe('BorderCountryCardComponent', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should render loading skeleton when loading', () => {
        vi.spyOn(api, 'useGetCountryByCountryCodeQuery').mockReturnValue({
            data: null,
            isLoading: true,
            isError: false,
        });

        render(<BorderCountryCardComponent countryCode="US" />);
        expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
    });

    it('should render error message if error or no data', () => {
        vi.spyOn(api, 'useGetCountryByCountryCodeQuery').mockReturnValue({
            data: null,
            isLoading: false,
            isError: true,
        });

        render(<BorderCountryCardComponent countryCode="ES" />);
        expect(screen.getByText('Error loading country')).toBeInTheDocument();
    });

    it('should render country info when data is loaded', () => {
        const mockCountry = {
            cca2: 'US',
            name: { common: 'United States' },
            flags: { svg: 'https://flagcdn.com/us.svg' },
        };

        vi.spyOn(api, 'useGetCountryByCountryCodeQuery').mockReturnValue({
            data: [mockCountry],
            isLoading: false,
            isError: false,
        });

        render(<BorderCountryCardComponent countryCode="US" />);
        expect(screen.getByRole('img')).toHaveAttribute('src', mockCountry.flags.svg);
        expect(screen.getByRole('img')).toHaveAttribute('alt', `Flag of ${mockCountry.name.common}`);
        expect(screen.getByText(mockCountry.name.common)).toBeInTheDocument();
    });

    it('should navigate to country details page on click', () => {
        const mockCountry = {
            cca2: 'US',
            name: { common: 'United States' },
            flags: { svg: 'https://flagcdn.com/us.svg' },
        };

        vi.spyOn(api, 'useGetCountryByCountryCodeQuery').mockReturnValue({
            data: [mockCountry],
            isLoading: false,
            isError: false,
        });

        render(<BorderCountryCardComponent countryCode="US" />);
        const card = screen.getByText(mockCountry.name.common).parentElement;
        fireEvent.click(card);
        expect(mockNavigate).toHaveBeenCalledWith('/details/US');
    });
});
