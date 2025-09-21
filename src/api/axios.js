
import axios from "axios";
import { toast } from "react-toastify";


const api = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (originalRequest.url.includes("/user/login") || originalRequest.url.includes("/user/refresh")) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {

                await api.post("/user/refresh");

                return api(originalRequest);
            } catch (refreshError) {
                toast.error("Session expired. Please login again.");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;