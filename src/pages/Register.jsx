import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaUserShield } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "employee",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post("http://localhost:8000/api/user/register", formData);
            toast.success(" Registered Successfully!");
            setFormData({ name: "", email: "", password: "", role: "employee" });
        } catch {
            toast.error("Registration Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center from-indigo-800 via-purple-700 to-black p-4">
            <div className="xs:max-w-xs sm:min-w-sm xl:min-w-md  bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-white mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="relative">
                        <FaUser className="absolute top-3 left-3 text-white" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400  "
                        />
                    </div>


                    <div className="relative">
                        <FaEnvelope className="absolute top-3 left-3 text-white" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    <div className="relative">
                        <FaLock className="absolute top-3 left-3 text-white" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>


                    <div className="relative">
                        <FaUserShield className="absolute top-3 left-3 text-white" />
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            <option value="employee" className="text-black">Employee</option>
                            <option value="admin" className="text-black">Admin</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center gap-2 py-2 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500 rounded-lg text-white font-semibold shadow-md"
                    >
                        {loading ? (
                            <>Registering
                                <span className="loading loading-spinner loading-sm sm:loading-md lg:loading-lg"></span>
                    
                            </>
                        ) : (
                            <span className="text-xs sm:text-sm 2xl:text-base ">Register</span>
                        )}
                    </button>

                </form>

                <p className="text-gray-300 text-sm text-center mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-white font-bold hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
