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
        className="w-full border px-3 py-2"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type="search"
        placeholder="Buscar NFTs"
      />
    </div>
  );
}
