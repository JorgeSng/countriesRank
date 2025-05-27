import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SelectComponent } from '../SelectComponent';

describe('SelectComponent', () => {
    const sortOptions = [
        { value: '', label: 'Select...' },
        { value: 'population', label: 'Population' },
        { value: 'area', label: 'Area' },
        { value: 'region', label: 'Region' },
        { value: 'name', label: 'Name' }
    ];

    it('should render all sort options', () => {
        render(
            <SelectComponent
                value=""
                options={sortOptions}
                onChangeValue={() => { }}
            />
        );

        sortOptions.forEach(({ label }) => {
            expect(screen.getByText(label)).toBeInTheDocument();
        });
    });

    it('should set the correct selected value', () => {
        render(
            <SelectComponent
                value="area"
                options={sortOptions}
                onChangeValue={() => { }}
            />
        );

        const select = screen.getByRole('combobox');
        expect(select.value).toBe('area');
    });

    it('should call onChangeValue when selection changes', () => {
        const mockChange = vi.fn();

        render(
            <SelectComponent
                value=""
                options={sortOptions}
                onChangeValue={mockChange}
            />
        );

        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: 'region' } });

        expect(mockChange).toHaveBeenCalledTimes(1);
        expect(mockChange).toHaveBeenCalledWith('region');
    });
});
