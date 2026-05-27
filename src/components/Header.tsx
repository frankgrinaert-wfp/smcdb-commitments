const NAV_LINKS = ["Global map", "Data", "Publications", "About", "Contact us"];

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 lg:px-6">
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-sky-700 text-xs font-bold text-white">
            SMC
          </div>
          <div className="leading-tight">
            <div className="text-[11px] font-medium tracking-wide text-gray-500 uppercase">
              School Meals Coalition
            </div>
            <div className="text-sm font-bold tracking-wider text-gray-900">
              Database
            </div>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              onClick={(e) => e.preventDefault()}
              className={`text-sm font-medium transition-colors ${
                link === "Data"
                  ? "text-sky-800 underline decoration-2 underline-offset-4"
                  : "text-gray-700 hover:text-sky-800"
              }`}
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 text-right">
          <div className="hidden text-[10px] leading-tight text-gray-500 sm:block">
            <div className="font-semibold text-gray-700">Data and</div>
            <div>Monitoring initiative</div>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded border border-gray-200 bg-gray-50">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <rect x="3" y="14" width="4" height="7" fill="#e91e63" rx="1" />
              <rect x="10" y="9" width="4" height="12" fill="#ff9800" rx="1" />
              <rect x="17" y="4" width="4" height="17" fill="#4caf50" rx="1" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
