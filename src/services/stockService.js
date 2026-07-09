import tickers from "../data/tickers";

import { restClient } from '@massive.com/client-js';

const massiveApiKey = import.meta.env.VITE_MASSIVE_API_KEY
const massiveRest = restClient(massiveApiKey, 'https://api.massive.com');

function getPreviousTradingDay(){
  const date = new Date();
  date.setDate(date.getDate() - 1);

  const day = date.getDay();
  if (day === 0) date.setDate(date.getDate() - 2); //Sun -> Friday
  else if (day === 6) date.setDate(date.getDate() - 1); //Sat -> Friday

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

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
    throw e; // pass the real cause (e.g. 429) up to App instead of hiding it behind null
  }

  try{
    response2 = await massiveRest.getStocksOpenClose(
      {
        stocksTicker: get_ticker,
        date: getPreviousTradingDay(), //This breaks for July 3rd because the market was closed due to 4th of July
        adjusted: "true"
      }

    );
  } catch (e){
    console.error('An error happened:', e);
    throw e; // pass the real cause (e.g. 429) up to App instead of hiding it behind null
  }

  const stock_return = {
    name: response1.results.name,
    ticker: get_ticker,
    price: response2.close,
    imgurl: `${response1.results.branding.logo_url}?apiKey=${massiveApiKey}` // Use for no images: response1.results.branding.logo_url // Use: `${response1.results.branding.logo_url}?apiKey=${massiveApiKey}` for adding images, currently it uses too many api credits to make the application functional.
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
