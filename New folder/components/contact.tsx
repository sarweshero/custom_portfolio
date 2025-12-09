"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, send to backend
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", message: "" })
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const contactLinks = [
    {
      label: "Email",
      value: "sarweshero@gmail.com",
      href: "mailto:sarweshero@gmail.com",
      icon: "✉",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/sarweshero",
      href: "https://linkedin.com/in/sarweshero",
      icon: "in",
    },
    {
      label: "GitHub",
      value: "github.com/sarweshero",
      href: "https://github.com/sarweshero",
      icon: "⚡",
    },
    {
      label: "X",
      value: "x.com/sarweshero",
      href: "https://x.com/sarweshero",
      icon: "𝕏",
    },
  ]

  return (
    <section className="relative w-full py-32 bg-shadow-black overflow-hidden" id="contact">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl bg-neon-red opacity-5" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl bg-electric-blue opacity-5" />

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
            Get In Touch
          </h2>
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">
            Transmission from the Upside Down
          </p>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-dark-purple border-2 border-neon-red rounded-lg p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-mono text-electric-blue uppercase tracking-widest">Signal Transmission</p>
                  <p className="text-fog-white">Send me a message and I'll get back to you as soon as possible.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <motion.div whileFocus={{ scale: 1.01 }}>
                    <label className="block text-sm font-mono text-neon-red mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-neon-red rounded text-fog-white font-mono placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-red focus:border-transparent transition-all"
                      placeholder="Your name"
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div whileFocus={{ scale: 1.01 }}>
                    <label className="block text-sm font-mono text-neon-red mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-neon-red rounded text-fog-white font-mono placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-red focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div whileFocus={{ scale: 1.01 }}>
                    <label className="block text-sm font-mono text-neon-red mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-background border border-neon-red rounded text-fog-white font-mono placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-red focus:border-transparent transition-all resize-none"
                      placeholder="Your message..."
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 bg-neon-red text-white font-mono font-bold rounded hover:bg-neon-red-light transition-all uppercase tracking-widest relative overflow-hidden"
                  >
                    {submitted ? (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        Message Sent! ✓
                      </motion.span>
                    ) : (
                      "Send Signal"
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-xs font-mono text-electric-blue uppercase tracking-widest mb-4">Quick Links</p>
            {contactLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10, color: "rgb(0, 180, 255)" }}
                className="block p-4 bg-dark-purple border border-border rounded hover:border-neon-red transition-all duration-300 group"
              >
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{link.label}</div>
                <div className="text-sm text-neon-red group-hover:text-electric-blue mt-2 break-all font-mono">
                  {link.value}
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
