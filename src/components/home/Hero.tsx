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
        relative grid w-full overflow-hidden
        bg-background
        lg:h-[450px]
        lg:grid-cols-2
      "
    >
      <div
        className="
          flex items-center
          px-6 py-12
          lg:h-[450px]
          lg:px-[68pl] lg:py-0
        "
      >
        <div className="w-full">
          <p
            className="
              text-[14px] font-medium
              leading-[16px] tracking-[0.1em]
              text-foreground
            "
          >
            Bem-vindo à Kurio
          </p>

          <h1
            className="
              mt-4
              text-[32px] font-bold
              leading-[48px]
              tracking-normal
              text-foreground
              lg:text-[43px]
              lg:leading-[70px]
            "
          >
            SEJA DONO DO FUTURO
            <br />
            DA ARTE DIGITAL
          </h1>

          <p
            className="
              mt-4
              text-[14px] font-normal
              leading-[24px]
              tracking-normal
              text-muted-foreground
            "
          >
            Descubra NFTs selecionados de criadores emergentes e consagrados.
            <br className="hidden lg:block" />
            Colecione arte digital rara, apoie artistas e tenha uma parte da
            <br className="hidden lg:block" />
            cultura da internet.
          </p>

          <button
            type="button"
            onClick={handleExplore}
            className="
              mt-8 flex h-[40px] w-[140px]
              items-center justify-center
              rounded-[6px]
              bg-primary
              pt-[10px] pr-[36px]
              pb-[10px] pl-[28px]
              text-[16px] font-bold
              leading-[20px]
              tracking-normal
              text-[var(--link)]
              transition-colors
              hover:bg-accent
            "
          >
            EXPLORAR
          </button>
        </div>
      </div>

      <div
        className="
          hidden h-[450px]
          items-center justify-end
          lg:flex
        "
      >
        <img
          src={heroImage}
          alt="NFT em destaque da Kurio"
          className="
            h-auto max-h-[450px]
            w-auto max-w-[450px]
            rounded-[24px]
            object-contain
          "
        />
      </div>

      <div
        className="
          absolute bottom-[20px] left-1/2
          hidden -translate-x-1/2
          items-center gap-[12px]
          lg:flex
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
