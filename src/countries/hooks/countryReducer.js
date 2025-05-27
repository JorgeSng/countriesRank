import { sortCountries, updateRegionFilters } from '../helpers/countryUtils';

export const countryReducer = (state = {
    countries: [], 
    selectedRegions: [],
    filters: {
        unMember: false,
        independent: false
    },
    searchTerm: ''
}, action) => {
    switch (action.type) {
        case '[COUNTRIES] Add Countries': {
            return {
                ...state,
                countries: action.payload || []
            };
        }

        case '[COUNTRIES] Set Search Term': {
            return {
                ...state,
                searchTerm: action.payload
            };
        }

        case '[COUNTRIES] Sort by': {
            return {
                ...state,
                countries: sortCountries(state.countries, action.payload)
            };
        }

        case '[COUNTRIES] Filter by Region': {
            const { region, selected } = action.payload;
            const newRegions = updateRegionFilters(state.selectedRegions, region, selected);

            if (newRegions.length === 0) {
                return {
                    ...state,
                    selectedRegions: []
                };
            }

            return {
                ...state,
                selectedRegions: newRegions
            };
        }

        case '[COUNTRIES] Toggle Status Filter': {
            const { filterType, value } = action.payload;
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [filterType]: value
                }
            };
        }

        default:
            return state;
    }
}
