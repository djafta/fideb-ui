'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export function SignInForm({ className, ...props }: React.ComponentProps<"form">) {

    const { signIn } = useAuth();
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.currentTarget;

        if (!(target instanceof HTMLFormElement)) {
            console.error("Expected target to be an HTMLFormElement");
            return;
        }

        const username = target.username.value;
        const password = target.password.value;

        signIn.mutate(
            {
                username,
                password,
            },
            {
                onError: (err) => {
                    target.reset();
                    console.error(err);
                },
                onSuccess: (data) => {
                    target.reset();
                    localStorage.setItem("fideb-auth-token", data.token);
                    router.push("/dashboard");
                }
            }
        )
    }

    return (
        <form className={ cn("flex flex-col gap-6", className) } { ...props } onSubmit={ handleSubmit }>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl font-bold">Entrar na Sua Conta</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Introduza suas credências para entrar
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="username">Nome de usuário</Label>
                    <Input disabled={ signIn.isPending } id="username" name={ "username" } type="text"
                           placeholder="jbalate" required/>
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Palavra passe</Label>
                    </div>
                    <Input disabled={ signIn.isPending } id="password" type="password" name={ "password" } required/>
                </div>
                <Button disabled={ signIn.isPending } type="submit" className="w-full disabled:opacity-80">
                    Entrar
                    {
                        signIn.isPending && <Spinner/>
                    }
                </Button>
            </div>
            <div className={ cn("opacity-0 flex flex-col items-center gap-2 text-center", signIn.isError && "opacity-100") }>
                <p className="text-destructive text-sm">
                    Erro ao entrar. Por gentileza, confirme seus dados ou entre em contato com o departamento de informática.
                </p>
            </div>
        </form>
    )
}

