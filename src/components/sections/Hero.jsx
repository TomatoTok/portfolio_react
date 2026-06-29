import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Mail, MapPin, Briefcase, Download, Send, ExternalLink, X, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'
import * as Dialog from '@radix-ui/react-dialog'
import TagCloud from '../shared/TagCloud'

const ROLES = ['Fullstack Developer', 'Backend Engineer', 'Cloud Integrations', 'AI Builder', 'Web Designer']

function useTypewriterSimple(words, speed = 80, deleteSpeed = 45, pause = 1800) {
  const [text, setText] = useState('')
  const state = useRef({ idx: 0, char: 0, deleting: false })

  useEffect(() => {
    let timer
    const tick = () => {
      const s = state.current
      const word = words[s.idx]
      if (s.deleting) {
        setText(word.slice(0, s.char - 1))
        s.char -= 1
        if (s.char === 0) {
          s.deleting = false
          s.idx = (s.idx + 1) % words.length
          timer = setTimeout(tick, 350)
          return
        }
        timer = setTimeout(tick, deleteSpeed)
      } else {
        setText(word.slice(0, s.char + 1))
        s.char += 1
        if (s.char === word.length) {
          timer = setTimeout(() => { s.deleting = true; tick() }, pause)
          return
        }
        timer = setTimeout(tick, speed)
      }
    }
    timer = setTimeout(tick, 600)
    return () => clearTimeout(timer)
    // El efecto arranca el typewriter una sola vez; los parámetros son estables.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return text
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } }),
}

export default function Hero() {
  const { t, i18n } = useTranslation()
  const typedRole = useTypewriterSimple(ROLES)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()
  const [contactOpen, setContactOpen] = useState(false)

  const isSpanish = i18n.language?.startsWith('es')
  const cvPath = isSpanish
    ? '/assets/downloads/tomas_bascal_cv_spanish.pdf'
    : '/assets/downloads/tomas_bascal_cv_english.pdf'
  const cvLabel = isSpanish ? t('hero.downloadCVSP') : t('hero.downloadCVEN')

  const onSubmit = async (data) => {
    try {
      const res = await fetch('https://www.tomasbascal.com/node/mailer-module', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('fail')
      toast.success(t('contact.toast.success'))
      reset()
      setContactOpen(false)
    } catch {
      toast.error(t('contact.toast.error'))
    }
  }

  return (
    <section id="home" className="hero-bg hero-section">
      <div className="hero-container">
        <div className="hero-grid">

          {/* ── Left ── */}
          <motion.div initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            <motion.div variants={fadeUp} custom={0}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '2rem', fontSize: '0.8rem', fontWeight: 500, color: '#86efac' }}>
                <span className="glow-dot" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.div variants={fadeUp} custom={1}>
              <p style={{ color: '#64748b', fontSize: '1.05rem', marginBottom: '0.25rem' }}>{t('hero.greeting')}</p>
              <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#f1f5f9' }}>
                {t('hero.name')}
              </h1>
            </motion.div>

            <motion.div variants={fadeUp} custom={2}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', height: '2rem' }}>
                <span className="gradient-text" style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                  {typedRole}
                </span>
                <span style={{ width: 2, height: '1.1rem', background: 'var(--gradient-primary)', borderRadius: 1, display: 'inline-block', animation: 'cursor-blink 1s ease-in-out infinite' }} />
              </div>
            </motion.div>

            <motion.p variants={fadeUp} custom={3} style={{ color: '#94a3b8', fontSize: '0.975rem', lineHeight: 1.75, maxWidth: '46ch' }}>
              {t('hero.description')}{' '}
              <a href="https://www.tecfield.com.ar/" target="_blank" rel="noopener noreferrer" style={{ color: '#a5b4fc', textDecoration: 'none', fontWeight: 500 }}>
                {t('hero.company')} <ExternalLink size={11} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </a>
            </motion.p>

            <motion.div variants={fadeUp} custom={4} style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { icon: Briefcase, text: t('hero.roleDescription') },
                { icon: Mail, text: t('hero.email'), href: `mailto:${t('hero.email')}` },
                { icon: MapPin, text: t('hero.location') },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <Icon size={14} color="#6366f1" strokeWidth={2} />
                  {href
                    ? <a href={href} style={{ color: '#94a3b8', fontSize: '0.875rem', textDecoration: 'none' }}>{text}</a>
                    : <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{text}</span>
                  }
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} custom={5} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <a href={cvPath} download className="btn-primary">
                <Download size={15} />
                {cvLabel}
              </a>
              <Dialog.Root open={contactOpen} onOpenChange={setContactOpen}>
                <Dialog.Trigger asChild>
                  <button className="btn-outline">
                    <Send size={14} />
                    {t('hero.contactMe')}
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="dialog-overlay" />
                  <Dialog.Content className="dialog-content" aria-describedby="contact-desc">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                      <div>
                        <Dialog.Title style={{ fontSize: '1.35rem', fontWeight: 700, color: '#f1f5f9' }}>{t('contact.title')}</Dialog.Title>
                        <p id="contact-desc" style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.25rem' }}>{t('contact.sendEmail')}</p>
                      </div>
                      <Dialog.Close asChild>
                        <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.5rem', padding: '0.5rem', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}><X size={18} /></button>
                      </Dialog.Close>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                      {[
                        { href: 'mailto:tom.bascal@gmail.com', icon: Mail, iconColor: '#a5b4fc', bg: 'rgba(99,102,241,0.1)', label: t('contact.sendEmail'), value: 'tom.bascal@gmail.com' },
                        { href: 'https://linktr.ee/tomasbascal', icon: ExternalLink, iconColor: '#d8b4fe', bg: 'rgba(168,85,247,0.1)', label: t('contact.findMeOnPlatforms'), value: 'linktr.ee/tomasbascal' },
                      ].map(({ href, icon: Icon, iconColor, bg, label, value }) => (
                        <a key={href} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', textDecoration: 'none', color: '#f1f5f9' }}>
                          <div style={{ width: '2.5rem', height: '2.5rem', background: bg, borderRadius: '0.625rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Icon size={17} color={iconColor} />
                          </div>
                          <div>
                            <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.1rem' }}>{label}</p>
                            <p style={{ fontWeight: 600, color: iconColor, fontSize: '0.9rem' }}>{value}</p>
                          </div>
                          <ChevronRight size={15} color="#475569" style={{ marginLeft: 'auto' }} />
                        </a>
                      ))}
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem' }}>
                      <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1rem' }}>{t('contact.sendMessage')}</p>
                      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {[['name', t('contact.form.name'), 'text'], ['email', t('contact.form.email'), 'email']].map(([name, placeholder, type]) => (
                          <div key={name}>
                            <input type={type} placeholder={placeholder}
                              {...register(name, { required: true, ...(name === 'email' && { pattern: /^\S+@\S+\.\S+$/ }) })}
                              style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.04)', border: `1px solid ${errors[name] ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '0.5rem', color: '#f1f5f9', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit' }}
                            />
                            {errors[name] && <p style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                              {name === 'email' ? t('contact.form.emailInvalid') : t('contact.form.required')}
                            </p>}
                          </div>
                        ))}
                        <textarea rows={4} placeholder={t('contact.form.message')}
                          {...register('message', { required: true })}
                          style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.04)', border: `1px solid ${errors.message ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '0.5rem', color: '#f1f5f9', fontSize: '0.9rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                        />
                        <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ alignSelf: 'flex-start' }}>
                          <Send size={14} />
                          {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                        </button>
                      </form>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </motion.div>

          </motion.div>

          {/* ── Right: Photo with ambient effects ── */}
          <div className="hero-photo-col" style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div className="hero-photo-wrap">
              <img
                src="/assets/images/slider/tomas-bascal.jpg"
                alt="Tomas Bascal"
                width="560"
                height="460"
                loading="eager"
                className="hero-photo"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Full-width tag cloud strip ── */}
      <div className="hero-tag-strip">
        <TagCloud />
      </div>

      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fadeInPhoto {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  )
}
