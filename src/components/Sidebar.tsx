import {
  Award,
  Banknote,
  BookText,
  ClipboardCheck,
  ChevronDown,
  ChevronUp,
  Handshake,
  ScrollText,
  Soup,
  Star,
} from "lucide-react";
import { useState } from "react";

const INDICATOR_TOPICS = [
  { id: "key", label: "Key indicators", icon: Star },
  { id: "meals", label: "School meals", icon: Soup },
  { id: "edu", label: "Education", icon: BookText },
  { id: "fund", label: "Funding", icon: Banknote },
  { id: "policy", label: "Policy", icon: ScrollText },
  { id: "nutrition", label: "Nutritional quality", icon: ClipboardCheck },
] as const;

export function Sidebar() {
  const [topicsOpen, setTopicsOpen] = useState<Record<string, boolean>>({});

  const toggleTopic = (id: string) => {
    setTopicsOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <div className="rounded-lg border border-gray-200 bg-gray-50/80 p-3">
        <div className="mb-3 text-sm font-semibold text-gray-800">Topics</div>

        <ul className="mb-4 space-y-0.5">
          {INDICATOR_TOPICS.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => toggleTopic(id)}
                className="flex w-full items-center justify-between rounded px-2 py-2 text-left text-sm text-gray-700 hover:bg-white"
              >
                <span className="flex items-center gap-2">
                  <Icon
                    className="h-4 w-4 shrink-0 text-gray-500"
                    strokeWidth={1.75}
                  />
                  {label}
                </span>
                {topicsOpen[id] ? (
                  <ChevronUp className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                )}
              </button>
              {topicsOpen[id] && (
                <ul className="ml-6 border-l border-gray-200 pb-1 pl-3 text-xs text-gray-500">
                  <li className="py-1">Sample indicator (prototype)</li>
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="mb-2 text-sm font-semibold text-gray-800">
          SMC commitments
        </div>

        <button
          type="button"
          className="mb-1 flex w-full items-center gap-2 rounded px-2 py-2 text-left text-sm text-gray-700 hover:bg-white"
        >
          <Award className="h-4 w-4 text-gray-500" strokeWidth={1.75} />
          SMC membership
        </button>

        <button
          type="button"
          className="mb-1 flex w-full items-center gap-2 rounded bg-gray-200 px-2 py-2 text-left text-sm font-medium text-gray-900"
        >
          <Handshake className="h-4 w-4 text-gray-500" strokeWidth={1.75} />
          Commitments
        </button>
      </div>
    </aside>
  );
}
