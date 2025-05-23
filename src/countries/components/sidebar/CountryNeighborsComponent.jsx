import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CountryNeighborsComponent = ({ borders = [] }) => {
    const navigate = useNavigate();
    const [borderCountries, setBorderCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchBorderCountries = async () => {
            if (borders.length > 0) {
                setIsLoading(true);
                try {
                    const borderPromises = borders.map(borderCode => 
                        fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`)
                            .then(res => res.json())
                    );
                    const borderData = await Promise.all(borderPromises);
                    setBorderCountries(borderData.map(country => country[0]));
                } catch (error) {
                    console.error('Error fetching border countries:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchBorderCountries();
    }, [borders]);

    if (isLoading) {
        return (
            <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-6">Países Vecinos</h3>
                <div className="text-white">Cargando países vecinos...</div>
            </div>
        );
    }

    if (borderCountries.length === 0) {
        return null;
    }

    return (
        <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6">Países Vecinos</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {borderCountries.map(country => (
                    <div 
                        key={country.cca2}
                        onClick={() => navigate(`/details/${country.cca2}`)}
                        className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
                    >
                        <img 
                            src={country.flags.svg} 
                            alt={`Bandera de ${country.name.common}`}
                            className="w-full h-24 object-cover rounded-md mb-3"
                        />
                        <p className="text-center font-medium">{country.name.common}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}; 