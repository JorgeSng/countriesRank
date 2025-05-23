import { useCallback, useEffect } from 'react';
import { useGetCountriesQuery } from "../../store/api/countriesApi.js";
import { HeaderComponent } from "../components/header/HeaderComponent";
import { SideBarComponent } from "../components/sidebar/SideBarComponent";
import { GridComponent } from "../components/grid/GridComponent";
import { useCountries } from "../hooks/useCountry.js";

export const CountryPage = () => {

    const { data: countriesData, isLoading } = useGetCountriesQuery();
    const { 
        countries, 
        selectedRegions, 
        filters,
        searchTerm,
        setCountries, 
        setSearchTerm,
        sortBy, 
        filterByRegion,
        toggleStatusFilter 
    } = useCountries();

    const handleDataUpdate = useCallback(() => {
        if (countriesData) {
            setCountries(countriesData);
        }
    }, [countriesData, setCountries]);

    useEffect(() => {
        handleDataUpdate();
    }, [handleDataUpdate]);

    if (isLoading) {
        return <div className="text-white text-center mt-10">Cargando países...</div>;
    }

    const displayCountries = Array.isArray(countries) ? countries : countries?.countries || [];

    return (
        <div className='container mx-auto max-w-7xl px-4'>
            <HeaderComponent 
                totalCountries={displayCountries.length} 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />
            <div className="pt-12 flex">
                <SideBarComponent 
                    sortBy={sortBy}
                    filterByRegion={filterByRegion}
                    selectedRegions={selectedRegions}
                    filters={filters}
                    toggleStatusFilter={toggleStatusFilter}
                />
                <GridComponent countriesList={displayCountries}/>
            </div>
        </div>
    );
}

