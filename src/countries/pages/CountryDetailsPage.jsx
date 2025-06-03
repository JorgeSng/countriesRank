import { useNavigate, useParams } from "react-router-dom";
import { useGetCountryByCountryCodeQuery } from "../../store/api/countriesApi";
import { useEffect, useState } from "react";
import { CountryNeighborsComponent } from "../components/countryDetails/CountryNeighborsComponent";
import { MainInfoComponent } from "../components/countryDetails/MainInfoComponent";
import { AdditionalInfoComponent } from "../components/countryDetails/AdditionalInfoComponent";
import { MainInfoSkeleton } from "../components/countryDetails/skeletons/MainInfoComponent";
import { AdditionalInfoSkeleton } from "../components/countryDetails/skeletons/AdditionalInfoSkeleton";
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

  const handleGoToCountryList = () => {
    navigate('/');
  };
 
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <MainInfoSkeleton/>
        <AdditionalInfoSkeleton/>
      </div>

    );
  }

  if (isError || !countryDetails) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-white">
        <div className="text-2xl mb-4">Error loading country data</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <div className="flex gap-4">
        <button 
          onClick={handleBack}
          className="text-gray-100 hover:text-gray-400 transition cursor-pointer"
        >
          ← Back
        </button>
        <button 
          onClick={handleGoToCountryList}
          className="text-gray-100 hover:text-gray-400 transition cursor-pointer"
        >
          Country List
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <MainInfoComponent countryDetails={countryDetails} />
        <AdditionalInfoComponent countryDetails={countryDetails} />
      </div>

      <CountryNeighborsComponent borders={countryDetails.borders || []} />
    </div>
  );
}
