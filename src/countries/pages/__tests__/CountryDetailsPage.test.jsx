import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import * as api from '../../../store/api/countriesApi';
import { CountryDetailsPage } from '../CountryDetailsPage';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
    useParams: () => ({ code: 'US' }),
}));

vi.mock('../../components/countryDetails/MainInfoComponent', () => ({
    MainInfoComponent: (props) => (
        <div data-testid="main-info" data-country={props.countryDetails?.name?.common}></div>
    ),
}));

vi.mock('../../components/countryDetails/AdditionalInfoComponent', () => ({
    AdditionalInfoComponent: (props) => (
        <div data-testid="additional-info" data-country={props.countryDetails?.name?.common}></div>
    ),
}));

vi.mock('../../components/countryDetails/CountryNeighborsComponent', () => ({
    CountryNeighborsComponent: (props) => (
        <div data-testid="neighbors" data-borders={props.borders?.join(',')}></div>
    ),
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
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

    it('shows error state when there is an error', () => {
        vi.spyOn(api, 'useGetCountryByCountryCodeQuery').mockReturnValue({
            data: null,
            isLoading: false,
            isError: true,
        });

        render(<CountryDetailsPage />);
        expect(screen.getByText('Error loading country data')).toBeInTheDocument();
    });

    it('shows error state when no countryDetails', () => {
        vi.spyOn(api, 'useGetCountryByCountryCodeQuery').mockReturnValue({
            data: [],
            isLoading: false,
            isError: false,
        });

        render(<CountryDetailsPage />);
        expect(screen.getByText(/Error loading country data/i)).toBeInTheDocument();
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

        expect(screen.getByTestId('main-info')).toBeInTheDocument();
        expect(screen.getByTestId('main-info')).toHaveAttribute('data-country', 'United States');

        expect(screen.getByTestId('additional-info')).toBeInTheDocument();
        expect(screen.getByTestId('additional-info')).toHaveAttribute('data-country', 'United States');

        expect(screen.getByTestId('neighbors')).toBeInTheDocument();
        expect(screen.getByTestId('neighbors')).toHaveAttribute('data-borders', 'CAN,MEX');

        expect(screen.getByText('← Back')).toBeInTheDocument();
        expect(screen.getByText('Country List')).toBeInTheDocument();
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
        fireEvent.click(screen.getByText(/Back/i));
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
        fireEvent.click(screen.getByText(/Country List/i));
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
