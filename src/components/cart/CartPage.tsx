import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { useAuth } from "@/auth/AuthContext";
import { useCart } from "@/cart/useCart";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { Button } from "@/components/ui/button";
import {
  addEth,
  applyDiscountEth,
  multiplyEth,
  percentageEth,
} from "@/lib/eth";

const homeSearch = {
  search: "",
  page: 1,
  sort: "featured",
  collection: "",
  network: "",
  priceMin: "",
  priceMax: "",
};

export function CartPage() {
  const { items, increaseQuantity, decreaseQuantity, removeItem, clearCart } =
    useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponError, setCouponError] = useState(false);

  const subtotal = addEth(
    items.map((item) => multiplyEth(item.priceEth, item.quantity)),
  );

  const discount = percentageEth(subtotal, discountPercent);

  const total = applyDiscountEth(subtotal, discountPercent);

  function applyCoupon() {
    const match = coupon
      .trim()
      .toUpperCase()
      .match(/^(\d{1,3})OFFKURIO$/);

    const percentage = Number(match?.[1]);

    if (!match || percentage < 1 || percentage > 100) {
      setDiscountPercent(0);
      setCouponMessage("Cupom inválido.");
      setCouponError(true);
      return;
    }

    setDiscountPercent(percentage);
    setCouponMessage(`${percentage}% de desconto aplicado.`);
    setCouponError(false);
  }

  function goToPayment() {
    navigate({
      to: "/payment",
      search: {
        discount: discountPercent,
      },
    });
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto w-full max-w-[1200px] px-6 py-8 lg:px-0 lg:py-10">
        <div className="mb-8 flex items-center gap-5">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full lg:hidden"
            onClick={() => window.history.back()}
            aria-label="Voltar"
          >
            <ArrowLeft />
          </Button>

          <h1 className="text-3xl font-bold">Carrinho de NFTs</h1>
        </div>

        <div className="rounded-[28px] border p-10 text-center">
          <p className="text-muted-foreground">Seu carrinho está vazio.</p>

          <Button className="mt-6" render={<Link to="/" search={homeSearch} />}>
            Explorar NFTs
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1200px] px-6 py-8 lg:px-0 lg:py-10">
      <div className="mb-8 flex items-center lg:hidden">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="shrink-0 rounded-full"
          onClick={() => window.history.back()}
          aria-label="Voltar"
        >
          <ArrowLeft />
        </Button>

        <h1 className="flex-1 pr-10 text-center text-3xl font-bold">
          Carrinho de NFTs
        </h1>
      </div>

      <h1 className="mb-6 hidden text-2xl font-bold lg:block">Carrinho</h1>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section>
          <div className="mb-2 hidden grid-cols-[minmax(0,1fr)_110px_150px_110px_40px] gap-4 border-b pb-3 text-sm font-semibold lg:grid">
            <span>NFT</span>
            <span>Preço</span>
            <span>Quantidade</span>
            <span>Total</span>
            <span />
          </div>

          <div className="space-y-4 lg:space-y-2">
            {items.map((item) => (
              <article
                key={item.id}
                className="
                  rounded-[24px] border p-4
                  lg:grid
                  lg:grid-cols-[minmax(0,1fr)_110px_150px_110px_40px]
                  lg:items-center
                  lg:gap-4
                  lg:rounded-none
                  lg:border-x-0
                  lg:border-t-0
                "
              >
                <div className="flex min-w-0 gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="
                      h-28 w-28 shrink-0 rounded-2xl object-cover
                      lg:h-16 lg:w-16 lg:rounded-lg
                    "
                  />

                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold">
                      {item.name}
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground lg:hidden">
                      {item.priceEth} ETH
                    </p>
                  </div>
                </div>

                <p className="hidden font-semibold lg:block">
                  {item.priceEth} ETH
                </p>

                <div className="mt-5 flex items-center justify-between lg:mt-0 lg:justify-start">
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-full"
                      disabled={item.quantity === 1}
                      onClick={() => decreaseQuantity(item.id)}
                      aria-label={`Diminuir quantidade de ${item.name}`}
                    >
                      <Minus />
                    </Button>

                    <span className="min-w-5 text-center font-semibold">
                      {item.quantity}
                    </span>

                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-full"
                      onClick={() => increaseQuantity(item.id)}
                      aria-label={`Aumentar quantidade de ${item.name}`}
                    >
                      <Plus />
                    </Button>
                  </div>

                  <strong className="text-lg lg:hidden">
                    {multiplyEth(item.priceEth, item.quantity)} ETH
                  </strong>
                </div>

                <strong className="hidden lg:block">
                  {multiplyEth(item.priceEth, item.quantity)} ETH
                </strong>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="mt-3 ml-auto lg:mt-0"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remover ${item.name}`}
                >
                  <Trash2 />
                </Button>
              </article>
            ))}
          </div>
        </section>

        <aside className="h-fit rounded-[28px] border p-6">
          <h2 className="text-xl font-semibold">Resumo</h2>

          <div className="mt-6">
            <label htmlFor="coupon" className="text-sm font-medium">
              Código promocional
            </label>

            <div className="mt-2 flex gap-2">
              <input
                id="coupon"
                type="text"
                value={coupon}
                onChange={(event) => setCoupon(event.target.value)}
                placeholder="10OFFKURIO"
                className="h-10 min-w-0 flex-1 rounded-lg border bg-background px-3 text-sm outline-none"
              />

              <Button type="button" variant="outline" onClick={applyCoupon}>
                Aplicar
              </Button>
            </div>

            {couponMessage && (
              <p
                className={`mt-2 text-xs ${couponError ? "text-destructive" : "text-muted-foreground"
                  }`}
              >
                {couponMessage}
              </p>
            )}
          </div>

          <div className="mt-8 space-y-4">
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
          </div>

          <div className="mt-5 border-t pt-5">
            <div className="flex items-center justify-between">
              <strong className="text-lg">Total</strong>

              <strong className="text-xl">{total} ETH</strong>
            </div>
          </div>

          {user ? (
            <Button type="button" className="mt-8 w-full" onClick={goToPayment}>
              Finalizar
            </Button>
          ) : (
            <LoginDialog
              triggerLabel="Conectar e finalizar"
              triggerClassName="mt-8 w-full"
              onSuccess={goToPayment}
            />
          )}

          <Button
            variant="outline"
            className="mt-3 w-full"
            render={<Link to="/" search={homeSearch} />}
          >
            Continuar explorando
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="mt-2 w-full"
            onClick={clearCart}
          >
            Limpar carrinho
          </Button>
        </aside>
      </div>
    </main>
  );
}
