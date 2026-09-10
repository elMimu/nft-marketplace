import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

import { ProfilePage } from "@/components/profile/ProfilePage";
import { Header } from "@/components/layout/Header";

export const Route = createFileRoute("/profile")({
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

      <ProfilePage />
    </div>
  );
}
