import React, { CSSProperties, useState } from "react"
import Image from "next/image"
import { Card } from "@/lib/gen/axios"
import styles from "./style.module.css"
import flex from "@/styles/flex.module.scss"

type Size = {
  height: number
  width: number
}

type Fill = {
  fill: true
}

type Props = {
  card: Card
  onError?: () => void
}

type SizeProps = Props & Size
type FillProps = Props & Fill

type LoadingState = "loading" | "done" | "failed"

const containerClass = [styles.container, flex.vertical].join(" ")

const CardImage: React.FC<SizeProps | FillProps> = ({ card, onError, ...props }) => {

  const [loadingState, setLoadingState] = useState<LoadingState>("loading")

  const onErrorFacade = () => {
    onError && onError()
    setLoadingState("failed")
  }

  const isFill = "fill" in props

  const style = isFill ? getFillStyle() : getStyleBySize(props.height, props.width)

  const size = (isFill || props.height > 250) ? "lg" : "md"

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
          {...props}
          onLoad={() => setLoadingState("done")}
          onError={onErrorFacade}
        />
      )}

    </div>
  )
}

const getStyleBySize = (height: number, width: number): CSSProperties => {
  return {
    height: `${height}px`,
    width: `${width}px`,
  }
}
const getFillStyle = (): CSSProperties => {
  return {
    height: `100%`,
    width: "auto",
    aspectRatio: `488/680`,
  }
}

export default CardImage