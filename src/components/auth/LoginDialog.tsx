import { useState } from "react";

import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface LoginDialogProps {
  triggerLabel?: string;
  triggerClassName?: string;
  onSuccess?: () => void;
}

type AuthMode = "login" | "register";

export function LoginDialog({
  triggerLabel = "Entrar",
  triggerClassName,
  onSuccess,
}: LoginDialogProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");

  function handleSuccess() {
    setOpen(false);
    setMode("login");
    onSuccess?.();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (!value) {
          setMode("login");
        }
      }}
    >
      <DialogTrigger
        render={<Button type="button" className={triggerClassName} />}
      >
        {triggerLabel}
      </DialogTrigger>

      <DialogContent className="max-w-[500px] p-8">
        <DialogHeader>
          <DialogTitle className="sr-only">Autenticação</DialogTitle>
        </DialogHeader>

        <div className="flex justify-center gap-2 text-2xl font-semibold">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={
              mode === "login" ? "text-foreground" : "text-muted-foreground"
            }
          >
            Entrar
          </button>

          <span>|</span>

          <button
            type="button"
            onClick={() => setMode("register")}
            className={
              mode === "register" ? "text-primary" : "text-muted-foreground"
            }
          >
            Criar conta
          </button>
        </div>

        {mode === "login" ? (
          <>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Entre para acessar sua conta e continuar suas compras.
            </p>

            <div className="mt-6">
              <LoginForm onSuccess={handleSuccess} />
            </div>
          </>
        ) : (
          <>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Crie seu perfil de colecionador e conecte uma carteira quando
              quiser.
            </p>

            <div className="mt-6">
              <RegisterForm onSuccess={handleSuccess} />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
