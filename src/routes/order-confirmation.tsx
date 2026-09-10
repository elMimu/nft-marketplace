import { createFileRoute } from "@tanstack/react-router";

import { OrderConfirmation } from "@/components/order/OrderConfirmation";

export const Route = createFileRoute("/order-confirmation")({
  component: OrderConfirmation,
});
