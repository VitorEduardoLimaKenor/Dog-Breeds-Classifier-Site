import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Image, Loader2, CheckCircle, XCircle, X, Sparkles } from 'lucide-react'

const API_URL = '/api'
const API_KEY = import.meta.env.VITE_API_KEY

export default function Classifier() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [breedInfo, setBreedInfo] = useState(null)
  const [error, setError] = useState(null)
  const [dragActive, setDragActive] = useState(false)

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
        const breedName = data.breed;
        setResult(breedName.replace('_', ' '))
        // Buscar informações da raça
        try {
          const infoRes = await fetch(`${API_URL}/breed-info/${breedName}`, {
            headers: { 'X-API-Key': API_KEY }
          })
          if (infoRes.ok) {
            const info = await infoRes.json()
            setBreedInfo(info)
          } else {
            setBreedInfo(null)
          }
        } catch {
          setBreedInfo(null)
        }
      } else {
        setError(data.detail || 'Erro ao classificar a imagem')
      }
    } catch (err) {
      setError('Erro de conexão com a API. Verifique se o backend está rodando.')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setFile(null)
    setPreview(null)
    setResult(null)
    setBreedInfo(null)
    setError(null)
  }

  return (
    <section id="classifier" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Teste o Classificador de Raças
          </h2>
          <p className="text-gray-400 text-lg mb-4">
            Envie uma foto do seu cachorro e descubra a raça em segundos.<br/>
            <span className="text-indigo-300 font-semibold">O modelo pode cometer erros! Use como sugestão, não diagnóstico.</span>
          </p>
          <div className="mt-8 bg-white/10 border border-white/20 rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-2">Raças que o modelo consegue classificar:</h3>
            <ul className="flex flex-wrap justify-center gap-3 text-lg">
              <li className="bg-indigo-500/20 px-4 py-2 rounded-xl text-white">Beagle</li>
              <li className="bg-indigo-500/20 px-4 py-2 rounded-xl text-white">Boxer</li>
              <li className="bg-indigo-500/20 px-4 py-2 rounded-xl text-white">Chihuahua</li>
              <li className="bg-indigo-500/20 px-4 py-2 rounded-xl text-white">Corgi</li>
              <li className="bg-indigo-500/20 px-4 py-2 rounded-xl text-white">Dachshund</li>
              <li className="bg-indigo-500/20 px-4 py-2 rounded-xl text-white">French Bulldog</li>
              <li className="bg-indigo-500/20 px-4 py-2 rounded-xl text-white">German Shepherd</li>
              <li className="bg-indigo-500/20 px-4 py-2 rounded-xl text-white">Golden Retriever</li>
              <li className="bg-indigo-500/20 px-4 py-2 rounded-xl text-white">Husky</li>
              <li className="bg-indigo-500/20 px-4 py-2 rounded-xl text-white">Pomeranian</li>
              <li className="bg-indigo-500/20 px-4 py-2 rounded-xl text-white">Poodle</li>
              <li className="bg-indigo-500/20 px-4 py-2 rounded-xl text-white">Pug</li>
              <li className="bg-indigo-500/20 px-4 py-2 rounded-xl text-white">Rottweiler</li>
              <li className="bg-indigo-500/20 px-4 py-2 rounded-xl text-white">Shiba Inu</li>
              <li className="bg-indigo-500/20 px-4 py-2 rounded-xl text-white">Shih Tzu</li>
              <li className="bg-indigo-500/20 px-4 py-2 rounded-xl text-white">Yorkshire Terrier</li>
            </ul>
            <p className="mt-4 text-gray-300 text-sm">Essas são as raças que o modelo foi treinado para reconhecer. Outras raças podem não ser identificadas corretamente.</p>
          </div>
        </motion.div>

        {/* Classifier Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 glow mt-8"
        >
          <AnimatePresence mode="wait">
            {!preview ? (
              /* Upload Area */
              <motion.div
                key="upload"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`
                  relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
                  transition-all duration-300
                  ${dragActive 
                    ? 'border-indigo-500 bg-indigo-500/10' 
                    : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                  }
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
                <motion.div
                  animate={{ y: dragActive ? -10 : 0 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-white mb-2">
                      {dragActive ? 'Solte a imagem aqui' : 'Arraste uma imagem ou clique para selecionar'}
                    </p>
                    <p className="text-gray-400">
                      Formatos aceitos: JPG, PNG, WEBP
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              /* Preview Area */
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                {/* Image Preview */}
                <div className="relative flex justify-center">
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-80 rounded-2xl shadow-2xl"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={reset}
                      className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <X className="w-4 h-4 text-white" />
                    </motion.button>
                  </div>
                </div>

                {/* Result or Action */}
                <div className="text-center">
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-4 py-8"
                      >
                        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                        <p className="text-gray-400">Analisando imagem...</p>
                      </motion.div>
                    ) : result ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-6"
                      >
                        <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl">
                          <CheckCircle className="w-8 h-8 text-green-400" />
                          <div className="text-left">
                            <p className="text-gray-400 text-sm">Raça identificada:</p>
                            <p className="text-2xl font-bold text-white capitalize">{result}</p>
                          </div>
                        </div>
                        {breedInfo && (
                          <div className="mt-6 p-6 bg-white/5 border border-white/10 rounded-2xl text-left">
                            <h3 className="text-xl font-semibold text-white mb-2">Sobre a raça</h3>
                            <p className="text-gray-300 mb-2"><span className="font-semibold text-white">Origem:</span> {breedInfo.origem}</p>
                            <p className="text-gray-300 whitespace-pre-line">{breedInfo.descricao}</p>
                          </div>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={reset}
                          className="mt-6 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
                        >
                          Testar outra imagem
                        </motion.button>
                      </motion.div>
                    ) : error ? (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-6"
                      >
                        <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl">
                          <XCircle className="w-8 h-8 text-red-400" />
                          <div className="text-left">
                            <p className="text-gray-400 text-sm">Erro:</p>
                            <p className="text-lg text-white">{error}</p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={reset}
                          className="mt-6 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
                        >
                          Tentar novamente
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.button
                        key="classify"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={classify}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white font-semibold text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow"
                      >
                        <Sparkles className="w-5 h-5" />
                        Classificar Raça
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
