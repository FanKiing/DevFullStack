import React, { createContext, useState, useEffect } from "react";

export const SalarieContext = createContext();

export const SalarieProvider = ({ children }) => {
  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/salaries")
      .then((res) => res.json())
      .then((data) => setSalaries(data))
      .catch((err) => console.error("Erreur:", err));
  }, []);

  return (
    <SalarieContext.Provider value={{ salaries, setSalaries }}>
      {children}
    </SalarieContext.Provider>
  );
};