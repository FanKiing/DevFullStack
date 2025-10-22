import React, { useState } from 'react';
import './CaloriesCalc.css';

const NutriMeal = () => {
  const [mealItems, setMealItems] = useState([]);
  
  const availableFoods = [
    {
      id: 1,
      name: "Poulet grillé",
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6
    },
    {
      id: 2,
      name: "Riz cuit",
      calories: 130,
      protein: 2.7,
      carbs: 28,
      fat: 0.3
    },
    {
      id: 3,
      name: "Avocat",
      calories: 160,
      protein: 2,
      carbs: 8,
      fat: 15
    },
    {
      id: 4,
      name: "Pomme",
      calories: 52,
      protein: 0.3,
      carbs: 14,
      fat: 0.2
    },
    {
      id: 5,
      name: "Œuf",
      calories: 78,
      protein: 6,
      carbs: 0.6,
      fat: 5
    }
  ];

  const [quantities, setQuantities] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: ''
  });

  const handleQuantityChange = (foodId, value) => {
    setQuantities(prev => ({
      ...prev,
      [foodId]: value
    }));
  };

  const addFoodToMeal = (food) => {
    const quantity = parseFloat(quantities[food.id]);
    if (quantity && quantity > 0) {
      const existingItemIndex = mealItems.findIndex(item => item.id === food.id);
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...mealItems];
        updatedItems[existingItemIndex].quantity += quantity;
        updatedItems[existingItemIndex].totalCalories = (updatedItems[existingItemIndex].quantity / 100) * food.calories;
        updatedItems[existingItemIndex].totalProtein = (updatedItems[existingItemIndex].quantity / 100) * food.protein;
        updatedItems[existingItemIndex].totalCarbs = (updatedItems[existingItemIndex].quantity / 100) * food.carbs;
        updatedItems[existingItemIndex].totalFat = (updatedItems[existingItemIndex].quantity / 100) * food.fat;
        setMealItems(updatedItems);
      } else {
        const newItem = {
          ...food,
          quantity: quantity,
          totalCalories: (quantity / 100) * food.calories,
          totalProtein: (quantity / 100) * food.protein,
          totalCarbs: (quantity / 100) * food.carbs,
          totalFat: (quantity / 100) * food.fat
        };
        setMealItems([...mealItems, newItem]);
      }
      
      setQuantities(prev => ({
        ...prev,
        [food.id]: ''
      }));
    }
  };

  const removeFoodFromMeal = (foodId) => {
    setMealItems(mealItems.filter(item => item.id !== foodId));
  };

  const calculateTotals = () => {
    return mealItems.reduce((totals, item) => ({
      calories: totals.calories + item.totalCalories,
      protein: totals.protein + item.totalProtein,
      carbs: totals.carbs + item.totalCarbs,
      fat: totals.fat + item.totalFat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const getMealBalance = () => {
    const totals = calculateTotals();
    const totalMacros = totals.protein + totals.carbs + totals.fat;
    
    if (totalMacros === 0) return "Repas équilibré";
    
    const proteinPercentage = (totals.protein / totalMacros) * 100;
    const carbsPercentage = (totals.carbs / totalMacros) * 100;
    const fatPercentage = (totals.fat / totalMacros) * 100;
    
    if (proteinPercentage >= 25 && proteinPercentage <= 35 && 
        carbsPercentage >= 40 && carbsPercentage <= 60 && 
        fatPercentage >= 15 && fatPercentage <= 30) {
      return "Repas équilibré";
    } else {
      return "Repas déséquilibré";
    }
  };

  const totals = calculateTotals();
  const mealBalance = getMealBalance();

  return (
    <div className="nutrimeal-container">
      <header className="app-header">
        <h1>NutriMeal - Calculateur Énergétique</h1>
      </header>

      <div className="content-wrapper">
        <section className="available-foods">
          <h2>Aliments disponibles</h2>
          
          {availableFoods.map(food => (
            <div key={food.id} className="food-item">
              <h3>{food.name}</h3>
              <p>Pour 100g : {food.calories} kcal | {food.protein}g prot | {food.carbs}g gluc | {food.fat}g lip</p>
              
              <div className="quantity-controls">
                <input
                  type="number"
                  placeholder="Quantité consommée (g)"
                  value={quantities[food.id]}
                  onChange={(e) => handleQuantityChange(food.id, e.target.value)}
                  min="0"
                />
                <button 
                  className="add-button"
                  onClick={() => addFoodToMeal(food)}
                >
                  Ajouter
                </button>
              </div>
              
              <hr />
            </div>
          ))}
        </section>

        <section className="my-meal">
          <h2>Mon repas</h2>
          
          {mealItems.length === 0 ? (
            <p>Aucun aliment ajouté</p>
          ) : (
            <div className="meal-items">
              {mealItems.map(item => (
                <div key={item.id} className="meal-item">
                  <div className="meal-item-header">
                    <strong>{item.name} — {item.quantity}g</strong>
                    <button 
                      className="remove-button"
                      onClick={() => removeFoodFromMeal(item.id)}
                    >
                      ×
                    </button>
                  </div>
                  <p>{item.totalCalories.toFixed(1)} kcal | {item.totalProtein.toFixed(1)}g P | {item.totalCarbs.toFixed(1)}g G | {item.totalFat.toFixed(1)}g L</p>
                </div>
              ))}
            </div>
          )}

          <div className="total-values">
            <h3>Valeur totale du repas</h3>
            <p>Calories totales : {totals.calories.toFixed(1)} kcal</p>
            <p>Protéines : {totals.protein.toFixed(1)} g</p>
            <p>Glucides : {totals.carbs.toFixed(1)} g</p>
            <p>Lipides : {totals.fat.toFixed(1)} g</p>
          </div>

          <div className={`meal-balance ${mealBalance === "Repas équilibré" ? "balanced" : "unbalanced"}`}>
            {mealBalance}
          </div>
        </section>
      </div>
    </div>
  );
};

export default NutriMeal;