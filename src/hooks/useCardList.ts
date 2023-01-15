import SearchConditionContext from "@/state/SearchConditionContext"
import { useContext } from "react"
import useSWR from "swr"
import { CardApi } from "../lib/gen/axios"

const api = new CardApi()

type CardListParams = {
  page: number
  setCode?: string[]
}

const useCardList = (param: CardListParams) => {

  const conditions = useContext(SearchConditionContext)

  const result = useSWR(JSON.stringify({ ...param, ...conditions }), () => {

    return api.getList(
      param.page,
      conditions.text || undefined,
      conditions.colors as Array<'B' | 'W' | 'U' | 'G' | 'R' | 'NONE'>,
      `${conditions.manaCostCompare}:${conditions.manaCost}`,
      conditions.types,
      conditions.rarity,
      conditions.setCode).then(res => res.data)
  }, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })

  return result
}

export default useCardList;