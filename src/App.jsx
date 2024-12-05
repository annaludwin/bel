import "./reset.css";
import "./styles.css";
import { useState } from "react";
import mealBase from "./mealBase";
import { Modal } from "./components/Modal";
import { WeekPanel } from "./components/WeekPanel";
import { makeDay } from "./utils";

// tymczasowe, będzie dynamicznie zmieniane:
const addition = mealBase.additions[8];
const mainCourse = mealBase.breakfast.owsianki[1];

const daysSatMon = ["Sobota", "Niedziela", "Poniedziałek"];
const daysTueFri = ["Wtorek", "Środa", "Czwartek", "Piątek"];
const mealSatMon = daysSatMon.map((day) => makeDay(day, mainCourse, addition));
const mealTueFri = daysTueFri.map((day) => makeDay(day, mainCourse, addition));

function App() {
  const [weekPartMenu, setWeekPartMenu] = useState(mealTueFri);
  const [view, setView] = useState("weekPanel");
  const [selectedMeal, setSelectedMeal] = useState({
    mealName: null,
    category: null,
  });

  function openModalAndLoadData(view, mealName, category) {
    setView(view);
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
          meal={selectedMeal}
          mealBase={mealBase}
          setView={setView}
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

export default App;
