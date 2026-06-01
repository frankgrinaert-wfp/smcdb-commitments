import { useCallback, useMemo, useState } from "react";
import { CategoryDetail } from "./components/CategoryDetail";
import { CommitmentsOverview } from "./components/CommitmentsOverview";
import { CommitmentsViewSwitcher } from "./components/CommitmentsViewSwitcher";
import { FilterBar } from "./components/FilterBar";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import {
  buildOverviewRows,
  COUNTRIES,
  getAllCommitmentGroups,
  TOPIC_OPTIONS,
} from "./data/mockData";
import { COMMITMENT_CATEGORIES } from "./types";
import type { CommitmentsDisplayMode, Filters } from "./types";
import { downloadCsv } from "./utils/exportCsv";

const EMPTY_FILTERS: Filters = {
  country: "",
  category: "",
  topic: "",
  status: "",
  latestProgress: "",
};

const OVERVIEW_ROWS = buildOverviewRows();
const ALL_COMMITMENT_GROUPS = getAllCommitmentGroups();

export default function App() {
  const [displayMode, setDisplayMode] =
    useState<CommitmentsDisplayMode>("numbers");
  const [filters, setFilters] = useState<Filters>({ ...EMPTY_FILTERS });
  const [groupRegions, setGroupRegions] = useState(false);
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState<string | null>(null);

  const countryOptions = useMemo(
    () => [...new Set(COUNTRIES.map((c) => c.name))].sort(),
    [],
  );

  const isNumbersView = displayMode === "numbers";

  const handleDisplayModeChange = (mode: CommitmentsDisplayMode) => {
    setDisplayMode(mode);
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
    if (isNumbersView) {
      const header = ["Country", ...COMMITMENT_CATEGORIES, "Progress report"];
      const rows = OVERVIEW_ROWS.map((r) => [
        r.name,
        ...COMMITMENT_CATEGORIES.map((c) => String(r.counts[c] ?? "—")),
        r.progressReport ? "Yes" : "—",
      ]);
      downloadCsv("smc-commitments-numbers.csv", [header, ...rows]);
      showToast("Numbers view exported as CSV");
    } else {
      const header = [
        "Country",
        "Year",
        "Category",
        "Topic",
        "Commitment",
        "Progress reports",
      ];
      const rows: string[][] = [];
      for (const g of ALL_COMMITMENT_GROUPS) {
        for (const item of g.items) {
          rows.push([
            g.country,
            String(g.year),
            item.category,
            item.topic,
            item.text,
            item.latestProgress
              ? `${item.latestProgress.date}: ${item.latestProgress.text}`
              : "—",
          ]);
        }
      }
      downloadCsv("smc-commitments-list.csv", [header, ...rows]);
      showToast("List view exported as CSV");
    }
  }, [isNumbersView]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <div className="flex w-full flex-1 gap-6 px-4 py-6 lg:px-6">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
              Commitments
            </h1>
            <CommitmentsViewSwitcher
              mode={displayMode}
              onChange={handleDisplayModeChange}
            />
          </div>

          <FilterBar
            filters={filters}
            onChange={handleFilterChange}
            onClear={handleClear}
            onExport={handleExport}
            groupRegions={groupRegions}
            onGroupRegionsChange={setGroupRegions}
            showGroupRegions={isNumbersView}
            countryOptions={countryOptions}
            topicOptions={TOPIC_OPTIONS}
          />

          {isNumbersView ? (
            <CommitmentsOverview
              rows={OVERVIEW_ROWS}
              filters={filters}
              groupRegions={groupRegions}
              page={page}
              onPageChange={setPage}
            />
          ) : (
            <CategoryDetail
              groups={ALL_COMMITMENT_GROUPS}
              filters={filters}
            />
          )}
        </main>
      </div>

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
