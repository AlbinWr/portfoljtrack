export const Installningar = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 text-[#FAFAFF]">
      <h1 className="text-3xl font-bold mb-6">Inställningar</h1>

      {/*Alternativ */}
      <div className="space-y-6">
        {/* Startsaldo */}
        <div className="bg-slate-800 p-4 rounded-lg shadow-md">
          <label className="block text-sm text-[#FAFAFF] mb-2">Startsaldo</label>
          <input
            type="text"
            inputMode="numeric"
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
        {/* Återställ */}
          <button className="w-full bg-red-500 hover:bg-red-600  active:scale-95 transition duration-150 text-[#FAFAFF] font-semibold px-4 py-2 rounded-lg">
            Återställ
          </button>
      </div>
    </div>
  );
};
