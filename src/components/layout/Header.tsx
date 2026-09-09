import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header>
      <div className="border-b flex  mx-auto w-full max-w-[1200px] p-4 lg:p-0 items-center justify-between">
        {/* TODO - logo change to figma pattern */}
        <Link className="border lg:w-[160px]" to="/">
          KURIO
        </Link>

        <nav className="border flex items-center gap-8">
          <Link className="border" to="/">
            Inicio
          </Link>
          <Link className="border" to="/">
            Mercado
          </Link>
          <Link className="border" to="/">
            Criadores
          </Link>
          <Link className="border" to="/">
            Aprenda
          </Link>
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
