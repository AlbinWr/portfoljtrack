export type AktieSeed = {
  namn: string;
  ticker: string;
  pris: number;       // startpris i SEK
  volatilitet: number;  // 1 = stabil, 10 = mycket volatil
  sektor: string;
};

export const seedAktier: AktieSeed[] = [
  {
    namn: "Volvo B",
    ticker: "VOLV-B",
    pris: 220,
    volatilitet: 3,
    sektor: "Industri",
  },
  {
    namn: "Ericsson B",
    ticker: "ERIC-B",
    pris: 58,
    volatilitet: 4,
    sektor: "Tech",
  },
  {
    namn: "Evolution",
    ticker: "EVO",
    pris: 1200,
    volatilitet: 7,
    sektor: "Tech",
  },
  {
    namn: "GreenVolt",
    ticker: "GRNV",
    pris: 95,
    volatilitet: 8,
    sektor: "Energi",
  },
  {
    namn: "Nordic Steel",
    ticker: "NSTE",
    pris: 310,
    volatilitet: 4,
    sektor: "Råvaror",
  },
  {
    namn: "Bitcoin",
    ticker: "BTC",
    pris: 1_200_000,
    volatilitet: 10,
    sektor: "Kryptovaluta",
  },
];