import { motion } from 'framer-motion'

import BackgroundFX from '../components/layout/BackgroundFX'
import ProjectCard from '../components/sections/ProjectCard'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <div className="min-h-screen bg-[#050508] relative overflow-hidden">
      <BackgroundFX />

      <section className="pt-32 pb-16 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-2">
              Portfólio
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Projetos</h1>
            <p className="text-[#B3B3C3] max-w-2xl leading-relaxed">
              Coleção dos trabalhos em que venho atuando — da pesquisa ao deploy. Cada card abre
              uma página com detalhes técnicos, métricas e (quando aplicável) uma demo interativa.
            </p>
          </motion.div>

          {projects.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="p-10 text-center bg-[#0a0a15] border border-[#1e1e35] rounded-2xl">
      <p className="text-[#6b6b80]">Nenhum projeto cadastrado ainda.</p>
    </div>
  )
}
