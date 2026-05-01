import { motion } from 'framer-motion'

export default function BackgroundFX() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(201,168,122,0.18), transparent 60%)' }}
        animate={{ x: [0, 80, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(201,168,122,0.10), transparent 60%)' }}
        animate={{ x: [0, -60, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(rgba(201, 168, 122, 0.5) 1px, transparent 1px)`,
          backgroundSize: '34px 34px',
        }}
      />
    </div>
  )
}
