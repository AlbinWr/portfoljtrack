import { useContext } from "react";
import { SaldoContext } from "../context/SaldoContext";

export function useSaldo() {
  const ctx = useContext(SaldoContext);
  if (!ctx) throw new Error("useSaldo måste användas inuti <SaldoProvider>");
  return ctx;
}