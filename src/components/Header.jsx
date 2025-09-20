import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="bg-white/10 backdrop-blur-lg shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="text-2xl font-extrabold text-indigo-400 tracking-wide">
                    AttendEase
                </Link>

                {/* Nav Links */}
                <nav className="hidden md:flex space-x-8">
                    <Link to="/" className="text-white hover:text-indigo-400 transition">
                        Register
                    </Link>
                    <Link to="/login" className="text-white hover:text-indigo-400 transition">
                        Login
                    </Link>
                    <Link to="/about" className="text-white hover:text-indigo-400 transition">
                        About
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white hover:text-indigo-400">
                    ☰
                </button>
            </div>
        </header>
    );
}

export default Header;
