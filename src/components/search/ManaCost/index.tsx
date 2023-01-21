import SearchConditionContext, { SearchConditionUpdateContext } from "@/state/SearchConditionContext"
import { ChangeEvent, useContext } from "react"

const compareMap = {
  equals: "一致",
  gte: "以上",
  lte: "以下"
}

const compareEntries = Object.entries(compareMap)


const ManaCost = () => {

  const { manaCost, manaCostCompare } = useContext(SearchConditionContext)
  const update = useContext(SearchConditionUpdateContext)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    update(conditions => ({
      ...conditions,
      manaCost: target.valueAsNumber
    }))
  }

  const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    update(conditions => ({
      ...conditions,
      manaCostCompare: e.target?.value
    }))
  }

  return (
    <div>
      <div>
        {compareEntries.map(([k, v]) => (
          <label key={k} htmlFor={`compare_${k}`}>
            <input type="radio" checked={k === manaCostCompare} id={`compare_${k}`} radioGroup="a" value={k} onChange={onRadioChange} />
            {v}
          </label>
        ))}
      </div>
      <input type="range" min="0" max="15" value={manaCost} onChange={onChange} /> {manaCost}
    </div>
  )
}

export default ManaCost
