import { useEffect, RefObject } from 'react'

type Callback = () => void

export function useReachBottom<T extends HTMLElement>(
  listRef: RefObject<T>,
  onReachBottom: Callback
) {
  useEffect(() => {
    if (!listRef || !listRef.current) return

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        onReachBottom()
      }
    }, { threshold: 1.0 })

    const sentryElement = document.createElement('div')
    listRef.current.appendChild(sentryElement)
    observer.observe(sentryElement)

    return () => {
      if (sentryElement) {
        observer.unobserve(sentryElement)
        listRef.current?.removeChild(sentryElement)
      }
      observer.disconnect()
    }
  }, [listRef, onReachBottom])
}