import { useState, useEffect } from "react";
import UserContext from "./UserContext.jsx";
import api from "../../api/axios.js";
import { useNavigate } from "react-router-dom";


const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const res = await api.get("/user/me");
            setUser(res.data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await api.post("/user/logout", null);
            setUser(null);
            navigate("/login");
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, fetchUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
