import { useState, useMemo, useEffect, useCallback } from 'react'
import { GridItem } from './GridItem'
import { PaginationComponent } from './PaginationComponent'

export const GridComponent = ({ countriesList = [] }) => {
    const countries = useMemo(() => {
        if (Array.isArray(countriesList)) {
            return countriesList
        }
        if (Array.isArray(countriesList?.countries)) {
            return countriesList.countries
        }
        return []
    }, [countriesList])

    const headers = ['Flag', 'Name', 'Population', 'Area (km²)', 'Region']

    const ITEMS_PER_PAGE = 10
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(countries.length / ITEMS_PER_PAGE)

    const paginatedCountries = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
        return countries.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    }, [countries, currentPage])

    const handlePrevPage = useCallback(() => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    }, []);

    const handleNextPage = useCallback(() => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }, [totalPages]);

    useEffect(() => {
        setCurrentPage(1)
    }, [countries])

    return (
        <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-5 text-gray-400 text-sm font-semibold py-2 px-4 rounded-t-md border-b border-gray-200">
                {headers.map((title) => (
                    <div key={title} className="hidden md:block">
                        {title}
                    </div>
                ))}
                <div className="md:hidden">Info</div>
                <div className="md:hidden text-right">Details</div>
            </div>

            {paginatedCountries.map((country) => (
                <GridItem key={country.name.common} country={country} />
            ))}

            {totalPages > 1 && (
                <PaginationComponent handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} currentPage={currentPage} totalPages={totalPages}/>
            )}
        </div>
    )
}
