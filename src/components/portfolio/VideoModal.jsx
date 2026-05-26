import { useRef } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X, Code2, ExternalLink } from 'lucide-react'

export default function VideoModal({ project, open, onOpenChange }) {
  const videoRef = useRef(null)

  const handleOpenChange = (isOpen) => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    onOpenChange(isOpen)
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content" aria-describedby={`vdesc-${project.id}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
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

          {project.video ? (
            <video
              ref={videoRef}
              controls
              muted
              playsInline
              preload="none"
              poster={project.thumbnail}
              style={{ width: '100%', borderRadius: '0.75rem', marginBottom: '1.5rem', maxHeight: '400px', background: '#000' }}
            >
              <source src={project.video} type="video/mp4" />
            </video>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {project.images?.map((src, i) => (
                <img key={i} src={src} alt={`${project.modalTitle} ${i+1}`} style={{ width: '100%', borderRadius: '0.5rem', objectFit: 'cover' }} loading="lazy" />
              ))}
            </div>
          )}

          <p id={`vdesc-${project.id}`} style={{ color: '#94a3b8', lineHeight: 1.75, marginBottom: '1.25rem', fontSize: '0.925rem' }}>
            {project.description}
          </p>

          {project.tech?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {project.tech.map((t) => <span key={t} className="badge badge-cyan">{t}</span>)}
            </div>
          )}

          {project.noLinkText && (
            <p style={{ color: '#475569', fontSize: '0.8rem', fontStyle: 'italic' }}>⚠ {project.noLinkText}</p>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
