import { useState } from 'react'
import { submitScore } from '../services/leaderboardService'

function ScoreSubmitComponent({ streak }){
    const [name, setName] = useState('');
    const [submitStatus, setSubmitStatus] = useState('idle'); // idle | sending | done | error
    const [errorMsg, setErrorMsg] = useState(null);
    
    async function handleSubmit() {
        if (!name.trim()) return;
        setSubmitStatus('sending');
        try {
            await submitScore(name.trim(), streak);
            setSubmitStatus('done');
        } catch (e){
            setErrorMsg(e.message);
            setSubmitStatus('error');
        }
    }

    return(
        <div className="score-submit">
            {submitStatus === 'done' ? (
                <p className="submit-done">Submitted!</p>
            ) : (
                <>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={20}
                        placeholder="your name"
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={submitStatus === 'sending' || !name.trim()}
                    >
                        {submitStatus === 'sending' ? 'Submitting…' : 'Submit score'}
                    </button>
                    {submitStatus === 'error' && <p className="submit-error">{errorMsg}</p>}
                </>
            )}
        </div>
    )
}

export default ScoreSubmitComponent