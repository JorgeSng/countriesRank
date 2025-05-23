
import { Routes, Route, Navigate } from "react-router-dom";

import { CountryPage } from "../pages/CountryPage";
export const CountryRoutes = () => {
    return (
        <>
            <div className="p-8 h-full">
                <Routes>
                    <Route path="countries" element={<CountryPage />} />
                    <Route path="/" element={<Navigate to='/countries' />} />
                </Routes>

            </div>

        </>
    );
}

