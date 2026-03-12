import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { 
  Github, ExternalLink, Upload, Loader2, CheckCircle, XCircle, X,
  Database, TrendingUp, Camera, Layers, FlaskConical, FileCode, Cpu, Sparkles, Zap
} from 'lucide-react'

const API_URL = '/api'

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
        body: formData
      })
      const data = await response.json()
      if (response.ok) {
        const breedKey = data.breed
        setResultKey(breedKey)
        setResult(formatBreedName(breedKey))

        setBreedInfoLoading(true)
        try {
          const infoResponse = await fetch(`${API_URL}/breed-info/${breedKey}`)
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
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[120px]"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px]"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px]"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[90px]"
          animate={{
            x: [0, -50, 0],
            y: [0, 70, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* ==================== HERO ==================== */}
      <section className="pt-16 pb-16 px-6 relative">
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

            <motion.a
              href="#testar"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg text-white font-semibold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Testar modelo
              <Zap className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* ==================== SOBRE O PROJETO ==================== */}
      <section className="py-14 px-6 relative">
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

      {/* ==================== DATASET ==================== */}
      <section className="py-20 px-6 relative">
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

      {/* ==================== PIPELINE ==================== */}
      <section className="py-20 px-6 relative">
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

      {/* ==================== COMPARAÇÃO DE MODELOS ==================== */}
      <section className="py-20 px-6 relative">
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
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
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
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-cyan-400 rounded-full text-sm animate-pulse-glow">
                          <CheckCircle className="w-3 h-3" /> Escolhido
                        </span>
                      ) : (
                        <span className="text-[#6b6b80]">—</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <p className="mt-6 text-[#6b6b80] text-sm">
            O <span className="text-cyan-400">InceptionV3</span> foi escolhido por apresentar o melhor equilíbrio entre precisão e generalização.
          </p>
        </div>
      </section>

      {/* ==================== TESTES REAIS ==================== */}
      <section className="py-20 px-6 relative">
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

      {/* ==================== TESTAR MODELO ==================== */}
      <section id="testar" className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-2">
              Demonstração
            </p>
            <h2 className="text-3xl font-bold text-white">Testar o Modelo</h2>
            <p className="text-[#6b6b80] mt-2">
              Envie uma imagem de cachorro e veja o modelo em ação
            </p>
          </motion.div>

          {/* Process Info */}
          <motion.div 
            className="p-6 bg-gradient-to-br from-[#0a0a15] to-[#0c0c18] border border-[#1e1e35] rounded-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-400" />
              Processo
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { n: 1, title: 'Upload', desc: 'Imagem enviada ao servidor' },
                { n: 2, title: 'Pré-processamento', desc: 'Redimensionamento e normalização' },
                { n: 3, title: 'Inferência', desc: 'Análise pelo modelo InceptionV3' },
                { n: 4, title: 'Resultado', desc: 'Raça com maior probabilidade' },
              ].map((step, index) => (
                <motion.div 
                  key={step.n} 
                  className="p-4 bg-[#0f0f1a] rounded-lg border border-[#1e1e35] hover:border-blue-500/40 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm shrink-0">
                      {step.n}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{step.title}</p>
                      <p className="text-[#6b6b80] text-sm">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-[#0f0f1a] border border-[#1e1e35] rounded-lg">
              <p className="text-cyan-400 font-medium text-sm mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Dicas
              </p>
              <ul className="space-y-1 text-[#6b6b80] text-sm">
                <li>• Use imagens com boa iluminação</li>
                <li>• O cachorro deve estar bem visível</li>
                <li>• Evite imagens muito borradas</li>
              </ul>
            </div>

            <div className="mt-6 p-4 bg-[#0f0f1a] border border-[#1e1e35] rounded-lg">
              <div className="flex items-center justify-between gap-4 mb-3">
                <p className="text-white font-semibold text-sm flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-purple-400" />
                  Raças suportadas
                </p>
                <span className="text-[#6b6b80] text-xs">{breeds.length} raças</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {breeds.map((breed, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 rounded-full text-[#B3B3C3] text-sm cursor-default border border-[#1e1e35] bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-purple-500/5 hover:border-blue-500/40 hover:text-cyan-300 transition-colors"
                  >
                    {breed}
                  </motion.span>
                ))}
              </div>
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
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Upload className="w-5 h-5 text-cyan-400" />
                Teste do modelo
              </h3>

              <div className="mb-6 p-4 bg-[#0f0f1a] border border-[#1e1e35] rounded-lg">
                <p className="text-[#6b6b80] text-sm">
                  O modelo pode cometer erros.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {!preview ? (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`
                      relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all
                      ${dragActive ? 'border-blue-500 bg-blue-500/5 shadow-lg shadow-blue-500/10' : 'border-[#1e1e35] hover:border-blue-500/50'}
                    `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('fileInput').click()}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileInput}
                    />
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                        <Upload className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-lg">
                          {dragActive ? 'Solte a imagem aqui' : 'Arraste ou clique'}
                        </p>
                        <p className="text-[#6b6b80] text-sm mt-1">JPG, PNG, WEBP</p>
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
                          className="w-full max-h-72 object-contain rounded-lg ring-2 ring-blue-500/30 bg-[#0f0f1a]"
                        />
                        <button
                          onClick={reset}
                          className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-[#0f0f1a] border border-[#1e1e35] rounded-lg">
                          <p className="text-[#6b6b80] text-xs mb-1">Arquivo selecionado</p>
                          <p className="text-white font-medium break-all">{file?.name}</p>
                        </div>

                        {!loading && !result && !error && (
                          <motion.button
                            key="classify"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={classify}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg text-white font-semibold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                          >
                            Classificar raça
                          </motion.button>
                        )}

                        {loading && (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3 p-4 bg-[#0f0f1a] border border-[#1e1e35] rounded-lg"
                          >
                            <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                            <p className="text-[#6b6b80]">Classificando...</p>
                          </motion.div>
                        )}

                        {error && (
                          <motion.div
                            key="error"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                          >
                            <div className="flex items-start gap-3">
                              <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                              <div>
                                <p className="text-white font-semibold">Não foi possível classificar</p>
                                <p className="text-[#B3B3C3] text-sm mt-1">{error}</p>
                              </div>
                            </div>
                            <button
                              onClick={reset}
                              className="mt-4 w-full px-4 py-2 text-sm bg-[#0f0f1a] hover:bg-[#12121e] border border-[#1e1e35] hover:border-blue-500/50 rounded-lg text-white transition-all"
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
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-6 p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-cyan-500/30 rounded-xl"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
                              <CheckCircle className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[#6b6b80] text-xs">Raça identificada</p>
                              <p className="text-2xl font-bold text-white capitalize mt-1">{result}</p>
                              <p className="text-[#B3B3C3] text-sm mt-3 leading-relaxed">
                                {breedInfoLoading
                                  ? 'Carregando descrição da raça...'
                                  : (breedInfo?.descricao || 'Descrição indisponível no momento.')}
                              </p>
                              {breedInfo?.origem && (
                                <p className="text-[#6b6b80] text-sm mt-3">
                                  <span className="text-cyan-400 font-medium">Origem:</span> {breedInfo.origem}
                                </p>
                              )}
                              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                                <button
                                  onClick={reset}
                                  className="w-full sm:w-auto px-4 py-2 text-sm bg-[#0f0f1a] hover:bg-[#12121e] border border-[#1e1e35] hover:border-blue-500/50 rounded-lg text-white transition-all"
                                >
                                  Testar outra imagem
                                </button>
                              </div>
                            </div>
                          </div>
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
