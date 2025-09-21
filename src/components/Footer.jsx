import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-gradient-to-r from-indigo-900 via-purple-800 to-black text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">

  
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <h1 className="text-lg font-bold text-indigo-100">© 2025 WorkTrace</h1>
                    <p className="text-sm text-gray-400">
                        Smarter way to track time, presence & productivity 🚀
                    </p>
                </div>

         
                <div className="flex space-x-6 mb-4 md:mb-0">
                    <a href="/about" className="hover:text-white transition">About</a>
                    <a href="/contact" className="hover:text-white transition">Contact</a>
                </div>

       
                <div className="flex space-x-6">
                    <a
                        href="https://www.linkedin.com/in/swapnil-motghare"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-indigo-400 text-2xl"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="https://github.com/Swap015"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-indigo-400 text-2xl"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=swapnilmotghare44@gmail.com&su=Hello%20Swapnil&body=I%20would%20like%20to%20connect%20with%20you."
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-indigo-400 text-2xl"
                    >
                        <FaEnvelope />
                    </a>


                </div>
            </div>
        </footer>
    );
}

export default Footer;
