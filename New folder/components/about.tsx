"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const techStack = [
  "JavaScript",
  "Python",
  "React.js",
  "Next.js",
  "TailwindCSS",
  "Node.js",
  "Django",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "TensorFlow",
  "PyTorch",
  "YOLOv8",
  "Git",
]

export function About() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section className="relative w-full py-32 bg-shadow-black overflow-hidden" id="about">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl bg-dark-purple opacity-20 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl bg-neon-red opacity-10 translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start"
        >
          {/* Left: Profile */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="relative group">
              {/* Frame */}
              <div className="absolute inset-0 border-2 border-neon-red rounded-lg p-1 group-hover:shadow-lg group-hover:shadow-neon-red transition-all duration-300" />

              {/* Profile image container */}
              <div className="relative bg-dark-purple p-4 rounded-lg aspect-square flex items-center justify-center overflow-hidden">
                <div
                  className="w-full h-full rounded-lg bg-gradient-to-br from-dark-purple via-background to-blood-rust flex items-center justify-center text-center p-6"
                  style={{
                    backgroundImage: `radial-gradient(circle at 30% 30%, rgba(0, 180, 255, 0.1) 0%, transparent 50%)`,
                  }}
                >
                  <div>
                    <div className="text-4xl font-bold text-neon-red mb-2">S</div>
                    <p className="text-xs text-fog-white font-mono">Sarweshero</p>
                  </div>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: "inset 0 0 30px rgba(229, 9, 20, 0.3)",
                  }}
                />
              </div>

              {/* Rim light effect */}
              <div
                className="absolute -inset-1 rounded-lg blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-300 -z-10"
                style={{
                  background: "linear-gradient(45deg, rgb(229, 9, 20), rgb(0, 180, 255))",
                }}
              />
            </div>
          </motion.div>

          {/* Center & Right: Content */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            {/* Title */}
            <div className="space-y-4">
              <h2
                className="text-5xl lg:text-6xl font-bold text-neon-red tracking-wider"
                style={{ textShadow: "0 0 20px rgb(229, 9, 20)" }}
              >
                About Me
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-neon-red to-electric-blue" />
            </div>

            {/* Bio */}
            <div className="space-y-4">
              <p className="text-lg text-fog-white leading-relaxed font-light">
                I'm <span className="text-neon-red font-bold">Sarweshwar</span>, also known as{" "}
                <span className="text-electric-blue font-mono">Sarweshero</span>, a passionate Full Stack Developer with
                strong backend expertise and extensive experience in{" "}
                <span className="text-neon-red">AI/ML technologies</span>.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                I specialize in building robust, scalable applications using modern web technologies. With hands-on
                experience in TensorFlow, PyTorch, Ultralytics, and Transformers, I combine deep learning expertise with
                production-grade backend systems. I've successfully architected complete database systems and developed
                APIs for both web and mobile applications.
              </p>
              <p className="text-sm text-electric-blue font-mono tracking-wide">
                15+ hackathons. 3 finals. 2 wins. Building the future, one project at a time.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-fog-white font-mono">Tech Stack:</h3>
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                {techStack.map((tech, i) => (
                  <motion.div
                    key={tech}
                    variants={itemVariants}
                    onMouseEnter={() => setHoveredTech(tech)}
                    onMouseLeave={() => setHoveredTech(null)}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="relative group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-neon-red rounded-lg opacity-0 group-hover:opacity-20 blur transition-all duration-300" />
                    <div className="relative px-4 py-2 border-2 border-neon-red rounded-lg text-center transition-all duration-300 hover:border-electric-blue hover:shadow-lg hover:shadow-neon-red/50">
                      <span className="text-sm font-mono font-bold text-neon-red group-hover:text-electric-blue transition-colors">
                        {tech}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {[
                { label: "Projects", value: "15+" },
                { label: "Hackathons", value: "15+" },
                { label: "Years XP", value: "3+" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="text-center space-y-2 group cursor-pointer"
                  whileHover={{ y: -4 }}
                >
                  <div
                    className="text-3xl font-bold text-neon-red group-hover:text-electric-blue transition-colors"
                    style={{ textShadow: "0 0 10px currentColor" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
