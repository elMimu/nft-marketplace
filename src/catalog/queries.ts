import { useQuery } from "@tanstack/react-query";

import { getCatalog } from "./api";
import type { CatalogParams } from "./types";

export function useCatalogQuery(params: CatalogParams) {
  return useQuery({
    queryKey: ["nfts", params],
    queryFn: () => getCatalog(params),
  });
}
