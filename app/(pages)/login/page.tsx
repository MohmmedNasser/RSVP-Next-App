"use client";

import { signIn } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";

async function signInAction(
    prevState: { error: string } | null,
    formData: FormData
) {
    return signIn(prevState, formData);
}

const Login = () => {
    const [state, formAction, isPending] = useActionState(signInAction, null);

    return (
        <section className="flex flex-col justify-center items-center min-h-screen ">
            <div className="mb-5 text-center">
                <h1 className="text-3xl md:text-5xl font-bold">Admin Login</h1>
                <p className="mt-4 text-md text-gray-700 text-center">
                    Access the event management dashboard
                </p>
            </div>
            <div className="flex flex-col items-center justify-center border border-gray-200 bg-gray-50/50 px-5 py-8 shadow-sm min-w-[350px] max-w-md md:min-w-md  rounded-2xl">
                <form action={formAction} className="w-full space-y-5">
                    <div className="space-y-3">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="you@example.com"
                            className="h-[50px]"
                        />
                    </div>
                    <div className="space-y-3">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="******"
                            className="h-[50px]"
                        />
                    </div>
                    {state?.error && (
                        <p className="text-red-500 text-sm">{state.error}</p>
                    )}
                    <Button
                        type="submit"
                        className="w-full py-6 rounded-full cursor-pointer"
                    >
                        {isPending ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default Login;
