import { ArrowRight } from "lucide-react";

import heroImage from "@/assets/images/nft-hero.png";

export function Hero() {
  function handleExplore() {
    const catalog = document.getElementById("catalog");

    catalog?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <section
      className="
        relative w-full overflow-hidden
        rounded-[28px]
        bg-card
        lg:grid lg:h-[450px]
        lg:grid-cols-2
        lg:rounded-none
        lg:bg-background
      "
    >
      <div
        className="
          relative z-10
          flex min-h-[380px]
          flex-col justify-center
          px-8 py-8
          lg:h-[450px]
          lg:min-h-0
          lg:pl-[68px]
          lg:pr-0 lg:py-0
        "
      >
        <div
          className="
            w-[58%]
            lg:w-full
          "
        >
          <p
            className="
              text-[14px] font-medium
              leading-[16px]
              tracking-[0.1em]
              text-foreground
            "
          >
            Bem-vindo à Kurio
          </p>

          <h1
            className="
              mt-4
              text-[30px] font-bold
              leading-[58px]
              text-foreground
              lg:text-[43px]
              lg:leading-[70px]
            "
          >
            <span className="lg:hidden">
              SEJA DONO DA
              <br />
              CULTURA DIGITAL
            </span>

            <span className="hidden lg:inline">
              SEJA DONO DO FUTURO
              <br />
              DA ARTE DIGITAL
            </span>
          </h1>

          <p
            className="
              mt-3
              text-[14px] font-normal
              leading-[24px]
              text-muted-foreground
              lg:mt-4
            "
          >
            <span className="lg:hidden">
              Descubra NFTs selecionados de criadores do mundo todo.
            </span>

            <span className="hidden lg:inline">
              Descubra NFTs selecionados de criadores emergentes e consagrados.
              <br />
              Colecione arte digital rara, apoie artistas e tenha uma parte da
              <br />
              cultura da internet.
            </span>
          </p>

          <button
            type="button"
            onClick={handleExplore}
            className="
              mt-2 inline-flex
              items-center gap-2
              text-[16px] font-bold
              leading-[20px]
              text-accent
              lg:mt-8
              lg:h-[40px]
              lg:w-[140px]
              lg:justify-center
              lg:rounded-[6px]
              lg:bg-primary
              lg:px-0
              lg:text-[var(--link)]
              lg:hover:bg-accent
            "
          >
            EXPLORAR
            <ArrowRight
              className="
                h-5 w-5
                lg:hidden
              "
            />
          </button>
        </div>
      </div>

      <div
        className="
          absolute
          right-4 top-5
          flex h-[280px]
          w-[46%]
          items-center justify-end
          lg:static
          lg:h-[450px]
          lg:w-auto
        "
      >
        <img
          src={heroImage}
          alt="NFT em destaque da Kurio"
          className="
            h-[230px]
            w-full
            rounded-[24px]
            object-cover
            lg:h-auto
            lg:max-h-[450px]
            lg:w-auto
            lg:max-w-[450px]
            lg:object-contain
          "
        />

        <img
          src="/images/sage-nomad.png"
          alt=""
          className="
            absolute
            -bottom-[18px]
            left-[-16px]
            h-[88px]
            w-[88px]
            rounded-[22px]
            object-cover
            lg:hidden
          "
          aria-hidden="true"
        />
      </div>

      <div
        className="
          absolute bottom-[10px]
          left-1/2
          flex -translate-x-1/2
          items-center gap-[10px]
          lg:bottom-[20px]
          lg:gap-[12px]
        "
        aria-hidden="true"
      >
        <span className="h-[10px] w-[10px] rounded-full bg-primary" />
        <span className="h-[10px] w-[10px] rounded-full bg-primary" />
        <span className="h-[10px] w-[10px] rounded-full bg-primary" />
      </div>
    </section>
  );
}
