import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { useCatalogQuery } from "@/catalog/queries";
import { MobileBottomNav } from "@/components/catalog/MobileBottomNav";
import { MobileFilters } from "@/components/catalog/MobileFilters";
import { NftCard } from "@/components/catalog/NftCard";
import { Search } from "@/components/catalog/Search";
import { Sidebar } from "@/components/catalog/Sidebar";
import { Hero } from "@/components/home/Hero";
import { Header } from "@/components/layout/Header";

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

  const desktopSearchRef = useRef<HTMLInputElement>(null);
  const navigate = Route.useNavigate();

  useEffect(() => {
    setSearchInput(searchParams.search);
  }, [searchParams.search]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (searchInput === searchParams.search) {
        return;
      }

      navigate({
        search: (previous) => ({
          ...previous,
          search: searchInput,
          page: 1,
        }),
      });
    }, 350);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchInput, searchParams.search, navigate]);

  function handleSearchFocus() {
    const input = desktopSearchRef.current;

    if (!input) {
      return;
    }

    input.focus({ preventScroll: true });

    input.scrollIntoView({
      behavior: "smooth",
      block: "center",
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
        page: Math.max(1, previous.page - 1),
      }),
    });
  }

  function handlePriceApply(priceMin: string, priceMax: string) {
    navigate({
      search: (previous) => ({
        ...previous,
        priceMin,
        priceMax,
        page: 1,
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

  function handleCollection(collection: string) {
    navigate({
      search: (previous) => ({
        ...previous,
        collection,
        page: 1,
      }),
    });
  }

  function handleNetwork(network: string) {
    navigate({
      search: (previous) => ({
        ...previous,
        network,
        page: 1,
      }),
    });
  }

  return (
    <div className="pb-24 lg:pb-0">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="flex gap-3 px-6 pt-4 lg:hidden">
          <Search
            value={searchInput}
            onChange={setSearchInput}
            className="min-w-0 flex-1"
          />

          <MobileFilters
            collection={searchParams.collection}
            network={searchParams.network}
            priceMin={searchParams.priceMin}
            priceMax={searchParams.priceMax}
            onCollectionChange={handleCollection}
            onNetworkChange={handleNetwork}
            onPriceApply={handlePriceApply}
          />
        </div>

        <div className="flex flex-col gap-8 lg:gap-8">
          <Header onSearchClick={handleSearchFocus} />

          <div className="px-6 lg:px-0">
            <Hero />
          </div>
        </div>
      </div>

      <main className="mx-auto mt-8 w-full max-w-[1200px] px-6 lg:mt-12 lg:px-0">
        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <Sidebar
            collection={searchParams.collection}
            network={searchParams.network}
            priceMin={searchParams.priceMin}
            priceMax={searchParams.priceMax}
            onCollectionChange={handleCollection}
            onNetworkChange={handleNetwork}
            onPriceApply={handlePriceApply}
          />

          <section>
            <Search
              value={searchInput}
              onChange={setSearchInput}
              inputRef={desktopSearchRef}
              className="mb-6 hidden lg:block"
            />

            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-5 overflow-x-auto whitespace-nowrap">
                <button
                  type="button"
                  className="shrink-0 font-semibold text-primary"
                >
                  Todos os NFTs
                </button>

                <button type="button" className="shrink-0">
                  Novos lançamentos
                </button>

                <button type="button" className="shrink-0">
                  Em alta
                </button>
              </div>

              <label className="hidden items-center gap-2 lg:flex">
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

            {data && (
              <p className="mb-4 text-sm text-muted-foreground">
                Página {data.page} de {data.totalPages} · {data.totalItems} NFTs
              </p>
            )}

            {isPending && <p>Loading NFTs...</p>}

            {isError && <p>Unable to load NFTs.</p>}

            {data && data.items.length > 0 && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
                {data.items.map((nft) => (
                  <NftCard key={nft.id} nft={nft} />
                ))}
              </div>
            )}

            {data?.items.length === 0 && <p>Nenhum produto encontrado.</p>}

            {data && data.totalPages > 1 && (
              <div className="mt-10 flex justify-center gap-2 lg:justify-end">
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

        <MobileBottomNav />
      </main>
    </div>
  );
}
