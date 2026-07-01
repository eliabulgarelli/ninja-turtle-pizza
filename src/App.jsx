import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { BUSINESS, HOURS, SERVICES, MENU, MENU_TABS, REVIEWS, fmtTime } from './data.js'
import { getOpenStatus } from './openStatus.js'

/* ── Logo SVG (spicchio di pizza con benda ninja) ── */
function Logo() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="lc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6C453" />
          <stop offset="1" stopColor="#E09F3E" />
        </linearGradient>
      </defs>
      <path d="M32 6 L58 54 A54 54 0 0 1 6 54 Z" fill="url(#lc)" stroke="#B5731F" strokeWidth="2" strokeLinejoin="round" />
      <rect x="4" y="26" width="56" height="13" rx="2" fill="#22A559" />
      <path d="M20 30 h9 v6 h-9 a3 3 0 0 1 -3 -3 a3 3 0 0 1 3 -3 z" fill="#0B1A10" />
      <path d="M44 30 h-9 v6 h9 a3 3 0 0 0 3 -3 a3 3 0 0 0 -3 -3 z" fill="#0B1A10" />
      <path d="M58 28 l6 -3 v16 l-6 -3 z" fill="#188045" />
      <circle cx="32" cy="47" r="3.2" fill="#D1495B" />
      <circle cx="24" cy="50" r="2.6" fill="#D1495B" />
      <circle cx="40" cy="50" r="2.6" fill="#D1495B" />
    </svg>
  )
}

/* ── Icone (stile Lucide, stroke coerente 2px) ── */
const Icon = {
  dinein: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11h18M12 3a9 8 0 0 1 9 8H3a9 8 0 0 1 9-8zM7 21h10M12 15v6" />
    </svg>
  ),
  bag: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  scooter: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="18" r="3" /><circle cx="18" cy="18" r="3" />
      <path d="M9 18h6M18 15V6h2M6 15l3-9h4l3 9" />
    </svg>
  ),
  pin: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  phone: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" />
    </svg>
  ),
  clock: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
    </svg>
  ),
  arrow: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  menu: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
}
const serviceIcons = { dinein: Icon.dinein, takeaway: Icon.bag, delivery: Icon.scooter }

/* ── Animazioni riutilizzabili ── */
const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

/* ──────────────────────────────────────────────────────────────
   REVEAL ROBUSTO (scroll-based)
   Niente IntersectionObserver: usiamo un listener di scroll +
   getBoundingClientRect, throttlato con requestAnimationFrame.
   Un controllo iniziale al mount rivela subito ciò che è già a
   schermo. Così il contenuto non resta MAI invisibile.
   ────────────────────────────────────────────────────────────── */
function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Rispetta chi preferisce meno movimento: mostra e basta.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }
    const check = () => {
      const r = el.getBoundingClientRect()
      // Visibile se il bordo alto entra nell'88% inferiore del viewport.
      if (r.top < window.innerHeight * 0.88 && r.bottom > 0) {
        setInView(true)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
        return true
      }
      return false
    }
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => { ticking = false; check() })
    }
    if (!check()) {
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
    }
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return [ref, inView]
}

// Wrapper unico: `group` attiva lo stagger sui figli (per le griglie).
function Reveal({ children, className, group = false }) {
  const [ref, inView] = useInView()
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={group ? stagger : reveal}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

/* ── Navbar ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const close = () => setOpen(false)
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap nav__inner">
        <a href="#top" className="nav__brand" onClick={close}>
          <Logo />
          <span className="nav__name">Ninja Turtle<small>PIZZA</small></span>
        </a>
        <ul className={`nav__links ${open ? 'show' : ''}`}>
          <li><a href="#menu" onClick={close}>Menu</a></li>
          <li><a href="#servizi" onClick={close}>Servizi</a></li>
          <li><a href="#recensioni" onClick={close}>Recensioni</a></li>
          <li><a href="#dove" onClick={close}>Dove siamo</a></li>
          <li className="nav__cta-mobile">
            <a className="btn btn--tomato" href={`tel:${BUSINESS.phoneHref}`} onClick={close}>Ordina</a>
          </li>
        </ul>
        <a className="btn btn--tomato nav__cta" href={`tel:${BUSINESS.phoneHref}`}>
          {Icon.phone({ width: 18, height: 18 })} Ordina ora
        </a>
        <button className="nav__toggle" aria-label="Apri menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {Icon.menu({ width: 28, height: 28 })}
        </button>
      </div>
    </nav>
  )
}

/* ── Hero ── */
function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap hero__grid">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.span className="hero__badge" variants={reveal}>
            <span aria-hidden="true">★</span> {BUSINESS.rating} su Google · {BUSINESS.reviewCount} recensioni
          </motion.span>
          <motion.h1 variants={reveal}>
            Ninja Turtle
            <span className="line2">Pizza</span>
          </motion.h1>
          <motion.p className="hero__tag" variants={reveal}>{BUSINESS.tagline}</motion.p>
          <motion.p className="hero__lead" variants={reveal}>
            Le XXL da 50 cm coi nomi giusti — Leonardo, Raffaello, Shredder — più le
            classiche di sempre. Al trancio o intera, a Reggio Emilia. No la classica
            pizzeria, finalmente.
          </motion.p>
          <motion.div className="hero__cta" variants={reveal}>
            <a className="btn btn--tomato" href={`tel:${BUSINESS.phoneHref}`}>
              {Icon.phone({ width: 20, height: 20 })} Chiama & ordina
            </a>
            <a className="btn btn--ghost" href="#menu">Scopri il menu {Icon.arrow({ width: 20, height: 20 })}</a>
          </motion.div>
          <motion.div className="hero__stats" variants={reveal}>
            <div className="hero__stat"><strong>50 cm</strong><span>le XXL da dividere</span></div>
            <div className="hero__stat"><strong>{BUSINESS.priceRange}</strong><span>a persona</span></div>
            <div className="hero__stat"><strong>3</strong><span>sul posto · asporto · delivery</span></div>
          </motion.div>
        </motion.div>

        <motion.div className="hero__art"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>
          <div className="pizza-3d">
            <img
              src={`${import.meta.env.BASE_URL}pizza-hero.png`}
              alt="Pizza margherita appena sfornata di Ninja Turtle Pizza"
              className="pizza-photo"
              draggable="false"
            />
          </div>
        </motion.div>
      </div>
      <div className="hero__scroll">Scorri <span /></div>
    </header>
  )
}

/* ── Marquee ── */
function Marquee() {
  const items = ['XXL DA CONDIVIDERE', 'IMPASTO DEL GIORNO', 'ASPORTO & DELIVERY', 'RAFFAELLO BBQ', 'AL TRANCIO', 'NINJA TURTLE PIZZA']
  const row = (
    <span>
      {items.map((t, i) => (<span key={i}>{t} <em style={{ color: '#06210f' }}>🐢</em></span>))}
    </span>
  )
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">{row}{row}</div>
    </div>
  )
}

/* ── Menu ── */
function Menu() {
  const [tab, setTab] = useState(MENU_TABS[0].key)
  const active = MENU_TABS.find((t) => t.key === tab)
  const items = MENU[tab]
  return (
    <section className="block menu" id="menu">
      <div className="wrap">
        <Reveal className="block__head">
          <span className="eyebrow">Il menu</span>
          <h2 className="section-title">Scegli il tuo lato oscuro</h2>
          <p className="section-sub">
            Dalle XXL da 50 cm coi nomi delle tartarughe alle classiche di sempre.
            Al trancio o intera.
          </p>
        </Reveal>

        <div className="menu-tabs" role="tablist" aria-label="Categorie del menu">
          {MENU_TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              className={`menu-tab ${tab === t.key ? 'active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
        {active.hint && <p className="menu-tabs__hint">{active.hint}</p>}

        <Reveal group className="menu-grid" key={tab}>
          {items.map((item) => (
            <motion.article className="menu-card" key={item.name} variants={reveal}>
              {item.badge && <span className="menu-card__tag">{item.badge}</span>}
              <div className="menu-card__row">
                <h3>{item.name}</h3>
                <span className="menu-card__price">{item.price}</span>
              </div>
              <p>{item.desc}</p>
            </motion.article>
          ))}
        </Reveal>
        <p className="menu-note">
          Menu completo, prezzi in euro. Per allergeni e disponibilità del giorno,
          chiama la pizzeria allo {BUSINESS.phone}.
        </p>
      </div>
    </section>
  )
}

/* ── Services ── */
function Services() {
  return (
    <section className="block services" id="servizi">
      <div className="wrap">
        <Reveal className="block__head">
          <span className="eyebrow">Come vuoi la tua pizza</span>
          <h2 className="section-title">Tre modi. Una sola regola: buona.</h2>
          <p className="section-sub">Che tu voglia sederti, passare a ritirare o restare sul divano, ci pensiamo noi.</p>
        </Reveal>
        <Reveal group className="services-grid">
          {SERVICES.map((s) => {
            const Ico = serviceIcons[s.key]
            return (
              <motion.article className="service" key={s.key} variants={reveal}>
                <div className="service__icon">{Ico({ width: 30, height: 30 })}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </motion.article>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

/* ── Reviews ── */
function Reviews() {
  return (
    <section className="block reviews" id="recensioni">
      <div className="wrap">
        <Reveal className="block__head">
          <span className="eyebrow">Dicono di noi</span>
          <h2 className="section-title">4,4 stelle e clienti che tornano</h2>
          <p className="section-sub">Recensioni reali dalla nostra scheda Google.</p>
        </Reveal>
        <Reveal group className="reviews-grid">
          {REVIEWS.map((r) => (
            <motion.figure className="review" key={r.author} variants={reveal}>
              <div className="review__stars" aria-label={`${r.stars} stelle su 5`}>{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
              <blockquote><p>“{r.text}”</p></blockquote>
              <figcaption className="review__who">
                <strong>{r.author}</strong>
                <span>{r.badge} · {r.when}</span>
              </figcaption>
            </motion.figure>
          ))}
        </Reveal>
        <div className="reviews__cta">
          <div className="reviews__score">
            <b>{BUSINESS.rating}</b>
            <span style={{ textAlign: 'left' }}>
              <span className="review__stars">★★★★★</span><br />
              <small style={{ color: 'var(--muted)' }}>{BUSINESS.reviewCount} recensioni Google</small>
            </span>
          </div>
          <a className="btn btn--dark" href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer">Leggi tutte su Google</a>
        </div>
      </div>
    </section>
  )
}

/* ── Location + orari ── */
function Location() {
  const status = getOpenStatus()
  const todayIdx = new Date().getDay()
  return (
    <section className="block location" id="dove">
      <div className="wrap location__grid">
        <Reveal>
          <span className="eyebrow">Dove siamo</span>
          <h2 className="section-title">Passa a trovarci</h2>
          <span className={`status-pill ${status.open ? '' : 'closed'}`}>
            <span className="dot" />{status.message}
          </span>
          <div className="info-list">
            <div className="info-item">
              <span className="info-item__icon">{Icon.pin({ width: 24, height: 24 })}</span>
              <div>
                <strong>{BUSINESS.address}</strong>
                <span>{BUSINESS.city}</span>
              </div>
            </div>
            <div className="info-item">
              <span className="info-item__icon">{Icon.phone({ width: 24, height: 24 })}</span>
              <div>
                <strong>Telefono</strong>
                <a href={`tel:${BUSINESS.phoneHref}`}>{BUSINESS.phone}</a>
              </div>
            </div>
            <div className="info-item">
              <span className="info-item__icon">{Icon.clock({ width: 24, height: 24 })}</span>
              <div>
                <strong>Aperti la sera</strong>
                <span>Cucina attiva dalle 18:00</span>
              </div>
            </div>
          </div>
          <div className="hero__cta">
            <a className="btn" href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer">
              {Icon.pin({ width: 20, height: 20 })} Indicazioni
            </a>
            <a className="btn btn--tomato" href={`tel:${BUSINESS.phoneHref}`}>{Icon.phone({ width: 20, height: 20 })} Chiama</a>
          </div>
        </Reveal>

        <Reveal>
          <div className="hours-card">
            <h3>Orari di apertura</h3>
            {HOURS.map((h, i) => (
              <div className={`hours-row ${i === todayIdx ? 'today' : ''}`} key={h.day}>
                <span>{h.day}</span>
                {h.open ? <span>{fmtTime(h.open)} – {fmtTime(h.close)}</span> : <span className="closed-txt">Chiuso</span>}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Final CTA ── */
function FinalCta() {
  return (
    <section className="block finalcta">
      <div className="wrap">
        <Reveal>
          <h2>Fame da ninja?</h2>
          <p>Chiama, ordina e in poco la tua pizza è pronta. Sul posto, d’asporto o a domicilio.</p>
          <div className="finalcta__btns">
            <a className="btn btn--dark" href={`tel:${BUSINESS.phoneHref}`}>{Icon.phone({ width: 20, height: 20 })} {BUSINESS.phone}</a>
            <a className="btn" href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer">{Icon.pin({ width: 20, height: 20 })} Vieni a trovarci</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">
              <Logo />
              <span className="nav__name">Ninja Turtle<small>PIZZA</small></span>
            </div>
            <p style={{ marginTop: 14, maxWidth: '28ch' }}>La pizza esce dall’ombra. Reggio Emilia.</p>
          </div>
          <div className="footer__cols">
            <div className="footer__col">
              <h4>Menu</h4>
              <a href="#menu">Le pizze</a>
              <a href="#servizi">Servizi</a>
              <a href="#recensioni">Recensioni</a>
            </div>
            <div className="footer__col">
              <h4>Contatti</h4>
              <a href={`tel:${BUSINESS.phoneHref}`}>{BUSINESS.phone}</a>
              <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer">{BUSINESS.address}</a>
              <p>{BUSINESS.city}</p>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Ninja Turtle Pizza · P.IVA —</span>
          <span>Sito realizzato con cura 🐢</span>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Menu />
      <Services />
      <Reviews />
      <Location />
      <FinalCta />
      <Footer />
    </>
  )
}
