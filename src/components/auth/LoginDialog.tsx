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

export function LoginDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button type="button" />}>Entrar</DialogTrigger>

      <DialogContent className="max-w-[460px] p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl">Entrar</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Entre para acessar sua carteira, coleção e finalizar compras.
        </p>

        <div className="mt-4">
          <LoginForm onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
