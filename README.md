# Higher or Lower: Stock Picker

A guessing game with real stock prices. Two companies appear side by side — one price is revealed, the other is hidden. Is the hidden one **higher or lower**? Guess right and your streak grows. Guess wrong and it's game over.

## How to Play

1. Look at the stock on the left — its price is shown.
2. Decide if the stock on the right closed **Higher** or **Lower**.
3. Every correct guess extends your streak, and the right card slides left for the next round.
4. One wrong guess ends the run. Can you beat your best streak?

All prices are real closing prices from the previous trading day, along with real company names and logos.

## Features

- **Live stock data** from the [massive.com](https://massive.com) API — prices, company names, and logos
- **Streak & best score** tracking across rounds
- **Friendly error page** that explains what went wrong (usually running out of API credits — the free tier only allows 5 requests per minute)
- **A playable dino game** on the error page, so waiting for API credits is actually fun

## Running It Yourself

```bash
npm install
npm run dev
```

You'll need a free API key from massive.com. Copy `.env.example` to `.env` and fill in your key:

```
VITE_MASSIVE_API_KEY=your_key_here
```

## Dino Game in Error Page

The offline dino game comes from the Chromium project (BSD 3-Clause license), via [wayou/t-rex-runner](https://github.com/wayou/t-rex-runner), with minor spacing tweaks. License and copyright notices are preserved in `public/dino/`.