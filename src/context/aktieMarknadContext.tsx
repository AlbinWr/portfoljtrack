import { createContext, useContext, useEffect, useState } from "react";
import { seedAktier, type AktieSeed } from "../Data/seedAktier";
import toast from "react-hot-toast";

// Definiera typ
type AktieMarknadContextType = {
  getAktiePris: (ticker: string) => number;
};

// Skapa context
const AktieMarknadContext = createContext<AktieMarknadContextType | undefined>(
  undefined
);

export function AktieMarknadProvider({ children }: { children: React.ReactNode }) {
  // Initiera priser från seedAktier
  const [priser, setPriser] = useState<Record<string, number>>(
    Object.fromEntries(seedAktier.map((s: AktieSeed) => [s.ticker, s.pris]))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      //Uppdatera alla priser
      setPriser((curr) =>
        Object.fromEntries(
          seedAktier.map((aktie) => {
            const gammaltPris = curr[aktie.ticker];
            const andringProcent =
              (Math.random() - 0.45) * (aktie.volatilitet / 100); 
            const nyttPris = Math.max(1, gammaltPris * (1 + andringProcent)); // Pris kan inte gå under 1
            return [aktie.ticker, Math.round(nyttPris)];
          })
        )
      );

      //Slumpa fram event
      if (Math.random() < 0.1) {
        const slumpAktie =
          seedAktier[Math.floor(Math.random() * seedAktier.length)];
        const eventRiktning = Math.random() < 0.5 ? -1 : 1; // -1 för nedgång, 1 för uppgång
        const procent = 0.05 + Math.random() * 0.25; // 5–30%
        const andringProcent = 1 + eventRiktning * procent;

        // Uppdatera pris
        setPriser((curr) => ({
          ...curr,
          [slumpAktie.ticker]: Math.max(
            1,
            Math.round(curr[slumpAktie.ticker] * andringProcent)
          ),
        }));

        // Visa toast
        if (eventRiktning > 0) {
          toast.success(
            `${slumpAktie.namn} rusar ${Math.round(procent * 100)}% 🚀`
          );
        } else {
          toast.error(
            `${slumpAktie.namn} faller ${Math.round(procent * 100)}% 📉`
          );
        }
      }
    }, 5000); // Uppdatera priser var 5:e sekund

    return () => clearInterval(interval);
  }, []);

  return (
    <AktieMarknadContext.Provider
      value={{
        getAktiePris: (ticker: string) => priser[ticker] ?? 0,
      }}
    >
      {children}
    </AktieMarknadContext.Provider>
  );
}

// Hook för att använda context
// eslint-disable-next-line react-refresh/only-export-components
export function useAktieMarknad() {
  const ctx = useContext(AktieMarknadContext);
  if (!ctx) {
    throw new Error("useAktieMarknad måste användas inom <AktieMarknadProvider>");
  }
  return ctx;
}
