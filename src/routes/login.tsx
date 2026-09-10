import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

type AuthMode = "login" | "register";

const HOME_SEARCH = {
  search: "",
  page: 1,
  sort: "featured",
  collection: "",
  network: "",
  priceMin: "",
  priceMax: "",
} as const;

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");

  function handleBack() {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    navigate({
      to: "/",
      search: HOME_SEARCH,
    });
  }

  function handleSuccess() {
    navigate({
      to: "/",
      search: HOME_SEARCH,
    });
  }

  return (
    <main
      className="
        min-h-screen bg-background
        px-6 pb-10 pt-6
        lg:hidden
      "
    >
      <button
        type="button"
        onClick={handleBack}
        className="
          flex h-10 w-10
          items-center justify-center
          rounded-full
          text-foreground
          transition-colors
          hover:bg-card
        "
        aria-label="Voltar"
      >
        <ArrowLeft className="h-6 w-6" strokeWidth={2} />
      </button>

      <section className="mx-auto mt-8 w-full max-w-[360px]">
        <h1
          className="
            text-[28px] font-bold
            leading-[36px]
            text-foreground
          "
        >
          {mode === "login" ? "Entrar" : "Criar conta"}
        </h1>

        <p
          className="
            mt-2 text-[14px]
            leading-[22px]
            text-muted-foreground
          "
        >
          {mode === "login"
            ? "Entre para continuar no Kurio."
            : "Crie sua conta para continuar no Kurio."}
        </p>

        <div className="mt-8 flex">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`
              flex-1 border-b-[3px]
              pb-3 text-[14px]
              ${mode === "login"
                ? "border-primary font-bold text-accent"
                : "border-transparent font-normal text-muted-foreground"
              }
            `}
          >
            Entrar
          </button>

          <button
            type="button"
            onClick={() => setMode("register")}
            className={`
              flex-1 border-b-[3px]
              pb-3 text-[14px]
              ${mode === "register"
                ? "border-primary font-bold text-accent"
                : "border-transparent font-normal text-muted-foreground"
              }
            `}
          >
            Criar conta
          </button>
        </div>

        <div className="mt-8">
          {mode === "login" ? (
            <LoginForm onSuccess={handleSuccess} />
          ) : (
            <RegisterForm onSuccess={handleSuccess} />
          )}
        </div>
      </section>
    </main>
  );
}
