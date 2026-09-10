import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/auth/AuthContext";
import { Button } from "@/components/ui/button";

interface RegisterFormProps {
  onSuccess?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleRegister() {
    if (!username.trim() || !email.trim()) {
      setError("Preencha todos os campos.");
      return;
    }

    if (password.length < 4) {
      setError("A senha deve ter pelo menos 4 caracteres.");
      return;
    }

    if (password !== confirmation) {
      setError("As senhas não coincidem.");
      return;
    }

    register(username, email, password);
    setError("");
    onSuccess?.();
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Nome de usuário"
        className="
          h-12 w-full rounded-xl border
          bg-background px-4 outline-none
          focus:ring-2 focus:ring-ring
        "
      />

      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Digite seu e-mail"
        className="
          h-12 w-full rounded-xl border
          bg-background px-4 outline-none
          focus:ring-2 focus:ring-ring
        "
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
        />

        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      <input
        type={showPassword ? "text" : "password"}
        value={confirmation}
        onChange={(event) => setConfirmation(event.target.value)}
        placeholder="Confirmar senha"
        className="
          h-12 w-full rounded-xl border
          bg-background px-4 outline-none
          focus:ring-2 focus:ring-ring
        "
      />

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button
        type="button"
        className="h-12 w-full font-semibold"
        onClick={handleRegister}
      >
        Criar conta
      </Button>
    </div>
  );
}
