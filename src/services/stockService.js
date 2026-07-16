import tickers from "../data/tickers";

async function getTickerData(get_ticker) {
  const res = await fetch(`/api/stock?ticker=${encodeURIComponent(get_ticker)}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    // Keep the status code in the message so getErrorMessage() can match it.
    throw new Error(body.error || `API error ${res.status}`);
  }
  return res.json();
}

// Kept async on purpose so the game code already uses await.
export async function getRandomStock(excludeTicker) {
  const pool = excludeTicker
    ? tickers.filter((s) => s !== excludeTicker)
    : tickers;
  const ticker = pool[Math.floor(Math.random() * pool.length)];
  const stock = await getTickerData(ticker);

  return stock;
}