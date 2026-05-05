// src/pages/public/HomePage.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Star, Target, Handshake, ChevronRight,
  Server, Shield, Code, Cloud, Zap, GraduationCap, Quote,
  Users, Clock, Award, Briefcase, Globe, Cpu, Camera, Wifi, Wrench,
  Phone, ThermometerSun, Monitor, TrendingDown, FileText, Lock, AlertTriangle,
  TrendingUp, MapPin, Mail, MessageCircle, Play, X
} from 'lucide-react';
import { useState } from 'react';

import galleryImg1 from '/src/assets/images/experts/Log1.jpeg';
import galleryImg2 from '/src/assets/images/experts/os5.jpeg';
import galleryImg3 from '/src/assets/images/experts/fido.jpeg';
import galleryImg4 from '/src/assets/images/experts/am.jpeg';
import galleryImg5 from '/src/assets/images/experts/Lo2.jpeg';
import galleryImg6 from '/src/assets/images/experts/glo.jpeg';

const galleryImages = [galleryImg1, galleryImg2, galleryImg3, galleryImg4, galleryImg5, galleryImg6];

// ========== DONNÉES ==========
const services = [
  { icon: Server, title: 'Réseau & Infrastructure', description: 'Câblage structuré, WiFi entreprise, fibre optique haute performance', color: '#3b82f6', link: '/services/reseau-infrastructure' },
  { icon: Shield, title: 'Cybersécurité & Surveillance', description: 'Firewalls, audits, vidéosurveillance intelligente 24/7', color: '#06b6d4', link: '/services/securite' },
  { icon: Code, title: 'Développement Digital', description: 'Applications web, mobiles, ERP sur mesure', color: '#f59e0b', link: '/services/developpement-digital' },
  { icon: Cloud, title: 'Cloud & Télécommunications', description: 'Hébergement cloud, VoIP, solutions télécom intégrées', color: '#3b82f6', link: '/services/cloud-hebergement' },
  { icon: Zap, title: 'Énergie & Maintenance', description: 'Panneaux solaires, maintenance préventive et corrective', color: '#f97316', link: '/services/energie-equipements' },
  { icon: GraduationCap, title: 'Formation & Accompagnement', description: 'Formations certifiantes et transfert de compétences', color: '#06b6d4', link: '/services/formation' }
];

const stats = [
  { icon: Users, value: '150+', label: 'Clients satisfaits', color: '#3b82f6' },
  { icon: Briefcase, value: '300+', label: 'Projets livrés', color: '#f59e0b' },
  { icon: Clock, value: '8+', label: "Années d'expertise", color: '#06b6d4' },
  { icon: Award, value: '100%', label: 'Qualité garantie', color: '#10b981' }
];

const packs = [
  { name: 'Pack Essentiel', features: ['Réseau de base', 'Sécurité essentielle', 'Support standard', 'Maintenance incluse'], icon: Briefcase, price: 'Sur devis', featured: false, color: '#3b82f6' },
  { name: 'Pack Business', features: ['Réseau complet + Sécurité', 'ERP sur mesure', 'Support prioritaire', 'Maintenance préventive'], icon: Cpu, price: 'Sur devis', featured: true, color: '#f59e0b' },
  { name: 'Pack Enterprise', features: ['Infrastructure complète', 'Solution digitale intégrée', 'Support dédié 24/7', 'Formation équipe'], icon: Globe, price: 'Sur devis', featured: false, color: '#8b5cf6' }
];

const whyUs = [
  { icon: Users, title: 'Expertise locale', description: 'Une équipe basée à Kinshasa qui comprend vos enjeux locaux', color: '#3b82f6' },
  { icon: Clock, title: 'Support 24/7', description: 'Assistance réactive et disponible à tout moment', color: '#06b6d4' },
  { icon: Award, title: 'Qualité certifiée', description: 'Standards internationaux et certifications professionnelles', color: '#f59e0b' },
  { icon: TrendingUp, title: 'Innovation constante', description: 'Veille technologique et solutions toujours à jour', color: '#10b981' }
];

const testimonials = [
  { name: 'Jean M.', position: 'CEO, TechCorp', content: 'OMDEVE a transformé notre infrastructure IT. Service impeccable et équipe très professionnelle.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Sarah K.', position: 'Directrice, Energy Solutions', content: "L'installation des panneaux solaires a été réalisée avec excellence. Économies d'énergie significatives.", rating: 5, avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Marc L.', position: 'CTO, Digital Africa', content: 'La plateforme e-commerce développée est performante et élégante. Hautement recommandé.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/45.jpg' }
];

const steps = [
  { number: '01', title: 'Audit & Conseil', desc: 'Analyse approfondie de vos besoins et diagnostic gratuit', icon: Target },
  { number: '02', title: 'Proposition sur mesure', desc: 'Devis détaillé et planning transparent', icon: FileText },
  { number: '03', title: 'Déploiement', desc: 'Installation, configuration et tests qualité', icon: Zap },
  { number: '04', title: 'Support & Évolution', desc: 'Maintenance et améliorations continues', icon: Award }
];

const challenges = [
  { icon: TrendingDown, title: 'Perte financière', desc: 'Des processus inefficaces coûtent en moyenne 20% du CA chaque année.', color: '#ef4444' },
  { icon: FileText, title: 'Gestion manuelle', desc: 'Fichiers Excel, papier, erreurs humaines… votre temps vaut plus que ça.', color: '#f59e0b' },
  { icon: Lock, title: 'Failles de sécurité', desc: 'Sans cybersécurité, vos données et celles de vos clients sont vulnérables.', color: '#3b82f6' },
  { icon: AlertTriangle, title: 'Croissance bloquée', desc: "L'absence d'outils digitaux freine votre expansion et votre compétitivité.", color: '#8b5cf6' }
];

// Nouvelles données pour les sections ajoutées
const technologies = [
  { name: 'Cisco', category: 'Réseau' },
  { name: 'Fortinet', category: 'Sécurité' },
  { name: 'Microsoft Azure', category: 'Cloud' },
  { name: 'VMware', category: 'Virtualisation' },
  { name: 'Hikvision', category: 'Surveillance' },
  { name: 'React / Node.js', category: 'Développement' },
  { name: 'Ubuntu Server', category: 'Infrastructure' },
  { name: 'Synology NAS', category: 'Stockage' },
];

const faqItems = [
  { q: 'Quels sont vos délais d\'intervention ?', a: 'Nous intervenons sous 4h pour les urgences et 24-48h pour les interventions planifiées dans la région de Kinshasa.' },
  { q: 'Proposez-vous des contrats de maintenance ?', a: 'Oui, nous proposons des contrats mensuels, trimestriels et annuels incluant maintenance préventive, support prioritaire et mises à jour.' },
  { q: 'Travaillez-vous avec les PME et les grandes entreprises ?', a: 'Nous accompagnons tous types d\'entreprises, des TPE aux grandes corporations, avec des solutions adaptées à chaque budget.' },
  { q: 'Offrez-vous une garantie sur vos installations ?', a: 'Toutes nos installations sont garanties 12 mois minimum, avec possibilité d\'extension via nos contrats de maintenance.' },
];

const blogPosts = [
  { title: 'Cybersécurité en 2025 : les 5 menaces à surveiller', date: '15 Jan 2025', category: 'Sécurité', color: '#06b6d4', icon: Shield },
  { title: 'Cloud vs infrastructure locale : que choisir pour votre PME ?', date: '08 Jan 2025', category: 'Cloud', color: '#3b82f6', icon: Cloud },
  { title: 'Énergie solaire : comment réduire votre facture de 60%', date: '02 Jan 2025', category: 'Énergie', color: '#f97316', icon: Zap },
];

// ========== CSS ==========
const css = `
  *{margin:0;padding:0;box-sizing:border-box}

  .hp-container{max-width:1200px;margin:0 auto;padding:0 1.5rem}

  /* HERO */
  .hp-hero{position:relative;min-height:520px;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden}
  .hp-hero-bg{position:absolute;inset:0;background-image:url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80');background-size:cover;background-position:center}
  .hp-hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(5,10,25,0.92),rgba(0,20,60,0.8))}
  .hp-hero-content{position:relative;z-index:2;max-width:820px;padding:3rem 1.5rem}
  .hp-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(59,130,246,0.2);border:1px solid rgba(59,130,246,0.4);color:#93c5fd;padding:6px 16px;border-radius:9999px;font-size:0.75rem;font-weight:600;letter-spacing:.05em;margin-bottom:1.5rem}
  .hp-hero-title{font-family:'Syne',sans-serif;font-size:clamp(2rem,5.5vw,3.8rem);font-weight:800;color:white;margin-bottom:1.25rem;line-height:1.15}
  .hp-hero-highlight{background:linear-gradient(135deg,#60a5fa,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent}
  .hp-hero-sub{color:rgba(255,255,255,0.75);font-size:clamp(0.95rem,2.5vw,1.15rem);margin-bottom:2.5rem;max-width:600px;margin-left:auto;margin-right:auto;line-height:1.7}
  .hp-hero-btns{display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;margin-bottom:2.5rem}
  .hp-hero-trust{display:flex;gap:2rem;justify-content:center;flex-wrap:wrap}
  .hp-trust-item{color:rgba(255,255,255,0.55);font-size:0.78rem;display:flex;align-items:center;gap:6px}
  .hp-trust-dot{width:6px;height:6px;border-radius:50%;background:#22d3ee;flex-shrink:0}

  /* BOUTONS */
  .btn-prim{background:linear-gradient(135deg,#f59e0b,#d97706);color:white;padding:.8rem 1.6rem;border-radius:.75rem;font-weight:700;font-size:.9rem;display:inline-flex;align-items:center;gap:.5rem;transition:.2s;text-decoration:none;border:none;cursor:pointer}
  .btn-prim:hover{transform:translateY(-2px);box-shadow:0 10px 25px rgba(245,158,11,.35)}
  .btn-ghost{border:2px solid rgba(255,255,255,.25);background:rgba(255,255,255,.05);color:white;padding:.8rem 1.6rem;border-radius:.75rem;font-weight:700;font-size:.9rem;display:inline-flex;align-items:center;gap:.5rem;transition:.2s;text-decoration:none;backdrop-filter:blur(4px)}
  .btn-ghost:hover{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.4)}
  .btn-outline{border:2px solid #e2e8f0;background:white;color:#1e293b;padding:.75rem 1.5rem;border-radius:.75rem;font-weight:600;font-size:.875rem;display:inline-flex;align-items:center;gap:.5rem;transition:.2s;text-decoration:none}
  .btn-outline:hover{border-color:#3b82f6;color:#3b82f6}

  /* SECTIONS */
  .hp-section{padding:4rem 0}
  .hp-section-alt{padding:4rem 0;background:#f8fafc}
  .hp-section-dark{padding:4rem 0;background:linear-gradient(135deg,#0f172a,#1e293b)}
  .hp-section-header{text-align:center;margin-bottom:3rem}
  .hp-section-badge{display:inline-flex;align-items:center;gap:6px;background:#eff6ff;color:#3b82f6;padding:5px 14px;border-radius:9999px;font-size:.75rem;font-weight:700;letter-spacing:.05em;margin-bottom:.75rem;border:1px solid #bfdbfe}
  .hp-section-title{font-family:'Syne',sans-serif;font-size:clamp(1.5rem,3.5vw,2.2rem);font-weight:800;color:#0f172a;margin-bottom:.5rem}
  .hp-divider{width:3rem;height:3px;background:linear-gradient(90deg,#3b82f6,#06b6d4);border-radius:9999px;margin:.75rem auto 1rem}
  .hp-section-sub{color:#64748b;max-width:580px;margin:0 auto;font-size:.95rem;line-height:1.7}

  /* GRILLES */
  .hp-grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem}
  .hp-grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
  .hp-grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem}

  /* CARTES */
  .hp-card{background:white;border:1px solid #e2e8f0;border-radius:1.25rem;padding:1.75rem 1.5rem;transition:all .3s;height:100%;display:flex;flex-direction:column;align-items:center;text-align:center}
  .hp-card:hover{transform:translateY(-6px);box-shadow:0 24px 48px -12px rgba(0,0,0,.12);border-color:#bfdbfe}
  .hp-card-icon{width:3.25rem;height:3.25rem;border-radius:1rem;display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem;flex-shrink:0}
  .hp-card-title{font-weight:700;font-size:1.05rem;color:#0f172a;margin-bottom:.5rem}
  .hp-card-text{color:#64748b;font-size:.875rem;line-height:1.6;flex:1}

  /* STATS */
  .hp-stats-bar{background:linear-gradient(135deg,#1e3a5f,#0f2744);padding:3rem 0;margin:0}
  .hp-stat-item{text-align:center;padding:1rem}
  .hp-stat-num{font-size:2.5rem;font-weight:800;font-family:'Syne',sans-serif;color:white;margin-bottom:.25rem}
  .hp-stat-label{color:rgba(255,255,255,.6);font-size:.85rem}

  /* GALERIE */
  .hp-gallery{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:2rem}
  .hp-gallery-left{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
  .hp-gallery-img{border-radius:1rem;overflow:hidden;position:relative;cursor:pointer}
  .hp-gallery-img img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
  .hp-gallery-img:hover img{transform:scale(1.06)}
  .hp-gallery-img::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(59,130,246,.25),rgba(6,182,212,.25));opacity:0;transition:.3s;border-radius:inherit}
  .hp-gallery-img:hover::after{opacity:1}
  .hp-gallery-sm{aspect-ratio:4/3}
  .hp-gallery-main{aspect-ratio:3/4}

  /* PACKS */
  .hp-pack{background:white;border:1.5px solid #e2e8f0;border-radius:1.25rem;padding:2rem 1.5rem;position:relative;transition:all .3s;display:flex;flex-direction:column;height:100%}
  .hp-pack:hover{transform:translateY(-6px);box-shadow:0 24px 48px -12px rgba(0,0,0,.12)}
  .hp-pack.popular{border-color:#f59e0b;box-shadow:0 0 0 4px rgba(245,158,11,.1)}
  .hp-pop-badge{position:absolute;top:-1rem;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#f59e0b,#d97706);color:white;font-size:.7rem;font-weight:700;padding:4px 16px;border-radius:9999px;white-space:nowrap}
  .hp-pack-features{list-style:none;margin:1.25rem 0;flex:1}
  .hp-pack-features li{display:flex;align-items:center;gap:.5rem;font-size:.875rem;color:#475569;padding:.35rem 0}

  /* TÉMOIGNAGES */
  .hp-testi{background:white;border:1px solid #e2e8f0;border-radius:1.25rem;padding:1.5rem;height:100%}

  /* PROCESSUS */
  .hp-step{background:white;border:1px solid #e2e8f0;border-radius:1.25rem;padding:1.75rem 1.5rem;text-align:center;position:relative;height:100%}
  .hp-step-connector{display:none}
  .hp-step-num{width:3rem;height:3rem;background:linear-gradient(135deg,#3b82f6,#06b6d4);color:white;font-weight:800;font-family:'Syne',sans-serif;display:flex;align-items:center;justify-content:center;border-radius:50%;margin:0 auto 1rem;font-size:1.1rem}

  /* TECH STACK */
  .hp-tech-grid{display:flex;flex-wrap:wrap;gap:.75rem;justify-content:center;margin-top:2rem}
  .hp-tech-pill{background:white;border:1px solid #e2e8f0;border-radius:.75rem;padding:.6rem 1.2rem;display:flex;flex-direction:column;align-items:center;gap:.15rem;transition:.2s}
  .hp-tech-pill:hover{border-color:#3b82f6;transform:translateY(-2px)}
  .hp-tech-name{font-size:.875rem;font-weight:600;color:#1e293b}
  .hp-tech-cat{font-size:.7rem;color:#94a3b8}

  /* FAQ */
  .hp-faq-item{border:1px solid #e2e8f0;border-radius:1rem;overflow:hidden;margin-bottom:.75rem;background:white}
  .hp-faq-q{padding:1.25rem 1.5rem;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-weight:600;color:#1e293b;font-size:.95rem;user-select:none}
  .hp-faq-q:hover{background:#f8fafc}
  .hp-faq-a{padding:0 1.5rem 1.25rem;color:#64748b;font-size:.875rem;line-height:1.7}

  /* BLOG */
  .hp-blog-card{background:white;border:1px solid #e2e8f0;border-radius:1.25rem;padding:1.5rem;height:100%;transition:.3s;display:flex;flex-direction:column}
  .hp-blog-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px -12px rgba(0,0,0,.1)}
  .hp-blog-cat{font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:3px 10px;border-radius:9999px;margin-bottom:.75rem;display:inline-block}

  /* CTA FINALE */
  .hp-cta-final{background:linear-gradient(135deg,#1e3a5f,#0f172a);border-radius:1.5rem;padding:3rem 2rem;text-align:center;margin:2rem 0}

  /* LIGHTBOX */
  .hp-lightbox{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.9);display:flex;align-items:center;justify-content:center;padding:2rem}
  .hp-lightbox img{max-width:90vw;max-height:85vh;object-fit:contain;border-radius:.5rem}
  .hp-lightbox-close{position:fixed;top:1.5rem;right:1.5rem;background:rgba(255,255,255,.1);border:none;color:white;cursor:pointer;width:2.5rem;height:2.5rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.25rem}

  /* RESPONSIVE MOBILE */
  @media(max-width:1024px){
    .hp-grid-4{grid-template-columns:repeat(2,1fr)}
  }
  @media(max-width:768px){
    .hp-container{padding:0 1rem}
    .hp-section{padding:2.5rem 0}
    .hp-section-alt{padding:2.5rem 0}
    .hp-section-dark{padding:2.5rem 0}
    .hp-grid-2,.hp-grid-3,.hp-grid-4{grid-template-columns:1fr}
    .hp-gallery{grid-template-columns:1fr}
    .hp-gallery-left{grid-template-columns:repeat(2,1fr)}
    .hp-gallery-main{aspect-ratio:16/9}
    .hp-hero-btns{flex-direction:column;align-items:stretch}
    .btn-prim,.btn-ghost{justify-content:center}
    .hp-hero{min-height:auto;padding-top:1rem}
    .hp-hero-content{padding:3.5rem 1rem 2rem}
    .hp-stat-num{font-size:2rem}
    .hp-pack{margin-bottom:.5rem}
    .hp-tech-pill{padding:.5rem 1rem}
    .hp-cta-final{padding:2rem 1.25rem}
    .hp-stats-bar{padding:2rem 0}
  }
  @media(max-width:480px){
    .hp-gallery-left{grid-template-columns:1fr}
    .hp-hero-trust{gap:.75rem}
    .hp-trust-item{font-size:.72rem}
  }
`;

// ========== COMPOSANT ==========
const HomePage = () => {
  const [lightbox, setLightbox] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <style>{css}</style>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="hp-lightbox" onClick={() => setLightbox(null)}>
          <button className="hp-lightbox-close" onClick={() => setLightbox(null)}>
            <X size={18} />
          </button>
          <img src={galleryImages[lightbox]} alt="Galerie" onClick={e => e.stopPropagation()} />
        </div>
      )}

      {/* ===== HERO ===== */}
      <div className="hp-hero">
        <div className="hp-hero-bg" />
        <div className="hp-hero-overlay" />
        <div className="hp-hero-content">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="hp-badge">
              <span className="hp-trust-dot" />
              Expert IT & Digital en RDC depuis 2016
            </div>
          </motion.div>
          <motion.h1 className="hp-hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            Votre partenaire<br />
            <span className="hp-hero-highlight">technologique</span> de confiance
          </motion.h1>
          <motion.p className="hp-hero-sub" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            Infrastructure réseau, cybersécurité, développement digital, cloud, énergie solaire et formation certifiante — tout en un seul partenaire.
          </motion.p>
          <motion.div className="hp-hero-btns" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
            <Link to="/devis" className="btn-prim">Devis gratuit <ArrowRight size={18} /></Link>
            <Link to="/audit" className="btn-ghost">🔍 Audit offert</Link>
          </motion.div>
          <motion.div className="hp-hero-trust" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
            {['✅ Certifié ISO', '🛡️ Support 24/7', '⚡ Intervention < 4h', '🏆 300+ projets livrés'].map(b => (
              <div key={b} className="hp-trust-item"><span className="hp-trust-dot" />{b}</div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ===== STATS BAR ===== */}
      <div className="hp-stats-bar">
        <div className="hp-container">
          <div className="hp-grid-4">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={i} className="hp-stat-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="hp-stat-num" style={{ color: s.color }}>{s.value}</div>
                  <div className="hp-stat-label">{s.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== DÉFIS ===== */}
      <div className="hp-section">
        <div className="hp-container">
          <div className="hp-section-header">
            <div className="hp-section-badge">⚠️ Problèmes courants</div>
            <h2 className="hp-section-title">Ces défis vous parlent ?</h2>
            <div className="hp-divider" />
            <p className="hp-section-sub">La plupart des PME africaines perdent des opportunités faute d'outils digitaux adaptés.</p>
          </div>
          <div className="hp-grid-4">
            {challenges.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div key={i} className="hp-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="hp-card-icon" style={{ background: `${c.color}15`, color: c.color }}><Icon size={22} /></div>
                  <h3 className="hp-card-title">{c.title}</h3>
                  <p className="hp-card-text">{c.desc}</p>
                </motion.div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/services" className="btn-prim">Découvrir nos solutions <ArrowRight size={18} /></Link>
          </div>
        </div>
      </div>

      {/* ===== GALERIE ===== */}
      <div className="hp-section-alt">
        <div className="hp-container">
          <div className="hp-section-header">
            <div className="hp-section-badge">📸 Notre travail</div>
            <h2 className="hp-section-title">Nos réalisations en images</h2>
            <div className="hp-divider" />
            <p className="hp-section-sub">Cliquez sur une image pour l'agrandir</p>
          </div>
          <div className="hp-gallery">
            <div className="hp-gallery-left">
              {galleryImages.slice(1, 5).map((img, i) => (
                <motion.div key={i} className="hp-gallery-img hp-gallery-sm" onClick={() => setLightbox(i + 1)}
                  initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <img src={img} alt={`réalisation-${i + 1}`} />
                </motion.div>
              ))}
            </div>
            <motion.div className="hp-gallery-img hp-gallery-main" onClick={() => setLightbox(0)}
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <img src={galleryImages[0]} alt="réalisation principale" />
            </motion.div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/realisations" className="btn-outline">Voir toutes les réalisations <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>

      {/* ===== SERVICES ===== */}
      <div className="hp-section">
        <div className="hp-container">
          <div className="hp-section-header">
            <div className="hp-section-badge">NOS SERVICES</div>
            <h2 className="hp-section-title">Solutions Intégrées</h2>
            <div className="hp-divider" />
            <p className="hp-section-sub">De l'infrastructure aux applications, nous couvrons tout le cycle technologique</p>
          </div>
          <div className="hp-grid-3">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={i} className="hp-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <div className="hp-card-icon" style={{ background: `${s.color}15`, color: s.color }}><Icon size={22} /></div>
                  <h3 className="hp-card-title">{s.title}</h3>
                  <p className="hp-card-text">{s.description}</p>
                  <Link to={s.link} style={{ color: '#3b82f6', fontSize: '.875rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '1rem', textDecoration: 'none' }}>
                    En savoir plus <ArrowRight size={14} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/services" className="btn-outline">Voir tous les services <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>

      {/* ===== PACKS ===== */}
      <div className="hp-section-alt">
        <div className="hp-container">
          <div className="hp-section-header">
            <div className="hp-section-badge">Offres packagées</div>
            <h2 className="hp-section-title">Solutions Clé en Main</h2>
            <div className="hp-divider" />
            <p className="hp-section-sub">Choisissez l'offre adaptée à votre entreprise</p>
          </div>
          <div className="hp-grid-3">
            {packs.map((pack, i) => (
              <motion.div key={i} className={`hp-pack${pack.featured ? ' popular' : ''}`}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                {pack.featured && <div className="hp-pop-badge">⭐ PLUS POPULAIRE</div>}
                <div className="hp-card-icon" style={{ background: `${pack.color}15`, color: pack.color, borderRadius: '1rem', width: '3.25rem', height: '3.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <pack.icon size={22} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.15rem', color: '#0f172a', marginBottom: '.25rem' }}>{pack.name}</h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: pack.color, margin: '.5rem 0 .25rem', fontFamily: 'Syne,sans-serif' }}>{pack.price}</div>
                <ul className="hp-pack-features">
                  {pack.features.map((f, j) => (
                    <li key={j}><CheckCircle size={14} style={{ color: '#10b981', flexShrink: 0 }} /> {f}</li>
                  ))}
                </ul>
                <Link to="/devis" className="btn-prim" style={{ justifyContent: 'center', background: pack.featured ? 'linear-gradient(135deg,#f59e0b,#d97706)' : `linear-gradient(135deg,${pack.color},${pack.color}cc)` }}>
                  Demander ce pack <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== PROCESSUS ===== */}
      <div className="hp-section">
        <div className="hp-container">
          <div className="hp-section-header">
            <div className="hp-section-badge">Notre méthodologie</div>
            <h2 className="hp-section-title">Comment ça marche</h2>
            <div className="hp-divider" />
            <p className="hp-section-sub">Un processus simple, transparent et orienté résultats</p>
          </div>
          <div className="hp-grid-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={i} className="hp-step" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="hp-step-num">{step.number}</div>
                  <div style={{ marginBottom: '.75rem' }}><Icon size={20} color="#3b82f6" /></div>
                  <h3 className="hp-card-title">{step.title}</h3>
                  <p className="hp-card-text">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== POURQUOI NOUS ===== */}
      <div className="hp-section-alt">
        <div className="hp-container">
          <div className="hp-section-header">
            <div className="hp-section-badge">Pourquoi OMDEVE</div>
            <h2 className="hp-section-title">Pourquoi nous choisir</h2>
            <div className="hp-divider" />
            <p className="hp-section-sub">Une expertise locale avec des standards internationaux</p>
          </div>
          <div className="hp-grid-4">
            {whyUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} className="hp-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <div className="hp-card-icon" style={{ background: item.color, color: 'white' }}><Icon size={22} /></div>
                  <h3 className="hp-card-title">{item.title}</h3>
                  <p className="hp-card-text">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== TECHNOLOGIES ===== */}
      <div className="hp-section">
        <div className="hp-container">
          <div className="hp-section-header">
            <div className="hp-section-badge">🛠️ Notre stack</div>
            <h2 className="hp-section-title">Technologies & Partenaires</h2>
            <div className="hp-divider" />
            <p className="hp-section-sub">Nous travaillons avec les meilleurs outils et marques du marché</p>
          </div>
          <div className="hp-tech-grid">
            {technologies.map((tech, i) => (
              <motion.div key={i} className="hp-tech-pill" initial={{ opacity: 0, scale: .9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <span className="hp-tech-name">{tech.name}</span>
                <span className="hp-tech-cat">{tech.category}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== TÉMOIGNAGES ===== */}
      <div className="hp-section-alt">
        <div className="hp-container">
          <div className="hp-section-header">
            <div className="hp-section-badge">⭐ Témoignages</div>
            <h2 className="hp-section-title">Ils nous font confiance</h2>
            <div className="hp-divider" />
            <p className="hp-section-sub">Ce que nos clients disent de nous</p>
          </div>
          <div className="hp-grid-3">
            {testimonials.map((t, i) => (
              <motion.div key={i} className="hp-testi" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '.75rem' }}>
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <Quote size={20} style={{ color: '#3b82f6', opacity: .4, marginBottom: '.5rem' }} />
                <p style={{ color: '#475569', fontSize: '.875rem', fontStyle: 'italic', marginBottom: '1.25rem', lineHeight: 1.6 }}>"{t.content}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', paddingTop: '.75rem', borderTop: '1px solid #f1f5f9' }}>
                  <img src={t.avatar} alt={t.name} style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '.875rem' }}>{t.name}</div>
                    <div style={{ fontSize: '.7rem', color: '#94a3b8' }}>{t.position}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== BLOG / ACTUALITÉS ===== */}
      <div className="hp-section">
        <div className="hp-container">
          <div className="hp-section-header">
            <div className="hp-section-badge">📰 Actualités</div>
            <h2 className="hp-section-title">Nos derniers articles</h2>
            <div className="hp-divider" />
            <p className="hp-section-sub">Restez informé des dernières tendances technologiques</p>
          </div>
          <div className="hp-grid-3">
            {blogPosts.map((post, i) => {
              const Icon = post.icon;
              return (
                <motion.div key={i} className="hp-blog-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div style={{ background: `${post.color}15`, borderRadius: '.75rem', padding: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={32} color={post.color} />
                  </div>
                  <div className="hp-blog-cat" style={{ background: `${post.color}15`, color: post.color }}>{post.category}</div>
                  <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: '.95rem', lineHeight: 1.5, marginBottom: '.75rem', flex: 1 }}>{post.title}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '.75rem', borderTop: '1px solid #f1f5f9' }}>
                    <span style={{ fontSize: '.75rem', color: '#94a3b8' }}>{post.date}</span>
                    <Link to="/blog" style={{ color: '#3b82f6', fontSize: '.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                      Lire <ArrowRight size={12} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/blog" className="btn-outline">Voir tous les articles <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>

      {/* ===== FAQ ===== */}
      <div className="hp-section-alt">
        <div className="hp-container" style={{ maxWidth: '780px' }}>
          <div className="hp-section-header">
            <div className="hp-section-badge">❓ FAQ</div>
            <h2 className="hp-section-title">Questions fréquentes</h2>
            <div className="hp-divider" />
            <p className="hp-section-sub">Tout ce que vous devez savoir avant de nous contacter</p>
          </div>
          {faqItems.map((item, i) => (
            <motion.div key={i} className="hp-faq-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="hp-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {item.q}
                <span style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: '.2s', flexShrink: 0, marginLeft: '1rem' }}>
                  <ChevronRight size={18} style={{ transform: 'rotate(90deg)' }} />
                </span>
              </div>
              {openFaq === i && <div className="hp-faq-a">{item.a}</div>}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== CTA FINALE ===== */}
      <div className="hp-section">
        <div className="hp-container">
          <motion.div className="hp-cta-final" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🚀</div>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, color: 'white', marginBottom: '.75rem' }}>
              Prêt à transformer votre entreprise ?
            </h2>
            <p style={{ color: 'rgba(255,255,255,.65)', marginBottom: '2rem', fontSize: '.95rem', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              Rejoignez plus de 150 entreprises qui nous font confiance. Audit gratuit, sans engagement.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/devis" className="btn-prim">Demander un devis <ArrowRight size={18} /></Link>
              <Link to="/audit" className="btn-ghost">🔍 Audit gratuit</Link>
            </div>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { icon: Phone, text: '+243 XXX XXX XXX' },
                { icon: Mail, text: 'contact@omdeve.com' },
                { icon: MapPin, text: 'Kinshasa, RDC' },
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,.55)', fontSize: '.85rem' }}>
                    <Icon size={14} style={{ color: '#60a5fa' }} /> {c.text}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HomePage;