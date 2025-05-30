import { describe, it, expect } from 'vitest';
import { authReducer } from '../authReducer';
import { types } from '../../types/types';

describe('authReducer', () => {

    const initialState = {
        logged: false,
        user: null,
    };

    it('should return the default state when action type is unknown', () => {
        const action = { type: 'unknown' };
        const state = authReducer(initialState, action);

        expect(state).toEqual(initialState);
    });

    it('should handle login action', () => {
        const action = {
            type: types.login,
            payload: { name: 'Jorge' }
        };

        const state = authReducer(initialState, action);

        expect(state).toEqual({
            logged: true,
            user: { name: 'Jorge' },
        });
    });

    it('should handle logout action', () => {
        const loggedInState = {
            logged: true,
            user: { name: 'Jorge' },
        };

        const action = { type: types.logout };
        const state = authReducer(loggedInState, action);

        expect(state).toEqual({
            logged: false,
            user: null,
        });
    });

});
