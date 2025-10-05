import { useMutation } from "@tanstack/react-query";
import { login, logout  } from "@/services/auth";

type SignInData = {
    username: string;
    password: string;
}

export function useAuth() {

    const signIn = useMutation({
        mutationFn: (data: SignInData) => {
            return login(data)
        }
    })

    const signOut = useMutation({
        mutationFn: () => {
            return logout();
        }
    })

    return {
        signIn,
        signOut
    }
}
