import { createContext, type ReactNode, useContext, useState } from "react";

interface User {
  email: string;
  username?: string;
}

interface RegisteredUser {
  email: string;
  username: string;
  password: string;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
}

const SESSION_KEY = "kurio-user";
const USERS_KEY = "kurio-users";

const demoUser: RegisteredUser = {
  username: "demo",
  email: "demo@kurio.com",
  password: "123456",
};

const AuthContext = createContext<AuthContextValue | null>(null);

function loadUser(): User | null {
  try {
    const savedUser = localStorage.getItem(SESSION_KEY);

    if (!savedUser) {
      return null;
    }

    return JSON.parse(savedUser) as User;
  } catch {
    return null;
  }
}

function loadUsers(): RegisteredUser[] {
  try {
    const savedUsers = localStorage.getItem(USERS_KEY);

    if (!savedUsers) {
      return [demoUser];
    }

    const users = JSON.parse(savedUsers) as RegisteredUser[];

    const hasDemo = users.some((user) => user.email === demoUser.email);

    return hasDemo ? users : [demoUser, ...users];
  } catch {
    return [demoUser];
  }
}

function saveUsers(users: RegisteredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadUser);

  function saveSession(newUser: User) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));

    setUser(newUser);
  }

  function login(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();

    const registeredUser = loadUsers().find(
      (item) =>
        item.email.toLowerCase() === normalizedEmail &&
        item.password === password,
    );

    if (!registeredUser) {
      return false;
    }

    saveSession({
      email: registeredUser.email,
      username: registeredUser.username,
    });

    return true;
  }

  function register(username: string, email: string, password: string) {
    const users = loadUsers();
    const normalizedEmail = email.trim().toLowerCase();

    const alreadyExists = users.some(
      (item) => item.email.toLowerCase() === normalizedEmail,
    );

    if (alreadyExists) {
      return false;
    }

    const newUser: RegisteredUser = {
      username: username.trim(),
      email: normalizedEmail,
      password,
    };

    saveUsers([...users, newUser]);

    saveSession({
      username: newUser.username,
      email: newUser.email,
    });

    return true;
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
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
