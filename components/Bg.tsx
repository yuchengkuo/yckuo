import {
  domAnimation,
  LazyMotion,
  m,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Bg() {
  const [isVisible, setVisible] = useState(false)
  const posX = useSpring(0, { damping: 50 })
  const Y = useSpring(0, { damping: 50 })
  const posY = useTransform(Y, [0, 1], [400, -400])
  const shouldReducedMotion = useReducedMotion()
  useEffect(() => {
    const body = document.querySelector('body')
    body.addEventListener('mousemove', (e) => {
      posX.set((e.clientX / window.innerWidth) * -240)
      Y.set(e.clientY / window.innerHeight)
    })
    body.addEventListener('keydown', (e) => {
      if (isVisible && e.key === 'Escape') setVisible(false)
    })
  })
  return (
    <LazyMotion features={domAnimation}>
      {!shouldReducedMotion && (
        <div className="fixed h-screen w-screen overflow-hidden pointer-events-none">
          <m.div
            className="absolute rounded-full bg-marine6 dark:bg-cheese5"
            style={{
              x: posX,
              y: posY,
              width: '160vw',
              height: '160vh',
              left: '98vw',
              top: '-30vh',
              filter: 'blur(160px) opacity(0.8)',
              zIndex: -10,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
          />
        </div>
      )}
    </LazyMotion>
  )
}
