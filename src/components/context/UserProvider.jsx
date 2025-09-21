import { useState, useEffect } from "react";
import axios from "axios";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const fetchUser = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/user/me", {
                withCredentials: true,
            });
            setUser(res.data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
