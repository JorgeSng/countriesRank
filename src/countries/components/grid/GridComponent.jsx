import { Link } from "react-router-dom";
import { GridItem } from "./GridItem";

export const GridComponent = ({ countriesList = [] }) => {
    const countries = Array.isArray(countriesList) ? countriesList : countriesList?.countries || [];

    return (
        <div className="w-full pl-8">
            <div className="grid grid-cols-5 text-gray-400 text-sm font-semibold py-2 px-4 rounded-t-md border-b border-gray-200">
                <div>Flag</div>
                <div>Name</div>
                <div>Population</div>
                <div>Area (km²)</div>
                <div>Region</div>
            </div>

            {countries.map(country => (
                <GridItem key={country.name.common} country={country}/>
            ))}
        </div>
    );
}
