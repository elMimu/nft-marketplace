import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { LogIn, Search, ShoppingCart, User } from "lucide-react";

import { useAuth } from "@/auth/AuthContext";
import { useCart } from "@/cart/useCart";
import { LoginDialog } from "@/components/auth/LoginDialog";

const HOME_SEARCH = {
  search: "",
  page: 1,
  sort: "featured",
  collection: "",
  network: "",
  priceMin: "",
  priceMax: "",
} as const;

interface HeaderProps {
  onSearchClick?: () => void;
}

function navClass(active: boolean) {
  return [
    "flex h-full items-center border-b-4 px-1",
    "text-[16px] font-normal transition-colors",
    active
      ? "border-primary text-accent"
      : "border-transparent text-foreground",
  ].join(" ");
}

export function Header({ onSearchClick }: HeaderProps) {
  const navigate = useNavigate();

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const { user } = useAuth();
  const { items } = useCart();

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const homeActive = pathname === "/";
  const marketActive = pathname === "/cart";

  async function handleSearch() {
    if (onSearchClick) {
      onSearchClick();
      return;
    }

    if (pathname !== "/") {
      await navigate({
        to: "/",
        search: HOME_SEARCH,
      });
    }
  }

  return (
    <header
      className="
        hidden border-b-[0.3px]
        border-primary bg-background
        lg:block
      "
    >
      <div
        className="
          grid h-[76px] w-full
          grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]
          items-center
        "
      >
        <div className="justify-self-start">
          <Link
            to="/"
            search={HOME_SEARCH}
            className="
              text-[14px] font-bold
              tracking-[0.12em]
              text-foreground
            "
          >
            KURIO
          </Link>
        </div>

        <nav
          className="
            flex h-full
            items-center gap-12
          "
          aria-label="Navegação principal"
        >
          <Link
            to="/"
            search={HOME_SEARCH}
            className={navClass(homeActive)}
            aria-current={homeActive ? "page" : undefined}
          >
            Início
          </Link>

          <span
            className={navClass(marketActive)}
            aria-current={marketActive ? "page" : undefined}
          >
            Mercado
          </span>

          <span className={navClass(false)}>Criadores</span>

          <span className={navClass(false)}>Aprenda</span>
        </nav>

        <div
          className="
            flex h-full items-center
            justify-self-end gap-8
          "
        >
          <button
            type="button"
            onClick={handleSearch}
            className="
              flex h-full items-center
              text-foreground
              transition-colors
              hover:text-accent
            "
            aria-label="Buscar NFTs"
          >
            <Search className="h-7 w-7" strokeWidth={2.25} />
          </button>

          <Link
            to="/cart"
            className="
              relative flex h-full
              items-center
              text-foreground
              transition-colors
              hover:text-accent
            "
            aria-label={`Carrinho com ${cartCount} itens`}
          >
            <ShoppingCart className="h-7 w-7" strokeWidth={2.25} />

            {cartCount > 0 && (
              <span
                className="
                  absolute right-[-12px]
                  top-[12px]
                  flex h-5 min-w-5
                  items-center justify-center
                  rounded-full
                  bg-primary px-1
                  text-xs font-bold
                  text-primary-foreground
                "
              >
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <Link
              to="/profile"
              className="
                flex h-full items-center
                justify-center px-3
                text-foreground
                transition-colors
                hover:text-accent
              "
              aria-label="Meu perfil"
            >
              <User className="h-7 w-7" strokeWidth={2.25} />
            </Link>
          ) : (
            <LoginDialog
              triggerLabel="Entrar"
              triggerIcon={<LogIn className="h-5 w-5" strokeWidth={2} />}
              triggerClassName="
                h-11 gap-2
                rounded-[6px]
                bg-primary px-5
                text-[16px]
                font-medium
                text-primary-foreground
                hover:bg-accent
              "
            />
          )}
        </div>
      </div>
    </header>
  );
}
