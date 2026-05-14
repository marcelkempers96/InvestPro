"use client";

import { useEffect, useState } from "react";
import { Bell, Mail, Smartphone, Trash2 } from "lucide-react";
import { useWatchlist } from "@/lib/watchlist-store";
import { PageHeader } from "@/components/page-header";

const LEAD_TIME_OPTIONS = [4, 12, 24, 48];

export default function SettingsPage() {
  const ids = useWatchlist((s) => s.ids);
  const clear = useWatchlist((s) => s.clear);
  const [hydrated, setHydrated] = useState(false);
  const [emailOn, setEmailOn] = useState(true);
  const [pushOn, setPushOn] = useState(false);
  const [leadHours, setLeadHours] = useState(24);

  useEffect(() => setHydrated(true), []);

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Settings"
        title="Your"
        emphasis="preferences"
        description="Tune how you get notified. We send one email per catalyst at your lead time. Push requires iOS 16.4+ added to home screen."
      />

      <section className="surface space-y-4 rounded-lg p-4">
        <h2 className="text-mono text-xs uppercase tracking-widest text-stone-500">
          Notifications
        </h2>

        <ToggleRow
          Icon={Mail}
          label="Email alerts"
          description="One email per catalyst, sent at your lead time."
          checked={emailOn}
          onChange={setEmailOn}
        />
        <ToggleRow
          Icon={Smartphone}
          label="Push (Pro)"
          description="Web push to your installed PWA. iOS users: requires home-screen install on iOS 16.4+."
          checked={pushOn}
          onChange={setPushOn}
          locked
        />

        <div>
          <p className="mb-2 inline-flex items-center gap-2 text-sm text-stone-300">
            <Bell className="h-3.5 w-3.5 text-stone-500" aria-hidden /> Lead time
          </p>
          <div className="flex flex-wrap gap-2">
            {LEAD_TIME_OPTIONS.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setLeadHours(h)}
                className={`text-mono rounded-md border px-3 py-1.5 text-xs ${
                  leadHours === h
                    ? "border-amber-400/60 bg-amber-400/10 text-amber-200"
                    : "border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700"
                }`}
              >
                {h < 24 ? `${h}h` : `${h / 24}d`}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-stone-600">
            Sent at {leadHours} hours before each catalyst fires, in your local timezone.
          </p>
        </div>
      </section>

      <section className="surface mt-6 space-y-4 rounded-lg p-4">
        <h2 className="text-mono text-xs uppercase tracking-widest text-stone-500">
          Subscription
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-stone-200">Free tier</p>
            <p className="text-xs text-stone-500">
              20-item watchlist, email notifications, full catalyst list.
            </p>
          </div>
          <button
            type="button"
            className="rounded-md border border-amber-400/60 bg-amber-400/10 px-3 py-1.5 text-xs text-amber-200 hover:bg-amber-400/20"
          >
            Upgrade to Pro
          </button>
        </div>
        <ul className="space-y-1.5 text-xs text-stone-500">
          <li>· Unlimited watchlist</li>
          <li>· Push notifications</li>
          <li>· Daily AI digest</li>
          <li>· Options-flow signals for sub-14-day earnings</li>
          <li>· Historical outcomes tab</li>
        </ul>
      </section>

      <section className="surface mt-6 space-y-3 rounded-lg p-4">
        <h2 className="text-mono text-xs uppercase tracking-widest text-stone-500">Data</h2>
        <p className="text-xs text-stone-500">
          {hydrated ? `${ids.length} catalyst(s) on your watchlist.` : "Loading…"}
        </p>
        <button
          type="button"
          onClick={() => {
            if (confirm("Clear your entire watchlist? This cannot be undone.")) clear();
          }}
          className="inline-flex items-center gap-1 rounded-md border border-rose-500/40 bg-rose-500/5 px-3 py-1.5 text-xs text-rose-300 hover:bg-rose-500/10"
        >
          <Trash2 className="h-3 w-3" aria-hidden /> Clear watchlist
        </button>
      </section>
    </div>
  );
}

function ToggleRow({
  Icon,
  label,
  description,
  checked,
  onChange,
  locked,
}: {
  Icon: typeof Mail;
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  locked?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-4 w-4 text-stone-500" aria-hidden />
        <div>
          <p className="text-sm text-stone-200">{label}</p>
          <p className="text-xs text-stone-500">{description}</p>
        </div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-disabled={locked}
        onClick={() => !locked && onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors ${
          locked
            ? "cursor-not-allowed border-stone-800 bg-stone-900 opacity-60"
            : checked
              ? "border-amber-400/60 bg-amber-400/30"
              : "border-stone-800 bg-stone-900"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-stone-100 transition-all ${
            checked ? "left-5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
