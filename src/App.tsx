import { Routes, Route } from "react-router";
import { Navbar } from "./components/Navbar";
import { Home } from "./routes/Home";
import { Aktier } from "./routes/Aktier";
import { Installningar } from "./routes/Installningar";
import { SaldoProvider } from "./context/SaldoContext";

function App() {
  return (
    <SaldoProvider>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-slate-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aktier" element={<Aktier />} />
          <Route path="/installningar" element={<Installningar />} />
        </Routes>
      </div>
    </SaldoProvider>
  );
}

export default App;
