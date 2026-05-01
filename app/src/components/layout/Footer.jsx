import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Instagram } from 'lucide-react'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-[rgba(201,168,122,0.12)] py-10 px-6 relative">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-center">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
          <span className="font-display text-2xl font-extrabold gold-text">VK</span>
          <nav className="flex items-center gap-4 text-sm text-ink2">
            <Link to="/" className="hover:text-white">Home</Link>
            <a href="/#sobre" className="hover:text-white">Sobre</a>
            <Link to="/projetos" className="hover:text-white">Portfólio</Link>
            <a href="/#contato" className="hover:text-white">Contato</a>
          </nav>
          <p className="text-ink3 text-xs md:ml-auto">© {year} Vitor Kenor</p>
        </div>

        <div className="flex md:justify-end items-center gap-4">
          <span className="text-ink2 text-sm hidden sm:inline">vitoreduardokenor@gmail.com</span>
          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/in/vitor-eduardo-de-lima-kenor-803464273"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-ink2 hover:text-cream hover:bg-white/5 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/VitorEduardoLimaKenor"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-ink2 hover:text-cream hover:bg-white/5 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-ink2 hover:text-cream hover:bg-white/5 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="mailto:vitoreduardokenor@gmail.com"
              className="p-2 rounded-lg text-ink2 hover:text-cream hover:bg-white/5 transition-colors"
              aria-label="E-mail"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
