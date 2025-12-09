"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const projectsData = [
  {
    id: 1,
    name: "Cotton Pest Detection System - MSME Hackathon Winner",
    subtitle: "Computer Vision | YOLO",
    description:
      "Developed an innovative cotton pest detection model using YOLO with manually annotated datasets; selected as a winner and received ₹15 lakh funding for further development.",
    link: "#",
    skills: ["YOLO", "Computer Vision", "Python", "Data Annotation", "Machine Learning", "OpenCV", "Ultralytics"],
    featured: true,
  },
  {
    id: 2,
    name: "Karpagam Alumni Portal",
    subtitle: "Backend Lead | Live Deployment",
    description:
      "Complete backend development for a comprehensive college alumni portal; designed the database architecture and APIs for web and mobile, deployed to production.",
    link: "https://karpagamalumni.in/",
    skills: ["React.js", "React Native", "Django", "Django REST Framework", "PostgreSQL", "Nginx", "DigitalOcean"],
    featured: true,
  },
  {
    id: 3,
    name: "AI/ML Solutions Portfolio",
    subtitle: "Multi-Framework ML",
    description:
      "Collection of ML projects spanning computer vision, NLP, and deep learning using modern frameworks and libraries.",
    link: "#",
    skills: ["TensorFlow", "PyTorch", "Ultralytics", "Transformers", "Hugging Face", "Python"],
    featured: false,
  },
  {
    id: 4,
    name: "Cloud Infrastructure Projects",
    subtitle: "Scalable Cloud + DevOps",
    description:
      "Designed and implemented scalable cloud solutions with containerized apps, microservices architectures, and automated deployment pipelines across major clouds.",
    link: "#",
    skills: ["Docker", "AWS", "Azure", "Google Cloud", "Nginx", "PostgreSQL"],
    featured: false,
  },
  {
    id: 5,
    name: "AI X-ray Fracture Detection Web App",
    subtitle: "Medical CV | YOLOv8",
    description:
      "Custom YOLOv8 model trained on annotated X-ray datasets to detect fractures; Django REST API returns annotated diagnostic images with OpenCV overlays.",
    link: "#",
    skills: ["YOLOv8", "PyTorch", "Django", "OpenCV", "Computer Vision"],
    featured: false,
  },
  {
    id: 6,
    name: "Smart-Expenses Web App",
    subtitle: "Personal Finance Tracker",
    description:
      "Full-stack finance tracker with CRUD, budgets, recurring entries, and analytics dashboard featuring time-series charts and budget alerts.",
    link: "#",
    skills: ["React.js", "Django", "PostgreSQL", "Chart.js", "Full Stack"],
    featured: false,
  },
]

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<(typeof projectsData)[0] | null>(null)

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      className="relative w-full py-32 bg-gradient-to-b from-background to-shadow-black overflow-hidden"
      id="projects"
    >
      {/* Background */}
      <div className="absolute top-20 left-0 w-96 h-96 rounded-full blur-3xl bg-neon-red opacity-5" />
      <div className="absolute bottom-0 right-20 w-96 h-96 rounded-full blur-3xl bg-electric-blue opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2
            className="text-5xl lg:text-6xl font-bold text-neon-red tracking-wider mb-4"
            style={{ textShadow: "0 0 20px rgb(229, 9, 20)" }}
          >
            Projects
          </h2>
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">
            Classified Case Files from the Upside Down
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {projectsData
            .filter((p) => p.featured)
            .map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative bg-dark-purple border-2 border-transparent rounded-lg p-6 hover:border-neon-red transition-all duration-300 overflow-hidden">
                  {/* Background glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, rgb(229, 9, 20), transparent)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 space-y-4">
                    {/* Icon/Badge */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-red to-electric-blue flex items-center justify-center"
                    >
                      <div className="text-white font-bold text-xl">{project.id}</div>
                    </motion.div>

                    {/* Title */}
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-neon-red group-hover:text-electric-blue transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm text-electric-blue font-mono">{project.subtitle}</p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-fog-white leading-relaxed">{project.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 pt-4">
                      {project.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          whileHover={{ y: -2 }}
                          className="px-3 py-1 text-xs font-mono bg-dark-purple border border-electric-blue text-electric-blue rounded hover:border-neon-red hover:text-neon-red transition-colors"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>

                    {/* Arrow */}
                    <motion.div
                      className="flex items-center gap-2 pt-4 text-neon-red font-bold"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <span>View Details</span>
                      <span>→</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>

        {/* Other Projects Grid */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-neon-red mb-6 font-mono">Other Notable Projects</h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projectsData
              .filter((p) => !p.featured)
              .map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative bg-dark-purple border border-border rounded-lg p-4 hover:border-neon-red transition-all duration-300 h-full">
                    <div className="space-y-3">
                      <h4 className="font-bold text-sm text-neon-red group-hover:text-electric-blue transition-colors">
                        {project.name}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 pt-2">
                        {project.skills.slice(0, 2).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 text-xs bg-background border border-neon-red text-neon-red rounded"
                          >
                            {skill}
                          </span>
                        ))}
                        {project.skills.length > 2 && (
                          <span className="px-2 py-1 text-xs text-muted-foreground">+{project.skills.length - 2}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-purple border-2 border-neon-red rounded-lg p-8 max-w-2xl w-full max-h-screen overflow-y-auto"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-neon-red">{selectedProject.name}</h3>
                  <p className="text-electric-blue font-mono">{selectedProject.subtitle}</p>
                </div>
                <p className="text-fog-white leading-relaxed">{selectedProject.description}</p>
                <div className="space-y-2 pt-4">
                  <p className="text-sm font-mono text-muted-foreground uppercase">Technologies Used:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-background border border-neon-red text-neon-red rounded font-mono text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="mt-6 px-6 py-2 bg-neon-red text-white font-mono font-bold rounded hover:bg-neon-red-light transition-colors w-full"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
