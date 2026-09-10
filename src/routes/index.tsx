import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";

import { useCatalogQuery } from "@/catalog/queries";
import { useState } from "react";

export const Route = createFileRoute("/")({
  validateSearch: (search) => ({
    search: typeof search.search === "string" ? search.search : "",
    page: Number(search.page) > 0 ? Number(search.page) : 1,
    sort: typeof search.sort === "string" ? search.sort : "featured",
    collection: typeof search.collection === "string" ? search.collection : "",
    network: typeof search.network === "string" ? search.network : "",
    priceMin: typeof search.priceMin === "string" ? search.priceMin : "",
    priceMax: typeof search.priceMax === "string" ? search.priceMax : "",
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const searchParams = Route.useSearch();
  const [searchInput, setSearchInput] = useState(searchParams.search);
  const { data, isPending, isError } = useCatalogQuery(searchParams);

  const navigate = Route.useNavigate();

  function handleSearch() {
    navigate({
      search: (previous) => ({ ...previous, search: searchInput, page: 1 }),
    });
  }

  function handleNextPage() {
    navigate({
      search: (previous) => ({
        ...previous,
        page: previous.page + 1,
      }),
    });
  }

  function handlePreviousPage() {
    navigate({
      search: (previous) => ({
        ...previous,
        page: previous.page - 1,
      }),
    });
  }

  function handleSort(value: string) {
    navigate({
      search: (previous) => ({
        ...previous,
        sort: value,
        page: 1,
      }),
    });
  }

  return (
    <div className="">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
        <Header />
        <Hero />
      </div>
      <main>
        {" "}
        <input
          className="border"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          type="text"
        />
        <button onClick={handleSearch}>Search</button>
        <select
          value={searchParams.sort}
          onChange={(event) => handleSort(event.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
        {/* {} */}
        {isPending && <p>Loading NFTs...</p>}
        {isError && <p>Unable to load NFTs.</p>}
        {data && (
          <>
            {data.items.map((nft) => (
              <p key={nft.id}>{nft.name}</p>
            ))}

            <button onClick={handlePreviousPage}>Previous</button>
            <span>
              Page {data.page} of {data.totalPages}
            </span>
            <button onClick={handleNextPage}>next</button>
          </>
        )}
      </main>
    </div>
  );
}
