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
  {
    label: "Arte digital",
    value: "digital-art",
    count: 33,
  },
  {
    label: "Fotografia",
    value: "photography",
    count: 12,
  },
  {
    label: "Música",
    value: "music",
    count: 65,
  },
  {
    label: "Arte 3D",
    value: "3d-art",
    count: 39,
  },
  {
    label: "Colecionáveis",
    value: "collectibles",
    count: 23,
  },
  {
    label: "Generativa",
    value: "generative",
    count: 17,
  },
  {
    label: "Jogos",
    value: "games",
    count: 19,
  },
  {
    label: "Assinaturas",
    value: "subscriptions",
    count: 13,
  },
  {
    label: "Utilidade",
    value: "utility",
    count: 18,
  },
];

const networks = [
  {
    label: "Ethereum",
    value: "ethereum",
    count: 119,
  },
  {
    label: "Polygon",
    value: "polygon",
    count: 78,
  },
  {
    label: "Solana",
    value: "solana",
    count: 86,
  },
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
    <div className="space-y-10">
      <section>
        <h2
          className="
            mb-4 text-[16px] font-bold
            leading-[24px] text-foreground
          "
        >
          Coleções
        </h2>

        <div className="space-y-1">
          {collections.map((item) => {
            const selected = collection === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onCollectionChange(selected ? "" : item.value)}
                className={`
                  flex w-full items-center
                  justify-between py-2
                  text-left text-[14px]
                  font-normal leading-[24px]
                  transition-colors
                  ${selected
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                <span>{item.label}</span>
                <span>({item.count})</span>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2
          className="
            mb-4 text-[16px] font-bold
            leading-[24px] text-foreground
          "
        >
          Faixa de preço
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <label>
            <span
              className="
                mb-1.5 block text-[12px]
                text-muted-foreground
              "
            >
              Min
            </span>

            <div
              className="
                flex h-[40px] items-center
                rounded-[6px]
                border border-primary
                bg-muted px-3
                focus-within:ring-1
                focus-within:ring-primary
              "
            >
              <input
                type="text"
                inputMode="decimal"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
                placeholder="0.02"
                className="
                  min-w-0 flex-1
                  bg-transparent
                  text-[14px]
                  text-foreground
                  outline-none
                  placeholder:text-muted-foreground
                "
              />

              <span
                className="
                  ml-2 text-[12px]
                  text-muted-foreground
                "
              >
                ETH
              </span>
            </div>
          </label>

          <label>
            <span
              className="
                mb-1.5 block text-[12px]
                text-muted-foreground
              "
            >
              Max
            </span>

            <div
              className="
                flex h-[40px] items-center
                rounded-[6px]
                border border-primary
                bg-muted px-3
                focus-within:ring-1
                focus-within:ring-primary
              "
            >
              <input
                type="text"
                inputMode="decimal"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                placeholder="12.30"
                className="
                  min-w-0 flex-1
                  bg-transparent
                  text-[14px]
                  text-foreground
                  outline-none
                  placeholder:text-muted-foreground
                "
              />

              <span
                className="
                  ml-2 text-[12px]
                  text-muted-foreground
                "
              >
                ETH
              </span>
            </div>
          </label>
        </div>

        <Button
          type="button"
          onClick={() => onPriceApply(minPrice, maxPrice)}
          className="
            mt-4 h-[40px]
            w-[140px]
            rounded-[6px]
            bg-primary
            px-5
            text-[16px]
            font-bold
            text-[var(--link)]
            hover:bg-accent
          "
        >
          Aplicar
        </Button>
      </section>

      <section>
        <h2
          className="
            mb-4 text-[16px] font-bold
            leading-[24px] text-foreground
          "
        >
          Rede
        </h2>

        <div className="space-y-1">
          {networks.map((item) => {
            const selected = network === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onNetworkChange(selected ? "" : item.value)}
                className={`
                  flex w-full items-center
                  justify-between py-2
                  text-left text-[14px]
                  font-normal leading-[24px]
                  transition-colors
                  ${selected
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                <span>{item.label}</span>
                <span>({item.count})</span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
