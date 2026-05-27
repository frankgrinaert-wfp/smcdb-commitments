import type { Filters } from '../types'

interface FilterBarProps {
  filters: Filters
  onChange: (key: keyof Filters, value: string) => void
  onClear: () => void
  onExport: () => void
  groupRegions: boolean
  onGroupRegionsChange: (checked: boolean) => void
  variant: 'overview' | 'category'
  countryOptions: string[]
  topicOptions: string[]
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  return (
    <div className="min-w-[140px] flex-1">
      <label className="sr-only">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pr-8 pl-3 text-sm text-gray-800 shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none"
        >
          {options.map((opt) => (
            <option key={opt} value={opt === options[0] ? '' : opt}>
              {opt}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-400">
          ▾
        </span>
      </div>
    </div>
  )
}

export function FilterBar({
  filters,
  onChange,
  onClear,
  onExport,
  groupRegions,
  onGroupRegionsChange,
  variant,
  countryOptions,
  topicOptions,
}: FilterBarProps) {
  const countrySelectOptions = ['Select Country or Region', ...countryOptions]
  const topicSelectOptions =
    variant === 'overview'
      ? ['Topics', ...topicOptions.filter((t) => t !== 'All topics')]
      : ['Topics', ...topicOptions]

  return (
    <div className="mb-4">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div className="flex flex-1 flex-wrap items-end gap-3">
          <SelectField
            label="Country"
            value={filters.country}
            options={countrySelectOptions}
            onChange={(v) => onChange('country', v)}
          />
          {variant === 'overview' && (
            <>
              <SelectField
                label="Category"
                value={filters.category}
                options={['Category', 'Advocacy and Partnerships', 'Evidence and Data', 'Financing', 'Institutional', 'Policy', 'Programme']}
                onChange={(v) => onChange('category', v)}
              />
              <SelectField
                label="Topics"
                value={filters.topic}
                options={topicSelectOptions}
                onChange={(v) => onChange('topic', v)}
              />
              <SelectField
                label="Status"
                value={filters.status}
                options={['Currently Active / All', 'Currently Active', 'All']}
                onChange={(v) => onChange('status', v)}
              />
            </>
          )}
          {variant === 'category' && (
            <>
              <SelectField
                label="Topics"
                value={filters.topic}
                options={topicSelectOptions}
                onChange={(v) => onChange('topic', v)}
              />
              <SelectField
                label="Progress"
                value={filters.progress}
                options={['Progress', 'With progress', 'No progress yet']}
                onChange={(v) => onChange('progress', v)}
              />
            </>
          )}
          <button
            type="button"
            onClick={onExport}
            className="shrink-0 rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-amber-500"
          >
            Export data
          </button>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="shrink-0 text-sm font-medium text-sky-700 hover:text-sky-900 hover:underline"
        >
          Clear all filters
        </button>
      </div>
      <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={groupRegions}
          onChange={(e) => onGroupRegionsChange(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
        />
        Group Regions
      </label>
    </div>
  )
}
