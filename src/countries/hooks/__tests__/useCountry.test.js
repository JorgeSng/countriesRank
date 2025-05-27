import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCountries } from '../useCountry';

const mockCountries = [
    {
        name: { common: 'Argentina' },
        region: 'Americas',
        population: 45000000,
        area: 2780000,
        unMember: true,
        independent: true,
    },
    {
        name: { common: 'France' },
        region: 'Europe',
        population: 67000000,
        area: 640000,
        unMember: true,
        independent: true,
    },
    {
        name: { common: 'Brazil' },
        region: 'Americas',
        population: 213000000,
        area: 8516000,
        unMember: true,
        independent: true,
    },
];

describe('useCountries', () => {
    it('initializes with empty state', () => {
        const { result } = renderHook(() => useCountries());

        expect(result.current.countries).toEqual([]);
        expect(result.current.searchTerm).toBe('');
        expect(result.current.selectedRegions).toEqual([]);
        expect(result.current.filters).toEqual({
            unMember: false,
            independent: false,
        });
    });

    it('sets countries correctly', () => {
        const { result } = renderHook(() => useCountries());

        act(() => {
            result.current.setCountries(mockCountries);
        });

        expect(result.current.countries).toHaveLength(3);
    });

    it('sets search term and filters countries accordingly', () => {
        const { result } = renderHook(() => useCountries());

        act(() => {
            result.current.setCountries(mockCountries);
            result.current.setSearchTerm('fr');
        });

        expect(result.current.countries).toHaveLength(1);
        expect(result.current.countries[0].name.common).toBe('France');
    });

    it('filters by region', () => {
        const { result } = renderHook(() => useCountries());

        act(() => {
            result.current.setCountries(mockCountries);
            result.current.filterByRegion('Europe', true);
        });

        expect(result.current.countries).toHaveLength(1);
        expect(result.current.countries[0].region).toBe('Europe');
    });

    it('filters by unMember status', () => {
        const { result } = renderHook(() => useCountries());

        act(() => {
            result.current.setCountries(mockCountries);
            result.current.toggleStatusFilter('unMember', true);
        });

        expect(result.current.countries.every(c => c.unMember)).toBe(true);
        expect(result.current.countries).toHaveLength(3);
    });

    it('filters by independent status', () => {
        const { result } = renderHook(() => useCountries());

        act(() => {
            result.current.setCountries(mockCountries);
            result.current.toggleStatusFilter('independent', true);
        });

        expect(result.current.countries.every(c => c.independent)).toBe(true);
        expect(result.current.countries).toHaveLength(3);
    });

    it('applies multiple filters together', () => {
        const { result } = renderHook(() => useCountries());

        act(() => {
            result.current.setCountries(mockCountries);
            result.current.setSearchTerm('a');
            result.current.filterByRegion('Americas', true);
            result.current.toggleStatusFilter('unMember', true);
        });

        expect(result.current.countries).toHaveLength(2);
        const names = result.current.countries.map(c => c.name.common);
        expect(names).toContain('Argentina');
        expect(names).toContain('Brazil');
    });

    it('sorts countries by name', () => {
        const { result } = renderHook(() => useCountries());

        act(() => {
            result.current.setCountries(mockCountries);
            result.current.sortBy('name');
        });

        const names = result.current.countries.map(c => c.name.common);
        expect(names).toEqual(['Argentina', 'Brazil', 'France']);
    });

    it('sorts countries by population descending', () => {
        const { result } = renderHook(() => useCountries());

        act(() => {
            result.current.setCountries(mockCountries);
            result.current.sortBy('population');
        });

        const populations = result.current.countries.map(c => c.population);
        expect(populations).toEqual([213000000, 67000000, 45000000]);
    });

    it('sorts countries by area descending', () => {
        const { result } = renderHook(() => useCountries());

        act(() => {
            result.current.setCountries(mockCountries);
            result.current.sortBy('area');
        });

        const areas = result.current.countries.map(c => c.area);
        expect(areas).toEqual([8516000, 2780000, 640000]);
    });
});
