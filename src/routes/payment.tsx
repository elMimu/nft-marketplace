import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

import { PaymentPage } from "@/components/payment/PaymentPage";
import { Header } from "@/components/layout/Header";

export const Route = createFileRoute("/payment")({
  validateSearch: (search) => {
    const discount = Number(search.discount);

    return {
      discount:
        Number.isFinite(discount) && discount >= 0 && discount <= 100
          ? discount
          : 0,
    };
  },

  beforeLoad: () => {
    const user = localStorage.getItem("kurio-user");

    if (!user) {
      throw redirect({
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
  },

  component: RouteComponent,
});

function RouteComponent() {
  const { discount } = Route.useSearch();
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

      <PaymentPage discountPercent={discount} />
    </div>
  );
}
