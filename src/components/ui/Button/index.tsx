import { PropsWithChildren } from "react"
import style from "./style.module.scss"

type Props = {
  onClick?: () => void
  disabled?: boolean
  size?: "md" | "sm"
}

const Button: React.FC<PropsWithChildren<Props>> = ({ onClick, children, disabled = false, size = "md" }) => {

  return (
    <button
      disabled={disabled}
      className={[style.button, size === "sm" && style.small].filter(Boolean).join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button