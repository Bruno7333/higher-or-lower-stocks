import StockCard from './StockCard.jsx'

function GameComponent({stock1}, {stock2}){
    return(
        <>
            <StockCard stock={stock1}/>
            <StockCard stock={stock2}/>
        </>
    );

}