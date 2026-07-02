// `revealed` controls whether the price is shown or hidden behind a "?".
function StockCard({stock, revealed = true}){
    return (
        <div className="stock-card">
            <div className="company-logo">
                <img src={stock.imgurl} alt={stock.ticker} />
            </div>
            <div className="stock-overlay">
                <div className="company-name">
                    {stock.name}
                </div>
                <div className="company-ticker">
                    {stock.ticker}
                </div>
                <div className="company-price">
                    {revealed ? `$${stock.price.toFixed(2)}` : "$ ???"}
                </div>
            </div>

        </div>
    );
}

export default StockCard