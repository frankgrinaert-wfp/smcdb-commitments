import {
  Award,
  BookText,
  ClipboardCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Handshake,
  Soup,
  Star,
} from "lucide-react";
import { useState } from "react";
import { COMMITMENT_CATEGORIES } from "../types";
import type { ViewId } from "../types";

const DISABLED_COMMITMENT_ITEMS = new Set<ViewId>([
  "Evidence and data",
  "Financing",
  "Institutional",
  "Policy",
  "Programme",
]);

const INDICATOR_TOPICS = [
  { id: "key", label: "Key indicators", icon: Star },
  { id: "meals", label: "School meals", icon: Soup },
  { id: "edu", label: "Education", icon: BookText },
  { id: "fund", label: "Funding", icon: BookText },
  { id: "policy", label: "Policy", icon: Handshake },
  { id: "nutrition", label: "Nutritional quality", icon: ClipboardCheck },
] as const;

interface SidebarProps {
  activeView: ViewId;
  onNavigate: (view: ViewId) => void;
}

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const [topicsOpen, setTopicsOpen] = useState<Record<string, boolean>>({});
  const [commitmentsExpanded, setCommitmentsExpanded] = useState(true);

  const toggleTopic = (id: string) => {
    setTopicsOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <div className="rounded-lg border border-gray-200 bg-gray-50/80 p-3">
        <div className="mb-3 flex items-center gap-1 text-sm font-semibold text-gray-800">
          <button
            type="button"
            className="rounded p-0.5 text-gray-500 hover:bg-gray-200"
            aria-label="Back"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          Indicators topics
        </div>

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

        <div>
          <button
            type="button"
            onClick={() => setCommitmentsExpanded((v) => !v)}
            className="flex w-full items-center justify-between rounded px-2 py-2 text-left text-sm font-medium text-gray-800 hover:bg-white"
          >
            <span className="flex items-center gap-2">
              <Handshake className="h-4 w-4 text-gray-500" strokeWidth={1.75} />
              Commitments
            </span>
            {commitmentsExpanded ? (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </button>

          {commitmentsExpanded && (
            <ul className="ml-2 space-y-0.5 border-l border-gray-200 pl-2">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("overview")}
                  className={`flex w-full items-center gap-1.5 rounded-r px-2 py-1.5 text-left text-sm transition-colors ${
                    activeView === "overview"
                      ? "bg-gray-200 font-medium text-gray-900"
                      : "text-gray-600 hover:bg-white hover:text-gray-900"
                  }`}
                >
                  <ChevronRight className="h-3 w-3 shrink-0 opacity-60" />
                  Overview
                </button>
              </li>
              {COMMITMENT_CATEGORIES.map((cat) => (
                <li key={cat}>
                  {DISABLED_COMMITMENT_ITEMS.has(cat) ? (
                    <div className="flex w-full items-center gap-1.5 rounded-r px-2 py-1.5 text-left text-sm text-gray-600">
                      <ChevronRight className="h-3 w-3 shrink-0 opacity-60" />
                      {cat}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onNavigate(cat)}
                      className={`flex w-full items-center gap-1.5 rounded-r px-2 py-1.5 text-left text-sm transition-colors ${
                        activeView === cat
                          ? "bg-gray-200 font-medium text-gray-900"
                          : "text-gray-600 hover:bg-white hover:text-gray-900"
                      }`}
                    >
                      <ChevronRight className="h-3 w-3 shrink-0 opacity-60" />
                      {cat}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
}
