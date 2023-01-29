import { useEffect, useRef, useState } from "react"


const useMouseOver = () => {

  const ref = useRef<HTMLDivElement>(null)
  const [isMouseOver, setIsMouseOver] = useState(false)

  useEffect(() => {

    const onMouseEnter = () => {
      setIsMouseOver(true)
    }
    const onMouseLeave = () => {
      setIsMouseOver(false)
    }

    ref.current?.addEventListener("mouseenter", onMouseEnter)
    ref.current?.addEventListener("mouseleave", onMouseLeave)
    return () => {
      ref.current?.removeEventListener("mouseenter", onMouseEnter)
      ref.current?.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [])

  return { ref, isMouseOver } as const
}

export default useMouseOver