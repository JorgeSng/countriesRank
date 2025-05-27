
export const sortCountries = (countries, sortBy) => {
    if (!sortBy) return countries;

    return [...countries].sort((a, b) => {
        switch (sortBy) {
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
};

export const updateRegionFilters = (currentRegions, region, selected) => {
    if (selected) {
        return [...currentRegions, region];
    }
    return currentRegions.filter(r => r !== region);
}; 