import React from "react";
import { Sokfalt } from "../components/Sokfalt";
import { seedAktier } from "../Data/seedAktier";
import { Aktiekort } from "../components/Aktiekort";

export const Aktier = () => {
  const [sok, setSok] = React.useState("");

  const filtreradeAktier = seedAktier.filter((aktie) =>
    aktie.namn.toLowerCase().includes(sok.toLowerCase()) ||
    aktie.ticker.toLowerCase().includes(sok.toLowerCase()) || aktie.sektor.toLowerCase().includes(sok.toLowerCase())
  );

  return (
      <div className="mx-auto max-w-5xl px-4 z-10 text-slate-900 dark:text-white">
        <h1 className="text-4xl font-bold dark:text-slate-200">Aktier</h1>
        <div className="mt-4 max-w-md">
          <Sokfalt value={sok} onChange={setSok} />
        </div>

        {/* Aktiekort grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtreradeAktier.map((aktie) => (
            <Aktiekort key={aktie.ticker} item={aktie} />
          ))}

          {/* Visa meddelande om inga aktier hittades */}
          {filtreradeAktier.length === 0 && (
            <p className="text-gray-400">Inga aktier hittades.</p>
          )}
        </div>
      </div>
  );
};
