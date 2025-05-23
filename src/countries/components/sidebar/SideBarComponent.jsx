import { useState } from "react";

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

    const handleStatusChange = (filterType) => (e) => {
        toggleStatusFilter(filterType, e.target.checked);
    };

    return (
        <section className="text-white w-80 p-4 space-y-6">
            <div className="my-8">
                <h3 className="font-semibold">Sort by</h3>
                <select
                    value={selectedSort}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="w-full px-4 py-2 rounded bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500"
                >
                    {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="my-8">
                <h3 className="font-semibold">
                    Regions {selectedRegions.length > 0 && `(${selectedRegions.length})`}
                </h3>
                <div className="flex flex-wrap gap-2">
                    {regions.map(region => (
                        <button
                            key={region}
                            onClick={() => handleRegionClick(region)}
                            className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 transform hover:scale-105 ${selectedRegions.includes(region)
                                    ? 'bg-blue-600 hover:bg-blue-700 shadow-lg'
                                    : 'bg-gray-700 hover:bg-gray-600'
                                }`}
                        >
                            {region}
                        </button>
                    ))}
                </div>
            </div>

            <div className="my-8">
                <h3 className="font-semibold">Status</h3>
                <div className="my-2">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filters.unMember}
                            onChange={handleStatusChange('unMember')}
                            className="w-4 h-4 shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="text-xs ml-2">Member of the United Nations</span>
                    </label>
                </div>
                <div className="my-2">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filters.independent}
                            onChange={handleStatusChange('independent')}
                            className="w-4 h-4 shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="text-xs ml-2">Independent</span>
                    </label>
                </div>
            </div>
        </section>
    );
}

