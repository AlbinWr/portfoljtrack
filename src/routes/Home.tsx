import { useSaldo } from "../hooks/useSaldo";
import { usePortfolj } from "../context/portfoljContext";
import { useAktieMarknad } from "../context/aktieMarknadContext";

export const Home = () => {
  const { saldo, startSaldo } = useSaldo();
  const { portfolj } = usePortfolj();
  const { getAktiePris } = useAktieMarknad();

  const portfoljVarde = portfolj.reduce((sum, aktie) => {
    const pris = getAktiePris(aktie.ticker);
    return sum + aktie.antal * pris;
  }, 0);

  const totaltVarde = saldo + portfoljVarde;
  const totalVinst = totaltVarde - startSaldo;
  const totalVinstProcent = (totalVinst / startSaldo) * 100;
  

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-start gap-5 text-slate-100 px-4">
      <h1 className="text-4xl font-bold">Portfölj</h1>

      {/* Summering högst upp */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl px-4 mb-8 z-50">
        <div className="rounded-lg bg-slate-800 p-4 text-white shadow">
          <p className="text-sm text-gray-400">Saldo</p>
          <p className="text-2xl font-bold text-orange-300">
            {saldo.toLocaleString("sv-SE")} SEK
          </p>
        </div>

        <div className="rounded-lg bg-slate-800 p-4 text-white shadow">
          <p className="text-sm text-gray-400">Portföljvärde</p>
          <p className="text-2xl font-bold text-emerald-400">
            {portfoljVarde.toLocaleString("sv-SE")} SEK
          </p>
        </div>

        <div className="rounded-lg bg-slate-800 p-4 text-white shadow">
          <p className="text-sm text-gray-400">Totalt värde</p>
          <p className="text-2xl font-bold text-sky-300">
            {totaltVarde.toLocaleString("sv-SE")} SEK
            <span className={`text-lg ${totalVinst >= 0 ? "text-emerald-400" : "text-red-400"}`}> ({totalVinst.toLocaleString("sv-SE")} SEK, {totalVinstProcent.toFixed(2)}%)</span>
          </p>
        </div>
      </div>

      {/* Portföljtabell */}
      <div className="w-full max-w-4xl mt-8 z-40">
        <h2 className="text-2xl text-gray-200 font-semibold mb-4">Innehav</h2>
        {portfolj.length === 0 ? (
          <p className="text-gray-400">Du äger inga aktier ännu.</p>
        ) : (
          <div className="overflow-hidden rounded-lg shadow-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-800 text-gray-200">
                  <th className="p-3 text-left">Ticker</th>
                  <th className="p-3 text-right">Antal</th>
                  <th className="p-3 text-right">Inköpspris</th>
                  <th className="p-3 text-right">Nupris</th>
                  <th className="p-3 text-right">Värde</th>
                  <th className="p-3 text-right">Vinst</th>
                  <th className="p-3 text-right">Vinst %</th>
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
                        idx % 2 === 0 ? "bg-slate-900" : "bg-slate-800"
                      }
                    >
                      <td className="p-3 font-medium text-sky-300">
                        {aktie.ticker}
                      </td>
                      <td className="p-3 text-right text-gray-200">
                        {aktie.antal}
                      </td>
                      <td className="p-3 text-right text-gray-200">
                        {aktie.inkopsPris.toFixed(2)} SEK
                      </td>
                      <td className="p-3 text-right text-gray-200">
                        {nuPris.toFixed(2)} SEK
                      </td>
                      <td className="p-3 text-right font-semibold text-gray-200">
                        {varde.toLocaleString("sv-SE")} SEK
                      </td>
                      <td
                        className={`p-3 text-right font-semibold ${
                          vinst >= 0 ? "text-emerald-400" : "text-red-400"
                        }`}
                        >{vinst.toFixed(2)} SEK</td>
                      <td
                        className={`p-3 text-right font-semibold ${
                          vinstProcent >= 0 ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {vinstProcent.toFixed(1)} %
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


