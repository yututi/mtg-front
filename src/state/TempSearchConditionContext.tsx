import { createCtx } from "./createContext"

import { Condition } from "@/types/SearchCondition"

// TODO SearchConditionContextと同じなので使いまわしたい
// 検索条件を一時的に保持するために使う


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
export const TempSearchConditionUpdateContext = updateCtx
export const TempSearchConditionProvider = provider
