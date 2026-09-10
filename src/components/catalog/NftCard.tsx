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

      <div className="pt-3">
        <h3 className="font-semibold">{nft.name}</h3>
        <p className="font-semibold text-primary">{nft.priceEth} ETH</p>
      </div>
    </article>
  );
}
