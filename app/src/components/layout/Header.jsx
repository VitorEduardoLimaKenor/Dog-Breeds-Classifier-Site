import { motion } from 'framer-motion'
import { NavLink, Link } from 'react-router-dom'
import { Github, Linkedin } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Sobre' },
  { to: '/projetos', label: 'Projetos' },
]

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#050508]/70 border-b border-[#1e1e35]/50"
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-blue-500/20">
              VK
            </div>
            <span className="hidden sm:inline text-white font-semibold tracking-tight group-hover:text-cyan-400 transition-colors">
              Vitor Kenor
            </span>
          </Link>

          {/* Navegação */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-[#B3B3C3] hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Sociais */}
          <div className="flex items-center gap-2">
            <motion.a
              href="https://github.com/VitorEduardoLimaKenor"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg text-[#B3B3C3] hover:text-cyan-400 hover:bg-white/5 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/vitor-eduardo-de-lima-kenor-803464273"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg text-[#B3B3C3] hover:text-cyan-400 hover:bg-white/5 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
