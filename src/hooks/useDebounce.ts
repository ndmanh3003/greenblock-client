import { useCallback, useRef } from 'react'

export const useDebounce = <T>(fn: (value: T) => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  return useCallback(
    (value: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        fn(value)
      }, delay)
    },
    [fn, delay]
  )
}
