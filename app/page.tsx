"use client"

import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/sign-in");
  }, [router]);

  return (
    <div className={ "w-screen h-screen flex items-center justify-center" }>
      <Spinner size={ "md" }/>
    </div>
  )
}
