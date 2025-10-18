import React, { createContext, useState } from "react";

type SaldoContextValue = {
  saldo: number;
  startSaldo: number;
  uppdateraSaldo: (nyttSaldo: number) => void;
  uppdateraStartSaldo: (nyttStartSaldo: number) => void;
  aterstallSaldo: () => void;
};

const SaldoContext = createContext<SaldoContextValue | undefined>(undefined);

export function SaldoProvider({ children }: { children: React.ReactNode }) {
  const [startSaldo, setStartSaldo] = useState(10_000);
  const [saldo, setSaldo] = useState(startSaldo);

  const uppdateraSaldo = (nyttSaldo: number) => setSaldo(nyttSaldo);

  const uppdateraStartSaldo = (nyttStartSaldo: number) => {
    setStartSaldo(nyttStartSaldo);
    setSaldo(nyttStartSaldo);
  };

    const aterstallSaldo = () => {
    setSaldo(startSaldo);
  };

  return (
    <SaldoContext.Provider value={{ saldo, startSaldo, uppdateraSaldo, uppdateraStartSaldo, aterstallSaldo }}>
      {children}
    </SaldoContext.Provider>
  );
}

export { SaldoContext };  