import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface NftDetailsProps {
  nft: {
    id: string;
    name: string;
    priceEth: string;
    imageUrl: string;
    collection: string;
    network: string;
  };
}

const collectionLabels: Record<string, string> = {
  "digital-art": "Arte digital",
  photography: "Fotografia",
  music: "Música",
  "3d-art": "Arte 3D",
  collectibles: "Colecionáveis",
  generative: "Generativa",
  games: "Jogos",
  subscriptions: "Assinaturas",
  utility: "Utilidade",
};

const networkLabels: Record<string, string> = {
  ethereum: "Ethereum",
  polygon: "Polygon",
  solana: "Solana",
};

function multiplyEth(price: string, quantity: number) {
  const [integerPart, decimalPart = ""] = price.split(".");
  const scale = 10n ** BigInt(decimalPart.length);

  const integer = BigInt(integerPart || "0") * scale;
  const decimal = BigInt(decimalPart || "0");

  const total = (integer + decimal) * BigInt(quantity);
  const whole = total / scale;

  if (decimalPart.length === 0) {
    return whole.toString();
  }

  const fraction = (total % scale)
    .toString()
    .padStart(decimalPart.length, "0")
    .replace(/0+$/, "");

  return fraction ? `${whole}.${fraction}` : whole.toString();
}

export function NftDetails({ nft }: NftDetailsProps) {
  const [quantity, setQuantity] = useState(1);

  const collection = collectionLabels[nft.collection] ?? nft.collection;

  const network = networkLabels[nft.network] ?? nft.network;

  const totalPrice = multiplyEth(nft.priceEth, quantity);

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function increaseQuantity() {
    setQuantity((current) => current + 1);
  }

  return (
    <main className="mx-auto w-full max-w-[1200px] px-6 py-6 lg:px-0 lg:py-10">
      <div className="mb-4 lg:hidden">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => window.history.back()}
          aria-label="Voltar"
        >
          <ArrowLeft />
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="overflow-hidden rounded-[28px]">
          <img
            src={nft.imageUrl}
            alt={nft.name}
            className="aspect-square w-full object-cover"
          />
        </div>

        <section className="flex flex-col">
          <h1 className="text-3xl font-bold lg:text-4xl">{nft.name}</h1>

          <p className="mt-6 text-base leading-7 text-muted-foreground">
            Um colecionável digital da coleção {collection}, verificado na{" "}
            {network}.
          </p>

          <div className="mt-6">
            <h2 className="mb-3 font-semibold">Edição:</h2>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled
                className="cursor-not-allowed rounded-full border px-3 py-1 text-sm opacity-40"
              >
                1/10
              </button>

              <button
                type="button"
                disabled
                className="cursor-not-allowed rounded-full border px-3 py-1 text-sm opacity-40"
              >
                1/25
              </button>

              <button
                type="button"
                className="rounded-full border border-primary bg-primary/10 px-3 py-1 text-sm font-semibold text-primary"
              >
                1/50
              </button>

              <button
                type="button"
                disabled
                className="cursor-not-allowed rounded-full border px-3 py-1 text-sm opacity-40"
              >
                ABERTA
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm text-muted-foreground">
            <p>ID do token: #{nft.id}</p>

            <p>Coleção: {collection}</p>

            <p>Rede: {network}</p>
          </div>

          <div className="mt-8 rounded-[28px] border p-5 lg:mt-auto">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-semibold">Qtd.</span>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  disabled={quantity === 1}
                  onClick={decreaseQuantity}
                >
                  <Minus />
                </Button>

                <span className="min-w-6 text-center text-xl font-semibold">
                  {quantity}
                </span>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={increaseQuantity}
                >
                  <Plus />
                </Button>
              </div>

              <strong className="text-xl lg:text-2xl">{totalPrice} ETH</strong>
            </div>

            <div className="mt-5 flex gap-3">
              <Button
                type="button"
                className="h-12 flex-1 text-base font-semibold"
              >
                Comprar NFT
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-12 w-12 shrink-0 rounded-full"
                aria-label="Adicionar ao carrinho"
              >
                <ShoppingCart />
              </Button>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-12 hidden border-t pt-8 lg:block">
        <h2 className="text-xl font-semibold">Detalhes do NFT</h2>

        <p className="mt-4 max-w-4xl leading-7 text-muted-foreground">
          {nft.name} é uma obra digital da coleção {collection}. Os dados do
          token são registrados na rede {network}.
        </p>

        <div className="mt-6 space-y-4 text-sm">
          <div>
            <h3 className="font-semibold">Rede:</h3>

            <p className="mt-1 text-muted-foreground">{network}</p>
          </div>

          <div>
            <h3 className="font-semibold">Contrato:</h3>

            <p className="mt-1 text-muted-foreground">
              Contrato inteligente verificado.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Coleção:</h3>

            <p className="mt-1 text-muted-foreground">{collection}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
