"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useReducedMotion } from "@/components/providers/reduced-motion-provider"
import SkillBadge from "@/components/ui/skill-badge"
import { VecnaCard } from "@/components/ui/vecna-card"

const skills = [
  { name: "Python", category: "backend" },
  { name: "JavaScript (ES6+)", category: "frontend" },
  { name: "SQL", category: "database" },
  { name: "C++", category: "backend" },
  { name: "Django", category: "backend" },
  { name: "Django REST Framework", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "React.js", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Vite", category: "frontend" },
  { name: "TailwindCSS", category: "frontend" },
  { name: "OpenCV", category: "ai" },
  { name: "MediaPipe", category: "ai" },
  { name: "YOLOv8", category: "ai" },
  { name: "TensorFlow.js", category: "ai" },
  { name: "Git", category: "devops" },
  { name: "Docker", category: "devops" },
  { name: "Nginx", category: "devops" },
  { name: "Ubuntu Server", category: "devops" },
  { name: "SQLite", category: "database" },
  { name: "PostgreSQL", category: "database" },
]

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { reducedMotion } = useReducedMotion()

  return (
    <motion.section
      ref={ref}
      id="about"
      className="relative min-h-screen py-32 px-4"
      initial={{ rotateX: 180, opacity: 0 }}
      whileInView={{ rotateX: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50, rotateX: 180 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2
            className="text-4xl md:text-6xl font-bold text-[#E50914] font-serif mb-4"
            style={{ textShadow: "0 0 30px rgba(229,9,20,0.5)" }}
          >
            ABOUT ME
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#E50914] to-transparent mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Vecna root frame effect */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                {/* Outer root tendrils */}
                <motion.path
                  d="M50,200 Q100,100 200,80 Q300,60 350,150"
                  fill="none"
                  stroke="#E50914"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  style={{ filter: "drop-shadow(0 0 5px rgba(229,9,20,0.8))" }}
                />
                <motion.path
                  d="M350,200 Q300,300 200,320 Q100,340 50,250"
                  fill="none"
                  stroke="#E50914"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.7 }}
                  style={{ filter: "drop-shadow(0 0 5px rgba(229,9,20,0.8))" }}
                />
                <motion.path
                  d="M200,50 Q280,100 320,200 Q360,300 300,380"
                  fill="none"
                  stroke="#3a0a20"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.9 }}
                />
                <motion.path
                  d="M200,350 Q120,300 80,200 Q40,100 100,20"
                  fill="none"
                  stroke="#3a0a20"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 1.1 }}
                />
              </svg>

              {/* Pulsing border rings */}
              <motion.div
                className="absolute inset-4 rounded-full border-2 border-[#E50914]/50"
                animate={
                  reducedMotion
                    ? {}
                    : {
                        boxShadow: [
                          "0 0 20px rgba(229,9,20,0.3)",
                          "0 0 40px rgba(229,9,20,0.6)",
                          "0 0 20px rgba(229,9,20,0.3)",
                        ],
                      }
                }
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <div className="absolute inset-6 rounded-full border border-[#3a0a20]/50" />

              <div className="absolute inset-8 rounded-full overflow-hidden bg-gradient-to-br from-[#1a0510] to-[#050208]">
                <Image
                  src="/profile.png"
                  alt="Sarweshwar - Full Stack Developer & AI/ML Engineer"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Dark overlay for atmosphere */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050208]/70 to-transparent" />
                <div className="absolute inset-0 bg-[#E50914]/5" />
              </div>

              {/* Floating spore particles */}
              {!reducedMotion &&
                Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-[#E50914]"
                    style={{
                      top: `${20 + Math.cos(i * 0.7) * 35}%`,
                      left: `${50 + Math.sin(i * 0.7) * 40}%`,
                      filter: "blur(0.5px)",
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.2, 0.8, 0.2],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.4,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                ))}
            </div>
          </motion.div>

          <div className="space-y-6">
            <VecnaCard delay={0.3}>
              <div className="p-8">
                <motion.h3
                  className="text-2xl font-bold text-[#DADADA] mb-4"
                  initial={{ opacity: 0, rotateX: 180 }}
                  whileInView={{ opacity: 1, rotateX: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                >
                  Welcome to my dimension
                </motion.h3>

                <div className="space-y-4 text-[#DADADA]/90 font-mono leading-relaxed">
                  <motion.p
                    initial={{ opacity: 0, y: 20, rotateX: 180 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
                  >
                    I&apos;m Sarweshwar, a motivated Computer Science undergraduate with strong hands-on experience in
                    backend development, computer vision, and full-stack web technologies. Currently pursuing my B.E. at
                    Karpagam Academy of Higher Education.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20, rotateX: 180 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                  >
                    I have led impactful projects including developing the complete backend for a college-funded Alumni
                    Portal, building an AI-based X-ray diagnostic tool, and creating an automated pest-detection drone.
                    Beyond academics, I&apos;m actively engaged in hackathons—participating in over 10, reaching finals
                    in 2, and winning selection in 1.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20, rotateX: 180 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
                  >
                    As the IEEE Student Branch Chairperson and GeeksforGeeks Event Head, I constantly push boundaries
                    while co-founding Xyndrix—a software solutions company delivering full-stack web applications and
                    AI-driven systems.
                  </motion.p>
                </div>
              </div>
            </VecnaCard>

            <VecnaCard delay={0.5}>
              <div className="p-6">
                <h4 className="text-lg font-bold text-[#E50914] mb-4 font-mono">
                  {"<"} Tech Stack {"/>"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <SkillBadge key={skill.name} name={skill.name} category={skill.category} delay={i * 0.03} />
                  ))}
                </div>
              </div>
            </VecnaCard>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
