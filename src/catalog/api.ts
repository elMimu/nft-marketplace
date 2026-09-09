import { apiClient } from "@/api/client";

import type { CatalogResponse, CatalogParams } from "./types";

export async function getCatalog(
  params: CatalogParams,
): Promise<CatalogResponse> {
  const response = await apiClient.get<CatalogResponse>("/nfts", { params });

  return response.data;
}
