interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  className?: string;
}

export function Search({
  value,
  onChange,
  onSubmit,
  className,
}: SearchProps) {
  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <input
        className="flex-1 border px-3 py-2"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type="search"
        placeholder="Buscar NFTs"
      />

      <button type="submit" className="border px-4 py-2">
        Buscar
      </button>
    </form>
  );
}
