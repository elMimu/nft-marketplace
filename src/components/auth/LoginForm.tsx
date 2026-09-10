import { Eye, EyeOff } from "lucide-react";
import { type FormEvent, useState } from "react";

import { useAuth } from "@/auth/AuthContext";
import { Button } from "@/components/ui/button";

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const success = login(email, password);

    if (!success) {
      setError("Informe um e-mail e uma senha válida.");
      return;
    }

    setError("");
    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="contato@email.com"
        className="
          h-12 w-full rounded-xl border bg-background px-4
          outline-none focus:ring-2 focus:ring-ring
        "
        required
      />

      <div
        className="
          flex h-12 items-center rounded-xl border
          bg-background px-4
          focus-within:ring-2 focus-within:ring-ring
        "
      >
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Senha"
          className="min-w-0 flex-1 bg-transparent outline-none"
          required
        />

        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          className="ml-3 text-muted-foreground"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" className="h-12 w-full font-semibold">
        Entrar
      </Button>
    </form>
  );
}
