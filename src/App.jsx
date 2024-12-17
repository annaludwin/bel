import "./reset.css";
import "./styles.css";
import { useState } from "react";
import mealBase from "./mealBase";
import { Modal } from "./components/Modal";
import { WeekPanel } from "./components/WeekPanel";
import { makeDay } from "./utils";

const daysSatMon = ["Sobota", "Niedziela", "Poniedziałek"];
const daysTueFri = ["Wtorek", "Środa", "Czwartek", "Piątek"];
const mealSatMon = daysSatMon.map((day) => makeDay(day));
const mealTueFri = daysTueFri.map((day) => makeDay(day));

function App() {
  const [weekPartMenu, setWeekPartMenu] = useState(mealTueFri);
  const [view, setView] = useState("weekPanel");
  const [selectedMeal, setSelectedMeal] = useState({
    mealName: null,
    category: null,
    dayName: null,
  });

  function openModalAndLoadData(view, mealName, category, dayName) {
    setView(view);
    setSelectedMeal({ mealName, category, dayName });
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
          meal={selectedMeal}
          mealBase={mealBase}
          setView={setView}
          // todo to bedzie mi otzrebne do podmiany danych w widoku głównym
          setWeekPartMenu={setWeekPartMenu}
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

// todo usunac zbedne napisy w widoku ogolnym
// todo zrobic drugi modal
// todo przekazac dane
export default App;
