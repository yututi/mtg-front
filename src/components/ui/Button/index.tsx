import { PropsWithChildren } from "react"
import style from "./style.module.scss"

type Props = {
  onClick?: () => void
  disabled?: boolean
}

const Button: React.FC<PropsWithChildren<Props>> = ({ onClick, children, disabled = false }) => {

  return (
    <button disabled={false} className={style.button} onClick={onClick}>{children}</button>
  )
}

export default Button