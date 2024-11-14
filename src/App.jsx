import './reset.css'
import './styles.css'
import './mealBase'
import mealBase from "./mealBase";

const daysSatMon = ["Sobota", "Niedziela", "Poniedziałek"]
const daysTueFri = ["Wtorek", "Środa", "Czwartek", "Piątek"]
const meals = ["Śniadanie", "Drugie śniadanie", "Obiad", "Podwieczorek", "Kolacja"]
const addition = mealBase.dodatki[8]
const mainCourse = mealBase.sniadanie.owsianki[1]


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

            <MealContent mealArray={mainCourse}></MealContent>
            <button className="more">(...)</button>
            <MealRecipe mealArray={mainCourse}></MealRecipe>

            <MealContent mealArray={addition}></MealContent>
            <button className="more">(...)</button>
            <MealRecipe mealArray={addition}></MealRecipe>

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

const MealRecipe = ({mealArray}) => {
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
                daysSatMon.map((day, index) => (
                    <DayPannel dayName={daysSatMon[index].toUpperCase()}>{
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
