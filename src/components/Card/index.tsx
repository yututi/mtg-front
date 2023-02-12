import React from "react"
import { Card } from "@/lib/gen/axios"
import styles from "./style.module.scss"
import flex from "@/styles/flex.module.scss"
import CardImage from "../CardImage"
import useMouseOver from "@/hooks/useMouseOver"
import Popup from "../ui/Popup"
import Button from "../ui/Button"
import { useUpdateSelectedCardId } from "@/hooks/useSelectedCardId"

type Props = {
  card: Card
  height: number
  width: number
  abstract?: boolean
}

const Card: React.FC<Props> = ({ card, abstract = false }) => {

  const { ref, isMouseOver } = useMouseOver()

  const updateSelectedCardId = useUpdateSelectedCardId()

  const onClick = () => {
    updateSelectedCardId(card.uuid)
  }

  return (
    <div ref={ref} className={styles.container} onClick={onClick}>
      <CardImage uuid={card.uuid} name={card.name} size="sm" suspend={abstract} />
      <div className={[styles.overlay, isMouseOver && styles.overlayVisible].join(" ")}></div>
      <CardActions card={card} isVisible={isMouseOver} />
    </div>
  )
}

type CardActionProps = {
  card: Card
  isVisible: boolean
}
const CardActions: React.FC<CardActionProps> = ({ card, isVisible }) => {

  return (
    <Popup isVisible={isVisible} y="top">
      <div className={[flex.vertical, flex.gap, styles.actions].join(" ")} >
        <Button size="sm">
          →
        </Button>
        {
          card.otherFaceUuid && (
            <Button size="sm">
              裏
            </Button>
          )
        }
      </div>
    </Popup>
  )
}

export default Card