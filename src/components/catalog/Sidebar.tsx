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
    <aside className="hidden border p-5 lg:block">
      <Filters
        collection={collection}
        network={network}
        priceMin={priceMin}
        priceMax={priceMax}
        onCollectionChange={onCollectionChange}
        onNetworkChange={onNetworkChange}
        onPriceApply={onPriceApply}
      />
    </aside>
  );
}
