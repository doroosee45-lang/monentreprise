// src/pages/Home.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Star, Target, Handshake, Rocket, ChevronRight,
  Server, Shield, Code, Cloud, Zap, GraduationCap, Quote,
  Users, Clock, Award, Briefcase, Globe, Cpu, Camera, Wifi, Wrench,
  Phone, ThermometerSun, Monitor, TrendingDown, FileText, Lock, AlertTriangle,
  TrendingUp
} from 'lucide-react';


// ⬇️ IMPORTS DES IMAGES LOCALES POUR LA GALERIE
import galleryImg1 from '/src/assets/images/experts/Log1.jpeg';
import galleryImg2 from '/src/assets/images/experts/os5.jpeg';
import galleryImg3 from '/src/assets/images/experts/fido.jpeg';
import galleryImg4 from '/src/assets/images/experts/am.jpeg';
import galleryImg5 from '/src/assets/images/experts/Lo2.jpeg';
import galleryImg6 from '/src/assets/images/experts/glo.jpeg';

// ========== TABLEAU DES IMAGES (5 premières) ==========
const galleryImages = [galleryImg1, galleryImg2, galleryImg3, galleryImg4, galleryImg5];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

// ========== DONNÉES (inchangées) ==========
const services = [
  { icon: Server, title: 'Réseau & Infrastructure', description: 'Câblage structuré, WiFi entreprise, fibre optique haute performance', color: '#3b82f6' },
  { icon: Shield, title: 'Cybersécurité & Surveillance', description: 'Firewalls, audits, vidéosurveillance intelligente 24/7', color: '#06b6d4' },
  { icon: Code, title: 'Développement Digital', description: 'Applications web, mobiles, ERP sur mesure', color: '#f59e0b' },
  { icon: Cloud, title: 'Cloud & Télécommunications', description: 'Hébergement cloud, VoIP, solutions télécom intégrées', color: '#3b82f6' },
  { icon: Zap, title: 'Énergie & Maintenance', description: 'Panneaux solaires, maintenance préventive et corrective', color: '#f97316' },
  { icon: GraduationCap, title: 'Formation & Accompagnement', description: 'Formations certifiantes et transfert de compétences', color: '#06b6d4' }
];

const expertise = [
  { icon: Code, title: 'Développement Logiciel', desc: 'Apps web & mobiles sur mesure, API, IA intégrée', color: '#3b82f6' },
  { icon: Phone, title: 'Télécommunications', desc: 'Réseaux VoIP, fibre, communication unifiée', color: '#06b6d4' },
  { icon: Camera, title: 'Vidéosurveillance', desc: 'Caméras IP, IA de reconnaissance, monitoring 24/7', color: '#f59e0b' },
  { icon: Wrench, title: 'Maintenance & Support', desc: 'Maintenance préventive, corrective, assistance dédiée', color: '#3b82f6' }
];

const products = [
  { icon: ThermometerSun, title: 'Climatisation Pro', description: 'Systèmes de refroidissement haute performance pour entreprises', color: '#3b82f6' },
  { icon: Monitor, title: 'Matériel IT', description: 'PC, serveurs, écrans et accessoires professionnels', color: '#06b6d4' },
  { icon: Camera, title: 'Surveillance', description: 'Caméras IP 4K, PTZ, IA intégrée', color: '#f59e0b' }
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
  { icon: TrendingUp, title: 'Innovation constante', description: 'Veille technologique et solutions toujours à jour', color: '#3b82f6' }
];

const testimonials = [
  { name: 'Jean M.', position: 'CEO, TechCorp', content: 'OMDEVE a transformé notre infrastructure IT. Service impeccable et équipe très professionnelle.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Sarah K.', position: 'Directrice, Energy Solutions', content: "L'installation des panneaux solaires a été réalisée avec excellence. Économies d'énergie significatives.", rating: 5, avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Marc L.', position: 'CTO, Digital Africa', content: 'La plateforme e-commerce développée est performante et élégante. Hautement recommandé.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/45.jpg' }
];

const steps = [
  { number: '01', title: 'Audit & Conseil', desc: 'Analyse approfondie de vos besoins et diagnostic gratuit' },
  { number: '02', title: 'Proposition sur mesure', desc: 'Devis détaillé et planning transparent' },
  { number: '03', title: 'Déploiement', desc: 'Installation, configuration et tests qualité' },
  { number: '04', title: 'Support & Évolution', desc: 'Maintenance et améliorations continues' }
];

const challenges = [
  { icon: TrendingDown, title: 'Perte financière', desc: 'Des processus inefficaces coûtent en moyenne 20% du CA chaque année.', color: '#ef4444' },
  { icon: FileText, title: 'Gestion manuelle', desc: 'Fichiers Excel, papier, erreurs humaines… votre temps vaut plus que ça.', color: '#f59e0b' },
  { icon: Lock, title: 'Failles de sécurité', desc: 'Sans cybersécurité, vos données et celles de vos clients sont vulnérables.', color: '#3b82f6' },
  { icon: AlertTriangle, title: 'Croissance bloquée', desc: "L'absence d'outils digitaux freine votre expansion et votre compétitivité.", color: '#8b5cf6' }
];

// ========== COMPOSANT PRINCIPAL ==========
const HomePage = () => {
  return (
    <>
      <style>{`
        /* ===== RESET & BASE ===== */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        
        /* ===== HERO ===== */
        .home-hero {
          position: relative;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('https://www.shutterstock.com/image-illustration/smart-city-technology-3d-futuristic-260nw-2605212243.jpg');
          background-size: cover;
          background-position: center;
        }
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(10,14,26,0.85), rgba(0,0,0,0.7));
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.8rem, 5vw, 3.5rem);
          font-weight: 800;
          color: white;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .hero-highlight {
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }
        .hero-subtitle {
          color: rgba(255,255,255,0.8);
          font-size: clamp(0.9rem, 3vw, 1.125rem);
          margin-bottom: 2rem;
        }
        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
        }
        
        /* ===== BOUTONS ===== */
        .btn-primary {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
          text-decoration: none;
          font-size: 0.9rem;
        }
        .btn-primary:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        }
        .btn-outline {
          border: 2px solid rgba(255,255,255,0.3);
          background: transparent;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
          text-decoration: none;
          font-size: 0.9rem;
        }
        .btn-outline:hover {
          background: rgba(255,255,255,0.1);
          transform: scale(1.02);
        }
        
        /* ===== SECTIONS ===== */
        .section-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #eef2ff;
          color: #3b82f6;
          padding: 0.25rem 1rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }
        .section-subtitle {
          color: #475569;
          max-width: 600px;
          margin: 0 auto;
          font-size: 0.9rem;
        }
        .divider {
          width: 4rem;
          height: 0.25rem;
          background: #3b82f6;
          border-radius: 9999px;
          margin: 0.5rem auto 1rem;
        }
        
        /* ===== GRILLES RESPONSIVES ===== */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .cards-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .double-cta {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 1024px;
          margin: 3rem auto;
        }
        .gallery-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          align-items: stretch;
          margin: 2rem 0;
        }
        .gallery-thumbs {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        
        /* ===== CARTES ===== */
        .card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.5rem;
          transition: all 0.3s;
          text-align: center;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1);
        }
        .card-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .card-title {
          font-weight: 700;
          font-size: 1.125rem;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }
        .card-text {
          color: #475569;
          font-size: 0.875rem;
          line-height: 1.5;
        }
        
        /* ===== STATISTIQUES ===== */
        .stat-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: center;
        }
        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          margin-bottom: 0.25rem;
        }
        
        /* ===== PACKS ===== */
        .pack-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.5rem;
          transition: all 0.3s;
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .pack-card.popular {
          border: 2px solid #f59e0b;
        }
        .popular-badge {
          position: absolute;
          top: -0.75rem;
          left: 1rem;
          background: #f59e0b;
          color: #0f172a;
          font-size: 0.7rem;
          font-weight: bold;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
        }
        .pack-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1);
        }
        
        /* ===== TÉMOIGNAGES ===== */
        .testimonial-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.25rem;
          height: 100%;
        }
        
        /* ===== GALLERIE ===== */
       /* ===== AMÉLIORATIONS GALERIE ===== */
.gallery-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: stretch;
  margin: 2rem 0;
}

.gallery-thumbs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.gallery-thumb, .gallery-main {
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.gallery-thumb:hover, .gallery-main:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.gallery-thumb {
  aspect-ratio: 4/3;
}

.gallery-main {
  aspect-ratio: 16/9;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-thumb:hover .gallery-img, 
.gallery-main:hover .gallery-img {
  transform: scale(1.05);
}

/* Overlay au survol (optionnel, donne un effet "légère teinte") */
.gallery-thumb::after, .gallery-main::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.2));
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: inherit;
}

.gallery-thumb:hover::after, .gallery-main:hover::after {
  opacity: 1;
}

/* Icône "zoom" subtile au survol */
.gallery-thumb::before, .gallery-main::before {
  content: '🔍';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  font-size: 2rem;
  color: white;
  background: rgba(0,0,0,0.5);
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 2;
  pointer-events: none;
  backdrop-filter: blur(4px);
}

.gallery-thumb:hover::before, .gallery-main:hover::before {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

/* Responsive : sur mobile, les miniatures deviennent plus hautes */
@media (max-width: 768px) {
  .gallery-thumb {
    aspect-ratio: 16/9;
  }
}
        
        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .cards-grid, .cards-grid-4, .stats-grid, .double-cta, .gallery-wrapper {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .cards-grid, .cards-grid-4, .stats-grid, .double-cta, .gallery-wrapper {
            grid-template-columns: 1fr;
          }
          .gallery-thumbs {
            grid-template-columns: repeat(2, 1fr);
          }
          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }
          .btn-primary, .btn-outline {
            width: 100%;
            justify-content: center;
          }
          .hero-title {
            font-size: 1.8rem;
          }
          .section-title {
            font-size: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .gallery-thumbs {
            grid-template-columns: 1fr;
          }
          .gallery-thumb {
            aspect-ratio: 16/9;
          }
        }
      `}</style>

      {/* ===== HERO ===== */}
      <div className="home-hero">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="hero-title"
          >
            Votre partenaire<br />
            <span className="hero-highlight">technologique</span> de confiance
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-subtitle"
          >
            Infrastructure réseau, sécurité, développement digital, cloud, énergie solaire et formation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hero-buttons"
          >
            <Link to="/devis" className="btn-primary">Demander un devis gratuit <ArrowRight size={18} /></Link>
            <Link to="/audit" className="btn-outline">🔍 Audit gratuit</Link>
          </motion.div>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            {['✅ Certifié ISO', '🛡️ Support 24/7', '⚡ Intervention rapide'].map(b => (
              <div key={b} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>{b}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== DÉFIS ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">⚠️ Problèmes courants</div>
          <h2 className="section-title">Ces défis vous parlent ?</h2>
          <div className="divider"></div>
          <p className="section-subtitle">La plupart des PME africaines perdent des opportunités faute d'outils digitaux adaptés.</p>
        </div>
        <div className="cards-grid cards-grid-4">
          {challenges.map((c, idx) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card"
              >
                <div className="card-icon" style={{ backgroundColor: `${c.color}15`, color: c.color }}>
                  <Icon size={24} />
                </div>
                <h3 className="card-title">{c.title}</h3>
                <p className="card-text">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Link to="/services" className="btn-primary">Découvrir nos solutions <ArrowRight size={18} /></Link>
        </div>
      </div>

      {/* ===== DOMAINES D'EXCELLENCE ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Notre savoir-faire</div>
          <h2 className="section-title">Domaines d'excellence</h2>
          <div className="divider"></div>
          <p className="section-subtitle">Nous maîtrisons l'ensemble des technologies essentielles à votre réussite</p>
        </div>
        <div className="cards-grid">
          {expertise.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="card"
              >
                <div className="card-icon" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                  <Icon size={24} />
                </div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-text">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ===== GALERIE ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Notre travail</div>
          <h2 className="section-title">Galerie</h2>
          <div className="divider"></div>
          <p className="section-subtitle">Découvrez quelques-unes de nos réalisations</p>
        </div>
        <div className="gallery-wrapper">
          <div className="gallery-thumbs">
            {galleryImages.slice(1, 5).map((img, idx) => (
              <div key={idx} className="gallery-thumb">
                <img src={img} alt={`galerie-${idx}`} className="gallery-img" />
              </div>
            ))}
          </div>
          <div className="gallery-main">
            <img src={galleryImages[0]} alt="principale" className="gallery-img" />
          </div>
        </div>
      </div>

      {/* ===== SERVICES ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">NOS SERVICES</div>
          <h2 className="section-title">Solutions Intégrées</h2>
          <div className="divider"></div>
          <p className="section-subtitle">De l'infrastructure aux applications, nous couvrons tout le cycle technologique</p>
        </div>
        <div className="cards-grid">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                className="card"
              >
                <div className="card-icon" style={{ backgroundColor: `${service.color}15`, color: service.color }}>
                  <Icon size={24} />
                </div>
                <h3 className="card-title">{service.title}</h3>
                <p className="card-text">{service.description}</p>
                <Link to="/solutions" style={{ color: '#3b82f6', fontSize: '0.875rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '1rem' }}>
                  En savoir plus <ArrowRight size={14} />
                </Link>
              </motion.div>
            );
          })}
        </div>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Link to="/services" className="btn-outline" style={{ borderColor: '#cbd5e1', color: '#1e293b' }}>Voir tous les services</Link>
        </div>
      </div>

      {/* ===== STATISTIQUES ===== */}
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="stat-card"
              >
                <div className="card-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                  <Icon size={24} />
                </div>
                <div className="stat-number" style={{ color: stat.color }}>{stat.value}</div>
                <div style={{ color: '#475569' }}>{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ===== PRODUITS & ÉQUIPEMENTS ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Produits & Équipements</div>
          <h2 className="section-title">Achetez chez nous</h2>
          <div className="divider"></div>
          <p className="section-subtitle">Climatiseurs · Matériel IT · Caméras — directement livrés et installés</p>
        </div>
        <div className="cards-grid">
          {products.map((product, idx) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card"
              >
                <div className="card-icon" style={{ backgroundColor: `${product.color}15`, color: product.color }}>
                  <Icon size={24} />
                </div>
                <h3 className="card-title">{product.title}</h3>
                <p className="card-text">{product.description}</p>
                <Link to="/boutique" style={{ color: '#3b82f6', fontSize: '0.875rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '1rem' }}>
                  Voir les produits <ArrowRight size={14} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ===== PACKS ===== */}
      <div style={{ background: '#f8fafc', padding: '2rem 0' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Offres packagées</div>
            <h2 className="section-title">Solutions Clé en Main</h2>
            <div className="divider"></div>
            <p className="section-subtitle">Choisissez l'offre adaptée à votre entreprise</p>
          </div>
          <div className="cards-grid">
            {packs.map((pack, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`pack-card ${pack.featured ? 'popular' : ''}`}
              >
                {pack.featured && <div className="popular-badge">⭐ POPULAIRE</div>}
                <div className="card-icon" style={{ backgroundColor: `${pack.color}15`, color: pack.color }}>
                  <pack.icon size={24} />
                </div>
                <h3 className="card-title">{pack.name}</h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: pack.color, margin: '0.5rem 0' }}>{pack.price}</div>
                <ul style={{ textAlign: 'left', marginBottom: '1.5rem', paddingLeft: '1rem' }}>
                  {pack.features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#475569', marginBottom: '0.5rem' }}>
                      <CheckCircle size={14} style={{ color: '#10b981' }} /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/devis" className="btn-primary" style={{ display: 'block', textAlign: 'center', background: pack.featured ? 'linear-gradient(135deg, #f59e0b, #d97706)' : '#3b82f6' }}>
                  Demander ce pack {pack.featured && <ArrowRight size={14} className="inline ml-1" />}
                </Link>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/solutions" className="btn-outline" style={{ borderColor: '#cbd5e1', color: '#1e293b' }}>Voir toutes les solutions</Link>
          </div>
        </div>
      </div>

      {/* ===== POURQUOI NOUS CHOISIR (style identique à Comment ça marche) ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Pourquoi OMDEVE</div>
          <h2 className="section-title">Pourquoi nous choisir</h2>
          <div className="divider"></div>
          <p className="section-subtitle">Une expertise locale avec des standards internationaux</p>
        </div>
        <div className="cards-grid-4">
          {whyUs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="card"
              >
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  background: item.color,
                  color: 'white',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '9999px',
                  margin: '0 auto 1rem'
                }}>
                  <Icon size={24} />
                </div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-text">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ===== PROCESSUS (Comment ça marche) ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Notre méthodologie</div>
          <h2 className="section-title">Comment ça marche</h2>
          <div className="divider"></div>
          <p className="section-subtitle">Un processus simple et transparent</p>
        </div>
        <div className="cards-grid">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="card"
            >
              <div style={{
                width: '3rem', height: '3rem', background: '#3b82f6', color: 'white',
                fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '9999px', margin: '0 auto 1rem'
              }}>
                {step.number}
              </div>
              <h3 className="card-title">{step.title}</h3>
              <p className="card-text">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== TÉMOIGNAGES ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Témoignages</div>
          <h2 className="section-title">Ils nous font confiance</h2>
          <div className="divider"></div>
          <p className="section-subtitle">Ce que nos clients pensent de nous</p>
        </div>
        <div className="cards-grid">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="testimonial-card"
              style={{ willChange: 'opacity, transform' }}
            >
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <Quote size={24} style={{ color: '#3b82f6', opacity: 0.5, marginBottom: '0.5rem' }} />
              <p style={{ color: '#475569', fontSize: '0.875rem', fontStyle: 'italic', marginBottom: '1rem' }}>
                "{t.content}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.875rem' }}>{t.name}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{t.position}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* ===== DOUBLE CTA FINALE ===== */}
      <div className="container" style={{ margin: '3rem auto' }}>
        <div className="double-cta">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card"
          >
            <div className="card-icon" style={{ backgroundColor: '#3b82f6' }}>
              <Target size={24} color="white" />
            </div>
            <h3 className="card-title">Audit gratuit</h3>
            <p className="card-text">Bénéficiez d'un diagnostic complet de vos infrastructures sans engagement.</p>
            <Link to="/audit" className="btn-primary" style={{ marginTop: '1rem' }}>Demander un audit <ArrowRight size={16} /></Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card"
          >
            <div className="card-icon" style={{ backgroundColor: '#f59e0b' }}>
              <Handshake size={24} color="white" />
            </div>
            <h3 className="card-title">Devis personnalisé</h3>
            <p className="card-text">Recevez une proposition sur mesure adaptée à vos besoins et votre budget.</p>
            <Link to="/devis" className="btn-primary" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', marginTop: '1rem' }}>Demander un devis <ArrowRight size={16} /></Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HomePage;