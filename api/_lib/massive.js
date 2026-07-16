// Server-side helpers for talking to massive.com.
const BASE_URL = 'https://api.massive.com';

// In-memory caches. Each warm serverless instance keeps these between requests,
// so repeat lookups for the same ticker on the same day cost zero API credits.
const detailsCache = new Map(); // ticker -> { day, data }
const priceCache = new Map();   // ticker -> { day, data }

export function getApiKey() {
  const key = process.env.MASSIVE_API_KEY;
  if (!key) throw new Error('MASSIVE_API_KEY environment variable is not set');
  return key;
}

export function isValidTicker(ticker) {
  return typeof ticker === 'string' && /^[A-Z.]{1,6}$/.test(ticker);
}

// Same weekend logic as the old client-side version. Holidays still slip through.
export function getPreviousTradingDay() {
  const date = new Date();
  date.setDate(date.getDate() - 1);

  const day = date.getDay();
  if (day === 0) date.setDate(date.getDate() - 2); // Sun -> Friday
  else if (day === 6) date.setDate(date.getDate() - 1); // Sat -> Friday

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    // Keep the status code in the message so the frontend's
    // getErrorMessage() can still match '429' / '401'.
    const err = new Error(`massive.com responded with ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

// Company details (name, branding). Cached per ticker per day.
export async function getTickerDetails(ticker) {
  const day = getPreviousTradingDay();
  const cached = detailsCache.get(ticker);
  if (cached && cached.day === day) return cached.data;

  const url = `${BASE_URL}/v3/reference/tickers/${ticker}?apiKey=${getApiKey()}`;
  const data = await fetchJson(url);
  detailsCache.set(ticker, { day, data });
  return data;
}

// Previous trading day open/close. Cached per ticker per day.
export async function getOpenClose(ticker) {
  const day = getPreviousTradingDay();
  const cached = priceCache.get(ticker);
  if (cached && cached.day === day) return cached.data;

  const url = `${BASE_URL}/v1/open-close/${ticker}/${day}?adjusted=true&apiKey=${getApiKey()}`;
  const data = await fetchJson(url);
  priceCache.set(ticker, { day, data });
  return data;
}