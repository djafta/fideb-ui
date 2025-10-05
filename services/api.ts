import axios from "axios";

if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined in the environment variables.");
}

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials: false,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("fideb-auth-token");

    if (token) {
        config.headers.Authorization = `Bearer ${ token }`;
    }
    return config;
});