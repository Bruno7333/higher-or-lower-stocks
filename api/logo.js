import { getTickerDetails, isValidTicker, getApiKey } from './_lib/massive.js';

export default async function handler(req, res) {
  const ticker = String(req.query.ticker || '').toUpperCase();
  if (!isValidTicker(ticker)) {
    return res.status(400).json({ error: 'Invalid ticker' });
  }

  try {
    const details = await getTickerDetails(ticker);
    const logoUrl = details.results?.branding?.logo_url;
    if (!logoUrl) return res.status(404).json({ error: 'No logo for this ticker' });

    const imgRes = await fetch(`${logoUrl}?apiKey=${getApiKey()}`);
    if (!imgRes.ok) {
      return res.status(imgRes.status).json({ error: `Logo fetch failed (${imgRes.status})` });
    }

    const buffer = Buffer.from(await imgRes.arrayBuffer());
    res.setHeader('Content-Type', imgRes.headers.get('content-type') || 'image/svg+xml');
    // Logos basically never change: cache aggressively (browser + CDN, 1 day).
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    return res.status(200).send(buffer);
  } catch (e) {
    console.error(e);
    return res.status(e.status || 500).json({ error: e.message });
  }
}