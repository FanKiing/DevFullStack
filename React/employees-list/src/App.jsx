import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EmployeProvider } from "./components/EmployeContext";
import Navbar from "./components/Navbar";
import ListEmp from "./components/ListEmp";
import FormEmp from "./components/FormEmp";

function App() {
  return (
    <EmployeProvider>
      <Router>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<ListEmp />} />
            <Route path="/form" element={<FormEmp />} />
          </Routes>
        </div>
      </Router>
    </EmployeProvider>
  );
}

export default App;
