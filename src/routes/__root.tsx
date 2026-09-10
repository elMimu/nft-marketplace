import {
  createRootRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";

import { Footer } from "@/components/layout/Footer";
import { useRealtimeUpdates } from "@/realtime/useRealtimeUpdates";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  useRealtimeUpdates();

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const hideFooter =
    pathname === "/login" || pathname === "/order-confirmation";

  return (
    <>
      <Outlet />

      {!hideFooter && <Footer />}
    </>
  );
}
