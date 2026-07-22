import { useState, useEffect } from "react"
import { getLeaderboard } from "../services/leaderboardService"

function LeaderboardCard({period}){
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let stale = false
        setLoading(true)
        setError(null)
        getLeaderboard(period)
            .then((data) => { if (!stale) setRows(data) })
            .catch((e) => { if (!stale) setError(e.message) })
            .finally(() => { if (!stale) setLoading(false) })
        return () => { stale = true }
    }, [period])

    // render: loading / error / empty / rows — your part

    return(
        <div className="leaderboard-card">
            {loading ? (
                <>
                    <div className="skeleton skeleton-row"></div>
                    <div className="skeleton skeleton-row"></div>
                    <div className="skeleton skeleton-row"></div>
                </>
            ) : error ? (
                <p className="submit-error">{error}</p>
            ) : rows.length === 0 ? (
                <p className="leaderboard-empty">No scores yet — be the first!</p>
            ) : (
                <ol className="leaderboard-list">
                    {rows.map((r, i) => (
                        <li key={`${r.name}-${r.created_at}`} className="leaderboard-row">
                            <span className="lb-rank">{i + 1}</span>
                            <span className="lb-name">{r.name}</span>
                            <span className="lb-score">{r.score}</span>
                        </li>
                    ))}
                </ol>
            )}
        </div>
    )
}

export default LeaderboardCard