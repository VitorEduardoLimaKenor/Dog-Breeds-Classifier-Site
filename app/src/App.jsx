import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/layout/ScrollToTop'

import Home from './pages/Home'
import Projects from './pages/Projects'
import NotFound from './pages/NotFound'
import DogBreedsClassifier from './pages/projects/DogBreedsClassifier'

export function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#050508] flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<Projects />} />
            <Route path="/projetos/dog-breeds-classifier" element={<DogBreedsClassifier />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

