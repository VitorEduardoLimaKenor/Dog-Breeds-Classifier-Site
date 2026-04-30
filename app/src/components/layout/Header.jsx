import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Dog, Github } from 'lucide-react'

export default function Header() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                <Dog className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Dog<span className="text-indigo-400">Classifier</span>
              </span>
            </motion.div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/modelo" 
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/modelo') 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Sobre o Modelo
            </Link>
            <Link 
              to="/testar" 
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/testar') 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Testar Modelo
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.a
              href="https://github.com/VitorEduardoLimaKenor/Dog_Breeds_Classifier"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
