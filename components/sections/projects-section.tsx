"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, Github, Award, Plane, Activity, Wallet } from "lucide-react"
import { useReducedMotion } from "@/components/providers/reduced-motion-provider"
import { VecnaCard } from "@/components/ui/vecna-card"
import { VecnaModal } from "@/components/ui/vecna-modal"
import { VecnaButton } from "@/components/ui/vecna-button"

const projects = [
  {
    name: "Cotton Pest Detection System - MSME Hackathon Winner",
    subtitle: "Computer Vision | YOLO",
    description:
      "Developed a YOLO-based cotton pest detection model with manually annotated datasets; selected as a winner and awarded ₹15 lakh funding for further development.",
    link: "#",
    github: "https://github.com/sarweshero",
    skills: ["YOLO", "Computer Vision", "Python", "Data Annotation", "Machine Learning", "OpenCV", "Ultralytics"],
    featured: true,
    icon: Award,
    dateRange: "MSME Hackathon Winner",
  },
  {
    name: "Karpagam Alumni Portal",
    subtitle: "Backend Lead | Live Deployment",
    description:
      "Complete backend development for the college alumni portal; designed database architecture and APIs for web and mobile, deployed to production with secure auth and role-based access control.",
    link: "https://karpagamalumni.in/",
    github: "https://github.com/sarweshero",
    skills: ["React.js", "React Native", "Django", "Django REST Framework", "PostgreSQL", "Nginx", "DigitalOcean"],
    featured: true,
    icon: Award,
    dateRange: "Live Deployment",
  },
  {
    name: "AI/ML Solutions Portfolio",
    subtitle: "Multi-Framework ML",
    description:
      "Collection of ML projects across computer vision, NLP, and deep learning using TensorFlow, PyTorch, Transformers, and Hugging Face.",
    link: "#",
    github: "https://github.com/sarweshero",
    skills: ["TensorFlow", "PyTorch", "Ultralytics", "Transformers", "Hugging Face", "Python"],
    featured: true,
    icon: Activity,
    dateRange: "Ongoing",
  },
  {
    name: "Cloud Infrastructure Projects",
    subtitle: "Scalable Cloud + DevOps",
    description:
      "Designed and implemented scalable cloud solutions with containerized applications, microservices architectures, and automated deployment pipelines across AWS, Azure, and GCP.",
    link: "#",
    github: "https://github.com/sarweshero",
    skills: ["Docker", "AWS", "Azure", "Google Cloud", "Nginx", "PostgreSQL"],
    featured: false,
    icon: Plane,
    dateRange: "Cloud Platforms",
  },
  {
    name: "AI X-ray Fracture Detection Web App",
    subtitle: "Medical CV | YOLOv8",
    description:
      "Custom YOLOv8 model trained on annotated X-ray datasets for fracture detection; Django REST API returns annotated diagnostic images with OpenCV overlays.",
    link: "#",
    github: "https://github.com/sarweshero",
    skills: ["YOLOv8", "PyTorch", "Django", "OpenCV", "Computer Vision"],
    featured: false,
    icon: Activity,
    dateRange: "Healthcare CV",
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
    icon: Wallet,
    dateRange: "Finance App",
  },
]

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { reducedMotion } = useReducedMotion()
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

  return (
    <section ref={ref} id="projects" className="relative min-h-screen py-32 px-4">
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
            CASE FILES
          </h2>
          <p className="text-[#666666] font-mono text-sm">THE UPSIDE DOWN // CLASSIFIED PROJECTS</p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#E50914] to-transparent mx-auto mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <VecnaCard key={project.name} delay={i * 0.1}>
              <motion.div
                className="cursor-pointer group h-full"
                onClick={() => setSelectedProject(project)}
                initial={{ rotateX: 180, opacity: 0 }}
                whileInView={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.05 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                {/* Vein pulse top border */}
                <div className="h-1 bg-gradient-to-r from-[#3a0a20] via-[#E50914] to-[#3a0a20] animate-vein-pulse" />

                <div className="p-6">
                  {/* Featured badge and date */}
                  <div className="flex items-center justify-between mb-3">
                    {project.featured && (
                      <motion.div
                        className="inline-flex items-center gap-1 px-2 py-1 bg-[#E50914]/20 rounded text-xs text-[#E50914] font-mono border border-[#E50914]/30"
                        animate={reducedMotion ? {} : { opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        {project.icon && <project.icon size={12} />}
                        FEATURED
                      </motion.div>
                    )}
                    <span className="text-xs text-[#666666] font-mono ml-auto">{project.dateRange}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#DADADA] mb-2 group-hover:text-[#E50914] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-[#E50914]/70 font-mono mb-3">{project.subtitle}</p>
                  <p className="text-[#888888] text-sm line-clamp-3 mb-4">{project.description}</p>

                  {/* Skills preview */}
                  <div className="flex flex-wrap gap-1">
                    {project.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-xs bg-[#1a0510] text-[#E50914] rounded font-mono border border-[#E50914]/20"
                      >
                        {skill}
                      </span>
                    ))}
                    {project.skills.length > 4 && (
                      <span className="px-2 py-0.5 text-xs text-[#666666] font-mono">+{project.skills.length - 4}</span>
                    )}
                  </div>

                  {/* Hover indicator */}
                  <motion.div className="mt-4 pt-4 border-t border-[#2a0a15] flex items-center justify-between text-sm">
                    <span className="text-[#666666] font-mono group-hover:text-[#E50914] transition-colors">
                      VIEW FILE
                    </span>
                    <ExternalLink size={16} className="text-[#E50914] group-hover:scale-110 transition-transform" />
                  </motion.div>
                </div>
              </motion.div>
            </VecnaCard>
          ))}
        </div>
      </div>

      <VecnaModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={`CASE FILE // ${selectedProject?.dateRange || ""}`}
      >
        {selectedProject && (
          <div>
            <h3
              className="text-3xl font-bold text-[#E50914] font-serif mb-2"
              style={{ textShadow: "0 0 20px rgba(229,9,20,0.4)" }}
            >
              {selectedProject.name}
            </h3>
            <p className="text-[#E50914]/70 font-mono mb-6">{selectedProject.subtitle}</p>

            <p className="text-[#DADADA] leading-relaxed font-mono mb-6">{selectedProject.description}</p>

            {/* Skills */}
            <div className="mb-6">
              <h4 className="text-sm font-mono text-[#666666] mb-3">TECHNOLOGIES USED:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-[#E50914]/10 text-[#E50914] rounded-full font-mono border border-[#E50914]/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              {selectedProject.link !== "#" && (
                <VecnaButton onClick={() => window.open(selectedProject.link, "_blank")} glowIntensity="medium">
                  <span className="flex items-center gap-2">
                    <ExternalLink size={18} />
                    View Live
                  </span>
                </VecnaButton>
              )}
              <VecnaButton variant="secondary" onClick={() => window.open(selectedProject.github, "_blank")}>
                <span className="flex items-center gap-2">
                  <Github size={18} />
                  Source Code
                </span>
              </VecnaButton>
            </div>
          </div>
        )}
      </VecnaModal>
    </section>
  )
}
