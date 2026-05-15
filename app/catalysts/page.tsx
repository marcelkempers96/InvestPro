import { Suspense } from "react";
import { CatalystsBrowser } from "@/components/catalysts-browser";
import { PageHeader } from "@/components/page-header";

export default function CatalystsPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Catalysts"
        title="The full"
        emphasis="catalyst calendar"
        description="Every upcoming catalyst we're tracking. Filter by industry, risk, market-cap class, or guidance trajectory."
      />

      <Suspense
        fallback={<div className="surface mt-2 h-40 animate-pulse rounded-lg" />}
      >
        <CatalystsBrowser />
      </Suspense>
    </div>
  );
}
