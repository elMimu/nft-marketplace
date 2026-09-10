import { SlidersHorizontal } from "lucide-react";

import { Filters } from "@/components/catalog/Filters";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileFiltersProps {
  collection: string;
  network: string;
  priceMin: string;
  priceMax: string;
  onCollectionChange: (
    collection: string,
  ) => void;
  onNetworkChange: (
    network: string,
  ) => void;
  onPriceApply: (
    priceMin: string,
    priceMax: string,
  ) => void;
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
            className="
              flex h-[56px] w-[56px]
              shrink-0 items-center
              justify-center
              rounded-[18px]
              bg-primary
              text-[var(--link)]
              transition-colors
              hover:bg-accent
            "
            aria-label="Abrir filtros"
          >
            <SlidersHorizontal
              className="h-6 w-6"
              strokeWidth={2}
            />
          </button>
        }
      />

      <SheetContent
        side="right"
        className="
          w-[90vw] max-w-[360px]
          border-0 bg-card
        "
      >
        <SheetHeader>
          <SheetTitle className="text-foreground">
            Filtros
          </SheetTitle>

          <SheetDescription className="sr-only">
            Filtre os NFTs por coleção, preço e rede.
          </SheetDescription>
        </SheetHeader>

        <div className="overflow-y-auto px-4 pb-10">
          <Filters
            collection={collection}
            network={network}
            priceMin={priceMin}
            priceMax={priceMax}
            onCollectionChange={
              onCollectionChange
            }
            onNetworkChange={
              onNetworkChange
            }
            onPriceApply={onPriceApply}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
