import { useState } from "react";
import { makeDay } from "../utils";

// exported component:
export const Modal = ({ meal, mealBase, setView, setWeekPartMenu }) => {
  const [subcategory, setSubcategory] = useState("");
  const [recipe, setRecipe] = useState("");

  console.log(meal);
  console.log(subcategory);
  console.log(recipe);

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
              <option value="" disabled>
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
                    <button
                      key={recipe + index}
                      onClick={() => setRecipe(recipe)}
                    >
                      {recipe.title}
                    </button>
                  ))
                : null}
            </div>
          </div>

          <div className="stack">
            <div className="display">
              <Recipe data={recipe}></Recipe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// utils:
const Recipe = ({ data }) => {
  // console.log(data);

  return data !== "" ? (
    <>
      <h3>{data.title}</h3>
      <p>{data.calories}</p>
      <hr></hr>
      <h4>{data.ingredients ? "Składniki" : null}</h4>
      <ul>
        {data.ingredients
          ? data.ingredients.map((ingredient, index) => (
              <li key={ingredient + index}>{ingredient}</li>
            ))
          : null}
      </ul>
      <div style={{ height: "12px" }}></div>
      <h4>{data.recipe ? "Przygotowanie" : null} </h4>
      <ol>
        {data.recipe
          ? data.recipe.map((recipeStep, index) => (
              <li key={recipeStep + index}>{recipeStep}</li>
            ))
          : null}
      </ol>
      <div className="button-rail rail">
        <button className="success2">DODATKI +</button>
        <button
          className="success"
          // onClick={() => setWeekPartMenu(updateDay())}
        >
          ZAPISZ
        </button>
      </div>
    </>
  ) : null;
};

const updateDay = (day) => {
  "aaaaa";
};
