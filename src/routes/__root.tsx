import {
  createRootRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";

import { Footer } from "@/components/layout/Footer";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const hideFooter =
    pathname === "/login" ||
    pathname === "/order-confirmation";

  return (
    <>
      <Outlet />

      {!hideFooter && <Footer />}
    </>
  );
}
