import { Filters } from "./Filters";

interface SidebarProps {
  collection: string;
  network: string;
  onCollectionChange: (collection: string) => void;
  onNetworkChange: (network: string) => void;
}

export function Sidebar({
  collection,
  network,
  onCollectionChange,
  onNetworkChange,
}: SidebarProps) {
  return (
    <aside className="hidden border p-5 lg:block">
      <Filters
        collection={collection}
        network={network}
        onCollectionChange={onCollectionChange}
        onNetworkChange={onNetworkChange}
      />
    </aside>
  );
}
