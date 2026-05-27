import { Fragment, useMemo } from 'react'
import { COMMITMENT_CATEGORIES } from '../types'
import type { CountryOverviewRow, Filters } from '../types'
import { countryWithFlag } from '../utils/countryFlag'

const PAGE_SIZE = 14

interface CommitmentsOverviewProps {
  rows: CountryOverviewRow[]
  filters: Filters
  groupRegions: boolean
  page: number
  onPageChange: (page: number) => void
}

function CellValue({ value }: { value: number | undefined }) {
  if (value === undefined || value === 0) {
    return <span className="text-gray-300">—</span>
  }
  return <span className="font-medium text-gray-900">{value}</span>
}

function DataRow({ row }: { row: CountryOverviewRow }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50">
      <td className="px-3 py-2.5 text-left text-sm font-medium whitespace-nowrap text-gray-900">
        {countryWithFlag(row.name)}
      </td>
      {COMMITMENT_CATEGORIES.map((cat) => (
        <td key={cat} className="px-3 py-2.5 text-center text-sm">
          <CellValue value={row.counts[cat]} />
        </td>
      ))}
      <td className="px-3 py-2.5 text-center text-sm">
        {row.progressReport ? (
          <span aria-label="Progress report available">✅</span>
        ) : (
          <span className="text-gray-300">—</span>
        )}
      </td>
    </tr>
  )
}

export function CommitmentsOverview({
  rows,
  filters,
  groupRegions,
  page,
  onPageChange,
}: CommitmentsOverviewProps) {
  const filtered = useMemo(() => {
    let result = [...rows]

    if (filters.country) {
      const q = filters.country.toLowerCase()
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.region.toLowerCase().includes(q),
      )
    }

    if (filters.category) {
      const cat = filters.category as (typeof COMMITMENT_CATEGORIES)[number]
      result = result.filter((r) => (r.counts[cat] ?? 0) > 0)
    }

    if (filters.status === 'Currently active') {
      result = result.filter(
        (r) =>
          Object.values(r.counts).some((n) => (n ?? 0) > 0) || r.progressReport,
      )
    }

    return result
  }, [rows, filters])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageRows = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  )

  const groupedByRegion = useMemo(() => {
    if (!groupRegions) return null
    const map = new Map<string, CountryOverviewRow[]>()
    for (const row of pageRows) {
      const list = map.get(row.region) ?? []
      list.push(row)
      map.set(row.region, list)
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b))
  }, [groupRegions, pageRows])

  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-3 py-3 text-left text-xs font-semibold tracking-wide text-gray-700">
                Countries and regions
              </th>
              {COMMITMENT_CATEGORIES.map((cat) => (
                <th
                  key={cat}
                  className="px-2 py-3 text-center text-xs font-semibold text-gray-700"
                >
                  {cat}
                </th>
              ))}
              <th className="px-2 py-3 text-center text-xs font-semibold text-gray-800">
                Progress report
              </th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td
                  colSpan={COMMITMENT_CATEGORIES.length + 2}
                  className="px-4 py-12 text-center text-gray-500"
                >
                  No countries match your filters.
                </td>
              </tr>
            ) : groupedByRegion ? (
              groupedByRegion.map(([region, regionRows]) => (
                <Fragment key={region}>
                  <tr className="bg-gray-100/80">
                    <td
                      colSpan={COMMITMENT_CATEGORIES.length + 2}
                      className="px-3 py-2 text-left text-xs font-bold tracking-wide text-gray-600"
                    >
                      {region}
                    </td>
                  </tr>
                  {regionRows.map((row) => (
                    <DataRow key={row.id} row={row} />
                  ))}
                </Fragment>
              ))
            ) : (
              pageRows.map((row) => <DataRow key={row.id} row={row} />)
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          disabled={safePage <= 1}
          onClick={() => onPageChange(safePage - 1)}
          className="rounded border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50"
        >
          Prev
        </button>
        <span className="text-sm text-gray-600">
          Page {safePage} of {totalPages}
        </span>
        <button
          type="button"
          disabled={safePage >= totalPages}
          onClick={() => onPageChange(safePage + 1)}
          className="rounded border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50"
        >
          Next
        </button>
        <span className="ml-2 text-xs text-gray-400">
          {filtered.length} countries
        </span>
      </div>
    </div>
  )
}
