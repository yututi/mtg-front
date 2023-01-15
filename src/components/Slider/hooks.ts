import { MutableRefObject, useEffect, useRef, useState } from "react"

export const useParentWidthSyncronizer = (initialWidth: number, parentRef: MutableRefObject<HTMLElement | undefined>) => {
  const [width, setWidth] = useState(initialWidth)
  useEffect(() => {
    const syncWidth = () => {
      setWidth(parentRef.current?.parentElement?.clientWidth || 0)
    }
    window.addEventListener("resize", syncWidth)
    syncWidth()
    return () => {
      window.removeEventListener("resize", syncWidth)
    }
  })
  return width
}

export const useHorizontalScroll = (scrollIntensity: number) => {
  const ref = useRef<HTMLElement>()

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current

    const horizontalScroll = (e: WheelEvent) => {
      if (e.deltaX === 0) {
        el.scrollLeft = el.scrollLeft + e.deltaY * scrollIntensity;
        e.preventDefault();
      }
    }
    el.addEventListener("wheel", horizontalScroll);

    return () => {
      el.removeEventListener("wheel", horizontalScroll);
    }
  })

  return ref
}