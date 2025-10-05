'use client';
import { AuthProvider } from "@/providers";
import { LoadingFallback } from "@/components/loading-fallback";

export default function PrivateLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <AuthProvider loadingFallback={ <LoadingFallback/> }>
            { children }
        </AuthProvider>
    );
}
