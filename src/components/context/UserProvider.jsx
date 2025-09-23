import { useState, useEffect } from "react";
import UserContext from "./UserContext.jsx";
import api from "../../api/axios.js";



const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


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
