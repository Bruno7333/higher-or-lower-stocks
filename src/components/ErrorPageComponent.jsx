import { getErrorMessage } from "../services/errorHandler.js"

function ErrorPageComponent({errorType, onRetry}){
    // get error reason from error type
    const [before, bolded, after] = getErrorMessage(errorType)

    return(<div className="game">
      <p>Something went wrong :(</p>
      <p>{before}<strong>{bolded}</strong>{after}</p>
      <div className="retry-row">Wait a little while and then: <button onClick={() => onRetry()}>Try Again</button></div>
      <div className="dino-section">
        <p>While you wait:</p>
        <iframe
          src="/dino/index.html"
          title="Dino Game"
          width="100%"
          height="220"
          style={{ border: "2px solid black" }}
        />
      </div>
    </div>)
}

export default ErrorPageComponent