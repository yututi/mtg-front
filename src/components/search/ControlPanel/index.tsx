import Types from "../Types"
import Rarity from "../Rarity"
import Colors from "../Colors"
import ManaCost from "../ManaCost"
import styles from "./style.module.css"
import flex from "@/styles/flex.module.scss"

const ControlPanel = () => {

  return (
    <div className={[styles.controlPanel, flex.horizontalIfMd].join(" ")}>
      <Types />
      <Rarity />
      <Colors />
      <ManaCost />
    </div>
  )
}

export default ControlPanel