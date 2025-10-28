import { useSaldo } from "../hooks/useSaldo";
import { usePortfolj } from "../context/portfoljContext";
import { useAktieMarknad } from "../context/aktieMarknadContext";

export const Portfolj = () => {
  const { saldo, startSaldo } = useSaldo();
  const { portfolj, salj } = usePortfolj();
  const { getAktiePris } = useAktieMarknad();

  const portfoljVarde = portfolj.reduce((sum, aktie) => {
    const pris = getAktiePris(aktie.ticker);
    return sum + aktie.antal * pris;
  }, 0);

  const totaltVarde = saldo + portfoljVarde;
  const totalVinst = totaltVarde - startSaldo;
  const totalVinstProcent = (totalVinst / startSaldo) * 100;
  

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-start gap-5 text-slate-900 dark:text-white px-4">
      <h1 className="text-4xl font-bold">Portfölj</h1>

      {/* Summering högst upp */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl px-4 mb-8 z-50 dark:text-gray-400">
        <div className="rounded-lg border border-slate-200 dark:border-slate-700/60 bg-slate-50/70 dark:bg-slate-800/90 backdrop-blur-md p-4 shadow-lg">
          <p className="text-sm ">Saldo</p>
          <p className="text-2xl font-bold text-orange-300">
            {saldo.toLocaleString("sv-SE")} SEK
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 dark:border-slate-700/60 bg-slate-50/70 dark:bg-slate-800/90 backdrop-blur-md p-4 shadow-lg">
          <p className="text-sm">Portföljvärde</p>
          <p className="text-2xl font-bold text-emerald-400">
            {portfoljVarde.toLocaleString("sv-SE")} SEK
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 dark:border-slate-700/60 bg-slate-50/70 dark:bg-slate-800/90 backdrop-blur-md p-4 shadow-lg">
          <p className="text-sm">Totalt värde</p>
          <p className="text-2xl font-bold text-sky-400">
            {totaltVarde.toLocaleString("sv-SE")} SEK
            <span className={`text-lg ${totalVinst >= 0 ? "text-emerald-400" : "text-red-400"}`}> ({totalVinst.toLocaleString("sv-SE")} SEK, {totalVinstProcent.toLocaleString("sv-SE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%)</span>
          </p>
        </div>
      </div>

      {/* Portföljtabell */}
      <div className="w-full max-w-4xl mt-8 z-40 pb-5">
        <h2 className="text-2xl font-semibold mb-4">Innehav</h2>
        {portfolj.length === 0 ? (
          <p className="text-slate-900 dark:text-gray-200">Du äger inga aktier ännu.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full border-collapse ">
              <thead >
                <tr className="bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-white">
                  <th className="p-3 text-left">Ticker</th>
                  <th className="p-3 text-right">Antal</th>
                  <th className="p-3 text-right">Inköpspris</th>
                  <th className="p-3 text-right">Nupris</th>
                  <th className="p-3 text-right">Värde</th>
                  <th className="p-3 text-right">Vinst</th>
                  <th className="p-3 text-right">Vinst %</th>
                  <th className="p-3 text-right"></th>
                </tr>
              </thead>
              <tbody>
                {portfolj.map((aktie, idx) => {
                  const nuPris = getAktiePris(aktie.ticker);
                  const varde = aktie.antal * nuPris;
                  const vinst = (nuPris - aktie.inkopsPris) * aktie.antal;
                  const vinstProcent =
                    ((nuPris - aktie.inkopsPris) / aktie.inkopsPris) * 100;

                  return (
                    <tr
                      key={aktie.ticker}
                      className={
                        idx % 2 === 0
                          ? "text-slate-900 dark:text-gray-200 bg-slate-100 dark:bg-slate-900"
                          : "text-slate-900 dark:text-gray-200 bg-slate-50 dark:bg-slate-800"
                      }
                    >
                      <td className="p-3 font-semibold text-sky-300">
                        {aktie.ticker}
                      </td>
                      <td className="p-3 text-right">{aktie.antal}</td>
                      <td className="p-3 text-right">
                        {aktie.inkopsPris.toFixed(2)} SEK
                      </td>
                      <td className="p-3 text-right">
                        {nuPris.toFixed(2)} SEK
                      </td>
                      <td className="p-3 text-right font-semibold">
                        {varde.toLocaleString("sv-SE")} SEK
                      </td>
                      <td
                        className={`p-3 text-right font-semibold ${
                          vinst >= 0 ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {vinst.toLocaleString("sv-SE", { minimumFractionDigits: 2 })} SEK
                      </td>
                      <td
                        className={`p-3 text-right font-semibold ${
                          vinstProcent >= 0
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {vinstProcent.toLocaleString("sv-SE", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %
                      </td>
                      {/* Sälj alla aktier */}
                      <td className="p-3 text-right">
                        <button
                          onClick={() =>
                            salj(aktie.ticker, nuPris, aktie.antal)
                          }
                          className="rounded-md px-4 py-2 text-sm font-semibold text-white shadow bg-[#e85566] hover:bg-[#d94452] active:scale-95 active:bg-[#d94452] active:shadow-inner"
                        >
                          Sälj alla
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          
        )}
      </div>
    </div>
  );
};


