import { createFileRoute } from "@tanstack/react-router";

import { useNftQuery } from "@/catalog/queries";
import { NftDetails } from "@/components/nft/NftDetails";
import { Header } from "@/components/layout/Header";

export const Route = createFileRoute("/nfts/$nftId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { nftId } = Route.useParams();
  const { data, isPending, isError } = useNftQuery(nftId);

  return (
    <div>
      <div className="mx-auto hidden w-full max-w-[1200px] lg:block">
        <Header onSearchClick={() => {}} />
      </div>

      {isPending && (
        <p className="p-6 text-center">
          Carregando NFT...
        </p>
      )}

      {isError && (
        <p className="p-6 text-center">
          Não foi possível carregar o NFT.
        </p>
      )}

      {data && (
        <NftDetails nft={data} />
      )}
    </div>
  );
}
