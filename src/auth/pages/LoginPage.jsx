import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const onLogin = () => {
        const lastPath = localStorage.getItem('lastPath') || '/';
        login('Jorge Almeida');
        navigate(lastPath, {
            replace: true
        });
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900">
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-sm">
                <h1 className="text-3xl font-bold text-center text-white mb-6">Login</h1>
                <hr className="border-gray-700 mb-6" />
                <button
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 cursor-pointer"
                    onClick={onLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
}
