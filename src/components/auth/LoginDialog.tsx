import type { ReactNode } from "react";
import { useState } from "react";

import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface LoginDialogProps {
  triggerLabel?: string;
  triggerClassName?: string;
  triggerIcon?: ReactNode;
  onSuccess?: () => void;
}

type AuthMode = "login" | "register";

export function LoginDialog({
  triggerLabel = "Entrar",
  triggerClassName,
  triggerIcon,
  onSuccess,
}: LoginDialogProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");

  function handleSuccess() {
    setOpen(false);
    setMode("login");
    onSuccess?.();
  }

  function handleOpenChange(value: boolean) {
    setOpen(value);

    if (!value) {
      setMode("login");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button type="button" className={triggerClassName}>
            {triggerIcon}
            {triggerLabel}
          </Button>
        }
      />

      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "login" ? "Entrar" : "Criar conta"}
          </DialogTitle>

          <DialogDescription>
            {mode === "login"
              ? "Entre para continuar no Kurio."
              : "Crie sua conta para continuar no Kurio."}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2">
          <div className="mb-6 grid grid-cols-2 border-b border-primary">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`
                border-b-2 px-4 py-3 text-sm
                ${mode === "login"
                  ? "border-primary text-accent"
                  : "border-transparent text-muted-foreground"
                }
              `}
            >
              Entrar
            </button>

            <button
              type="button"
              onClick={() => setMode("register")}
              className={`
                border-b-2 px-4 py-3 text-sm
                ${mode === "register"
                  ? "border-primary text-accent"
                  : "border-transparent text-muted-foreground"
                }
              `}
            >
              Criar conta
            </button>
          </div>

          {mode === "login" ? (
            <LoginForm onSuccess={handleSuccess} />
          ) : (
            <RegisterForm onSuccess={handleSuccess} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
