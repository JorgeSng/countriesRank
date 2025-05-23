import { useContext, useEffect } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";


export const PrivateRoute = ({ children }) => {
    const { authState } = useContext(AuthContext);
    const { pathname, search } = useLocation();


    useEffect(() => {
        localStorage.setItem('lastPath', pathname + search);

    }, [pathname, search]);


    return (authState.logged)
        ? children
        : <Navigate to="/login" />;
}
