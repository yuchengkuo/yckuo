import { useViewportScroll } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [distY, setDistY] = useState(0)
  const { scrollY, scrollYProgress } = useViewportScroll()

  useEffect(() => {
    const unSubsProgree = scrollYProgress.onChange((current) => setProgress(current))
    const unSubsDistance = scrollY.onChange((current) => setDistY(current))

    return () => {
      unSubsDistance()
      unSubsProgree()
    }
  })
  return { progress, distY }
}
