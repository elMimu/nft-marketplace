import { useState } from "react";

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
  { label: "Arte digital", value: "digital-art", count: 33 },
  { label: "Fotografia", value: "photography", count: 12 },
  { label: "Música", value: "music", count: 65 },
  { label: "Arte 3D", value: "3d-art", count: 39 },
  { label: "Colecionáveis", value: "collectibles", count: 23 },
  { label: "Generativa", value: "generative", count: 17 },
  { label: "Jogos", value: "games", count: 19 },
  { label: "Assinaturas", value: "subscriptions", count: 13 },
  { label: "Utilidade", value: "utility", count: 18 },
];

const networks = [
  { label: "Ethereum", value: "ethereum", count: 119 },
  { label: "Polygon", value: "polygon", count: 78 },
  { label: "Solana", value: "solana", count: 86 },
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
        <h2 className="mb-5 text-lg font-semibold">Coleções</h2>

        <div className="space-y-4">
          {collections.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() =>
                onCollectionChange(collection === item.value ? "" : item.value)
              }
              className={`flex w-full items-center justify-between text-left ${collection === item.value ? "font-semibold text-primary" : ""
                }`}
            >
              <span>{item.label}</span>
              <span>({item.count})</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-lg font-semibold">Faixa de preço</h2>

        <div className="space-y-4">
          <input
            type="text"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            placeholder="Preço mínimo"
            className="w-full border px-3 py-2"
          />

          <input
            type="text"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            placeholder="Preço máximo"
            className="w-full border px-3 py-2"
          />

          <button
            type="button"
            className="border px-4 py-2"
            onClick={() => onPriceApply(minPrice, maxPrice)}
          >
            Aplicar
          </button>
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-lg font-semibold">Rede</h2>

        <div className="space-y-4">
          {networks.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() =>
                onNetworkChange(network === item.value ? "" : item.value)
              }
              className={`flex w-full items-center justify-between text-left ${network === item.value ? "font-semibold text-primary" : ""
                }`}
            >
              <span>{item.label}</span>
              <span>({item.count})</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
