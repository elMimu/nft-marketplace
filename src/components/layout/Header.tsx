import { Search, ShoppingCart, User } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { useAuth } from "@/auth/AuthContext";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onSearchClick: () => void;
}

const homeSearch = {
  search: "",
  page: 1,
  sort: "featured",
  collection: "",
  network: "",
  priceMin: "",
  priceMax: "",
};

export function Header({ onSearchClick }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="hidden h-[72px] items-center justify-between lg:flex">
      <Link to="/" search={homeSearch} className="font-bold tracking-widest">
        KURIO
      </Link>

      <nav className="flex items-center gap-8">
        <Link to="/" search={homeSearch}>
          Início
        </Link>

        <Link to="/" search={homeSearch}>
          Mercado
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onSearchClick}
          aria-label="Buscar NFTs"
        >
          <Search />
        </Button>

        <Button
          nativeButton={false}
          variant="ghost"
          size="icon"
          render={<Link to="/cart" aria-label="Carrinho" />}
        >
          <ShoppingCart />
        </Button>

        {user ? (
          <Button
            nativeButton={false}
            variant="ghost"
            size="icon"
            render={<Link to="/profile" aria-label="Meu perfil" />}
          >
            <User />
          </Button>
        ) : (
          <LoginDialog />
        )}
      </div>
    </header>
  );
}
