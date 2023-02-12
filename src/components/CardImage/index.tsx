import React, { CSSProperties, useState } from "react"
import Image from "next/image"
import { Card } from "@/lib/gen/axios"
import styles from "./style.module.css"
import flex from "@/styles/flex.module.scss"

export const SIZES = {
  sm: {
    height: 209,
    width: 150
  },
  lg: {
    height: 340,
    width: 244
  }
} as const
type Size = {
  size: keyof typeof SIZES
}

type Fill = {
  fill: true
}

type Props = {
  uuid: string,
  name: string,
  onError?: () => void,
  suspend?: boolean
}

type SizeProps = Props & Size
type FillProps = Props & Fill

type LoadingState = "loading" | "done" | "failed"

const containerClass = [styles.container, flex.vertical].join(" ")

const CardImage: React.FC<SizeProps | FillProps> = ({ uuid, name, onError, suspend = false, ...props }) => {

  const [loadingState, setLoadingState] = useState<LoadingState>("loading")

  const onErrorFacade = () => {
    onError && onError()
    setLoadingState("failed")
  }

  const isFill = "fill" in props

  const style = isFill ? getFillStyle() : getStyleBySize(SIZES[props.size])

  const size = (isFill || props.size === "lg") ? "lg" : "md"

  const sizeProp = isFill ? props : SIZES[props.size]

  return (
    <div className={containerClass} style={style}>
      {loadingState !== "failed" && !suspend && (
        <Image
          className={styles.img}
          unoptimized
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${size}/${uuid}.webp`}
          alt={name}
          {...sizeProp}
          onLoad={() => setLoadingState("done")}
          onError={onErrorFacade}
        />
      )}

      {(loadingState !== "done" || suspend) && (
        <div className={[styles.dummyCard, flex.itemGrow].join(" ")}>
          <p>
            {name}
          </p>
        </div>
      )}
    </div>
  )
}

const getStyleBySize = ({ height, width }: { height: number, width: number }): CSSProperties => {
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