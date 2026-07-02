// ============================================================================
// THIS IS THE ONLY FILE YOU CHANGE TO ADD THE REAL API.
// ----------------------------------------------------------------------------
// The rest of the app just calls getRandomStock(). Right now it returns a
// random stock from the mock list. Later, replace the body of getRandomStock
// with a fetch() to the massive.com API and map the response to this shape:
//
//   { ticker: string, name: string, price: number, imgurl: string }
//
// Example of what the real version will look like (pseudo-code):
//
//   export async function getRandomStock(excludeTicker) {
//     const ticker = pickRandomTicker(excludeTicker);
//     const res = await fetch(`https://api.massive.com/v1/quote/${ticker}`, {
//       headers: { Authorization: `Bearer ${import.meta.env.VITE_MASSIVE_API_KEY}` },
//     });
//     if (!res.ok) throw new Error(`API error: ${res.status}`);
//     const data = await res.json();
//     return { ticker: data.symbol, name: data.name, price: data.price, imgurl: data.logo };
//   }
// ============================================================================

import mockStocks from "../data/mockStocks";
import tickers from "../data/tickers";

import { restClient } from '@massive.com/client-js';

const massiveApiKey = import.meta.env.VITE_MASSIVE_API_KEY
const massiveRest = restClient(massiveApiKey, 'https://api.massive.com');

async function getTickerData(get_ticker) {
  let response1, response2;
  try {
    response1 = await massiveRest.getTicker(
      {
        ticker: get_ticker,
      }
    );
    console.log('Response:', response1);
  } catch (e) {
    console.error('An error happened:', e);
    return null;
  }

  try{
    response2 = await massiveRest.getStocksOpenClose(
      {
        stocksTicker: get_ticker,
        date: "2026-07-01", //must be previous day so today july 1st
        adjusted: "true"
      }

    );
  } catch (e){
    console.error('An error happened:', e);
    return null;
  }

  const stock_return = {
    name: response1.results.name,
    ticker: get_ticker,
    price: response2.close,
    imgurl: `${response1.results.branding.logo_url}?apiKey=${massiveApiKey}`
  }

  return stock_return;
}


// Kept async on purpose so the game code already uses await.
// That way, when you swap in fetch(), NOTHING in App.jsx has to change.
export async function getRandomStock(excludeTicker) {
  const pool = excludeTicker
    ? tickers.filter((s) => s.ticker !== excludeTicker)
    : tickers;
  const ticker = pool[Math.floor(Math.random() * pool.length)];
  const stock = await getTickerData(ticker);

  return stock;
}
