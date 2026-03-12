import { Github, Sparkles, Linkedin } from 'lucide-react'

const techs = ['Python', 'TensorFlow', 'Keras', 'Transfer Learning', 'InceptionV3']

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-[#1e1e35]/50 relative">
      <div className="max-w-5xl mx-auto">
        {/* Author Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <img 
              src="/images/vitor.jpg" 
              alt="Vitor Eduardo de Lima Kenor"
              className="w-24 h-24 rounded-full object-cover ring-2 ring-blue-500/50 hover:ring-cyan-400/70 transition-all"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-500/20 to-transparent" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-1">Vitor Eduardo de Lima Kenor</h3>
          <p className="text-[#6b6b80] text-sm mb-3">Desenvolvedor do Projeto</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/VitorEduardoLimaKenor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#B3B3C3] hover:text-cyan-400 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/vitor-eduardo-de-lima-kenor-803464273"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#B3B3C3] hover:text-cyan-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {techs.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-[#0a0a15] border border-[#1e1e35] rounded-full text-[#B3B3C3] text-xs hover:text-cyan-400 hover:border-blue-500/50 transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer Info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-[#1e1e35]/30">
          <p className="text-[#6b6b80] text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Projeto de portfólio • Deep Learning & Computer Vision
          </p>
        </div>
      </div>
    </footer>
  )
}
