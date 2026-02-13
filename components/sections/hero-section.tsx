"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const socialLinks = [
    { icon: Github, href: "https://github.com/sarweshero", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/sarweshero", label: "LinkedIn" },
    { icon: Mail, href: "mailto:sarweshero@gmail.com", label: "Email" },
  ]

  return (
    <section ref={ref} className="newspaper-container py-8 md:py-12">
      {/* Featured headline layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 column-rule">
        {/* Main Feature — Left Column */}
        <motion.article
          className="lg:col-span-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="article-block-featured">
            <motion.span
              className="section-label mb-4"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Feature Story
            </motion.span>

            <motion.h2
              className="headline-1 mt-4 mb-4"
              initial={{ opacity: 0, letterSpacing: "0.04em", scale: 0.97 }}
              animate={
                isInView
                  ? { opacity: 1, letterSpacing: "-0.02em", scale: 1 }
                  : {}
              }
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              A Developer Building the Future with Code & Intelligence
            </motion.h2>

            <motion.p
              className="text-base md:text-xl text-[var(--ink-muted)] mb-6 leading-relaxed"
              style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              From full-stack web platforms to AI-powered diagnostic systems — 
              Sarweshwar combines engineering rigor with creative ambition to craft 
              impactful digital solutions.
            </motion.p>

            <motion.div
              className="body-text drop-cap animate-drop-cap mb-8"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <p>
                Sarweshwar is a Computer Science undergraduate at Karpagam Academy
                of Higher Education with a proven track record in backend development,
                computer vision, and full-stack web technologies. As the IEEE Student
                Branch Chairperson and GeeksforGeeks Event Head, he continuously
                pushes boundaries — having participated in over 10 hackathons,
                reaching finals in 2, and winning selection in 1 with ₹15 lakh
                funding for a YOLO-based pest detection system.
              </p>
            </motion.div>

            {/* Action Links — upgraded to cta-button with touch targets */}
            <motion.div
              className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <a
                href="/sarwesh_resume1.pdf"
                download="sarwesh_resume.pdf"
                className="cta-button cta-button-primary"
              >
                Download Résumé
              </a>

              <button
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="cta-button"
              >
                Get In Touch
              </button>
            </motion.div>
          </div>
        </motion.article>

        {/* Sidebar — Right Column */}
        <motion.aside
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
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

            {/* Social Links — 48px touch targets */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--accent-burgundy)] border border-[var(--rule)] hover:border-[var(--accent-burgundy)] transition-all duration-300 hover:shadow-[0_1px_4px_rgba(0,0,0,0.08)] active:scale-95"
                  style={{ width: "48px", height: "48px" }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
