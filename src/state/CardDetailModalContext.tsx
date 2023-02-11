import { useContext } from "react"
import { createCtx } from "./createContext"

type CardDetailModal = {
  uuid?: string
}

const [
  ctx,
  updateCtx,
  provider
] = createCtx<CardDetailModal>({})

export default ctx
export const CardDetailModalUpdateContext = updateCtx
export const CardDetailModalProvider = provider

export const useCardDetailModal = () => {

  const update = useContext(updateCtx)

  return {
    open: (uuid: string) => {
      update({
        uuid
      })
    },
    close: () => {
      update({})
    }
  }
}