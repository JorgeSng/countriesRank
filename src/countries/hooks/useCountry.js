import { countryReducer } from "./countryReducer";
import { useReducer, useCallback, useMemo } from "react";

export const useCountries = () => {
    const [state, dispatch] = useReducer(countryReducer, {
        countries: [],
        selectedRegions: [],
        filters: {
            unMember: false,
            independent: false
        },
        searchTerm: ''
    });

    const setCountries = useCallback((data) => {
        dispatch({
            type: "[COUNTRIES] Add Countries",
            payload: data
        });
    }, []);

    const setSearchTerm = useCallback((term) => {
        dispatch({
            type: "[COUNTRIES] Set Search Term",
            payload: term
        });
    }, []);

    const sortBy = useCallback((type) => {
        dispatch({
            type: "[COUNTRIES] Sort by",
            payload: type
        });
    }, []);

    const filterByRegion = useCallback((region, selected) => {
        dispatch({
            type: "[COUNTRIES] Filter by Region",
            payload: { region, selected }
        });
    }, []);

    const toggleStatusFilter = useCallback((filterType, value) => {
        dispatch({
            type: "[COUNTRIES] Toggle Status Filter",
            payload: { filterType, value }
        });
    }, []);

    const filteredCountries = useMemo(() => {
        let filtered = state.countries;

        if (state.searchTerm) {
            const searchLower = state.searchTerm.toLowerCase();
            filtered = filtered.filter(country => 
                country.name.common.toLowerCase().includes(searchLower)
            );
        }

        if (state.selectedRegions.length > 0) {
            filtered = filtered.filter(country => 
                state.selectedRegions.includes(country.region)
            );
        }

        if (state.filters.unMember) {
            filtered = filtered.filter(country => country.unMember);
        }

        if (state.filters.independent) {
            filtered = filtered.filter(country => country.independent);
        }

        return filtered;
    }, [state.countries, state.selectedRegions, state.filters, state.searchTerm]);

    return {
        countries: filteredCountries,
        selectedRegions: state.selectedRegions,
        filters: state.filters,
        searchTerm: state.searchTerm,
        setCountries,
        setSearchTerm,
        sortBy,
        filterByRegion,
        toggleStatusFilter
    };
}