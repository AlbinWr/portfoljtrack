import { useSaldo } from "../hooks/useSaldo";
import { usePortfolj } from "../context/portfoljContext";
import { getAktiePris } from "../utilities/getAktiePris";

export const Home = () => {
  const { saldo } = useSaldo();
  const { portfolj } = usePortfolj();

  const portfoljVarde = portfolj.reduce((sum, aktie) => {
    const pris = getAktiePris(aktie.ticker);
    return sum + aktie.antal * pris;
  }, 0);

  const totaltVarde = saldo + portfoljVarde;

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-bl from-slate-900 via-sky-950 to-slate-900 pt-20">
      <h1 className="text-4xl font-bold text-white mb-8">Din portfölj</h1>

      {/* Summering högst upp */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
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
          <p className="text-2xl font-bold text-sky-400">
            {totaltVarde.toLocaleString("sv-SE")} SEK
          </p>
        </div>
      </div>

      {/* Portföljtabell */}
      <div className="w-full max-w-4xl mt-8">
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
                </tr>
              </thead>
              <tbody>
                {portfolj.map((aktie, idx) => {
                  const nuPris = getAktiePris(aktie.ticker);
                  const varde = aktie.antal * nuPris;

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
                      <td className="p-3 text-right text-gray-200">{aktie.antal}</td>
                      <td className="p-3 text-right text-gray-200">{aktie.inkopsPris} SEK</td>
                      <td className="p-3 text-right text-gray-200">{nuPris} SEK</td>
                      <td className="p-3 text-right font-semibold text-gray-200">
                        {varde.toLocaleString("sv-SE")} SEK
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
