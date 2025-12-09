"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const educationData = [
  {
    school: "Karpagam Academy of Higher Education",
    degree: "B.E. Computer Science and Engineering",
    dateRange: "Aug 2023 - May 2027 (Expected)",
    summary:
      "Actively pursuing undergraduate studies with a focus on strong CS fundamentals, software development, algorithms, and data structures.",
    achievements: [
      "Engaged in projects and research in Full Stack Development and AI/ML",
      "Chairperson, IEEE Student Branch — KAHE (Apr 2025 - Present)",
      "Event Head, GeeksforGeeks Student Chapter — KAHE (2025 - Present)",
      "Member, Metaverse Students Association (2024 - Present)",
      "Active participation in technical events and extracurricular initiatives",
      "Building a strong foundation across core CS subjects",
    ],
  },
  {
    school: "Self-Directed Learning & Professional Development",
    degree: "Full Stack Development & AI/ML Specialization",
    dateRange: "Continuous Learning",
    summary:
      "Self-driven specialization in backend-centric full stack work and modern AI/ML frameworks.",
    achievements: [
      "Mastered full stack development with emphasis on backend technologies",
      "Gained expertise in TensorFlow, PyTorch, and Hugging Face",
      "Developed proficiency across AWS, Azure, and Google Cloud",
      "Built production-ready applications with modern web stacks",
      "Contributed to real-world deployments including a live alumni portal",
    ],
  },
  {
    school: "Technical Certifications & Courses",
    degree: "Cloud Computing & Machine Learning",
    dateRange: "Professional Development",
    summary:
      "Formal coursework and certifications covering ML, deep learning, and cloud deployment practices.",
    achievements: [
      "Completed extensive machine learning and deep learning coursework",
      "Hands-on experience with Docker containerization and deployment",
      "Specialized in database design and management across multiple platforms",
      "Developed expertise in API development using Django REST Framework",
      "Mastered deployment and server management using Nginx and cloud services",
    ],
  },
]

export function Education() {
  const [expandedIndex, setExpandedIndex] = useState(0)

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
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      className="relative w-full py-32 bg-gradient-to-b from-background to-shadow-black overflow-hidden"
      id="education"
    >
      {/* Background */}
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl bg-electric-blue opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2
            className="text-5xl lg:text-6xl font-bold text-neon-red tracking-wider mb-4"
            style={{ textShadow: "0 0 20px rgb(229, 9, 20)" }}
          >
            Education
          </h2>
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">Pages from the Lore Book</p>
        </motion.div>

        {/* Education Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="space-y-4 max-w-3xl"
        >
          {educationData.map((edu, index) => (
            <motion.div key={index} variants={itemVariants}>
              <motion.button
                onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                className="w-full group"
              >
                <div className="relative bg-dark-purple border-2 border-neon-red rounded-lg p-6 hover:shadow-lg hover:shadow-neon-red/50 transition-all duration-300 text-left">
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, rgb(229, 9, 20), transparent)`,
                    }}
                  />

                  <div className="relative z-10 space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-neon-red group-hover:text-electric-blue transition-colors">
                          {edu.degree}
                        </h3>
                        <p className="text-electric-blue font-mono text-sm">{edu.school}</p>
                        <p className="text-muted-foreground text-sm font-mono">{edu.dateRange}</p>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-neon-red text-2xl flex-shrink-0 mt-1"
                      >
                        ›
                      </motion.div>
                    </div>

                    <p className="text-fog-white text-sm leading-relaxed">{edu.summary}</p>
                  </div>
                </div>
              </motion.button>

              {/* Expandable content */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expandedIndex === index ? "auto" : 0,
                  opacity: expandedIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-dark-purple border-l-2 border-r-2 border-b-2 border-neon-red rounded-b-lg p-6 pt-0 space-y-4">
                  <ul className="space-y-2">
                    {edu.achievements.map((item) => (
                      <li key={item} className="text-fog-white leading-relaxed flex gap-3">
                        <span className="text-neon-red flex-shrink-0 mt-1">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3 pt-4 border-t border-neon-red/30">
                    <p className="text-sm font-mono text-electric-blue uppercase tracking-widest">Focus Areas:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Data Science",
                        "AI/ML",
                        "Computer Vision",
                        "NLP",
                        "Backend Development",
                        "Cloud Computing",
                      ].map((area) => (
                        <motion.span
                          key={area}
                          whileHover={{ y: -2 }}
                          className="px-3 py-1 text-xs font-mono bg-background border border-electric-blue text-electric-blue rounded hover:border-neon-red hover:text-neon-red transition-colors"
                        >
                          {area}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
