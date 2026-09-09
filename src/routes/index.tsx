import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";

import { useNftsItemsQuery } from "@/catalog/queries";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending, isError } = useNftsItemsQuery();
  return (
    <div className="">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
        <Header />
        <Hero />
      </div>
      <main>
        {/* {} */}
        {isPending && <p>Loading NFTs...</p>}

        {isError && <p>Unable to load NFTs.</p>}

        {data && (
          <div>
            {data.map((nft) => (
              <p key={nft.id}>{nft.name}</p>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
