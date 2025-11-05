import { createContext, ReactNode, useContext, useEffect } from "react";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: {
    username: string;
    groups: string[];
    fullName: string;
    branch: string;
    branchName: string;
  };
  isLoading?: boolean;
} | null;

const AuthContext = createContext<AuthContextType>(null);

export function AuthProvider({
                               children,
                               loadingFallback,
                             }: {
  children: ReactNode;
  loadingFallback: ReactNode;
}) {
  const { user, isLoading, isError } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (isError || !user)) {
      localStorage.removeItem("fideb-auth-token");
      router.push("/sign-in");
    }
  }, [isLoading, isError, user, router]);

  if (isLoading || isError || !user) {
    return <>{ loadingFallback }</>;
  }

  return (
    <AuthContext.Provider value={ { user, isLoading } }>
      { children }
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, isLoading } = context;

  return { user, isLoading };
}
