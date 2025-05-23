
import { Link } from "react-router-dom";
export const GridItem = ({country}) => {
  return (
      <Link to={`/details/${country.cca2}`}>
          <div
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
      </Link>
  );
}

