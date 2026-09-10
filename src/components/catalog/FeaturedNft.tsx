import heroImage from "@/assets/images/nft-hero3.png";

export function FeaturedNft() {
  return (
    <section className="flex flex-col bg-card pt-8">
      <div className="px-8">
        <p
          className="
            text-[16px] font-bold
            uppercase leading-[24px]
            text-accent
          "
        >
          NFT em destaque
        </p>

        <h2
          className="
            mt-4 text-center
            text-[16px] font-bold
            uppercase leading-[24px]
            text-foreground
          "
        >
          Oferta limitada
        </h2>
      </div>

      <img
        src={heroImage}
        alt="NFT em destaque"
        className="
          mt-4 block
          h-auto w-full max-w-none
          self-end
          rounded-t-[24px]
          object-contain object-bottom
        "
      />
    </section>
  );
}
