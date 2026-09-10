import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";

import { useCatalogQuery } from "@/catalog/queries";
import { useState } from "react";
import { Sidebar } from "@/components/catalog/Sidebar";
import { NftCard } from "@/components/catalog/NftCard";

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
  console.log(data?.totalPages);

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
      <main className="mx-auto mt-12 w-full max-w-[1200px] px-4 lg:px-0">
        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <Sidebar />

          <section>
            <form
              className="mb-6 flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                handleSearch();
              }}
            >
              <input
                className="flex-1 border px-3 py-2"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                type="search"
                placeholder="Buscar NFTs"
              />

              <button type="submit" className="border px-4 py-2">
                Buscar
              </button>
            </form>
            {/* toolbar */}
            <div className="mb-7 flex items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <button type="button" className="font-semibold text-primary">
                  Todos os NFTs
                </button>

                <button type="button">Novos lançamentos</button>

                <button type="button">Em alta</button>
              </div>

              <label className="flex items-center gap-2">
                <span>Ordenar por:</span>

                <select
                  value={searchParams.sort}
                  onChange={(event) => handleSort(event.target.value)}
                  className="border bg-background"
                >
                  <option value="featured">Listados recentemente</option>
                  <option value="price-asc">Menor preço</option>
                  <option value="price-desc">Maior preço</option>
                </select>
              </label>
            </div>
            {/* grid */}
            {isPending && <p>Loading NFTs...</p>}
            {isError && <p>Unable to load NFTs.</p>}
            {data && data.items.length > 0 && (
              <div className="grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-3">
                {data.items.map((nft) => (
                  <NftCard key={nft.id} nft={nft} />
                ))}
              </div>
            )}

            {data?.items.length == 0 && <p>Nehum produto encontrado.</p>}

            {/* pagination */}

            {data && data.totalPages > 1 && (
              <div className="mt-12 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={data.page <= 1}
                  className="border px-3 py-2 disabled:opacity-40"
                >
                  &lt;
                </button>

                <span className="border px-3 py-2">{data.page}</span>

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={data.page >= data.totalPages}
                  className="border px-3 py-2 disabled:opacity-40"
                >
                  &gt;
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
