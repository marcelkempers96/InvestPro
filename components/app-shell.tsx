import { NavBar } from "@/components/nav-bar";
import { BottomTabBar } from "@/components/bottom-tab-bar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-20 sm:pb-0">
      <NavBar />
      <main className="mx-auto max-w-3xl px-4 py-6">{children}</main>
      <BottomTabBar />
      <footer className="mx-auto hidden max-w-3xl px-4 py-12 text-center text-xs text-stone-600 sm:block">
        Catalyst is a research tool, not investment advice. Not affiliated with any broker.
      </footer>
    </div>
  );
}
