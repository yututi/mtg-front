import Types from "../Types"
import Rarity from "../Rarity"
import Colors from "../Colors"
import ManaCost from "../ManaCost"
import styles from "./style.module.css"
import flex from "@/styles/flex.module.scss"
import { memo, useContext } from "react"
import Button from "@/components/ui/Button"
import TempSearchConditionContext, { TempSearchConditionProvider } from "@/state/TempSearchConditionContext"
import { useUpdateSearchCondition } from "@/hooks/useSearchCondition"

const ControlPanel = () => {

  return (
    <div>
      <TempSearchConditionProvider>
        <div className={[styles.controlPanel, flex.horizontalIfMd, flex.gap].join(" ")}>
          <div className={[flex.vertical, flex.gap].join(" ")}>
            <Types />
            <Rarity />
            <Colors />
          </div>
          <div>
            <ManaCost />
          </div>
        </div>
        <div className={[flex.horizontal, flex.gap, flex.justfyEnd].join(" ")}>
          <SearchButton />
        </div>
      </TempSearchConditionProvider>
    </div>
  )
}

const SearchButton = () => {

  const tempConditions = useContext(TempSearchConditionContext)

  const update = useUpdateSearchCondition()

  const onClick = () => {
    update(tempConditions)
  }

  return (
    <Button onClick={onClick}>検索</Button>
  )
}

export default memo(ControlPanel)