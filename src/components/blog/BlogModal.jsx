import * as Dialog from '@radix-ui/react-dialog'
import { X, Clock, Tag } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function VideojuegosContent() {
  const { t } = useTranslation()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: '#94a3b8', fontSize: '0.925rem', lineHeight: 1.8 }}>
      <p>{t('blog.modals.videojuegos.intro')}</p>
      <p style={{ fontStyle: 'italic', color: '#a5b4fc', fontWeight: 500 }}>{t('blog.modals.videojuegos.anotherWay')}</p>
      <div>
        <h4 style={{ color: '#f1f5f9', fontWeight: 700, marginBottom: '0.5rem' }}>{t('blog.modals.videojuegos.controlTitle')}</h4>
        <p>{t('blog.modals.videojuegos.controlDescription')}</p>
      </div>
      <div>
        <h4 style={{ color: '#f1f5f9', fontWeight: 700, marginBottom: '0.5rem' }}>{t('blog.modals.videojuegos.detailTitle')}</h4>
        <p>{t('blog.modals.videojuegos.detailDescription')}</p>
      </div>
      <div>
        <h4 style={{ color: '#f1f5f9', fontWeight: 700, marginBottom: '0.5rem' }}>{t('blog.modals.videojuegos.transmitTitle')}</h4>
        <p>{t('blog.modals.videojuegos.transmitDescription')}</p>
      </div>
    </div>
  )
}

function Impresion3dContent() {
  const { t } = useTranslation()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: '#94a3b8', fontSize: '0.925rem', lineHeight: 1.8 }}>
      <p>{t('blog.modals.impresion3d.intro')}</p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {[
          { href: 'https://www.instagram.com/varicreaciones3d/', label: t('blog.modals.impresion3d.socialLinks.instagram'), sub: t('blog.modals.impresion3d.socialLinks.instagramSubtitle') },
        ].map(({ href, label, sub }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', padding: '0.875rem 1.25rem', textDecoration: 'none', flex: '1 1 180px' }}>
            <span style={{ fontWeight: 600, color: '#a5b4fc', fontSize: '0.875rem' }}>{label}</span>
            <span style={{ color: '#475569', fontSize: '0.775rem' }}>{sub}</span>
          </a>
        ))}
      </div>
      <div>
        <h4 style={{ color: '#f1f5f9', fontWeight: 700, marginBottom: '0.5rem' }}>{t('blog.modals.impresion3d.startTitle')}</h4>
        <p>{t('blog.modals.impresion3d.startDescription')}</p>
      </div>
      <div>
        <h4 style={{ color: '#f1f5f9', fontWeight: 700, marginBottom: '0.5rem' }}>{t('blog.modals.impresion3d.websiteTitle')}</h4>
        <p>{t('blog.modals.impresion3d.websiteDescription')}</p>
      </div>
      <div>
        <h4 style={{ color: '#f1f5f9', fontWeight: 700, marginBottom: '0.5rem' }}>{t('blog.modals.impresion3d.experiencesTitle')}</h4>
        <p>{t('blog.modals.impresion3d.experiencesDescription')}</p>
      </div>
    </div>
  )
}

function VidaSocialContent() {
  const { t } = useTranslation()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: '#94a3b8', fontSize: '0.925rem', lineHeight: 1.8 }}>
      <p>{t('blog.modals.vidaSocial.intro')}</p>
      <div>
        <h4 style={{ color: '#f1f5f9', fontWeight: 700, marginBottom: '0.5rem' }}>{t('blog.modals.vidaSocial.likeTitle')}</h4>
        <p>{t('blog.modals.vidaSocial.likeDescription')}</p>
      </div>
      <div>
        <h4 style={{ color: '#f1f5f9', fontWeight: 700, marginBottom: '0.5rem' }}>{t('blog.modals.vidaSocial.personalityTitle')}</h4>
        <p>{t('blog.modals.vidaSocial.personalityDescription')}</p>
      </div>
    </div>
  )
}

const CONTENT_MAP = {
  videojuegos: VideojuegosContent,
  impresion3d: Impresion3dContent,
  vidaSocial: VidaSocialContent,
}

export default function BlogModal({ post, open, onOpenChange }) {
  const { t } = useTranslation()
  const Content = CONTENT_MAP[post.contentKey]

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content" aria-describedby={`blog-desc-${post.id}`}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
                <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                  <Tag size={10} /> {t(`blog.posts.${post.contentKey}.category`)}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#475569', fontSize: '0.75rem' }}>
                  <Clock size={11} /> {t(`blog.posts.${post.contentKey}.readTime`)} {t('blog.readTime')}
                </span>
              </div>
              <Dialog.Title style={{ fontSize: '1.35rem', fontWeight: 700, color: '#f1f5f9' }}>
                {t(`blog.posts.${post.contentKey}.title`)}
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.5rem', padding: '0.5rem', cursor: 'pointer', color: '#94a3b8', display: 'flex', flexShrink: 0 }}>
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          {/* Cover image */}
          <img
            src={post.image}
            alt={t(`blog.posts.${post.contentKey}.title`)}
            id={`blog-desc-${post.id}`}
            style={{ width: '100%', borderRadius: '0.75rem', marginBottom: '1.5rem', maxHeight: '280px', objectFit: 'cover' }}
            loading="lazy"
          />

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1.5rem' }}>
            {post.tags?.map(tag => <span key={tag} className="badge">{tag}</span>)}
          </div>

          {/* Content */}
          {Content && <Content />}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
