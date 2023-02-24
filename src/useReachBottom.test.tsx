import { Renderer, renderHook, RenderHookResult } from "@testing-library/react-hooks"
import { useReachBottom } from './useReachBottom'
import {
  intersectionMockInstance,
  mockIsIntersecting,
} from 'react-intersection-observer/test-utils'

describe('useSimpleInfiniteScroll', () => {
  const target = document.createElement('div')
  const onReachBottom = jest.fn()
  let renderHookResult: RenderHookResult<unknown, void, Renderer<unknown>>

  beforeEach(() => {
    const listRef = { current: target }
    renderHookResult = renderHook(() => useReachBottom(listRef, onReachBottom))
  })

  it('should observe when reaching bottom', () => {
    const observer = intersectionMockInstance(target.lastElementChild!)

    expect(observer.unobserve).not.toHaveBeenCalled()
    expect(observer.observe).toHaveBeenCalledTimes(1)
    expect(observer.observe).toHaveBeenCalledWith(target.lastElementChild!)
  })

  it('should call onReachBottom when reaching bottom', () => {
    mockIsIntersecting(target.lastElementChild!, true)
    expect(onReachBottom).toHaveBeenCalledTimes(1)
  })

  it('should unobserve when list is unmounted', () => {
    const observer = intersectionMockInstance(target.lastElementChild!)

    const { unmount } = renderHookResult
    unmount()

    expect(observer.unobserve).toHaveBeenCalledTimes(1)
    // expect(observer.unobserve).toHaveBeenCalledWith(target.lastElementChild!);
  })
})