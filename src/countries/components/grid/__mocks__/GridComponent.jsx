export const GridComponent = (props) => (
    <div data-testid="grid-component">
        {props.countriesList.map(c => (
            <div key={c.name.common} data-testid="country-item">{c.name.common}</div>
        ))}
    </div>
);