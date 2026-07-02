// Temporary fake data. Delete this file once stockService.js calls the real API.
// Each stock has the same shape the massive.com API response will be mapped to.
const mockStocks = [
  { ticker: "AAPL", name: "Apple Inc.", price: 213.55, imgurl: "https://logo.clearbit.com/apple.com" },
  { ticker: "MSFT", name: "Microsoft Corp.", price: 449.78, imgurl: "https://logo.clearbit.com/microsoft.com" },
  { ticker: "AMD", name: "Advanced Micro Devices", price: 162.34, imgurl: "https://logo.clearbit.com/amd.com" },
  { ticker: "NVDA", name: "NVIDIA Corp.", price: 126.09, imgurl: "https://logo.clearbit.com/nvidia.com" },
  { ticker: "GOOGL", name: "Alphabet Inc.", price: 183.42, imgurl: "https://logo.clearbit.com/google.com" },
  { ticker: "AMZN", name: "Amazon.com Inc.", price: 197.11, imgurl: "https://logo.clearbit.com/amazon.com" },
  { ticker: "TSLA", name: "Tesla Inc.", price: 248.98, imgurl: "https://logo.clearbit.com/tesla.com" },
  { ticker: "META", name: "Meta Platforms Inc.", price: 504.22, imgurl: "https://logo.clearbit.com/meta.com" },
  { ticker: "NFLX", name: "Netflix Inc.", price: 676.30, imgurl: "https://logo.clearbit.com/netflix.com" },
  { ticker: "KO", name: "Coca-Cola Co.", price: 63.15, imgurl: "https://logo.clearbit.com/coca-cola.com" },
];

export default mockStocks;
