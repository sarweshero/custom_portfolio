"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Download, Github, Linkedin, Mail } from "lucide-react"
import { useReducedMotion } from "@/components/providers/reduced-motion-provider"
import { VecnaButton } from "@/components/ui/vecna-button"
import { VecnaModal } from "@/components/ui/vecna-modal"

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { reducedMotion } = useReducedMotion()
  const [showModal, setShowModal] = useState(false)
  const [veinPulse, setVeinPulse] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const titleLetters = "SARWESHERO".split("")

  useEffect(() => {
    if (reducedMotion) return
    const interval = setInterval(() => {
      setVeinPulse((prev) => (prev + 0.1) % (Math.PI * 2))
    }, 50)
    return () => clearInterval(interval)
  }, [reducedMotion])

  const handleDownload = () => {
    setShowModal(true)
    const link = document.createElement("a")
    link.href = "/sarwesh_resume1.pdf"
    link.download = "sarwesh_resume.pdf"
    link.click()
  }

  const socialLinks = [
    { icon: Github, href: "https://github.com/sarweshero", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/sarweshero", label: "LinkedIn" },
    { icon: Mail, href: "mailto:sarweshero@gmail.com", label: "Email" },
  ]

  const glowIntensity = 0.5 + Math.sin(veinPulse) * 0.3

  return (
    <motion.section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
      initial={{ rotateX: 180, opacity: 0 }}
      whileInView={{ rotateX: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="absolute inset-0 -z-10">
        {/* Central pulsing vein glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: `radial-gradient(ellipse at center, rgba(229,9,20,${0.1 * glowIntensity}) 0%, rgba(58,10,32,${0.05 * glowIntensity}) 40%, transparent 70%)`,
          }}
          animate={reducedMotion ? {} : { scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        {/* Secondary atmospheric glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(26,5,16,0.5) 0%, transparent 60%)",
          }}
        />
      </div>

      <motion.div style={{ y: reducedMotion ? 0 : y, opacity }} className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          className="mb-6 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex justify-center flex-wrap">
            {titleLetters.map((letter, i) => (
              <motion.span
                key={i}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-[#E50914] font-serif inline-block"
                initial={{ y: 100, opacity: 0, rotateX: -90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{
                  delay: 0.8 + i * 0.08,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={
                  reducedMotion
                    ? {}
                    : {
                        scale: 1.1,
                        textShadow: "0 0 40px rgba(229,9,20,1), 0 0 80px rgba(229,9,20,0.8)",
                        transition: { duration: 0.2 },
                      }
                }
                style={{
                  textShadow: `0 0 20px rgba(229,9,20,${0.6 + glowIntensity * 0.4}), 0 0 40px rgba(229,9,20,${0.3 + glowIntensity * 0.2}), 0 0 80px rgba(229,9,20,${0.1 + glowIntensity * 0.1})`,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-[#DADADA] font-mono mb-4 tracking-wide"
          initial={{ opacity: 0, y: 20, rotateX: 180 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
          style={{ textShadow: "0 0 10px rgba(229,9,20,0.2)" }}
        >
          Full Stack Developer & AI/ML Engineer
        </motion.p>

        {/* Institution */}
        <motion.p
          className="text-sm sm:text-base text-[#666666] font-mono mb-8"
          initial={{ opacity: 0, rotateX: 180 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
        >
          Karpagam Academy of Higher Education
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30, rotateX: 180 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ delay: 2.2, duration: 0.8, ease: "easeOut" }}
        >
          <VecnaButton onClick={handleDownload} size="lg" glowIntensity="high" className="group">
            <span className="flex items-center gap-2">
              <Download size={20} />
              Download Resume
            </span>
          </VecnaButton>

          <VecnaButton
            variant="secondary"
            size="lg"
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get In Touch
          </VecnaButton>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-6"
          initial={{ opacity: 0, rotateX: 180 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
        >
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-[#2a0a15] text-[#666] hover:text-[#E50914] hover:border-[#E50914] transition-all duration-300 relative overflow-hidden"
              whileHover={
                reducedMotion
                  ? {}
                  : {
                      scale: 1.2,
                      boxShadow: "0 0 25px rgba(229,9,20,0.5), 0 0 50px rgba(229,9,20,0.2)",
                    }
              }
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 + i * 0.1 }}
              aria-label={social.label}
            >
              <social.icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={reducedMotion ? {} : { y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div
            className="w-6 h-10 border-2 border-[#E50914]/50 rounded-full flex justify-center pt-2"
            style={{
              boxShadow: `0 0 ${10 + glowIntensity * 10}px rgba(229,9,20,${0.2 + glowIntensity * 0.2})`,
            }}
          >
            <motion.div
              className="w-1.5 h-3 bg-[#E50914] rounded-full"
              animate={reducedMotion ? {} : { y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </motion.div>
      </motion.div>

      <VecnaModal isOpen={showModal} onClose={() => setShowModal(false)} title="FILE ACCESSED">
        <div className="text-center">
          <motion.div
            className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-[#E50914] flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring" }}
            style={{ boxShadow: "0 0 30px rgba(229,9,20,0.4)" }}
          >
            <Download className="w-10 h-10 text-[#E50914]" />
          </motion.div>
          <p className="text-[#DADADA] font-mono text-sm mb-4">Resume download initiated successfully.</p>
          <p className="text-[#666] text-xs font-mono">sarwesh_resume.pdf</p>
        </div>
      </VecnaModal>
    </motion.section>
  )
}
