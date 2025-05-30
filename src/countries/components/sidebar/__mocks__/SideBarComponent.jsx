export const SideBarComponent = (props) => (
    <div data-testid="sidebar-component">
        <button data-testid="sort-btn" onClick={() => props.sortBy('name')}>Sort by Name</button>
        <button data-testid="region-btn" onClick={() => props.filterByRegion('Europe', true)}>Filter Europe</button>
        <button data-testid="un-btn" onClick={() => props.toggleStatusFilter('unMember', true)}>Filter UN</button>
    </div>
);