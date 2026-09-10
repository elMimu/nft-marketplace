import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { multiplyEth } from "@/lib/eth";

interface OrderItem {
  id: string;
  name: string;
  priceEth: string;
  imageUrl: string;
  quantity: number;
}

interface Order {
  transactionId: string;
  date: string;
  wallet: string;
  total: string;
  items: OrderItem[];
}

function loadOrder(): Order | null {
  try {
    const savedOrder = sessionStorage.getItem("kurio-last-order");

    if (!savedOrder) {
      return null;
    }

    return JSON.parse(savedOrder) as Order;
  } catch {
    return null;
  }
}

export function OrderConfirmation() {
  const navigate = useNavigate();
  const order = loadOrder();

  function goHome() {
    sessionStorage.removeItem("kurio-last-order");

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

  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <p className="text-muted-foreground">Nenhum pedido encontrado.</p>

          <Button type="button" className="mt-6" onClick={goHome}>
            Voltar ao mercado
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="hidden min-h-screen items-start justify-center px-6 py-28 lg:flex">
      <section className="w-full max-w-[620px] rounded-[28px] border p-8">
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-14 w-14" />

          <h1 className="mt-5 text-2xl font-bold">Compra confirmada</h1>

          <p className="mt-2 text-muted-foreground">
            Seus NFTs agora estão na sua carteira.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-4 gap-4 border-y py-5 text-sm">
          <div>
            <p className="text-muted-foreground">Transação</p>

            <p className="mt-1 truncate font-semibold">{order.transactionId}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Data</p>

            <p className="mt-1 font-semibold">{order.date}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Total</p>

            <p className="mt-1 font-semibold">{order.total} ETH</p>
          </div>

          <div>
            <p className="text-muted-foreground">Carteira</p>

            <p className="mt-1 font-semibold">{order.wallet}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold">Detalhes da transação</h2>

          <div className="mt-4 space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-16 w-16 rounded-xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{item.name}</p>

                  <p className="text-sm text-muted-foreground">
                    ID do token: #{item.id}
                  </p>
                </div>

                <span className="text-sm">× {item.quantity}</span>

                <strong>{multiplyEth(item.priceEth, item.quantity)} ETH</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t pt-5">
          <strong>Total</strong>

          <strong className="text-xl">{order.total} ETH</strong>
        </div>

        <Button type="button" className="mt-8 w-full" onClick={goHome}>
          Voltar ao mercado
        </Button>
      </section>
    </main>
  );
}
