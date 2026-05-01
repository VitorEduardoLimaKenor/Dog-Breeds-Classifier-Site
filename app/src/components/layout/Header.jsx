import { motion } from 'framer-motion'
import { NavLink, Link, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/',         label: 'Home', end: true },
  { to: '/#sobre',   label: 'Sobre' },
  { to: '/projetos', label: 'Portfólio' },
]

export default function Header() {
  const { pathname, hash } = useLocation()

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-page/70 border-b border-[rgba(201,168,122,0.12)]"
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display text-2xl font-extrabold tracking-tight gold-text">
              VK
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = item.end
                ? pathname === '/' && !hash
                : item.to.startsWith('/#')
                  ? pathname === '/' && hash === item.to.slice(1)
                  : pathname.startsWith(item.to)

              return item.to.startsWith('/#') ? (
                <a
                  key={item.to}
                  href={item.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'text-cream' : 'text-ink2 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive: navActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      navActive ? 'text-cream' : 'text-ink2 hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            })}
          </nav>

          <a
            href="#contato"
            className="px-4 py-2 rounded-full text-sm font-semibold bg-cream text-page hover:bg-goldL transition-colors shadow-[0_8px_24px_-8px_rgba(251,231,196,0.5)]"
          >
            Contato
          </a>
        </div>
      </div>
    </motion.header>
  )
}
