import { Link, useLocation } from 'react-router-dom'
import { Home, User, Briefcase, Phone } from 'lucide-react'

const items = [
  { type: 'link',   to: '/',         icon: Home,      label: 'Home' },
  { type: 'anchor', href: '#sobre',  icon: User,      label: 'Sobre' },
  { type: 'link',   to: '/projetos', icon: Briefcase, label: 'Portfólio' },
  { type: 'anchor', href: '#contato',icon: Phone,     label: 'Contato' },
]

export default function SideDock() {
  const { pathname } = useLocation()

  return (
    <div className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-1 p-1.5 rounded-full border border-[rgba(201,168,122,0.25)] bg-panel/80 backdrop-blur-md shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
      {items.map((it) => {
        const Icon = it.icon
        const isActive = it.type === 'link' && pathname === it.to

        const cls = `group relative w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
          isActive
            ? 'bg-[rgba(201,168,122,0.18)] text-cream'
            : 'text-ink2 hover:text-cream hover:bg-[rgba(201,168,122,0.1)]'
        }`

        const tooltip = (
          <span className="pointer-events-none absolute right-full mr-3 px-2 py-1 rounded-md bg-panel border border-[rgba(201,168,122,0.25)] text-xs text-ink2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {it.label}
          </span>
        )

        return it.type === 'link' ? (
          <Link key={it.label} to={it.to} className={cls} aria-label={it.label}>
            <Icon className="w-4 h-4" />
            {tooltip}
          </Link>
        ) : (
          <a key={it.label} href={it.href} className={cls} aria-label={it.label}>
            <Icon className="w-4 h-4" />
            {tooltip}
          </a>
        )
      })}
    </div>
  )
}
