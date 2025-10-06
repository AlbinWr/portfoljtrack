import React, { createContext, useState } from "react";

type SaldoContextValue = {
  saldo: number;
  uppdateraSaldo: (nyttSaldo: number) => void;
};

const SaldoContext = createContext<SaldoContextValue | undefined>(undefined);

export function SaldoProvider({ children }: { children: React.ReactNode }) {
  const [saldo, setSaldo] = useState(10_000);

  const uppdateraSaldo = (nyttSaldo: number) => setSaldo(nyttSaldo);

  return (
    <SaldoContext.Provider value={{ saldo, uppdateraSaldo }}>
      {children}
    </SaldoContext.Provider>
  );
}

export { SaldoContext };