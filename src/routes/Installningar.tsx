import { useState } from "react";
import { useSaldo } from "../hooks/useSaldo";
import { usePortfolj } from "../context/portfoljContext";
import { useAktieMarknad } from "../context/aktieMarknadContext";

export const Installningar = () => {
  const { startSaldo, uppdateraStartSaldo, aterstallSaldo } = useSaldo();
  const [inputSaldo, setInputSaldo] = useState(startSaldo.toString());
  const { aterstallPortfolj } = usePortfolj();
  const { aterstallMarknad, aterstallTickInterval, uppdateraTickInterval, tickInterval } = useAktieMarknad();

  const [nyttTickInterval, setNyttTickInterval] = useState(tickInterval.toString());

  // Spara ändringar
  const handleSaveSaldo = () => {
    const nyttSaldo = parseFloat(inputSaldo);
    if (!isNaN(nyttSaldo) && nyttSaldo > 0 && nyttSaldo !== startSaldo) {
      uppdateraStartSaldo(nyttSaldo);
    }

    const nyHastighet = parseInt(nyttTickInterval);
    if (!isNaN(nyHastighet) && nyHastighet !== tickInterval) {
      uppdateraTickInterval(nyHastighet);
    }
  };

  // Återställ alla inställningar
  const handleAterstall = () => {
    aterstallSaldo();
    aterstallPortfolj();
    aterstallMarknad();
    aterstallTickInterval();
    setNyttTickInterval("5000");
    setInputSaldo(startSaldo.toString());
  };



  return (
    <div className="mx-auto max-w-3xl px-4 py-8 text-slate-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-6">Inställningar</h1>

      {/*Alternativ */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveSaldo();
        }}
      >
        <div className="space-y-6">
          {/* Startsaldo */}
          <div className="rounded-lg bg-slate-50/70 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 p-4 shadow-md font-semibold">
            <label className="block text-md mb-2">Startsaldo</label>
            <p className="text-sm text-slate-700 dark:text-slate-400 mb-2">
              Här kan du ange ditt startsaldo. Detta används när du återställer
              spelet.
            </p>
            <input
              type="text"
              inputMode="numeric"
              value={inputSaldo}
              onChange={(e) => setInputSaldo(e.target.value)}
              className="w-full bg-slate-100 inset-shadow-2xs font-normal dark:bg-slate-700 p-2 rounded-md text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Ange startsaldo"
            />
          </div>

          {/* Hastighet på marknaden / sekunder per tick */}
          <div className="rounded-lg bg-slate-50/70 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 p-4 shadow-md font-semibold">
            <label className="block text-md mb-2">Marknadens hastighet</label>
            <p className="text-sm text-slate-700 dark:text-slate-400 mb-2">
              Här ställer du in hur snabbt marknaden uppdateras.
            </p>
            <select
              value={nyttTickInterval}
              onChange={(e) => setNyttTickInterval(e.target.value)}
              className="w-full bg-slate-100 inset-shadow-2xs font-normal dark:bg-slate-700 p-2 rounded text-slate-900 dark:text-white"
            >
              <option value="1000">Snabb (1 sek)</option>
              <option value="5000">Normal (5 sek)</option>
              <option value="10000">Långsam (10 sek)</option>
            </select>
          </div>

          {/* Spara knappen */}
          <button
            type="submit"
            className="w-full bg-[#00cba9] hover:bg-[#00b59b] active:scale-95 transition text-white font-semibold px-4 py-2 rounded-lg"
          >
            Spara inställningar
          </button>

          {/* Återställ */}
          <button
            type="button"
            onClick={handleAterstall}
            className="w-full bg-[#e85566] hover:bg-[#d94452] active:scale-95 transition duration-150 text-white font-semibold px-4 py-2 rounded-lg"
          >
            Återställ
          </button>
        </div>
      </form>
    </div>
  );
};
