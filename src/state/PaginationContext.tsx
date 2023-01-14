import { createCtx } from "./createContext"

type Page = {
  page: number
  pageSize: number
  count: number
}

const [
  ctx,
  updateCtx,
  provider
] = createCtx<Page>({ count: 0, page: 0, pageSize: 0 })

export default ctx
export const PaginationUpdateContext = updateCtx
export const PaginationProvider = provider
