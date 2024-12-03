import "./reset.css";
import "./styles.css";
import "./mealBase";
import { useState } from "react";
import mealBase from "./mealBase";

import { Tabs } from "./tabs";

// tymczasowe, będzie dynamicznie zmieniane:
const addition = mealBase.additions[8];
const mainCourse = mealBase.breakfast.owsianki[1];

const daysSatMon = ["Sobota", "Niedziela", "Poniedziałek"];
const daysTueFri = ["Wtorek", "Środa", "Czwartek", "Piątek"];
const mealSatMon = daysSatMon.map((day) => makeDay(day, mainCourse, addition));
const mealTueFri = daysTueFri.map((day) => makeDay(day, mainCourse, addition));

const DayPanel = ({ dayName, children }) => {
  return (
    <section className="day-panel">
      <h3>{dayName}</h3>
      {children}
    </section>
  );
};

const MealList = ({ meal, openModalAndLoadData }) => {
  // console.log(meal);

  return (
    <div className="meal-list">
      <div className="meal-card">
        <h4>{meal.title}</h4>

        <MealContent mealArray={mainCourse}></MealContent>
        <button className="more">(...)</button>
        <MealRecipe mealArray={mainCourse}></MealRecipe>

        <MealContent mealArray={addition}></MealContent>
        <button className="more">(...)</button>
        <MealRecipe mealArray={addition}></MealRecipe>

        <button
          className="edit"
          onClick={() => {
            openModalAndLoadData("modal", meal.title);
          }}
        >
          📋
        </button>
      </div>
    </div>
  );
};

const MealContent = ({ mealArray }) => {
  return (
    <div className="content">
      <p className="title">{mealArray.name}</p>
      <h5>Składniki</h5>
      <ul>
        {mealArray.ingredients.map((ingredient, index) => (
          <li key={ingredient + index}>{ingredient}</li>
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
        {mealArray.recipe.map((ingredient) => (
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

const WeekPanel = ({ weekPart, openModalAndLoadData }) => {
  return (
    <div className="screen">
      {weekPart.map((day) => (
        <DayPanel key={day.dayName} dayName={day.dayName.toUpperCase()}>
          {day.meals.map((meal) => (
            <MealList
              key={meal.title}
              meal={meal}
              openModalAndLoadData={openModalAndLoadData}
            ></MealList>
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

const Modal = ({ switchModal, meal, mealBase }) => {
  console.log(Object.keys(meal));

  return (
    <div id="modal" className="modal">
      <div className="content">
        <div className="navigation">
          <h3>Dodaj {meal.mealName.toLowerCase()}</h3>
          <button onClick={() => switchModal("weekPanel", { mealName: meal })}>
            ✖
          </button>
        </div>

        <div className="columns">
          <div className="stack --gap-0">
            <select defaultValue="name">
              <option value="name" disabled>
                Wybierz kategorię posiłku
              </option>
              {Object.keys(mealBase.breakfast).map((category) => (
                <option value="name">{category}</option>
              ))}
            </select>
            <div className="list"></div>
          </div>
          <div className="stack"></div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [weekPartMenu, setWeekPartMenu] = useState(mealTueFri);
  const [view, setView] = useState("weekPanel");
  const [selectedMeal, setSelectedMeal] = useState({
    mealName: null,
    category: null,
  });

  function switchModal(view) {
    setView(view);
  }

  function openModalAndLoadData(view, mealName, category) {
    switchModal(view);
    setSelectedMeal({ mealName, category });
  }

  // console.log(selectedMeal);
  return (
    <>
      <nav>
        <h1>🔔BeL</h1>
        <div className="rail">
          <button onClick={() => setWeekPartMenu(mealSatMon)}>
            sobota-poniedziałek
          </button>
          <button onClick={() => setWeekPartMenu(mealTueFri)}>
            wtorek-piątek
          </button>
        </div>
      </nav>
      {view === "modal" ? (
        <Modal
          switchModal={switchModal}
          meal={selectedMeal}
          mealBase={mealBase}
        ></Modal>
      ) : null}
      {view === "weekPanel" ? (
        <WeekPanel
          weekPart={weekPartMenu}
          openModalAndLoadData={openModalAndLoadData}
        ></WeekPanel>
      ) : null}
    </>
  );
}

function makeDay(dayName, mainCourse = {}, addition = []) {
  return {
    dayName: dayName,
    meals: [
      {
        title: "Śniadanie",
        category: "breakfast",
        mainCourse: mainCourse,
        addition: addition,
      },
      {
        title: "2-gie śniadanie",
        category: "brunch",
        mainCourse: mainCourse,
        addition: addition,
      },
      {
        title: "Obiad",
        category: "dinner",
        mainCourse: mainCourse,
        addition: addition,
      },
      {
        title: "Podwieczorek",
        category: "snack",
        mainCourse: mainCourse,
        addition: addition,
      },
      {
        title: "Kolacja",
        category: "supper",
        mainCourse: mainCourse,
        addition: addition,
      },
    ],
  };
}

/*
todo: w modalu ma mi wyświetać anzwy kategorii (l.149-150)
 poprawic liste shoppingList tak by zbierałą dane z state a nie zaślepki
*/
export default App;
