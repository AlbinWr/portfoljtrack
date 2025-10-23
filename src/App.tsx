import { Routes, Route } from "react-router";
import { Navbar } from "./components/Navbar";
import { PilUppBakgrund } from "./components/PilUppBakgrund";
import { PilNerBakgrund } from "./components/PilNerBakgrund";
import { Home } from "./routes/Home";
import { Aktier } from "./routes/Aktier";
import { Installningar } from "./routes/Installningar";
import { SaldoProvider } from "./context/SaldoContext";
import { Kontakta } from "./routes/Kontakta";
import { PortfoljProvider } from "./context/portfoljContext";
import { AktieMarknadProvider } from "./context/aktieMarknadContext";
import { Toaster } from "react-hot-toast";
import { Footer } from "./components/Footer";
  

function App() {
  return (
    <SaldoProvider>
      <PortfoljProvider>
        <AktieMarknadProvider>
          <div className="relative flex flex-col min-h-screen 
  bg-white dark:bg-gradient-to-bl dark:from-slate-900 dark:via-sky-950 dark:to-slate-900">
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
              <PilUppBakgrund />
              <PilNerBakgrund />
              <Toaster position="bottom-right" />
              <Footer />
            </div>
        </AktieMarknadProvider>
      </PortfoljProvider>
    </SaldoProvider>
  );
}

export default App;
