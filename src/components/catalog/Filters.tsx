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
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
