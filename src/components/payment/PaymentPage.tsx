import { ArrowLeft, Check } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { useCart } from "@/cart/useCart";
import { Button } from "@/components/ui/button";
import {
  addEth,
  applyDiscountEth,
  multiplyEth,
  percentageEth,
} from "@/lib/eth";
import { useCreateOrderMutation } from "@/orders/mutations";
import { socket } from "@/realtime/socket";

interface PaymentPageProps {
  discountPercent: number;
}

const wallets = [
  {
    id: "walletconnect",
    name: "WalletConnect",
    symbol: "W",
  },
  {
    id: "metamask",
    name: "MetaMask",
    symbol: "M",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    symbol: "C",
  },
];

export function PaymentPage({ discountPercent }: PaymentPageProps) {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const createOrder = useCreateOrderMutation();

  const [wallet, setWallet] = useState("coinbase");
  const [mobileSuccess, setMobileSuccess] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [idempotencyKey] = useState(() => crypto.randomUUID());

  const subtotal = addEth(
    items.map((item) => multiplyEth(item.priceEth, item.quantity)),
  );

  const discount = percentageEth(subtotal, discountPercent);

  const total = applyDiscountEth(subtotal, discountPercent);

  function goHome() {
    navigate({
      to: "/",
      search: {
        search: "",
        page: 1,
        sort: "featured",
        collection: "",
        network: "",
        priceMin: "",
        priceMax: "",
      },
    });
  }

  function handleOrderSuccess(order: {
    id: string;
    transactionId: string;
    date: string;
    wallet: string;
    total: string;
    items: typeof items;
  }) {
    if (import.meta.env.VITE_ENABLE_REALTIME_MOCK === "true") {
      socket.emit("order.created", {
        id: order.id,
      });
    }

    clearCart();

    if (window.innerWidth < 1024) {
      setMobileSuccess(true);

      window.setTimeout(() => {
        goHome();
      }, 1200);

      return;
    }

    sessionStorage.setItem("kurio-last-order", JSON.stringify(order));

    navigate({
      to: "/order-confirmation",
    });
  }

  function confirmPurchase() {
    const selectedWallet =
      wallets.find((item) => item.id === wallet)?.name ?? wallet;

    setOrderError("");

    createOrder.mutate(
      {
        idempotencyKey,
        data: {
          wallet: selectedWallet,
          total,
          items,
        },
      },
      {
        onSuccess: handleOrderSuccess,
        onError: () => {
          setOrderError("Não foi possível confirmar a compra.");
        },
      },
    );
  }

  if (items.length === 0 && !mobileSuccess) {
    return (
      <main className="mx-auto w-full max-w-[900px] px-6 py-8 lg:px-0 lg:py-10">
        <h1 className="text-3xl font-bold">Pagamento com carteira</h1>

        <div className="mt-8 rounded-[28px] border p-8 text-center">
          <p className="text-muted-foreground">Seu carrinho está vazio.</p>

          <Button type="button" className="mt-6" onClick={goHome}>
            Voltar ao mercado
          </Button>
        </div>
      </main>
    );
  }

  return (
    <>
      {mobileSuccess && (
        <div
          className="
            fixed left-1/2 top-6 z-50
            -translate-x-1/2
            rounded-xl border bg-background
            px-5 py-3 shadow-lg
            lg:hidden
          "
        >
          Compra confirmada!
        </div>
      )}

      <main className="mx-auto min-h-[calc(100vh-72px)] w-full max-w-[1000px] px-6 py-8 lg:px-0 lg:py-10">
        <div className="mb-10 flex items-center gap-5">
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

          <h1 className="text-3xl font-bold">Pagamento com carteira</h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section>
            <h2 className="text-xl font-semibold">Carteira e rede</h2>

            <div className="mt-6 space-y-4">
              {wallets.map((item) => {
                const selected = wallet === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setWallet(item.id)}
                    className={`
                      flex w-full items-center gap-5
                      rounded-[24px] border p-5 text-left
                      transition-colors
                      ${selected ? "border-primary" : "hover:bg-muted"}
                    `}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border font-bold">
                      {item.symbol}
                    </span>

                    <span className="flex-1 font-semibold">{item.name}</span>

                    <span
                      className={`
                        flex h-6 w-6 items-center justify-center
                        rounded-full border
                        ${selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : ""
                        }
                      `}
                    >
                      {selected && <Check className="h-4 w-4" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <aside className="h-fit rounded-[28px] border p-6">
            <h2 className="text-xl font-semibold">Seus NFTs</h2>

            <div className="mt-5 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-14 w-14 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {item.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {item.quantity} × {item.priceEth} ETH
                    </p>
                  </div>

                  <strong className="text-sm">
                    {multiplyEth(item.priceEth, item.quantity)} ETH
                  </strong>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t pt-5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>

                <span>{subtotal} ETH</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Desconto ({discountPercent}%)
                  </span>

                  <span>- {discount} ETH</span>
                </div>
              )}

              <div className="flex justify-between border-t pt-4">
                <strong>Total</strong>

                <strong className="text-lg">{total} ETH</strong>
              </div>
            </div>

            {orderError && (
              <p className="mt-4 text-sm text-destructive">{orderError}</p>
            )}

            <Button
              type="button"
              className="mt-8 h-12 w-full font-semibold"
              onClick={confirmPurchase}
              disabled={createOrder.isPending}
            >
              {createOrder.isPending ? "Confirmando..." : "Confirmar compra"}
            </Button>
          </aside>
        </div>
      </main>
    </>
  );
}
