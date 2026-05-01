import { motion } from 'framer-motion'

import BackgroundFX from '../components/layout/BackgroundFX'
import ProjectCard from '../components/sections/ProjectCard'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <div className="relative">
      <BackgroundFX />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16 relative">
        <section className="section-card px-6 sm:px-12 py-14 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl font-extrabold gold-text inline-block mb-5">
              Portfólio
            </h1>
            <p className="text-ink2 max-w-2xl mx-auto leading-relaxed">
              Coleção dos trabalhos em que venho atuando — da pesquisa ao deploy. Cada
              card abre uma página com detalhes técnicos, métricas e (quando aplicável)
              uma demo interativa.
            </p>
          </motion.div>

          {projects.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {projects.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="p-10 text-center bg-panel border border-[rgba(201,168,122,0.18)] rounded-2xl max-w-2xl mx-auto">
      <p className="text-ink3">Nenhum projeto cadastrado ainda.</p>
    </div>
  )
}
