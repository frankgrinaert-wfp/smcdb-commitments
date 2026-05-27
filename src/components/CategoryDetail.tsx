import { useMemo, useState } from 'react'
import type {
  CommitmentCategory,
  CountryCommitmentGroup,
  Filters,
  LatestProgress,
} from '../types'
import { countryWithFlag } from '../utils/countryFlag'
import { TopicTag } from './TopicTag'
import { UpdateDetailDialog } from './UpdateDetailDialog'

interface CategoryDetailProps {
  category: CommitmentCategory
  groups: CountryCommitmentGroup[]
  filters: Filters
}

interface FlatRow {
  id: string
  country: string
  year: number
  topic: string
  topicColor: CountryCommitmentGroup['items'][number]['topicColor']
  commitment: string
  latestProgress: LatestProgress | null
}

export function CategoryDetail({ category, groups, filters }: CategoryDetailProps) {
  const [openProgress, setOpenProgress] = useState<LatestProgress | null>(null)

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

      if (filters.latestProgress === 'With progress') {
        items = items.filter((item) => item.latestProgress)
      } else if (filters.latestProgress === 'No progress yet') {
        items = items.filter((item) => !item.latestProgress)
      }

      for (const item of items) {
        result.push({
          id: item.id,
          country: group.country,
          year: group.year,
          topic: item.topic,
          topicColor: item.topicColor,
          commitment: item.text,
          latestProgress: item.latestProgress,
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
              <th className="w-[140px] px-3 py-3 text-left text-xs font-semibold text-gray-700">
                Topic
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700">
                Commitment
              </th>
              <th className="w-[160px] px-3 py-3 text-left text-xs font-semibold text-gray-700">
                Year
              </th>
              <th className="w-[120px] px-3 py-3 text-left text-xs font-semibold text-gray-700">
                Latest progress
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
                  <td className="px-3 py-3 align-top">
                    <TopicTag label={row.topic} color={row.topicColor} />
                  </td>
                  <td className="px-3 py-3 align-top text-sm leading-relaxed text-gray-800">
                    {row.commitment}
                  </td>
                  <td className="px-3 py-3 align-top text-sm">
                    <div>
                      <div className="text-gray-900">{row.year}</div>
                      <button
                        type="button"
                        className="mt-0.5 text-sky-700 hover:text-sky-900 hover:underline"
                      >
                        View details
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-3 align-top text-sm">
                    {row.latestProgress ? (
                      <div>
                        <div className="text-gray-900">{row.latestProgress.date}</div>
                        <button
                          type="button"
                          onClick={() => setOpenProgress(row.latestProgress)}
                          className="mt-0.5 text-sky-700 hover:text-sky-900 hover:underline"
                        >
                          View progress
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <UpdateDetailDialog
        open={openProgress !== null}
        date={openProgress?.date ?? ''}
        text={openProgress?.text ?? ''}
        onClose={() => setOpenProgress(null)}
      />
    </div>
  )
}
