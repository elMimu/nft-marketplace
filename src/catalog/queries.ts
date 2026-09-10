import { useQuery } from "@tanstack/react-query";
import type { NftItem } from "./types";
import { apiClient } from "@/api/client";

import { getCatalog } from "./api";
import type { CatalogParams } from "./types";

export function useCatalogQuery(params: CatalogParams) {
  return useQuery({
    queryKey: ["nfts", params],
    queryFn: () => getCatalog(params),
  });
}

export function useNftQuery(id: string) {
  return useQuery({
    queryKey: ["nft", id],
    queryFn: async () => {
      const response = await apiClient.get<NftItem>(`/nfts/${id}`);
      return response.data;
    },
  });
}
