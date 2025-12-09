"use client"

import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative w-full bg-shadow-black border-t border-neon-red/20 overflow-hidden py-12">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-5">
        <div
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgb(229, 9, 20) 2px,
              rgb(229, 9, 20) 4px
            )`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        >
          {/* Logo/Name */}
          <div>
            <h3 className="text-2xl font-bold text-neon-red tracking-wider">SARWESHERO</h3>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-2">
              Full Stack Developer & AI/ML Engineer
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <p className="text-xs font-mono text-electric-blue uppercase tracking-widest mb-3">Navigation</p>
            {["About", "Projects", "Experience", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="block text-sm text-fog-white hover:text-neon-red transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="space-y-2">
            <p className="text-xs font-mono text-electric-blue uppercase tracking-widest mb-3">Connect</p>
            {[
              { name: "GitHub", url: "https://github.com/sarweshero" },
              { name: "LinkedIn", url: "https://linkedin.com/in/sarweshero" },
              { name: "X", url: "https://x.com/sarweshero" },
              { name: "Email", url: "mailto:sarweshero@gmail.com" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-fog-white hover:text-electric-blue transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          className="pt-8 border-t border-border/30 text-center space-y-2"
        >
          <p className="text-xs font-mono text-muted-foreground">© {currentYear} Sarweshero. All rights reserved.</p>
          <p className="text-xs font-mono text-electric-blue/70">Crafted with passion from the Upside Down</p>
        </motion.div>
      </div>
    </footer>
  )
}
