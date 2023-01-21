import MultiSelect from "@/components/ui/MultiSelect"
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
  const onChange = (values: string[]) => {
    update(conditions => ({
      ...conditions,
      types: values
    }))
  }

  return (
    <MultiSelect values={types} options={typeMap} onChange={onChange} />
  )
}

export default Types