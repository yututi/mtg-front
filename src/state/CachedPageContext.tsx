import { createCtx } from "./createContext"

type CachedPage = {
  value: Set<number>
}

const [
  ctx,
  updateCtx,
  provider
] = createCtx<CachedPage>({ value: new Set() })

export default ctx
export const CachedPageUpdateContext = updateCtx
export const CachedPageProvider = provider
