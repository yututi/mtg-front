import { useEffect, useRef } from "react"

const useOutsideClick = (onOutSideClicked: () => void) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {

    const onClick = (e: MouseEvent) => {

      console.log(e.target)
      if (!(e.target instanceof HTMLElement)) return
      if (!ref.current?.contains(e.target)) {
        onOutSideClicked()
      }
    }

    document.body.addEventListener("click", onClick)

    return () => {
      document.body.removeEventListener("click", onClick)
    }
  }, [onOutSideClicked])

  return ref
}

export default useOutsideClick