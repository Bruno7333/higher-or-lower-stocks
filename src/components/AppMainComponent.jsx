import StockCard from './StockCard.jsx'

function AppMainComponent({ stock1, stock2, status, streak, highScore, onGuess, onPlayAgain }){ // have to pass in all parameters and all functions used
    return(
        <div className="game">
      <h1>Higher or Lower</h1>
      <div className="scoreboard">
        <span>Streak: {streak}</span>
        <span>Best: {highScore}</span>
      </div>

      <div className="cards">
        <StockCard stock={stock1} revealed={true} />

        <div className="vs">
          <p>Is <strong>{stock2.name}</strong>'s price higher or lower than <strong>{stock1.name}</strong>? </p>
          <p className="small-font">(All stock prices are from previous day close)</p>
          {status === 'playing' && (
            <div className="buttons">
              <button onClick={() => onGuess(true)}>Higher</button>
              <button onClick={() => onGuess(false)}>Lower</button>
            </div>
          )}
        </div>

        <StockCard stock={stock2} revealed={status === 'gameover'} />
      </div>

      {status === 'gameover' && (
        <div className="gameover">
          <p>Wrong! {stock2.ticker} was ${stock2.price.toFixed(2)}.</p>
          <p>Final streak: {streak}</p>
          <button onClick={onPlayAgain}>Play Again</button>
        </div>
      )}
    </div>
    );

}

export default AppMainComponent