import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export const useSelectedCardId = () => {

  const router = useRouter()

  const [id, setId] = useState<string | undefined | null>(null)

  useEffect(() => {
    const onHashChange = (url: string) => {
      const array = url.split("#")
      if (array.length > 1) {
        setId(array.pop())
      } else {
        setId(null)
      }
    }

    router.events.on("hashChangeStart", onHashChange)

    onHashChange(router.asPath)

    return () => {
      router.events.off("hashChangeStart", onHashChange)
    }
  }, [])

  return id
}

export const useUpdateSelectedCardId = () => {

  const router = useRouter()

  return (id?: string) => {
    router.push({
      hash: id,
      pathname: router.pathname,
      query: router.query
    }, undefined, {
      shallow: true
    })
  }
}