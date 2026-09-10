import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { CartPage } from "@/components/cart/CartPage";
import { Header } from "@/components/layout/Header";

export const Route = createFileRoute("/cart")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  function handleSearchClick() {
    navigate({
      to: "/",
      search: {
        search: "",
        page: 1,
        sort: "featured",
        collection: "",
        network: "",
        priceMin: "",
        priceMax: "",
      },
    });
  }

  return (
    <div>
      <div className="mx-auto hidden w-full max-w-[1200px] lg:block">
        <Header onSearchClick={handleSearchClick} />
      </div>

      <CartPage />
    </div>
  );
}
