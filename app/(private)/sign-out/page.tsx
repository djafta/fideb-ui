'use client'

import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export default function SignOutPage() {
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!signOut.isPending) {
      signOut.mutate();
      localStorage.removeItem("fideb-auth-token")
    }
  }, [signOut.mutate, signOut.isPending]);

  if (signOut.isError || signOut.isSuccess) {
    setTimeout(() => {
      router.push("/sign-in");
    }, 5000)
  }

  return (
    <div className="fixed left-0 top-0 w-full h-full flex items-center justify-center">
      <Spinner/>
    </div>
  )
}
