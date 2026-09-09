import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header>
      <div className="border-b flex p-4 lg:p-0 items-center justify-between">
        {/* TODO - logo change to figma pattern */}
        <Link
          className="border lg:w-[160px]"
          to="/"
          search={{
            search: "",
            page: 1,
          }}
        >
          KURIO
        </Link>

        <nav className="border flex items-center gap-8">
          <Link
            className="border"
            to="/"
            search={{
              search: "",
              page: 1,
            }}
          >
            Inicio
          </Link>
          <span className="border">Mercado</span>
          <span className="border">Criadores</span>
          <span className="border">Aprenda</span>
        </nav>

        {/*TODO SEARCHBAR*/}
        <div className="border flex items-center gap-8">
          <button className="border">Search</button>
          <button className="border">Carrinho</button>
          <Button>Entrar</Button>
        </div>
      </div>
    </header>
  );
}

// export { Button, buttonVariants }
