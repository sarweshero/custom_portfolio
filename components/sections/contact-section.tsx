"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Mail, Github, Linkedin, Twitter, CheckCircle } from "lucide-react"

const socialLinks = [
  { name: "Phone", icon: Mail, href: "tel:+916383073831", value: "+91 6383073831" },
  { name: "Email", icon: Mail, href: "mailto:sarweshero@gmail.com", value: "sarweshero@gmail.com" },
  { name: "GitHub", icon: Github, href: "https://github.com/sarweshero", value: "github.com/sarweshero" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/sarweshero/", value: "linkedin.com/in/sarweshero" },
  { name: "X/Twitter", icon: Twitter, href: "https://x.com/sarweshero", value: "x.com/sarweshero" },
]

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("subject", formData.subject)
      formDataToSend.append("message", formData.message)
      formDataToSend.append("_subject", "New Portfolio Contact Message")
      formDataToSend.append("_captcha", "false")

      const response = await fetch("https://formsubmit.co/sarweshero@gmail.com", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setStatus("idle"), 3000)
      } else {
        setStatus("idle")
      }
    } catch (error) {
      setStatus("idle")
    }
  }

  return (
    <section ref={ref} id="contact" className="newspaper-container py-8 md:py-12">
      {/* Section Header */}
      <motion.div
        className="text-center mb-8 md:mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="section-label">Classifieds</span>
        <h2 className="headline-2 mt-4">Get In Touch</h2>
        <p
          className="text-[var(--ink-muted)] text-sm mt-2 italic"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Available for opportunities, collaborations, and interesting conversations
        </p>
        <hr className="divider-single mt-4 max-w-xs mx-auto" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 max-w-5xl mx-auto column-rule">
        {/* Contact Form — Left Column */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="article-block">
            <h3 className="headline-4 mb-6">Send a Letter</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="meta-text block mb-2" htmlFor="contact-name">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-[var(--rule)] px-4 py-3 text-base focus:border-[var(--ink)] outline-none transition-colors"
                  placeholder="Your name"
                  required
                  autoComplete="name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="meta-text block mb-2" htmlFor="contact-email">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-[var(--rule)] px-4 py-3 text-base focus:border-[var(--ink)] outline-none transition-colors"
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="meta-text block mb-2" htmlFor="contact-subject">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full border border-[var(--rule)] px-4 py-3 text-base focus:border-[var(--ink)] outline-none transition-colors"
                  placeholder="Subject of inquiry"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="meta-text block mb-2" htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full border border-[var(--rule)] px-4 py-3 text-base focus:border-[var(--ink)] outline-none transition-colors resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="cta-button cta-button-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "idle" && "Send Message"}
                {status === "sending" && "Sending..."}
                {status === "success" && (
                  <>
                    <CheckCircle size={14} />
                    Message Sent
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Contact Directory — Right Column */}
        <motion.aside
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="article-block">
            <h3 className="headline-4 mb-4">Directory</h3>

            <div className="space-y-0">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-3 border-b border-[var(--rule)] group"
                  style={{ minHeight: "48px" }}
                >
                  <div className="flex items-center gap-3">
                    <link.icon size={18} className="text-[var(--ink-muted)] group-hover:text-[var(--ink)] transition-colors" />
                    <span
                      className="text-sm text-[var(--ink)] group-hover:text-[var(--accent-burgundy)] transition-colors"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {link.name}
                    </span>
                  </div>
                  <span className="text-xs text-[var(--ink-muted)] underline underline-offset-2 group-hover:text-[var(--ink)] transition-colors" style={{ fontFamily: "var(--font-mono)" }}>
                    {link.value}
                  </span>
                </a>
              ))}
            </div>

            <hr className="divider-single my-6" />

            {/* Location */}
            <div>
              <h4 className="meta-text mb-2">Current Location</h4>
              <p className="text-sm text-[var(--ink)]" style={{ fontFamily: "var(--font-body)" }}>
                Karpagam Academy of Higher Education
              </p>
              <p className="text-sm text-[var(--ink-muted)]" style={{ fontFamily: "var(--font-body)" }}>
                Coimbatore, Tamil Nadu, India
              </p>
            </div>

            <hr className="divider-single my-6" />

            {/* Availability */}
            <div className="border border-[var(--rule)] p-4">
              <p className="meta-text mb-2 text-center">Availability Status</p>
              <p className="text-center text-sm" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
                Open to internships, freelance projects, and full-time opportunities.
              </p>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[var(--ink)]/50" />
            <motion.div
              className="relative bg-[var(--paper)] border-2 border-[var(--ink)] p-8 text-center max-w-md"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              exit={{ y: 20 }}
            >
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-[var(--ink)]" />
              <h3 className="headline-3 mb-2">Message Received</h3>
              <p className="body-text text-sm">
                Your message has been sent successfully. I&apos;ll get back to you shortly.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
