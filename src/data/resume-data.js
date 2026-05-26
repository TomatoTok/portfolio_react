// ─────────────────────────────────────────
// SKILLS (grouped by category)
// ─────────────────────────────────────────
export const skillGroups = [
  {
    category: 'Frontend',
    color: 'indigo',
    skills: [
      { name: 'HTML5',      icon: '/assets/images/svg icons/html-1-icon.svg',           type: 'svg' },
      { name: 'CSS3',       icon: '/assets/images/svg icons/css-3-icon.svg',            type: 'svg' },
      { name: 'JavaScript', icon: '/assets/images/svg icons/logo-javascript-icon.svg',  type: 'svg' },
      { name: 'Angular',    icon: '/assets/images/svg icons/angular-icon.svg',          type: 'svg' },
      { name: 'Bootstrap',  icon: '/assets/images/svg icons/bootstrap-5-icon.svg',      type: 'svg' },
      { name: 'jQuery',     icon: '/assets/images/svg icons/jquery-icon.svg',           type: 'svg' },
    ],
  },
  {
    category: 'Backend',
    color: 'purple',
    skills: [
      { name: 'PHP',          icon: '/assets/images/svg icons/php-icon.svg',                  type: 'svg' },
      { name: 'CodeIgniter',  icon: '/assets/images/svg icons/codeigniter-icon.svg',           type: 'svg' },
      { name: 'NestJS',       icon: '/assets/images/svg icons/nestjs-icon.svg',                type: 'svg' },
      { name: 'Laravel',      icon: '/assets/images/svg icons/laravel-wordmark-icon.svg',      type: 'svg' },
      { name: 'NodeJS',       icon: '/assets/images/svg icons/nodejs-icon.svg',                type: 'svg' },
      { name: 'Java',         icon: '/assets/images/svg icons/java-icon.svg',                  type: 'svg' },
    ],
  },
  {
    category: 'Databases & Tools',
    color: 'cyan',
    skills: [
      { name: 'MySQL',       icon: '/assets/images/svg icons/mysql-icon.svg',          type: 'svg' },
      { name: 'MongoDB',     icon: '/assets/images/svg icons/mongo-icon.png',          type: 'png' },
      { name: 'Git',         icon: '/assets/images/svg icons/git-icon.svg',            type: 'svg' },
      { name: 'GitHub',      icon: '/assets/images/svg icons/github-icon-1.svg',       type: 'svg' },
      { name: 'Figma',       icon: '/assets/images/svg icons/figma-5-icon.svg',        type: 'svg' },
      { name: 'cPanel',      icon: '/assets/images/svg icons/cpanel-icon.svg',         type: 'svg' },
    ],
  },
]

// ─────────────────────────────────────────
// EDUCATION (timeline items)
// ─────────────────────────────────────────
export const formalEducation = [
  {
    id: 'comahue',
    titleKey: 'resume.education.formal.comahue.title',
    subtitleKey: 'resume.education.formal.comahue.subtitle',
    periodKey: 'resume.education.formal.comahue.period',
    descriptionKey: 'resume.education.formal.comahue.description',
  },
  {
    id: 'cambridge',
    titleKey: 'resume.education.formal.cambridge.title',
    subtitleKey: 'resume.education.formal.cambridge.subtitle',
    periodKey: 'resume.education.formal.cambridge.period',
    descriptionKey: 'resume.education.formal.cambridge.description',
  },
  {
    id: 'cem35',
    titleKey: 'resume.education.formal.cem35.title',
    subtitleKey: 'resume.education.formal.cem35.subtitle',
    periodKey: 'resume.education.formal.cem35.period',
    descriptionKey: '',
  },
]

export const selfTaughtEducation = [
  {
    id: 'online',
    titleKey: 'resume.education.selftaught.online.title',
    subtitleKey: 'resume.education.selftaught.online.subtitle',
    descriptionKey: 'resume.education.selftaught.online.description',
  },
  {
    id: 'university-courses',
    titleKey: 'resume.education.selftaught.universityCourses.title',
    subtitleKey: 'resume.education.selftaught.universityCourses.subtitle',
    descriptionKey: 'resume.education.selftaught.universityCourses.description',
  },
  {
    id: 'youtube',
    titleKey: 'resume.education.selftaught.youtube.title',
    subtitleKey: 'resume.education.selftaught.youtube.subtitle',
    descriptionKey: 'resume.education.selftaught.youtube.description',
  },
]

// ─────────────────────────────────────────
// COMPANY CLIENTS (resume experience tab)
// ─────────────────────────────────────────
export const tecfieldClients = [
  { name: 'TecField SRL',   logo: '/assets/images/company/img9.png',   type: 'png' },
  { name: 'O.P.S Oilfield', logo: '/assets/images/company/img10.jpeg', type: 'jpeg' },
]

export const blisterClients = [
  { name: 'Blister Technologies',     logo: '/assets/images/company/img1.png', type: 'png' },
  { name: 'Shell HSE',               logo: '/assets/images/company/img2.png', type: 'png' },
  { name: 'Zille SRL',               logo: '/assets/images/company/img3.png', type: 'png' },
  { name: 'Calfrac',                 logo: '/assets/images/company/img4.png', type: 'png' },
  { name: 'Min. Educación Neuquén',  logo: '/assets/images/company/img5.svg', type: 'svg' },
  { name: 'Contreras Hermanos',      logo: '/assets/images/company/img6.png', type: 'png' },
  { name: 'Prevensur',               logo: '/assets/images/company/img7.png', type: 'png' },
  { name: 'OldelVal',                logo: '/assets/images/company/img8.png', type: 'png' },
]
