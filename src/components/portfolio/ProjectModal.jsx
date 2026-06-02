import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Dialog from '@radix-ui/react-dialog'
import { X, Code2, ExternalLink, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'

export default function ProjectModal({ project, open, onOpenChange }) {
  const { t } = useTranslation()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [lightboxSrc, setLightboxSrc] = useState(null)
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const hasImages = project.images?.length > 0

  const modalType  = t(project.modalTypeKey)
  const modalTitle = t(project.modalTitleKey)
  const description = t(project.modalDescKey)
  const noLinkText = project.noLinkTextKey ? t(project.noLinkTextKey) : null

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content" aria-describedby={`desc-${project.id}`}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {modalType}
              </span>
              <Dialog.Title style={{ fontSize: '1.35rem', fontWeight: 700, color: '#f1f5f9', marginTop: '0.2rem' }}>
                {modalTitle}
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.5rem', padding: '0.5rem', cursor: 'pointer', color: '#94a3b8', display: 'flex', flexShrink: 0 }}>
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          {/* Carousel (thumbnail as fallback) */}
          {hasImages ? (
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                  {[project.thumbnail, ...project.images].filter(Boolean).map((src, i) => (
                    <div className="embla__slide" key={i} style={{ position: 'relative' }}>
                      <div style={{ background: 'rgba(0,0,0,0.35)', borderRadius: '0.75rem', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', maxHeight: '420px' }}>
                        <img
                          src={src}
                          alt={`${modalTitle} ${i}`}
                          style={{ maxWidth: '100%', maxHeight: '420px', objectFit: 'contain', borderRadius: '0.75rem', cursor: 'zoom-in' }}
                          loading="lazy"
                          onClick={() => setLightboxSrc(src)}
                        />
                      </div>
                      <button
                        onClick={() => setLightboxSrc(src)}
                        style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.4rem', padding: '0.3rem 0.5rem', cursor: 'pointer', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', backdropFilter: 'blur(4px)' }}
                      >
                        <Maximize2 size={12} /> Ver completo
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
                {[scrollPrev, scrollNext].map((fn, i) => (
                  <button key={i} onClick={fn} style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '50%', width: '2rem', height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#a5b4fc' }}>
                    {i === 0 ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ background: 'rgba(0,0,0,0.35)', borderRadius: '0.75rem', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', maxHeight: '360px', marginBottom: '1.5rem', cursor: 'zoom-in' }} onClick={() => setLightboxSrc(project.thumbnail)}>
              <img src={project.thumbnail} alt={modalTitle} style={{ maxWidth: '100%', maxHeight: '360px', objectFit: 'contain', borderRadius: '0.75rem' }} loading="lazy" />
            </div>
          )}

          {/* Lightbox */}
          {lightboxSrc && (
            <div
              onClick={() => setLightboxSrc(null)}
              style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', cursor: 'zoom-out' }}
            >
              <button onClick={() => setLightboxSrc(null)} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.5rem', padding: '0.5rem', cursor: 'pointer', color: '#e2e8f0', display: 'flex' }}>
                <X size={20} />
              </button>
              <img src={lightboxSrc} alt="full" style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: '0.5rem' }} onClick={e => e.stopPropagation()} />
            </div>
          )}

          {/* Description */}
          <p id={`desc-${project.id}`} style={{ color: '#94a3b8', lineHeight: 1.75, marginBottom: '1.25rem', fontSize: '0.925rem' }}>
            {description}
          </p>

          {/* Tech tags */}
          {project.tech?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {project.tech.map((tech) => <span key={tech} className="badge">{tech}</span>)}
            </div>
          )}

          {/* No link note */}
          {noLinkText && (
            <p style={{ color: '#475569', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '1rem' }}>⚠ {noLinkText}</p>
          )}

          {/* Action links */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '0.625rem 1.25rem', fontSize: '0.85rem' }}>
                <Code2 size={15} /> GitHub
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.625rem 1.25rem', fontSize: '0.85rem' }}>
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
