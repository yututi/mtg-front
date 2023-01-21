import { useSpring, animated, useTransition } from '@react-spring/web'
import React, { ChangeEvent, PropsWithChildren, SelectHTMLAttributes, useCallback, useContext, useEffect, useRef } from "react"
import styles from "./style.module.scss"


type Props = {
  isVisible: boolean
  offsetX?: boolean
  offsetY?: boolean
  x?: "left" | "right"
  y?: "top" | "bottom"
}

const Popup: React.FC<PropsWithChildren<Props>> = ({
  isVisible,
  children,
  offsetX = false,
  offsetY = false,
  x = "left",
  y = "bottom"
}) => {

  const transitions = useTransition(isVisible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 100,
    }
  });

  const className = [styles.popup, styles[`${offsetY ? "offset" : "stick"}-${y}`], styles[`${offsetX ? "offset" : "stick"}-${x}`]].join(" ")

  return (
    transitions((style, isVisible) => {
      return (
        isVisible && <animated.div style={style} className={className}>
          {children}
        </animated.div>
      )
    })
  )
}

export default Popup