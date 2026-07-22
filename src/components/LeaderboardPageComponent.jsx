import LeaderboardCard from './LeaderboardCard.jsx'

function LeaderboardPage({onBack}){
    return(
        <div className="game">
            <h1>Leaderboards</h1>
            <div className="leaderboard-columns">
                <div className="leaderboard-column">
                    <h2>Daily</h2>
                    <LeaderboardCard period="daily"/>
                </div>
                <div className="leaderboard-column">
                    <h2>Weekly</h2>
                    <LeaderboardCard period="weekly"/>
                </div>
                <div className="leaderboard-column">
                    <h2>All Time</h2>
                    <LeaderboardCard period="all_time"/>
                </div>
            </div>
            <div className="buttons">
                <button onClick={onBack}>Back to Game</button>
            </div>
        </div>
    )
}

export default LeaderboardPage