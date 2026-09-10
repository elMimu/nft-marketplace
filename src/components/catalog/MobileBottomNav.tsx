import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, House, ScanLine, ShoppingCart, User } from "lucide-react";

import { useAuth } from "@/auth/AuthContext";

const HOME_SEARCH = {
  search: "",
  page: 1,
  sort: "featured",
  collection: "",
  network: "",
  priceMin: "",
  priceMax: "",
} as const;

function navColor(active: boolean) {
  return active ? "text-primary" : "text-muted-foreground";
}

export function MobileBottomNav() {
  const { user } = useAuth();

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const homeActive = pathname === "/";
  const cartActive = pathname === "/cart";
  const accountActive = pathname === "/login" || pathname === "/profile";

  return (
    <nav
      className="
        fixed bottom-0 left-1/2 z-50
        flex h-[88px] w-full max-w-[414px]
        -translate-x-1/2 items-center
        justify-around
        rounded-t-[32px]
        bg-card px-5
        lg:hidden
      "
      aria-label="Navegação mobile"
    >
      <Link
        to="/"
        search={HOME_SEARCH}
        aria-label="Início"
        className={`
          flex h-12 w-12
          items-center justify-center
          transition-colors
          ${navColor(homeActive)}
        `}
      >
        <House
          className="h-7 w-7"
          strokeWidth={2.5}
          fill={homeActive ? "currentColor" : "none"}
        />
      </Link>

      <span
        className="
          flex h-12 w-12
          items-center justify-center
          text-muted-foreground
        "
        aria-hidden="true"
      >
        <Heart className="h-7 w-7" strokeWidth={2.3} fill="currentColor" />
      </span>

      <span
        className="
          -mt-9 flex h-[66px] w-[66px]
          items-center justify-center
          rounded-full
          bg-primary
          text-foreground
          shadow-lg
        "
        aria-hidden="true"
      >
        <ScanLine className="h-8 w-8" strokeWidth={2} />
      </span>

      <Link
        to="/cart"
        aria-label="Carrinho"
        className={`
          flex h-12 w-12
          items-center justify-center
          transition-colors
          ${navColor(cartActive)}
        `}
      >
        <ShoppingCart className="h-7 w-7" strokeWidth={2.3} />
      </Link>

      <Link
        to={user ? "/profile" : "/login"}
        aria-label={user ? "Meu perfil" : "Entrar"}
        className={`
          flex h-12 w-12
          items-center justify-center
          transition-colors
          ${navColor(accountActive)}
        `}
      >
        <User
          className="h-7 w-7"
          strokeWidth={2.3}
          fill={accountActive ? "currentColor" : "none"}
        />
      </Link>
    </nav>
  );
}
