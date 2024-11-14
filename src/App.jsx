import { useState } from 'react'
import './reset.css'
import './styles.css'
const NavigationButton = ({elementId, msg}) => <button id={elementId} className={"navigation"}>{msg}</button>

const days = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"]
const meals = ["Śniadanie", "Drugie śniadanie", "Obiad", "Podwieczorek", "Kolacja"]
const koktajl =
    {
    "title": "Koktajl z masła orzechowego, banana i siemienia lnianego",
    "calories": "299 kcal",
    "ingredients": [
        "Mleko 79 g (0,4 szkl.),",
        "Jogurt naturalny 86 g (0,6 opak. po 150 g),",
        "Banan 86 g (0,5 średniej szt.),",
        "Masło orzechowe 100% 14 g (niecała łyżka),",
        "Nasiona słonecznika, dyni, chia, sezam lub siemię lniane 7 g (1,4 łyżeczki)"
    ],
    "reciepe": [
        "Banana obierz i podziel na mniejsze kawałki",
        "Wszystkie składniki umieść w pojemniku blendera",
        "Zmiksuj na gładki koktajl"
    ]
}

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

            <MealContent mealArray={koktajl}></MealContent>
            <button className="more">(...)</button>
            <MealRecipe mealArray={koktajl}></MealRecipe>
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


const MealContent = ({mealArray}) => {
    return <div className="content">
        <p className="title">{mealArray.title}</p>
        <h5>Składniki</h5>
        <ul>{
            mealArray.ingredients.map((ingredient) => (
                <li>{ingredient}</li>
            ))
            }
        </ul>
    </div>
}

const MealRecipe = ({mealArray, children}) => {
return <div className="recipe">
    <h5>Przepis</h5>
    <ol>{
        mealArray.reciepe.map((ingredient) => (
            <li>{ingredient}</li>
        ))
    }
    </ol>
    <button className="less">mniej</button>
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
