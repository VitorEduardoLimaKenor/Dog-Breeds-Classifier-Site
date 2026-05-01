import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/layout/ScrollToTop'
import SideDock from './components/layout/SideDock'

import Home from './pages/Home'
import Projects from './pages/Projects'
import NotFound from './pages/NotFound'

export function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-page flex flex-col">
        <Header />
        <SideDock />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<Projects />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
