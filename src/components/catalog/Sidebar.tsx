const collections = [
  ["Arte digital", 33],
  ["Fotografia", 12],
  ["Música", 65],
  ["Arte 3D", 39],
  ["Colecionáveis", 23],
  ["Generativa", 17],
  ["Jogos", 19],
  ["Assinaturas", 13],
  ["Utilidade", 18],
] as const;

const networks = [
  ["Ethereum", 119],
  ["Polygon", 78],
  ["Solana", 86],
] as const;

export function Sidebar() {
  return (
    <aside className="space-y-10 border p-5">
      <section>
        <h2 className="mb-5 text-lg font-semibold">Coleções</h2>

        <div className="space-y-4">
          {collections.map(([name, count]) => (
            <button
              key={name}
              type="button"
              className="flex w-full items-center justify-between text-left"
            >
              <span>{name}</span>
              <span>({count})</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-lg font-semibold">Faixa de preço</h2>

        <div className="space-y-4">
          <input className="w-full" type="range" min="0" max="12" step="0.1" />

          <p>Preço: 0,02 - 12,30 ETH</p>

          <button type="button" className="border px-4 py-2">
            Aplicar
          </button>
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-lg font-semibold">Rede</h2>

        <div className="space-y-4">
          {networks.map(([name, count]) => (
            <button
              key={name}
              type="button"
              className="flex w-full items-center justify-between text-left"
            >
              <span>{name}</span>
              <span>({count})</span>
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
}
