import type { NftItem } from "@/catalog/types";
import { http, HttpResponse } from "msw";

const nfts: NftItem[] = [
  {
    id: "1",
    name: "Emerald Ape #042",
    imageUrl: "/images/nft-hero.png",
    priceEth: "1.25",
  },
  {
    id: "2",
    name: "Cyber Skull #018",
    imageUrl: "/images/nft-hero.png",
    priceEth: "0.85",
  },
];

export const handlers = [
  http.get("/api/nfts", async () => {
    return HttpResponse.json(nfts);
  }),
];
