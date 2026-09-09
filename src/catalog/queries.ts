import { useQuery } from "@tanstack/react-query";

import { getNftsItems } from "./api";

export function useNftsItemsQuery() {
  return useQuery({
    queryKey: ["nfts"],
    queryFn: getNftsItems,
  });
}
