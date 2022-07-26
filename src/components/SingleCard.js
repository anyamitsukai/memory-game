import './SingleCard.css'

function SingleCard( {card, handleChoice, flipped, disabled, matched}) {
    const handleClick = () => {
        if(!disabled){
            handleChoice(card)
        }
    }
    return (
        <div className="card">
            <div className = {matched? "matched" : ""}>
                <div className = {flipped ? "flipped" : ""}>
                    <img className="front" src={card.src} alt="card front" />
                    <img 
                        className="back" 
                        src="/img/cover.png" 
                        onClick = {handleClick} 
                        alt="card back" />
                </div>
            </div>
            
        </div> 
    )
}

export default SingleCard

