import { Sokfalt } from "../components/Sokfalt";
import { seedAktier } from "../Data/seedAktier";
import { Aktiekort } from "../components/Aktiekort";


export const Aktier = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-bl from-slate-900 via-sky-950 to-slate-900 text-slate-100 pt-15 pb-10">
      <div className="mx-auto max-w-5xl px-4 py-8 relative z-10">
        <h1 className="text-3xl font-bold">Aktier</h1>
        <div className="mt-4 max-w-md">
          <Sokfalt />
        </div>

        {/* Aktiekort grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {seedAktier.map((item) => (
            <Aktiekort key={item.ticker} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
