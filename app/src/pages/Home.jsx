import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Github, Linkedin, Mail, MapPin, Send,
  Brain, Code, Eye, Zap, Diamond, Lock, Instagram,
} from 'lucide-react'

import BackgroundFX from '../components/layout/BackgroundFX'
import ProjectCard from '../components/sections/ProjectCard'
import { projects } from '../data/projects'

const skills = [
  { icon: Brain, title: 'Inteligência Artificial' },
  { icon: Eye,   title: 'Visão Computacional' },
  { icon: Code,  title: 'Desenvolvimento Web' },
  { icon: Zap,   title: 'Deploy & APIs' },
  { icon: Diamond, title: 'Python / TensorFlow' },
  { icon: Diamond, title: 'React / Tailwind' },
  { icon: Diamond, title: 'FastAPI' },
  { icon: Diamond, title: 'Docker' },
  { icon: Lock,  title: 'LLMs', locked: true },
  { icon: Lock,  title: 'MLOps', locked: true },
  { icon: Lock,  title: 'AWS / GCP', locked: true },
  { icon: Lock,  title: 'NLP', locked: true },
]

const featured = projects.filter((p) => p.featured)

export default function Home() {
  return (
    <div className="relative">
      <BackgroundFX />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16 space-y-8 relative">
        <HeroCard />
        <AboutCard />
        <ProjectsCard />
        <ContactCard />
      </div>
    </div>
  )
}

/* ============================================================ */
/* HERO                                                         */
/* ============================================================ */

function HeroCard() {
  return (
    <section className="section-card px-6 sm:px-12 py-14 md:py-20">
      <div className="grid md:grid-cols-[1fr,auto] gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-ink3 text-sm tracking-wide mb-3">Olá, meu nome é</p>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-tight text-white mb-4">
            Vitor Eduardo Kenor
          </h1>
          <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold tracking-wide bg-gradient-to-r from-[rgba(201,168,122,0.18)] to-[rgba(201,168,122,0.04)] border border-[rgba(201,168,122,0.35)] text-goldL mb-5">
            Desenvolvedor / Entusiasta de IA
          </span>
          <p className="text-ink2 text-sm md:text-base leading-relaxed max-w-xl mb-5">
            Construo soluções unindo Inteligência Artificial, Visão Computacional e
            Desenvolvimento Web — da modelagem ao deploy. Aqui você encontra os projetos
            em que venho trabalhando.
          </p>
          <p className="text-sm text-ink3">
            Saiba mais{' '}
            <a href="#sobre" className="text-cream underline underline-offset-4 hover:text-goldL">
              Sobre mim
            </a>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="justify-self-center md:justify-self-end"
        >
          <div className="relative">
            <div className="w-44 h-44 md:w-56 md:h-56 rounded-full p-[2px] bg-gradient-to-br from-goldL via-gold to-[rgba(201,168,122,0.2)]">
              <img
                src="/images/vitor.jpg"
                alt="Vitor Eduardo Kenor"
                className="w-full h-full rounded-full object-cover bg-panel"
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4 text-ink2 text-sm">
            <MapPin className="w-4 h-4 text-gold" />
            <span>São Paulo, Brasil</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ============================================================ */
/* SOBRE                                                        */
/* ============================================================ */

function AboutCard() {
  return (
    <section id="sobre" className="section-card px-6 sm:px-12 py-14 md:py-20">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-5">
          Sobre mim
        </h2>
        <p className="text-ink2 mb-3">
          Eu sou <span className="text-white font-semibold">Vitor Kenor</span>,
          Desenvolvedor / Entusiasta de IA
        </p>
        <p className="text-ink3 leading-relaxed">
          Apaixonado por resolver problemas com Aprendizado de Máquina e transformar
          modelos em produtos que as pessoas conseguem usar de verdade. Trabalho
          confortável tanto na parte de treinamento e avaliação de modelos quanto em
          APIs, frontend e infraestrutura. Em 2025 conclui o Bootcamp de Aprendizado de
          Máquina do LAMIA, onde desenvolvi um classificador de raças de cães com ~95%
          de precisão.
        </p>
      </div>

      <div className="mt-12">
        <h3 className="font-display text-3xl md:text-4xl font-extrabold text-white text-center mb-8">
          Habilidades
        </h3>
        <SkillsGrid />
      </div>
    </section>
  )
}

/* ============================================================ */
/* SKILLS GRID                                                  */
/* ============================================================ */

function SkillsGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
      {skills.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04, duration: 0.4 }}
          className={`relative flex items-center gap-2 px-3 py-3 rounded-lg border text-sm
            ${s.locked
              ? 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-ink3'
              : 'bg-gradient-to-br from-[rgba(201,168,122,0.18)] to-[rgba(201,168,122,0.04)] border-[rgba(201,168,122,0.35)] text-cream'
            }`}
        >
          <s.icon className={`w-4 h-4 flex-shrink-0 ${s.locked ? 'text-ink3' : 'text-gold'}`} />
          <span className="font-medium truncate">{s.title}</span>
        </motion.div>
      ))}
    </div>
  )
}

/* ============================================================ */
/* PROJETOS                                                     */
/* ============================================================ */

function ProjectsCard() {
  return (
    <section id="portfolio" className="section-card px-6 sm:px-12 py-14 md:py-20">
      <div className="text-center mb-10">
        <h2 className="font-display text-4xl md:text-5xl font-extrabold gold-text inline-block">
          Portfólio
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {featured.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/projetos"
          className="inline-flex items-center gap-2 text-cream hover:text-goldL text-sm font-medium"
        >
          Ver todos os projetos <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}

/* ============================================================ */
/* CONTATO                                                      */
/* ============================================================ */

function ContactCard() {
  return (
    <section id="contato" className="section-card px-6 sm:px-12 py-14 md:py-20">
      <div className="text-center mb-10">
        <h2 className="font-display text-4xl md:text-5xl font-extrabold gold-text inline-block">
          Contato
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto rounded-2xl border border-[rgba(201,168,122,0.18)] p-6 md:p-8">
        <div>
          <h3 className="text-white font-display text-2xl font-bold mb-5">Informações</h3>
          <ul className="space-y-3 text-ink2 text-sm mb-7">
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gold" />
              <a href="mailto:vitoreduardokenor@gmail.com" className="hover:text-white">
                vitoreduardokenor@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Github className="w-4 h-4 text-gold" />
              <a
                href="https://github.com/VitorEduardoLimaKenor"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                VitorEduardoLimaKenor
              </a>
            </li>
          </ul>

          <h3 className="text-white font-display text-2xl font-bold mb-4">Redes</h3>
          <ul className="space-y-3 text-ink2 text-sm">
            <li className="flex items-center gap-3">
              <Linkedin className="w-4 h-4 text-gold" />
              <a
                href="https://www.linkedin.com/in/vitor-eduardo-de-lima-kenor-803464273"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                vitor-eduardo-de-lima-kenor
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Instagram className="w-4 h-4 text-gold" />
              <span className="text-ink3">@vitorkenor</span>
            </li>
          </ul>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Nome"
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border border-[rgba(201,168,122,0.25)] text-white placeholder:text-ink3 focus:outline-none focus:border-[rgba(201,168,122,0.6)] transition-colors"
          />
          <input
            type="email"
            placeholder="E-mail"
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border border-[rgba(201,168,122,0.25)] text-white placeholder:text-ink3 focus:outline-none focus:border-[rgba(201,168,122,0.6)] transition-colors"
          />
          <textarea
            rows="5"
            placeholder="Mensagem"
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border border-[rgba(201,168,122,0.25)] text-white placeholder:text-ink3 focus:outline-none focus:border-[rgba(201,168,122,0.6)] transition-colors resize-none"
          />
          <button
            type="submit"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-cream text-page font-semibold hover:bg-goldL transition-colors shadow-[0_10px_30px_-10px_rgba(251,231,196,0.5)]"
          >
            Enviar <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  )
}
