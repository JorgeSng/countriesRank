import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import * as api from '../../../store/api/countriesApi';
import { CountryDetailsPage } from '../CountryDetailsPage';

const mockNavigate = vi.fn();

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

const mockApi = (data, isLoading = false, isError = false) => {
    vi.spyOn(api, 'useGetCountryByCountryCodeQuery').mockReturnValue({
        data,
        isLoading,
        isError,
    });
};

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

    it('should show loading state', () => {
        mockApi(null, true, false);
        render(<CountryDetailsPage />);
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

    it('should show error state', () => {
        mockApi(null, false, true);
        render(<CountryDetailsPage />);
        expect(screen.getByText('Error loading country data')).toBeInTheDocument();
    });

    it('should show error state when no country details', () => {
        mockApi([], false, false);
        render(<CountryDetailsPage />);
        expect(screen.getByText(/Error loading country data/i)).toBeInTheDocument();
    });

    it('should render country details correctly', () => {
        mockApi([mockCountry]);
        render(<CountryDetailsPage />);
        expect(screen.getByTestId('main-info')).toHaveAttribute('data-country', 'United States');
        expect(screen.getByTestId('additional-info')).toHaveAttribute('data-country', 'United States');
        expect(screen.getByTestId('neighbors')).toHaveAttribute('data-borders', 'CAN,MEX');
        expect(screen.getByText('← Back')).toBeInTheDocument();
        expect(screen.getByText('Country List')).toBeInTheDocument();
    });

    it('should navigate back when clicking Back button', () => {
        mockApi([mockCountry]);
        render(<CountryDetailsPage />);
        fireEvent.click(screen.getByText(/Back/i));
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it('should navigate to country list when clicking Country List button', () => {
        mockApi([mockCountry]);
        render(<CountryDetailsPage />);
        fireEvent.click(screen.getByText(/Country List/i));
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
