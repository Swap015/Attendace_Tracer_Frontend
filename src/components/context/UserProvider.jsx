import { useState, useEffect } from "react";
import UserContext from "./UserContext.jsx";
import axios from "axios";

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/user/me", { withCredentials: true });
            setUser(res.data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await axios.post("http://localhost:8000/api/user/logout", null, { withCredentials: true });
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
