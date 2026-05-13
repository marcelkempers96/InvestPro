"use client";

import { Calendar, Layers, Newspaper, Star, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/", label: "Today", Icon: Calendar, match: (p: string) => p === "/" },
  {
    href: "/catalysts",
    label: "Calendar",
    Icon: Layers,
    match: (p: string) => p.startsWith("/catalysts") || p === "/multi",
  },
  { href: "/news", label: "News", Icon: Newspaper, match: (p: string) => p.startsWith("/news") },
  {
    href: "/watchlist",
    label: "Watching",
    Icon: Star,
    match: (p: string) => p.startsWith("/watchlist"),
  },
  {
    href: "/settings",
    label: "You",
    Icon: User,
    match: (p: string) => p.startsWith("/settings") || p.startsWith("/history"),
  },
];

export function BottomTabBar() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-stone-900 bg-stone-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:hidden"
    >
      <ul className="grid grid-cols-5">
        {TABS.map(({ href, label, Icon, match }) => {
          const active = match(pathname);
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 py-2 text-[10px]",
                  active ? "text-amber-300" : "text-stone-500",
                )}
              >
                <Icon className="h-5 w-5" aria-hidden />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
