import { useState } from "react";

import { LoginForm } from "@/components/auth/LoginForm";
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

export function LoginDialog({
  triggerLabel = "Entrar",
  triggerClassName,
  onSuccess,
}: LoginDialogProps) {
  const [open, setOpen] = useState(false);

  function handleSuccess() {
    setOpen(false);
    onSuccess?.();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        render={
          <Button
            type="button"
            className={triggerClassName}
          />
        }
      >
        {triggerLabel}
      </DialogTrigger>

      <DialogContent className="max-w-[460px] p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Entrar
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Entre para acessar sua conta e continuar sua compra.
        </p>

        <div className="mt-4">
          <LoginForm onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
