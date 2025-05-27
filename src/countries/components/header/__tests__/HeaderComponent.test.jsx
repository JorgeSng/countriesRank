import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HeaderComponent } from '../HeaderComponent';

describe('HeaderComponent', () => {
    it('should display the total number of countries', () => {
        render(<HeaderComponent totalCountries={42} searchTerm="" onSearchChange={() => { }} />);
        expect(screen.getByText(/found 42 countries/i)).toBeInTheDocument();
    });

    it('should render the input with the given searchTerm', () => {
        render(<HeaderComponent totalCountries={0} searchTerm="Spain" onSearchChange={() => { }} />);
        const input = screen.getByPlaceholderText(/search country/i);
        expect(input.value).toBe('Spain');
    });

    it('should call onSearchChange when input value changes', () => {
        const handleChange = vi.fn();
        render(<HeaderComponent totalCountries={10} searchTerm="" onSearchChange={handleChange} />);

        const input = screen.getByPlaceholderText(/search country/i);
        fireEvent.change(input, { target: { value: 'France' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith('France');
    });
});
