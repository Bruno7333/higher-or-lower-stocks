import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  let higher = true;
  const [curStock, setCurStock] = useState("AAPL");
  const [nextStock, setNextStock] = useState("AMD");

  function updateStreak(trueOrFalse){
    setCurStock(nextStock);
    setNextStock("GetNewStock");

    if(trueOrFalse){
      setCount(count + 1);
    } else{
      setCount(0);
    }

  }

  function checkCorrect(userChoice){
    return userChoice == higher;

  }

  return (
    <>
      <div>Correct Streak: {count}</div>

      <div>
        Is {curStock} Higher or Lower Than {nextStock}?
      </div>

      <div id="UserOpts">
        <button id="HigherButton" onClick={() => updateStreak(checkCorrect(true))}>Higher</button>
        <button id="LowerButton" onClick={() => updateStreak(checkCorrect(false))}>Lower</button>
      </div>

    </>
  )
}


export default App
