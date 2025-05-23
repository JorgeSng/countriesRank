export const HeaderComponent = ({totalCountries}) => {
    return (
        <header className="flex place-content-between text-white">
            <h3>Found {totalCountries} countries</h3>
            <div>Barra de busqueda</div>
        </header>
    );
}

