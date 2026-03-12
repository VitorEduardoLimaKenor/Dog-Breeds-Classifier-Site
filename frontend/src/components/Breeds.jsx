import { motion } from 'framer-motion'

const breeds = [
  { name: 'Beagle', emoji: '🐕' },
  { name: 'Boxer', emoji: '🐕‍🦺' },
  { name: 'Chihuahua', emoji: '🐶' },
  { name: 'Corgi', emoji: '🦮' },
  { name: 'Dachshund', emoji: '🌭' },
  { name: 'French Bulldog', emoji: '🐕' },
  { name: 'German Shepherd', emoji: '🐕‍🦺' },
  { name: 'Golden Retriever', emoji: '🦮' },
  { name: 'Husky', emoji: '🐺' },
  { name: 'Pomeranian', emoji: '🐕' },
  { name: 'Poodle', emoji: '🐩' },
  { name: 'Pug', emoji: '🐶' },
  { name: 'Rottweiler', emoji: '🐕‍🦺' },
  { name: 'Shiba Inu', emoji: '🐕' },
  { name: 'Shih Tzu', emoji: '🐶' },
  { name: 'Yorkshire Terrier', emoji: '🐕' }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 }
}

export default function Breeds() {
  return (
    <section id="breeds" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Raças Suportadas
          </h2>
          <p className="text-gray-400 text-lg">
            Nosso modelo é capaz de identificar as seguintes 16 raças de cachorros
          </p>
        </motion.div>

        {/* Breeds Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {breeds.map((breed, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative p-4 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl text-center cursor-default overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <span className="text-3xl mb-2 block">{breed.emoji}</span>
                <span className="text-white font-medium">{breed.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 mt-8 text-sm"
        >
          * O modelo pode ter dificuldade com imagens de baixa qualidade ou raças mistas
        </motion.p>
      </div>
    </section>
  )
}
