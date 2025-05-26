export const RegionsComponent = ({ regions, selectedRegions, onRegionClick }) => {
    return (
        <div className="flex flex-wrap gap-2">
            {regions.map(region => (
                <button
                    key={region}
                    onClick={() => onRegionClick(region)}
                    className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 transform hover:scale-105 ${
                        selectedRegions.includes(region)
                            ? 'bg-blue-600 hover:bg-blue-700 shadow-lg'
                            : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                >
                    {region}
                </button>
            ))}
        </div>
    );
};
