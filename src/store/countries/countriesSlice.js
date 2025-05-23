import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    region: null,
    sortByPopulation: false
}

export const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        setRegion: (state, action) => {
            state.region = action.payload;
        },
        togglePopulationSort: (state) => {
            state.sortByPopulation = !state.sortByPopulation;
        }
    }
});

export const { setRegion, togglePopulationSort } = countriesSlice.actions;

export default countriesSlice.reducer; 