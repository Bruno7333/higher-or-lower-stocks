export async function getLeaderboard(period){
    const res = await fetch(`/api/leaderboard?period=${period}`);
    if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    // Keep the status code in the message so getErrorMessage() can match it.
    throw new Error(body.error || `API error ${res.status}`);
  }
  return res.json();
}

export async function submitScore(name, score){
  const res = await fetch("/api/leaderboard",{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, score }),
  });
  if (!res.ok){
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `API error ${res.status}`);
  }
  return res.json();
}