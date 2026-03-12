import { motion } from 'framer-motion'
import { Brain, Zap, Container, Upload, Cpu, Shield } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'InceptionV3',
    description: 'Transfer Learning com arquitetura InceptionV3, treinado com 5.035 imagens e 95% de precisão.',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    icon: Zap,
    title: 'Backend FastAPI',
    description: 'Backend ultrarrápido e moderno em Python para servir o modelo de classificação.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Container,
    title: 'Docker Ready',
    description: 'Aplicação totalmente containerizada para deploy simples em qualquer ambiente.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Upload,
    title: 'Data Augmentation',
    description: 'Técnicas de aumento de dados para melhor generalização em imagens do cotidiano.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Cpu,
    title: 'TensorFlow + Keras',
    description: 'Powered by TensorFlow e Keras, bibliotecas de ML robustas e bem documentadas.',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Shield,
    title: 'Testado na Prática',
    description: 'Validado com fotos reais de celular, alcançando 90-92% de acerto no dia a dia.',
    color: 'from-pink-500 to-rose-500'
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Features() {
  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Como Funciona
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tecnologias de ponta combinadas para oferecer a melhor experiência de classificação de raças caninas.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Processo Simples em 3 Passos
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {[
              { step: '01', title: 'Upload', desc: 'Envie uma foto do cachorro' },
              { step: '02', title: 'Análise', desc: 'IA processa a imagem' },
              { step: '03', title: 'Resultado', desc: 'Receba a raça identificada' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block w-16 h-0.5 bg-gradient-to-r from-indigo-500 to-transparent ml-4" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
