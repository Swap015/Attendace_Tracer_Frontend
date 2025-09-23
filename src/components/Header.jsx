import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import UserContext from "../components/context/UserContext.jsx"; 

function Header() {
    const { user, loading, logout } = useContext(UserContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const hideUserControls = location.pathname === "/login" || location.pathname === "/";

    const handleLogout = async () => {
        await logout();
        navigate("/login");
        setMenuOpen(false);
    };

    return (
        <header className="bg-white/10 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-white/20">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-indigo-100 tracking-wide">
                    WorkTrace
                </h2>

                <nav className="hidden md:flex items-center space-x-6">
                    {!hideUserControls && !loading && user && (
                        <>
                            <button
                                onClick={handleLogout}
                                className="ml-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition text-xs xl:text-sm"
                            >
                                Logout
                            </button>

                            <div className="flex items-center space-x-2">
                                <FaUserCircle className="text-white text-xl" />
                                <span className="text-white font-semibold text-xs">
                                    {user?.name?.split(" ")[0]}
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
                <div className="md:hidden bg-gradient-to-r from-indigo-900/80 to-purple-800/80 backdrop-blur-lg border-t border-white/20">
                    <div className="flex flex-col items-center space-y-3 px-6 py-5">
                        {!loading && user && (
                            <>
                                <span className="text-white text-sm font-semibold bg-indigo-500/30 px-4 py-2 rounded-full shadow-md tracking-wide">
                                    {user?.name?.split(" ")[0]}
                                </span>

                                <button
                                    onClick={handleLogout}
                                    className="w-full max-w-[160px] py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-full shadow-md  hover:from-red-600 hover:to-red-700 "
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
