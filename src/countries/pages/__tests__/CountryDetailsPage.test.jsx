import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import * as api from '../../../store/api/countriesApi';
import { CountryDetailsPage } from '../CountryDetailsPage';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
    useParams: () => ({ code: 'US' }),
}));

describe('CountryDetailsPage', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('shows loading state', () => {
        vi.spyOn(api, 'useGetCountryByCountryCodeQuery').mockReturnValue({
            data: null,
            isLoading: true,
            isError: false,
        });

        render(<CountryDetailsPage />);
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });

    it('shows error state when there is an error', () => {
        vi.spyOn(api, 'useGetCountryByCountryCodeQuery').mockReturnValue({
            data: null,
            isLoading: false,
            isError: true,
        });

        render(<CountryDetailsPage />);
        expect(screen.getByText(/error loading country data/i)).toBeInTheDocument();
    });

    it('shows error state when no countryDetails', () => {
        vi.spyOn(api, 'useGetCountryByCountryCodeQuery').mockReturnValue({
            data: [],
            isLoading: false,
            isError: false,
        });

        render(<CountryDetailsPage />);
        expect(screen.getByText(/error loading country data/i)).toBeInTheDocument();
    });

    it('renders country details correctly when data is loaded', () => {
        const mockCountry = {
            cca2: 'US',
            name: { common: 'United States' },
            region: 'Americas',
            borders: ['CAN', 'MEX'],
            population: 331000000,
            area: 9834000,
            flags: { svg: 'https://flagcdn.com/us.svg' },
            unMember: true,
            independent: true,
        };

        vi.spyOn(api, 'useGetCountryByCountryCodeQuery').mockReturnValue({
            data: [mockCountry],
            isLoading: false,
            isError: false,
        });

        render(<CountryDetailsPage />);

        const elements = screen.getAllByText(/united states/i);
        expect(elements.length).toBeGreaterThan(0);

        expect(screen.getByText(/← back/i)).toBeInTheDocument();
        expect(screen.getByText(/country list/i)).toBeInTheDocument();
    });

    it('calls navigate(-1) when clicking Back button', () => {
        const mockCountry = {
            cca2: 'US',
            name: { common: 'United States' },
            region: 'Americas',
            borders: [],
            population: 331000000,
            area: 9834000,
            flags: { svg: 'https://flagcdn.com/us.svg' },
            unMember: true,
            independent: true,
        };

        vi.spyOn(api, 'useGetCountryByCountryCodeQuery').mockReturnValue({
            data: [mockCountry],
            isLoading: false,
            isError: false,
        });

        render(<CountryDetailsPage />);
        fireEvent.click(screen.getByText(/← back/i));
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it('calls navigate("/") when clicking Country List button', () => {
        const mockCountry = {
            cca2: 'US',
            name: { common: 'United States' },
            region: 'Americas',
            borders: [],
            population: 331000000,
            area: 9834000,
            flags: { svg: 'https://flagcdn.com/us.svg' },
            unMember: true,
            independent: true,
        };

        vi.spyOn(api, 'useGetCountryByCountryCodeQuery').mockReturnValue({
            data: [mockCountry],
            isLoading: false,
            isError: false,
        });

        render(<CountryDetailsPage />);
        fireEvent.click(screen.getByText(/country list/i));
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
