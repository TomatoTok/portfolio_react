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
    <footer id="footer" className="border-t border-white/5 bg-surface mt-16">
      {/* Tag cloud strip */}
      <div className="py-8 border-b border-white/[0.04]">
        <TagCloud />
      </div>

      {/* Main footer content */}
      <div className="max-w-[1200px] mx-auto px-6 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        {/* Brand column */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Code2 size={14} color="white" />
            </div>
            <span className="font-bold text-ink">{t('navbar.logo')}</span>
          </div>
          <p className="text-faint text-sm leading-[1.7] max-w-[26ch] mb-5">
            Fullstack Developer & builder. Based in Neuquén, Argentina.
          </p>
          {/* Social icons */}
          <div className="flex gap-2.5">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -2, scale: 1.05 }}
                className="w-9 h-9 bg-white/[0.04] border border-white/[0.08] rounded-lg flex items-center justify-center text-faint hover:text-iris no-underline transition-colors"
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-bold text-[0.8rem] text-muted uppercase tracking-widest mb-4">Navigation</h4>
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="bg-transparent border-0 p-0 text-left text-faint text-sm hover:text-iris transition-colors cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-bold text-[0.8rem] text-muted uppercase tracking-widest mb-4">{t('footer.resources')}</h4>
          <div className="flex flex-col gap-2">
            {RESOURCES.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-faint text-sm no-underline hover:text-iris transition-colors">{label}</a>
            ))}
          </div>
        </div>

        {/* Developer stack */}
        <div>
          <h4 className="font-bold text-[0.8rem] text-muted uppercase tracking-widest mb-4">{t('footer.developer')}</h4>
          <div className="flex flex-col gap-2">
            {DEV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-faint text-sm no-underline hover:text-iris transition-colors">{label}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/[0.04] px-6 py-5 flex items-center justify-center gap-1.5 flex-wrap">
        <p className="text-dim text-[0.8rem] text-center">
          © {new Date().getFullYear()}. All rights reserved by{' '}
          <span className="text-faint font-semibold">Tomas Bascal.</span>
          {' '}Built with{' '}
          <Heart size={11} className="inline align-middle text-brand" />
          {' '}using React + Vite.
        </p>
      </div>
    </footer>
  )
}
