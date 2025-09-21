import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-gradient-to-r from-indigo-900 via-purple-800 to-black text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-3 lg:space-y-0">

 
                <div className="text-center lg:text-left">
                    <h1 className="text-lg sm:text-xl font-bold text-indigo-100">
                        © 2025 WorkTrace
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        Smarter way to track time, presence & productivity 🚀
                    </p>
                </div>

  
                <div className="flex justify-center space-x-6 text-sm sm:text-base">
                    <a href="/about" className="hover:text-white transition">
                        About
                    </a>
                    <a href="/contact" className="hover:text-white transition">
                        Contact
                    </a>
                </div>

                <div className="flex justify-center space-x-6 text-xl sm:text-2xl">
                    <a
                        href="https://www.linkedin.com/in/swapnil-motghare"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-indigo-400 transition"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="https://github.com/Swap015"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-indigo-400 transition"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=swapnilmotghare44@gmail.com&su=Hello%20Swapnil&body=I%20would%20like%20to%20connect%20with%20you."
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-indigo-400 transition"
                    >
                        <FaEnvelope />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
