function StockCard({stock}){
    return (
        <div className="stock-card">
            <div className="company-logo">
                <img src={stock.imgurl} alt={stock.title} />

            </div>

        </div>
    );
}