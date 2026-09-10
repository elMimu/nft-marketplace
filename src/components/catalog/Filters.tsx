import { useState } from "react";

import { Button } from "@/components/ui/button";

interface FiltersProps {
  collection: string;
  network: string;
  priceMin: string;
  priceMax: string;
  onCollectionChange: (collection: string) => void;
  onNetworkChange: (network: string) => void;
  onPriceApply: (priceMin: string, priceMax: string) => void;
}

const collections = [
  { label: "Arte digital", value: "digital-art" },
  { label: "Fotografia", value: "photography" },
  { label: "Música", value: "music" },
  { label: "Arte 3D", value: "3d-art" },
  { label: "Colecionáveis", value: "collectibles" },
  { label: "Generativa", value: "generative" },
  { label: "Jogos", value: "games" },
  { label: "Assinaturas", value: "subscriptions" },
  { label: "Utilidade", value: "utility" },
];

const networks = [
  { label: "Ethereum", value: "ethereum" },
  { label: "Polygon", value: "polygon" },
  { label: "Solana", value: "solana" },
];

export function Filters({
  collection,
  network,
  priceMin,
  priceMax,
  onCollectionChange,
  onNetworkChange,
  onPriceApply,
}: FiltersProps) {
  const [minPrice, setMinPrice] = useState(priceMin);
  const [maxPrice, setMaxPrice] = useState(priceMax);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-base font-semibold">Coleções</h2>

        <div className="space-y-2">
          {collections.map((item) => {
            const selected = collection === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onCollectionChange(selected ? "" : item.value)}
                className={`
                  flex w-full items-center rounded-lg
                  px-3 py-2.5 text-left text-sm
                  transition-colors
                  ${selected
                    ? "bg-primary/10 font-semibold text-primary"
                    : "hover:bg-muted"
                  }
                `}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-base font-semibold">Faixa de preço</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <label className="space-y-1.5">
              <span className="text-xs text-muted-foreground">Min</span>

              <div className="flex h-11 items-center rounded-lg border px-3 focus-within:ring-2 focus-within:ring-ring">
                <input
                  type="text"
                  inputMode="decimal"
                  value={minPrice}
                  onChange={(event) => setMinPrice(event.target.value)}
                  placeholder="0.00"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                />

                <span className="ml-2 text-xs text-muted-foreground">ETH</span>
              </div>
            </label>

            <label className="space-y-1.5">
              <span className="text-xs text-muted-foreground">Max</span>

              <div className="flex h-11 items-center rounded-lg border px-3 focus-within:ring-2 focus-within:ring-ring">
                <input
                  type="text"
                  inputMode="decimal"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                  placeholder="12.30"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                />

                <span className="ml-2 text-xs text-muted-foreground">ETH</span>
              </div>
            </label>
          </div>

          <Button
            type="button"
            className="w-full transition-transform active:scale-[0.98]"
            onClick={() => onPriceApply(minPrice, maxPrice)}
          >
            Aplicar
          </Button>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-base font-semibold">Rede</h2>

        <div className="space-y-2">
          {networks.map((item) => {
            const selected = network === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onNetworkChange(selected ? "" : item.value)}
                className={`
                  flex w-full items-center rounded-lg
                  px-3 py-2.5 text-left text-sm
                  transition-colors
                  ${selected
                    ? "bg-primary/10 font-semibold text-primary"
                    : "hover:bg-muted"
                  }
                `}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
