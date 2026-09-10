import { useState } from "react";

import { Button } from "@/components/ui/button";

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="3" y="9" width="4" height="12" rx="1" />

      <circle cx="5" cy="5" r="2" />

      <path d="M10 9h4v1.7c1-1.3 2.4-2 4-2 3 0 4 2 4 5v7.3h-4v-6.4c0-1.6-.5-2.6-1.9-2.6-1.5 0-2.1 1-2.1 3v6h-4V9Z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M21 8.2a3 3 0 0 0-2.1-2.1C17 5.6 14.6 5.5 12 5.5s-5 .1-6.9.6A3 3 0 0 0 3 8.2 15 15 0 0 0 2.5 12c0 1.3.1 2.6.5 3.8a3 3 0 0 0 2.1 2.1c1.9.5 4.3.6 6.9.6s5-.1 6.9-.6a3 3 0 0 0 2.1-2.1c.4-1.2.5-2.5.5-3.8s-.1-2.6-.5-3.8Z" />

      <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <footer className="mt-24 hidden border-t lg:block">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="grid grid-cols-4 border-b py-10">
          <section className="pr-8">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border text-xl font-bold">
              W
            </div>

            <h2 className="font-semibold">Segurança da carteira</h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Proteja sua carteira e colecione arte digital verificada com
              confiança.
            </p>
          </section>

          <section className="border-l px-8">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border text-xl font-bold">
              C
            </div>

            <h2 className="font-semibold">Criadores em destaque</h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Conheça artistas e comunidades que moldam a cultura digital.
            </p>
          </section>

          <section className="border-l px-8">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border text-xl font-bold">
              D
            </div>

            <h2 className="font-semibold">Alertas de lançamentos</h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Receba novidades sobre novos NFTs e coleções do mercado.
            </p>
          </section>

          <section className="border-l pl-8">
            <h2 className="text-lg font-semibold">
              Antecipe-se ao próximo lançamento
            </h2>

            <form
              className="mt-5 flex"
              onSubmit={(event) => {
                event.preventDefault();

                if (!email.trim()) {
                  return;
                }

                setMessage("E-mail cadastrado!");
                setEmail("");
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="digite seu e-mail..."
                aria-label="E-mail para novidades"
                className="
                  h-11 min-w-0 flex-1 rounded-l-lg border
                  bg-background px-3 text-sm outline-none
                "
                required
              />

              <Button type="submit" className="h-11 rounded-l-none">
                Enviar
              </Button>
            </form>

            {message && (
              <p className="mt-2 text-sm text-muted-foreground">{message}</p>
            )}

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Receba lançamentos selecionados, histórias de criadores e
              novidades do mercado.
            </p>
          </section>
        </div>

        <div className="grid grid-cols-4 items-center border-b py-7">
          <strong className="tracking-widest">KURIO</strong>

          <p className="text-sm text-muted-foreground">
            Feito para colecionadores, criadores e cultura
          </p>

          <p className="text-sm">contato@email.com</p>

          <p className="text-sm">+55 11 4002 8922</p>
        </div>

        <div className="grid grid-cols-4 gap-10 py-10">
          <section>
            <h2 className="text-lg font-semibold">Meu perfil</h2>

            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>Meu perfil</p>
              <p>Minha coleção</p>
              <p>Atividade</p>
              <p>Estúdio do criador</p>
              <p>Lista de interesse</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Central de ajuda</h2>

            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>Central de ajuda</p>
              <p>Como comprar NFTs</p>
              <p>Carteira e segurança</p>
              <p>Política do mercado</p>
              <p>Denunciar item</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Coleções</h2>

            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>Arte digital</p>
              <p>Fotografia</p>
              <p>Música</p>
              <p>Arte 3D</p>
              <p>Utilidade</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Redes sociais</h2>

            <div className="mt-4 flex gap-3">
              <span
                title="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-lg border"
              >
                <InstagramIcon />
              </span>

              <span
                title="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg border"
              >
                <LinkedinIcon />
              </span>

              <span
                title="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-lg border"
              >
                <YoutubeIcon />
              </span>
            </div>

            <h2 className="mt-8 text-lg font-semibold">
              Carteiras compatíveis
            </h2>

            <div className="mt-4 rounded-lg border px-3 py-2 text-xs">
              METAMASK · WALLETCONNECT · COINBASE
            </div>
          </section>
        </div>
      </div>

      <div className="border-t py-5 text-center text-sm">
        © 2026 Kurio. Propriedade digital para todos.
      </div>
    </footer>
  );
}
