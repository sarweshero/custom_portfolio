"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Download, Github, Linkedin, Mail } from "lucide-react"

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const socialLinks = [
    { icon: Github, href: "https://github.com/sarweshero", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/sarweshero", label: "LinkedIn" },
    { icon: Mail, href: "mailto:sarweshero@gmail.com", label: "Email" },
  ]

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/sarwesh_resume1.pdf"
    link.download = "sarwesh_resume.pdf"
    link.click()
  }

  return (
    <section ref={ref} className="newspaper-container py-12">
      {/* Featured headline layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 column-rule">
        {/* Main Feature — Left Column */}
        <motion.article
          className="lg:col-span-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="article-block-featured">
            <span className="section-label mb-4">Feature Story</span>

            <h2 className="headline-1 mt-4 mb-4">
              A Developer Building the Future with Code & Intelligence
            </h2>

            <p
              className="text-lg md:text-xl text-[var(--ink-muted)] mb-6 leading-relaxed"
              style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
            >
              From full-stack web platforms to AI-powered diagnostic systems — 
              Sarweshwar combines engineering rigor with creative ambition to craft 
              impactful digital solutions.
            </p>

            <div className="body-text drop-cap mb-8">
              <p>
                Sarweshwar is a Computer Science undergraduate at Karpagam Academy
                of Higher Education with a proven track record in backend development,
                computer vision, and full-stack web technologies. As the IEEE Student
                Branch Chairperson and GeeksforGeeks Event Head, he continuously
                pushes boundaries — having participated in over 10 hackathons,
                reaching finals in 2, and winning selection in 1 with ₹15 lakh
                funding for a YOLO-based pest detection system.
              </p>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-6 mt-6">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 text-[var(--ink)] border-b-2 border-[var(--ink)] pb-0.5 hover:text-[var(--accent-burgundy)] hover:border-[var(--accent-burgundy)] transition-colors text-sm font-medium"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                <Download size={16} />
                Download Résumé
              </button>

              <button
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 text-[var(--ink-muted)] border-b border-[var(--rule)] pb-0.5 hover:text-[var(--ink)] hover:border-[var(--ink)] transition-colors text-sm"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Get In Touch →
              </button>
            </div>
          </div>
        </motion.article>

        {/* Sidebar — Right Column */}
        <motion.aside
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="article-block">
            <span className="section-label mb-4">Quick Reference</span>

            <dl className="mt-4 space-y-3 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              <div>
                <dt className="meta-text mb-0.5">Name</dt>
                <dd className="text-[var(--ink)]">Sarweshwar</dd>
              </div>
              <hr className="divider-single" />
              <div>
                <dt className="meta-text mb-0.5">Role</dt>
                <dd className="text-[var(--ink)]">Full Stack Developer & AI/ML Engineer</dd>
              </div>
              <hr className="divider-single" />
              <div>
                <dt className="meta-text mb-0.5">Institution</dt>
                <dd className="text-[var(--ink)]">Karpagam Academy of Higher Education</dd>
              </div>
              <hr className="divider-single" />
              <div>
                <dt className="meta-text mb-0.5">Location</dt>
                <dd className="text-[var(--ink)]">Coimbatore, India</dd>
              </div>
              <hr className="divider-single" />
              <div>
                <dt className="meta-text mb-0.5">Entrepreneurship</dt>
                <dd className="text-[var(--ink)]">Co-Founder, Xyndrix</dd>
              </div>
            </dl>

            <hr className="divider-single my-4" />

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[var(--ink-muted)] hover:text-[var(--ink)] border border-[var(--rule)] hover:border-[var(--ink)] transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
