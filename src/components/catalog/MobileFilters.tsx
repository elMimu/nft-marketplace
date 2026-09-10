import { Filters } from "./Filters";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileFiltersProps {
  collection: string;
  network: string;
  onCollectionChange: (collection: string) => void;
  onNetworkChange: (network: string) => void;
}

export function MobileFilters({
  collection,
  network,
  onCollectionChange,
  onNetworkChange,
}: MobileFiltersProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={<button type="button" className="border px-4 py-2 lg:hidden" />}
      >
        Filtros
      </SheetTrigger>

      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          <Filters
            collection={collection}
            network={network}
            onCollectionChange={onCollectionChange}
            onNetworkChange={onNetworkChange}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
