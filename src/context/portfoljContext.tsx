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
      alert("Du har inte tillräckligt med saldo för detta köp!");
      return;
    }
    
    setPortfolj((currentPortfolj) => {
      const item = currentPortfolj.find((item) => item.ticker === ticker);
      if (item) {
        return currentPortfolj.map((item) =>
          item.ticker === ticker ? { ...item, antal: item.antal + antal } : item
        );
      } else {
        return [...currentPortfolj, { ticker, antal, inkopsPris: pris }];
      }
    });

    uppdateraSaldo(saldo - pris * antal);
  }

function salj(ticker: string, pris: number, antal: number) {
  const item = portfolj.find((i) => i.ticker === ticker);
  if (!item || item.antal < antal) {
    alert("Du kan inte sälja fler aktier än du äger!");
    return;
  }

  setPortfolj(
    (curr) =>
      curr
        .map((i) =>
          i.ticker === ticker ? { ...i, antal: i.antal - antal } : i
        )
        .filter((i) => i.antal > 0)
  );

  uppdateraSaldo(saldo + pris * antal);
}

  function removeItem(ticker: string) {
    setPortfolj(currentPortfolj => {
      return currentPortfolj.filter(item => item.ticker !== ticker)
    })
  }

  return (
    <PortfoljContext.Provider value={{ getAntal, kop, salj, removeItem }}>
      {children}
    </PortfoljContext.Provider>
  )
}