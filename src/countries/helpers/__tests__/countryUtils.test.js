import { describe, it, expect } from 'vitest';
import { sortCountries, updateRegionFilters } from '../countryUtils';

const mockCountries = [
    {
        name: { common: 'Brazil' },
        population: 210000000,
        area: 8515767,
        region: 'Americas'
    },
    {
        name: { common: 'France' },
        population: 67000000,
        area: 551695,
        region: 'Europe'
    },
    {
        name: { common: 'Australia' },
        population: 25000000,
        area: 7692024,
        region: 'Oceania'
    }
];

describe('sortCountries', () => {
    it('should return original array if sortBy is empty', () => {
        const result = sortCountries(mockCountries, '');
        expect(result).toEqual(mockCountries);
    });

    it('should sort countries by name alphabetically', () => {
        const result = sortCountries(mockCountries, 'name');
        expect(result.map(c => c.name.common)).toEqual(['Australia', 'Brazil', 'France']);
    });

    it('should sort countries by population descending', () => {
        const result = sortCountries(mockCountries, 'population');
        expect(result.map(c => c.name.common)).toEqual(['Brazil', 'France', 'Australia']);
    });

    it('should sort countries by area descending', () => {
        const result = sortCountries(mockCountries, 'area');
        expect(result.map(c => c.name.common)).toEqual(['Brazil', 'Australia', 'France']);
    });

    it('should sort countries by region then name', () => {
        const result = sortCountries(mockCountries, 'region');
        expect(result.map(c => c.name.common)).toEqual(['Brazil', 'France', 'Australia']);
    });
});

describe('updateRegionFilters', () => {
    it('should add a region if selected is true', () => {
        const result = updateRegionFilters(['Asia'], 'Africa', true);
        expect(result).toEqual(['Asia', 'Africa']);
    });

    it('should remove a region if selected is false', () => {
        const result = updateRegionFilters(['Asia', 'Africa'], 'Africa', false);
        expect(result).toEqual(['Asia']);
    });

    it('should return same array if region not found to remove', () => {
        const result = updateRegionFilters(['Asia'], 'Africa', false);
        expect(result).toEqual(['Asia']);
    });
});
