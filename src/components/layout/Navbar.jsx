import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X, Code2, Share2, AtSign, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollSpy } from '../../hooks/useScrollSpy'

const NAV_IDS = ['home', 'resume', 'portfolio', 'experiences', 'blog', 'footer']

const NAV_LINKS = [
  { id: 'home',        labelKey: 'navbar.home' },
  { id: 'resume',      labelKey: 'navbar.resume' },
  { id: 'portfolio',   labelKey: 'navbar.portfolio' },
  { id: 'experiences', labelKey: 'navbar.experience' },
  { id: 'blog',        labelKey: 'navbar.blog' },
]

const SOCIAL = [
  { icon: Share2, href: "https://www.linkedin.com/in/tomas-bascal/", label: "LinkedIn" },
  { icon: AtSign, href: "https://www.instagram.com/tomee_bascal/", label: "Instagram" },
  { icon: MessageSquare, href: "https://twitter.com/Tomato_tok", label: "Twitter" },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useScrollSpy(NAV_IDS)

  // Drawer mobile: cerrar con Esc y bloquear el scroll de fondo mientras está abierto
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  const changeLang = (lang) => i18n.changeLanguage(lang)
  const currentLang = i18n.language?.split('-')[0] || 'es'

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <header className="fixed top-0 inset-x-0 z-[100] border-b border-white/5 backdrop-blur-lg bg-[rgba(5,8,22,0.8)]">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="bg-transparent border-0 cursor-pointer flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Code2 size={14} color="white" />
            </div>
            <span className="font-bold text-[1.1rem] tracking-[-0.02em] text-ink">
              {t('navbar.logo')}
            </span>
          </button>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map(({ id, labelKey }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-transparent border-0 ${
                  activeId === id
                    ? 'text-iris bg-brand/[0.12]'
                    : 'text-muted hover:text-slate-400'
                }`}
              >
                {t(labelKey)}
              </button>
            ))}
          </nav>

          {/* Right side: lang + hamburger */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <div className="flex bg-white/[0.04] border border-white/[0.08] rounded-lg overflow-hidden">
              {['es', 'en'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLang(lang)}
                  className={`px-5 py-2.5 text-base font-bold uppercase tracking-wider transition-colors cursor-pointer border-0 ${
                    currentLang === lang ? 'bg-brand/30 text-iris' : 'bg-transparent text-muted'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden bg-white/5 border border-white/[0.08] rounded-lg p-2 cursor-pointer text-slate-400 flex items-center"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[200] backdrop-blur-sm bg-[rgba(5,8,22,0.8)]"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-[201] w-[min(340px,85vw)] bg-surface border-l border-brand/15 flex flex-col p-6"
            >
              {/* Drawer header */}
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-ink">{t('navbar.logo')}</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="bg-white/5 border border-white/[0.08] rounded-lg p-2 cursor-pointer text-slate-400 flex"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 flex flex-col gap-1">
                {NAV_LINKS.map(({ id, labelKey }, idx) => (
                  <motion.button
                    key={id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                    onClick={() => scrollTo(id)}
                    className={`border-0 rounded-lg px-4 py-3.5 text-left cursor-pointer text-base font-medium w-full ${
                      activeId === id ? 'bg-brand/[0.12] text-iris' : 'bg-transparent text-slate-400'
                    }`}
                  >
                    {t(labelKey)}
                  </motion.button>
                ))}
              </nav>

              {/* Lang toggle in drawer */}
              <div className="mb-6">
                <p className="text-xs text-faint mb-3 uppercase tracking-[0.08em]">
                  {t('navbar.findWithMe') || 'Language'}
                </p>
                <div className="flex gap-2">
                  {['es', 'en'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => changeLang(lang)}
                      className={`flex-1 p-2 rounded-lg cursor-pointer font-semibold text-[0.85rem] uppercase border ${
                        currentLang === lang
                          ? 'bg-brand/20 border-brand/40 text-iris'
                          : 'bg-transparent border-white/[0.08] text-muted'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-3">
                {SOCIAL.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 bg-white/[0.04] border border-white/[0.08] rounded-lg flex items-center justify-center text-muted hover:text-iris transition-colors no-underline"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
