import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Tag, ArrowRight } from 'lucide-react'
import BlogModal from '../blog/BlogModal'
import { blogPosts } from '../../data/portfolio-data'

export default function Blog() {
  const { t } = useTranslation()
  const [openPost, setOpenPost] = useState(null)

  return (
    <section id="blog" className="section-wrapper">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '3rem' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 600, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
          <BookOpen size={14} /> {t('blog.subtitle')}
        </span>
        <h2 className="section-title">{t('blog.title')}</h2>
        <div className="section-divider" />
      </motion.div>

      {/* Cards grid */}
      <div style={{ display: 'grid', gap: '1.25rem' }} className="blog-grid">
        {blogPosts.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.45 }}
            className="glass-card"
            onClick={() => setOpenPost(post)}
            style={{ cursor: 'pointer', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
          >
            {/* Cover */}
            <div style={{ overflow: 'hidden', aspectRatio: '16/9' }}>
              <img
                src={post.image}
                alt={t(`blog.posts.${post.contentKey}.title`)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                loading="lazy"
              />
            </div>

            {/* Body */}
            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
                <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                  <Tag size={10} /> {t(`blog.posts.${post.contentKey}.category`)}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#475569', fontSize: '0.75rem' }}>
                  <Clock size={11} /> {t(`blog.posts.${post.contentKey}.readTime`)} {t('blog.readTime')}
                </span>
              </div>

              <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#f1f5f9', lineHeight: 1.4 }}>
                {t(`blog.posts.${post.contentKey}.title`)}
              </h3>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: 'auto' }}>
                {post.tags?.slice(0, 3).map(tag => (
                  <span key={tag} style={{ padding: '0.2rem 0.5rem', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '0.25rem', fontSize: '0.7rem', color: '#7c85f5' }}>{tag}</span>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#6366f1', fontSize: '0.8rem', fontWeight: 600, marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                Read article <ArrowRight size={13} />
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Modals */}
      {blogPosts.map(post => (
        <BlogModal
          key={post.id}
          post={post}
          open={openPost?.id === post.id}
          onOpenChange={(o) => !o && setOpenPost(null)}
        />
      ))}

      <style>{`
        @media (min-width: 640px) { .blog-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (min-width: 1024px) { .blog-grid { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </section>
  )
}
