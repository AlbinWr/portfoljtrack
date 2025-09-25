import { Sokfalt } from "../components/Sokfalt";
import { seedAktier } from "../Data/seedAktier";
import { Aktiekort } from "../components/Aktiekort";


export const Aktier = () => {
  return (
 <div className="min-h-screen bg-slate-900 text-slate-100 pt-15 pb-10">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-3xl font-bold">Aktier</h1>
        <div className="mt-4 max-w-md">
          <Sokfalt />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {seedAktier.map((item) => (
            <Aktiekort key={item.ticker} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
