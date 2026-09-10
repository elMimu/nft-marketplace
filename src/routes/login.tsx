import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { LoginForm } from "@/components/auth/LoginForm";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  function handleSuccess() {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    navigate({
      to: "/",
      search: {
        search: "",
        page: 1,
        sort: "featured",
        collection: "",
        network: "",
        priceMin: "",
        priceMax: "",
      },
    });
  }

  return (
    <main className="flex min-h-screen justify-center px-6 pt-28">
      <div className="w-full max-w-[366px]">
        <h1 className="text-center text-5xl font-bold tracking-[0.12em]">
          KURIO
        </h1>

        <section className="mt-20">
          <h2 className="mb-10 text-center text-3xl font-bold">Entrar</h2>

          <LoginForm onSuccess={handleSuccess} />
        </section>
      </div>
    </main>
  );
}
