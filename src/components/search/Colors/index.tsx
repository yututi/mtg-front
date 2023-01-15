import SearchConditionContext, { SearchConditionUpdateContext } from "@/state/SearchConditionContext"
import { ChangeEvent, useContext } from "react"


const colorMap = {
  B: "黒",
  R: "赤",
  U: "青",
  G: "緑",
  W: "白",
  NONE: "無色"
} as const

const entries = Object.entries(colorMap)

const Colors = () => {

  const { colors } = useContext(SearchConditionContext)
  const update = useContext(SearchConditionUpdateContext)
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const target = e.currentTarget
    update(conditions => ({
      ...conditions,
      colors: [...target.selectedOptions].map(o => o.value)
    }))
  }

  return (
    <select value={colors} multiple onChange={onChange}>
      {entries.map(([k, v]) => (
        <option key={k} value={k}>{v}</option>
      ))}
    </select>
  )
}

export default Colors
