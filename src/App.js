import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  /*{"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false}*/
    /*{"src": "/img/A.png", matched: false},
    {"src": "/img/B.png", matched: false},
    {"src": "/img/C.png", matched: false},
    {"src": "/img/D.png", matched: false},
    {"src": "/img/E.png", matched: false},
    {"src": "/img/F.png", matched: false}*/
    {"letter": "A", matched: false},
    {"letter": "B", matched: false},
    {"letter": "C", matched: false},
    {"letter": "D", matched: false},
    {"letter": "E", matched: false},
    {"letter": "F", matched: false},
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //shuffle cards (duplicate, randomize, and creat ids)
const shuffleCards = () => {
  const shuffledCards = [...cardImages, ...cardImages]
  .sort(() => Math.random() - 0.5)
  .map((card) => ({...card, id: Math.random()}))

  setChoiceOne(null)
  setChoiceTwo(null)
  setCards(shuffledCards)
  setTurns(0)
}
  //handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare 2 selected cards
  useEffect ( () => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true }
            }
            else {
              return card
            }
          })
        })
        resetTurn()
      }
      else { 
        setTimeout(() => resetTurn(), 1000)
        }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  //reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //start new game automatically
  useEffect(()=> {
    shuffleCards()
  }, [])
  return (
    <div className="App">
      <h1>Alphabet Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key = {card.id} 
            card = {card}
            handleChoice = {handleChoice}
            flipped ={card ===choiceOne || card ===choiceTwo || card.matched}
            disabled = {disabled}
            matched = {card.matched}
            />
         ))}
      </div>
      <p>Turns: {turns} </p>
    </div>
  );
}

export default App