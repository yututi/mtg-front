import Types from "../Types"
import Rarity from "../Rarity"
import Colors from "../Colors"
import ManaCost from "../ManaCost"
import styles from "./style.module.css"
import flex from "@/styles/flex.module.scss"
import { memo, useContext, useEffect } from "react"
import Button from "@/components/ui/Button"
import TempSearchConditionContext, { TempSearchConditionProvider, TempSearchConditionUpdateContext } from "@/state/TempSearchConditionContext"
import { useSearchCondition, useUpdateSearchCondition } from "@/hooks/useSearchCondition"

const controlsClass = [styles.controlPanel, flex.horizontalIfMd, flex.gap].join(" ")
const controlActionsClass = [flex.horizontal, flex.gap, flex.justfyEnd].join(" ")

const ControlPanel = () => {

  return (
    <div>
      <TempSearchConditionProvider>
        <SyncronizeTempConditionToQuery />
        <div className={controlsClass}>
          <div className={[flex.vertical, flex.gap].join(" ")}>
            <Types />
            <Rarity />
            <Colors />
          </div>
          <div>
            <ManaCost />
          </div>
        </div>
        <div className={controlActionsClass}>
          <SearchButton />
        </div>
      </TempSearchConditionProvider>
    </div>
  )
}

// 最初のレンダリング時のみ、検索パネルの値をクエリと一致させる. 
// TempSearchConditionProviderの初期値に渡したいがrouter.queryはinitial renderingのタイミングで空なので...
const SyncronizeTempConditionToQuery = () => {

  const condition = useSearchCondition()
  const update = useContext(TempSearchConditionUpdateContext)

  useEffect(() => {
    if (Object.keys(condition).length === 0) return

    update((value) => {
      return {
        ...value,
        ...condition
      }
    })
  }, [condition])

  return null
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