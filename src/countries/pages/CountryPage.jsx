import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetCountriesQuery } from "../../store/api/countriesApi.js";
import { HeaderComponent } from "../components/header/HeaderComponent";
import { SideBarComponent } from "../components/sidebar/SideBarComponent";
import { GridComponent } from "../components/grid/GridComponent";
import { useCountries } from "../hooks/useCountry.js";
import { SkeletonGrid } from '../components/grid/skeletonGridComponent.jsx';

export const CountryPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();


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

    useEffect(() => {
        const query = searchParams.get('query') || '';
        setSearchTerm(query);
    }, [searchParams, setSearchTerm]);

    const handleSearchSubmit = useCallback((value) => {
        setSearchParams(value ? { query: value } : {});
    }, [setSearchParams]);


    const handleDataUpdate = useCallback(() => {
        if (countriesData) {
            setCountries(countriesData);
        }
    }, [countriesData, setCountries]);

    useEffect(() => {
        handleDataUpdate();
    }, [handleDataUpdate]);

  

    const displayCountries = Array.isArray(countries) ? countries : countries?.countries || [];

    return (
        <div className='container mx-auto max-w-7xl px-4'>
            <HeaderComponent
                totalCountries={displayCountries.length}
                onSearchSubmit={handleSearchSubmit}
                searchTerm={searchTerm}
            />
            <div className="pt-12 flex flex-col md:flex-row gap-6 md:gap-0">
                <div className="w-full md:w-80">
                    <SideBarComponent
                        sortBy={sortBy}
                        filterByRegion={filterByRegion}
                        selectedRegions={selectedRegions}
                        filters={filters}
                        toggleStatusFilter={toggleStatusFilter}
                    />
                </div>
                <div className="w-full">
                    {(isLoading)
                        ? <SkeletonGrid />
                        : <GridComponent countriesList={displayCountries} />
                    }
                </div>
            </div>
        </div>

    );
}

