import { PropsWithChildren } from "react"
import style from "./style.module.css"

const Sheet: React.FC<PropsWithChildren<{ className?: string }>> = ({ className, children }) => {

  return (
    <div className={[style.sheet, className].join(" ")}>
      {children}
    </div>
  )
}

export default Sheet