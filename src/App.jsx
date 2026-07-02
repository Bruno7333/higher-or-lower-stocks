import { useState, useEffect } from 'react'
import './App.css'
import StockCard from './components/StockCard'
import { getRandomStock } from './services/stockService'

function App() {
  const [leftStock, setLeftStock] = useState(null)   // price shown
  const [rightStock, setRightStock] = useState(null) // price hidden until guess
  const [streak, setStreak] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [status, setStatus] = useState('loading')    // 'loading' | 'playing' | 'gameover'

  // Sets up a fresh round with two different stocks.
  async function startGame() {
    setStatus('loading')
    try{
      const first = await getRandomStock()
      const second = await getRandomStock(first.ticker)
      if(!first || !second) throw new Error('No stock data returned')
      setLeftStock(first)
      setRightStock(second)
      setStreak(0)
      setStatus('playing')
    } catch (e){
      console.error(e)
      setStatus('error')
    }

  }

  // Run once when the app first loads.
  useEffect(() => {
    startGame()
  }, [])

  // guessHigher = true if the player clicked "Higher".
  async function handleGuess(guessHigher) {
    const correct = guessHigher
      ? rightStock.price >= leftStock.price
      : rightStock.price <= leftStock.price

    if (!correct) {
      setHighScore((hs) => Math.max(hs, streak))
      setStatus('gameover')
      return
    }

    // Correct: right stock becomes the new left, fetch a fresh right stock.
    const newStreak = streak + 1
    setStreak(newStreak)
    setLeftStock(rightStock)
    try {
      const next = await getRandomStock(rightStock.ticker)
      if (!next) throw new Error('No stock data returned')
      setRightStock(next)
    } catch (e) {
      console.error(e)
      setStatus('error')
    }
  }

  async function loadAgain(){
    // No game in progress (error happened at initial load) -> start fresh.
    if (!leftStock) {
      startGame()
      return
    }

    // Mid-game: keep the streak, just re-fetch the missing right-hand stock.
    setStatus('loading')
    try {
      const next = await getRandomStock(leftStock.ticker)
      if (!next) throw new Error('No stock data returned')
      setRightStock(next)
      setStatus('playing')
    } catch (e) {
      console.error(e)
      setStatus('error')
    }
  }

  if (status === 'error'){
    return <div className="game">
      <p>Something went wrong :(</p>
      <p>Probably ran out of <strong>API credits</strong> (I only get 5 every minute)</p>
      <div className="buttons">Wait a little while and then: <button onClick={() => loadAgain()}>Try Again</button></div>
    </div>
  }

  if (status === 'loading' || !leftStock || !rightStock) {
    return <div className="game">
      <p>Loading...</p>
      </div>
  }

  return (
    <div className="game">
      <h1>Higher or Lower</h1>
      <div className="scoreboard">
        <span>Streak: {streak}</span>
        <span>Best: {highScore}</span>
      </div>

      <div className="cards">
        <StockCard stock={leftStock} revealed={true} />

        <div className="vs">
          <p>Is <strong>{rightStock.name}</strong>'s price higher or lower than <strong>{leftStock.name}</strong>? </p>
          <p className="small-font">(All stock prices are from previous day close)</p>
          {status === 'playing' && (
            <div className="buttons">
              <button onClick={() => handleGuess(true)}>Higher</button>
              <button onClick={() => handleGuess(false)}>Lower</button>
            </div>
          )}
        </div>

        <StockCard stock={rightStock} revealed={status === 'gameover'} />
      </div>

      {status === 'gameover' && (
        <div className="gameover">
          <p>Wrong! {rightStock.ticker} was ${rightStock.price.toFixed(2)}.</p>
          <p>Final streak: {streak}</p>
          <button onClick={startGame}>Play Again</button>
        </div>
      )}
    </div>
  )
}

export default App
