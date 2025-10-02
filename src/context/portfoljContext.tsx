import { createContext, useContext, useState } from "react"

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
  kop: (ticker: string) => void
  salj: (ticker: string) => void
  removeItem: (ticker: string) => void
}

const PortfoljContext = createContext({} as PortfoljContext)

// eslint-disable-next-line react-refresh/only-export-components
export const usePortfolj = () => {
  return useContext(PortfoljContext);
}


export function PortfoljProvider({ children }: PortfoljProviderProps) {
  const [portfolj, setPortfolj] = useState<PortfoljItem[]>([])

  function getAntal(ticker: string) {
    return portfolj.find(item => item.ticker === ticker)?.antal || 0
  }

  function kop(ticker: string) {
    setPortfolj(currentPortfolj => {
      const item = currentPortfolj.find(item => item.ticker === ticker)
      if (item) {
        return currentPortfolj.map(item =>
          item.ticker === ticker ? { ...item, antal: item.antal + 1 } : item
        )
      }
      return [...currentPortfolj, { ticker, antal: 1, inkopsPris: 0 }]
    })
  }

  function salj(ticker: string) {
    setPortfolj(currentPortfolj => {
      const item = currentPortfolj.find(item => item.ticker === ticker)
      if (item) {
        return currentPortfolj.map(item =>
          item.ticker === ticker ? { ...item, antal: item.antal - 1 } : item
        )
      }
      return currentPortfolj
    })
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