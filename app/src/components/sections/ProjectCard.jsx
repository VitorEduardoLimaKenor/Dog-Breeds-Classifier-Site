import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Star } from 'lucide-react'

export default function ProjectCard({ project, index = 0 }) {
  const cardLink = project.externalUrl || project.repoUrl || '#'

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group relative p-5 bg-gradient-to-br from-[#0e1424] to-[#0b1020] border border-[rgba(201,168,122,0.18)] rounded-2xl hover:border-[rgba(201,168,122,0.5)] hover:shadow-gold-glow transition-all overflow-hidden"
    >
      {project.featured && (
        <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[rgba(201,168,122,0.12)] text-goldL border border-[rgba(201,168,122,0.35)] z-10">
          <Star className="w-3 h-3" /> Destaque
        </span>
      )}

      {project.cover && (
        <div className="aspect-[16/9] mb-5 rounded-xl overflow-hidden ring-1 ring-[rgba(201,168,122,0.2)] bg-[#0a1322]">
          <img
            src={project.cover}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-ink3">
          {project.year && <span>{project.year}</span>}
          {project.year && project.tags?.[0] && <span>•</span>}
          <span className="text-goldL">{project.tags?.[0]}</span>
        </div>

        <h3 className="font-display text-xl font-bold text-white group-hover:text-cream transition-colors">
          {project.title}
        </h3>
        <p className="text-ink2 text-sm leading-relaxed line-clamp-3">
          {project.tagline}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack?.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-full text-[11px] text-ink2 border border-[rgba(201,168,122,0.18)] bg-[#0a1322]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[rgba(201,168,122,0.15)]">
          <a
            href={cardLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-cream hover:text-goldL transition-colors"
          >
            Ver projeto <ArrowUpRight className="w-4 h-4" />
          </a>

          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md text-ink3 hover:text-white hover:bg-white/5 transition-colors"
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
