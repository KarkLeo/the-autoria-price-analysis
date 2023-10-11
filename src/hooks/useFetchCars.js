import { useCallback } from 'react'
import axios from 'axios'
import { paginateURL } from '../tools/paginateURL'
import { parseCars } from '../tools/parseCars'

export const useFetchCars = (
  url,
  setCars,
  setLoading,
  setLoadedCount,
  setIsError
) => {
  return useCallback(async () => {
    setLoading(true)
    setCars([])
    setLoadedCount(0)
    setIsError(false)
    const fetch = async (pageIndex = 0) => {
      try {
        console.log(`Try to fetch page ${pageIndex + 1}`)
        const response = await axios.get(paginateURL(url, pageIndex))
        console.log(`Fetch page ${pageIndex + 1} success`)

        console.log(`Try to parse page ${pageIndex + 1}`)
        const data = parseCars(response.data)
        console.log(`Parse page ${pageIndex + 1} success`)

        if (data.length > 0) {
          setCars((pre) => [...pre, ...data])
          setLoadedCount((pre) => pre + data.length)
          console.log(`Page ${pageIndex + 1} added to state`)

          console.log(`Try to fetch next page`)
          await fetch(pageIndex + 1)
        } else {
          console.log(`Page ${pageIndex + 1} is empty. End of fetching`)
          setLoading(false)
        }
      } catch (e) {
        console.log(e)
        setIsError(true)
        setLoading(false)
        setCars([])
        setLoadedCount(0)
      }
    }
    await fetch()
  }, [url, setCars, setLoading, setLoadedCount, setIsError])
}
