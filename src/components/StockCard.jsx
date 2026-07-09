// `revealed` controls whether the price is shown or hidden behind a "?".
function StockCard({stock, revealed = true, loading = false}){
    if (loading) {
        return (
            <div className="stock-card">
                <div className="company-logo">
                    <div className="skeleton skeleton-logo"></div>
                </div>
                <div className="stock-overlay">
                    <div className="skeleton skeleton-name"></div>
                    <div className="skeleton skeleton-ticker"></div>
                    <div className="skeleton skeleton-price"></div>
                </div>
            </div>
        );
    }

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