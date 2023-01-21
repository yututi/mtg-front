import { Card } from "@/lib/gen/axios"
import { createCtx } from "./createContext"

type CachedPage = {
  cards: Card[]
}

const [
  ctx,
  updateCtx,
  provider
] = createCtx<CachedPage>({ cards: [] })

export default ctx
export const DeckListUpdateContext = updateCtx
export const DeckListProvider = provider
