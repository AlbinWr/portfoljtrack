import type { AktieSeed } from "../Data/seedAktier";
import { usePortfolj } from "../context/portfoljContext";
import { useState } from "react";
import { useAktieMarknad } from "../context/aktieMarknadContext";

export function Aktiekort({ item }: { item: AktieSeed }) {
  const { getAntal, kop, salj } = usePortfolj();
  const antalAktier = getAntal(item.ticker);
  const { getAktiePris } = useAktieMarknad();
  const aktuelltPris = getAktiePris(item.ticker);

  const [antal, setAntal] = useState(1);

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
            Pris: <span className="font-medium">{aktuelltPris.toLocaleString("sv-SE")} SEK</span>
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

        {/* Inputfält för antal */}
        <div className="mt-3 flex items-center gap-2">
          <label className="text-sm">Antal:</label>
          <input
            type="number"
            min="1"
            value={antal}
            onChange={(e) => setAntal(Number(e.target.value))}
            className="w-16 rounded bg-slate-700 px-2 py-1 text-center text-white"
          />
        </div>

        {/* Köp/Sälj knappar */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {kop(item.ticker, aktuelltPris, antal); setAntal(1)}}
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow 
             hover:bg-emerald-600 active:scale-95 active:bg-emerald-700 active:shadow-inner 
             transition duration-150"
          >
            Köp
          </button>
          <button
            onClick={() => {salj(item.ticker, aktuelltPris, antal); setAntal(1)}}
            disabled={antalAktier === 0}
            className={`rounded-md px-4 py-2 text-sm font-semibold text-white shadow transition duration-150 ${
              antalAktier > 0
                ? "bg-red-500 hover:bg-red-600 active:scale-95 active:bg-red-700 active:shadow-inner"
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