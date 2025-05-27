import { describe, it, expect } from 'vitest';
import { countryReducer } from '../countryReducer';

const initialState = {
    countries: [],
    selectedRegions: [],
    filters: {
        unMember: false,
        independent: false
    },
    searchTerm: ''
};

const mockCountries = [
    { name: { common: 'France' }, population: 67000000, area: 551695, region: 'Europe' },
    { name: { common: 'Brazil' }, population: 210000000, area: 8515767, region: 'Americas' }
];

describe('countryReducer', () => {
    it('should return initial state when action is unknown', () => {
        const newState = countryReducer(initialState, { type: 'UNKNOWN_ACTION' });
        expect(newState).toEqual(initialState);
    });

    it('should handle [COUNTRIES] Add Countries', () => {
        const newState = countryReducer(initialState, {
            type: '[COUNTRIES] Add Countries',
            payload: mockCountries
        });
        expect(newState.countries).toEqual(mockCountries);
    });

    it('should handle [COUNTRIES] Set Search Term', () => {
        const newState = countryReducer(initialState, {
            type: '[COUNTRIES] Set Search Term',
            payload: 'brazil'
        });
        expect(newState.searchTerm).toBe('brazil');
    });

    it('should handle [COUNTRIES] Sort by name', () => {
        const unsortedState = { ...initialState, countries: mockCountries };
        const newState = countryReducer(unsortedState, {
            type: '[COUNTRIES] Sort by',
            payload: 'name'
        });
        expect(newState.countries.map(c => c.name.common)).toEqual(['Brazil', 'France']);
    });

    it('should handle [COUNTRIES] Filter by Region - add region', () => {
        const newState = countryReducer(initialState, {
            type: '[COUNTRIES] Filter by Region',
            payload: { region: 'Europe', selected: true }
        });
        expect(newState.selectedRegions).toEqual(['Europe']);
    });

    it('should handle [COUNTRIES] Filter by Region - remove region', () => {
        const currentState = { ...initialState, selectedRegions: ['Europe', 'Asia'] };
        const newState = countryReducer(currentState, {
            type: '[COUNTRIES] Filter by Region',
            payload: { region: 'Asia', selected: false }
        });
        expect(newState.selectedRegions).toEqual(['Europe']);
    });

    it('should clear selectedRegions if all regions are removed', () => {
        const currentState = { ...initialState, selectedRegions: ['Asia'] };
        const newState = countryReducer(currentState, {
            type: '[COUNTRIES] Filter by Region',
            payload: { region: 'Asia', selected: false }
        });
        expect(newState.selectedRegions).toEqual([]);
    });

    it('should handle [COUNTRIES] Toggle Status Filter', () => {
        const newState = countryReducer(initialState, {
            type: '[COUNTRIES] Toggle Status Filter',
            payload: { filterType: 'unMember', value: true }
        });
        expect(newState.filters.unMember).toBe(true);
    });

    it('should toggle multiple status filters independently', () => {
        const currentState = {
            ...initialState,
            filters: { unMember: false, independent: false }
        };
        const updatedOnce = countryReducer(currentState, {
            type: '[COUNTRIES] Toggle Status Filter',
            payload: { filterType: 'independent', value: true }
        });
        const updatedTwice = countryReducer(updatedOnce, {
            type: '[COUNTRIES] Toggle Status Filter',
            payload: { filterType: 'unMember', value: true }
        });

        expect(updatedTwice.filters.independent).toBe(true);
        expect(updatedTwice.filters.unMember).toBe(true);
    });
});
