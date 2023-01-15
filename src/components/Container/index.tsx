import { PropsWithChildren } from "react";
import styles from "./style.module.css"

const Container = ({ children }: PropsWithChildren) => (
  <div className={styles.container}>
    {children}
  </div>
)

export default Container