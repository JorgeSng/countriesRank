import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CountryPage } from '../CountryPage';
import * as api from '../../../store/api/countriesApi';
import * as useCountryHook from '../../hooks/useCountry';

const mockSetCountries = vi.fn();
const mockSetSearchTerm = vi.fn();
const mockSortBy = vi.fn();
const mockFilterByRegion = vi.fn();
const mockToggleStatusFilter = vi.fn();

const mockCountries = [
    {
        name: { common: 'Spain' },
        region: 'Europe',
        population: 47000000,
        area: 505990,
        flags: { svg: 'https://flagcdn.com/es.svg' },
        unMember: true,
        independent: true,
    },
    {
        name: { common: 'Brazil' },
        region: 'Americas',
        population: 211000000,
        area: 8515767,
        flags: { svg: 'https://flagcdn.com/br.svg' },
        unMember: true,
        independent: true,
    },
];

const baseUseCountries = {
    countries: mockCountries,
    selectedRegions: [],
    filters: { unMember: false, independent: false },
    searchTerm: '',
    setCountries: mockSetCountries,
    setSearchTerm: mockSetSearchTerm,
    sortBy: mockSortBy,
    filterByRegion: mockFilterByRegion,
    toggleStatusFilter: mockToggleStatusFilter,
};

const mockUseCountries = (overrides = {}) => {
    vi.spyOn(useCountryHook, 'useCountries').mockReturnValue({
        ...baseUseCountries,
        ...overrides,
    });
};

const mockApiCountries = (data = mockCountries, isLoading = false) => {
    vi.spyOn(api, 'useGetCountriesQuery').mockReturnValue({ data, isLoading });
};

const renderCountryPage = () =>
    render(
        <MemoryRouter>
            <CountryPage />
        </MemoryRouter>
    );

vi.mock('../../components/header/HeaderComponent');

vi.mock('../../components/sidebar/SideBarComponent');

vi.mock('../../components/grid/GridComponent');

describe('CountryPage', () => {
    beforeEach(() => { 
        vi.resetAllMocks();
    });

    it('should show loading state', () => {
        mockApiCountries(null, true);
        mockUseCountries({ countries: [] });
        renderCountryPage();
        expect(screen.getByTestId('skeleton-grid')).toBeInTheDocument();
    });

    it('should render countries and header', () => {
        mockApiCountries();
        mockUseCountries();
        renderCountryPage();
        expect(screen.getByTestId('header-component')).toBeInTheDocument();
        expect(screen.getByTestId('sidebar-component')).toBeInTheDocument();
        expect(screen.getByTestId('grid-component')).toBeInTheDocument();
        expect(screen.getAllByTestId('country-item')).toHaveLength(2);
        expect(screen.getByText('Spain')).toBeInTheDocument();
        expect(screen.getByText('Brazil')).toBeInTheDocument();
    });

    it('should call setSearchTerm when typing in search', () => {
        mockApiCountries();
        mockUseCountries();
        renderCountryPage();
        const input = screen.getByTestId('search-input');
        fireEvent.change(input, { target: { value: 'Bra' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
        expect(mockSetSearchTerm).toHaveBeenCalledWith('Bra');
    });

    it('should call sortBy when clicking sort button', () => {
        mockApiCountries();
        mockUseCountries();
        renderCountryPage();
        fireEvent.click(screen.getByTestId('sort-btn'));
        expect(mockSortBy).toHaveBeenCalledWith('name');
    });

    it('should call filterByRegion when clicking region button', () => {
        mockApiCountries();
        mockUseCountries();
        renderCountryPage();
        fireEvent.click(screen.getByTestId('region-btn'));
        expect(mockFilterByRegion).toHaveBeenCalledWith('Europe', true);
    });

    it('should call toggleStatusFilter when clicking UN filter button', () => {
        mockApiCountries();
        mockUseCountries();
        renderCountryPage();
        fireEvent.click(screen.getByTestId('un-btn'));
        expect(mockToggleStatusFilter).toHaveBeenCalledWith('unMember', true);
    });
});