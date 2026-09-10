import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { useCatalogQuery } from "@/catalog/queries";
import { MobileBottomNav } from "@/components/catalog/MobileBottomNav";
import { MobileFilters } from "@/components/catalog/MobileFilters";
import { NftCard } from "@/components/catalog/NftCard";
import { Search } from "@/components/catalog/Search";
import { Sidebar } from "@/components/catalog/Sidebar";
import { EditorialSection } from "@/components/home/EditorialSelection";
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

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 2) {
    return [1, 2, 3];
  }

  if (currentPage >= totalPages - 1) {
    return [totalPages - 2, totalPages - 1, totalPages];
  }

  return [currentPage - 1, currentPage, currentPage + 1];
}

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

    input.focus({
      preventScroll: true,
    });

    input.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  function handlePage(page: number) {
    navigate({
      search: (previous) => ({
        ...previous,
        page,
      }),
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
    <div className="pb-28 lg:pb-0">
      <div className="mx-auto w-full max-w-[1200px]">
        <div
          className="
            flex gap-3
            px-6 pt-5
            lg:hidden
          "
        >
          <Search
            value={searchInput}
            onChange={setSearchInput}
            className="min-w-0 flex-1 mb-2"
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

        <div className="flex flex-col gap-8">
          <Header onSearchClick={handleSearchFocus} />

          <div className="px-6 lg:px-0">
            <Hero />
          </div>
        </div>
      </div>

      <main
        id="catalog"
        className="
          mx-auto mt-7
          w-full max-w-[1200px]
          px-6
          lg:mt-12 lg:px-0
        "
      >
        <div
          className="
            grid gap-10
            lg:grid-cols-[260px_minmax(0,1fr)]
          "
        >
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
              className="
                mb-6 hidden
                lg:flex
              "
            />

            <div
              className="
                mb-7 flex
                items-end justify-between
              "
            >
              <div
                className="
                  flex gap-4
                  overflow-x-auto
                  whitespace-nowrap
                  lg:gap-6
                "
              >
                <span
                  className="
                    shrink-0
                    border-b-[3px]
                    border-primary
                    pb-2
                    text-[16px]
                    font-bold
                    text-accent
                    lg:text-[14px]
                    lg:font-medium
                  "
                >
                  Todos os NFTs
                </span>

                <span
                  className="
                    shrink-0
                    border-b-[3px]
                    border-transparent
                    pb-2
                    text-[16px]
                    font-normal
                    text-foreground
                    lg:text-[14px]
                    lg:text-muted-foreground
                  "
                >
                  Novos lançamentos
                </span>

                <span
                  className="
                    shrink-0
                    border-b-[3px]
                    border-transparent
                    pb-2
                    text-[16px]
                    font-normal
                    text-foreground
                    lg:text-[14px]
                    lg:text-muted-foreground
                  "
                >
                  Em alta
                </span>
              </div>

              <label
                className="
                  hidden items-center
                  gap-2 lg:flex
                "
              >
                <span className="text-[14px] text-muted-foreground">
                  Ordenar por:
                </span>

                <select
                  value={searchParams.sort}
                  onChange={(event) => handleSort(event.target.value)}
                  className="
                    bg-background
                    text-[14px]
                    text-foreground
                    outline-none
                  "
                >
                  <option value="featured">Listados recentemente</option>

                  <option value="price-asc">Menor preço</option>

                  <option value="price-desc">Maior preço</option>
                </select>
              </label>
            </div>

            {data && (
              <p
                className="
                  mb-4 hidden
                  text-[14px]
                  text-muted-foreground
                  lg:block
                "
              >
                Página {data.page} de {data.totalPages} · {data.totalItems} NFTs
              </p>
            )}

            {isPending && (
              <p className="text-muted-foreground">Carregando NFTs...</p>
            )}

            {isError && (
              <p className="text-muted-foreground">
                Não foi possível carregar os NFTs.
              </p>
            )}

            {data && data.items.length > 0 && (
              <div
                className="
                    grid grid-cols-2
                    gap-x-4 gap-y-10
                    lg:grid-cols-3
                    lg:gap-x-8
                    lg:gap-y-14
                  "
              >
                {data.items.map((nft) => (
                  <NftCard key={nft.id} nft={nft} />
                ))}
              </div>
            )}

            {data?.items.length === 0 && (
              <p className="text-muted-foreground">
                Nenhum produto encontrado.
              </p>
            )}

            {data && data.totalPages > 1 && (
              <div
                className="
                    mt-10 flex
                    items-center
                    justify-center gap-2
                    lg:justify-end
                  "
              >
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={data.page <= 1}
                  className="
                      flex h-8 w-8
                      items-center
                      justify-center
                      text-foreground
                      disabled:opacity-40
                    "
                  aria-label="Página anterior"
                >
                  &lt;
                </button>

                {getVisiblePages(data.page, data.totalPages).map((page) => {
                  const selected = page === data.page;

                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => handlePage(page)}
                      className={`
                          flex h-8 w-8
                          items-center
                          justify-center
                          rounded-[6px]
                          text-[14px]
                          font-medium
                          ${selected
                          ? "bg-primary text-[var(--link)]"
                          : "bg-card text-foreground"
                        }
                        `}
                      aria-current={selected ? "page" : undefined}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={data.page >= data.totalPages}
                  className="
                      flex h-8 w-8
                      items-center
                      justify-center
                      text-foreground
                      disabled:opacity-40
                    "
                  aria-label="Próxima página"
                >
                  &gt;
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <EditorialSection />

      <MobileBottomNav />
    </div>
  );
}
