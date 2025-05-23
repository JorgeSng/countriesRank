import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRouter";
import { PublicRoute } from "./PublicRouter";
import { CountryRoutes } from "../countries/routes/CountryRoutes";
import { LoginPage } from "../auth/pages/LoginPage";
export const AppRouter = () => {
    return (
        <>

            <Routes>
                <Route path="login" element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                } />

                <Route path="/*" element={
                    <PrivateRoute>
                        < CountryRoutes />
                    </PrivateRoute>
                } />
            </Routes>

        </>
    );
}

