"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, X } from "lucide-react"

const projects = [
  {
    name: "Cotton Pest Detection System",
    subtitle: "MSME Hackathon Winner",
    description:
      "Developed a YOLO-based cotton pest detection model with manually annotated datasets; selected as a winner and awarded ₹15 lakh funding for further development.",
    link: "#",
    github: "https://github.com/sarweshero",
    skills: ["YOLO", "Computer Vision", "Python", "Data Annotation", "Machine Learning", "OpenCV", "Ultralytics"],
    featured: true,
    dateRange: "Hackathon Winner",
    category: "TECHNOLOGY",
  },
  {
    name: "Karpagam Alumni Portal",
    subtitle: "Backend Lead · Live Deployment",
    description:
      "Complete backend development for the college alumni portal; designed database architecture and APIs for web and mobile, deployed to production with secure auth and role-based access control.",
    link: "https://karpagamalumni.in/",
    github: "https://github.com/sarweshero",
    skills: ["React.js", "React Native", "Django", "Django REST Framework", "PostgreSQL", "Nginx", "DigitalOcean"],
    featured: true,
    dateRange: "Live · Production",
    category: "FEATURE",
  },
  {
    name: "AI/ML Solutions Portfolio",
    subtitle: "Multi-Framework Machine Learning",
    description:
      "Collection of ML projects across computer vision, NLP, and deep learning using TensorFlow, PyTorch, Transformers, and Hugging Face.",
    link: "#",
    github: "https://github.com/sarweshero",
    skills: ["TensorFlow", "PyTorch", "Ultralytics", "Transformers", "Hugging Face", "Python"],
    featured: true,
    dateRange: "Ongoing",
    category: "RESEARCH",
  },
  {
    name: "Cloud Infrastructure Projects",
    subtitle: "Scalable Cloud & DevOps",
    description:
      "Designed and implemented scalable cloud solutions with containerized applications, microservices architectures, and automated deployment pipelines across AWS, Azure, and GCP.",
    link: "#",
    github: "https://github.com/sarweshero",
    skills: ["Docker", "AWS", "Azure", "Google Cloud", "Nginx", "PostgreSQL"],
    featured: false,
    dateRange: "Cloud Platforms",
    category: "TECHNOLOGY",
  },
  {
    name: "AI X-ray Fracture Detection",
    subtitle: "Medical Computer Vision · YOLOv8",
    description:
      "Custom YOLOv8 model trained on annotated X-ray datasets for fracture detection; Django REST API returns annotated diagnostic images with OpenCV overlays.",
    link: "#",
    github: "https://github.com/sarweshero",
    skills: ["YOLOv8", "PyTorch", "Django", "OpenCV", "Computer Vision"],
    featured: false,
    dateRange: "Healthcare CV",
    category: "RESEARCH",
  },
  {
    name: "Smart-Expenses Web App",
    subtitle: "Personal Finance Tracker",
    description:
      "Full-stack finance tracker with CRUD, budgets, recurring entries, and analytics dashboard featuring time-series charts and budget alerts.",
    link: "#",
    github: "https://github.com/sarweshero",
    skills: ["React.js", "Django", "PostgreSQL", "Chart.js", "Full Stack"],
    featured: false,
    dateRange: "Finance App",
    category: "EDITORIAL",
  },
]

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

  return (
    <section ref={ref} id="projects" className="newspaper-container py-12">
      {/* Section Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="section-label">Portfolio</span>
        <h2 className="headline-2 mt-4">Selected Works & Projects</h2>
        <p className="text-[var(--ink-muted)] text-sm mt-2 italic" style={{ fontFamily: "var(--font-body)" }}>
          A curated collection of engineering projects and research endeavors
        </p>
        <hr className="divider-single mt-4 max-w-xs mx-auto" />
      </motion.div>

      {/* Featured Projects — Large format */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 column-rule mb-8">
        {projects
          .filter((p) => p.featured)
          .map((project, i) => (
            <motion.article
              key={project.name}
              className="article-block-featured px-0 md:px-6 first:pl-0 last:pr-0 py-4 cursor-pointer group"
              onClick={() => setSelectedProject(project)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="section-label text-[0.6rem] mb-3">{project.category}</span>

              <h3 className="headline-3 mt-3 mb-2 group-hover:text-[var(--accent-burgundy)] transition-colors duration-200">
                {project.name}
              </h3>

              <p className="meta-text mb-3">{project.subtitle}</p>

              <p className="body-text text-sm line-clamp-4 mb-4">{project.description}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 mb-3">
                {project.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="text-[0.65rem] text-[var(--ink-muted)] border-b border-[var(--rule-light)]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {skill}
                  </span>
                ))}
                {project.skills.length > 4 && (
                  <span className="text-[0.65rem] text-[var(--ink-faded)]" style={{ fontFamily: "var(--font-mono)" }}>
                    +{project.skills.length - 4} more
                  </span>
                )}
              </div>

              <span className="text-xs text-[var(--ink-muted)] underline underline-offset-2 group-hover:text-[var(--ink)] transition-colors"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Read More →
              </span>
            </motion.article>
          ))}
      </div>

      <hr className="divider-single mb-8" />

      {/* Secondary Projects — Compact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 column-rule">
        {projects
          .filter((p) => !p.featured)
          .map((project, i) => (
            <motion.article
              key={project.name}
              className="article-block px-0 md:px-4 first:pl-0 last:pr-0 cursor-pointer group"
              onClick={() => setSelectedProject(project)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            >
              <span className="meta-text text-[0.6rem] mb-2 block">{project.category} · {project.dateRange}</span>

              <h4 className="headline-4 mb-1.5 group-hover:text-[var(--accent-burgundy)] transition-colors duration-200">
                {project.name}
              </h4>

              <p className="text-sm text-[var(--ink-muted)] line-clamp-3 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                {project.description}
              </p>

              <span
                className="text-xs text-[var(--ink-muted)] underline underline-offset-2 group-hover:text-[var(--ink)] transition-colors"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Continue Reading →
              </span>
            </motion.article>
          ))}
      </div>

      {/* ═══ Project Detail Modal ═══ */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[100] bg-[var(--ink)]/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90vw] md:max-w-2xl md:max-h-[85vh] z-[101] bg-[var(--paper)] border-2 border-[var(--ink)] overflow-y-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b-2 border-[var(--ink)]">
                <span className="section-label">{selectedProject.category}</span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <h3 className="headline-2 mb-2">{selectedProject.name}</h3>
                <p className="meta-text mb-6">{selectedProject.subtitle} · {selectedProject.dateRange}</p>

                <p className="body-text mb-6">{selectedProject.description}</p>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="meta-text mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs border border-[var(--rule)] text-[var(--ink-light)]"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <hr className="divider-single mb-6" />

                {/* Action Links */}
                <div className="flex gap-4">
                  {selectedProject.link !== "#" && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-[var(--ink)] border-b border-[var(--ink)] pb-0.5 hover:text-[var(--accent-burgundy)] hover:border-[var(--accent-burgundy)] transition-colors"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      <ExternalLink size={14} />
                      View Live
                    </a>
                  )}
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[var(--ink-muted)] border-b border-[var(--rule)] pb-0.5 hover:text-[var(--ink)] hover:border-[var(--ink)] transition-colors"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    <Github size={14} />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
