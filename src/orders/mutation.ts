import { useMutation } from "@tanstack/react-query";

import type { CartItem } from "@/cart/useCart";
import { apiClient } from "@/api/client";

interface CreateOrderData {
  wallet: string;
  total: string;
  items: CartItem[];
}

export interface Order extends CreateOrderData {
  id: string;
  transactionId: string;
  date: string;
}

interface CreateOrderVariables {
  data: CreateOrderData;
  idempotencyKey: string;
}

export function useCreateOrderMutation() {
  return useMutation({
    mutationFn: async ({ data, idempotencyKey }: CreateOrderVariables) => {
      const response = await apiClient.post<Order>("/orders", data, {
        headers: {
          "Idempotency-Key": idempotencyKey,
        },
      });

      return response.data;
    },
  });
}
