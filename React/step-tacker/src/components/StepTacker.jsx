import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function StepTracker() {
  const [steps, setSteps] = useState("");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const calculateStats = () => {
    if (!steps || steps <= 0) {
      setError("⚠️ Veuillez entrer un nombre de pas valide !");
      setStats(null);
      return;
    }

    setError("");

    const distance = (steps * 0.78) / 1000; // en km
    const calories = steps * 0.04; // en kcal
    const duration = steps / 100; // en minutes

    let level = "";
    if (steps < 5000) level = "Sédentaire";
    else if (steps < 10000) level = "Actif";
    else level = "Très actif";

    setStats({ distance, calories, duration, level });
  };

  const getProgressColor = () => {
    if (steps < 5000) return "bg-danger"; // rouge
    if (steps < 10000) return "bg-warning"; // jaune
    return "bg-success"; // vert
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📊 StepTracker - Suivi des pas</h2>

      {/* Formulaire */}
      <div className="card p-4 shadow-sm">
        <label>Nombre de pas effectués :</label>
        <input
          type="number"
          className="form-control"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          placeholder="Exemple : 7500"
        />
        <button className="btn btn-primary mt-3" onClick={calculateStats}>
          Calculer
        </button>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>

      {stats && (
        <div className="mt-4">
          <div className="card p-3 shadow-sm">
            <h5>Résultats :</h5>
            <p><strong>Distance :</strong> {stats.distance.toFixed(2)} km</p>
            <p><strong>Calories brûlées :</strong> {stats.calories.toFixed(0)} kcal</p>
            <p><strong>Durée estimée :</strong> {stats.duration.toFixed(1)} minutes</p>
            <p><strong>Niveau d’activité :</strong> {stats.level}</p>

            <div className="progress mt-3">
              <div
                className={`progress-bar ${getProgressColor()}`}
                role="progressbar"
                style={{ width: `${(steps / 10000) * 100}%` }}
              >
                {Math.min((steps / 10000) * 100, 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
