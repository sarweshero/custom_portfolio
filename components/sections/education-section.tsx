"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { GraduationCap, ChevronDown, Award, Users, BookOpen } from "lucide-react"
import { useReducedMotion } from "@/components/providers/reduced-motion-provider"

const education = [
  {
    school: "Karpagam Academy of Higher Education",
    degree: "B.E. Computer Science and Engineering",
    dateRange: "Aug 2023 - May 2027 (Expected)",
    location: "Coimbatore, India",
    icon: GraduationCap,
    achievements: [
      "Actively pursuing undergraduate studies with focus on software development, algorithms, and data structures",
      "Engaged in projects and research in Full Stack Development and AI/ML",
      "Chairperson, IEEE Student Branch — KAHE (Apr 2025 - Present)",
      "Event Head, GeeksforGeeks Student Chapter — KAHE (2025 - Present)",
      "Member, Metaverse Students Association (2024 - Present)",
      "Active participation in technical events and extracurricular initiatives",
      "Building a strong foundation across core CS subjects",
    ],
    leadership: [
      { title: "Chairperson, IEEE Student Branch", period: "Apr 2025 – Present", icon: Users },
      { title: "Event Head, GeeksforGeeks Student Chapter", period: "2025 – Present", icon: Award },
      { title: "Member, Metaverse Students Association", period: "2024 – Present", icon: BookOpen },
    ],
  },
  {
    school: "Self-Directed Learning & Professional Development",
    degree: "Full Stack Development & AI/ML Specialization",
    dateRange: "Continuous Learning",
    location: "Remote",
    icon: GraduationCap,
    achievements: [
      "Mastered full stack development with emphasis on backend technologies",
      "Gained expertise in TensorFlow, PyTorch, and Hugging Face",
      "Developed proficiency across AWS, Azure, and Google Cloud",
      "Built production-ready applications with modern web stacks",
      "Contributed to real-world deployments including a live alumni portal",
    ],
    leadership: [],
  },
  {
    school: "Technical Certifications & Courses",
    degree: "Cloud Computing & Machine Learning",
    dateRange: "Professional Development",
    location: "Remote",
    icon: GraduationCap,
    achievements: [
      "Completed extensive machine learning and deep learning coursework",
      "Hands-on experience with Docker containerization and deployment",
      "Specialized in database design and management across multiple platforms",
      "Developed expertise in API development using Django REST Framework",
      "Mastered deployment and server management using Nginx and cloud services",
    ],
    leadership: [],
  },
]

export default function EducationSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { reducedMotion } = useReducedMotion()
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <section ref={ref} id="education" className="relative min-h-screen py-32 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50, rotateX: 180 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[#E50914] font-[var(--font-playfair)] mb-4">EDUCATION</h2>
          <p className="text-[#888888] font-mono text-sm">KNOWLEDGE ARCHIVES // LORE BOOK</p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#E50914] to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Accordion Cards */}
        <div className="space-y-4">
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              className="glass-card rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 30, rotateX: 180 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
            >
              {/* Header - Always visible */}
              <motion.button
                className="w-full p-6 flex items-center gap-4 text-left"
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                whileHover={reducedMotion ? {} : { backgroundColor: "rgba(229,9,20,0.05)" }}
              >
                <div className="w-12 h-12 rounded-full bg-[#E50914]/20 flex items-center justify-center flex-shrink-0">
                  <edu.icon className="w-6 h-6 text-[#E50914]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-[#DADADA] truncate">{edu.school}</h3>
                  <p className="text-sm text-[#00B4FF] font-mono">{edu.degree}</p>
                  <p className="text-xs text-[#888888] font-mono mt-1">
                    {edu.dateRange} • {edu.location}
                  </p>
                </div>
                <motion.div animate={{ rotate: expandedIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="w-6 h-6 text-[#E50914]" />
                </motion.div>
              </motion.button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-[#2A0A10]">
                      {/* Achievements */}
                      <div className="mt-4">
                        <h4 className="text-sm font-mono text-[#888888] mb-3">ACHIEVEMENTS & ACTIVITIES:</h4>
                        <ul className="space-y-2">
                          {edu.achievements.map((achievement, j) => (
                            <motion.li
                              key={j}
                              className="flex items-start gap-2 text-sm text-[#DADADA]/80"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: j * 0.1 }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] flex-shrink-0 mt-2" />
                              <span>{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Leadership Roles */}
                      {edu.leadership.length > 0 && (
                        <div className="mt-6">
                          <h4 className="text-sm font-mono text-[#888888] mb-3">LEADERSHIP ROLES:</h4>
                          <div className="grid gap-3">
                            {edu.leadership.map((role, j) => (
                              <motion.div
                                key={j}
                                className="flex items-center gap-3 p-3 bg-[#1A001F]/50 rounded-lg"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + j * 0.1 }}
                                whileHover={
                                  reducedMotion
                                    ? {}
                                    : {
                                        scale: 1.02,
                                        boxShadow: "0 0 15px rgba(229,9,20,0.2)",
                                      }
                                }
                              >
                                <div className="w-8 h-8 rounded-full bg-[#E50914]/20 flex items-center justify-center">
                                  <role.icon className="w-4 h-4 text-[#E50914]" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-[#DADADA]">{role.title}</p>
                                  <p className="text-xs text-[#888888] font-mono">{role.period}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
