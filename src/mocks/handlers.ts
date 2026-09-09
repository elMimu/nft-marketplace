import { http, HttpResponse } from "msw";
import { nfts } from "./nfts";

export const handlers = [
  http.get("/api/nfts", async ({ request }) => {
    const url = new URL(request.url);

    const search = url.searchParams.get("search") ?? "";
    const page = Number(url.searchParams.get("page") ?? "");

    const filteredNtfs = search
      ? nfts.filter((nft) =>
        nft.name.toLowerCase().includes(search.toLowerCase()),
      )
      : nfts;

    if (filteredNtfs.length <= 0) {
      return HttpResponse.json({});
    }

    const itemsPerPage = 4;

    // 0 - 3, 4 - 7...
    const start = itemsPerPage * (page - 1);
    const end = start + itemsPerPage;

    const items = filteredNtfs.slice(start, end);
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
