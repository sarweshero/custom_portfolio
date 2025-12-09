"use client"

import { motion } from "framer-motion"

const experienceData = [
  {
    company: "Code Craft",
    title: "Back-end Development Intern",
    dateRange: "Nov 2025 – Dec 2025",
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
    bullets: [
      "Specialized in backend-first product builds with strong API and database design",
      "Built responsive web apps with React.js and mobile apps with React Native",
      "Managed PostgreSQL, MongoDB, and MySQL across different projects",
      "Implemented DevOps practices using Docker containers and cloud deployments",
      "Configured and maintained production Nginx setups",
    ],
  },
]

export function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="relative w-full py-32 bg-shadow-black overflow-hidden" id="experience">
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full blur-3xl bg-dark-purple opacity-10 translate-y-1/2" />

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
            Experience
          </h2>
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">Hawkins Lab Files</p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="space-y-8 relative"
        >
          {/* Vertical line */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-red via-electric-blue to-transparent opacity-30" />

          {experienceData.map((exp, index) => (
            <motion.div key={index} variants={itemVariants} className="relative">
              {/* Grid layout for desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left content (odd items) */}
                {index % 2 === 0 ? (
                  <>
                    <motion.div whileHover={{ x: -10 }} className="text-right lg:pr-12 space-y-3 order-2 lg:order-1">
                      <p className="font-mono text-neon-red font-bold">{exp.dateRange}</p>
                    </motion.div>
                    <div className="order-1 lg:order-2" />
                  </>
                ) : (
                  <div />
                )}

                {/* Center dot */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-6 z-20">
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      boxShadow: ["0 0 10px rgb(229, 9, 20)", "0 0 20px rgb(229, 9, 20)", "0 0 10px rgb(229, 9, 20)"],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="w-4 h-4 bg-neon-red rounded-full border-2 border-background"
                  />
                </div>

                {/* Card */}
                <motion.div whileHover={{ y: -8 }} className={`col-span-1 ${index % 2 === 0 ? "lg:col-start-2" : ""}`}>
                  <div className="bg-dark-purple border-2 border-neon-red rounded-lg p-6 hover:shadow-lg hover:shadow-neon-red/50 transition-all duration-300 group">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-neon-red group-hover:text-electric-blue transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-electric-blue font-mono text-sm">{exp.company}</p>
                      </div>

                      <ul className="space-y-2">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className="text-sm text-fog-white leading-relaxed flex gap-3">
                            <span className="text-neon-red flex-shrink-0 mt-1">›</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Right content (even items) */}
                {index % 2 === 1 ? (
                  <>
                    <motion.div whileHover={{ x: 10 }} className="lg:pl-12 space-y-3 order-2 lg:order-1">
                      <p className="font-mono text-electric-blue font-bold">{exp.dateRange}</p>
                    </motion.div>
                  </>
                ) : (
                  <div />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
