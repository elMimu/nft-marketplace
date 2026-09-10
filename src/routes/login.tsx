import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

type AuthMode = "login" | "register";

function RouteComponent() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<AuthMode>("login");

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

        {mode === "login" ? (
          <section className="mt-20">
            <h2 className="mb-10 text-center text-3xl font-bold">Entrar</h2>

            <LoginForm onSuccess={handleSuccess} />

            <button
              type="button"
              onClick={() => setMode("register")}
              className="mt-12 w-full text-center text-muted-foreground"
            >
              Novo na Kurio? Criar uma conta
            </button>
          </section>
        ) : (
          <section className="mt-20">
            <h2 className="mb-10 text-center text-3xl font-bold">
              Criar perfil de colecionador
            </h2>

            <RegisterForm onSuccess={handleSuccess} />

            <button
              type="button"
              onClick={() => setMode("login")}
              className="mt-12 w-full text-center text-muted-foreground"
            >
              Já tem uma conta? Entre
            </button>
          </section>
        )}
      </div>
    </main>
  );
}
