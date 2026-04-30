import { Github, Linkedin, Mail } from 'lucide-react'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-[#1e1e35]/50 relative">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-white font-semibold">Vitor Eduardo de Lima Kenor</p>
          <p className="text-[#6b6b80] text-sm max-w-md">
            Desenvolvedor focado em Inteligência Artificial, Visão Computacional e Web.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/VitorEduardoLimaKenor"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[#B3B3C3] hover:text-cyan-400 hover:bg-white/5 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/vitor-eduardo-de-lima-kenor-803464273"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[#B3B3C3] hover:text-cyan-400 hover:bg-white/5 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:vitoreduardokenor@gmail.com"
              className="p-2 rounded-lg text-[#B3B3C3] hover:text-cyan-400 hover:bg-white/5 transition-colors"
              aria-label="E-mail"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <p className="text-[#6b6b80] text-xs pt-4 border-t border-[#1e1e35]/30 w-full max-w-md">
            © {year} Vitor Kenor — Construído com React, Vite e Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}
