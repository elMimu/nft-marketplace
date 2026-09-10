import { FeaturedNft } from "./FeaturedNft";
import { Filters } from "./Filters";

interface SidebarProps {
  collection: string;
  network: string;
  priceMin: string;
  priceMax: string;
  onCollectionChange: (collection: string) => void;
  onNetworkChange: (network: string) => void;
  onPriceApply: (priceMin: string, priceMax: string) => void;
}

export function Sidebar({
  collection,
  network,
  priceMin,
  priceMax,
  onCollectionChange,
  onNetworkChange,
  onPriceApply,
}: SidebarProps) {
  return (
    <aside className="hidden overflow-hidden bg-card lg:block">
      <div className="px-8 py-8">
        <Filters
          collection={collection}
          network={network}
          priceMin={priceMin}
          priceMax={priceMax}
          onCollectionChange={onCollectionChange}
          onNetworkChange={onNetworkChange}
          onPriceApply={onPriceApply}
        />
      </div>

      <div className="h-8 bg-background" />

      <FeaturedNft />
    </aside>
  );
}
