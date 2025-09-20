import { useState } from "react";
import { FaEnvelope, FaLock, FaUserShield } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
    const [formData, setFormData] = useState({
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
            const res = await axios.post("http://localhost:8000/api/user/login", formData, {
                withCredentials: true, 
            });

            toast.success("✅ Login Successful!");
            console.log("Tokens:", res.data); 

            setFormData({ email: "", password: "", role: "employee" });
        } catch (err) {
            toast.error(err.response?.data?.message || "❌ Login Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-700 to-black p-4">
            <div className="xs:max-w-xs sm:min-w-xs  xl:min-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
                <h2 className="text-2xl font-bold text-center text-white mb-6">
                    Welcome Back
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div className="relative">
                        <FaEnvelope className="absolute top-3 left-3 text-white" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <FaLock className="absolute top-3 left-3 text-white" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    {/* Role */}
                    <div className="relative">
                        <FaUserShield className="absolute top-3 left-3 text-white" />
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            <option value="employee" className="text-black">Employee</option>
                            <option value="admin" className="text-black">Admin</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 rounded-lg text-white font-semibold shadow-md transition transform hover:scale-105"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-gray-300 text-sm text-center mt-4">
                    Don’t have an account?{" "}
                    <a href="/" className="text-white font-bold hover:underline">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
