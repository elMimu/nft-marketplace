import type { RefObject } from "react";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
}

export function Search({ value, onChange, className, inputRef }: SearchProps) {
  return (
    <div className={className}>
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type="search"
        placeholder="Buscar NFTs"
        className="h-12 w-full rounded-xl border px-4"
      />
    </div>
  );
}
