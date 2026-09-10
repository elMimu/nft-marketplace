import { Heart, Home, ScanLine, ShoppingCart, User } from "lucide-react";

export function MobileBottomNav() {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-40 flex h-20 items-center justify-around rounded-t-3xl border lg:hidden"
    >
      <button type="button" aria-label="Início">
        <Home />
      </button>

      <button type="button" aria-label="Favoritos">
        <Heart />
      </button>

      <button
        type="button"
        aria-label="Explorar"
        className="-mt-10 flex h-16 w-16 items-center justify-center rounded-full border"
      >
        <ScanLine />
      </button>

      <button type="button" aria-label="Carrinho">
        <ShoppingCart />
      </button>

      <button type="button" aria-label="Perfil">
        <User />
      </button>
    </nav>
  );
}
