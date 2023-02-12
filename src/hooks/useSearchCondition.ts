
import { Condition } from "@/types/SearchCondition"
import { useRouter } from "next/router"
import { useCallback, useEffect, useMemo } from "react"


export const useSearchCondition = () => {
  const router = useRouter()
  return router.query as unknown as Condition
}

export const useUpdateSearchCondition = () => {

  const router = useRouter()
  const updateQueries = useCallback((conditions: Condition) => {
    router.push({
      pathname: "/",
      query: conditions
    }, undefined, { shallow: true })
  }, [])

  return updateQueries
}
