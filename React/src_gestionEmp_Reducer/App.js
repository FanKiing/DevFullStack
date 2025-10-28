import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EmployeProvider } from "./context/EmployeContext";
import Navbar from "./components/Navbar";
import ListEmp from "./components/ListEmp";
import FormEmp from "./components/FormEmp";

function App() {
  return (
    <EmployeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ListEmp />} />
          <Route path="/form/:id" element={<FormEmp />} />
        </Routes>
      </Router>
    </EmployeProvider>
  );
}

export default App;
