import { GridItem } from "./GridItem";

export const GridComponent = ({ countriesList = [] }) => {
    const countries = Array.isArray(countriesList) ? countriesList : countriesList?.countries || [];
    const headers = ['Flag', 'Name', 'Population', 'Area (km²)', 'Region'];

    return (
        <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-5 text-gray-400 text-sm font-semibold py-2 px-4 rounded-t-md border-b border-gray-200">
                {headers.map((title) => (
                    <div key={title} className="hidden md:block">{title}</div>
                ))}
                <div className="md:hidden">Info</div>
                <div className="md:hidden text-right">Details</div>
            </div>

            {countries.map(country => (
                <GridItem key={country.name.common} country={country}/>
            ))}
        </div>
    );
}
