import { useMemo } from 'react'
import type {
  CommitmentCategory,
  CountryCommitmentGroup,
  Filters,
} from '../types'
import { countryWithFlag } from '../utils/countryFlag'
import { TopicTag } from './TopicTag'

interface CategoryDetailProps {
  category: CommitmentCategory
  groups: CountryCommitmentGroup[]
  filters: Filters
}

interface FlatRow {
  id: string
  country: string
  yearLabel: string
  topic: string
  topicColor: CountryCommitmentGroup['items'][number]['topicColor']
  commitment: string
  progress: string | null
}

function formatYearLabel(group: CountryCommitmentGroup): string {
  return `${group.year} (${group.commitmentType.toLowerCase()})`
}

export function CategoryDetail({ category, groups, filters }: CategoryDetailProps) {
  const rows = useMemo(() => {
    const result: FlatRow[] = []

    for (const group of groups) {
      let items = [...group.items]

      if (filters.country) {
        const q = filters.country.toLowerCase()
        if (
          !group.country.toLowerCase().includes(q) &&
          !group.region.toLowerCase().includes(q)
        ) {
          continue
        }
      }

      if (filters.topic && filters.topic !== 'All topic') {
        items = items.filter((item) => item.topic === filters.topic)
      }

      if (filters.progress === 'With progress') {
        items = items.filter((item) => item.progress)
      } else if (filters.progress === 'No progress yet') {
        items = items.filter((item) => !item.progress)
      }

      for (const item of items) {
        result.push({
          id: item.id,
          country: group.country,
          yearLabel: formatYearLabel(group),
          topic: item.topic,
          topicColor: item.topicColor,
          commitment: item.text,
          progress: item.progress,
        })
      }
    }

    return result
  }, [groups, filters])

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">{category}</h1>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="w-[120px] px-3 py-3 text-left text-xs font-semibold text-gray-700">
                Country
              </th>
              <th className="w-[160px] px-3 py-3 text-left text-xs font-semibold text-gray-700">
                Year
              </th>
              <th className="w-[140px] px-3 py-3 text-left text-xs font-semibold text-gray-700">
                Topic
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700">
                Commitment
              </th>
              <th className="w-[280px] px-3 py-3 text-left text-xs font-semibold text-gray-700">
                Progress
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                  No commitments match your filters.
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                >
                  <td className="px-3 py-3 align-top font-semibold text-gray-900">
                    {countryWithFlag(row.country)}
                  </td>
                  <td className="px-3 py-3 align-top text-sm text-gray-700">{row.yearLabel}</td>
                  <td className="px-3 py-3 align-top">
                    <TopicTag label={row.topic} color={row.topicColor} />
                  </td>
                  <td className="px-3 py-3 align-top text-sm leading-relaxed text-gray-800">
                    {row.commitment}
                  </td>
                  <td className="px-3 py-3 align-top text-sm leading-relaxed text-gray-700">
                    {row.progress ?? <span className="text-gray-400">—</span>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
