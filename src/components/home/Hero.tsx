import { Button } from "../ui/button";
import heroImage from "@/assets/images/nft-hero.png";

export function Hero() {
  return (
    <section>
      <div className="border flex  p-4 lg:h-[450px] lg:p-0">
        {/* Content */}
        <div className="border flex flex-col justify-between flex-1">
          <div className="border flex flex-col gap-2">
            <p>Bem-vindo à Kurio</p>
            <h1 className="text-4xl font-bold">
              SEJA DONO DO FUTURO DA ARTE DIGITAL
            </h1>
            <p>
              Descubra NFTs selecionados de criadores emergentes e consagrados.
              Colecione arte digital rara, apoie artistas e tenha uma parte da
              cultura da internet.
            </p>
            <Button>EXPLORAR</Button>
          </div>

          <div className="border flex  gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="h-2 w-2 rounded-full bg-muted" />
            <span className="h-2 w-2 rounded-full bg-muted" />
          </div>
        </div>

        {/* Image */}
        <div className="border flex-1 aspect-square overflow-hidden">
          <img
            src={heroImage}
            alt="NFT em destaque"
            className="border h-full w-full object-cover"
          ></img>
        </div>

        {/* {indicators} */}
      </div>
    </section>
  );
}
