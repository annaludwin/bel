import { useState } from "react";

export const Modal = ({ meal, mealBase, setView }) => {
  console.log(mealBase[meal.category]["owsianki"]);

  const [subcategory, setSubcategory] = useState("");

  return (
    <div id="modal" className="modal">
      <div className="content">
        <div className="navigation">
          <h3>Dodaj {meal.mealName.toLowerCase()}</h3>
          <button onClick={() => setView("weekPanel")}>✖</button>
        </div>

        <div className="columns">
          <div className="stack --gap-0">
            <select
              defaultValue=""
              onChange={(e) => setSubcategory(e.target.value)}
            >
              <option value="name" disabled>
                Wybierz kategorię posiłku
              </option>
              {Object.keys(mealBase[meal.category]).map(
                (subcategory, index) => (
                  <option value={subcategory} key={subcategory + index}>
                    {subcategory}
                  </option>
                ),
              )}
            </select>
            <div className="list">
              {subcategory !== ""
                ? mealBase[meal.category][subcategory].map((recipe, index) => (
                    <button>{recipe.title}</button>
                  ))
                : null}
            </div>
          </div>
          <div className="stack"></div>
        </div>
      </div>
    </div>
  );
};
