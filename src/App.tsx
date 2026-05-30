import { useCallback, useMemo, useState } from "react";
import { CategoryDetail } from "./components/CategoryDetail";
import { CommitmentsOverview } from "./components/CommitmentsOverview";
import { FilterBar } from "./components/FilterBar";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import {
  buildOverviewRows,
  CATEGORY_COMMITMENTS,
  COUNTRIES,
  TOPIC_OPTIONS,
} from "./data/mockData";
import { COMMITMENT_CATEGORIES } from "./types";
import type { Filters, ViewId } from "./types";
import { downloadCsv } from "./utils/exportCsv";

const EMPTY_FILTERS: Filters = {
  country: "",
  category: "",
  topic: "",
  status: "",
  latestProgress: "",
};

const OVERVIEW_ROWS = buildOverviewRows();
const COMMITMENTS_LIST_VIEW = "Advocacy and partnerships" as const;

const PAGE_TITLES: Record<"overview" | typeof COMMITMENTS_LIST_VIEW, string> =
  {
    overview: "Commitments (numbers)",
    [COMMITMENTS_LIST_VIEW]: "Commitments (list)",
  };

export default function App() {
  const [activeView, setActiveView] = useState<ViewId>("overview");
  const [filters, setFilters] = useState<Filters>({ ...EMPTY_FILTERS });
  const [groupRegions, setGroupRegions] = useState(false);
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState<string | null>(null);

  const countryOptions = useMemo(
    () => [...new Set(COUNTRIES.map((c) => c.name))].sort(),
    [],
  );

  const isOverview = activeView === "overview";

  const handleNavigate = (view: ViewId) => {
    if (view !== "overview" && view !== COMMITMENTS_LIST_VIEW) {
      return;
    }
    setActiveView(view);
    setFilters({ ...EMPTY_FILTERS });
    setPage(1);
  };

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleClear = () => {
    setFilters({ ...EMPTY_FILTERS });
    setGroupRegions(false);
    setPage(1);
  };

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2800);
  };

  const handleExport = useCallback(() => {
    if (isOverview) {
      const header = ["Country", ...COMMITMENT_CATEGORIES, "Progress report"];
      const rows = OVERVIEW_ROWS.map((r) => [
        r.name,
        ...COMMITMENT_CATEGORIES.map((c) => String(r.counts[c] ?? "—")),
        r.progressReport ? "Yes" : "—",
      ]);
      downloadCsv("smc-commitments-overview.csv", [header, ...rows]);
      showToast("Commitments (numbers) exported as CSV");
    } else {
      const groups = CATEGORY_COMMITMENTS[activeView] ?? [];
      const header = [
        "Country",
        "Year",
        "Topic",
        "Commitment",
        "Progress reports",
      ];
      const rows: string[][] = [];
      for (const g of groups) {
        for (const item of g.items) {
          rows.push([
            g.country,
            String(g.year),
            item.topic,
            item.text,
            item.latestProgress
              ? `${item.latestProgress.date}: ${item.latestProgress.text}`
              : "—",
          ]);
        }
      }
      downloadCsv(
        `smc-commitments-${activeView.toLowerCase().replace(/\s+/g, "-")}.csv`,
        [header, ...rows],
      );
      showToast("Commitments (list) exported as CSV");
    }
  }, [activeView, isOverview]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <div className="flex w-full flex-1 gap-6 px-4 py-6 lg:px-6">
        <Sidebar activeView={activeView} onNavigate={handleNavigate} />

        <main className="min-w-0 flex-1">
          <h1 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">
            {PAGE_TITLES[activeView as keyof typeof PAGE_TITLES]}
          </h1>

          <FilterBar
            filters={filters}
            onChange={handleFilterChange}
            onClear={handleClear}
            onExport={handleExport}
            groupRegions={isOverview ? false : groupRegions}
            onGroupRegionsChange={
              isOverview ? () => undefined : setGroupRegions
            }
            variant={isOverview ? "overview" : "category"}
            showGroupRegions={activeView !== COMMITMENTS_LIST_VIEW}
            countryOptions={countryOptions}
            topicOptions={TOPIC_OPTIONS}
          />

          {isOverview ? (
            <CommitmentsOverview
              rows={OVERVIEW_ROWS}
              filters={filters}
              groupRegions={false}
              page={page}
              onPageChange={setPage}
            />
          ) : (
            <CategoryDetail
              groups={CATEGORY_COMMITMENTS[activeView] ?? []}
              filters={filters}
            />
          )}
        </main>
      </div>

      <footer className="border-t border-gray-100 py-3 text-center text-xs text-gray-400">
        Interactive prototype — School meals coalition database extension
      </footer>

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white shadow-lg"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
