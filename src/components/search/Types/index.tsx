import SearchConditionContext, { SearchConditionUpdateContext } from "@/state/SearchConditionContext"
import { ChangeEvent, useContext } from "react"


const typeMap = {
  Creature: "クリーチャー",
  Enchantment: "エンチャント",
  Artifact: "アーティファクト",
  Instant: "インスタント",
  Sorcery: "ソーサリー"
} as const

const typeEntries = Object.entries(typeMap)

const Types = () => {

  const { types } = useContext(SearchConditionContext)
  const update = useContext(SearchConditionUpdateContext)
  console.log("render type")
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log("on change")
    const target = e.currentTarget
    update(conditions => ({
      ...conditions,
      types: [...target.selectedOptions].map(o => o.value)
    }))
  }

  return (
    <select value={types} multiple onChange={onChange}>
      {typeEntries.map(([k, v]) => (
        <option key={k} value={k}>{v}</option>
      ))}
    </select>
  )
}

export default Types