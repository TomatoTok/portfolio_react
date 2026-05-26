# 📦 Portfolio Angular → React Migration Guide

> Documento de referencia para la migración del portfolio personal de **Angular** a **React**.
> Generado el 2026-05-26. Proyecto original: `portfolio_angular`.

---

## 📁 Estructura de Componentes Angular → React

### Árbol de componentes Angular (origen)

```
src/app/
├── app.component            ← Root component (layout shell)
├── app.module.ts
├── shared/
│   ├── navbar/              ← Header + navegación + selector de idioma
│   │   ├── navbar.component.html
│   │   ├── navbar.component.css
│   │   └── navbar.component.ts
│   ├── footer/              ← Footer con redes sociales + links
│   │   ├── footer.component.html
│   │   ├── footer.component.css
│   │   ├── footer.component.ts
│   │   └── animation/       ← Tag-cloud infinito (también se usa en slider)
│   │       ├── animation.component.html
│   │       ├── animation.component.css
│   │       └── animation.component.ts
│   ├── pipes/
│   │   └── translate.pipe.ts
│   └── shared.module.ts
├── components/
│   ├── bio/                 ← Contenedor principal de todas las secciones
│   │   ├── bio.component.html
│   │   ├── bio.component.css
│   │   └── bio.component.ts
│   ├── slider/              ← Hero section (presentación + foto + botones CV)
│   │   ├── slider.component.html
│   │   ├── slider.component.css
│   │   ├── slider.component.ts
│   │   └── animation/       ← Misma tag-cloud usada en footer
│   │       ├── animation.component.html
│   │       ├── animation.component.css
│   │       └── animation.component.ts
│   ├── resume/              ← Sección CV con tabs (Educación / Skills / Experiencia)
│   │   ├── resume.component.html
│   │   ├── resume.component.css
│   │   ├── resume.component.ts
│   │   ├── resume.module.ts
│   │   ├── single-list/     ← Ítem de lista (título + subtítulo + descripción)
│   │   │   ├── single-list.component.html
│   │   │   ├── single-list.component.css
│   │   │   └── single-list.component.ts
│   │   ├── skill/           ← Ítem de skill con ícono SVG/PNG
│   │   │   ├── skill.component.html
│   │   │   ├── skill.component.css
│   │   │   └── skill.component.ts
│   │   └── company/         ← Logo de empresa con nombre
│   │       ├── company.component.html
│   │       ├── company.component.css
│   │       └── company.component.ts
│   ├── portfolio/           ← Grid de proyectos + modales de detalle
│   │   ├── portfolio.component.html
│   │   ├── portfolio.component.css
│   │   ├── portfolio.component.ts
│   │   ├── single-proyect/  ← Card clickeable de proyecto
│   │   │   ├── single-proyect.component.html
│   │   │   ├── single-proyect.component.css
│   │   │   └── single-proyect.component.ts
│   │   ├── modal/           ← Modal con carousel de imágenes
│   │   │   ├── modal.component.html
│   │   │   ├── modal.component.css
│   │   │   └── modal.component.ts
│   │   ├── modal-video/     ← Modal con video + descripción
│   │   │   ├── modal-video.component.html
│   │   │   ├── modal-video.component.css
│   │   │   └── modal-video.component.ts
│   │   └── video-project/   ← (aux) Card de proyecto con video
│   │       ├── video-project.component.html
│   │       ├── video-project.component.css
│   │       └── video-project.component.ts
│   ├── experience/          ← Tarjetas de experiencia laboral expandibles
│   │   ├── experience.component.html
│   │   ├── experience.component.css
│   │   ├── experience.component.ts
│   │   └── card/            ← Card de empresa con collapse de roles
│   │       ├── card.component.html
│   │       ├── card.component.css
│   │       └── card.component.ts
│   ├── news/                ← Sección blog con 3 posts en card
│   │   ├── news.component.html
│   │   ├── news.component.css
│   │   ├── news.component.ts
│   │   └── blog-modal/      ← Modal de artículo de blog
│   │       ├── blog-modal.component.html
│   │       ├── blog-modal.component.css
│   │       └── blog-modal.component.ts
│   ├── education/           ← (comentado/deprecado en bio) Sección educación standalone
│   │   ├── education.component.html
│   │   ├── education.component.css
│   │   └── education.component.ts
│   └── modals/              ← Contenedor global de modales misceláneos
│       ├── modals.component.html
│       ├── modals.component.css
│       └── modals.component.ts
└── services/
    ├── mailer.service.ts    ← Servicio de envío de email (NodeMailer)
    ├── mail.dto.ts          ← DTO del formulario de contacto
    └── translation.service.ts ← Servicio i18n (ES/EN)
```

### Estructura React propuesta

```
src/
├── main.jsx / main.tsx
├── App.jsx
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx           ← navbar.component
│   │   └── Footer.jsx           ← footer.component
│   ├── shared/
│   │   └── TagCloud.jsx         ← animation.component (slider + footer)
│   ├── sections/
│   │   ├── Hero.jsx             ← slider.component (hero section)
│   │   ├── Resume.jsx           ← resume.component
│   │   ├── Portfolio.jsx        ← portfolio.component
│   │   ├── Experience.jsx       ← experience.component
│   │   └── Blog.jsx             ← news.component
│   ├── resume/
│   │   ├── SingleList.jsx       ← single-list.component
│   │   ├── SkillItem.jsx        ← skill.component
│   │   └── CompanyItem.jsx      ← company.component
│   ├── portfolio/
│   │   ├── ProjectCard.jsx      ← single-proyect.component
│   │   ├── ProjectModal.jsx     ← modal.component (con carousel)
│   │   └── VideoModal.jsx       ← modal-video.component
│   ├── experience/
│   │   └── ExperienceCard.jsx   ← card.component
│   └── blog/
│       └── BlogModal.jsx        ← blog-modal.component
├── data/
│   └── portfolio-data.js        ← Datos hardcodeados de proyectos / experiencias
├── i18n/
│   ├── en.json                  ← Copiar de src/assets/i18n/en.json
│   └── es.json                  ← Copiar de src/assets/i18n/es.json
├── hooks/
│   └── useTranslation.js        ← Hook para i18n (reemplaza TranslationService)
└── assets/
    └── (copiar carpeta assets completa)
```

---

## 🧩 Descripción de cada componente

### `Navbar` ← `navbar.component`
**Función:** Header fijo con navegación one-page, selector de idioma ES/EN, menú hamburguesa mobile.

**Partes:**
- Logo textual `"Tomato"` (texto, no imagen)
- Links de navegación: Home, Resume, Education, Portfolio, Experience, Blog, Footer
- Botones de idioma `ES` / `EN` (solo desktop `d-xl-flex`)
- Ícono hamburger para mobile (abre side-nav)
- Side-nav mobile con mismo listado de links + íconos sociales SVG (Facebook, Instagram, LinkedIn)

**Props Angular → React:** No recibe props, consume `TranslationService` y `currentLang$`.

**React equivalent:** Usar `useState` para el idioma activo + context o Zustand/Jotai para i18n global.

---

### `Footer` ← `footer.component`
**Función:** Pie de página con redes sociales, tag cloud animado, links de recursos y créditos.

**Partes:**
- Columna 1: Social Media → LinkedIn, Instagram, Twitter/X
- Columna 2: `<TagCloud />` (animation.component reutilizado)
- Columna 3: Recursos → Angular Docs, Bootstrap 5, Font Awesome, NodeMailer
- Columna 4: Desarrollador → Hostinger, NodeJs, Angular, GitHub
- Copyright: `© 2025. All rights reserved by Tomas Bascal.`

**Links sociales:**
- LinkedIn: `https://www.linkedin.com/in/tomas-bascal/`
- Instagram: `https://www.instagram.com/tomee_bascal/`
- Twitter/X: `https://twitter.com/Tomato_tok`

---

### `TagCloud` ← `animation.component` (slider + footer)
**Función:** Banda de hashtags con scroll infinito horizontal animado con CSS (`--duration`, `--direction`).

**Tags:** `#JavaScript`, `#webdev`, `#Typescript`, `#Next.js`, `#UI/UX`, `#Gaming`, `#Argentina`, `#GitHub`, `#NodeJs`, `#Bootstrap`, `#Desarrollador`, `#BackEnd`, `#PHP`, `#CSS`, `#Git`, `#JQuery`, `#JAVA`, `#Angular`, `#MySQL`, `#FrontEnd`, `#VideoGames`

**CSS clave:** Animación `loop-slider` con variable `--duration: 15951ms` y `--direction: normal`.

---

### `Hero` ← `slider.component`
**Función:** Sección principal (Hero) con presentación personal, foto, info de contacto y botones de descarga CV.

**Partes:**
- Columna izquierda:
  - Saludo + nombre (`"Hello, I'm"` / `"Tomas Bascal"`)
  - Descripción breve + link a `https://www.tecfield.com.ar/`
  - Info row: `[file] Development, analysis and web design`
  - Info row: `[mail] tom.bascal@gmail.com`
  - Info row: `[map-pin] Neuquén - Argentina`
  - `<TagCloud />` al final
- Columna derecha:
  - Foto principal con `border-radius` y `opacity: 0.92`
  - Botones: `SPANISH CV` (descarga), `ENGLISH CV` (descarga), `CONTACT ME` (abre modal)
- Modal de contacto (inline, id `#contact`):
  - Email directo: `tom.bascal@gmail.com`
  - Botón Linktree: `https://linktr.ee/tomasbascal`

**Assets usados:**
| Archivo | Ruta Angular |
|---------|-------------|
| Foto hero | `src/assets/images/slider/example.jpg` |
| CV Español | `src/assets/downloads/tomas_bascal_cv_spanish_2025.pdf` |
| CV Inglés | `src/assets/downloads/tomas_bascal_cv_english_2025.pdf` |

---

### `Resume` ← `resume.component`
**Función:** Sección CV con 3 tabs: Educación, Skills, Experiencia laboral.

#### Tab 1 — Educación
- **Columna Formal:**
  - `<SingleList>` Universidad del Comahue Neuquén (B.S. Computer Science, 2018-Present)
  - `<SingleList>` Cambridge English (Instituto Neuquén Capital)
  - `<SingleList>` Bachiller en Comunicación - CEM N°35
- **Columna Self-taught:**
  - `<SingleList>` Cursos Online (Udemy, Platzi, FreeCodeCamp)
  - `<SingleList>` Cursos Universitarios (Ágiles, Algorítmica, BD Relacional)
  - `<SingleList>` YouTube (200+ hs de contenido)

#### Tab 2 — Skills
- **Columna Lenguajes/Frameworks:**
  - `<SkillItem>` HTML5, CSS3, JavaScript, PHP, CodeIgniter 3/4, Angular, NestJS, Laravel, Java
- **Columna Herramientas:**
  - `<SkillItem>` Bootstrap 3/4/5, NodeJS, cPanel, Figma, FontAwesome, Git, GitHub, jQuery, MySQL, MongoDB

#### Tab 3 — Experiencia (tabla de clientes)
- **Tecfield (2024-Present):** TecField SRL, O.P.S Oilfield
- **Blister (2020-2024):** Blister Tech, Shell HSE, Zille SRL, Calfrac, Ministerio de Educación Neuquén, Contreras Hermanos, Prevensur, OldelVal Cass, Shell Quality

**Assets usados (íconos SVG/PNG):**
| Skill | Ruta |
|-------|------|
| HTML5 | `src/assets/images/svg icons/html-1-icon.svg` |
| CSS3 | `src/assets/images/svg icons/css-3-icon.svg` |
| JavaScript | `src/assets/images/svg icons/logo-javascript-icon.svg` |
| PHP | `src/assets/images/svg icons/php-icon.svg` |
| CodeIgniter | `src/assets/images/svg icons/codeigniter-icon.svg` |
| Angular | `src/assets/images/svg icons/angular-icon.svg` |
| NestJS | `src/assets/images/svg icons/nestjs-icon.svg` |
| Laravel | `src/assets/images/svg icons/laravel-wordmark-icon.svg` |
| Java | `src/assets/images/svg icons/java-icon.svg` |
| Bootstrap | `src/assets/images/svg icons/bootstrap-5-icon.svg` |
| NodeJS | `src/assets/images/svg icons/nodejs-icon.svg` |
| cPanel | `src/assets/images/svg icons/cpanel-icon.svg` |
| Figma | `src/assets/images/svg icons/figma-5-icon.svg` |
| FontAwesome | `src/assets/images/svg icons/fontawesome-1-icon.svg` |
| Git | `src/assets/images/svg icons/git-icon.svg` |
| GitHub | `src/assets/images/svg icons/github-icon-1.svg` |
| jQuery | `src/assets/images/svg icons/jquery-icon.svg` |
| MySQL | `src/assets/images/svg icons/mysql-icon.svg` |
| MongoDB | `src/assets/images/svg icons/mongo-icon.png` |
| NextJS | `src/assets/images/svg icons/nextjs-13-icon.svg` |

**Logos de empresas (Resume - tab Experiencia):**
| Empresa | Ruta |
|---------|------|
| Blister Technologies | `src/assets/images/company/img1.png` |
| Shell | `src/assets/images/company/img2.png` |
| Zille | `src/assets/images/company/img3.png` |
| Calfrac | `src/assets/images/company/img4.png` |
| Ministerio Educación Neuquén | `src/assets/images/company/img5.svg` |
| Contreras Hermanos | `src/assets/images/company/img6.png` |
| Prevensur | `src/assets/images/company/img7.png` |
| OldelVal | `src/assets/images/company/img8.png` |
| TecField SRL | `src/assets/images/company/img9.png` |
| O.P.S | `src/assets/images/company/img10.jpeg` |

---

### `Portfolio` ← `portfolio.component`
**Función:** Grid de proyectos dividido en dos secciones: Proyectos Web y Proyectos de Videojuegos.

#### Sección 1 — Proyectos Web (modales con imágenes)

| ID Modal | Título | Thumbnail | Imágenes Modal | GitHub | Web |
|----------|--------|-----------|----------------|--------|-----|
| `ModalEleven` | Photography Portfolio | `project11/img1.png` | — | — | — |
| `ModalTen` | Inventory System | `project10/img1.png` | — | — | — |
| `ModalOne` | Admin Dashboard | `project7/img1.jpg` | `project7/init.jpg`, `project7/img2.jpg` | `TomatoTok/adminDashboard` | `tomatotok.github.io/adminDashboard` |
| `ModalTwo` | Regional Positioning System | `project4/img1.jpg` | `project4/init.jpg` | — | — |
| `ModalThree` | Personal User Manager | `project1/img1.jpg` | `project1/img2.jpg`, `project1/img3.jpg` | `TomatoTok/Gup` | `codepen.io/tomatotok/full/abWZeee` |
| `ModalFive` | QR Generator | `project3/img1.jpg` | `project3/init.jpg` | `TomatoTok/qr-generator` | `tomatotok.github.io/qr-generator` |
| `ModalSeven` | Shoji Meguro FP | `project9/img2.png` | `project9/img3.png` | `TomatoTok/shoji-meguro-fp` | `tomatotok.github.io/shoji-meguro-fp` |

#### Sección 2 — Game Development (modales con video)

| ID Modal | Título | Thumbnail | Video | Notas |
|----------|--------|-----------|-------|-------|
| `ModalSix` | Coffee Project (RPGMaker) | `project8/init.jpg` | — | Solo imágenes |
| `ModalTwelve` | Island Project (Godot) | `game4/image1.png` | `muestra_isla_2.mp4` | — |
| `ModalEight` | Platformer (Godot) | `game1/img1.png` | `godot-project.mp4` | — |
| `ModalNine` | Tetris Unity | `game2/img1.png` | `tetris-unity.mp4` | — |
| `ModalTen` | Inventory System | `project10/img1.png` | `mt-tools-video.mp4` | — |
| `ModalEleven` | Photography Portfolio | `project11/img1.png` | `portfolio_fotografia.mp4` | — |

**Rutas completas de imágenes de portfolio:**
```
src/assets/images/portfolio/
├── experience-01.webp      ← Blister (card Experience)
├── experience-02.png       ← Freelance (card Experience)
├── experience-03.jpg       ← University (card Experience)
├── experience-04.webp      ← Tecfield (card Experience)
├── portfolio-01.jpg
├── portfolio-03.jpg
├── portfolio-04.jpg
├── portfolio-05.jpg
├── portfolio-06.jpg
├── game1/img1.png          ← Platformer thumbnail
├── game2/img1.png          ← Tetris thumbnail
├── game4/image1.png        ← Island Project thumbnail
├── project1/               ← Personal User Manager
│   ├── img1.jpg, img2.jpg, img3.jpg, init.jpg
├── project2/               ← (no usado actualmente)
│   ├── img1.jpg, img2.jpg, img3.jpg, init.jpg
├── project3/               ← QR Generator
│   ├── img1.jpg, init.jpg
├── project4/               ← Positioning System
│   ├── img1.jpg, init.jpg
├── project5/               ← (no usado actualmente)
│   ├── img1.jpg, img2.jpg, img3.jpg, img4.jpg, init.jpg
├── project6/               ← (comentado - Weather App)
│   ├── img1.jpg, init.jpg
├── project7/               ← Admin Dashboard
│   ├── img1.jpg, img2.jpg, init.jpg
├── project8/               ← Coffee Project (RPGMaker)
│   ├── img1.jpg ... img13.jpg, init.jpg
├── project9/               ← Shoji Meguro FP
│   ├── img1.png, img2.png, img3.png
├── project10/              ← Inventory System
│   └── img1.png
└── project11/              ← Photography Portfolio
    └── img1.png
```

**Rutas de videos:**
```
src/assets/videos/
├── godot-project.mp4       ← ModalEight (Platformer)
├── mt-tools-video.mp4      ← ModalTen (Inventory System)
├── muestra_isla_2.mp4      ← ModalTwelve (Island Project)
├── portfolio_fotografia.mp4 ← ModalEleven (Photography Portfolio)
└── tetris-unity.mp4        ← ModalNine (Tetris Unity)
```

---

### `Experience` ← `experience.component` + `card.component`
**Función:** Grid de 4 tarjetas de experiencia laboral expandibles con detalle de roles.

**Cards (en orden):**

#### 1. Tecfield SRL (2024-Present)
- **Imagen:** `src/assets/images/portfolio/experience-04.webp`
- **Título:** Tecfield SRL
- **Subtítulo:** Project Leader, Development and Statistical Analysis
- **Descripción:** Statistical analysis, fleet management, HSE and Environment, operational logic for Oil & Gas companies
- **Roles al expandir:** Project Leader, Internal model and structure, Statistical Analysis, Forms and Data Entry

#### 2. Blister Technologies (2021-2024)
- **Imagen:** `src/assets/images/portfolio/experience-01.webp`
- **Título:** Blister Technologies
- **Subtítulo:** Design, Project Leader, and Web Developer
- **Descripción:** Statistical systems for large Oil & Gas companies
- **Roles al expandir:** Developer, Project Leader, System Management, Design, Architecture, Maintenance/Support, Miscellaneous tasks

#### 3. Freelance Developer (2020-2021)
- **Imagen:** `src/assets/images/portfolio/experience-02.png`
- **Título:** Freelance Developer
- **Subtítulo:** Web Developer and External Applications
- **Descripción:** Single Page Web Apps, Data management, custom designs
- **Roles al expandir:** Own clients, Personal Development, SAWP Pages, Active participation

#### 4. Universidad Nacional Del Comahue (2018-Present)
- **Imagen:** `src/assets/images/portfolio/experience-03.jpg`
- **Título:** University
- **Subtítulo:** B.S. Computer Science/Systems
- **Descripción:** Universidad Nacional Del Comahue Neuquén Capital
- **Roles al expandir:** Database Design, Structure Implementation, OOP (link a ClassGenerator SmallTalk), Courses and Competitions

---

### `Blog` ← `news.component` + `blog-modal.component`
**Función:** Sección blog con 3 tarjetas clickeables que abren modales con el artículo completo.

#### Post 1 — Videojuegos
- **Categoría:** Video Games
- **Título:** "It's not just playing"
- **Lectura:** 10 min
- **Imagen card:** `src/assets/images/blog/blog-01.jpg`
- **Modal id:** `modal-blog-1`
- **Contenido del artículo:** Reflexión sobre el desarrollo de videojuegos — historia/arte/mecánicas. Secciones: "It's another way to play", "Control everything", "Down to the detail", "Transmit"

#### Post 2 — Impresión 3D
- **Categoría:** Micro-entrepreneurship
- **Título:** "3D Printing"
- **Lectura:** 12 min
- **Imagen card:** `src/assets/images/blog/vari.webp`
- **Modal id:** `modal-blog-2`
- **Contenido del artículo:** Emprendimiento de impresión 3D. Links:
  - Instagram: `https://www.instagram.com/varicreaciones3d/`
  - Tienda online: (link a tienda)
  - Secciones: Intro, "Beginning of the entrepreneurship", "Website and Social Networks", "Experiences"

#### Post 3 — Vida social
- **Categoría:** Social life
- **Título:** "IT professionals and social life"
- **Lectura:** 5 min
- **Imagen card:** `src/assets/images/blog/blog-03.jpg`
- **Modal id:** `modal-blog-3`
- **Contenido del artículo:** Desmitificando al programador antisocial. Secciones: Intro, "What do I like to do?", "My way of being"

---

## 🌐 Internacionalización (i18n)

**Archivos de traducción:**
```
src/assets/i18n/
├── en.json   ← Inglés (idioma por defecto visible)
└── es.json   ← Español
```

**Secciones cubiertas por i18n:**
- `navbar.*` — Todos los links del menú
- `hero.*` — Presentación, email, ubicación, botones CV
- `contact.*` — Modal de contacto
- `portfolio.*` — Títulos y descripciones de todos los proyectos y modales
- `experience.*` — Experiencias laborales y roles completos
- `blog.*` — Posts completos incluyendo textos de artículos
- `resume.*` — Educación, skills, experiencia (tabs)
- `footer.*` — Labels del footer

**Implementación React sugerida:** `react-i18next` o un hook `useTranslation` propio con Context.

---

## 🎨 Estilos y dependencias CSS

**Archivos CSS globales (copiar a React):**
```
src/assets/css/
├── style.css                  ← ⭐ CSS principal del tema
├── plugins/feature.css        ← Estilos extra
└── vendor/
    ├── bootstrap.min.css      ← Bootstrap 5
    ├── aos.css                ← Animate On Scroll
    ├── slick.css              ← Slick carousel
    └── slick-theme.css        ← Tema slick

src/assets/maps/               ← Fuentes SCSS del tema (referencia)
├── default/                   ← _variables, _typography, _animations, _common...
├── elements/                  ← _banner, _portfolio, _skill, _footer, _modal...
└── header/                    ← _header, _nav, _mobilemenu...
```

**Librerías JS a migrar como npm packages:**
| Vendor JS | NPM equivalente |
|-----------|-----------------|
| `bootstrap.js` | `bootstrap@5` |
| `aos.js` | `aos` |
| `slick.min.js` | `react-slick` + `slick-carousel` |
| `feather.min.js` | `react-feather` o `feather-icons-react` |
| `particles.js` | `react-tsparticles` |
| `wow.js` | `wowjs` o reemplazar por `framer-motion` |
| `text-type.js` | `react-typed` o `typewriter-effect` |
| `jquery-one-page-nav.js` | Implementar manualmente con IntersectionObserver |

---

## 🖼️ Inventario de Assets a copiar

### Imágenes activas (en uso)
```
src/assets/images/
├── slider/
│   └── example.jpg                    ← Foto hero principal
├── logo/
│   ├── logo.png                       ← Logo general
│   ├── logo.jpg
│   ├── favicon.jpg
│   └── apple-touch-icon.jpg
├── portfolio/
│   ├── experience-01.webp             ← Card Blister
│   ├── experience-02.png              ← Card Freelance
│   ├── experience-03.jpg              ← Card University
│   ├── experience-04.webp             ← Card Tecfield
│   ├── game1/img1.png                 ← Modal Platformer
│   ├── game2/img1.png                 ← Modal Tetris
│   ├── game4/image1.png               ← Modal Island Project
│   ├── project1/img1.jpg, img2.jpg, img3.jpg, init.jpg
│   ├── project3/img1.jpg, init.jpg
│   ├── project4/img1.jpg, init.jpg
│   ├── project7/img1.jpg, img2.jpg, init.jpg
│   ├── project8/img1.jpg...img13.jpg, init.jpg
│   ├── project9/img1.png, img2.png, img3.png
│   ├── project10/img1.png
│   └── project11/img1.png
├── blog/
│   ├── blog-01.jpg                    ← Post videojuegos
│   ├── blog-03.jpg                    ← Post vida social
│   └── vari.webp                      ← Post impresión 3D
├── company/
│   ├── img1.png ... img9.png, img10.jpeg
│   └── img5.svg
└── svg icons/                         ← Todos los íconos de skills
    ├── angular-icon.svg
    ├── bootstrap-5-icon.svg
    ├── codeigniter-icon.svg
    ├── cpanel-icon.svg
    ├── css-3-icon.svg
    ├── figma-5-icon.svg
    ├── fontawesome-1-icon.svg
    ├── git-icon.svg
    ├── github-icon-1.svg
    ├── html-1-icon.svg
    ├── java-icon.svg
    ├── jquery-icon.svg
    ├── laravel-wordmark-icon.svg
    ├── logo-javascript-icon.svg
    ├── mongo-icon.png
    ├── mysql-icon.svg
    ├── nestjs-icon.svg
    ├── nextjs-13-icon.svg
    ├── nodejs-icon.svg
    └── php-icon.svg
```

### Videos activos
```
src/assets/videos/
├── godot-project.mp4
├── mt-tools-video.mp4
├── muestra_isla_2.mp4
├── portfolio_fotografia.mp4
└── tetris-unity.mp4
```

### Descargas
```
src/assets/downloads/
├── tomas_bascal_cv_spanish_2025.pdf
└── tomas_bascal_cv_english_2025.pdf
```

### Fuentes
```
src/assets/fonts/
├── Feather.ttf
└── icons/feather/   ← (íconos SVG de feather, 200+)
```

### Imágenes antiguas / no activas (⚠️ se pueden descartar)
```
src/assets/images/
├── slider/banner-02_old.png
├── slider/banner-02_old_old.png
├── slider/banner-02.jpg           ← Reemplazado por example.jpg
├── blog/old_blog-01.jpg ... old_blog-big-01.jpg
├── blog/blog-01.webp              ← Hay jpg del mismo
├── portfolio/portfolio-02_OLD.jpg
├── portfolio/portfolio-02_oldold.jpg
├── project2/                      ← Proyecto no listado en portfolio
├── project5/                      ← Proyecto no listado en portfolio
└── project6/                      ← Comentado (Weather App)
```

---

## 🔧 Servicios a re-implementar en React

### `TranslationService` → Hook `useTranslation`
- Carga `en.json` / `es.json` de `src/assets/i18n/`
- Expone `t(key)` para traducir con dot-notation
- Persiste idioma seleccionado en `localStorage`
- Librería recomendada: **`react-i18next`** + `i18next`

### `MailerService` → API Route o EmailJS
- En Angular usaba NodeMailer desde un servidor Express
- En React recomendado: **EmailJS** (sin backend) o un endpoint `/api/contact` en Next.js

---

## 📋 Notas de migración

### Funcionalidades clave a preservar
1. ✅ Scroll suave one-page con hash anchors (`#home`, `#resume`, `#portfolio`, `#experiences`, `#blog`, `#footer`)
2. ✅ Modales Bootstrap para portfolio (con carousel de imágenes)
3. ✅ Modales Bootstrap para portfolio con video (`<video>` tag)
4. ✅ Collapse de Bootstrap para expandir experiencia laboral
5. ✅ Animaciones AOS (`data-aos="fade-up"`) en todas las secciones
6. ✅ Tag cloud con animación CSS infinita (Hero + Footer)
7. ✅ Tabs Bootstrap para sección Resume
8. ✅ Navbar sticky con active state en scroll
9. ✅ Botón "back to top"
10. ✅ Selector de idioma ES/EN con persistencia

### Estructura de secciones (orden en bio.component)
```
1. <Navbar />          ← header fijo
2. <main>
   ├── <Hero />        ← #home
   ├── <Resume />      ← #resume
   ├── <Portfolio />   ← #portfolio
   ├── <Experience />  ← #experiences
   ├── <Blog />        ← #blog
   └── <BackToTop />   ← botón flotante
3. <Footer />          ← #footer
```

### Feather Icons
En Angular se usan mediante `data-feather="icon-name"` + `feather.replace()`.  
En React reemplazar con el paquete `react-feather`:
```jsx
import { Mail, MapPin, FileText, ArrowUp, X } from 'react-feather'
```

### Bootstrap
Mantener Bootstrap 5 via npm. Inicializar manualmente los tooltips/modals con:
```js
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
```

---

*Fin del documento — generado a partir del código fuente de `portfolio_angular`.*
