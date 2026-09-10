import { SlidersHorizontal } from "lucide-react";

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
  priceMin: string;
  priceMax: string;
  onCollectionChange: (collection: string) => void;
  onNetworkChange: (network: string) => void;
  onPriceApply: (priceMin: string, priceMax: string) => void;
}

export function MobileFilters({
  collection,
  network,
  priceMin,
  priceMax,
  onCollectionChange,
  onNetworkChange,
  onPriceApply,
}: MobileFiltersProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <button
            type="button"
            aria-label="Abrir filtros"
            className="
              flex h-12 w-12 shrink-0 items-center justify-center
              rounded-xl border
            "
          />
        }
      >
        <SlidersHorizontal className="h-5 w-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="
          w-[86vw] max-w-[360px]
          overflow-y-auto
          rounded-l-[28px]
          border-l
          p-0
        "
      >
        <SheetHeader
          className="
            sticky top-0 z-10
            border-b
            bg-background
            px-6 py-5
          "
        >
          <SheetTitle className="text-xl font-semibold">
            Filtros
          </SheetTitle>
        </SheetHeader>

        <div className="px-6 py-6">
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
      </SheetContent>
    </Sheet>
  );
}
