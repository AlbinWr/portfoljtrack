## Basdata & Simulation
- [ ] Skapa **seed-lista** (15–20 riktiga aktier + 5–10 påhittade).  
- [ ] Implementera **tick loop** som uppdaterar priser slumpmässigt (5–10s default).  
- [ ] Lägg till **volatilitet & burst** i modellen för variation.  
- [ ] Visa priser + upp/ner-indikator i UI.

## Market (köp/sälj)
- [ ] Route `/market` med lista/grid över aktier.  
- [ ] **Köp-knapp** → öppnar ordermodal (antal, kostnad, avgift, total).  
- [ ] Validering: tillräckligt saldo? qty > 0?  
- [ ] Uppdatera **portfölj + cash + historik** vid köp.  
- [ ] (Optional) Implementera **Market Hours** (disable order utanför 09–17:30).

## Portfölj
- [ ] Route `/portfolio`.  
- [ ] Visa holdings: symbol, qty, GAV, pris nu, orealiserad P/L (kr + %).  
- [ ] Summering: cash, portföljvärde, totalt värde, total P/L.  
- [ ] **Sälj-knapp** (market) → minskar qty, ökar cash, uppdaterar historik.

## Historik
- [ ] Route `/history`.  
- [ ] Lista alla transaktioner: datum/tid, typ, symbol, qty, pris, avgift, total.  
- [ ] Visa summering av realiserad P/L.

## Inställningar
- [ ] Route `/settings`.  
- [ ] Market speed: Slow / Normal / Fast.  
- [ ] Volatilitet: Låg / Medel / Hög.  
- [ ] Startkapital (endast vid reset).  
- [ ] Avgift/slippage toggle.  
- [ ] Market mode: Free / Market Hours.  
- [ ] “Reset simulator” (rensa LocalStorage).  
- [ ] (Optional) Export/Import av state (JSON).

## Persistens
- [ ] LocalStorage för portfölj, historik, inställningar, watchlist.  
- [ ] Ladda in state vid app-start.

---

## Post-MVP (kan byggas senare)
- [ ] Limit orders.  
- [ ] Shorting.  
- [ ] Nyhetsevents som påverkar pris.  
- [ ] Achievements (”Första köpet”, ”+10% trade”).  
- [ ] Leaderboard (lokalt eller online).  
- [ ] Grafer: portföljvärde över tid.  
- [ ] Dagliga seeds för tävling (“alla får samma marknad idag”).