/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

export const useHandleRefetch = (
  refecth: unknown,
  deps?: unknown[],
  destroy?: () => boolean
) => {
  useEffect(
    () => {
      if (!refecth) return
      if (destroy && destroy()) return
      if (typeof refecth === 'function') refecth()
    },
    deps || [refecth]
  )
}
