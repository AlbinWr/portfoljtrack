import { Routes, Route } from "react-router";
import { Navbar } from "./components/Navbar";
import { WaveBakgrund } from "./components/waveBakgrund";
import { Home } from "./routes/Home";
import { Aktier } from "./routes/Aktier";
import { Installningar } from "./routes/Installningar";
import { SaldoProvider } from "./context/SaldoContext";
import { Kontakta } from "./routes/Kontakta";
import { PortfoljProvider } from "./context/portfoljContext";
import { AktieMarknadProvider } from "./context/aktieMarknadContext";
import { Toaster } from "react-hot-toast";
  

function App() {
  return (
    <SaldoProvider>
      <PortfoljProvider>
        <AktieMarknadProvider>
          <div className="relative min-h-screen flex flex-col bg-gradient-to-bl from-slate-900 via-sky-950 to-slate-900">
            <Navbar />

              {/* Huvudinnehåll */}
              <main className="relative z-10 flex-1 pt-24 pb-10">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/aktier" element={<Aktier />} />
                  <Route path="/installningar" element={<Installningar />} />
                  <Route path="/kontakt" element={<Kontakta />} />
                </Routes>
              </main>

              {/* Bakgrundsvåg och Toaster */}
              <WaveBakgrund />
              <Toaster position="bottom-right" />
            </div>
        </AktieMarknadProvider>
      </PortfoljProvider>
    </SaldoProvider>
  );
}

export default App;
