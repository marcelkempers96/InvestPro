import Link from "next/link";

export default function NotFound() {
  return (
    <div className="surface mx-auto my-12 flex max-w-md flex-col items-center gap-3 rounded-lg p-8 text-center">
      <p className="text-mono text-xs uppercase tracking-widest text-stone-500">404</p>
      <h1 className="text-display text-3xl text-stone-100">Not found</h1>
      <p className="text-sm text-stone-500">
        The catalyst you're looking for may have already fired, or it never existed.
      </p>
      <Link
        href="/"
        className="rounded-md border border-stone-800 px-3 py-1.5 text-xs text-stone-300 hover:border-amber-400/40 hover:text-amber-300"
      >
        Back to Today
      </Link>
    </div>
  );
}
