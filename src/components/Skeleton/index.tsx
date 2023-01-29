import { ComponentPropsWithRef } from "react"
import styles from "./style.module.scss"

type Props = ComponentPropsWithRef<"div"> & {
  animation?: boolean
}

const Skeleton: React.FC<Props> = ({ animation, className, ...props }) => {

  return (
    <div {...props} className={[className, styles.skeleton, animation && styles.animation].join(" ")}>
    </div>
  )
}

export default Skeleton