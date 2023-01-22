import MultiSelect from "@/components/ui/MultiSelect"
import TempSearchConditionContext, { TempSearchConditionUpdateContext } from "@/state/TempSearchConditionContext"
import { ChangeEvent, useContext } from "react"


const rarityMap = {
  common: "コモン",
  uncommon: "アンコモン",
  rare: "レア",
  mythic: "神話レア"
} as const

const Rarity = () => {

  const { rarity } = useContext(TempSearchConditionContext)
  const update = useContext(TempSearchConditionUpdateContext)
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