import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RegionsComponent } from '../RegionsComponent';

describe('RegionsComponent', () => {
    const regions = ['Africa', 'Europe', 'Asia'];

    it('should render all regions', () => {
        render(
            <RegionsComponent
                regions={regions}
                selectedRegions={[]}
                onRegionClick={() => { }}
            />
        );

        regions.forEach(region => {
            expect(screen.getByText(region)).toBeInTheDocument();
        });
    });

    it('should highlight selected regions', () => {
        render(
            <RegionsComponent
                regions={regions}
                selectedRegions={['Europe']}
                onRegionClick={() => { }}
            />
        );

        const selectedButton = screen.getByText('Europe');
        expect(selectedButton.className).toMatch(/bg-blue-600/);
    });

    it('should call onRegionClick when a button is clicked', () => {
        const mockClick = vi.fn();
        render(
            <RegionsComponent
                regions={regions}
                selectedRegions={[]}
                onRegionClick={mockClick}
            />
        );

        fireEvent.click(screen.getByText('Asia'));
        expect(mockClick).toHaveBeenCalledTimes(1);
        expect(mockClick).toHaveBeenCalledWith('Asia');
    });
});
