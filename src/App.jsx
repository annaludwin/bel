import { useState } from 'react'
import './reset.css'
import './styles.css'
const NavigationButton = ({elementId, msg}) => <button id={elementId} className={"navigation"}>{msg}</button>

const days = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"]
const meals = ["Śniadanie", "Drugie śniadanie", "Obiad", "Podwieczorek", "Kolacja"]


const DayPannel = ({dayName, children}) => {
    return <section className="day-panel">
        <h3>{dayName}</h3>
        {children}
    </section>
}

const MealList = ({mealName, children}) => {
    return <div className="meal-list">
        <div className="meal-card">
            <h4>{mealName}</h4>
            <div className="content"></div>
            <div className="recipe"></div>
            <button className="more">(...)</button>
            <div className="addition">
                <hr/>
                <h4 className="rail --spread">
                    <span>dodatek</span>
                    <button className="edit2">📋</button>
                </h4>
                <div className="content"></div>
                <div className="recipe"></div>
                <button className="more">(...)</button>
            </div>
            <button className="edit">📋</button>
            {children}
        </div>
    </div>
}


function App() {

    return (
        <>
            <nav>
                <h1>🔔BeL</h1>
                <div className="rail">
                    <button id={`satMonButton`}>sobota-poniedziałek</button>
                    <button id={`tueFriButton`}>wtorek-piątek</button>
                    <button>🍔</button>
                </div>
            </nav>

            <div id="satMon" className="screen">{
                days.map((day, index) => (
                    <DayPannel dayName={days[index].toUpperCase()}>{
                        meals.map((meal, index) => (
                            <MealList mealName={meals[index]}></MealList>
                        ))
                    }
                    </DayPannel>
                ))
            }


            </div>
        </>
    )
}

export default App
