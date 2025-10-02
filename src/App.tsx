import { Routes, Route } from "react-router";
import { Navbar } from "./components/Navbar";
import { Home } from "./routes/Home";
import { Aktier } from "./routes/Aktier";
import { Installningar } from "./routes/Installningar";
import { SaldoProvider } from "./context/SaldoContext";
import { Kontakta } from "./routes/Kontakta";
import { PortfoljProvider } from "./context/portfoljContext";

function App() {
  return (
    <PortfoljProvider>
      <SaldoProvider>
        <Navbar />
        <div className="min-h-screen flex flex-col bg-slate-900">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aktier" element={<Aktier />} />
            <Route path="/installningar" element={<Installningar />} />
            <Route path="/kontakt" element={<Kontakta />} />
          </Routes>
        </div>
      </SaldoProvider>
    </PortfoljProvider>
  );
}

export default App;
