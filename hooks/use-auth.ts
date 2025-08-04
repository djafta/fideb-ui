import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/auth";

type SignInData = {
    username: string;
    password: string;
}

export function useAuth() {

    const signIn = useMutation({
        mutationFn: (data: SignInData) => {
            try {
                return login(data)
            } catch (error) {
                return {
                    error
                }
            }
        }
    })

    return {
        signIn,
    }
}
