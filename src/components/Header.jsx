import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useContext, useState } from "react";
import UserContext from "./context/UserContext.jsx";
import { toast } from "react-toastify";


function Header() {
    const { user, setUser, loading } = useContext(UserContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8000/api/user/logout", {}, { withCredentials: true });
            setUser(null);
            navigate("/login");
        } catch {
            toast.error("Logout failed");
        }
    };

    const hideUserControls = location.pathname === "/login" || location.pathname === "/";

    return (
        <header className="bg-white/10 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-white/20">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <h2 className="text-2xl font-bold text-indigo-100 tracking-wide">
                    WorkTrace
                </h2>

                <nav className="hidden md:flex items-center space-x-6">

                    {!hideUserControls && !loading && user && (
                        <>
                            <button
                                onClick={handleLogout}
                                className="ml-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
                            >
                                Logout
                            </button>

                            <div className="flex items-center space-x-2">
                                <FaUserCircle className="text-white text-xl" />
                                <span className="text-white font-semibold text-xs">
                                    {user?.name?.slice(0, 4)}
                                </span>
                            </div>
                        </>
                    )}
                </nav>


                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-white text-2xl focus:outline-none"
                    >
                        {menuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>


            {menuOpen && (
                <div className="md:hidden bg-white/10 backdrop-blur-lg border-t border-white/20">
                    <div className="flex flex-col space-y-3 px-6 py-4">

                        {!loading && user && (
                            <>
                                <span className="text-white font-semibold bg-indigo-500/20 px-3 py-1 rounded-full shadow-sm">
                                    {user?.name?.slice(0, 4)}
                                </span>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMenuOpen(false);
                                    }}
                                    className="mt-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
