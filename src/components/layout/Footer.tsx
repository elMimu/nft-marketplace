import { useState } from "react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14 8h3V4h-3c-3.3 0-5 1.9-5 5v2H6v4h3v7h4v-7h3.4l.6-4H13V9c0-.7.3-1 1-1Z" />
    </svg>
  );
}

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

function TwitterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M21 5.5c-.7.3-1.4.5-2.2.6.8-.5 1.4-1.2 1.7-2.1-.7.4-1.6.8-2.5.9A3.8 3.8 0 0 0 11.4 8c0 .3 0 .6.1.9A10.8 10.8 0 0 1 3.7 5c-.4.6-.5 1.3-.5 2 0 1.3.6 2.4 1.7 3.1-.6 0-1.2-.2-1.7-.5 0 1.9 1.3 3.4 3.1 3.8-.3.1-.7.1-1 .1-.2 0-.5 0-.7-.1.5 1.5 1.9 2.6 3.6 2.6A7.7 7.7 0 0 1 3 17.8 10.8 10.8 0 0 0 8.9 19c7 0 10.9-5.8 10.9-10.9v-.5c.7-.5 1.4-1.2 1.9-2Z" />
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

interface FooterFeatureProps {
  letter: string;
  title: string;
  children: ReactNode;
  divided?: boolean;
}

function FooterFeature({
  letter,
  title,
  children,
  divided = false,
}: FooterFeatureProps) {
  return (
    <section
      className={`
        min-h-[210px] py-8
        ${divided ? "border-l-[0.5px] border-primary px-8" : "pl-8 pr-8"}
      `}
    >
      <div
        className="
          flex h-[64px] w-[64px]
          items-center justify-center
          rounded-full bg-primary
          text-[20px] font-bold
          text-[var(--link)]
        "
      >
        {letter}
      </div>

      <h2
        className="
          mt-4 text-[16px] font-bold
          leading-[22px] text-foreground
        "
      >
        {title}
      </h2>

      <p
        className="
          mt-3 text-[14px] font-normal
          leading-[24px] text-muted-foreground
        "
      >
        {children}
      </p>
    </section>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit() {
    if (!email.trim()) {
      return;
    }

    setMessage("E-mail cadastrado!");
    setEmail("");
  }

  return (
    <footer
      className="
        mx-auto mt-24 hidden
        w-full max-w-[1200px]
        lg:block
      "
    >
      <div className="grid grid-cols-4 bg-card">
        <FooterFeature letter="W" title="Segurança da carteira">
          Proteja sua carteira e colecione arte digital verificada com
          confiança.
        </FooterFeature>

        <FooterFeature letter="C" title="Criadores em destaque" divided>
          Conheça artistas, estúdios e comunidades que moldam a cultura digital
          na rede.
        </FooterFeature>

        <FooterFeature letter="D" title="Alertas de lançamentos" divided>
          Receba calendários de cunhagem, novidades de listas de acesso e
          análises do mercado.
        </FooterFeature>

        <section
          className="
            min-h-[210px]
            border-l-[0.5px] border-primary
            py-8 pl-8 pr-8
          "
        >
          <h2
            className="
              text-[16px] font-bold
              leading-[18px] text-foreground
            "
          >
            Antecipe-se ao próximo
            <br />
            lançamento
          </h2>

          <form
            className="mt-4 flex"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="digite seu e-mail..."
              aria-label="E-mail para novidades"
              className="
                h-[40px] min-w-0 flex-1
                rounded-l-[6px]
                bg-muted px-3
                text-[14px] text-foreground
                outline-none
                placeholder:text-muted-foreground
              "
              required
            />

            <Button
              type="submit"
              className="
                h-[40px]
                rounded-l-none
                rounded-r-[6px]
                bg-primary px-4
                text-[16px] font-bold
                text-[var(--link)]
                hover:bg-accent
              "
            >
              Enviar
            </Button>
          </form>

          {message && <p className="mt-2 text-[12px] text-accent">{message}</p>}

          <p
            className="
              mt-4 text-[14px]
              leading-[24px]
              text-muted-foreground
            "
          >
            Receba lançamentos selecionados, histórias de criadores e novidades
            do mercado.
          </p>
        </section>
      </div>

      <div className="grid min-h-[88px] grid-cols-4 items-center bg-muted px-8">
        <strong
          className="
            text-[14px] font-bold
            tracking-[0.12em]
            text-foreground
          "
        >
          KURIO
        </strong>

        <p
          className="
            text-[14px] leading-[22px]
            text-foreground
          "
        >
          Feito para colecionadores,
          <br />
          criadores e cultura
        </p>

        <p className="text-[14px] text-foreground">contato@email.com</p>

        <p className="text-[14px] text-foreground">+55 11 4002 8922</p>
      </div>

      <div className="grid grid-cols-4 gap-12 bg-card px-8 py-10">
        <section>
          <h2 className="text-[18px] font-bold text-foreground">Meu perfil</h2>

          <div className="mt-4 space-y-3 text-[14px] text-foreground">
            <p>Meu perfil</p>
            <p>Minha coleção</p>
            <p>Atividade</p>
            <p>Estúdio do criador</p>
            <p>Lista de interesse</p>
          </div>
        </section>

        <section>
          <h2 className="text-[18px] font-bold text-foreground">
            Central de ajuda
          </h2>

          <div className="mt-4 space-y-3 text-[14px] text-foreground">
            <p>Central de ajuda</p>
            <p>Como comprar NFTs</p>
            <p>Carteira e segurança</p>
            <p>Política do mercado</p>
            <p>Denunciar item</p>
          </div>
        </section>

        <section>
          <h2 className="text-[18px] font-bold text-foreground">Coleções</h2>

          <div className="mt-4 space-y-3 text-[14px] text-foreground">
            <p>Arte digital</p>
            <p>Fotografia</p>
            <p>Música</p>
            <p>Arte 3D</p>
            <p>Utilidade</p>
          </div>
        </section>

        <section>
          <h2 className="text-[18px] font-bold text-foreground">
            Redes sociais
          </h2>

          <div className="mt-4 flex gap-2">
            <span
              title="Facebook"
              className="
                flex h-[34px] w-[34px]
                items-center justify-center
                rounded-[6px]
                border border-primary
                text-primary
              "
            >
              <FacebookIcon />
            </span>

            <span
              title="Instagram"
              className="
                flex h-[34px] w-[34px]
                items-center justify-center
                rounded-[6px]
                border border-primary
                text-primary
              "
            >
              <InstagramIcon />
            </span>

            <span
              title="Twitter"
              className="
                flex h-[34px] w-[34px]
                items-center justify-center
                rounded-[6px]
                border border-primary
                text-primary
              "
            >
              <TwitterIcon />
            </span>

            <span
              title="LinkedIn"
              className="
                flex h-[34px] w-[34px]
                items-center justify-center
                rounded-[6px]
                border border-primary
                text-primary
              "
            >
              <LinkedinIcon />
            </span>

            <span
              title="YouTube"
              className="
                flex h-[34px] w-[34px]
                items-center justify-center
                rounded-[6px]
                border border-primary
                text-primary
              "
            >
              <YoutubeIcon />
            </span>
          </div>

          <h2 className="mt-7 text-[18px] font-bold text-foreground">
            Carteiras compatíveis
          </h2>

          <div
            className="
              mt-3 inline-flex
              rounded-[6px]
              border border-primary
              bg-muted px-3 py-2
              text-[10px] font-bold
              uppercase text-primary
            "
          >
            METAMASK
            <span className="mx-2">·</span>
            WALLETCONNECT
            <span className="mx-2">·</span>
            COINBASE
          </div>
        </section>
      </div>

      <div className="bg-background py-4 text-center text-[12px] font-medium text-foreground">
        © 2026 Kurio. Propriedade digital para todos.
      </div>
    </footer>
  );
}
