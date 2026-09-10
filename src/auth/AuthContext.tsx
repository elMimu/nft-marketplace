import { createContext, type ReactNode, useContext, useState } from "react";

interface User {
  email: string;
  username?: string;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => void;
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

  function saveUser(newUser: User) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));

    setUser(newUser);
  }

  function login(email: string, password: string) {
    if (!email.trim() || password.length < 4) {
      return false;
    }

    saveUser({
      email: email.trim(),
    });

    return true;
  }

  function register(username: string, email: string, password: string) {
    if (!password) {
      return;
    }

    saveUser({
      username: username.trim(),
      email: email.trim(),
    });
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
        register,
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
