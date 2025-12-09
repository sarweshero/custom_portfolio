"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, CheckCircle } from "lucide-react"
import { useReducedMotion } from "@/components/providers/reduced-motion-provider"

const experiences = [
  {
    company: "Code Craft",
    title: "Back-end Development Intern",
    dateRange: "Nov 2025 – Dec 2025",
    location: "Remote",
    bullets: [
      "Built RESTful APIs with Django and DRF, covering CRUD flows and rigorous input validation",
      "Integrated PostgreSQL with migrations, relational modeling, and query optimizations",
      "Implemented secure JWT authentication plus role-based access control",
      "Added Redis caching with expiry and invalidation for frequently accessed endpoints",
      "Developed a hotel booking backend (rooms, filters, bookings, user access control)",
      "Worked across Python, Django, DRF, PostgreSQL, Redis, JWT, and optional MongoDB modules",
    ],
  },
  {
    company: "Karpagam College Alumni Portal",
    title: "Full Stack Developer (Backend Lead)",
    dateRange: "Project Duration",
    location: "Remote",
    bullets: [
      "Led backend for the college alumni portal serving the full alumni community",
      "Designed PostgreSQL database architecture for clean organization and fast retrieval",
      "Built RESTful APIs with Django REST Framework for web and mobile clients",
      "Implemented secure authentication and authorization for user management",
      "Deployed and maintained on DigitalOcean with Nginx reverse proxy; live at https://karpagamalumni.in/",
    ],
  },
  {
    company: "AI/ML Projects",
    title: "Machine Learning Engineer",
    dateRange: "Ongoing",
    location: "Remote",
    bullets: [
      "Developed ML solutions with TensorFlow and PyTorch across multiple domains",
      "Implemented computer vision projects using Ultralytics for detection and tracking",
      "Built NLP applications with Transformers and Hugging Face libraries",
      "Deployed ML models on AWS, Azure, and Google Cloud",
      "Containerized ML apps with Docker for reproducible deployments",
    ],
  },
  {
    company: "Full Stack Development",
    title: "Full Stack Developer",
    dateRange: "Professional Experience",
    location: "Remote",
    bullets: [
      "Specialized in backend-first product builds with strong API and database design",
      "Built responsive web apps with React.js and mobile apps with React Native",
      "Managed PostgreSQL, MongoDB, and MySQL across different projects",
      "Implemented DevOps practices using Docker containers and cloud deployments",
      "Configured and maintained production Nginx setups",
    ],
  },
]

export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { reducedMotion } = useReducedMotion()

  return (
    <section ref={ref} id="experience" className="relative min-h-screen py-32 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50, rotateX: 180 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[#E50914] font-[var(--font-playfair)] mb-4">EXPERIENCE</h2>
          <p className="text-[#888888] font-mono text-sm">LAB RECORDS // FIELD EXPERIENCE</p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#E50914] to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#E50914] via-[#6A1B1F] to-[#E50914]" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              className={`relative mb-12 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, rotateX: 180 }}
              animate={isInView ? { opacity: 1, x: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
            >
              {/* Timeline node */}
              <motion.div
                className={`absolute top-0 ${i % 2 === 0 ? "-right-3 md:right-[-13px]" : "-left-3 md:left-[-13px]"} w-6 h-6 rounded-full bg-[#0A0A0A] border-2 border-[#E50914] z-10`}
                whileHover={reducedMotion ? {} : { scale: 1.3, boxShadow: "0 0 20px rgba(229,9,20,0.8)" }}
              >
                <Briefcase className="w-3 h-3 text-[#E50914] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </motion.div>

              {/* Content card */}
              <motion.div
                className="glass-card p-6 rounded-xl relative overflow-hidden"
                whileHover={
                  reducedMotion
                    ? {}
                    : {
                        boxShadow: "0 0 30px rgba(229,9,20,0.2)",
                        y: -5,
                      }
                }
              >
                {/* Scanner effect */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E50914] to-transparent"
                  initial={{ x: "-100%" }}
                  animate={isInView ? { x: "100%" } : {}}
                  transition={{ duration: 1, delay: i * 0.3 }}
                />

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#DADADA]">{exp.title}</h3>
                    <p className="text-[#E50914] font-mono text-sm">{exp.company}</p>
                    <p className="text-xs text-[#888888] font-mono mt-1">{exp.location}</p>
                  </div>
                  <span className="text-xs text-[#888888] font-mono bg-[#1A001F] px-2 py-1 rounded">
                    {exp.dateRange}
                  </span>
                </div>

                <ul className="space-y-2">
                  {exp.bullets.map((bullet, j) => (
                    <motion.li
                      key={j}
                      className="flex items-start gap-2 text-sm text-[#DADADA]/80"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.2 + j * 0.1 }}
                    >
                      <CheckCircle className="w-4 h-4 text-[#E50914] flex-shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Entrepreneurship Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-[#E50914] font-[var(--font-playfair)] mb-6 text-center">
            ENTREPRENEURSHIP
          </h3>
          <motion.div
            className="glass-card p-6 rounded-xl max-w-2xl mx-auto"
            whileHover={reducedMotion ? {} : { boxShadow: "0 0 30px rgba(229,9,20,0.2)" }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E50914]/20 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-[#E50914]" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#DADADA]">Co-Founder, Xyndrix</h4>
                <p className="text-xs text-[#888888] font-mono mb-2">—</p>
                <p className="text-sm text-[#DADADA]/80">
                  A software solutions company delivering full-stack web applications, AI-driven systems, and custom
                  enterprise tools.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
