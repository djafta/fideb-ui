'use client'

import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export default function SignOutPage() {
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    signOut.mutate();
    localStorage.removeItem("fideb-auth-token");
  }, []);

  useEffect(() => {
    if (signOut.isError || signOut.isSuccess) {
      const timer = setTimeout(() => {
        router.push("/sign-in");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [signOut.isError, signOut.isSuccess, router]);

  return (
    <div className="fixed left-0 top-0 w-full h-full flex items-center justify-center">
      <Spinner/>
    </div>
  );
}
