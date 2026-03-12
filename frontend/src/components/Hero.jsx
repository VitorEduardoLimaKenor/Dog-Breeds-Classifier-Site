import { motion } from 'framer-motion'
import { Sparkles, ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full mb-8"
        >
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-indigo-300 text-sm font-medium">Powered by Deep Learning</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Identifique a Raça do{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Seu Cachorro
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Utilizando <span className="text-indigo-400">Transfer Learning</span> com a arquitetura <span className="text-purple-400">InceptionV3</span>, 
          nosso modelo foi treinado com mais de 5.000 imagens alcançando 95% de precisão.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#classifier"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white font-semibold text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow"
          >
            Testar Agora
          </motion.a>
          <motion.a
            href="#features"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold text-lg transition-colors"
          >
            Saiba Mais
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-4 gap-6 mt-20 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white">16</div>
            <div className="text-gray-400 text-sm">Raças</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">5k+</div>
            <div className="text-gray-400 text-sm">Imagens</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">95%</div>
            <div className="text-gray-400 text-sm">Precisão</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">&lt;1s</div>
            <div className="text-gray-400 text-sm">Resposta</div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="w-6 h-6 text-gray-500" />
        </motion.div>
      </div>
    </section>
  )
}
