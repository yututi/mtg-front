import React, { PropsWithChildren } from "react"
import style from "./style.module.css"

// TODO コンポーネントである必要がない
const Sheet: React.FC<PropsWithChildren<JSX.IntrinsicElements["div"]>> = ({ children, className, ...props }) => {

  return (
    <div className={[style.sheet, className].join(" ")} {...props}>
      {children}
    </div>
  )
}

export default Sheet