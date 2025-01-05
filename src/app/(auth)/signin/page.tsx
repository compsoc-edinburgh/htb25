import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] max-w-screen-md w-full flex-col items-center justify-center">
      <LoginForm />
    </div>
  );
}