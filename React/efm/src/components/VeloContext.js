import React, { createContext, useState, useContext } from 'react';

const InitialState = {
  velo: {
    id: 14,
    Matricule: "1 A 4321",
    Date_derniere_maintenance: "01/06/2025",
    Date_prochaine_maintenance: "01/08/2025",
    Batterie_Utilisee: {
      Id: 135,
      Capacite: 73,
      Numero_serie: "BAT-202",
      sante_batterie: 95,
      nombre_cycles: 2127,
      statut: "En Utilisation",
    },
  },
  Techniciens: [
    { id: 1, Nom: "Dupont Jean" },
    { id: 2, Nom: "Martin Sophie" },
    { id: 3, Nom: "Petit Lucas" },
  ],
  Batteries: [
    { Id: 135, Numero_serie: "BAT-202", Capacite: 73, sante_batterie: 95, nombre_cycles: 2127, statut: "En Utilisation" },
    { Id: 232, Numero_serie: "BAT-11", Capacite: 60, sante_batterie: 99, nombre_cycles: 6, statut: "En Stock" },
    { Id: 16, Numero_serie: "BAT-19", Capacite: 80, sante_batterie: 85, nombre_cycles: 24, statut: "En Stock" },
    { Id: 400, Numero_serie: "BAT-400", Capacite: 50, sante_batterie: 70, nombre_cycles: 500, statut: "Retiré" },
  ],
  StatutBatterie: ["En Stock", "En Utilisation", "Retiré"],
};

export const VeloContext = createContext();

export const VeloProvider = ({ children }) => {
  const [store, setStore] = useState(InitialState);

  const ajouterChangementBatterie = (changement) => {
    const nouvelleBatterie = store.Batteries.find(b => b.Id === parseInt(changement.id_nouvelle_batterie));
    
    if (nouvelleBatterie) {
      setStore(prevStore => {
        const newVelo = {
          ...prevStore.velo,
          Batterie_Utilisee: {
            Id: nouvelleBatterie.Id,
            Capacite: nouvelleBatterie.Capacite,
            Numero_serie: nouvelleBatterie.Numero_serie,
            sante_batterie: nouvelleBatterie.sante_batterie,
            nombre_cycles: nouvelleBatterie.nombre_cycles,
          }
        };

        const updatedBatteries = prevStore.Batteries.map(battery => {
            if (battery.Id === parseInt(changement.id_ancienne_batterie)) {
                return { ...battery, statut: "Retiré" };
            }
            if (battery.Id === parseInt(changement.id_nouvelle_batterie)) {
                 return { ...battery, statut: "En Utilisation" };
            }
            return battery;
        });

        console.log("Nouveau Changement de Batterie:", changement);


        return {
          ...prevStore,
          velo: newVelo,
          Batteries: updatedBatteries,
        };
      });
      return true;
    }
    return false;
  };


  return (
    <VeloContext.Provider value={{ store, ajouterChangementBatterie }}>
      {children}
    </VeloContext.Provider>
  );
};

export const useVeloStore = () => useContext(VeloContext);