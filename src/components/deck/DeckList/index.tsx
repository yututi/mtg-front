import DeckListContext, { DeckListUpdateContext } from "@/state/DeckListContext"
import { useContext } from "react"


const DeckList = () => {

  const { cards } = useContext(DeckListContext)

  return (
    <div>
      {cards.map(card => (
        <div>{card.name}</div>
      ))}
    </div>
  )
}

export default DeckList