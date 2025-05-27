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

vi.mock('../../components/header/HeaderComponent', () => ({
    HeaderComponent: (props) => (
        <div data-testid="header-component">
            <span data-testid="total-countries">{props.totalCountries}</span>
            <input
                data-testid="search-input"
                value={props.searchTerm}
                onChange={e => props.onSearchChange(e.target.value)}
            />
        </div>
    ),
}));

vi.mock('../../components/sidebar/SideBarComponent', () => ({
    SideBarComponent: (props) => (
        <div data-testid="sidebar-component">
            <button data-testid="sort-btn" onClick={() => props.sortBy('name')}>Sort by Name</button>
            <button data-testid="region-btn" onClick={() => props.filterByRegion('Europe', true)}>Filter Europe</button>
            <button data-testid="un-btn" onClick={() => props.toggleStatusFilter('unMember', true)}>Filter UN</button>
        </div>
    ),
}));

vi.mock('../../components/grid/GridComponent', () => ({
    GridComponent: (props) => (
        <div data-testid="grid-component">
            {props.countriesList.map(c => (
                <div key={c.name.common} data-testid="country-item">{c.name.common}</div>
            ))}
        </div>
    ),
}));

describe('CountryPage', () => {
    beforeEach(() => { 
        vi.resetAllMocks();
    });

    it('should show loading state', () => {
        mockApiCountries(null, true);
        mockUseCountries({ countries: [] });
        renderCountryPage();
        expect(screen.getByText(/Loading countries/i)).toBeInTheDocument();
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
        fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'Bra' } });
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