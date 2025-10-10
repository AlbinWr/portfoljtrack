import { seedAktier } from '../Data/seedAktier';

export function getAktiePris(ticker: string): number {
  const aktie = seedAktier.find(s => s.ticker === ticker);
  return aktie ? aktie.pris : 0;
}