import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Faz a página rolar para o topo a cada navegação entre rotas.
 * Sem isso, ao trocar de /projetos -> /projetos/dog-breeds-classifier
 * o scroll permanece na posição anterior.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
