import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SideBarComponent } from '../SideBarComponent';

describe('SideBarComponent', () => {
    const mockSortBy = vi.fn();
    const mockFilterByRegion = vi.fn();
    const mockToggleStatusFilter = vi.fn();

    const setup = (props = {}) => {
        return render(
            <SideBarComponent
                sortBy={mockSortBy}
                filterByRegion={mockFilterByRegion}
                toggleStatusFilter={mockToggleStatusFilter}
                selectedRegions={[]}
                filters={{}}
                {...props}
            />
        );
    };

    it('should render sort select, regions, and status filters', () => {
        setup();

        expect(screen.getByText(/sort by/i)).toBeInTheDocument();
        expect(screen.getByText(/regions/i)).toBeInTheDocument();
        expect(screen.getByText(/status/i)).toBeInTheDocument();
        expect(screen.getByText(/member of the united nations/i)).toBeInTheDocument();
        expect(screen.getByText(/independent/i)).toBeInTheDocument();
    });

    it('should call sortBy when a sort option is selected', () => {
        setup();

        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: 'population' } });

        expect(mockSortBy).toHaveBeenCalledWith('population');
    });

    it('should call filterByRegion when a region is clicked', () => {
        setup();

        const regionButton = screen.getByText('Africa');
        fireEvent.click(regionButton);

        expect(mockFilterByRegion).toHaveBeenCalledWith('Africa', true);
    });

    it('should call toggleStatusFilter when checkboxes are toggled', () => {
        setup({
            filters: {
                unMember: false,
                independent: true,
            },
        });

        const unCheckbox = screen.getByLabelText(/member of the united nations/i);
        const indCheckbox = screen.getByLabelText(/independent/i);

        fireEvent.click(unCheckbox);
        fireEvent.click(indCheckbox);

        expect(mockToggleStatusFilter).toHaveBeenCalledWith('unMember', true);
        expect(mockToggleStatusFilter).toHaveBeenCalledWith('independent', false);
    });

    it('should display region count in title when regions are selected', () => {
        setup({ selectedRegions: ['Africa', 'Asia'] });

        expect(screen.getByText(/regions \(2\)/i)).toBeInTheDocument();
    });
});
