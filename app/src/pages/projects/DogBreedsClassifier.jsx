import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft, Github, ExternalLink, Loader2, CheckCircle, X,
  Database, TrendingUp, Camera, Layers, FlaskConical, FileCode, Cpu, Sparkles, Zap
} from 'lucide-react'

import BackgroundFX from '../../components/layout/BackgroundFX'

// Em dev, o vite proxy mapeia "/api" -> http://localhost:4004
// Em prod, defina VITE_API_URL com a URL pública da API.
const API_URL = import.meta.env.VITE_API_URL || '/api'
const API_KEY = import.meta.env.VITE_API_KEY

const models = [
  { name: 'VGG16', train: '92%', val: '77%', test: '74%', best: false },
  { name: 'Xception', train: '93%', val: '95%', test: '93%', best: false },
  { name: 'InceptionV3', train: '92%', val: '96%', test: '95%', best: true },
]

const steps = [
  { num: '01', title: 'Coleta de Dados', desc: 'Datasets do Kaggle + Google Images' },
  { num: '02', title: 'Pré-processamento', desc: 'Redimensionamento e normalização' },
  { num: '03', title: 'Data Augmentation', desc: 'Rotação, flip, zoom' },
  { num: '04', title: 'Transfer Learning', desc: 'Modelos pré-treinados ImageNet' },
  { num: '05', title: 'Treinamento', desc: 'Fine-tuning com 30 épocas' },
  { num: '06', title: 'Avaliação', desc: 'Testes com imagens reais' },
]

const breeds = [
  'Beagle', 'Boxer', 'Chihuahua', 'Corgi', 'Dachshund', 'French Bulldog',
  'German Shepherd', 'Golden Retriever', 'Husky', 'Pomeranian', 'Poodle',
  'Pug', 'Rottweiler', 'Shiba Inu', 'Shih Tzu', 'Yorkshire Terrier'
]

export default function Home() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [resultKey, setResultKey] = useState(null)
  const [breedInfo, setBreedInfo] = useState(null)
  const [breedInfoLoading, setBreedInfoLoading] = useState(false)
  const [error, setError] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const formatBreedName = (breedKey) => {
    if (!breedKey) return ''
    return breedKey.replaceAll('_', ' ')
  }

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFile = (selectedFile) => {
    if (!selectedFile.type.startsWith('image/')) {
      setError('Por favor, selecione uma imagem válida.')
      return
    }
    setFile(selectedFile)
    setResult(null)
    setResultKey(null)
    setBreedInfo(null)
    setError(null)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target.result)
    reader.readAsDataURL(selectedFile)
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const classify = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    setResult(null)
    setResultKey(null)
    setBreedInfo(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'X-API-Key': API_KEY },
        body: formData
      })
      const data = await response.json()
      if (response.ok) {
        const breedKey = data.breed
        setResultKey(breedKey)
        setResult(formatBreedName(breedKey))

        setBreedInfoLoading(true)
        try {
          const infoResponse = await fetch(`${API_URL}/breed-info/${breedKey}`, {
            headers: { 'X-API-Key': API_KEY }
          })
          if (infoResponse.ok) {
            const infoData = await infoResponse.json()
            setBreedInfo(infoData)
          }
        } finally {
          setBreedInfoLoading(false)
        }
      } else {
        setError(data.detail || 'Erro ao classificar a imagem')
      }
    } catch (err) {
      setError('Erro de conexão. Verifique se o backend está rodando.')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setFile(null)
    setPreview(null)
    setResult(null)
    setResultKey(null)
    setBreedInfo(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-[#050508] relative overflow-hidden">
      <BackgroundFX />

      {/* Voltar para /projetos */}
      <div className="max-w-5xl mx-auto px-6 pt-28 relative">
        <Link
          to="/projetos"
          className="inline-flex items-center gap-2 text-sm text-[#B3B3C3] hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para projetos
        </Link>
      </div>

      {/* ==================== HERO ==================== */}
      <section className="pt-8 pb-16 px-6 relative">
        <div className="max-w-5xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-12">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-text-glow">
                Classificador de Raças
              </span>
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                de Cães com Deep Learning
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-[#B3B3C3] max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Um modelo de classificação de imagens treinado com Transfer Learning,
              capaz de identificar <span className="text-white font-medium">16 raças de cães</span> com{' '}
              <span className="text-cyan-400 font-bold animate-pulse">95% de precisão</span>.
            </motion.p>
            
            {/* Animated dog */}
            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            >
              <div className="relative">
                {/* Dog body with bounce animation */}
                <motion.div
                  className="text-6xl select-none"
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, -3, 3, 0]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  🐕
                </motion.div>
                
                {/* Tail wag effect - sparkles around */}
                <motion.div
                  className="absolute -right-2 top-0 text-xl"
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                    rotate: [0, 20, 0]
                  }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: Infinity, 
                    repeatDelay: 0.5 
                  }}
                >
                  ✨
                </motion.div>
                
                <motion.div
                  className="absolute -left-2 top-2 text-sm"
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 0.6, 
                    repeat: Infinity, 
                    delay: 0.3,
                    repeatDelay: 0.8 
                  }}
                >
                  💙
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#2a2a45] to-transparent" />
      </div>

      {/* ==================== SUMÁRIO / NAVEGAÇÃO ==================== */}
      <section className="py-12 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-cyan-400 mb-2">Explore o Projeto</h2>
            <p className="text-[#6b6b80] text-sm">Clique em qualquer seção para navegar diretamente</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {[
              { id: 'sobre', icon: '📖', label: 'Sobre', desc: 'O projeto' },
              { id: 'dataset', icon: '📊', label: 'Dataset', desc: '5.035 imagens' },
              { id: 'pipeline', icon: '⚙️', label: 'Pipeline', desc: 'Treinamento' },
              { id: 'modelos', icon: '🧠', label: 'Modelos', desc: 'Comparação' },
              { id: 'testes', icon: '🎯', label: 'Testes', desc: 'Mundo real' },
              { id: 'testar', icon: '🐕', label: 'Testar', desc: 'Experimente!' },
            ].map((item, index) => (
              <motion.div
                key={item.id}
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative p-4 bg-gradient-to-br from-[#0a0a15] to-[#0c0c1a] border border-[#1e1e35] hover:border-blue-500/40 rounded-2xl text-center transition-all hover:shadow-lg hover:shadow-blue-500/5 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="text-3xl block mb-2"
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon}
                </motion.span>
                <p className="text-white font-semibold text-sm">{item.label}</p>
                <p className="text-[#6b6b80] text-xs mt-0.5">{item.desc}</p>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>

          {/* Quick stats */}
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {[
              { value: '95%', label: 'Precisão', icon: '🎯' },
              { value: '16', label: 'Raças', icon: '🐕' },
              { value: '5K+', label: 'Imagens', icon: '📸' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 bg-[#0a0a15]/50 rounded-full border border-[#1e1e35]">
                <span>{stat.icon}</span>
                <span className="text-cyan-400 font-bold">{stat.value}</span>
                <span className="text-[#6b6b80] text-sm">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#2a2a45] to-transparent" />
      </div>

      {/* ==================== SOBRE O PROJETO ==================== */}
      <section id="sobre" className="py-14 px-6 relative scroll-mt-8">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Introdução
            </p>
            <h2 className="text-3xl font-bold text-white">Sobre o Projeto</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-[#B3B3C3] leading-relaxed">
                Projeto de <span className="text-blue-400">Visão Computacional</span> criado para a finalização
                do Bootcamp de <span className="text-cyan-400">Aprendizado de Máquina</span> do{' '}
                <span className="text-blue-400 font-semibold">LAMIA</span>. O objetivo foi aplicar na prática
                os conceitos aprendidos, construindo uma solução funcional e demonstrável.
              </p>
              <p className="text-[#B3B3C3] leading-relaxed">
                O modelo foi treinado utilizando <span className="text-cyan-400">Transfer Learning</span> com
                a arquitetura <span className="text-blue-400">InceptionV3</span>, alcançando excelentes resultados
                tanto em dados de teste quanto em imagens do cotidiano.
              </p>
            </motion.div>

            <motion.a
              href="https://github.com/VitorEduardoLimaKenor/Dog_Breeds_Classifier"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.5)' }}
              className="group p-6 bg-gradient-to-br from-[#0a0a15] to-[#0f0f1a] border border-[#1e1e35] rounded-xl hover:shadow-lg hover:shadow-blue-500/10 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <Github className="w-8 h-8 text-blue-400" />
                <ExternalLink className="w-5 h-5 text-[#6b6b80] group-hover:text-cyan-400 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Repositório GitHub</h3>
              <p className="text-[#6b6b80] text-sm">
                Acesse os notebooks Colab com todo o código do treinamento
              </p>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#2a2a45] to-transparent" />
      </div>

      {/* ==================== DATASET ==================== */}
      <section id="dataset" className="py-20 px-6 relative scroll-mt-8">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-2">
              Dados
            </p>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Database className="w-8 h-8 text-blue-400" />
              Dataset
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Sources */}
            <motion.div 
              className="p-6 bg-gradient-to-br from-[#0a0a15] to-[#0c0c18] border border-[#1e1e35] rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-white mb-6">Fontes dos Dados</h3>
              <div className="space-y-4">
                {[
                  { icon: FileCode, name: '23 Pet Breeds Image Classification', desc: 'Dataset do Kaggle com 15 raças', color: 'text-blue-400' },
                  { icon: FileCode, name: "Dog's Breed Dataset", desc: 'Dataset adicional do Kaggle', color: 'text-cyan-400' },
                  { icon: FileCode, name: 'Google Images', desc: '+2.386 imagens coletadas', color: 'text-purple-400' },
                ].map((source, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-start gap-3 p-4 bg-[#0f0f1a] rounded-lg hover:bg-[#12121e] transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <source.icon className={`w-5 h-5 ${source.color} mt-0.5`} />
                    <div>
                      <p className="text-white font-medium text-sm">{source.name}</p>
                      <p className="text-[#6b6b80] text-sm">{source.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="p-6 bg-gradient-to-br from-[#0a0a15] to-[#0c0c18] border border-[#1e1e35] rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-white mb-6">Estatísticas</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-[#0f0f1a] rounded-lg text-center group hover:bg-[#12121e] transition-colors">
                  <div className="text-3xl font-bold text-blue-400">16</div>
                  <div className="text-[#6b6b80] text-sm">Raças de Cães</div>
                </div>
                <div className="p-4 bg-[#0f0f1a] rounded-lg text-center group hover:bg-[#12121e] transition-colors">
                  <div className="text-3xl font-bold text-cyan-400">5.035</div>
                  <div className="text-[#6b6b80] text-sm">Total de Imagens</div>
                </div>
              </div>
              <p className="text-[#6b6b80] text-sm p-4 bg-[#0f0f1a] rounded-lg">
                A adição de imagens do Google Images foi crucial para melhorar a generalização,
                elevando a precisão de <span className="text-blue-400">94%</span> para <span className="text-cyan-400 font-semibold">95%</span>.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#2a2a45] to-transparent" />
      </div>

      {/* ==================== PIPELINE ==================== */}
      <section id="pipeline" className="py-20 px-6 relative scroll-mt-8">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-2">
              Processo
            </p>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Layers className="w-8 h-8 text-purple-400" />
              Pipeline de Treinamento
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.5)' }}
                className="p-5 bg-gradient-to-br from-[#0a0a15] to-[#0c0c18] border border-[#1e1e35] rounded-xl hover:shadow-lg hover:shadow-blue-500/5 transition-all cursor-default"
              >
                <span className="text-cyan-400 text-sm font-mono font-bold">{step.num}</span>
                <h3 className="text-white font-semibold mt-2 mb-1">{step.title}</h3>
                <p className="text-[#6b6b80] text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#2a2a45] to-transparent" />
      </div>

      {/* ==================== COMPARAÇÃO DE MODELOS ==================== */}
      <section id="modelos" className="py-20 px-6 relative scroll-mt-8">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-2">
              Resultados
            </p>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-400" />
              Comparação de Modelos
            </h2>
          </motion.div>

          <motion.div 
            className="overflow-x-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e1e35]">
                  <th className="text-left py-4 px-4 text-[#6b6b80] font-medium">Modelo</th>
                  <th className="text-center py-4 px-4 text-[#6b6b80] font-medium">Treino</th>
                  <th className="text-center py-4 px-4 text-[#6b6b80] font-medium">Validação</th>
                  <th className="text-center py-4 px-4 text-[#6b6b80] font-medium">Teste</th>
                  <th className="text-center py-4 px-4 text-[#6b6b80] font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model, i) => (
                  <tr
                    key={i}
                    className={`border-b border-[#1e1e35] ${model.best ? 'bg-blue-500/5' : ''}`}
                  >
                    <td className={`py-4 px-4 font-medium ${model.best ? 'text-cyan-400' : 'text-white'}`}>
                      {model.name}
                    </td>
                    <td className="text-center py-4 px-4 text-[#B3B3C3]">{model.train}</td>
                    <td className="text-center py-4 px-4 text-[#B3B3C3]">{model.val}</td>
                    <td className={`text-center py-4 px-4 font-semibold ${model.best ? 'text-cyan-400' : 'text-[#B3B3C3]'}`}>
                      {model.test}
                    </td>
                    <td className="text-center py-4 px-4">
                      {model.best ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-cyan-400 rounded-full text-sm">
                          <CheckCircle className="w-3 h-3" /> Escolhido
                        </span>
                      ) : (
                        <span className="text-[#6b6b80]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <p className="mt-6 text-[#6b6b80] text-sm">
            O <span className="text-cyan-400">InceptionV3</span> foi escolhido por apresentar o melhor equilíbrio entre precisão e generalização.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#2a2a45] to-transparent" />
      </div>

      {/* ==================== TESTES REAIS ==================== */}
      <section id="testes" className="py-20 px-6 relative scroll-mt-8">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-2">
              Validação
            </p>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Camera className="w-8 h-8 text-blue-400" />
              Testes no Mundo Real
            </h2>
          </motion.div>

          <motion.div 
            className="p-6 bg-gradient-to-br from-[#0a0a15] to-[#0c0c18] border border-[#1e1e35] rounded-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#B3B3C3] mb-6">
              O modelo foi validado com <span className="text-cyan-400 font-medium">38 imagens</span> coletadas
              via celular, demonstrando excelente performance em cenários reais:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { img: '/images/charlote.jpg', name: 'Charlote', breed: 'Shih-tzu', imgs: 28, correct: 26, acc: '92%' },
                { img: '/images/aruska.jpg', name: 'Aruska', breed: 'German Shepherd', imgs: 10, correct: 9, acc: '90%' },
              ].map((dog, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-center gap-4 p-4 bg-[#0f0f1a] rounded-lg hover:bg-[#12121e] transition-colors group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative">
                    <img 
                      src={dog.img} 
                      alt={dog.name}
                      className="w-24 h-24 rounded-full object-cover ring-2 ring-blue-500/30 group-hover:ring-blue-500/60 transition-all"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-500/20 to-transparent" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{dog.name}</p>
                    <p className="text-[#6b6b80] text-sm">{dog.breed}</p>
                    <p className="text-sm text-[#B3B3C3]">
                      {dog.correct} acertos em {dog.imgs} imagens
                    </p>
                    <p className="text-sm">
                      <span className="text-cyan-400 font-medium">{dog.acc} de precisão</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#2a2a45] to-transparent" />
      </div>

      {/* ==================== TESTAR MODELO ==================== */}
      <section id="testar" className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-2">
              Demonstração
            </p>
            <h2 className="text-3xl font-bold text-white">Testar o Modelo</h2>
          </motion.div>

          {/* Info compacta */}
          <motion.div
            className="grid sm:grid-cols-2 gap-4 mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {/* Como funciona */}
            <div className="p-4 bg-[#0a0a15] border border-[#1e1e35] rounded-xl">
              <p className="text-cyan-400 text-xs font-medium mb-2 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                Como funciona
              </p>
              <p className="text-[#8888aa] text-xs leading-relaxed">
                Upload → Pré-processamento → InceptionV3 → Resultado
              </p>
            </div>

            {/* Dicas */}
            <div className="p-4 bg-[#0a0a15] border border-[#1e1e35] rounded-xl">
              <p className="text-cyan-400 text-xs font-medium mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Dicas
              </p>
              <p className="text-[#8888aa] text-xs leading-relaxed">
                Boa iluminação • Cachorro visível • Foto nítida
              </p>
            </div>
          </motion.div>

          {/* Raças suportadas */}
          <motion.div
            className="p-4 bg-[#0a0a15] border border-[#1e1e35] rounded-xl mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <p className="text-cyan-400 text-xs font-medium mb-3 flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5" />
              {breeds.length} Raças suportadas
            </p>
            <div className="flex flex-wrap gap-1.5">
              {breeds.map((breed, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full text-[#a0a0b5] text-xs border border-[#1e1e35] bg-[#0c0c18] hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                >
                  {breed}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-1 gap-8">
            {/* Classifier */}
            <motion.div
              className="p-6 bg-gradient-to-br from-[#0a0a15] to-[#0c0c18] border border-[#1e1e35] rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >

              <AnimatePresence mode="wait">
                {!preview ? (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`
                      relative rounded-2xl p-8 text-center cursor-pointer transition-all overflow-hidden
                      ${dragActive
                        ? 'bg-gradient-to-br from-blue-500/20 via-cyan-500/15 to-purple-500/20 border-2 border-cyan-400 shadow-2xl shadow-cyan-500/20'
                        : 'bg-gradient-to-br from-[#0a0a15] via-[#0c0c18] to-[#0a0a15] border-2 border-dashed border-[#2a2a45] hover:border-cyan-500/50 hover:shadow-lg hover:shadow-blue-500/10'}
                    `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('fileInput').click()}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {/* Background decoration */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <motion.div
                        className="absolute -top-4 -left-4 text-6xl opacity-10"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        🐾
                      </motion.div>
                      <motion.div
                        className="absolute -bottom-4 -right-4 text-6xl opacity-10"
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                      >
                        🐾
                      </motion.div>
                      <motion.div
                        className="absolute top-1/2 -right-6 text-4xl opacity-5"
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        🐕
                      </motion.div>
                    </div>

                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileInput}
                    />

                    <div className="relative z-10 flex flex-col items-center gap-4">
                      <motion.div
                        className="relative"
                        animate={dragActive ? { scale: [1, 1.1, 1], y: [0, -5, 0] } : {}}
                        transition={{ duration: 0.5, repeat: dragActive ? Infinity : 0 }}
                      >
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
                          <motion.span
                            className="text-4xl"
                            animate={{ rotate: dragActive ? [0, -5, 5, 0] : 0 }}
                            transition={{ duration: 0.3, repeat: dragActive ? Infinity : 0 }}
                          >
                            {dragActive ? '🐶' : '📸'}
                          </motion.span>
                        </div>
                        <motion.span
                          className="absolute -top-1 -right-1 text-lg"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          ✨
                        </motion.span>
                      </motion.div>

                      <div>
                        <motion.p
                          className="text-white font-bold text-xl mb-2"
                          animate={dragActive ? { scale: 1.05 } : { scale: 1 }}
                        >
                          {dragActive ? '🎉 Solte a foto aqui!' : 'Envie a foto do seu cachorro'}
                        </motion.p>
                        <p className="text-[#8888aa] text-sm mb-3">
                          Arraste uma imagem ou clique para selecionar
                        </p>
                        <div className="flex items-center justify-center gap-2">
                          {['JPG', 'PNG', 'WEBP'].map((format) => (
                            <span
                              key={format}
                              className="px-3 py-1 bg-[#1a1a2e] border border-[#2a2a45] rounded-full text-xs text-cyan-400 font-medium"
                            >
                              {format}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity:  1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid md:grid-cols-2 gap-6 items-start">
                      <div className="relative">
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-full max-h-64 object-contain rounded-xl ring-1 ring-blue-500/30 bg-[#0f0f1a]"
                        />
                        <button
                          onClick={reset}
                          className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-all hover:scale-110 shadow-lg"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div className="p-3 bg-[#0f0f1a] border border-[#1e1e35] rounded-lg">
                          <p className="text-[#6b6b80] text-xs mb-0.5">Arquivo</p>
                          <p className="text-white text-sm font-medium break-all truncate">{file?.name}</p>
                        </div>

                        {!loading && !result && !error && (
                          <motion.button
                            key="classify"
                            onClick={classify}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg text-white font-semibold transition-all shadow-lg shadow-blue-500/20"
                          >
                            Identificar Raça
                          </motion.button>
                        )}

                        {loading && (
                          <motion.div
                            key="loading"
                            className="p-4 bg-[#0f0f1a] border border-[#1e1e35] rounded-lg text-center"
                          >
                            <motion.div
                              className="text-3xl mb-2"
                              animate={{ rotate: [0, -10, 10, -10, 0], y: [0, -3, 0] }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                            >
                              🐕
                            </motion.div>
                            <p className="text-cyan-400 text-sm font-medium">Analisando...</p>
                          </motion.div>
                        )}

                        {error && (
                          <motion.div
                            key="error"
                            className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                          >
                            <p className="text-white font-medium text-sm">Ops! Algo deu errado</p>
                            <p className="text-[#B3B3C3] text-xs mt-1">{error}</p>
                            <button
                              onClick={reset}
                              className="mt-3 w-full px-3 py-2 text-xs bg-[#0f0f1a] hover:bg-[#12121e] border border-[#1e1e35] hover:border-red-500/50 rounded-lg text-white transition-all font-medium"
                            >
                              Tentar novamente
                            </button>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      {result && (
                        <motion.div
                          key="result"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, type: "spring" }}
                          className="mt-6"
                        >
                          {/* Result Card */}
                          <motion.div
                            className="p-5 bg-gradient-to-br from-blue-500/10 via-cyan-500/8 to-purple-500/10 border border-cyan-500/30 rounded-xl"
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-2xl">
                                🐶
                              </div>
                              <div>
                                <p className="text-[#6b6b80] text-xs uppercase tracking-wider">Resultado</p>
                                <motion.p
                                  className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent capitalize"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.4 }}
                                >
                                  {result}
                                </motion.p>
                              </div>
                            </div>

                            <motion.div
                              className="p-3 bg-[#0a0a12]/50 rounded-lg mb-3"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                            >
                              <p className="text-[#B3B3C3] text-sm leading-relaxed">
                                {breedInfoLoading ? (
                                  <span className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                                    Buscando informações...
                                  </span>
                                ) : (
                                  breedInfo?.descricao || 'Descrição indisponível.'
                                )}
                              </p>
                            </motion.div>

                            {breedInfo?.origem && (
                              <motion.p
                                className="text-sm text-[#6b6b80] mb-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                              >
                                🌍 Origem: <span className="text-cyan-400">{breedInfo.origem}</span>
                              </motion.p>
                            )}

                            <motion.button
                              onClick={reset}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full px-4 py-2.5 bg-[#0f0f1a] hover:bg-[#121220] border border-[#2a2a45] hover:border-cyan-500/40 rounded-lg text-white text-sm font-medium transition-all"
                            >
                              Testar outra imagem
                            </motion.button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
