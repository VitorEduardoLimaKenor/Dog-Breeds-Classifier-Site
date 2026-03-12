import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0D0D0D]">
        {/* Content */}
        <div className="relative">
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App
