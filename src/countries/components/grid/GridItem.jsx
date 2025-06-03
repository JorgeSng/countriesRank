import { Link } from "react-router-dom";

export const GridItem = ({country}) => {
    return (
        <Link to={`/details/${country.cca2}`}>
            <div className="grid grid-cols-2 md:grid-cols-5 py-2 px-4 items-center text-white hover:bg-gray-700 transition duration-200 h-[72px]">
                <div className="flex items-center gap-3 md:hidden">
                    <img
                        src={country.flags.png}
                        alt={country.name.common}
                        className="w-12 h-auto rounded-md"
                    />
                    <div className="flex flex-col">
                        <span className="font-medium">{country.name.common}</span>
                        <span className="text-sm text-gray-400">{country.region}</span>
                    </div>
                </div>
                <div className="text-right md:hidden">
                    <div className="text-sm">{country.population.toLocaleString()} pop.</div>
                    <div className="text-sm text-gray-400">{country.area?.toLocaleString() || 'N/A'} km²</div>
                </div>
                <div className="hidden md:flex items-center">
                    <img
                        src={country.flags.png}
                        alt={country.name.common}
                        className="w-16 h-auto rounded-md"
                    />
                </div>
                <div className="hidden md:block">{country.name.common}</div>
                <div className="hidden md:block">{country.population.toLocaleString()}</div>
                <div className="hidden md:block">{country.area?.toLocaleString() || 'N/A'}</div>
                <div className="hidden md:block">{country.region}</div>
            </div>
        </Link>
    );
}

