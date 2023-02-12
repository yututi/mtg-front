import { createCtx } from "./createContext"

import { Condition } from "@/types/SearchCondition"

// TODO SearchConditionContextと同じなので使いまわしたい
// 検索条件を一時的に保持するために使う

export const getInitialCondition = () => ({
  colors: [],
  manaCost: 1,
  manaCostCompare: "gte",
  text: null,
  types: [],
  rarity: [],
  setCode: []
})

const [
  ctx,
  updateCtx,
  provider
] = createCtx<Condition>(getInitialCondition())

export default ctx
export const TempSearchConditionUpdateContext = updateCtx
export const TempSearchConditionProvider = provider
