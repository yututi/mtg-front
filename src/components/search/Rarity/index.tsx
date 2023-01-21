import MultiSelect from "@/components/ui/MultiSelect"
import SearchConditionContext, { SearchConditionUpdateContext } from "@/state/SearchConditionContext"
import { ChangeEvent, useContext } from "react"


const rarityMap = {
  common: "コモン",
  uncommon: "アンコモン",
  rare: "レア",
  mythic: "神話レア"
} as const

const Rarity = () => {

  const { rarity } = useContext(SearchConditionContext)
  const update = useContext(SearchConditionUpdateContext)
  const onChange = (values: string[]) => {
    update(conditions => ({
      ...conditions,
      rarity: values
    }))
  }

  return (
    <MultiSelect values={rarity} options={rarityMap} onChange={onChange} />
  )
}

export default Rarity