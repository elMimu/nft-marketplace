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
    <Link
      to="/nfts/$nftId"
      params={{
        nftId: nft.id,
      }}
      className="block min-w-0"
    >
      <article className="min-w-0">
        <div
          className="
            aspect-square
            rounded-[24px]
            bg-card
            p-2
          "
        >
          <div
            className="
              h-full w-full
              overflow-hidden
              rounded-[20px]
            "
          >
            <img
              src={nft.imageUrl}
              alt={nft.name}
              className="
                h-full w-full
                object-cover
              "
            />
          </div>
        </div>

        <div className="px-2 pt-3">
          <h3
            className="
              truncate
              text-[16px]
              font-normal
              leading-[24px]
              text-foreground
            "
          >
            {nft.name}
          </h3>

          <p
            className="
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
