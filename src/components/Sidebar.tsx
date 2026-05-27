import {
  Apple,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  DollarSign,
  FileText,
  Globe,
  Star,
  UtensilsCrossed,
} from 'lucide-react'
import { useState } from 'react'
import { COMMITMENT_CATEGORIES } from '../types'
import type { ViewId } from '../types'

const INDICATOR_TOPICS = [
  { id: 'key', label: 'Key Indicators', icon: Star },
  { id: 'meals', label: 'School Meals', icon: UtensilsCrossed },
  { id: 'edu', label: 'Education', icon: BookOpen },
  { id: 'fund', label: 'Funding', icon: DollarSign },
  { id: 'policy', label: 'Policy', icon: FileText },
  { id: 'nutrition', label: 'Nutritional Quality', icon: Apple },
] as const

interface SidebarProps {
  activeView: ViewId
  onNavigate: (view: ViewId) => void
}

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const [topicsOpen, setTopicsOpen] = useState<Record<string, boolean>>({})
  const [commitmentsExpanded, setCommitmentsExpanded] = useState(true)

  const toggleTopic = (id: string) => {
    setTopicsOpen((prev) => ({ ...prev, [id]: !prev[id] }))
  }

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
          Indicators Topics
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
                  <Icon className="h-4 w-4 shrink-0 text-gray-500" strokeWidth={1.75} />
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
          School Meals Coalition
        </div>

        <button
          type="button"
          className="mb-1 flex w-full items-center gap-2 rounded px-2 py-2 text-left text-sm text-gray-700 hover:bg-white"
        >
          <Globe className="h-4 w-4 text-gray-500" strokeWidth={1.75} />
          SMC Membership
        </button>

        <div>
          <button
            type="button"
            onClick={() => setCommitmentsExpanded((v) => !v)}
            className="flex w-full items-center justify-between rounded px-2 py-2 text-left text-sm font-medium text-gray-800 hover:bg-white"
          >
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-500" strokeWidth={1.75} />
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
                  onClick={() => onNavigate('overview')}
                  className={`flex w-full items-center gap-1.5 rounded-r px-2 py-1.5 text-left text-sm transition-colors ${
                    activeView === 'overview'
                      ? 'border border-sky-200 bg-white font-medium text-sky-900 shadow-sm'
                      : 'text-gray-600 hover:bg-white hover:text-gray-900'
                  }`}
                >
                  <ChevronRight className="h-3 w-3 shrink-0 opacity-60" />
                  Overview matrix
                </button>
              </li>
              {COMMITMENT_CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => onNavigate(cat)}
                    className={`flex w-full items-center gap-1.5 rounded-r px-2 py-1.5 text-left text-sm transition-colors ${
                      activeView === cat
                        ? 'border border-sky-300 bg-white font-medium text-sky-900 shadow-sm'
                        : 'text-gray-600 hover:bg-white hover:text-gray-900'
                    }`}
                  >
                    <ChevronRight className="h-3 w-3 shrink-0 opacity-60" />
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </aside>
  )
}
