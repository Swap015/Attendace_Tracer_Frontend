function Footer() {
    return (
        <footer className="bg-gradient-to-r from-indigo-900 via-purple-800 to-black text-gray-300 ">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">


                <h1 className="text-lg font-bold text-indigo-400">© 2025 AttendEase</h1>


                <div className="flex space-x-6 my-3 md:my-0">
                    <a href="#" className="hover:text-white">Privacy</a>
                    <a href="#" className="hover:text-white">Terms</a>
                    <a href="#" className="hover:text-white">Contact</a>
                </div>

                {/* Right - Social */}
                <div className="flex space-x-5">
                    <a href="#" className="hover:text-indigo-400 text-xl">🐦</a>
                    <a href="#" className="hover:text-indigo-400 text-xl">📘</a>
                    <a href="#" className="hover:text-indigo-400 text-xl">📸</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
