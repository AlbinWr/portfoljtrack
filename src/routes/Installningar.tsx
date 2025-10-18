import { useState } from "react";
import { useSaldo } from "../hooks/useSaldo";
import { usePortfolj } from "../context/portfoljContext";

export const Installningar = () => {
  const { startSaldo, uppdateraStartSaldo, aterstallSaldo } = useSaldo();
  const [inputSaldo, setInputSaldo] = useState(startSaldo.toString());
  const { aterstallPortfolj } = usePortfolj();

  const handleSaveSaldo = () => {
    const nyttSaldo = parseFloat(inputSaldo);
    if (!isNaN(nyttSaldo) && nyttSaldo > 0) {
      uppdateraStartSaldo(nyttSaldo);
    }
  };

  const handleAterstall = () => {
    aterstallSaldo();
    aterstallPortfolj();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 text-[#FAFAFF]">
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
        <div className="bg-slate-800 p-4 rounded-lg shadow-md">
          <label className="block text-sm text-[#FAFAFF] mb-2">
            Startsaldo
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={inputSaldo}
            onChange={(e) => setInputSaldo(e.target.value)}
            className="w-full bg-slate-700 p-2 rounded-md text-white"
            placeholder="Ange startsaldo"
          />
        </div>
        {/* Hastighet på marknaden / sekunder per tick */}
        <div className="bg-slate-800 p-4 rounded-lg shadow-md">
          <label className="block text-sm text-[#FAFAFF] mb-2">
            Marknadens hastighet
          </label>
          <select className="w-full bg-slate-700 p-2 rounded text-white">
            <option value="1000">Normal (1 sek)</option>
            <option value="5000">Snabb (5 sek)</option>
            <option value="10000">Långsam (10 sek)</option>
          </select>
        </div>
        {/* Dark Mode */}
        <div className="bg-slate-800 p-4 rounded-lg shadow flex items-center justify-between">
          <span className="text-sm text-[#FAFAFF]">Dark Mode</span>
          <input type="checkbox" className="toggle-checkbox" />
        </div>

        {/* Spara knappen */}
        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 transition text-white font-semibold px-4 py-2 rounded-lg">
          Spara inställningar
        </button>

        {/* Återställ */}
        <button onClick={handleAterstall} className="w-full bg-red-500 hover:bg-red-600  active:scale-95 transition duration-150 text-[#FAFAFF] font-semibold px-4 py-2 rounded-lg">
          Återställ
        </button>
      </div>
      </form>
    </div>
  );
};
