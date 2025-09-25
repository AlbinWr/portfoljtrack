import type { AktieSeed } from "../Data/seedAktier";

export function Aktiekort({ item }: { item: AktieSeed }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 text-slate-100 shadow hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-400">{item.ticker}</div>
        <button
          className="text-xs rounded-md border border-slate-600 px-2 py-1"
          onClick={() => alert(`${item.ticker} tillagd i bevakning`)}
        >
          Bevakning
        </button>
      </div>

      <div className="mt-1 text-lg font-semibold">{item.namn}</div>

      <div className="mt-3 space-y-1 text-sm">
        <div>
          Pris: <span className="font-medium">{item.pris} SEK</span>
        </div>
        <div>
          Volatilitet:{" "}
          <span className="font-medium">{item.volatilitet}/10</span>
        </div>
        <div>
          Sektor: <span className="font-medium">{item.sektor}</span>
        </div>
      </div>
    </div>
  );
}