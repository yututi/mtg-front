import { PropsWithChildren } from "react"
import style from "./style.module.scss"

type Props = {
  onClick?: () => void
}

const Button: React.FC<PropsWithChildren<Props>> = ({ onClick, children }) => {

  return (
    <button className={style.button} onClick={onClick}>{children}</button>
  )
}

export default Button