import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CheckBoxComponent } from '../CheckBoxComponent';

describe('CheckBoxComponent', () => {
    it('should display the title', () => {
        render(<CheckBoxComponent title="UN Member" checked={false} onChangeValue={() => { }} />);
        expect(screen.getByText('UN Member')).toBeInTheDocument();
    });

    it('should reflect the checked state', () => {
        const { rerender } = render(<CheckBoxComponent title="Independent" checked={true} onChangeValue={() => { }} />);
        expect(screen.getByRole('checkbox')).toBeChecked();

        rerender(<CheckBoxComponent title="Independent" checked={false} onChangeValue={() => { }} />);
        expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('should call onChangeValue with the new checked state', () => {
        const handleChange = vi.fn();
        render(<CheckBoxComponent title="Member" checked={false} onChangeValue={handleChange} />);

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(true);
    });
});
