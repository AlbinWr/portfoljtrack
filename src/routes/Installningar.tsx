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
    if (!isNaN(nyttSaldo) && nyttSaldo > 0) {
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
    setInputSaldo("10000");
  };



  return (
    <div className="mx-auto max-w-3xl px-4 py-8 text-slate-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Inställningar</h1>

      {/*Alternativ */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveSaldo();
        }}
      >
      <div className="space-y-6">
        {/* Startsaldo */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <label className="block text-sm mb-2">
            Startsaldo
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={inputSaldo}
            onChange={(e) => setInputSaldo(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-700 p-2 rounded-md text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Ange startsaldo"
          />
        </div>

        {/* Hastighet på marknaden / sekunder per tick */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <label className="block text-sm mb-2">
            Marknadens hastighet
          </label>
          <select
            value={nyttTickInterval}
            onChange={(e) => setNyttTickInterval(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-700 p-2 rounded text-slate-900 dark:text-white"
          >
            <option value="1000">Snabb (1 sek)</option>
            <option value="5000">Normal (5 sek)</option>
            <option value="10000">Långsam (10 sek)</option>
          </select>
        </div>

        {/* Spara knappen */}
        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 transition text-white font-semibold px-4 py-2 rounded-lg">
          Spara inställningar
        </button>

        {/* Återställ */}
        <button type="button" onClick={handleAterstall} className="w-full bg-red-500 hover:bg-red-600 active:scale-95 transition duration-150 text-white font-semibold px-4 py-2 rounded-lg">
          Återställ
        </button>      
      </div>
      </form>
    </div>
  );
};
