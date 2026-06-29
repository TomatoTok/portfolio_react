import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, ChevronDown, ChevronUp } from 'lucide-react'

const experiences = [
  {
    id: 'tecfieldLead',
    image: '/assets/images/portfolio/experience-04.webp',
    period: '12/2024 — Presente',
    title: 'experience.companies.tecfieldLead.title',
    subtitle: 'experience.companies.tecfieldLead.subtitle',
    description: 'experience.companies.tecfieldLead.description',
    color: 'indigo',
    roles: [
      { key: 'platform',   titleKey: 'experience.companies.tecfieldLead.roles.platform.title',   descKey: 'experience.companies.tecfieldLead.roles.platform.description',   techKey: 'experience.companies.tecfieldLead.roles.platform.technologies' },
      { key: 'aws',        titleKey: 'experience.companies.tecfieldLead.roles.aws.title',        descKey: 'experience.companies.tecfieldLead.roles.aws.description' },
      { key: 'cicd',       titleKey: 'experience.companies.tecfieldLead.roles.cicd.title',       descKey: 'experience.companies.tecfieldLead.roles.cicd.description' },
      { key: 'dashboards', titleKey: 'experience.companies.tecfieldLead.roles.dashboards.title', descKey: 'experience.companies.tecfieldLead.roles.dashboards.description' },
      { key: 'leadership', titleKey: 'experience.companies.tecfieldLead.roles.leadership.title', descKey: 'experience.companies.tecfieldLead.roles.leadership.description' },
    ],
    tags: ['React', 'Node.js', 'AWS', 'PostgreSQL', 'MongoDB', 'Docker', 'CI/CD'],
  },
  {
    id: 'tecfieldFs',
    image: '/assets/images/portfolio/experience-04.webp',
    period: '03/2024 — 12/2024',
    title: 'experience.companies.tecfieldFs.title',
    subtitle: 'experience.companies.tecfieldFs.subtitle',
    description: 'experience.companies.tecfieldFs.description',
    color: 'indigo',
    roles: [
      { key: 'forms',   titleKey: 'experience.companies.tecfieldFs.roles.forms.title',   descKey: 'experience.companies.tecfieldFs.roles.forms.description' },
      { key: 'auth',    titleKey: 'experience.companies.tecfieldFs.roles.auth.title',    descKey: 'experience.companies.tecfieldFs.roles.auth.description' },
      { key: 'etl',     titleKey: 'experience.companies.tecfieldFs.roles.etl.title',     descKey: 'experience.companies.tecfieldFs.roles.etl.description' },
      { key: 'support', titleKey: 'experience.companies.tecfieldFs.roles.support.title', descKey: 'experience.companies.tecfieldFs.roles.support.description' },
    ],
    tags: ['React', 'Node.js', 'JWT', 'AWS IAM', 'ETL'],
  },
  {
    id: 'blister',
    image: '/assets/images/portfolio/experience-01.webp',
    period: '2021 — 2024',
    title: 'experience.companies.blister.title',
    subtitle: 'experience.companies.blister.subtitle',
    description: 'experience.companies.blister.description',
    color: 'purple',
    roles: [
      { key: 'developer',       titleKey: 'experience.companies.blister.roles.developer.title',       descKey: 'experience.companies.blister.roles.developer.description' },
      { key: 'projectLeader',   titleKey: 'experience.companies.blister.roles.projectLeader.title',   descKey: 'experience.companies.blister.roles.projectLeader.description' },
      { key: 'systemMgmt',      titleKey: 'experience.companies.blister.roles.systemManagement.title',descKey: 'experience.companies.blister.roles.systemManagement.description' },
      { key: 'design',          titleKey: 'experience.companies.blister.roles.design.title',          descKey: 'experience.companies.blister.roles.design.description' },
      { key: 'architecture',    titleKey: 'experience.companies.blister.roles.architecture.title',    descKey: 'experience.companies.blister.roles.architecture.description' },
    ],
    tags: ['PHP', 'CodeIgniter', 'MySQL', 'JS', 'Bootstrap'],
  },
  {
    id: 'freelance',
    image: '/assets/images/portfolio/experience-02.png',
    period: '2020 — 2021',
    title: 'experience.companies.freelance.title',
    subtitle: 'experience.companies.freelance.subtitle',
    description: 'experience.companies.freelance.description',
    color: 'cyan',
    roles: [
      { key: 'ownClients',   titleKey: 'experience.companies.freelance.roles.ownClients.title',          descKey: 'experience.companies.freelance.roles.ownClients.description' },
      { key: 'personal',     titleKey: 'experience.companies.freelance.roles.personalDevelopment.title', descKey: 'experience.companies.freelance.roles.personalDevelopment.description' },
      { key: 'sawp',         titleKey: 'experience.companies.freelance.roles.simplePages.title',         descKey: 'experience.companies.freelance.roles.simplePages.description' },
      { key: 'active',       titleKey: 'experience.companies.freelance.roles.activeParticipation.title', descKey: 'experience.companies.freelance.roles.activeParticipation.description' },
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Java'],
  },
  {
    id: 'university',
    image: '/assets/images/portfolio/experience-03.jpg',
    period: '2018 — Present',
    title: 'experience.companies.university.title',
    subtitle: 'experience.companies.university.subtitle',
    description: 'experience.companies.university.description',
    color: 'fuchsia',
    roles: [
      { key: 'db',       titleKey: 'experience.companies.university.roles.databaseDesign.title',         descKey: 'experience.companies.university.roles.databaseDesign.description' },
      { key: 'impl',     titleKey: 'experience.companies.university.roles.structureImplementation.title',descKey: 'experience.companies.university.roles.structureImplementation.description' },
      { key: 'oop',      titleKey: 'experience.companies.university.roles.oop.title',                    descKey: 'experience.companies.university.roles.oop.description' },
      { key: 'courses',  titleKey: 'experience.companies.university.roles.courses.title',                descKey: 'experience.companies.university.roles.courses.description' },
    ],
    tags: ['Java', 'SQL', 'Algorithms', 'OOP', 'Data Structures'],
  },
]

const colorMap = {
  indigo:  { accent: '#6366f1', light: 'rgba(99,102,241,0.15)',  text: '#a5b4fc', border: 'rgba(99,102,241,0.3)' },
  purple:  { accent: '#a855f7', light: 'rgba(168,85,247,0.15)',  text: '#d8b4fe', border: 'rgba(168,85,247,0.3)' },
  cyan:    { accent: '#06b6d4', light: 'rgba(6,182,212,0.15)',   text: '#67e8f9', border: 'rgba(6,182,212,0.3)' },
  fuchsia: { accent: '#d946ef', light: 'rgba(217,70,239,0.15)',  text: '#f0abfc', border: 'rgba(217,70,239,0.3)' },
}

function ExperienceCard({ exp, delay }) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const c = colorMap[exp.color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card"
      style={{ overflow: 'hidden' }}
    >
      {/* Card header */}
      <div style={{ display: 'flex', gap: '1rem', padding: '1.25rem' }}>
        <div style={{ width: '4.5rem', height: '4.5rem', borderRadius: '0.75rem', overflow: 'hidden', flexShrink: 0, border: `1px solid ${c.border}` }}>
          <img src={exp.image} alt={t(exp.title)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span className="mono" style={{ fontSize: '0.75rem', color: c.text, fontWeight: 500 }}>{exp.period}</span>
          <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#f1f5f9', marginTop: '0.125rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {t(exp.title)}
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.125rem' }}>{t(exp.subtitle)}</p>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.375rem', lineHeight: 1.5 }}>{t(exp.description)}</p>
          {/* Tech tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '0.625rem' }}>
            {exp.tags.map(tag => (
              <span key={tag} style={{ padding: '0.2rem 0.5rem', background: c.light, border: `1px solid ${c.border}`, borderRadius: '0.25rem', fontSize: '0.7rem', color: c.text, fontWeight: 500 }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Expand button */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem',
          padding: '0.625rem', background: expanded ? c.light : 'rgba(255,255,255,0.03)',
          border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)',
          cursor: 'pointer', color: expanded ? c.text : '#475569', fontSize: '0.8rem', fontWeight: 600,
          transition: 'all 0.2s',
        }}
      >
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {t('experience.viewMore')}
      </button>

      {/* Roles (expandable) */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem', borderTop: `1px solid ${c.border}`, paddingTop: '1rem' }}>
              <p style={{ fontSize: '0.75rem', color: c.text, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {t('experience.myRole')}
              </p>
              {exp.roles.map((role) => (
                <div key={role.key} style={{ paddingLeft: '0.875rem', borderLeft: `2px solid ${c.border}` }}>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#e2e8f0', marginBottom: '0.25rem' }}>{t(role.titleKey)}</p>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.6 }}>{t(role.descKey)}</p>
                  {role.techKey && <p style={{ fontSize: '0.775rem', color: c.text, marginTop: '0.25rem', fontStyle: 'italic' }}>{t(role.techKey)}</p>}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Experience() {
  const { t } = useTranslation()

  return (
    <section id="experiences" className="section-wrapper">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '3rem' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 600, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
          <Briefcase size={14} /> {t('experience.subtitle')}
        </span>
        <h2 className="section-title">{t('experience.title')}</h2>
        <div className="section-divider" />
      </motion.div>

      <div className="flex flex-col gap-5">
        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.id} exp={exp} delay={i * 0.1} />
        ))}
      </div>
    </section>
  )
}
