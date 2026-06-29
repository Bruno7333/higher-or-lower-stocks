function StockCard({stock}){
    return (
        <div className="stock-card">
            <div className="company-logo">
                <img src={stock.imgurl} alt={stock.title} />
            </div>
            <div className="stock-overlay">
                <div className="company-name">
                    {stock.name}
                </div>
                <div className="company-ticker">
                    {stock.ticker}
                </div>
            </div>

        </div>
    );
}

export default StockCard