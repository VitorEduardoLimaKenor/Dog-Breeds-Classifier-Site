import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import BackgroundFX from '../components/layout/BackgroundFX'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050508] relative overflow-hidden flex items-center justify-center px-6">
      <BackgroundFX />
      <div className="relative text-center max-w-md">
        <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-2">404</p>
        <h1 className="text-4xl font-bold text-white mb-3">Página não encontrada</h1>
        <p className="text-[#B3B3C3] mb-8">
          O endereço que você tentou abrir não existe ou foi movido.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl text-white font-semibold transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para a Home
        </Link>
      </div>
    </div>
  )
}
