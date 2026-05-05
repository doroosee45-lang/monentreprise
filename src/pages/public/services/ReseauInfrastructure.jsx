// src/pages/ReseauInfrastructure.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Server, Wifi, Shield, TrendingUp, CheckCircle, ArrowRight,
  Network, Zap, HardDrive
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const ReseauInfrastructure = () => {
  const features = [
    { icon: Network, title: 'Architecture réseau sur mesure', desc: 'Conception et déploiement de réseaux adaptés à votre structure', color: '#3b82f6' },
    { icon: Shield, title: 'Sécurité avancée', desc: 'Protection contre les intrusions et filtrage de contenu', color: '#06b6d4' },
    { icon: Zap, title: 'Hautes performances', desc: 'Infrastructure optimisée pour la vitesse et la fiabilité', color: '#f59e0b' },
    { icon: HardDrive, title: 'Serveurs virtualisés', desc: 'Virtualisation et gestion centralisée de vos serveurs', color: '#8b5cf6' },
    { icon: Wifi, title: 'Wi-Fi professionnel', desc: 'Couverture totale avec roaming et authentification', color: '#3b82f6' },
    { icon: TrendingUp, title: 'Évolutivité', desc: 'Solutions prêtes à grandir avec votre entreprise', color: '#06b6d4' }
  ];

  const benefits = [
    'Ingénieurs certifiés Cisco, MikroTik, Ubiquiti',
    'Support technique 24/7',
    'Audit et optimisation de votre réseau existant',
    'Solutions hybrides (on-premise & cloud)',
    'Contrats de maintenance adaptés'
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
        .benefits-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: left;
        }
        .testimonial-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: center;
        }
        @media (max-width: 1024px) {
          .cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .cards-grid, .cards-grid-2 {
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
            Infrastructure{' '}
            <span className="hero-highlight">Hautes Performances</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-subtitle"
          >
            Conception, déploiement et maintenance de réseaux d'entreprise robustes, sécurisés et évolutifs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hero-buttons"
          >
            <Link to="/devis" className="btn-primary">Demander un devis <ArrowRight size={18} /></Link>
            <Link to="/contact" className="btn-outline">Contacter un expert</Link>
          </motion.div>
        </div>
      </div>

      {/* ===== SERVICES ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">📡 Nos prestations</div>
          <h2 className="section-title">Ce que nous vous apportons</h2>
          <div className="divider"></div>
        </div>
        <div className="cards-grid">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="card"
              >
                <div className="card-icon" style={{ backgroundColor: `${feature.color}15`, color: feature.color }}>
                  <Icon size={24} />
                </div>
                <h3 className="card-title">{feature.title}</h3>
                <p className="card-text">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ===== POURQUOI OMDEVE ===== */}
      <div className="container">
        <div className="cards-grid-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="benefits-card"
          >
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Pourquoi choisir OMDEVE ?</h2>
            <div className="divider" style={{ marginLeft: 0, marginRight: 0, width: '3rem' }}></div>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
              {benefits.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <CheckCircle size={18} style={{ color: '#10b981' }} />
                  <span style={{ color: '#475569' }}>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/devis" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
              En savoir plus <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="testimonial-card"
          >
            <Server size={48} style={{ color: '#3b82f6', marginBottom: '1rem' }} />
            <p className="card-text" style={{ fontStyle: 'italic' }}>
              "OMDEVE a transformé notre infrastructure obsolète en un réseau hautement performant. Notre productivité a augmenté de 40%."
            </p>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '1rem' }}>
              — Directeur IT, Groupe Industriel
            </p>
          </motion.div>
        </div>
      </div>

      {/* ===== CTA FINALE ===== */}
      <div className="container" style={{ margin: '3rem auto' }}>
        <div className="card" style={{ background: '#f8fafc', textAlign: 'center', padding: '2rem' }}>
          <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Prêt à moderniser votre infrastructure ?</h2>
          <p className="card-text" style={{ marginBottom: '1.5rem' }}>
            Obtenez un audit gratuit et un devis personnalisé sous 48h.
          </p>
          <Link to="/audit-gratuit" className="btn-primary">Audit gratuit <ArrowRight size={18} /></Link>
        </div>
      </div>
    </>
  );
};

export default ReseauInfrastructure;