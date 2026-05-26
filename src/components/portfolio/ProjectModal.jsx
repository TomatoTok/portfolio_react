import { useRef, useCallback, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X, Code2, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'

export default function ProjectModal({ project, open, onOpenChange }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const hasImages = project.images?.length > 0

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content" aria-describedby={`desc-${project.id}`}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {project.modalType}
              </span>
              <Dialog.Title style={{ fontSize: '1.35rem', fontWeight: 700, color: '#f1f5f9', marginTop: '0.2rem' }}>
                {project.modalTitle}
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
                    <div className="embla__slide" key={i}>
                      <img src={src} alt={`${project.modalTitle} ${i}`} style={{ width: '100%', borderRadius: '0.75rem', maxHeight: '380px', objectFit: 'cover' }} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
              {hasImages && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
                  {[scrollPrev, scrollNext].map((fn, i) => (
                    <button key={i} onClick={fn} style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '50%', width: '2rem', height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#a5b4fc' }}>
                      {i === 0 ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <img src={project.thumbnail} alt={project.modalTitle} style={{ width: '100%', borderRadius: '0.75rem', marginBottom: '1.5rem', maxHeight: '320px', objectFit: 'cover' }} loading="lazy" />
          )}

          {/* Description */}
          <p id={`desc-${project.id}`} style={{ color: '#94a3b8', lineHeight: 1.75, marginBottom: '1.25rem', fontSize: '0.925rem' }}>
            {project.description}
          </p>

          {/* Tech tags */}
          {project.tech?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {project.tech.map((t) => <span key={t} className="badge">{t}</span>)}
            </div>
          )}

          {/* No link note */}
          {project.noLinkText && (
            <p style={{ color: '#475569', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '1rem' }}>⚠ {project.noLinkText}</p>
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
