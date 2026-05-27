import type { TopicTagColor } from '../types'

const colorClasses: Record<TopicTagColor, string> = {
  pink: 'bg-pink-100 text-pink-800 border-pink-200',
  blue: 'bg-sky-100 text-sky-800 border-sky-200',
  orange: 'bg-orange-100 text-orange-800 border-orange-200',
  green: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  purple: 'bg-violet-100 text-violet-800 border-violet-200',
}

export function TopicTag({
  label,
  color = 'blue',
}: {
  label: string
  color?: TopicTagColor
}) {
  return (
    <span
      className={`inline-block rounded border px-2 py-0.5 text-xs font-medium whitespace-nowrap ${colorClasses[color]}`}
    >
      {label}
    </span>
  )
}
