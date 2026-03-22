import GuestGuard from "@/components/guest-guard";
import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <GuestGuard>
      <section className="flex min-h-screen items-center justify-center px-4 py-10">
        <LoginForm />
      </section>
    </GuestGuard>
  );
}
