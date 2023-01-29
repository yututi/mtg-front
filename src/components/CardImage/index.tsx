import React, { CSSProperties, useState } from "react"
import Image from "next/image"
import { Card } from "@/lib/gen/axios"
import styles from "./style.module.css"
import flex from "@/styles/flex.module.scss"
import Skeleton from "../Skeleton"

type Props = {
  card: Card
  onClick?: () => void
  onError?: () => void
  height: number
  width: number
}

type LoadingState = "loading" | "done" | "failed"

const containerClass = [styles.container, flex.vertical].join(" ")

const CardImage: React.FC<Props> = ({ card, height, width, onClick, onError }) => {

  const size = height > 250 ? "lg" : "md"

  const style: CSSProperties = {
    borderRadius: `${size === "lg" ? 12 : 8}px`,
    height: `${height}px`,
    width: `${width}px`,
    cursor: onClick ? "hover" : "initial",
    boxShadow: onClick ? "0 0 2 2 rgba(0, 0, 0, 0.1)" : ""
  }

  const [loadingState, setLoadingState] = useState<LoadingState>("loading")

  const onErrorFacade = () => {
    onError && onError()
    setLoadingState("failed")
  }

  return (
    <div className={containerClass} style={style}>
      {loadingState !== "done" && (
        <div className={[styles.dummyCard, flex.itemGrow].join(" ")}>
          <p>
            {card.name}
          </p>
        </div>
      )}
      {loadingState !== "failed" && (
        <Image
          className={styles.img}
          unoptimized
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${size}/${card.uuid}.webp`}
          alt={card.name}
          height={height}
          width={width}
          onLoad={() => setLoadingState("done")}
          onError={onErrorFacade}
        />
      )}

    </div>
  )
}

export default CardImage