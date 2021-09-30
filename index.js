

function createDayPanel(dailyMeals) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <section class="day-panel">
      <h3>${dailyMeals.dayName}</h3>
      <div class="meal-list">    
      ${dailyMeals.meals.map((meal, index) => mealCardTemplate(meal, index)).join("")}  
      </div>
    <section>
  `;
  return wrapper.firstElementChild;
}


function mealCardTemplate(meal, uid) {
  return `
    <div class="meal-card">
      <h4>${meal.type}</h4>
      <p class="title">${meal.title}</p>
      <h5>Składniki</h5>
      <ul class="ingredientsd">
        ${meal.ingredients.map(ingredient => `
        <li>
          <div>
            <span>${ingredient.name}</span>
            <span>${ingredient.amount}</span>
          </div>
        </li>
        `).join("")}
      </ul>
      <button class="edit" data-uid="${uid}">📋</button>
    </div>
  `;
}