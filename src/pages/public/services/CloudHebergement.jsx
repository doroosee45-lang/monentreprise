// src/pages/CloudHebergement.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Cloud, Database, Server, Shield, TrendingUp, CheckCircle,
  ArrowRight, Clock, DollarSign, Users, Star, Zap, HardDrive,
  Activity, Award
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const CloudHebergement = () => {
  const cloudServices = [
    { icon: Database, title: 'Hébergement cloud scalable', desc: 'AWS, Azure, Google Cloud, OVH – ressources élastiques', color: '#3b82f6' },
    { icon: Server, title: 'Serveurs dédiés & VPS', desc: 'Performances garanties, bare metal ou virtualisation', color: '#06b6d4' },
    { icon: Shield, title: 'Sécurité & sauvegarde', desc: 'Backups automatiques, chiffrement, conformité RGPD', color: '#f59e0b' },
    { icon: Clock, title: 'Disponibilité 99.9%', desc: 'SLA strict, monitoring 24/7 et redondance', color: '#3b82f6' },
    { icon: DollarSign, title: 'Paiement à l’usage', desc: 'Optimisez vos coûts, pas de surprises', color: '#10b981' },
    { icon: TrendingUp, title: 'Migration assistée', desc: 'Transition en douceur vers le cloud', color: '#8b5cf6' }
  ];

  const benefits = [
    'Infrastructure certifiée ISO 27001',
    'Support technique 24/7 par des experts cloud',
    'Architecture multi-régions pour une haute disponibilité',
    'Migration sans interruption de service',
    'Facturation transparente et devis personnalisé'
  ];

  const stats = [
    { value: '99.99%', label: 'Disponibilité garantie', icon: Activity, color: '#3b82f6' },
    { value: '50+', label: 'Projets migrés', icon: Cloud, color: '#06b6d4' },
    { value: '24/7', label: 'Support technique', icon: Clock, color: '#f59e0b' },
    { value: '100%', label: 'Satisfaction client', icon: Star, color: '#10b981' }
  ];

  const testimonials = [
    {
      name: 'Nicolas R.',
      role: 'CTO, FinTech',
      quote: 'La migration de notre infrastructure legacy vers AWS a été fluide et sans downtime. OMDEVE a fait preuve d’un professionnalisme exceptionnel.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    {
      name: 'Claire M.',
      role: 'Directrice Technique, E-commerce',
      quote: 'Leur solution d’hébergement cloud nous permet de scaler pendant les pics de trafic sans souci. Je recommande vivement.',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    }
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop'
  ];

  const packs = [
    { name: 'Pack Start', price: '49€/mois', features: ['1 vCPU', '2 Go RAM', '20 Go SSD', '1 To trafic'], color: '#3b82f6' },
    { name: 'Pack Business', price: '129€/mois', features: ['4 vCPU', '8 Go RAM', '100 Go SSD', '5 To trafic', 'Backup quotidien'], color: '#06b6d4' },
    { name: 'Pack Enterprise', price: 'Sur devis', features: ['Dédié', 'Stockage illimité', 'SLA 99.99%', 'Support prioritaire', 'Architecture multi-AZ'], color: '#f59e0b' }
  ];

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
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .cards-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
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
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
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
        @media (max-width: 1024px) {
          .cards-grid, .cards-grid-4, .stats-grid, .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .cards-grid, .cards-grid-2, .cards-grid-4, .stats-grid, .gallery-grid {
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
            Passez au{' '}
            <span className="hero-highlight">cloud</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-subtitle"
          >
            Solutions d’hébergement flexibles, sécurisées et performantes pour toutes vos applications.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hero-buttons"
          >
            <Link to="/devis" className="btn-primary">Migrez dès maintenant <ArrowRight size={18} /></Link>
            <Link to="/contact" className="btn-outline">Contacter un expert</Link>
          </motion.div>
        </div>
      </div>

      {/* ===== SERVICES CLOUD ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">NOS PRESTATIONS</div>
          <h2 className="section-title">Nos prestations cloud</h2>
          <div className="divider"></div>
        </div>
        <div className="cards-grid">
          {cloudServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="card"
              >
                <div className="card-icon" style={{ backgroundColor: `${service.color}15`, color: service.color }}>
                  <Icon size={24} />
                </div>
                <h3 className="card-title">{service.title}</h3>
                <p className="card-text">{service.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ===== POURQUOI OMDEVE CLOUD ===== */}
      <div className="container">
        <div className="cards-grid-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
            style={{ textAlign: 'left', alignItems: 'flex-start' }}
          >
            <h2 className="section-title" style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>Pourquoi OMDEVE Cloud ?</h2>
            <div style={{ width: '4rem', height: '0.25rem', background: '#3b82f6', borderRadius: '9999px', marginBottom: '1.5rem' }}></div>
            <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
              {benefits.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <CheckCircle size={18} style={{ color: '#10b981' }} />
                  <span style={{ color: '#475569' }}>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/devis" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
              Demander un devis cloud <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
            style={{ background: '#f8fafc', textAlign: 'center' }}
          >
            <Cloud size={48} style={{ color: '#3b82f6', marginBottom: '1rem' }} />
            <p className="card-text" style={{ fontStyle: 'italic' }}>
              "Avec OMDEVE, notre infrastructure cloud est devenue plus robuste et économique. Leur expertise AWS nous a fait gagner 30% sur notre facture."
            </p>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '1rem' }}>
              — Directeur Technique, Scale-up SaaS
            </p>
          </motion.div>
        </div>
      </div>

      {/* ===== OFFRES PACKAGÉES ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">NOS OFFRES</div>
          <h2 className="section-title">Nos packs cloud clé en main</h2>
          <div className="divider"></div>
        </div>
        <div className="cards-grid">
          {packs.map((pack, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="card"
            >
              <h3 className="card-title" style={{ fontSize: '1.25rem' }}>{pack.name}</h3>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: pack.color, margin: '0.5rem 0' }}>{pack.price}</div>
              <ul style={{ textAlign: 'left', width: '100%', marginBottom: '1rem', paddingLeft: '1rem' }}>
                {pack.features.map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#475569', marginBottom: '0.5rem' }}>
                    <CheckCircle size={14} style={{ color: '#10b981' }} /> {feat}
                  </li>
                ))}
              </ul>
              <Link to="/devis-cloud" className="btn-primary" style={{ display: 'inline-block', marginTop: '0.5rem', background: pack.color }}>
                Choisir ce pack <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
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
          <div className="section-badge">NOTRE INFRASTRUCTURE</div>
          <h2 className="section-title">Nos infrastructures & datacenters</h2>
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
              <img src={img} alt="Infrastructure cloud" className="gallery-img" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== TÉMOIGNAGES ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">TÉMOIGNAGES</div>
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

      {/* ===== CTA FINALE ===== */}
      <div className="container" style={{ margin: '3rem auto' }}>
        <div className="card" style={{ background: '#f8fafc', textAlign: 'center', padding: '2rem' }}>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Prêt à migrer vers le cloud ?</h2>
          <p className="card-text" style={{ marginBottom: '1.5rem' }}>
            Bénéficiez d’un audit de votre infrastructure et d’un plan de migration personnalisé.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/audit-gratuit" className="btn-primary">Audit gratuit <ArrowRight size={18} /></Link>
            <Link to="/contact" className="btn-outline" style={{ borderColor: '#cbd5e1', color: '#1e293b' }}>Contacter un expert</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CloudHebergement;