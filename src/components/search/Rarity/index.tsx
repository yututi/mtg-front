import SearchConditionContext, { SearchConditionUpdateContext } from "@/state/SearchConditionContext"
import { ChangeEvent, useContext } from "react"


const rarityMap = {
  common: "コモン",
  uncommon: "アンコモン",
  rare: "レア",
  mythic: "神話レア"
} as const

const entries = Object.entries(rarityMap)

const Rarity = () => {

  const { rarity } = useContext(SearchConditionContext)
  const update = useContext(SearchConditionUpdateContext)
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const target = e.currentTarget
    update(conditions => ({
      ...conditions,
      rarity: [...target.selectedOptions].map(o => o.value)
    }))
  }

  return (
    <select value={rarity} multiple onChange={onChange}>
      {entries.map(([k, v]) => (
        <option key={k} value={k}>{v}</option>
      ))}
    </select>
  )
}

export default Rarity