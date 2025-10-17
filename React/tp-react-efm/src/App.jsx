import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { SalarieProvider } from "./SalarieContext";
import Composant1 from "./Composant1";
import Composant2 from "./Composant2";
import Formulaire from "./Formulaire";
import Experts1 from "./Experts1";
import Experts2 from "./Experts2";

function App() {
  return (
    <SalarieProvider>
      <BrowserRouter>
        <nav style={{ padding: 10 }}>
          <Link to="/">Voiture</Link> |{" "}
          <Link to="/salaries">Salariés</Link> |{" "}
          <Link to="/formulaire">Formulaire</Link> |{" "}
          <Link to="/experts1">Experts1</Link> |{" "}
          <Link to="/experts2">Experts2</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Composant1 />} />
          <Route path="/salaries" element={<Composant2 />} />
          <Route path="/formulaire" element={<Formulaire />} />
          <Route path="/experts1" element={<Experts1 />} />
          <Route path="/experts2" element={<Experts2 />} />
        </Routes>
      </BrowserRouter>
    </SalarieProvider>
  );
}

export default App;