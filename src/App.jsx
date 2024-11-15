import "./reset.css";
import "./styles.css";
import "./mealBase";
import mealBase from "./mealBase";
import { useState } from "react";

const daysSatMon = ["Sobota", "Niedziela", "Poniedziałek"];
const daysTueFri = ["Wtorek", "Środa", "Czwartek", "Piątek"];
const meals = [
  "Śniadanie",
  "Drugie śniadanie",
  "Obiad",
  "Podwieczorek",
  "Kolacja",
];
const addition = mealBase.dodatki[8];
const mainCourse = mealBase.sniadanie.owsianki[1];

const DayPanel = ({ dayName, children }) => {
  return (
    <section className="day-panel">
      <h3>{dayName}</h3>
      {children}
    </section>
  );
};

const MealList = ({ mealName }) => {
  return (
    <div className="meal-list">
      <div className="meal-card">
        <h4>{mealName}</h4>

        <MealContent mealArray={mainCourse}></MealContent>
        <button className="more">(...)</button>
        <MealRecipe mealArray={mainCourse}></MealRecipe>

        <MealContent mealArray={addition}></MealContent>
        <button className="more">(...)</button>
        <MealRecipe mealArray={addition}></MealRecipe>

        <button className="edit">📋</button>
      </div>
    </div>
  );
};

const MealContent = ({ mealArray }) => {
  return (
    <div className="content">
      <p className="title">{mealArray.title}</p>
      <h5>Składniki</h5>
      <ul>
        {mealArray.ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

const MealRecipe = ({ mealArray }) => {
  return (
    <div className="recipe">
      <h5>Przepis</h5>
      <ol>
        {mealArray.reciepe.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ol>
      <button className="less">mniej</button>
    </div>
  );
};

const ShoppingListItem = ({ product }) => {
  return (
    <div>
      <input type="checkbox" />
      <em>{product}</em>
    </div>
  );
};

const WeekPanel = ({ weekPart }) => {
  return (
    <div className="screen">
      {weekPart.map((day) => (
        <DayPanel key={day} dayName={day.toUpperCase()}>
          {meals.map((meal) => (
            <MealList key={meal} mealName={meal}></MealList>
          ))}
        </DayPanel>
      ))}

      <section className="day-panel dark">
        <h3 className="shoppingList no-margin ">Lista zakupów</h3>
        <h4 className="shoppingList">sobota-poniedziałek</h4>
        <button className="shop">stwórz listę zakupów</button>
        <div
          className="hide"
          style={{ color: "blanchedalmond", marginTop: "1em" }}
        >
          <input type="checkbox" value="hide" />
          <label>ukryj zaznaczone</label>
        </div>

        <div className="meal-card list">
          <ShoppingListItem product={"Produkt 1"}></ShoppingListItem>
          <ShoppingListItem product={"Produkt 2"}></ShoppingListItem>
          <ShoppingListItem product={"..."}></ShoppingListItem>
        </div>
      </section>
    </div>
  );
};

function App() {
  const [weekPart, setWeekPart] = useState(daysTueFri);
  const [isBurger, setBurger] = useState(true);

  console.log(weekPart, isBurger);

  return (
    <>
      <nav>
        <h1>🔔BeL</h1>
        <div className="rail">
          <button onClick={() => setWeekPart(daysSatMon)}>
            sobota-poniedziałek
          </button>
          <button onClick={() => setWeekPart(daysTueFri)}>wtorek-piątek</button>
          <button onClick={() => setBurger(!isBurger)}>
            {isBurger ? "🍔" : "❤"}
          </button>
        </div>
      </nav>

      <WeekPanel weekPart={weekPart}></WeekPanel>
    </>
  );
}

/*
todo:
 podpiac handler pod guzik tworzenia listy i stworzyc listę

*/
export default App;
