
import { Condition } from "@/types/SearchCondition"
import { useContext } from "react"
import useSWR from "swr"
import { CardApi } from "../lib/gen/axios"
import { useSearchCondition } from "./useSearchCondition"

const api = new CardApi()

type CardListParams = {
  page: number
}

const useCardList = (param: CardListParams) => {

  const conditions = useSearchCondition()

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