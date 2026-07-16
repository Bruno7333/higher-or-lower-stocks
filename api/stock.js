import { getTickerDetails, getOpenClose, isValidTicker } from './_lib/massive.js';

export default async function handler(req, res) {
  const ticker = String(req.query.ticker || '').toUpperCase();
  if (!isValidTicker(ticker)) {
    return res.status(400).json({ error: 'Invalid ticker' });
  }

  try {
    const details = await getTickerDetails(ticker);
    const openClose = await getOpenClose(ticker);

    // Vercel's CDN caches this response for an hour, shared across ALL visitors.
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600');

    return res.status(200).json({
      name: details.results.name,
      ticker,
      price: openClose.close,
      imgurl: `/api/logo?ticker=${ticker}`,
    });
  } catch (e) {
    console.error(e);
    return res.status(e.status || 500).json({ error: e.message });
  }
}