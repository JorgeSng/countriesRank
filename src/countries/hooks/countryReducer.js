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
            if (!action.payload) return state;

            const sortedCountries = [...state.countries].sort((a, b) => {
                switch (action.payload) {
                    case 'name':
                        return a.name.common.localeCompare(b.name.common);
                    case 'population':
                        return b.population - a.population;
                    case 'area':
                        return (b.area || 0) - (a.area || 0);
                    case 'region': {
                        const regionComparison = a.region.localeCompare(b.region);
                        if (regionComparison === 0) {
                            return a.name.common.localeCompare(b.name.common);
                        }
                        return regionComparison;
                    }
                    default:
                        return 0;
                }
            });

            return {
                ...state,
                countries: sortedCountries
            };
        }

        case '[COUNTRIES] Filter by Region': {
            const { region, selected } = action.payload;
            let newRegions;

            if (selected) {
                newRegions = [...state.selectedRegions, region];
            } else {
                newRegions = state.selectedRegions.filter(r => r !== region);
            }

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
