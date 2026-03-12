import { motion } from 'framer-motion'
import { Database, TrendingUp, Camera, FlaskConical } from 'lucide-react'

const stats = [
  { label: 'Imagens no Dataset', value: '5.035', icon: Database },
  { label: 'Raças de Cães', value: '16', icon: FlaskConical },
  { label: 'Precisão em Teste', value: '95%', icon: TrendingUp },
  { label: 'Precisão Real', value: '90%+', icon: Camera },
]

const models = [
  { name: 'VGG16', train: '92%', val: '77%', test: '74%', best: false },
  { name: 'Xception', train: '93%', val: '95%', test: '93%', best: false },
  { name: 'InceptionV3', train: '92%', val: '96%', test: '95%', best: true },
]

export default function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sobre o Modelo
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Desenvolvido com TensorFlow e Keras, utilizando Transfer Learning com a arquitetura InceptionV3 
            para classificação de imagens de cães.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center"
            >
              <stat.icon className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Dataset Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-white/5 border border-white/10 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Database className="w-6 h-6 text-indigo-400" />
              Dataset
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>
                O dataset foi construído a partir de duas fontes do Kaggle, combinando o 
                <span className="text-indigo-400"> "23 Pet Breeds Image Classification"</span> e o 
                <span className="text-indigo-400"> "Dog's Breed Dataset"</span>.
              </p>
              <p>
                Posteriormente, foram adicionadas mais <span className="text-white font-semibold">2.386 imagens</span> coletadas 
                via Google Images, totalizando <span className="text-white font-semibold">5.035 imagens</span> de 
                <span className="text-white font-semibold"> 16 raças</span> de cães.
              </p>
              <p className="text-sm text-gray-500">
                Técnicas de Data Augmentation foram aplicadas para melhorar a generalização do modelo.
              </p>
            </div>
          </motion.div>

          {/* Model Comparison */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-white/5 border border-white/10 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
              Comparação de Modelos
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-white/10">
                    <th className="text-left py-3">Modelo</th>
                    <th className="text-center py-3">Treino</th>
                    <th className="text-center py-3">Valid.</th>
                    <th className="text-center py-3">Teste</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((model, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-white/5 ${model.best ? 'bg-indigo-500/10' : ''}`}
                    >
                      <td className={`py-3 ${model.best ? 'text-indigo-400 font-semibold' : 'text-white'}`}>
                        {model.name}
                        {model.best && <span className="ml-2 text-xs bg-indigo-500 px-2 py-0.5 rounded-full">Melhor</span>}
                      </td>
                      <td className="text-center text-gray-300">{model.train}</td>
                      <td className="text-center text-gray-300">{model.val}</td>
                      <td className={`text-center ${model.best ? 'text-green-400 font-semibold' : 'text-gray-300'}`}>
                        {model.test}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Real World Test */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 p-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Camera className="w-6 h-6 text-purple-400" />
            Testes no Mundo Real
          </h3>
          <p className="text-gray-300 mb-6">
            O modelo foi testado com 38 imagens coletadas no cotidiano via celular, demonstrando excelente performance em cenários reais:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl flex items-center gap-4">
              <div className="text-4xl">🐕</div>
              <div>
                <div className="text-white font-semibold">Charlote (Shih-tzu)</div>
                <div className="text-gray-400 text-sm">28 imagens • <span className="text-green-400">92% de precisão</span></div>
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl flex items-center gap-4">
              <div className="text-4xl">🐕‍🦺</div>
              <div>
                <div className="text-white font-semibold">Aruska (German Shepherd)</div>
                <div className="text-gray-400 text-sm">10 imagens • <span className="text-green-400">90% de precisão</span></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
