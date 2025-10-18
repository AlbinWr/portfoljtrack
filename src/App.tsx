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
          <Navbar />
          <div className="min-h-screen flex flex-col bg-slate-900">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/aktier" element={<Aktier />} />
              <Route path="/installningar" element={<Installningar />} />
              <Route path="/kontakt" element={<Kontakta />} />
            </Routes>
            <WaveBakgrund />
          </div>
          <Toaster position="bottom-right" />
        </AktieMarknadProvider>
      </PortfoljProvider>
    </SaldoProvider>
  );
}

export default App;
