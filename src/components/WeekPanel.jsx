import mealBase from "../mealBase";

// exported component:
export const WeekPanel = ({ weekPart, openModalAndLoadData }) => {
  return (
    <div className="screen">
      {weekPart.map((day) => (
        <DayPanel
          meal={day.meals}
          openModalAndLoadData={openModalAndLoadData}
          key={day.dayName}
          dayName={day.dayName.toUpperCase()}
        ></DayPanel>
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

// utils:
const DayPanel = ({ meal, openModalAndLoadData, dayName }) => {
  return (
    <section className="day-panel">
      <h3>{dayName}</h3>
      {meal.map((meal) => (
        <MealList
          key={meal.title}
          meal={meal}
          openModalAndLoadData={openModalAndLoadData}
        ></MealList>
      ))}{" "}
    </section>
  );
};

const MealList = ({ meal, openModalAndLoadData, dayName }) => {
  console.log(meal.mainCourse.title);

  // todo dokonczyc
  return (
    <div className="meal-list">
      <div className="meal-card">
        <h4>{meal.title}</h4>
        {meal.mainCourse.title !== "" ? (
          <>
            <MealContent mealArray={meal.mainCourse}></MealContent>
            <button className="more">(...)</button>
            <MealRecipe mealArray={meal.mainCourse}></MealRecipe>
          </>
        ) : null}
        {meal.addition.title !== "" ? (
          <>
            <MealContent mealArray={meal.addition}></MealContent>
            <button className="more">(...)</button>
            <MealRecipe mealArray={meal.addition}></MealRecipe>
          </>
        ) : null}
        <button
          className="edit"
          onClick={() => {
            openModalAndLoadData("modal", meal.title, meal.category, dayName);
          }}
        >
          📋
        </button>
      </div>
    </div>
  );
};

const MealContent = ({ mealArray }) => {
  return mealArray.title ? (
    <div className="content">
      <p className="title">{mealArray.title}</p>
      <h5>Składniki</h5>
      <ul>
        {mealArray.ingredients.map((ingredient, index) => (
          <li key={ingredient + index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  ) : null;
};

const MealRecipe = ({ mealArray }) => {
  return mealArray.recipe === [] ? (
    <div className="recipe">
      <h5>Przepis</h5>
      <ol>
        {mealArray.recipe.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ol>
      <button className="less">mniej</button>
    </div>
  ) : null;
};

const ShoppingListItem = ({ product }) => {
  return (
    <div>
      <input type="checkbox" />
      <em>{product}</em>
    </div>
  );
};
