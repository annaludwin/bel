import { useState } from "react";

// exported component:
export const Modal = ({ meal, mealBase, setView }) => {
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
                ? mealBase[meal.category][subcategory].map((recipe) => (
                    <button>{recipe.title}</button>
                  ))
                : null}
            </div>
          </div>
          <div className="stack">
            <div className="display">
              <Recipe></Recipe>
              <div className="button-rail rail">
                <button className="success2">DODATKI +</button>
                <button className="success">ZAPISZ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// utils:
const Recipe = ({ meal }) => {
  return (
    <>
      <h3>Tytul</h3>
      <p>"666 kcal"</p>
      <hr></hr>
      <h4>Składniki</h4>
      <ul>
        <li>1</li>
        <li>2</li>
      </ul>
      <div style={{ height: "12px" }}></div>
      <h4>Przygotowanie</h4>
      <ol>
        <li>a</li>
        <li>b</li>
      </ol>
    </>
  );
};
