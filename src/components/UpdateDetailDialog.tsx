import { useEffect, useRef } from 'react'

interface UpdateDetailDialogProps {
  open: boolean
  date: string
  text: string
  onClose: () => void
}

export function UpdateDetailDialog({
  open,
  date,
  text,
  onClose,
}: UpdateDetailDialogProps) {
  const doneRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    doneRef.current?.focus()
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="update-dialog-title"
        className="relative z-10 w-full max-w-lg rounded-lg border border-gray-200 bg-white p-6 shadow-xl"
      >
        <h2
          id="update-dialog-title"
          className="mb-3 text-lg font-semibold text-gray-900"
        >
          {date}
        </h2>
        <p className="text-sm leading-relaxed text-gray-700">{text}</p>
        <div className="mt-6 flex justify-end">
          <button
            ref={doneRef}
            type="button"
            onClick={onClose}
            className="rounded-md bg-sky-800 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-900"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
