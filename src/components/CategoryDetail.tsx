import { ChevronDown, ChevronRight } from 'lucide-react'
import { Fragment, useMemo, useState } from 'react'
import type { CommitmentCategory, CountryCommitmentGroup, Filters } from '../types'
import { TopicTag } from './TopicTag'

interface CategoryDetailProps {
  category: CommitmentCategory
  groups: CountryCommitmentGroup[]
  filters: Filters
}

export function CategoryDetail({ category, groups, filters }: CategoryDetailProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    for (const g of groups) {
      initial[g.id] = ['Benin', 'Brazil'].includes(g.country)
    }
    return initial
  })

  const filtered = useMemo(() => {
    return groups
      .map((group) => {
        let items = [...group.items]

        if (filters.country) {
          const q = filters.country.toLowerCase()
          if (
            !group.country.toLowerCase().includes(q) &&
            !group.region.toLowerCase().includes(q)
          ) {
            return null
          }
        }

        if (filters.topic && filters.topic !== 'All topics') {
          items = items.filter((item) => item.topic === filters.topic)
        }

        if (filters.progress === 'With progress') {
          items = items.filter((item) => item.progress)
        } else if (filters.progress === 'No progress yet') {
          items = items.filter((item) => !item.progress)
        }

        if (items.length === 0) return null
        return { ...group, items }
      })
      .filter((g): g is CountryCommitmentGroup => g !== null)
  }, [groups, filters])

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">{category}</h1>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-[800px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="w-[180px] px-3 py-3 text-left text-xs font-semibold text-gray-700">
                Country
              </th>
              <th className="w-[140px] px-3 py-3 text-left text-xs font-semibold text-gray-700">
                Topics
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
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-gray-500">
                  No commitments match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((group) => {
                const isOpen = expanded[group.id] ?? false
                return (
                  <Fragment key={group.id}>
                    <tr
                      className="cursor-pointer border-b border-gray-200 bg-white hover:bg-gray-50/80"
                      onClick={() => toggle(group.id)}
                    >
                      <td className="px-3 py-3 align-top">
                        <div className="flex items-start gap-1">
                          {isOpen ? (
                            <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
                          ) : (
                            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
                          )}
                          <div>
                            <div className="font-semibold text-gray-900">{group.country}</div>
                            {isOpen && (
                              <div className="mt-1 flex flex-wrap items-center gap-2">
                                <span className="text-xs text-gray-500">{group.year}</span>
                                <span className="rounded border border-sky-200 bg-sky-50 px-1.5 py-0.5 text-[10px] font-medium text-sky-800">
                                  {group.commitmentType}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td colSpan={3} className="px-3 py-3 text-gray-400">
                        {!isOpen && (
                          <span className="text-xs">
                            {group.items.length} commitment
                            {group.items.length !== 1 ? 's' : ''} — click to expand
                          </span>
                        )}
                      </td>
                    </tr>
                    {isOpen &&
                      group.items.map((item, idx) => (
                        <tr
                          key={item.id}
                          className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                        >
                          <td className="px-3 py-3" />
                          <td className="px-3 py-3 align-top">
                            <TopicTag label={item.topic} color={item.topicColor} />
                          </td>
                          <td className="px-3 py-3 align-top text-sm leading-relaxed text-gray-800">
                            {item.text}
                          </td>
                          <td className="px-3 py-3 align-top text-sm leading-relaxed text-gray-700">
                            {item.progress ?? (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </Fragment>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
