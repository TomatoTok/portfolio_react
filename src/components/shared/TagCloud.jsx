const tags = [
  '#JavaScript', '#React', '#TypeScript', '#Next.js', '#Node.js',
  '#PHP', '#MySQL', '#Git', '#Bootstrap', '#CSS', '#HTML5',
  '#Angular', '#NestJS', '#Laravel', '#Java', '#MongoDB',
  '#WebDev', '#FrontEnd', '#BackEnd', '#Cloud', '#AI',
  '#Godot', '#Unity', '#GameDev', '#Argentina', '#GitHub',
]

// Duplicate for seamless loop
const half = tags.slice(0, Math.ceil(tags.length / 2))
const allTags = [...tags, ...tags]
const halfTags = [...half, ...half]

export default function TagCloud() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div className="tag-cloud-wrapper">
        <div className="tag-cloud-track">
          {allTags.map((tag, i) => (
            <span key={i} className="tag-cloud-item">{tag}</span>
          ))}
        </div>
      </div>
      <div className="tag-cloud-wrapper">
        <div className="tag-cloud-track reverse">
          {halfTags.map((tag, i) => (
            <span key={i} className="tag-cloud-item">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
