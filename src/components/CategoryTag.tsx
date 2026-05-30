export function CategoryTag({ label }: { label: string }) {
  return (
    <span className="inline-block rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-gray-700">
      {label}
    </span>
  );
}
