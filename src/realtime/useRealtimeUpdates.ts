import { useEffect } from "react";

import { queryClient } from "@/lib/query-client";
import { socket } from "@/realtime/socket";

interface NftUpdate {
  index: number;
  priceEth?: string;
  imageUrl?: string;
}

interface CatalogNft {
  id: string;
  name: string;
  priceEth: string;
  imageUrl: string;
  collection: string;
  network: string;
}

interface CatalogData {
  items: CatalogNft[];
  page: number;
  totalPages: number;
  totalItems: number;
}

interface OrderUpdatedEvent {
  id: string;
  status?: string;
}

export function useRealtimeUpdates() {
  useEffect(() => {
    if (import.meta.env.VITE_ENABLE_REALTIME_MOCK !== "true") {
      return;
    }

    function handleNftUpdated(update: NftUpdate) {
      queryClient.setQueriesData<CatalogData>(
        {
          queryKey: ["nfts"],
        },
        (current) => {
          if (!current) {
            return current;
          }

          return {
            ...current,
            items: current.items.map((nft, index) =>
              index === update.index
                ? {
                  ...nft,
                  ...(update.priceEth ? { priceEth: update.priceEth } : {}),
                  ...(update.imageUrl ? { imageUrl: update.imageUrl } : {}),
                }
                : nft,
            ),
          };
        },
      );
    }

    function handleOrderUpdated(event: OrderUpdatedEvent) {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      queryClient.invalidateQueries({
        queryKey: ["order", event.id],
      });
    }

    socket.on("nft.updated", handleNftUpdated);

    socket.on("order.updated", handleOrderUpdated);

    socket.connect();

    return () => {
      socket.off("nft.updated", handleNftUpdated);

      socket.off("order.updated", handleOrderUpdated);

      socket.disconnect();
    };
  }, []);
}
