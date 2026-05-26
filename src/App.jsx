import { Toaster } from 'react-hot-toast'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Resume from './components/sections/Resume'
import Portfolio from './components/sections/Portfolio'
import Experience from './components/sections/Experience'
import Blog from './components/sections/Blog'
import BackToTop from './components/shared/BackToTop'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Resume />
        <Portfolio />
        <Experience />
        <Blog />
      </main>
      <Footer />
      <BackToTop />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#0d1117',
            color: '#f1f5f9',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '0.625rem',
            fontSize: '0.875rem',
          },
          success: { iconTheme: { primary: '#6366f1', secondary: '#f1f5f9' } },
        }}
      />
    </>
  )
}
