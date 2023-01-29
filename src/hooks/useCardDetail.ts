import useSWR from "swr"
import { CardApi } from "../lib/gen/axios"

const api = new CardApi()

type CardListParams = {
  uuid: string
}

const useCardDetail = (param: CardListParams) => {

  const result = useSWR(
    JSON.stringify({ ...param }),
    () => api.getOne(param.uuid),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  return result
}

export default useCardDetail;