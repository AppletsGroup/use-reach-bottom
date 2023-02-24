A React Hook which invoke a callback when reaching to bottom.

Code is wrote by ChatGPT.

Installation

```
yarn add use-reach-bottom
```
or
```
npm install use-reach-bottom
```

Usage

```
import { useReachBottom } from 'use-reach-bottom'

export default function() {
  const containerRef = useRef(null)

  useReachBottom(containerRef, () => {
    // TODO Something when reaching bottom
  })

  return (
    <div ref={containerRef}>
      <div>some long content</div>
    </div>
  )
}
```