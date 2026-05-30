import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, ExternalLink, Code2, Play } from 'lucide-react'
import ProjectModal from '../portfolio/ProjectModal'
import VideoModal from '../portfolio/VideoModal'
import { webProjects, gameProjects, cloudProjects, aiProjects } from '../../data/portfolio-data'

const FILTER_IDS = ['all', 'web', 'games']

const allProjects = [
  ...webProjects.map(p => ({ ...p, category: 'web' })),
  ...gameProjects.map(p => ({ ...p, category: 'games' })),
  ...cloudProjects.map(p => ({ ...p, category: 'cloud' })),
  ...aiProjects.map(p => ({ ...p, category: 'ai' })),
]

function ProjectCard({ project, onClick }) {
  const { t } = useTranslation()
  const isGame = project.category === 'games'
  const cardTitle = t(project.titleKey)
  const modalType = t(project.modalTypeKey)
  const description = t(project.modalDescKey)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="glass-card"
      onClick={onClick}
      style={{ cursor: 'pointer', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/10' }}>
        <img
          src={project.thumbnail}
          alt={cardTitle}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        />
        {/* Category badge */}
        <span style={{
          position: 'absolute', top: '0.75rem', left: '0.75rem',
          padding: '0.25rem 0.625rem',
          background: isGame ? 'rgba(6,182,212,0.85)' : 'rgba(99,102,241,0.85)',
          backdropFilter: 'blur(4px)',
          borderRadius: '2rem', fontSize: '0.7rem', fontWeight: 600, color: 'white',
        }}>
          {modalType}
        </span>
        {/* Play overlay for video */}
        {project.video && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(5,8,22,0.4)', opacity: 0, transition: 'opacity 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = 1}
            onMouseLeave={e => e.currentTarget.style.opacity = 0}
          >
            <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(99,102,241,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Play size={20} color="white" />
            </div>
          </div>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f1f5f9' }}>{cardTitle}</h3>
        <p style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.5, flex: 1 }}>
          {description?.slice(0, 110)}...
        </p>
        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '0.25rem' }}>
          {project.tech?.slice(0, 3).map(tech => (
            <span key={tech} style={{ padding: '0.2rem 0.5rem', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '0.25rem', fontSize: '0.7rem', color: '#7c85f5' }}>{tech}</span>
          ))}
        </div>
        {/* Links row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{ fontSize: '0.8rem', color: '#a5b4fc', fontWeight: 500 }}>View details →</span>
          {project.github && <a href={project.github} onClick={e => e.stopPropagation()} target="_blank" rel="noopener noreferrer" style={{ color: '#475569', marginLeft: 'auto' }}><Code2 size={15} /></a>}
          {project.demo && <a href={project.demo} onClick={e => e.stopPropagation()} target="_blank" rel="noopener noreferrer" style={{ color: '#475569' }}><ExternalLink size={15} /></a>}
        </div>
      </div>
    </motion.div>
  )
}

export default function Portfolio() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('web')
  const [openProject, setOpenProject] = useState(null)

  const filtered = useMemo(() =>
    activeFilter === 'all' ? allProjects : allProjects.filter(p => p.category === activeFilter),
    [activeFilter]
  )

  const activeFilters = FILTER_IDS.filter(id => id === 'all' || allProjects.some(p => p.category === id))

  return (
    <section id="portfolio" className="section-wrapper">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '3rem' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 600, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
          <Layers size={14} /> {t('portfolio.subtitle')}
        </span>
        <h2 className="section-title">{t('portfolio.title')}</h2>
        <div className="section-divider" />
      </motion.div>

      {/* Filter buttons */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {activeFilters.map((id) => (
          <button
            key={id}
            onClick={() => setActiveFilter(id)}
            className={`filter-btn${activeFilter === id ? ' active' : ''}`}
          >
            {t(`portfolio.filters.${id}`)}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={() => setOpenProject(project)} />
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: '#475569' }}>
            <p style={{ fontSize: '1rem' }}>No projects in this category yet — coming soon! 🚀</p>
          </motion.div>
        )}
      </motion.div>

      {/* Modals */}
      {allProjects.map(project =>
        project.video ? (
          <VideoModal
            key={project.id}
            project={project}
            open={openProject?.id === project.id}
            onOpenChange={(o) => !o && setOpenProject(null)}
          />
        ) : (
          <ProjectModal
            key={project.id}
            project={project}
            open={openProject?.id === project.id}
            onOpenChange={(o) => !o && setOpenProject(null)}
          />
        )
      )}
    </section>
  )
}
