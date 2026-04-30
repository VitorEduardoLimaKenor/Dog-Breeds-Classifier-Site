import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Github, Linkedin, Mail, Sparkles,
  Brain, Code, Eye, Zap,
} from 'lucide-react'

import BackgroundFX from '../components/layout/BackgroundFX'
import ProjectCard from '../components/sections/ProjectCard'
import { projects } from '../data/projects'

const skills = [
  { icon: Brain,  title: 'Inteligência Artificial', desc: 'Deep Learning, Transfer Learning, modelos de classificação.' },
  { icon: Eye,    title: 'Visão Computacional',     desc: 'TensorFlow, Keras, OpenCV, pipelines de imagem.' },
  { icon: Code,   title: 'Desenvolvimento Web',     desc: 'React, Vite, Tailwind, FastAPI, Docker.' },
  { icon: Zap,    title: 'Entrega Ponta a Ponta',   desc: 'Da modelagem ao deploy: API, frontend e infra.' },
]

const featured = projects.filter((p) => p.featured)

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050508] relative overflow-hidden">
      <BackgroundFX />

      {/* ===================== HERO ===================== */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[auto,1fr] gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative justify-self-center md:justify-self-start"
            >
              <div className="relative">
                <img
                  src="/images/vitor.jpg"
                  alt="Vitor Eduardo de Lima Kenor"
                  className="w-40 h-40 md:w-48 md:h-48 rounded-3xl object-cover ring-2 ring-blue-500/40"
                />
                <motion.div
                  className="absolute -bottom-3 -right-3 w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </motion.div>

            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-3"
              >
                Olá! Eu sou
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold leading-tight mb-4"
              >
                <span className="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  Vitor Kenor
                </span>
                <span className="block text-2xl md:text-3xl mt-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Desenvolvedor & Entusiasta de IA
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-[#B3B3C3] text-lg leading-relaxed mb-6 max-w-2xl"
              >
                Construo soluções que unem <span className="text-white font-medium">Inteligência Artificial</span>,{' '}
                <span className="text-white font-medium">Visão Computacional</span> e{' '}
                <span className="text-white font-medium">Desenvolvimento Web</span> — da modelagem ao deploy. Aqui você encontra os projetos em que venho trabalhando.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                <Link
                  to="/projetos"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl text-white font-semibold shadow-lg shadow-blue-500/20 transition-all"
                >
                  Ver projetos <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="mailto:vitoreduardokenor@gmail.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0a0a15] border border-[#2a2a45] hover:border-cyan-500/50 rounded-xl text-white font-medium transition-all"
                >
                  <Mail className="w-4 h-4" /> Entrar em contato
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-3 mt-6 text-[#6b6b80]"
              >
                <a
                  href="https://github.com/VitorEduardoLimaKenor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/vitor-eduardo-de-lima-kenor-803464273"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ===================== SOBRE ===================== */}
      <section className="py-16 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="Sobre mim" title="Um pouco sobre minha jornada" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-6 text-[#B3B3C3] leading-relaxed"
          >
            <p>
              Sou apaixonado por resolver problemas com <span className="text-cyan-400">Aprendizado de Máquina</span> e
              transformar modelos em produtos que as pessoas conseguem usar de verdade. Trabalho confortável tanto na
              parte de <span className="text-blue-400">treinamento e avaliação de modelos</span> quanto em
              <span className="text-blue-400"> APIs, frontend e infraestrutura</span>.
            </p>
            <p>
              Em 2025, conclui o <span className="text-cyan-400">Bootcamp de Aprendizado de Máquina do LAMIA</span>, onde
              desenvolvi um classificador de raças de cães com Transfer Learning que alcançou ~95% de precisão. Você pode
              experimentar o modelo na seção de projetos.
            </p>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ===================== STACK ===================== */}
      <section className="py-16 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="Habilidades" title="O que eu faço" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5 bg-gradient-to-br from-[#0a0a15] to-[#0c0c18] border border-[#1e1e35] hover:border-cyan-500/40 rounded-2xl transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-3">
                  <s.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-white font-semibold mb-1">{s.title}</h3>
                <p className="text-[#6b6b80] text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ===================== PROJETOS EM DESTAQUE ===================== */}
      <section className="py-16 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
            <SectionHeader eyebrow="Trabalhos" title="Projetos em destaque" inline />
            <Link
              to="/projetos"
              className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function Divider() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-[#2a2a45] to-transparent" />
    </div>
  )
}

function SectionHeader({ eyebrow, title, inline = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={inline ? '' : 'mb-8'}
    >
      <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-2">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold text-white">{title}</h2>
    </motion.div>
  )
}
