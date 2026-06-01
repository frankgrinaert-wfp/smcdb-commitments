import { LayoutGrid, List } from "lucide-react";
import type { CommitmentsDisplayMode } from "../types";

const MODES: {
  id: CommitmentsDisplayMode;
  label: string;
  icon: typeof LayoutGrid;
}[] = [
  { id: "numbers", label: "Numbers", icon: LayoutGrid },
  { id: "list", label: "List", icon: List },
];

interface CommitmentsViewSwitcherProps {
  mode: CommitmentsDisplayMode;
  onChange: (mode: CommitmentsDisplayMode) => void;
}

export function CommitmentsViewSwitcher({
  mode,
  onChange,
}: CommitmentsViewSwitcherProps) {
  return (
    <div
      role="group"
      aria-label="Commitments display"
      className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5"
    >
      {MODES.map(({ id, label, icon: Icon }) => {
        const active = mode === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(id)}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
