import { ArrowRight } from "lucide-react";

import { useCatalogQuery } from "@/catalog/queries";

const EDITORIAL_SEARCH = {
  search: "",
  page: 1,
  sort: "featured",
  collection: "",
  network: "",
  priceMin: "",
  priceMax: "",
};

const articles = [
  {
    index: 2,
    date: "12 de setembro",
    readTime: "6 min",
    title: "Como funciona a propriedade de NFTs",
    description: "Aprenda a colecionar, negociar e verificar ativos digitais.",
  },
  {
    index: 0,
    date: "13 de setembro",
    readTime: "2 min",
    title: "10 artistas digitais para acompanhar",
    description: "Conheça criadores que moldam a cultura digital.",
  },
  {
    index: 1,
    date: "15 de setembro",
    readTime: "3 min",
    title: "Raridade, atributos e procedência",
    description:
      "Entenda raridade, procedência, direitos autorais e utilidade.",
  },
  {
    index: 3,
    date: "15 de setembro",
    readTime: "2 min",
    title: "Como proteger sua carteira",
    description: "Proteja sua carteira, seus ativos e sua identidade.",
  },
];

export function EditorialSection() {
  const { data } = useCatalogQuery(EDITORIAL_SEARCH);

  if (!data || data.items.length < 4) {
    return null;
  }

  const firstPromo = data.items[0];
  const secondPromo = data.items[2];

  return (
    <section
      className="
        mx-auto hidden w-full max-w-[1200px]
        pb-20 pt-16
        lg:block lg:pb-24 lg:pt-20
      "
    >
      <div className="grid gap-6 px-2 lg:grid-cols-2 lg:gap-8">
        <article
          className="
            overflow-hidden rounded-[6px]
            bg-card
            lg:grid lg:min-h-[220px]
            lg:grid-cols-2
          "
        >
          <img
            src={firstPromo.imageUrl}
            alt={firstPromo.name}
            className="
              aspect-square w-full
              object-cover
              lg:h-full lg:min-h-[220px]
              lg:aspect-auto
            "
          />

          <div
            className="
              flex flex-col items-center
              justify-center
              px-6 py-5 text-center
            "
          >
            <h2
              className="
                text-[18px] font-bold
                leading-[24px]
                text-foreground
              "
            >
              Lançamentos gênesis
              <br />
              de edição limitada
            </h2>

            <p
              className="
                mt-3 text-[14px]
                font-normal leading-[24px]
                text-muted-foreground
              "
            >
              Colecione edições escassas diretamente dos criadores antes da
              revelação pública.
            </p>

            <button
              type="button"
              disabled
              className="
                mt-4 flex h-[40px]
                cursor-default items-center gap-2
                rounded-[6px]
                bg-primary px-5
                text-[16px] font-medium
                text-[var(--link)]
              "
            >
              Explorar
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </article>

        <article
          className="
            overflow-hidden rounded-[6px]
            bg-card
            lg:grid lg:min-h-[220px]
            lg:grid-cols-2
          "
        >
          <img
            src={secondPromo.imageUrl}
            alt={secondPromo.name}
            className="
              aspect-square w-full
              object-cover
              lg:h-full lg:min-h-[220px]
              lg:aspect-auto
            "
          />

          <div
            className="
              flex flex-col items-center
              justify-center
              px-6 py-5 text-center
            "
          >
            <h2
              className="
                text-[18px] font-bold
                leading-[24px]
                text-foreground
              "
            >
              Arte digital selecionada
              <br />e muito mais
            </h2>

            <p
              className="
                mt-3 text-[14px]
                font-normal leading-[24px]
                text-muted-foreground
              "
            >
              Explore novos artistas, coleções verificadas e obras digitais que
              definem a cultura.
            </p>

            <button
              type="button"
              disabled
              className="
                mt-4 flex h-[40px]
                cursor-default items-center gap-2
                rounded-[6px]
                bg-primary px-5
                text-[16px] font-medium
                text-[var(--link)]
              "
            >
              Explorar
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </article>
      </div>

      <div className="mt-20 text-center">
        <h2
          className="
            text-[28px] font-bold
            leading-[36px]
            text-foreground
          "
        >
          Diário da Cunhagem
        </h2>

        <p
          className="
            mt-3 text-[14px]
            leading-[24px]
            text-muted-foreground
          "
        >
          Histórias, guias e insights para colecionadores sobre o universo da
          propriedade digital.
        </p>
      </div>

      <div
        className="
          mt-10 grid gap-6
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        {articles.map((article) => {
          const nft = data.items[article.index];

          return (
            <article
              key={article.title}
              className="
                overflow-hidden
                rounded-[6px]
                bg-card
              "
            >
              <img
                src={nft.imageUrl}
                alt={nft.name}
                className="
                  aspect-[4/3] w-full
                  object-cover
                "
              />

              <div className="p-4">
                <p
                  className="
                    text-[12px] font-normal
                    leading-[18px]
                    text-muted-foreground
                  "
                >
                  {article.date}
                  <span className="mx-3">|</span>
                  Leitura de {article.readTime}
                </p>

                <h3
                  className="
                    mt-3 text-[16px]
                    font-bold leading-[22px]
                    text-foreground
                  "
                >
                  {article.title}
                </h3>

                <p
                  className="
                    mt-2 text-[13px]
                    font-normal leading-[20px]
                    text-muted-foreground
                  "
                >
                  {article.description}
                </p>

                <span
                  className="
                    mt-3 inline-flex
                    cursor-default items-center gap-2
                    text-[13px] font-bold
                    text-accent
                  "
                >
                  Ler mais
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
