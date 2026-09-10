import type { Ref } from "react";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  inputRef?: Ref<HTMLInputElement>;
  className?: string;
}

export function Search({
  value,
  onChange,
  inputRef,
  className = "",
}: SearchProps) {
  return (
    <label
      className={`
        flex h-[56px] items-center
        gap-3 rounded-[18px]
        bg-card px-5
        lg:h-[44px]
        lg:rounded-[6px]
        lg:bg-muted
        ${className}
      `}
    >
      <SearchIcon
        className="
          h-6 w-6 shrink-0
          text-muted-foreground
        "
        strokeWidth={2}
      />

      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Explorar coleções"
        className="
          min-w-0 flex-1
          bg-transparent
          text-[16px] font-medium
          text-foreground
          outline-none
          placeholder:text-muted-foreground
          lg:text-[14px]
        "
      />
    </label>
  );
}
