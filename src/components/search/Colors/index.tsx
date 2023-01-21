import MultiSelect from "@/components/ui/MultiSelect"
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

const Colors = () => {

  const { colors } = useContext(SearchConditionContext)
  const update = useContext(SearchConditionUpdateContext)
  const onChange = (values: string[]) => {
    update(conditions => ({
      ...conditions,
      colors: values
    }))
  }

  return (
    <MultiSelect values={colors} options={colorMap} onChange={onChange} />
  )
}

export default Colors
