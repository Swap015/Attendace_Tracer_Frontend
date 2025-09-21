
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-700 to-black p-4 text-center">

            <h1 className="text-6xl sm:text-8xl font-extrabold text-red-500 mb-4">404</h1>

            <p className="text-xl sm:text-2xl text-white mb-6">
                Oops! The page you are looking for does not exist.
            </p>

            <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-300 text-lg sm:text-xl"
            >
                Go to Login
            </button>

        </div>
    );
};

export default NotFound;
