
export const AdditionalInfoComponent = ({ countryDetails }) => {
    return (
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
                                <div data-testid="status-dot" className={`w-3 h-3 rounded-full ${countryDetails.unMember ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <span>UN Member</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div data-testid="status-dot" className={`w-3 h-3 rounded-full ${countryDetails.independent ? 'bg-green-500' : 'bg-red-500'}`}></div>
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
    );
}
