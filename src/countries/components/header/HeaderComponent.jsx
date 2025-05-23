export const HeaderComponent = ({totalCountries, searchTerm, onSearchChange}) => {
    return (
        <header className="flex place-content-between items-center text-white">
            <h3>Found {totalCountries} countries</h3>
            <div className="w-64">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search country..."
                    className="w-full px-4 py-2 rounded bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />
            </div>
        </header>
    );
}

