import { useEffect, useRef } from "react"

const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {

    const fireCallbackIfOutsideClicked = (e: Event) => {

      if (!(e.target instanceof HTMLElement)) return
      if (!ref.current?.contains(e.target)) {
        callback()
      }
    }

    document.body.addEventListener("click", fireCallbackIfOutsideClicked)

    return () => {
      document.body.removeEventListener("click", fireCallbackIfOutsideClicked)
    }
  }, [callback])

  return ref
}

export default useOutsideClick