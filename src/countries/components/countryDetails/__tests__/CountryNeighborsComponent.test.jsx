import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CountryNeighborsComponent } from '../CountryNeighborsComponent';

vi.mock('../BorderCountryCardComponent', () => ({
    BorderCountryCardComponent: ({ countryCode }) => <div data-testid="border-country-card">{countryCode}</div>,
}));

describe('CountryNeighborsComponent', () => {
    it('should return null if borders prop is empty or not passed', () => {
        const { container: containerEmpty } = render(<CountryNeighborsComponent borders={[]} />);
        expect(containerEmpty.firstChild).toBeNull();

        const { container: containerNoProp } = render(<CountryNeighborsComponent />);
        expect(containerNoProp.firstChild).toBeNull();
    });

    it('should render the title and BorderCountryCardComponent for each border code', () => {
        const borders = ['US', 'ES', 'MX'];
        render(<CountryNeighborsComponent borders={borders} />);

        expect(screen.getByText(/neighbors countries/i)).toBeInTheDocument();

        const cards = screen.getAllByTestId('border-country-card');
        expect(cards).toHaveLength(borders.length);

        borders.forEach((code, i) => {
            expect(cards[i]).toHaveTextContent(code);
        });
    });
});
