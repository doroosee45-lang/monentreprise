// src/pages/EnergieEquipements.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sun, Wind, Battery, Thermometer, Laptop, Smartphone, Home,
  TrendingUp, CheckCircle, ArrowRight, Zap, Shield, Users,
  Star, Calendar, Award, DollarSign, Clock, Headphones,
  Phone, MessageCircle, Rocket, FileText
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

// ========== DONNÉES ==========
const energyServices = [
  { icon: Sun, title: 'Panneaux photovoltaïques', desc: 'Étude, installation et maintenance de centrales solaires.', price: 'Sur devis', color: '#3b82f6' },
  { icon: Thermometer, title: 'Climatisation (split system)', desc: 'Installation, réparation et entretien de climatiseurs réversibles.', price: 'Sur devis', color: '#06b6d4' },
  { icon: TrendingUp, title: 'Audit énergétique', desc: 'Diagnostic complet de votre consommation et optimisation des coûts.', price: 'Gratuit', color: '#f59e0b' },
  { icon: Battery, title: 'Stockage d’énergie', desc: 'Batteries domestiques et industrielles pour autoconsommation.', price: 'Sur devis', color: '#8b5cf6' }
];

const equipmentSales = [
  { icon: Laptop, title: 'Ordinateurs professionnels', desc: 'PC, Mac, laptops haute performance – marques certifiées.', color: '#3b82f6' },
  { icon: Smartphone, title: 'Smartphones & tablettes', desc: 'iPhone, Samsung, Huawei – neuf et reconditionné.', color: '#06b6d4' },
  { icon: Thermometer, title: 'Climatiseurs', desc: 'Split, mural, gainable – toutes marques.', color: '#f59e0b' },
  { icon: Sun, title: 'Panneaux solaires', desc: 'Monocristallins, polycristallins, kits complets.', color: '#3b82f6' }
];

const stats = [
  { value: '200+', label: 'Installations solaires', icon: Sun, color: '#3b82f6' },
  { value: '150+', label: 'Climatisations posées', icon: Thermometer, color: '#06b6d4' },
  { value: '98%', label: 'Clients satisfaits', icon: Star, color: '#f59e0b' },
  { value: '24/7', label: 'Support technique', icon: Clock, color: '#10b981' }
];

const testimonials = [
  {
    name: 'Jean-Paul M.',
    role: 'Propriétaire, Maison individuelle',
    quote: 'OMDEVE a installé 12 panneaux solaires chez moi. En un an, j’ai réduit ma facture d’électricité de 60%.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    name: 'Catherine D.',
    role: 'Directrice, Hôtel 3 étoiles',
    quote: 'Ils ont remplacé toute notre climatisation en 3 jours, avec un suivi impeccable.',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  }
];

const benefits = [
  'Installateurs certifiés RGE (Reconnu Garant de l’Environnement)',
  'Matériel de marques premium (LG, Daikin, SunPower)',
  'Suivi de chantier et garantie décennale',
  'Aide au montage des dossiers de subventions',
  'Service après-vente réactif'
];

const galleryImages = [
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=500&fit=crop'
];

const EnergieEquipements = () => {
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
        .equipment-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
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
        .double-cta {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 1024px;
          margin: 0 auto;
        }
        @media (max-width: 1024px) {
          .cards-grid, .stats-grid, .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .double-cta {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 768px) {
          .cards-grid, .cards-grid-2, .stats-grid, .equipment-grid, .gallery-grid, .double-cta {
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
            Solutions énergétiques{' '}
            <span className="hero-highlight">durables</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-subtitle"
          >
            Panneaux solaires, climatisation, audit énergétique et vente de matériel high-tech.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hero-buttons"
          >
            <Link to="/audit-gratuit" className="btn-primary">Audit énergétique gratuit <ArrowRight size={18} /></Link>
            <Link to="/contact" className="btn-outline">Demander un devis <CheckCircle size={18} /></Link>
          </motion.div>
        </div>
      </div>

      {/* ===== SERVICES ÉNERGIE ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">⚡ Services</div>
          <h2 className="section-title">Nos prestations énergétiques</h2>
          <div className="divider"></div>
        </div>
        <div className="cards-grid">
          {energyServices.map((service, idx) => {
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

      {/* ===== VENTE DE MATÉRIEL ===== */}
      <div className="container">
        <div className="cards-grid-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
            style={{ textAlign: 'left', alignItems: 'flex-start' }}
          >
            <div className="section-badge" style={{ marginBottom: '1rem' }}>🛒 Matériel</div>
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Vente de matériel</h2>
            <p className="card-text" style={{ marginBottom: '1rem' }}>
              Équipez votre entreprise ou votre foyer avec du matériel neuf ou reconditionné, garanti 1 an.
            </p>
            <div className="equipment-grid">
              {equipmentSales.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="equipment-item">
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
            <Link to="/devis" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
              Commander du matériel <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
            style={{ overflow: 'hidden', padding: 0 }}
          >
            <img
              src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop"
              alt="Matériel informatique"
              style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '250px' }}
            />
          </motion.div>
        </div>
      </div>

      {/* ===== AUDIT ÉNERGÉTIQUE ===== */}
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
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop"
              alt="Audit énergétique"
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
            <div className="section-badge" style={{ marginBottom: '1rem' }}>📊 Diagnostic</div>
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Audit énergétique et optimisation</h2>
            <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
              {[
                'Analyse complète de vos consommations',
                'Détection des fuites et gaspillages',
                'Recommandations sur mesure (isolation, équipements)',
                'Simulation de rentabilité pour panneaux solaires',
                'Accompagnement aux aides financières (MaPrimeRénov, CEE)'
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <CheckCircle size={18} style={{ color: '#10b981' }} />
                  <span style={{ color: '#475569' }}>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/audit-gratuit" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
              Bénéficier d’un audit gratuit <ArrowRight size={16} />
            </Link>
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
          <div className="section-badge">📷 Portfolio</div>
          <h2 className="section-title">Nos réalisations</h2>
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
              <img src={img} alt="Installation énergie" className="gallery-img" />
            </motion.div>
          ))}
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

      {/* ===== POURQUOI OMDEVE ÉNERGIE ===== */}
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
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Pourquoi OMDEVE Énergie ?</h2>
            <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
              {benefits.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <CheckCircle size={18} style={{ color: '#10b981' }} />
                  <span style={{ color: '#475569' }}>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/devis" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
              Demander un devis personnalisé <ArrowRight size={16} />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
            style={{ background: '#f8fafc', textAlign: 'center' }}
          >
            <Sun size={48} style={{ color: '#3b82f6', marginBottom: '1rem' }} />
            <p className="card-text" style={{ fontStyle: 'italic' }}>
              "Économisez jusqu’à 70% sur votre facture d’électricité avec nos solutions solaires."
            </p>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '1rem' }}>
              — Étude de cas, Client résidentiel
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
              <Headphones size={24} color="white" />
            </div>
            <h3 className="card-title">Assistance immédiate</h3>
            <p className="card-text">Notre support technique est disponible 24/7 pour répondre à vos urgences.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
              <a href="tel:+24355550359" className="btn-primary" style={{ background: '#3b82f6' }}>Appeler</a>
              <a href="https://wa.me/24355550359" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background: '#10b981' }}>WhatsApp</a>
            </div>
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
            <h3 className="card-title">Un projet sur mesure ?</h3>
            <p className="card-text">Étudions ensemble votre besoin et obtenez un devis personnalisé sans engagement.</p>
            <Link to="/contact" className="btn-primary" style={{ marginTop: '1rem', background: '#f59e0b' }}>Demander un devis <ArrowRight size={16} /></Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default EnergieEquipements;