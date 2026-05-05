// src/pages/Securite.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield, Lock, Eye, Video, AlertTriangle, CheckCircle, ArrowRight,
  Server, Wifi, TrendingUp, HardDrive, Zap, Network, Users,
  GraduationCap, Smartphone, Radio, Database, Cloud, BarChart, Activity,
  Headphones, Phone, MessageCircle, Rocket, FileText
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

// ========== DONNÉES ==========
const securityServices = [
  { icon: Video, title: 'Vidéosurveillance (CCTV/IP)', desc: 'Installation de caméras haute définition, accès à distance et détection d’intrusion.', color: '#3b82f6', price: 'Sur devis' },
  { icon: Shield, title: 'Audit de cybersécurité', desc: 'Tests d’intrusion, analyse de vulnérabilités et conformité RGPD.', color: '#06b6d4', price: 'Sur devis' },
  { icon: Lock, title: 'Firewalls & Protection réseau', desc: 'Mise en place de pare-feu nouvelle génération, filtrage et VPN.', color: '#8b5cf6', price: 'Sur devis' },
  { icon: GraduationCap, title: 'Formation cybersécurité', desc: 'Sensibilisation des équipes, bonnes pratiques et gestion des incidents.', color: '#f59e0b', price: 'Sur devis' }
];

const telecomServices = [
  { icon: Radio, title: 'Sécurité des réseaux 4G/5G', desc: 'Protection des liaisons mobiles et des infrastructures critiques.', color: '#3b82f6' },
  { icon: Wifi, title: 'Wi-Fi sécurisé', desc: 'Authentification avancée, segmentation et chiffrement des flux.', color: '#06b6d4' },
  { icon: Network, title: 'Voix sur IP (VoIP) sécurisée', desc: 'Chiffrement des appels, anti-fraude et conformité.', color: '#8b5cf6' },
  { icon: Smartphone, title: 'Sécurité des terminaux mobiles', desc: 'MDM, conteneurisation et protection des données.', color: '#f59e0b' }
];

const itSecurityServices = [
  { icon: Database, title: 'Protection des données', desc: 'Chiffrement, DLP, sauvegardes sécurisées.', color: '#3b82f6' },
  { icon: Cloud, title: 'Sécurité cloud', desc: 'CASB, IAM, conformité cloud.', color: '#06b6d4' },
  { icon: Server, title: 'Sécurité des serveurs', desc: 'Antivirus, HIDS, patch management.', color: '#8b5cf6' },
  { icon: Activity, title: 'Monitoring SIEM', desc: 'Supervision centralisée des logs et alertes.', color: '#f59e0b' }
];

const stats = [
  { value: '98%', label: 'Réduction des incidents après audit', icon: Shield, color: '#3b82f6' },
  { value: '24/7', label: 'Monitoring et réponse', icon: Activity, color: '#06b6d4' },
  { value: '50+', label: 'Clients protégés', icon: Users, color: '#8b5cf6' },
  { value: '100%', label: 'Conformité RGPD assurée', icon: CheckCircle, color: '#10b981' }
];

const testimonials = [
  {
    name: 'Marc D.',
    role: 'Directeur IT, Groupe Bancaire',
    quote: 'OMDEVE a sécurisé l’ensemble de notre réseau et de nos télécoms. Leur expertise en cybersécurité est remarquable.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  },
  {
    name: 'Sophie L.',
    role: 'Responsable Sécurité, Opérateur Télécom',
    quote: 'La formation cybersécurité a sensibilisé nos équipes et réduit les risques de phishing de 80%.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  }
];

const galleryImages = [
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop'
];

const benefits = [
  'Experts certifiés (CISSP, CEH, ISO 27001)',
  'Solutions sur mesure pour PME et grands comptes',
  'Monitoring 24/7 et réponse aux incidents',
  'Rapports d’audit détaillés avec plan d’action',
  'Conformité RGPD, ISO 27001, HDS'
];

const integratedSolutions = [
  { icon: Lock, name: 'Zero Trust' },
  { icon: Network, name: 'SASE' },
  { icon: Cloud, name: 'Cloud Security' },
  { icon: Shield, name: 'SOC interne' }
];

const Securite = () => {
  return (
    <>
      <style>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .hero {
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
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          color: white;
          margin-bottom: 1rem;
        }
        .hero-highlight {
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }
        .hero-subtitle {
          color: rgba(255,255,255,0.8);
          font-size: 1.125rem;
          margin-bottom: 2rem;
        }
        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
        }
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
        }
        .btn-outline:hover {
          background: rgba(255,255,255,0.1);
          transform: scale(1.02);
        }
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
          font-size: 2rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }
        .section-subtitle {
          color: #475569;
          max-width: 600px;
          margin: 0 auto;
        }
        .divider {
          width: 4rem;
          height: 0.25rem;
          background: #3b82f6;
          border-radius: 9999px;
          margin: 0.5rem auto 1rem;
        }
        /* Grilles */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .cards-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .cards-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .solutions-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        /* Cartes */
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
        .testimonial-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.25rem;
          height: 100%;
        }
        .service-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.5rem;
          transition: all 0.3s;
          height: 100%;
          text-align: center;
        }
        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1);
        }
        .equipment-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          transition: all 0.2s;
        }
        .equipment-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }
        .gallery-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 1rem;
          transition: transform 0.3s;
        }
        .gallery-img:hover {
          transform: scale(1.02);
        }
        .solution-item {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 0.75rem;
          text-align: center;
          transition: all 0.2s;
        }
        .solution-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }
        .double-cta {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 1024px;
          margin: 0 auto;
        }
        @media (max-width: 1024px) {
          .cards-grid, .stats-grid, .gallery-grid, .solutions-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .double-cta {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 768px) {
          .cards-grid, .cards-grid-2, .cards-grid-3, .stats-grid, .gallery-grid, .solutions-grid, .double-cta {
            grid-template-columns: 1fr;
          }
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }
          .btn-primary, .btn-outline {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      {/* ===== HERO 400px ===== */}
      <div className="hero">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="hero-title"
          >
            Sécurisez votre{' '}
            <span className="hero-highlight">infrastructure</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-subtitle"
          >
            Cybersécurité, protection des réseaux, sécurité télécom et conformité.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hero-buttons"
          >
            <Link to="/audit-gratuit" className="btn-primary">Audit gratuit <ArrowRight size={18} /></Link>
            <Link to="/contact" className="btn-outline">Contacter un expert <CheckCircle size={18} /></Link>
          </motion.div>
        </div>
      </div>

      {/* ===== SERVICES CYBERSÉCURITÉ ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">🛡️ Cybersécurité</div>
          <h2 className="section-title">Cybersécurité & Protection des actifs</h2>
          <div className="divider"></div>
        </div>
        <div className="cards-grid">
          {securityServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="service-card"
              >
                <div className="card-icon" style={{ backgroundColor: `${service.color}15`, color: service.color }}>
                  <Icon size={24} />
                </div>
                <h3 className="card-title">{service.title}</h3>
                <p className="card-text">{service.desc}</p>
                <div style={{ marginTop: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: service.color }}>{service.price}</span>
                </div>
                <Link to="/devis" style={{ color: service.color, fontSize: '0.875rem', fontWeight: 500, marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  Demander un devis <ArrowRight size={14} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ===== SÉCURITÉ TÉLÉCOM ===== */}
      <div className="container">
        <div className="cards-grid-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
            style={{ textAlign: 'left', alignItems: 'flex-start' }}
          >
            <div className="section-badge" style={{ marginBottom: '1rem' }}>📡 Télécom</div>
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Sécurité Télécommunications</h2>
            <p className="card-text" style={{ marginBottom: '1rem' }}>
              Protégez vos infrastructures voix, données et mobiles contre les cybermenaces et les fraudes.
            </p>
            <div style={{ width: '100%' }}>
              {telecomServices.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="equipment-item" style={{ marginBottom: '0.75rem' }}>
                    <div className="card-icon" style={{ backgroundColor: `${item.color}15`, color: item.color, width: '2rem', height: '2rem' }}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a' }}>{item.title}</div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
            style={{ overflow: 'hidden', padding: 0 }}
          >
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"
              alt="Sécurité télécom"
              style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '250px' }}
            />
          </motion.div>
        </div>
      </div>

      {/* ===== SÉCURITÉ INFORMATIQUE ===== */}
      <div className="container">
        <div className="cards-grid-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
            style={{ overflow: 'hidden', padding: 0 }}
          >
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop"
              alt="Sécurité informatique"
              style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '250px' }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
            style={{ textAlign: 'left', alignItems: 'flex-start' }}
          >
            <div className="section-badge" style={{ marginBottom: '1rem' }}>💻 Informatique</div>
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Sécurité Informatique & Données</h2>
            <div style={{ width: '100%' }}>
              {itSecurityServices.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="equipment-item" style={{ marginBottom: '0.75rem' }}>
                    <div className="card-icon" style={{ backgroundColor: `${item.color}15`, color: item.color, width: '2rem', height: '2rem' }}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a' }}>{item.title}</div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
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
                <div className="card-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color, margin: '0 auto 1rem' }}>
                  <Icon size={24} />
                </div>
                <div className="stat-number" style={{ color: stat.color }}>{stat.value}</div>
                <div className="card-text">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ===== GALERIE ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">📷 Infrastructures</div>
          <h2 className="section-title">Nos infrastructures & équipements</h2>
          <div className="divider"></div>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              style={{ borderRadius: '1rem', overflow: 'hidden' }}
            >
              <img src={img} alt="Équipement sécurité" className="gallery-img" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== SOLUTIONS INTÉGRÉES ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">🔗 Solutions intégrées</div>
          <h2 className="section-title">Solutions intégrées : Sécurité + Télécom + IT</h2>
          <div className="divider"></div>
          <p className="section-subtitle">Une approche globale pour protéger l’ensemble de votre écosystème numérique.</p>
        </div>
        <div className="solutions-grid">
          {integratedSolutions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="solution-item"
              >
                <Icon size={24} style={{ color: '#3b82f6', marginBottom: '0.5rem' }} />
                <div className="card-text" style={{ fontWeight: 600 }}>{item.name}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ===== TÉMOIGNAGES ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">🗣️ Témoignages</div>
          <h2 className="section-title">Ils nous font confiance</h2>
          <div className="divider"></div>
        </div>
        <div className="cards-grid-2">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="testimonial-card"
            >
              <p className="card-text" style={{ fontStyle: 'italic', marginBottom: '1rem' }}>"{t.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src={t.photo} alt={t.name} style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{t.name}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== POURQUOI OMDEVE SÉCURITÉ ===== */}
      <div className="container">
        <div className="cards-grid-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
            style={{ textAlign: 'left', alignItems: 'flex-start' }}
          >
            <div className="section-badge" style={{ marginBottom: '1rem' }}>🎯 Pourquoi nous</div>
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Pourquoi OMDEVE Sécurité ?</h2>
            <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
              {benefits.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <CheckCircle size={18} style={{ color: '#10b981' }} />
                  <span style={{ color: '#475569' }}>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/devis" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
              Demander un devis sécurité <ArrowRight size={16} />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
            style={{ background: '#f8fafc', textAlign: 'center' }}
          >
            <Shield size={48} style={{ color: '#3b82f6', marginBottom: '1rem' }} />
            <p className="card-text" style={{ fontStyle: 'italic' }}>
              "Grâce à OMDEVE, nous avons réduit les incidents de sécurité de 90% en 6 mois."
            </p>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '1rem' }}>
              — Directeur Technique, Opérateur Télécom
            </p>
          </motion.div>
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
            style={{ textAlign: 'center' }}
          >
            <div className="card-icon" style={{ backgroundColor: '#3b82f6', margin: '0 auto 1rem' }}>
              <Shield size={24} color="white" />
            </div>
            <h3 className="card-title">Audit gratuit</h3>
            <p className="card-text">Bénéficiez d'un diagnostic complet de vos infrastructures sans engagement.</p>
            <Link to="/audit-gratuit" className="btn-primary" style={{ marginTop: '1rem' }}>Audit gratuit <ArrowRight size={16} /></Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card"
            style={{ textAlign: 'center' }}
          >
            <div className="card-icon" style={{ backgroundColor: '#f59e0b', margin: '0 auto 1rem' }}>
              <Rocket size={24} color="white" />
            </div>
            <h3 className="card-title">Devis personnalisé</h3>
            <p className="card-text">Recevez une proposition sur mesure adaptée à vos besoins et votre budget.</p>
            <Link to="/contact" className="btn-primary" style={{ marginTop: '1rem', background: '#f59e0b' }}>Contacter un expert <ArrowRight size={16} /></Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Securite;