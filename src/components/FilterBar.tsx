import { COMMITMENT_CATEGORIES } from "../types";
import type { Filters } from "../types";

interface FilterBarProps {
  filters: Filters;
  onChange: (key: keyof Filters, value: string) => void;
  onClear: () => void;
  onExport: () => void;
  groupRegions: boolean;
  onGroupRegionsChange: (checked: boolean) => void;
  variant: "overview" | "category";
  showGroupRegions?: boolean;
  countryOptions: string[];
  topicOptions: string[];
}

function SelectField({
  label,
  value,
  placeholder,
  options,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="min-w-[140px] max-w-2xs flex-1">
      <label className="sr-only">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pr-8 pl-3 text-sm text-gray-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-400">
          ▾
        </span>
      </div>
    </div>
  );
}

export function FilterBar({
  filters,
  onChange,
  onClear,
  onExport,
  groupRegions,
  onGroupRegionsChange,
  variant,
  showGroupRegions = true,
  countryOptions,
  topicOptions,
}: FilterBarProps) {
  const topicFilterOptions = (
    variant === "overview"
      ? topicOptions.filter((t) => t !== "All topic")
      : topicOptions
  ).toSorted((a, b) => a.localeCompare(b));

  const hasActiveCategoryFilters = Boolean(
    filters.country ||
      filters.category ||
      filters.topic ||
      filters.latestProgress,
  );
  const showClearFilters = variant === "overview" || hasActiveCategoryFilters;

  return (
    <div className="mb-4">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
          <SelectField
            label="Country"
            value={filters.country}
            placeholder="Country"
            options={countryOptions}
            onChange={(v) => onChange("country", v)}
          />
          {variant === "overview" && (
            <>
              <SelectField
                label="Topic"
                value={filters.topic}
                placeholder="Topic"
                options={topicFilterOptions}
                onChange={(v) => onChange("topic", v)}
              />
              <SelectField
                label="Status"
                value={filters.status}
                placeholder="Any activity status"
                options={["Currently active"]}
                onChange={(v) => onChange("status", v)}
              />
            </>
          )}
          {variant === "category" && (
            <>
              <SelectField
                label="Category"
                value={filters.category}
                placeholder="Category"
                options={[...COMMITMENT_CATEGORIES]}
                onChange={(v) => onChange("category", v)}
              />
              <SelectField
                label="Topic"
                value={filters.topic}
                placeholder="Topic"
                options={topicFilterOptions}
                onChange={(v) => onChange("topic", v)}
              />
              <SelectField
                label="Progress reported"
                value={filters.latestProgress}
                placeholder="Progress reports"
                options={[
                  "Progress reported",
                  "Progress not yet reported",
                ]}
                onChange={(v) => onChange("latestProgress", v)}
              />
            </>
          )}
          <button
            type="button"
            onClick={onExport}
            className="shrink-0 rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-gray-900 transition hover:bg-amber-500"
          >
            Export data
          </button>
          <button
            type="button"
            onClick={onClear}
            className={`text-sm font-medium hover:underline ${
              showClearFilters
                ? "text-sky-700 hover:text-sky-900"
                : "pointer-events-none invisible"
            }`}
          >
            Reset
          </button>
        </div>
      </div>
      {showGroupRegions && (
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={groupRegions}
            onChange={(e) => onGroupRegionsChange(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
          />
          Group regions
        </label>
      )}
    </div>
  );
}
