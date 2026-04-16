import { useRef, useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

function useGlobalMousePosition() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      mouseX.set(nx)
      mouseY.set(ny)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return { mouseX, mouseY }
}

export function HeroScene() {
  const { mouseX, mouseY } = useGlobalMousePosition()

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const rotateX = useTransform(smoothY, [-1, 1], [20, -20])
  const rotateY = useTransform(smoothX, [-1, 1], [-20, 20])

  const moveX = useTransform(smoothX, [-1, 1], [-18, 18])
  const moveY = useTransform(smoothY, [-1, 1], [-12, 12])

  const moveX2 = useTransform(smoothX, [-1, 1], [10, -10])
  const moveY2 = useTransform(smoothY, [-1, 1], [8, -8])

  return (
    <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 w-[480px] h-[480px] hidden lg:flex items-center justify-center pointer-events-none select-none z-0">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
        className="relative w-[380px] h-[380px]"
      >
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ x: moveX, y: moveY }}
          className="absolute inset-0 rounded-full border border-[#F5E663]/40"
        />

        {/* Middle tilted ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          style={{ x: moveX2, y: moveY2 }}
          className="absolute inset-8 rounded-full border border-[#F5E663]/25"
        >
          {/* Dot on ring */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#F5E663]" />
        </motion.div>

        {/* Inner ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-16 rounded-full border border-gray-200/60"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gray-300" />
        </motion.div>

        {/* Central accent sphere */}
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-[120px] rounded-full bg-gradient-to-br from-[#F5E663]/20 via-[#F5E663]/5 to-transparent border border-[#F5E663]/30"
        />

        {/* Floating accent dots orbiting */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <div className="absolute top-[10%] left-1/2 w-1.5 h-1.5 rounded-full bg-[#F5E663]/70" />
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <div className="absolute bottom-[12%] right-[20%] w-1 h-1 rounded-full bg-gray-400/60" />
        </motion.div>

        {/* Corner geometric lines — top right */}
        <motion.svg
          style={{ x: moveX, y: moveY }}
          className="absolute -top-4 -right-4 opacity-30"
          width="80" height="80" viewBox="0 0 80 80" fill="none"
        >
          <line x1="0" y1="0" x2="80" y2="0" stroke="#F5E663" strokeWidth="0.8" />
          <line x1="80" y1="0" x2="80" y2="80" stroke="#F5E663" strokeWidth="0.8" />
          <line x1="40" y1="0" x2="80" y2="40" stroke="#F5E663" strokeWidth="0.5" strokeDasharray="4 4" />
        </motion.svg>

        {/* Corner geometric lines — bottom left */}
        <motion.svg
          style={{ x: moveX2, y: moveY2 }}
          className="absolute -bottom-4 -left-4 opacity-20 rotate-180"
          width="60" height="60" viewBox="0 0 60 60" fill="none"
        >
          <line x1="0" y1="0" x2="60" y2="0" stroke="#111111" strokeWidth="0.8" />
          <line x1="60" y1="0" x2="60" y2="60" stroke="#111111" strokeWidth="0.8" />
        </motion.svg>
      </motion.div>
    </div>
  )
}
