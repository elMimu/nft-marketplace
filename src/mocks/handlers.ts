import { http, HttpResponse } from "msw";
import { nfts } from "./nfts";

export const handlers = [
  http.get("/api/nfts", async ({ request }) => {
    const url = new URL(request.url);

    const search = url.searchParams.get("search") ?? "";
    const collection = url.searchParams.get("collection") ?? "";
    const network = url.searchParams.get("network") ?? "";
    const priceMin = url.searchParams.get("priceMin") ?? "";
    const priceMax = url.searchParams.get("priceMax") ?? "";
    const page = Number(url.searchParams.get("page") ?? "");
    const sortMethod = url.searchParams.get("sort") ?? "";

    let filteredNtfs = [...nfts];

    if (search) {
      filteredNtfs.filter((nft) =>
        nft.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (collection) {
      filteredNtfs.filter((nft) => nft.collection == collection);
    }

    if (network) {
      filteredNtfs.filter((nft) => nft.network == network);
    }

    if (priceMin) {
      filteredNtfs.filter((nft) => Number(nft.priceEth) >= Number(priceMin));
    }

    if (priceMax) {
      filteredNtfs.filter((nft) => Number(nft.priceEth) <= Number(priceMax));
    }

    if (filteredNtfs.length <= 0) {
      return HttpResponse.json({});
    }

    const sortedNtfs = (() => {
      switch (sortMethod) {
        case "price-desc":
          return [...filteredNtfs].sort(
            (a, b) => Number(b.priceEth) - Number(a.priceEth),
          );

        case "price-asc":
          return [...filteredNtfs].sort(
            (a, b) => Number(a.priceEth) - Number(b.priceEth),
          );

        default:
          return filteredNtfs;
      }
    })();

    const itemsPerPage = 4;

    // 0 - 3, 4 - 7...
    const start = itemsPerPage * (page - 1);
    const end = start + itemsPerPage;

    const items = sortedNtfs.slice(start, end);
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return HttpResponse.json({
      items,
      page,
      totalPages,
      totalItems,
    });
  }),
];
