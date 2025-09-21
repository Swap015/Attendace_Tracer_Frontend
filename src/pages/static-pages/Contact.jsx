import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

function Contact() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-black via-purple-900 to-indigo-900 text-gray-200 flex flex-col items-center justify-center px-6 py-12">
            <h1 className="text-4xl font-bold text-indigo-200 mb-6">Get in Touch</h1>
            <p className="max-w-xl text-center mb-6 text-lg">
                Have a question, suggestion, or collaboration idea?
                I’d love to hear from you. Connect with me through any of the platforms below 👇
            </p>

            <div className="flex space-x-8 text-4xl">
                <a href="https://www.linkedin.com/in/swapnil-motghare" target="_blank" rel="noreferrer" className="hover:text-indigo-400">
                    <FaLinkedin />
                </a>
                <a href="https://github.com/Swap015" target="_blank" rel="noreferrer" className="hover:text-indigo-400">
                    <FaGithub />
                </a>
                <a href="mailto:swapnilmotghare44@gmail.com" className="hover:text-indigo-400">
                    <FaEnvelope />
                </a>
            </div>
        </div>
    );
}

export default Contact;
