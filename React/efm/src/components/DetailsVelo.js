import React from 'react';
import { useVeloStore } from './VeloContext';

const DetailsVelo = () => {
  const { store } = useVeloStore();
  const velo = store.velo;
  const batterie = velo.Batterie_Utilisee;

  if (!velo) {
    return <div>Chargement des détails du vélo...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Velo Details</h2>
      [cite_start]<p><strong>Matricule:</strong> {velo.Matricule} [cite: 9]</p>
      [cite_start]<p><strong>Capacité Batterie Actuelle:</strong> {batterie.Capacite}% [cite: 10]</p>
      [cite_start]<p><strong>Santé Batterie Actuelle:</strong> {batterie.sante_batterie}% [cite: 11]</p>
      [cite_start]<p><strong>Date Dernière Maintenance:</strong> {velo.Date_derniere_maintenance} [cite: 12]</p>
      [cite_start]<p><strong>Date Prochaine Maintenance:</strong> {velo.Date_prochaine_maintenance} [cite: 13]</p>
    </div>
  );
};

const styles = {
  container: { border: '1px solid #ccc', padding: '15px', maxWidth: '400px', margin: '20px auto' },
  title: { borderBottom: '2px solid #333', paddingBottom: '10px' }
};

export default DetailsVelo;