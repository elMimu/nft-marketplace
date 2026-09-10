import { http, HttpResponse } from "msw";
import { nfts } from "./nfts";

export const handlers = [
  http.get("/api/nfts/:id", ({ params }) => {
    const nft = nfts.find((item) => item.id === params.id);

    if (!nft) {
      return HttpResponse.json({ message: "NFT not found" }, { status: 404 });
    }

    return HttpResponse.json(nft);
  }),

  http.get("/api/nfts", ({ request }) => {
    const url = new URL(request.url);

    const search = url.searchParams.get("search") ?? "";
    const page = Number(url.searchParams.get("page") ?? "1");
    const sort = url.searchParams.get("sort") ?? "featured";
    const collection = url.searchParams.get("collection") ?? "";
    const network = url.searchParams.get("network") ?? "";
    const priceMin = url.searchParams.get("priceMin") ?? "";
    const priceMax = url.searchParams.get("priceMax") ?? "";

    let filteredNfts = [...nfts];

    if (search) {
      filteredNfts = filteredNfts.filter((nft) =>
        nft.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (collection) {
      filteredNfts = filteredNfts.filter(
        (nft) => nft.collection === collection,
      );
    }

    if (network) {
      filteredNfts = filteredNfts.filter((nft) => nft.network === network);
    }

    if (priceMin) {
      filteredNfts = filteredNfts.filter(
        (nft) => Number(nft.priceEth) >= Number(priceMin),
      );
    }

    if (priceMax) {
      filteredNfts = filteredNfts.filter(
        (nft) => Number(nft.priceEth) <= Number(priceMax),
      );
    }

    if (sort === "price-asc") {
      filteredNfts.sort((a, b) => Number(a.priceEth) - Number(b.priceEth));
    }

    if (sort === "price-desc") {
      filteredNfts.sort((a, b) => Number(b.priceEth) - Number(a.priceEth));
    }

    const pageSize = 9;
    const totalItems = filteredNfts.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const start = (page - 1) * pageSize;
    const items = filteredNfts.slice(start, start + pageSize);

    console.log(totalItems);

    return HttpResponse.json({
      items,
      page,
      totalPages,
      totalItems,
    });
  }),
];
