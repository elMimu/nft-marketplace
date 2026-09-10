import type { NftItem } from "@/catalog/types";

interface NftCardProps {
  nft: NftItem;
}

export function NftCard({ nft }: NftCardProps) {
  return (
    <article>
      <div className="aspect-square overflow-hidden bg-card">
        <img
          src={nft.imageUrl}
          alt={nft.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="pt-2">
        <h3 className="text-sm font-semibold lg:text-base">{nft.name}</h3>

        <p className="text-sm font-semibold text-primary lg:text-base">
          {nft.priceEth} ETH
        </p>
      </div>
    </article>
  );
}
