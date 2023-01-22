import MultiSelect from "@/components/ui/MultiSelect"
import TempSearchConditionContext, { TempSearchConditionUpdateContext } from "@/state/TempSearchConditionContext"
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

  const { types } = useContext(TempSearchConditionContext)
  const update = useContext(TempSearchConditionUpdateContext)
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