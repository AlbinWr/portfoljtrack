import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
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

// Konstanter
const START_TICK_INTERVAL = 5000; // 5 sekunder
const MAX_STRESS_OKNING = 12;
const START_KRASCH_CHANS = 0.05; // 5%
const CHANS_EVENT_PER_TICK = 0.1; // 10%
const MIN_VOLATILITET = 0.02; // 2%
const MAX_VOLATILITET_FAKTOR = 0.025; // 25%
const KRASCH_SKER_EXTRA_NEDGANG = 0.03; // 3%
const ANTAL_KRASCH_TICKS = 3; // Antal ticks en krasch pågår


export function AktieMarknadProvider({ children }: { children: React.ReactNode }) {
  // Initiera priser från seedAktier
  const [priser, setPriser] = useState<Record<string, number>>(
    Object.fromEntries(seedAktier.map((s: AktieSeed) => [s.ticker, s.pris]))
  );

    const [tickInterval, setTickInterval] = useState(START_TICK_INTERVAL);
  const [stress, setStress] = useState(0);
  const [kraschSker, setKraschSker] = useState(false);
  const [kraschChans, setKraschChans] = useState(START_KRASCH_CHANS);

  const kraschTicksKvar = useRef(0);

  const stressRaknare = useCallback(() => {
    const bas = 1 + Math.random() * 4; // Bas mellan 1-5
    const faktorHastighet = 1000 / tickInterval;

    // Skala stressökningen baserat på tickInterval
    return Math.min(MAX_STRESS_OKNING, Math.round(bas * faktorHastighet));
  }, [tickInterval]);

  const simuleraKrasch = useCallback(() => {
    if (kraschSker) return; // Undvik flera krascher samtidigt
    setKraschSker(true);
    kraschTicksKvar.current = ANTAL_KRASCH_TICKS;

    // Initialt fall
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
  }, [kraschSker]);

  const aterstallStress = () => setStress(0);

  useEffect(() => {
    const interval = setInterval(() => {
      //Uppdatera alla priser
      setPriser((curr) =>
        Object.fromEntries(
          seedAktier.map((aktie) => {
            const nuvarandePris = curr[aktie.ticker];
            let andringProcent =
              (Math.random() - 0.4) * (aktie.volatilitet / 100);
            const reversion = (aktie.pris - nuvarandePris) * 0.001;

            if (kraschSker && kraschTicksKvar.current > 0) {
              andringProcent -= KRASCH_SKER_EXTRA_NEDGANG;
            }
            
            // Pris kan inte gå under 1 för att undvika negativa priser
            const nyttPris = Math.max(
              1,
              Number(
                (nuvarandePris * (1 + andringProcent) + reversion).toFixed(2)
              )
            );
            return [aktie.ticker, Number(nyttPris)];
          })
        )
      );

      // Hantera krasch ticks
      if (kraschSker && kraschTicksKvar.current > 0) {
        kraschTicksKvar.current -= 1;
        if (kraschTicksKvar.current <= 0) {
          setKraschSker(false);
        }
      }

      //Slumpa event
      if (Math.random() < CHANS_EVENT_PER_TICK) {
        const slumpAktie =
          seedAktier[Math.floor(Math.random() * seedAktier.length)];
        if (slumpAktie) {
        const eventRiktning = Math.random() < 0.5 ? -1 : 1; // -1 för nedgång, 1 för uppgång
        const maxVol = slumpAktie.volatilitet * MAX_VOLATILITET_FAKTOR; //max beroende på volatilitet
        const procent = MIN_VOLATILITET + Math.random() * maxVol;

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
      }

      // Uppdatera stress nivå
      setStress((prev) => {
        const nyStress = Math.min(100, prev + stressRaknare());

        // Kolla om krasch ska ske
        if (nyStress >= 100 && !kraschSker) {
          // chans att krascha vid max stress
          if (Math.random() < kraschChans) {
            simuleraKrasch();
            setKraschChans(START_KRASCH_CHANS);
          } else {
            const nyChans = Math.min(1, kraschChans + 0.05);
            setKraschChans(nyChans);
            return 0;
          }
        }
        return nyStress;
      });


    }, tickInterval);

    return () => clearInterval(interval);
  }, [tickInterval, kraschSker, kraschChans, simuleraKrasch, stressRaknare]);

  // Funktioner
  const uppdateraTickInterval = (nyttInterval: number) => {
    setTickInterval(nyttInterval);
  }
  const aterstallTickInterval = () => {
    setTickInterval(START_TICK_INTERVAL);
  }
  const aterstallMarknad = () => {
    setPriser(
      Object.fromEntries(seedAktier.map((aktie: AktieSeed) => [aktie.ticker, aktie.pris]))
    );
    setStress(0);
    setKraschSker(false);
    setKraschChans(START_KRASCH_CHANS);
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
