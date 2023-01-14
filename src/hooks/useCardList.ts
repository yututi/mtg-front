import useSWR from "swr"
import { CardApi } from "../lib/gen/axios"

const api = new CardApi()

type CardListParams = {
  page: number
  name?: string
  color?: string[]
  cost?: string
  types?: string[]
  rarity?: string[]
  setCode?: string[]
}

const useCardList = (param: CardListParams) => {

  const result = useSWR(JSON.stringify(param), () => {

    return api.getList(
      param.page,
      param.name,
      param.color as Array<'B' | 'W' | 'U' | 'G' | 'R' | 'NONE'>,
      param.cost,
      param.types,
      param.rarity,
      param.setCode).then(res => res.data)
  }, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })

  return result
}

export default useCardList;