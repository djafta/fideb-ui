import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/users";

export function useUser() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["user",],
        queryFn: () => getUser(),
    });

    return {
        user: data?.data,
        isLoading,
        isError,
    };
}