import { useState } from 'react'
import './reset.css'
import './styles.css'
const NavigationButton = ({elementId, msg}) => <button id={elementId} className={"navigation"}>{msg}</button>


const DayPannel = ({dayName}) => {
    return <section className="day-panel">
        <h3>{dayName}</h3>
        <div className="meal-list">
        </div>
    </section>
}

function App() {


    return (
        <>

            <nav>
                <h1>🔔BeL</h1>
                <div className="rail">
                    <NavigationButton elementId={`satMonButton`} msg={`sobota-poniedziałek`}></NavigationButton>
                    <NavigationButton elementId={`tueFriButton`} msg={`wtorek-piątek`}></NavigationButton>
                    <button>🍔</button>
                </div>
            </nav>

            <DayPannel dayName={`SOBOTA`}></DayPannel>



        </>
    )
}

export default App
