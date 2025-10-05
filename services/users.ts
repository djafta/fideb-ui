import { api } from "@/services/api";

export type User = {
    data: {
        username: string;
        fullName: string;
        groups: string[];
        branch: string;
        branchName: string;
    }
};

export function getUser() {
    return api.get<User>(`/users/me`).then((response) => ({
        data: response.data.data,
    }))
}
