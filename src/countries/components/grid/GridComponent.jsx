export const GridComponent = ({ countriesList = [] }) => {
    const countries = Array.isArray(countriesList) ? countriesList : countriesList?.countries || [];

    return (
        <div className="w-full max-w-4xl pl-8">
            <div className="grid grid-cols-5 bg-gray-800 text-gray-400 text-sm font-semibold py-2 px-4 rounded-t-md border-b border-gray-200">
                <div>Flag</div>
                <div>Name</div>
                <div>Population</div>
                <div>Area (km²)</div>
                <div>Region</div>
            </div>

            {countries.map(country => (
                <div
                    key={country.name.common}
                    className="grid grid-cols-5 py-2 px-4 items-center text-white hover:bg-gray-700 transition duration-200"
                >
                    <div className="flex items-center">
                        <img 
                            src={country.flags.png} 
                            alt={country.name.common} 
                            className="w-16 h-auto rounded-md" 
                        />
                    </div>
                    <div>{country.name.common}</div>
                    <div>{country.population.toLocaleString()}</div>
                    <div>{country.area?.toLocaleString() || 'N/A'}</div>
                    <div>{country.region}</div>
                </div>
            ))}
        </div>
    );
}
