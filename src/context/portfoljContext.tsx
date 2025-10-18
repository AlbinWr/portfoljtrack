import { createContext, useContext, useState } from "react"
import { useSaldo } from "../hooks/useSaldo"

type PortfoljProviderProps = {
  children: React.ReactNode
}

type PortfoljItem = {
  ticker: string
  antal: number
  inkopsPris: number
}

type PortfoljContext = {
  portfolj: PortfoljItem[]
  getAntal: (ticker: string) => number
  kop: (ticker: string, pris: number, antal: number) => void
  salj: (ticker: string, pris: number, antal: number) => void
  removeItem: (ticker: string) => void
}

const PortfoljContext = createContext({} as PortfoljContext)

// eslint-disable-next-line react-refresh/only-export-components
export const usePortfolj = () => {
  return useContext(PortfoljContext);
}


export function PortfoljProvider({ children }: PortfoljProviderProps) {
  const [portfolj, setPortfolj] = useState<PortfoljItem[]>([])
  const { saldo, uppdateraSaldo } = useSaldo();

  function getAntal(ticker: string) {
    return portfolj.find(item => item.ticker === ticker)?.antal || 0
  }

  function kop(ticker: string, pris: number, antal: number) {
    const kostnad = pris * antal;
    if (kostnad > saldo) {
      alert("Du har inte tillräckligt med cash!");
      return;
    }
    
    setPortfolj((currentPortfolj) => {
      const aktieFinns = currentPortfolj.find((item) => item.ticker === ticker);
      if (aktieFinns) {
        const uppdateratAntal = aktieFinns.antal + antal;
        const uppdateratSnitt = ((aktieFinns.antal * aktieFinns.inkopsPris) + (antal * pris)) / uppdateratAntal;

        return currentPortfolj.map((aktie) =>
          aktie.ticker === ticker ? { ...aktie, antal: uppdateratAntal, inkopsPris: uppdateratSnitt } : aktie
        );
      } else {
        return [...currentPortfolj, { ticker, antal, inkopsPris: pris }];
      }
    });

    uppdateraSaldo(saldo - pris * antal);
  }

function salj(ticker: string, pris: number, antal: number) {
  const aktieFinns = portfolj.find((aktie) => aktie.ticker === ticker);
  if (!aktieFinns || aktieFinns.antal < antal) {
    alert("Du kan inte sälja fler aktier än du äger!");
    return;
  }

  setPortfolj(
    (currentPortfolj) =>
      currentPortfolj
        .map((aktie) =>
          aktie.ticker === ticker ? { ...aktie, antal: aktie.antal - antal } : aktie
        )
        .filter((aktie) => aktie.antal > 0)
  );

  uppdateraSaldo(saldo + pris * antal);
}

  function removeItem(ticker: string) {
    setPortfolj(currentPortfolj => {
      return currentPortfolj.filter(aktie => aktie.ticker !== ticker)
    })
  }

  return (
    <PortfoljContext.Provider value={{ portfolj, getAntal, kop, salj, removeItem }}>
      {children}
    </PortfoljContext.Provider>
  )
}