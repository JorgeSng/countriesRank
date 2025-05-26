import { BorderCountryCardComponent } from "./BorderCountryCardComponent";

export const CountryNeighborsComponent = ({ borders = [] }) => {
    if (borders.length === 0) {
        return null;
    }

    return (
        <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6">Neighbors countries
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {borders.map(borderCode => (
                    <BorderCountryCardComponent 
                        key={borderCode} 
                        countryCode={borderCode}
                    />
                ))}
            </div>
        </div>
    );
};
