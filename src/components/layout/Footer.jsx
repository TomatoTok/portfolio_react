import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Share2, AtSign, MessageSquare, Code2, Heart } from 'lucide-react'
import TagCloud from '../shared/TagCloud'

const SOCIAL = [
  { icon: Share2, href: 'https://www.linkedin.com/in/tomas-bascal/', label: 'LinkedIn' },
  { icon: AtSign, href: 'https://www.instagram.com/tomee_bascal/', label: 'Instagram' },
  { icon: MessageSquare, href: 'https://twitter.com/Tomato_tok', label: 'Twitter / X' },
]

const RESOURCES = [
  { label: 'React Docs', href: 'https://react.dev/' },
  { label: 'Bootstrap 5', href: 'https://getbootstrap.com/' },
  { label: 'Framer Motion', href: 'https://www.framer.com/motion/' },
  { label: 'Tailwind CSS', href: 'https://tailwindcss.com/' },
]

const DEV_LINKS = [
  { label: 'Hostinger', href: 'https://www.hostinger.com/' },
  { label: 'Node.js', href: 'https://nodejs.org/' },
  { label: 'GitHub', href: 'https://github.com/TomatoTok' },
  { label: 'Vite', href: 'https://vite.dev/' },
]

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'resume', label: 'Resume' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'experiences', label: 'Experience' },
  { id: 'blog', label: 'Blog' },
]

export default function Footer() {
  const { t } = useTranslation()

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer id="footer" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', backgroundColor: '#0d1117', marginTop: '4rem' }}>
      {/* Tag cloud strip */}
      <div style={{ padding: '2rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <TagCloud />
      </div>

      {/* Main footer content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem', display: 'grid', gap: '2rem' }} className="footer-grid">
        {/* Brand column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
            <div style={{ width: '2rem', height: '2rem', background: 'var(--gradient-primary)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Code2 size={14} color="white" />
            </div>
            <span style={{ fontWeight: 700, color: '#f1f5f9' }}>{t('navbar.logo')}</span>
          </div>
          <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '26ch', marginBottom: '1.25rem' }}>
            Fullstack Developer & builder. Based in Neuquén, Argentina.
          </p>
          {/* Social icons */}
          <div style={{ display: 'flex', gap: '0.625rem' }}>
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -2, scale: 1.05 }}
                style={{ width: '2.25rem', height: '2.25rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#a5b4fc'}
                onMouseLeave={e => e.currentTarget.style.color = '#475569'}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 style={{ fontWeight: 700, fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Navigation</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {NAV_LINKS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', color: '#475569', fontSize: '0.875rem', padding: 0, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#a5b4fc'}
                onMouseLeave={e => e.target.style.color = '#475569'}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h4 style={{ fontWeight: 700, fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>{t('footer.resources')}</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {RESOURCES.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#475569', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#a5b4fc'}
                onMouseLeave={e => e.target.style.color = '#475569'}
              >{label}</a>
            ))}
          </div>
        </div>

        {/* Developer stack */}
        <div>
          <h4 style={{ fontWeight: 700, fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>{t('footer.developer')}</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {DEV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#475569', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#a5b4fc'}
                onMouseLeave={e => e.target.style.color = '#475569'}
              >{label}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', flexWrap: 'wrap' }}>
        <p style={{ color: '#334155', fontSize: '0.8rem', textAlign: 'center' }}>
          © {new Date().getFullYear()}. All rights reserved by{' '}
          <span style={{ color: '#475569', fontWeight: 600 }}>Tomas Bascal.</span>
          {' '}Built with{' '}
          <Heart size={11} style={{ display: 'inline', color: '#6366f1', verticalAlign: 'middle' }} />
          {' '}using React + Vite.
        </p>
      </div>

      <style>{`
        @media (min-width: 640px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (min-width: 1024px) { .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr !important; } }
      `}</style>
    </footer>
  )
}
