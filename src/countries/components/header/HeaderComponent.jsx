import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from '../../../auth/context/AuthContext';

import { useState, useEffect } from 'react';

export const HeaderComponent = ({totalCountries, searchTerm, onSearchSubmit}) => {
    const navigate = useNavigate();
    const { authState, logout } = useContext(AuthContext);

    const [inputValue, setInputValue] = useState(searchTerm || '');

    useEffect(() => {
        setInputValue(searchTerm || '');
    }, [searchTerm]);

    const onLogout = () => {
        logout();
        navigate('/login', {
            replace: true
        });
    }
    return (
        <header className="flex flex-col md:flex-row md:place-content-between gap-4 md:items-center text-white">
            <div className="flex w-full md:w-auto mb-2 md:mb-0 place-content-between md:justify-end order-1 md:order-2">
                <span>{authState.user?.name}</span>
                <button className="ml-4 cursor-pointer text-red-400" onClick={onLogout}>Logout</button>
            </div>
            <div id="search" className="flex flex-col md:flex-row items-center w-full md:w-auto order-2 md:order-1">
                <h3 className="text-lg font-medium w-full md:w-auto text-center md:text-left mb-2 md:mb-0">Found {totalCountries} countries</h3>
                <div className="w-full md:w-64 md:ml-4">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && onSearchSubmit) {
                                onSearchSubmit(inputValue);
                            }
                        }}
                        placeholder="Search country..."
                        className="w-full px-4 py-2 rounded bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                    />
                </div>
            </div>
        </header>
    );
}

