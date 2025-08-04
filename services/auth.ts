import { api } from '@/services/api';

export const login = async ({ username, password }: { username: string, password: string }) => {
    const response = await api.post<{
        data: {
            token: string
        }
    }>("/auth/login", {
        username,
        password,
    })

    if (response.status !== 200) {
        throw new Error("Failed to sign in");
    }

    return response.data.data;
}