import { Link } from "@tanstack/react-router";

interface NftCardProps {
  nft: {
    id: string;
    name: string;
    priceEth: string;
    imageUrl: string;
  };
}

export function NftCard({ nft }: NftCardProps) {
  return (
    <Link to="/nfts/$nftId" params={{ nftId: nft.id }} className="block">
      <article className="min-w-0">
        <div
          className="
            aspect-square
            bg-card
            p-2
          "
        >
          <div
            className="
              h-full w-full
              overflow-hidden
              rounded-[18px]
            "
          >
            <img
              src={nft.imageUrl}
              alt={nft.name}
              className="
                h-full w-full
                object-cover
                transition-transform
                duration-200
                hover:scale-[1.02]
              "
            />
          </div>
        </div>

        <div className="pt-3">
          <h3
            className="
              truncate
              text-[16px]
              font-medium
              leading-[24px]
              text-foreground
            "
          >
            {nft.name}
          </h3>

          <p
            className="
              mt-1
              text-[16px]
              font-bold
              leading-[24px]
              text-accent
            "
          >
            {nft.priceEth} ETH
          </p>
        </div>
      </article>
    </Link>
  );
}
