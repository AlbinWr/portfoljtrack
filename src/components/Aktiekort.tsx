import type { AktieSeed } from "../Data/seedAktier";
import { usePortfolj } from "../context/portfoljContext";

export function Aktiekort({ item }: { item: AktieSeed }) {
  const { getAntal, kop, salj } = usePortfolj();
  const antalAktier = getAntal(item.ticker);

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

      <div className="mt-3 flex items-center justify-between text-sm">
        <div className="flex flex-col">
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
          <div className="mt-2 text-sm text-slate-300">
            {antalAktier > 0 ? `Innehav: ${antalAktier} st` : "Äger ej aktier"}
          </div>
        </div>

        {/* Köp/Sälj knappar */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => kop(item.ticker)}
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-600 transition duration-200"
          >
            Köp
          </button>
          <button
            onClick={() => salj(item.ticker)}
            disabled={antalAktier === 0}
            className={`rounded-md px-4 py-2 text-sm font-semibold text-white shadow transition duration-200 ${
              antalAktier > 0
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-600 cursor-not-allowed opacity-50"
            }`}
          >
            Sälj
          </button>
        </div>
      </div>
    </div>
  );
}