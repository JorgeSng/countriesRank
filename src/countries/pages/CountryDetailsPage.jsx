import { useNavigate, useParams } from "react-router-dom";
import { useGetCountryByCountryCodeQuery } from "../../store/api/countriesApi";
import { useEffect, useState } from "react";
import { CountryNeighborsComponent } from "../components/sidebar/CountryNeighborsComponent";

export const CountryDetailsPage = () => {
  const navigate = useNavigate();
  const { code } = useParams();
  const { data: countryDetailsArray, isLoading, isError } = useGetCountryByCountryCodeQuery(code);
  const [countryDetails, setCountryDetails] = useState(null);

  useEffect(() => {
    if (countryDetailsArray && countryDetailsArray.length) {
      setCountryDetails(countryDetailsArray[0]);
    }
  }, [countryDetailsArray]);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (isError || !countryDetails) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-white">
        <div className="text-2xl mb-4">Error loading country data</div>
        <button 
          onClick={handleBack}
          className="text-gray-100 hover:text-gray-400 transition cursor-pointer"
        >
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <button 
        onClick={handleBack}
        className="text-gray-100 hover:text-gray-400 transition cursor-pointer"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="space-y-6">
          <img 
            src={countryDetails.flags?.svg || countryDetails.flags?.png} 
            alt={countryDetails.flags?.alt || `Flag of ${countryDetails.name?.common}`}
            className="w-full rounded-lg shadow-lg"
          />
          <div className="bg-gray-800 p-6 rounded-lg">
            <h1 className="text-3xl font-bold mb-4">{countryDetails.name?.common}</h1>
            <h2 className="text-xl text-gray-300 mb-4">{countryDetails.name?.official}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Capital</p>
                <p className="font-semibold">{countryDetails.capital?.[0] || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-400">Region</p>
                <p className="font-semibold">{countryDetails.region || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-400">Subregion</p>
                <p className="font-semibold">{countryDetails.subregion || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-400">Population</p>
                <p className="font-semibold">{countryDetails.population?.toLocaleString() || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Additional information */}
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Area</p>
                <p className="font-semibold">{countryDetails.area?.toLocaleString() || 'N/A'} km²</p>
              </div>
              <div>
                <p className="text-gray-400">Currencies</p>
                <div className="font-semibold">
                  {countryDetails.currencies ? 
                    Object.values(countryDetails.currencies).map(currency => (
                      <div key={currency.name}>
                        {currency.name} ({currency.symbol})
                      </div>
                    ))
                    : 'N/A'
                  }
                </div>
              </div>
              <div>
                <p className="text-gray-400">Languages</p>
                <div className="font-semibold">
                  {countryDetails.languages ? 
                    Object.values(countryDetails.languages).join(', ')
                    : 'N/A'
                  }
                </div>
              </div>
              <div>
                <p className="text-gray-400">Status</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${countryDetails.unMember ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>UN Member</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${countryDetails.independent ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>Independent Country</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {countryDetails.maps?.googleMaps && (
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Location</h3>
              <a 
                href={countryDetails.maps.googleMaps} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
              >
                View on Google Maps
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>

      <CountryNeighborsComponent borders={countryDetails.borders || []} />
    </div>
  );
}
