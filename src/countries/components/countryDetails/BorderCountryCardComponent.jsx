import { useGetCountryByCountryCodeQuery } from "../../../store/api/countriesApi";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

export const BorderCountryCardComponent = ({ countryCode }) => {
    const navigate = useNavigate();
    const { data: countryData, isLoading, isError } = useGetCountryByCountryCodeQuery(countryCode);
    const [country, setCountry] = useState(null);

    useEffect(() => {
        if (countryData && countryData.length) {
            setCountry(countryData[0]);
        }
    }, [countryData]);

    if (isLoading) {
        return (
            <div className="rounded-lg p-4">
                <div data-testid="loading-skeleton" className="w-full h-24 bg-gray-700 rounded-md mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto animate-pulse"></div>
            </div>
        );
    }

    if (isError || !countryData || !countryData[0]) {
        return (
            <div className="rounded-lg p-4">
                <p className="text-center text-gray-400">Error loading country</p>
            </div>
        );
    }

    if (!country) return null;

    return (
        <button 
            onClick={() => navigate(`/details/${country.cca2}`)}
            className="rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
        >
            <img 
                src={country.flags.svg} 
                alt={`Flag of ${country.name.common}`}
                className="w-full h-24 object-cover rounded-md mb-3"
            />
            <p className="text-center font-medium">{country.name.common}</p>
        </button>
    );
}; 

