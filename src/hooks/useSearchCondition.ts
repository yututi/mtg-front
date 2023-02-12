
import { getInitialCondition } from "@/state/TempSearchConditionContext"
import { Condition } from "@/types/SearchCondition"
import { isEmptyObj } from "@/utils"
import { useRouter } from "next/router"
import { useCallback, useMemo } from "react"


export const useSearchCondition = () => {
  const router = useRouter()
  const query = useMemo(() => {

    if (isEmptyObj(router.query)) return getInitialCondition()

    return {
      colors: toArray(router.query.colors),
      manaCost: router.query.manaCost,
      manaCostCompare: router.query.manaCostCompare,
      rarity: toArray(router.query.rarity),
      setCode: toArray(router.query.setCode),
      text: router.query.text || "",
      types: toArray(router.query.types)
    }
  }, [router.query])
  return query as unknown as Condition
}

const toArray = (value: string | string[] | undefined) => {
  if (!value) return []
  return typeof value === "string" ? [value] : value
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
