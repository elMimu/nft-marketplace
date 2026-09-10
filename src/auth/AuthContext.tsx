import { createContext, type ReactNode, useContext, useState } from "react";

interface User {
  email: string;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const STORAGE_KEY = "kurio-user";

const AuthContext = createContext<AuthContextValue | null>(null);

function loadUser(): User | null {
  try {
    const savedUser = localStorage.getItem(STORAGE_KEY);

    if (!savedUser) {
      return null;
    }

    return JSON.parse(savedUser) as User;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadUser);

  function login(email: string, password: string) {
    if (!email.trim() || password.length < 4) {
      return false;
    }

    const newUser = {
      email: email.trim(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));

    setUser(newUser);

    return true;
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
