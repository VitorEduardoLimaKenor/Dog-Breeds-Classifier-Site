import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Github, Star } from 'lucide-react'

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group relative p-6 bg-gradient-to-br from-[#0a0a15] to-[#0c0c1a] border border-[#1e1e35] rounded-2xl hover:border-cyan-500/40 hover:shadow-xl hover:shadow-blue-500/10 transition-all overflow-hidden"
    >
      {project.featured && (
        <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Star className="w-3 h-3" /> Destaque
        </span>
      )}

      {project.cover && (
        <div className="aspect-[16/9] mb-5 rounded-xl overflow-hidden ring-1 ring-[#1e1e35] bg-[#0f0f1a]">
          <img
            src={project.cover}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-[#6b6b80]">
          {project.year && <span>{project.year}</span>}
          {project.year && project.tags?.[0] && <span>•</span>}
          <span className="text-cyan-400">{project.tags?.[0]}</span>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-[#B3B3C3] text-sm leading-relaxed line-clamp-3">
          {project.tagline}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack?.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-full text-[11px] text-[#a0a0b5] border border-[#1e1e35] bg-[#0c0c18]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#1e1e35]/60">
          <Link
            to={project.links?.live || '#'}
            className="inline-flex items-center gap-1 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Ver projeto <ArrowUpRight className="w-4 h-4" />
          </Link>

          {project.links?.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md text-[#6b6b80] hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Repositório no GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
