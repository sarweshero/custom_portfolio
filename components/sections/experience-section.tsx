"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

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
      "Deployed and maintained on DigitalOcean with Nginx reverse proxy; live at karpagamalumni.in",
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

  return (
    <section ref={ref} id="experience" className="newspaper-container py-12">
      {/* Section Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="section-label">Career</span>
        <h2 className="headline-2 mt-4">Professional Experience</h2>
        <hr className="divider-single mt-4 max-w-xs mx-auto" />
      </motion.div>

      {/* Experience Timeline — Newspaper Column Layout */}
      <div className="max-w-4xl mx-auto">
        {experiences.map((exp, i) => (
          <motion.article
            key={exp.company}
            className={`${i === 0 ? "article-block-featured" : "article-block"} pb-8 mb-8`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
              <div>
                <h3 className="headline-3">{exp.title}</h3>
                <p
                  className="text-sm text-[var(--ink-muted)] mt-0.5"
                  style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
                >
                  {exp.company}
                </p>
              </div>
              <div className="text-right">
                <span className="meta-text">{exp.dateRange}</span>
                <p className="text-xs text-[var(--ink-faded)] mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
                  {exp.location}
                </p>
              </div>
            </div>

            {/* Bullets in newspaper column style */}
            <ul className="space-y-2">
              {exp.bullets.map((bullet, j) => (
                <li key={j} className="flex items-start gap-3 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                  <span className="mt-2 w-1 h-1 bg-[var(--ink)] rounded-full flex-shrink-0" />
                  <span className="text-[var(--ink-light)]">{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}

        {/* Entrepreneurship */}
        <motion.div
          className="article-block mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <span className="section-label mb-3">Entrepreneurship</span>

          <div className="mt-4 flex items-start gap-4">
            <div
              className="w-10 h-10 border border-[var(--rule)] flex items-center justify-center flex-shrink-0 text-lg font-bold"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              X
            </div>
            <div>
              <h4 className="headline-4">Co-Founder, Xyndrix</h4>
              <p className="body-text text-sm mt-1">
                A software solutions company delivering full-stack web applications,
                AI-driven systems, and custom enterprise tools.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
