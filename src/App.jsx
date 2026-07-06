import { useState, useEffect } from 'react'
import './App.css'
import StockCard from './components/StockCard'
import { getRandomStock } from './services/stockService'
import AppMainComponent from './components/AppMainComponent'

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

  return(
    <AppMainComponent
      stock1={leftStock}
      stock2={rightStock}
      status={status}
      streak={streak}
      highScore={highScore}
      onGuess={handleGuess}
      onPlayAgain={startGame}
    />
  )
}

export default App
