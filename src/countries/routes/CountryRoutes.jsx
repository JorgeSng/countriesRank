
import { Routes, Route, Navigate } from "react-router-dom";

import { CountryPage } from "../pages/CountryPage";
import { CountryDetailsPage } from "../pages/CountryDetailsPage";
export const CountryRoutes = () => {
    return (
        <>
            <div className="p-8 h-full">
                <Routes>
                    <Route path="countries" element={<CountryPage />} />
                    <Route path="/details/:code" element={<CountryDetailsPage />} />

                    <Route path="/" element={<Navigate to='/countries' />} />
                </Routes>

            </div>

        </>
    );
}

