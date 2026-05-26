import { useState } from 'react'
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
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(5,8,22,0.8)',
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4rem',
        }}>
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <div style={{
              width: '2rem', height: '2rem',
              background: 'var(--gradient-primary)',
              borderRadius: '0.5rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Code2 size={14} color="white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', color: '#f1f5f9' }}>
              {t('navbar.logo')}
            </span>
          </button>

          {/* Desktop nav links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden-mobile">
            {NAV_LINKS.map(({ id, labelKey }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem 0.875rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                  color: activeId === id ? '#a5b4fc' : '#64748b',
                  backgroundColor: activeId === id ? 'rgba(99,102,241,0.12)' : 'transparent',
                }}
                onMouseEnter={e => {
                  if (activeId !== id) e.target.style.color = '#94a3b8'
                }}
                onMouseLeave={e => {
                  if (activeId !== id) e.target.style.color = '#64748b'
                }}
              >
                {t(labelKey)}
              </button>
            ))}
          </nav>

          {/* Right side: lang + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Language toggle */}
            <div style={{
              display: 'flex',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '0.5rem',
              overflow: 'hidden',
            }}>
              {['es', 'en'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLang(lang)}
                  style={{
                    background: currentLang === lang ? 'rgba(99,102,241,0.3)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.375rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: currentLang === lang ? '#a5b4fc' : '#64748b',
                    transition: 'all 0.2s',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMenuOpen(true)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '0.5rem',
                padding: '0.5rem',
                cursor: 'pointer',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
              }}
              className="show-mobile"
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
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(5,8,22,0.8)',
                backdropFilter: 'blur(4px)',
                zIndex: 200,
              }}
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0,
                width: 'min(340px, 85vw)',
                background: '#0d1117',
                borderLeft: '1px solid rgba(99,102,241,0.15)',
                zIndex: 201,
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem',
              }}
            >
              {/* Drawer header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <span style={{ fontWeight: 700, color: '#f1f5f9' }}>{t('navbar.logo')}</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.5rem', padding: '0.5rem', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {NAV_LINKS.map(({ id, labelKey }, idx) => (
                  <motion.button
                    key={id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                    onClick={() => scrollTo(id)}
                    style={{
                      background: activeId === id ? 'rgba(99,102,241,0.12)' : 'transparent',
                      border: 'none',
                      borderRadius: '0.5rem',
                      padding: '0.875rem 1rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: activeId === id ? '#a5b4fc' : '#94a3b8',
                      width: '100%',
                    }}
                  >
                    {t(labelKey)}
                  </motion.button>
                ))}
              </nav>

              {/* Lang toggle in drawer */}
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#475569', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {t('navbar.findWithMe') || 'Language'}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['es', 'en'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => changeLang(lang)}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        background: currentLang === lang ? 'rgba(99,102,241,0.2)' : 'transparent',
                        border: `1px solid ${currentLang === lang ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        color: currentLang === lang ? '#a5b4fc' : '#64748b',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        textTransform: 'uppercase',
                      }}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {SOCIAL.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      width: '2.5rem', height: '2.5rem',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '0.5rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#64748b',
                      transition: 'all 0.2s',
                      textDecoration: 'none',
                    }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}
