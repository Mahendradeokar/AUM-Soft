import { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "../components";

export const metadata: Metadata = {
  title: "Singup",
  description: "Singup",
};

export default function Singup() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back!</h1>
        <p className="text-sm text-muted-foreground">Log in to your account</p>
      </div>
      <LoginForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="singup"
          className="underline underline-offset-4 hover:text-primary"
        >
          Sign up now
        </Link>
      </p>
    </>
  );
}
