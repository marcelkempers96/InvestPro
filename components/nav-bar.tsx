import Link from "next/link";

export function NavBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-900/80 bg-stone-950/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="text-display text-xl tracking-tight text-stone-100 group-hover:text-amber-300">
            Catalyst
          </span>
          <span className="text-italic-display hidden text-xs text-stone-500 sm:inline">
            things that <em>move</em> the market
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 sm:flex">
          <NavItem href="/" label="Today" />
          <NavItem href="/catalysts" label="Catalysts" />
          <NavItem href="/multi" label="Multi" />
          <NavItem href="/news" label="News" />
          <NavItem href="/watchlist" label="Watching" />
          <NavItem href="/history" label="History" />
        </nav>

        <Link
          href="/settings"
          className="text-xs text-stone-400 hover:text-stone-100"
          aria-label="Settings"
        >
          Settings
        </Link>
      </div>
    </header>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-md px-2.5 py-1 text-sm text-stone-400 hover:bg-stone-900 hover:text-stone-100"
    >
      {label}
    </Link>
  );
}
