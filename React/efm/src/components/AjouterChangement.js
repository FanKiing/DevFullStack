import React, { useState } from 'react';
import { useVeloStore } from './VeloContext';

const AjouterChangement = () => {
  const { store, ajouterChangementBatterie } = useVeloStore();

  const currentVelo = store.velo;
  const ancienneBatterie = currentVelo.Batterie_Utilisee;
  const techniciens = store.Techniciens;
  const batteriesDisponibles = store.Batteries.filter(b => b.statut === 'En Stock');

  const [formData, setFormData] = useState({
    id_velo: currentVelo.id,
    id_ancienne_batterie: ancienneBatterie.Id,
    id_nouvelle_batterie: '',
    date_changement: new Date().toISOString().split('T')[0], 
    id_technicien: '',
    raison: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    [cite_start]
    const isFormValid = Object.values(formData).every(val => val !== '' && val !== null);
    
    if (!isFormValid) {
      alert('Tous les champs sont obligatoires. Veuillez remplir le formulaire.');
      return;
    }

    const success = ajouterChangementBatterie(formData);

    if (success) {
      alert('Changement de batterie ajouté avec succès et état mis à jour !');
      setFormData(prev => ({ 
        ...prev, 
        id_nouvelle_batterie: '', 
        id_technicien: '', 
        raison: '' 
      }));
    } else {
      alert("Erreur lors du changement. La nouvelle batterie sélectionnée n'a pas été trouvée.");
    }
  };


  return (
    <div style={styles.container}>
      [cite_start]<h2>Changement de Batterie [cite: 30]</h2>
      <form onSubmit={handleSubmit}>
        [cite_start]<p><strong>Vélo:</strong> {currentVelo.Matricule} [cite: 31]</p>
        [cite_start]<p><strong>Ancienne Batterie:</strong> {ancienneBatterie.Numero_serie} [cite: 38]</p>

        [cite_start]<label style={styles.label}>Nouvelle Batterie: [cite: 34]</label>
        <select
          name="id_nouvelle_batterie"
          value={formData.id_nouvelle_batterie}
          onChange={handleChange}
          required
          style={styles.input}
        >
          [cite_start]<option value="">-- Choisir une batterie -- [cite: 39]</option>
          {batteriesDisponibles.map(bat => (
            <option key={bat.Id} value={bat.Id}>
              {bat.Numero_serie} (Capacité: {bat.Capacite}%)
            </option>
          ))}
        </select>

        [cite_start]<label style={styles.label}>Date de Changement: [cite: 35]</label>
        <input
          type="date"
          name="date_changement"
          value={formData.date_changement}
          onChange={handleChange}
          required
          style={styles.input}
        />

        [cite_start]<label style={styles.label}>Technicien: [cite: 37]</label>
        <select
          name="id_technicien"
          value={formData.id_technicien}
          onChange={handleChange}
          required
          style={styles.input}
        >
          [cite_start]<option value="">-- Choisir un technicien -- [cite: 41]</option>
          {techniciens.map(tech => (
            <option key={tech.id} value={tech.id}>
              {tech.Nom}
            </option>
          ))}
        </select>

        [cite_start]<label style={styles.label}>Raison: [cite: 42]</label>
        <textarea
          name="raison"
          value={formData.raison}
          onChange={handleChange}
          required
          rows="3"
          style={{ ...styles.input, resize: 'vertical' }}
        ></textarea>
        
        [cite_start]<button type="submit" style={styles.button}>Ajouter [cite: 43]</button>
      </form>
    </div>
  );
};

const styles = {
    container: { border: '1px solid #ccc', padding: '15px', maxWidth: '400px', margin: '20px auto' },
    label: { display: 'block', marginTop: '10px', fontWeight: 'bold' },
    input: { width: '100%', padding: '8px', marginTop: '5px', marginBottom: '10px', boxSizing: 'border-box' },
    button: { padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' },
};

export default AjouterChangement;