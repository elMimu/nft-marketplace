import { apiClient } from "@/api/client";

import type { NftItem } from "./types";

export async function getNftsItems(): Promise<NftItem[]> {
  const response = await apiClient.get<NftItem[]>("/nfts");

  return response.data;
}
