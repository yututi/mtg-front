import Types from "../Types"
import Rarity from "../Rarity"
import Colors from "../Colors"
import ManaCost from "../ManaCost"
import styles from "./style.module.css"

const ControlPanel = () => {

  return (
    <div className={styles.controlPanel}>
      <Types />
      <Rarity />
      <Colors />
      <ManaCost />
    </div>
  )
}

export default ControlPanel