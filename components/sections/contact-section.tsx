"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Send, Mail, Github, Linkedin, Twitter, CheckCircle, AlertCircle, Radio } from "lucide-react"
import { useReducedMotion } from "@/components/providers/reduced-motion-provider"

const socialLinks = [
  { name: "Phone", icon: Mail, href: "tel:+916383073831", value: "+91 6383073831" },
  { name: "Email", icon: Mail, href: "mailto:sarweshero@gmail.com", value: "sarweshero@gmail.com" },
  { name: "GitHub", icon: Github, href: "https://github.com/sarweshero", value: "github.com/sarweshero" },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/sarweshero/",
    value: "linkedin.com/in/sarweshero",
  },
  { name: "X/Twitter", icon: Twitter, href: "https://x.com/sarweshero", value: "x.com/sarweshero" },
]

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { reducedMotion } = useReducedMotion()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setStatus("success")

    setTimeout(() => {
      setStatus("idle")
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="relative min-h-screen py-32 px-4"
      initial={{ rotateX: 180, opacity: 0 }}
      whileInView={{ rotateX: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50, rotateX: 180 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[#E50914] font-[var(--font-playfair)] mb-4">CONTACT</h2>
          <p className="text-[#888888] font-mono text-sm">RADIO TERMINAL // SEND TRANSMISSION</p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#E50914] to-transparent mx-auto mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form - CRT Style */}
          <motion.div
            className="glass-card rounded-xl overflow-hidden"
            initial={{ opacity: 0, x: -50, rotateX: 180 }}
            animate={isInView ? { opacity: 1, x: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {/* CRT Header */}
            <div className="h-12 bg-gradient-to-r from-[#1A001F] via-[#0A0A0A] to-[#1A001F] flex items-center px-4 border-b border-[#E50914]/20">
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-3 h-3 rounded-full bg-[#E50914]"
                  animate={reducedMotion ? {} : { opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                />
                <Radio className="w-4 h-4 text-[#E50914]" />
                <span className="text-xs font-mono text-[#DADADA]">TRANSMISSION TERMINAL</span>
              </div>
              <div className="ml-auto text-xs font-mono text-[#888888]">FREQ: 11.375</div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Name Field */}
              <div className="relative">
                <label className="block text-xs font-mono text-[#888888] mb-2">IDENTIFIER:</label>
                <motion.input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-[#0A0A0A] border border-[#2A0A10] rounded-lg px-4 py-3 text-[#DADADA] font-mono focus:outline-none focus:border-[#E50914] transition-colors"
                  placeholder="Your name..."
                  required
                  animate={focusedField === "name" ? { boxShadow: "0 0 20px rgba(229,9,20,0.3)" } : {}}
                />
                {focusedField === "name" && (
                  <motion.div
                    className="absolute right-3 top-9 w-2 h-2 rounded-full bg-[#E50914]"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </div>

              {/* Email Field */}
              <div className="relative">
                <label className="block text-xs font-mono text-[#888888] mb-2">FREQUENCY (EMAIL):</label>
                <motion.input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-[#0A0A0A] border border-[#2A0A10] rounded-lg px-4 py-3 text-[#DADADA] font-mono focus:outline-none focus:border-[#E50914] transition-colors"
                  placeholder="your@email.com"
                  required
                  animate={focusedField === "email" ? { boxShadow: "0 0 20px rgba(229,9,20,0.3)" } : {}}
                />
              </div>

              {/* Subject Field */}
              <div className="relative">
                <label className="block text-xs font-mono text-[#888888] mb-2">SUBJECT CODE:</label>
                <motion.input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-[#0A0A0A] border border-[#2A0A10] rounded-lg px-4 py-3 text-[#DADADA] font-mono focus:outline-none focus:border-[#E50914] transition-colors"
                  placeholder="Subject..."
                  required
                  animate={focusedField === "subject" ? { boxShadow: "0 0 20px rgba(229,9,20,0.3)" } : {}}
                />
              </div>

              {/* Message Field */}
              <div className="relative">
                <label className="block text-xs font-mono text-[#888888] mb-2">MESSAGE CONTENT:</label>
                <motion.textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows={5}
                  className="w-full bg-[#0A0A0A] border border-[#2A0A10] rounded-lg px-4 py-3 text-[#DADADA] font-mono focus:outline-none focus:border-[#E50914] transition-colors resize-none"
                  placeholder="Your message..."
                  required
                  animate={focusedField === "message" ? { boxShadow: "0 0 20px rgba(229,9,20,0.3)" } : {}}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="w-full py-4 bg-gradient-to-r from-[#E50914] to-[#6A1B1F] rounded-lg font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={reducedMotion ? {} : { scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {status === "idle" && (
                  <>
                    <Send size={18} />
                    SEND TRANSMISSION
                  </>
                )}
                {status === "sending" && (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    TRANSMITTING...
                  </>
                )}
                {status === "success" && (
                  <>
                    <CheckCircle size={18} />
                    TRANSMISSION RECEIVED
                  </>
                )}
                {status === "error" && (
                  <>
                    <AlertCircle size={18} />
                    TRANSMISSION FAILED
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Cards */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 50, rotateX: 180 }}
            animate={isInView ? { opacity: 1, x: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h3 className="text-xl font-bold text-[#DADADA] mb-6">Other ways to reach me:</h3>

            {socialLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 rounded-xl flex items-center gap-4 group"
                initial={{ opacity: 0, y: 20, rotateX: 180 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.4 }}
                whileHover={
                  reducedMotion
                    ? {}
                    : {
                        scale: 1.02,
                        boxShadow: "0 0 30px rgba(229,9,20,0.2)",
                      }
                }
              >
                <div className="w-12 h-12 rounded-full bg-[#E50914]/20 flex items-center justify-center group-hover:bg-[#E50914]/30 transition-colors">
                  <link.icon className="w-6 h-6 text-[#E50914]" />
                </div>
                <div>
                  <p className="font-bold text-[#DADADA] group-hover:text-[#E50914] transition-colors">{link.name}</p>
                  <p className="text-sm text-[#888888] font-mono">{link.value}</p>
                </div>
                <motion.div
                  className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={reducedMotion ? {} : { x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Send className="w-5 h-5 text-[#E50914]" />
                </motion.div>
              </motion.a>
            ))}

            {/* Location Info */}
            <motion.div
              className="glass-card p-6 rounded-xl mt-8"
              initial={{ opacity: 0, rotateX: 180 }}
              animate={isInView ? { opacity: 1, rotateX: 0 } : {}}
              transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.4 }}
            >
              <h4 className="text-sm font-mono text-[#888888] mb-2">CURRENT LOCATION:</h4>
              <p className="text-[#DADADA]">Karpagam Academy of Higher Education</p>
              <p className="text-sm text-[#888888] mt-1">Coimbatore, Tamil Nadu, India</p>

              {/* Decorative map placeholder */}
              <div className="mt-4 h-32 rounded-lg bg-[#1A001F]/50 border border-[#2A0A10] flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute w-full h-px bg-[#E50914]/30 top-1/4" />
                  <div className="absolute w-full h-px bg-[#E50914]/30 top-2/4" />
                  <div className="absolute w-full h-px bg-[#E50914]/30 top-3/4" />
                  <div className="absolute h-full w-px bg-[#E50914]/30 left-1/4" />
                  <div className="absolute h-full w-px bg-[#E50914]/30 left-2/4" />
                  <div className="absolute h-full w-px bg-[#E50914]/30 left-3/4" />
                </div>
                <motion.div
                  className="w-4 h-4 rounded-full bg-[#E50914]"
                  animate={
                    reducedMotion
                      ? {}
                      : {
                          scale: [1, 1.5, 1],
                          opacity: [1, 0.5, 1],
                        }
                  }
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
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
            <div className="absolute inset-0 bg-black/80" />
            <motion.div
              className="relative glass-card rounded-xl p-8 text-center max-w-md"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-[#E50914] flex items-center justify-center"
                initial={{ rotate: -180 }}
                animate={{ rotate: 0 }}
              >
                <CheckCircle className="w-10 h-10 text-[#E50914]" />
              </motion.div>
              <h3 className="text-2xl font-bold text-[#E50914] font-[var(--font-playfair)] mb-2">
                TRANSMISSION RECEIVED
              </h3>
              <p className="text-[#DADADA] font-mono text-sm">
                Your message has been sent successfully. I&apos;ll get back to you soon!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
