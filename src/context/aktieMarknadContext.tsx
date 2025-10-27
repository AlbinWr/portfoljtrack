import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { seedAktier, type AktieSeed } from "../Data/seedAktier";
import toast from "react-hot-toast";

// Definiera typ
type AktieMarknadContextType = {
  getAktiePris: (ticker: string) => number;
  tickInterval: number;
  uppdateraTickInterval: (nyttInterval: number) => void;
  aterstallTickInterval: () => void;
  aterstallMarknad: () => void;

  stress: number;
  kraschSker: boolean;
  simuleraKrasch: () => void;
  aterstallStress: () => void;
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

  // Tick interval state
  const [tickInterval, setTickInterval] = useState<number>(5000);

  // Stress nivå state
  const [stress, setStress] = useState<number>(0);
  const [kraschSker, setKraschSker] = useState<boolean>(false);

  const stressRaknare = useCallback(() => {
    const bas = 1 + Math.random() * 4; // Bas mellan 1-5
    const faktorHastighet = 1000 / tickInterval;

    // Skala stressökningen baserat på tickInterval
    return Math.min(12, Math.round(bas * faktorHastighet));
  }, [tickInterval]);

  const simuleraKrasch = useCallback(() => {
    if (kraschSker) return; // Undvik flera krascher samtidigt
    setKraschSker(true);

    setPriser((curr) => 
      Object.fromEntries(
        seedAktier.map((aktie) => {
          const fall = 0.1 + Math.random() * 0.2; // Fall mellan 10%-30%
          const nyttPris = Math.max(1, Math.round(curr[aktie.ticker] * (1 - fall)));
          return [aktie.ticker, nyttPris];
        })
      )
    );

    toast.error("Börskrasch! Många aktier faller kraftigt i värde.");

    // Återställ stress efter krasch
    setStress(0);

    // Återhämtning efter krasch
    setTimeout(() => setKraschSker(false), 4000);
  }, [kraschSker]);

  const aterstallStress = () => setStress(0);

  useEffect(() => {
    const interval = setInterval(() => {
      //Uppdatera alla priser
      setPriser((curr) =>
        Object.fromEntries(
          seedAktier.map((aktie) => {
            const nuvarandePris = curr[aktie.ticker];
            const andringProcent =
              (Math.random() - 0.4) * (aktie.volatilitet / 100);

            const reversion = (aktie.pris - nuvarandePris) * 0.001;
            const nyttPris = Math.max(1, Number((nuvarandePris * (1 + andringProcent) + reversion).toFixed(2))); // Pris kan inte gå under 1
            return [aktie.ticker, Number(nyttPris.toFixed(2))];
          })
        )
      );

      //Slumpa event
      if (Math.random() < 0.1) {
        const slumpAktie =
          seedAktier[Math.floor(Math.random() * seedAktier.length)];
        if(!slumpAktie) return toast.error("Lugn dag på börsen, inga större händelser idag.");

        const eventRiktning = Math.random() < 0.5 ? -1 : 1; // -1 för nedgång, 1 för uppgång
        const minVol = 0.02; //min 2%
        const maxVol = slumpAktie.volatilitet * 0.025; //max beroende på volatilitet
        const procent = minVol + Math.random() * maxVol;

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
            `${slumpAktie.namn} rusar ${Math.round(procent * 100)}%`
          );
        } else {
          toast.error(
            `${slumpAktie.namn} faller ${Math.round(procent * 100)}%`
          );
        }
      }

      // Uppdatera stress nivå
      setStress((prev) => {
        const nyStress = Math.min(100, prev + stressRaknare());
        if (nyStress >= 100 && !kraschSker) {
          const skaKrascha = Math.random() < 0.2; // 20% chans att krascha vid max stress
          if (skaKrascha) {
            simuleraKrasch();
            return 0; // Återställ stress efter krasch
          }
          else {
            return 0; // Återställ stress även om ingen krasch sker
          }
        }
        return nyStress;
      });
    }, tickInterval); // Uppdatera priser var 5:e sekund

    return () => clearInterval(interval);
  }, [tickInterval, kraschSker, simuleraKrasch, stressRaknare]);

  // Funktioner
  const uppdateraTickInterval = (nyttInterval: number) => {
    setTickInterval(nyttInterval);
  }
  const aterstallTickInterval = () => {
    setTickInterval(5000);
  }
  const aterstallMarknad = () => {
    setPriser(
      Object.fromEntries(seedAktier.map((s: AktieSeed) => [s.ticker, s.pris]))
    );
    setStress(0);
    setKraschSker(false);
  }

  return (
    <AktieMarknadContext.Provider
      value={{
        getAktiePris: (ticker: string) => priser[ticker] ?? 0,
        tickInterval,
        uppdateraTickInterval,
        aterstallTickInterval,
        aterstallMarknad,
        stress,
        kraschSker,
        simuleraKrasch,
        aterstallStress,
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
