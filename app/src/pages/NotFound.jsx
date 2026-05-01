import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import BackgroundFX from '../components/layout/BackgroundFX'

export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-6">
      <BackgroundFX />
      <div className="relative text-center max-w-md">
        <p className="text-goldL text-sm font-medium tracking-wider uppercase mb-2">404</p>
        <h1 className="font-display text-4xl font-extrabold text-white mb-3">
          Página não encontrada
        </h1>
        <p className="text-ink2 mb-8">
          O endereço que você tentou abrir não existe ou foi movido.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cream text-page font-semibold hover:bg-goldL transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para a Home
        </Link>
      </div>
    </div>
  )
}
