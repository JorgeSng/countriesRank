import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { types } from "../types/types";

const initialState = {
    logged: false
}


const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
        logged: !!user,
        user: user
    }
}

export const AuthProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(authReducer, initialState, init);

    const login = (name = '') => {
        const action = {
            type: types.login,
            payload: {
                id: 'ABC123',
                name: name
            }
        }

        localStorage.setItem('user', JSON.stringify(action.payload));
        dispatch(action);
    }
    const logout = () => {
        const action = {
            type: types.logout
        }
        localStorage.removeItem('user');
        dispatch(action);
    }

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
