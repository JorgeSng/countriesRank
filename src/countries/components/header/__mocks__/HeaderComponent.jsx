import React, { useState, useEffect } from 'react';
export const HeaderComponent = (props) => {
    const [inputValue, setInputValue] = useState(props.searchTerm || '');
    useEffect(() => {
        setInputValue(props.searchTerm || '');
    }, [props.searchTerm]);
    return (
        <div data-testid="header-component">
            <span data-testid="total-countries">{props.totalCountries}</span>
            <input
                data-testid="search-input"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter' && props.onSearchSubmit) {
                        props.onSearchSubmit(inputValue);
                    }
                }}
            />
        </div>
    );
};
