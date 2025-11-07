import React, { useState } from "react";
import "./CaloriesCalc.css";

const NutriMeal = () => {
  const [mealItems, setMealItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState("");

  const availableFoods = [
    { id: 1, name: "Poulet grillé", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { id: 2, name: "Riz cuit", calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
    { id: 3, name: "Avocat", calories: 160, protein: 2, carbs: 8, fat: 15 },
    { id: 4, name: "Pomme", calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
    { id: 5, name: "Œuf", calories: 78, protein: 6, carbs: 0.6, fat: 5 },
  ];

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  const addFoodToMeal = (food) => {
    const quantity = parseFloat(quantities[food.id]);
    if (!quantity || quantity <= 0) {
      setMessage("⚠️ Veuillez entrer une quantité valide !");
      return;
    }

    const updatedItems = [...mealItems];
    const existingIndex = updatedItems.findIndex((item) => item.id === food.id);

    const newItem = {
      ...food,
      quantity,
      totalCalories: (quantity / 100) * food.calories,
      totalProtein: (quantity / 100) * food.protein,
      totalCarbs: (quantity / 100) * food.carbs,
      totalFat: (quantity / 100) * food.fat,
    };

    if (existingIndex !== -1) {
      const existing = updatedItems[existingIndex];
      updatedItems[existingIndex] = {
        ...existing,
        quantity: existing.quantity + quantity,
        totalCalories: existing.totalCalories + newItem.totalCalories,
        totalProtein: existing.totalProtein + newItem.totalProtein,
        totalCarbs: existing.totalCarbs + newItem.totalCarbs,
        totalFat: existing.totalFat + newItem.totalFat,
      };
    } else {
      updatedItems.push(newItem);
    }

    setMealItems(updatedItems);
    setQuantities((prev) => ({ ...prev, [food.id]: "" }));
    setMessage(`✅ ${food.name} ajouté au repas !`);
    setTimeout(() => setMessage(""), 2500);
  };

  const removeFoodFromMeal = (id) => {
    setMealItems(mealItems.filter((item) => item.id !== id));
  };

  const totals = mealItems.reduce(
    (acc, item) => ({
      calories: acc.calories + item.totalCalories,
      protein: acc.protein + item.totalProtein,
      carbs: acc.carbs + item.totalCarbs,
      fat: acc.fat + item.totalFat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const getMealBalance = () => {
    const totalMacros = totals.protein + totals.carbs + totals.fat;
    if (totalMacros === 0) return "Repas équilibré";

    const p = (totals.protein / totalMacros) * 100;
    const c = (totals.carbs / totalMacros) * 100;
    const f = (totals.fat / totalMacros) * 100;

    return p >= 25 && p <= 35 && c >= 40 && c <= 60 && f >= 15 && f <= 30
      ? "Repas équilibré"
      : "Repas déséquilibré";
  };

  const mealBalance = getMealBalance();

  return (
    <div className="nutrimeal-container">
      <header className="app-header">
        <h1>🍽️ NutriMeal - Calculateur Énergétique</h1>
      </header>

      <main className="content-wrapper">
        {/* 🥦 Available Foods Section */}
        <section className="available-foods">
          <h2>🥦 Aliments disponibles</h2>
          {availableFoods.map((food) => (
            <div key={food.id} className="food-card">
              <div className="food-info">
                <h3>{food.name}</h3>
                <p>
                  Pour 100g : <strong>{food.calories}</strong> kcal |
                  <span className="macro"> {food.protein}g P</span> |
                  <span className="macro"> {food.carbs}g G</span> |
                  <span className="macro"> {food.fat}g L</span>
                </p>
              </div>

              <div className="food-actions">
                <input
                  type="number"
                  value={quantities[food.id] || ""}
                  onChange={(e) => handleQuantityChange(food.id, e.target.value)}
                  placeholder="Quantité (g)"
                  min="0"
                />
                <button onClick={() => addFoodToMeal(food)}>Ajouter</button>
              </div>
            </div>
          ))}
        </section>

        {/* 🍛 My Meal Section */}
        <section className="my-meal">
          <h2>🍛 Mon repas</h2>
          {mealItems.length === 0 ? (
            <p className="empty">Aucun aliment ajouté.</p>
          ) : (
            <ul className="meal-list">
              {mealItems.map((item) => (
                <li key={item.id} className="meal-item">
                  <div>
                    <strong>{item.name}</strong> ({item.quantity}g)
                    <p>
                      {item.totalCalories.toFixed(1)} kcal |{" "}
                      {item.totalProtein.toFixed(1)}g P |{" "}
                      {item.totalCarbs.toFixed(1)}g G |{" "}
                      {item.totalFat.toFixed(1)}g L
                    </p>
                  </div>
                  <button onClick={() => removeFoodFromMeal(item.id)}>❌</button>
                </li>
              ))}
            </ul>
          )}

          {/* Totals */}
          <div className="totals">
            <h3>Valeur Totale du Repas</h3>
            <p>Calories : {totals.calories.toFixed(1)} kcal</p>
            <p>Protéines : {totals.protein.toFixed(1)} g</p>
            <p>Glucides : {totals.carbs.toFixed(1)} g</p>
            <p>Lipides : {totals.fat.toFixed(1)} g</p>
          </div>

          {/* Balance Status */}
          <div
            className={`meal-balance ${
              mealBalance === "Repas équilibré" ? "balanced" : "unbalanced"
            }`}
          >
            {mealBalance}
          </div>

          {/* Toast Message */}
          {message && <div className="toast">{message}</div>}
        </section>
      </main>
    </div>
  );
};

export default NutriMeal;
