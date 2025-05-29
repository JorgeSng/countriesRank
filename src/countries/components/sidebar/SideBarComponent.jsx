import { useState } from "react";
import { CheckBoxComponent } from "./CheckBoxComponent";
import { SelectComponent } from "./SelectComponent";
import { RegionsComponent } from "./RegionsComponent";

export const SideBarComponent = ({
    sortBy,
    filterByRegion,
    selectedRegions = [],
    filters = {},
    toggleStatusFilter
}) => {
    const [selectedSort, setSelectedSort] = useState('');

    const regions = [
        "Africa",
        "Americas",
        "Asia",
        "Europe",
        "Oceania"
    ];

    const sortOptions = [
        { value: '', label: 'Select...' },
        { value: 'population', label: 'Population' },
        { value: 'area', label: 'Area' },
        { value: 'region', label: 'Region' },
        { value: 'name', label: 'Name' }
    ];

    const handleSortChange = (value) => {
        setSelectedSort(value);
        if (value) {
            sortBy(value);
        }
    };

    const handleRegionClick = (region) => {
        const isSelected = selectedRegions.includes(region);
        filterByRegion(region, !isSelected);
    };

    const handleStatusChange = (filterType, checked) => {
        toggleStatusFilter(filterType, checked);
    };

    return (
        <section className="text-white md:bg-transparent rounded-lg md:rounded-none md:pr-6 space-y-4 md:space-y-6">
            <div>
                <h3 className="font-semibold mb-2 text-sm md:text-base">Sort by</h3>
                <SelectComponent
                    value={selectedSort}
                    options={sortOptions}
                    onChangeValue={handleSortChange}
                />
            </div>

            <div>
                <h3 className="font-semibold mb-2 text-sm md:text-base">
                    Regions {selectedRegions.length > 0 && `(${selectedRegions.length})`}
                </h3>
                <RegionsComponent
                    regions={regions}
                    selectedRegions={selectedRegions}
                    onRegionClick={handleRegionClick}
                />
            </div>

            <div>
                <h3 className="font-semibold mb-2 text-sm md:text-base">Status</h3>
                <CheckBoxComponent
                    title="Member of the United Nations"
                    checked={filters.unMember || false}
                    onChangeValue={(checked) => handleStatusChange('unMember', checked)}
                />
                <CheckBoxComponent
                    title="Independent"
                    checked={filters.independent || false}
                    onChangeValue={(checked) => handleStatusChange('independent', checked)}
                />
            </div>
        </section>
    );
};

