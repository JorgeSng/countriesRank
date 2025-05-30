export const HeaderComponent = (props) => (
    <div data-testid="header-component">
        <span data-testid="total-countries">{props.totalCountries}</span>
        <input
            data-testid="search-input"
            value={props.searchTerm}
            onChange={(e) => props.onSearchChange(e.target.value)}
        />
    </div>
);
