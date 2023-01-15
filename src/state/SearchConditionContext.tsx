import { createCtx } from "./createContext"

type Condition = {
  text: string | null
  types: string[]
  manaCost: number
  manaCostCompare: string
  colors: string[]
  rarity: string[]
  setCode: string[]
}

const [
  ctx,
  updateCtx,
  provider
] = createCtx<Condition>({
  colors: [],
  manaCost: 1,
  manaCostCompare: "gte",
  text: null,
  types: [],
  rarity: [],
  setCode: []
})

export default ctx
export const SearchConditionUpdateContext = updateCtx
export const SearchConditionProvider = provider
