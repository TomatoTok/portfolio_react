import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Code2, Building2, GraduationCap, Cpu } from 'lucide-react'
import { skillGroups, tecfieldClients, blisterClients } from '../../data/resume-data'

const TABS = [
  { id: 'education', labelKey: 'resume.tabs.education', icon: GraduationCap },
  { id: 'skills',    labelKey: 'resume.tabs.skills',    icon: Code2 },
  { id: 'experience',labelKey: 'resume.tabs.experience',icon: Building2 },
]

const educationItems = [
  { side: 'formal', items: [
    { title: 'Universidad del Comahue Neuquén', subtitle: 'B.S. Computer Science/Systems', period: '2018 — Present', desc: 'Data Structures, OOP, Probability & Statistics, Database Design, Agile...' },
    { title: 'Cambridge English', subtitle: 'Cambridge English Institute Neuquén Capital', period: '2017', desc: 'English as a foreign language' },
    { title: 'Bachelor en Comunicación', subtitle: 'CEM N°35 Cipolletti, Río Negro', period: '2012 — 2017', desc: 'Graduated with a Bachelor\'s degree in Communication and New Media.' },
  ]},
  { side: 'selftaught', items: [
    { title: 'Online Courses', subtitle: 'Udemy · Platzi · FreeCodeCamp', period: '2019 — Present', desc: 'Full Stack JavaScript, Front End Dev, Git, and more.' },
    { title: 'University Courses', subtitle: 'Agile, Algorithm Performance, Relational Models', period: '2019 — Present', desc: 'Promoted by the Computer Science Faculty.' },
    { title: 'YouTube', subtitle: '200+ hours of developer content', period: '2019 — Present', desc: 'My great teacher and tutor in my formation as an enthusiast and developer.' },
  ]},
]

const colorMap = {
  indigo: { bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.25)', text: '#a5b4fc', dot: '#6366f1' },
  purple: { bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.25)', text: '#d8b4fe', dot: '#a855f7' },
  cyan:   { bg: 'rgba(6,182,212,0.1)',  border: 'rgba(6,182,212,0.25)',  text: '#67e8f9', dot: '#06b6d4' },
}

function TimelineItem({ item, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45 }}
      style={{ display: 'flex', gap: '1rem' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '0.25rem' }}>
        <div className="timeline-dot" />
        <div style={{ flex: 1, width: 1, background: 'linear-gradient(to bottom, rgba(99,102,241,0.3), transparent)', marginTop: '0.5rem' }} />
      </div>
      <div className="glass-card" style={{ flex: 1, padding: '1rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.25rem' }}>
          <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f1f5f9' }}>{item.title}</h4>
          <span className="mono" style={{ fontSize: '0.75rem', color: '#475569' }}>{item.period}</span>
        </div>
        <p style={{ color: '#6366f1', fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.4rem' }}>{item.subtitle}</p>
        <p style={{ color: '#64748b', fontSize: '0.825rem', lineHeight: 1.6 }}>{item.desc}</p>
      </div>
    </motion.div>
  )
}

function SkillBadge({ skill }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-card"
      style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.625rem 0.875rem', cursor: 'default' }}
    >
      {skill.icon ? (
        <img src={skill.icon} alt={skill.name} style={{ width: '1.25rem', height: '1.25rem', objectFit: 'contain' }} />
      ) : (
        <Cpu size={16} color="#6366f1" />
      )}
      <span style={{ fontSize: '0.825rem', fontWeight: 500, color: '#cbd5e1' }}>{skill.name}</span>
    </motion.div>
  )
}

function CompanyLogo({ client }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1rem' }}
    >
      <img
        src={client.logo}
        alt={client.name}
        style={{ width: '3.5rem', height: '3.5rem', objectFit: 'contain', filter: 'brightness(0.9)' }}
      />
      <span style={{ fontSize: '0.7rem', color: '#475569', textAlign: 'center', lineHeight: 1.3 }}>{client.name}</span>
    </motion.div>
  )
}

export default function Resume() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('education')

  return (
    <section id="resume" className="section-padding" style={{ maxWidth: '1200px', margin: '0 auto', padding: '7rem 1.5rem' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '3rem' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 600, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
          <BookOpen size={14} /> {t('resume.subtitle')}
        </span>
        <h2 className="section-title">{t('resume.title')}</h2>
        <div className="section-divider" />
      </motion.div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        {TABS.map(({ id, labelKey, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.625rem 1.25rem',
              borderRadius: '0.625rem',
              border: `1px solid ${activeTab === id ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.07)'}`,
              background: activeTab === id ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
              color: activeTab === id ? '#a5b4fc' : '#64748b',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <Icon size={15} />
            {t(labelKey)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === 'education' && (
          <motion.div key="education" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            <div style={{ display: 'grid', gap: '2rem' }} className="edu-grid">
              {educationItems.map(({ side, items }) => (
                <div key={side}>
                  <h3 style={{ fontWeight: 700, color: '#a5b4fc', marginBottom: '1.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {side === 'formal' ? t('resume.education.title') : t('resume.education.autodidacta.title')}
                  </h3>
                  {items.map((item, i) => <TimelineItem key={item.title} item={item} delay={i * 0.08} />)}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'skills' && (
          <motion.div key="skills" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {skillGroups.map((group) => {
                const c = colorMap[group.color] || colorMap.indigo
                return (
                  <div key={group.category}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
                      <span style={{ width: 3, height: '1.25rem', background: c.dot, borderRadius: 2 }} />
                      <h3 style={{ fontWeight: 700, fontSize: '0.875rem', color: c.text, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {group.category}
                      </h3>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
                      {group.skills.map((skill) => <SkillBadge key={skill.name} skill={skill} />)}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {activeTab === 'experience' && (
          <motion.div key="experience" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            {/* Tecfield */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <span className="badge">{t('resume.experienceTab.prestaciones.tecfieldPeriod')}</span>
                <span style={{ fontWeight: 700, color: '#f1f5f9' }}>{t('resume.experienceTab.prestaciones.tecfieldCompany')}</span>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                {t('resume.experienceTab.prestaciones.tecfieldNote')}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.75rem' }}>
                {tecfieldClients.map((c) => <CompanyLogo key={c.name} client={c} />)}
              </div>
            </div>

            {/* Blister */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <span className="badge badge-purple">{t('resume.experienceTab.prestaciones.blisterPeriod')}</span>
                <span style={{ fontWeight: 700, color: '#f1f5f9' }}>{t('resume.experienceTab.prestaciones.blisterTech')}</span>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                {t('resume.experienceTab.prestaciones.blisterNote')}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.75rem' }}>
                {blisterClients.map((c) => <CompanyLogo key={c.name} client={c} />)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .edu-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}
