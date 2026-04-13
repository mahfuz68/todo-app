import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search a task...",
  className = "",
}: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-14 py-3 bg-surface-secondary border-0 rounded-button font-body text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-text-secondary/60 bg-white px-2 py-1 rounded border border-border">
        /
      </span>
    </div>
  );
}
