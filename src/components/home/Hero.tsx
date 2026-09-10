import heroImage from "@/assets/images/nft-hero.png";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section>
      <div
        className=" mt-4
    grid min-h-[320px] grid-cols-[minmax(0,1fr)_150px]
    gap-x-3 overflow-hidden rounded-[32px] border
    px-5 py-5

    lg:mt-0
    lg:h-[450px]
    lg:grid-cols-[minmax(0,1fr)_450px]
    lg:gap-x-8
    lg:rounded-none
    lg:px-0
    lg:py-0
  "
      >
        <div
          className="
            flex min-w-0 flex-col
            lg:justify-center
            lg:pl-10
          "
        >
          <p className="mb-4 text-sm lg:mb-4 lg:text-base">Bem-vindo à Kurio</p>

          <h1 className="text-[26px] font-bold leading-[1.35] lg:text-4xl lg:leading-snug">
            <span className="lg:hidden">SEJA DONO DA CULTURA DIGITAL</span>

            <span className="hidden lg:inline">
              SEJA DONO DO FUTURO DA ARTE DIGITAL
            </span>
          </h1>

          <p className="mt-5 text-sm leading-6 lg:mt-4 lg:max-w-xl lg:text-base">
            <span className="lg:hidden">
              Descubra NFTs selecionados de criadores do mundo todo.
            </span>

            <span className="hidden lg:inline">
              Descubra NFTs selecionados de criadores emergentes e consagrados.
              Colecione arte digital rara, apoie artistas e tenha uma parte da
              cultura da internet.
            </span>
          </p>

          <Button
            variant="link"
            className="mt-1 h-auto self-start p-0 font-semibold"
          >
            EXPLORAR →
          </Button>
        </div>

        <div
          className="
            mt-1 h-[210px] w-full overflow-hidden rounded-[24px]

            lg:mt-0
            lg:h-full
            lg:rounded-none
          "
        >
          <img
            src={heroImage}
            alt="NFT em destaque"
            className="h-full w-full object-cover"
          />
        </div>

        <div
          className="
            col-span-2 flex justify-center gap-2 self-end pb-1
          "
          aria-hidden="true"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
        </div>
      </div>
    </section>
  );
}
