// src/pages/TarifsPage.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, XCircle, Rocket, Star, Calendar, MapPin, Briefcase, Clock,
  Eye, X, Search, Quote, ThumbsUp, Award, Users,
  Network, Shield, Code, Cloud, Sun, Monitor, BookOpen,
  Wifi, GraduationCap, Filter, ChevronRight, Heart, Headphones,
  CreditCard, Zap, Crown, HelpCircle, ChevronDown, ChevronUp,
  TrendingUp, ShoppingBag, Euro
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const TarifsPage = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  // Services
  const services = [
    {
      id: 1,
      name: 'Réseau & Infrastructure',
      icon: Wifi,
      description: 'Installation et maintenance de réseaux informatiques',
      price: { monthly: '250 €', quarterly: '680 €', yearly: '2 400 €' },
      features: [
        'Audit réseau initial',
        'Câblage structuré',
        'Configuration équipements',
        'Support technique 24/7',
        'Maintenance préventive',
        'Rapports mensuels'
      ],
      popular: false,
      color: '#3b82f6'
    },
    {
      id: 2,
      name: 'Sécurité',
      icon: Shield,
      description: 'Solutions de sécurité complètes',
      price: { monthly: '350 €', quarterly: '950 €', yearly: '3 360 €' },
      features: [
        'Vidéosurveillance HD',
        'Audit cybersécurité',
        'Firewall management',
        "Contrôle d'accès",
        'Alertes en temps réel',
        'Backup sécurisé'
      ],
      popular: true,
      color: '#ef4444'
    },
    {
      id: 3,
      name: 'Développement Digital',
      icon: Code,
      description: 'Création de sites et applications sur mesure',
      price: { monthly: '500 €', quarterly: '1 350 €', yearly: '4 800 €' },
      features: [
        'Site vitrine / E-commerce',
        'Application mobile',
        'SEO optimisé',
        'Maintenance incluse',
        'Hébergement offert',
        'Support prioritaire'
      ],
      popular: false,
      color: '#a855f7'
    },
    {
      id: 4,
      name: 'Cloud & Hébergement',
      icon: Cloud,
      description: 'Solutions cloud haute disponibilité',
      price: { monthly: '180 €', quarterly: '490 €', yearly: '1 728 €' },
      features: [
        'Hébergement sécurisé',
        'Backup automatique',
        'Migration cloud',
        'Monitoring 24/7',
        'Certificat SSL',
        'SLA 99.9%'
      ],
      popular: false,
      color: '#06b6d4'
    },
    {
      id: 5,
      name: 'Énergie & Équipements',
      icon: Sun,
      description: 'Solutions énergétiques durables',
      price: { monthly: '300 €', quarterly: '810 €', yearly: '2 880 €' },
      features: [
        'Audit énergétique',
        'Installation panneaux solaires',
        'Maintenance climatisation',
        'Optimisation consommation',
        'Certifications qualité',
        'Garantie 5 ans'
      ],
      popular: false,
      color: '#f97316'
    },
    {
      id: 6,
      name: 'Formation',
      icon: GraduationCap,
      description: 'Formations professionnelles certifiantes',
      price: { monthly: '200 €', quarterly: '540 €', yearly: '1 920 €' },
      features: [
        'Accès illimité formations',
        'Certifications reconnues',
        'Support pédagogique',
        'E-learning inclus',
        'Suivi personnalisé',
        'Mise à jour continue'
      ],
      popular: false,
      color: '#10b981'
    }
  ];

  const getCurrentPrice = (service) => service.price[billingPeriod];
  const getDiscountLabel = () => {
    if (billingPeriod === 'quarterly') return 'Économisez 10%';
    if (billingPeriod === 'yearly') return 'Économisez 20%';
    return '';
  };

  const packs = [
    {
      name: 'Pack Start',
      price: '990 €',
      originalPrice: '1 490 €',
      description: 'Idéal pour les petites structures',
      features: [
        'Site vitrine (5 pages)',
        'Hébergement 1 an',
        'Email professionnel',
        'Support basique',
        'Formation utilisateur'
      ],
      recommended: false
    },
    {
      name: 'Pack Business',
      price: '2 490 €',
      originalPrice: '3 490 €',
      description: 'Pour les entreprises en croissance',
      features: [
        'Site e-commerce complet',
        'Application mobile',
        'SEO avancé',
        'Support prioritaire',
        'Maintenance incluse',
        'Analytics avancés'
      ],
      recommended: true
    },
    {
      name: 'Pack Enterprise',
      price: 'Sur devis',
      originalPrice: null,
      description: 'Solutions sur mesure',
      features: [
        'ERP personnalisé',
        'Infrastructure dédiée',
        'SLA personnalisé',
        'Support dédié 24/7',
        'Audit trimestriel',
        'Formations sur site'
      ],
      recommended: false
    }
  ];

  return (
    <>
      <style>{`
        /* Styles identiques aux autres pages (Contact, Services, etc.) */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .tarifs-hero {
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
        /* Billing toggle */
        .billing-toggle {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          z-index: 40;
          padding: 1rem 0;
        }
        .toggle-group {
          display: inline-flex;
          gap: 0.5rem;
          background: #f1f5f9;
          border-radius: 9999px;
          padding: 0.25rem;
        }
        .toggle-btn {
          padding: 0.5rem 1.5rem;
          border-radius: 9999px;
          font-weight: 500;
          font-size: 0.875rem;
          transition: all 0.2s;
          cursor: pointer;
          border: none;
          background: transparent;
          color: #1e293b;
        }
        .toggle-btn.active {
          background: #3b82f6;
          color: white;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        .toggle-badge {
          background: #10b981;
          color: white;
          font-size: 0.7rem;
          padding: 0.125rem 0.5rem;
          border-radius: 9999px;
          margin-left: 0.25rem;
        }
        /* Grille services */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .service-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.3s;
        }
        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1);
        }
        .service-card.popular {
          border: 2px solid #ef4444;
        }
        .popular-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #ef4444;
          color: white;
          font-size: 0.7rem;
          font-weight: bold;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }
        .service-header {
          padding: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
        }
        .service-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .service-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.25rem;
        }
        .service-description {
          color: #475569;
          font-size: 0.875rem;
        }
        .service-body {
          padding: 1.5rem;
        }
        .service-price {
          margin-bottom: 1rem;
        }
        .price-value {
          font-size: 1.75rem;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
        }
        .price-period {
          color: #64748b;
          font-size: 0.875rem;
        }
        .discount {
          color: #10b981;
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }
        .features-list {
          list-style: none;
          margin: 0 0 1.5rem;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #475569;
        }
        .btn-service {
          display: block;
          text-align: center;
          background: #3b82f6;
          color: white;
          padding: 0.625rem;
          border-radius: 0.75rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-service:hover {
          background: #2563eb;
          transform: scale(1.02);
        }
        /* Packs */
        .packs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .pack-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s;
          position: relative;
        }
        .pack-card.recommended {
          border: 2px solid #f59e0b;
          transform: translateY(-4px);
        }
        .pack-recommended-badge {
          background: #f59e0b;
          color: #0f172a;
          font-size: 0.7rem;
          font-weight: bold;
          padding: 0.25rem;
          text-align: center;
          margin-top: -1.5rem;
          margin-bottom: 1rem;
          border-radius: 9999px;
          width: fit-content;
          margin-left: auto;
          margin-right: auto;
          padding: 0.25rem 1rem;
        }
        .pack-price {
          font-size: 1.75rem;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          color: #0f172a;
        }
        .pack-original {
          color: #94a3b8;
          font-size: 0.875rem;
          text-decoration: line-through;
          margin-left: 0.5rem;
        }
        .btn-pack {
          display: inline-block;
          background: #f59e0b;
          color: #0f172a;
          padding: 0.625rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-pack:hover {
          background: #d97706;
          transform: scale(1.02);
        }
        /* Why choose us + devis */
        .two-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin: 2rem 0;
        }
        .info-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.5rem;
        }
        .devis-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.5rem;
        }
        /* CTA finale */
        .final-cta {
          background: #f8fafc;
          text-align: center;
          padding: 3rem 1rem;
          margin-top: 2rem;
          border-radius: 1rem;
        }
        @media (max-width: 1024px) {
          .services-grid, .packs-grid, .two-columns {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .services-grid, .packs-grid, .two-columns {
            grid-template-columns: 1fr;
          }
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>

      {/* Hero avec image 400px */}
      <div className="tarifs-hero">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="hero-title"
          >
            Nos Tarifs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-subtitle"
          >
            Des offres adaptées à vos besoins. Sans engagement, évolutif.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hero-buttons"
          >
            <Link to="/contact" className="btn-primary">Demander un conseil <ArrowRight size={18} /></Link>
            <Link to="/audit" className="btn-outline">Faire un audit <ChevronRight size={18} /></Link>
          </motion.div>
        </div>
      </div>

      {/* Billing toggle */}
      <div className="billing-toggle">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="toggle-group">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`toggle-btn ${billingPeriod === 'monthly' ? 'active' : ''}`}
              >
                Mensuel
              </button>
              <button
                onClick={() => setBillingPeriod('quarterly')}
                className={`toggle-btn ${billingPeriod === 'quarterly' ? 'active' : ''}`}
              >
                Trimestriel
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`toggle-btn ${billingPeriod === 'yearly' ? 'active' : ''}`}
              >
                Annuel
                <span className="toggle-badge">-20%</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services grid */}
      <div className="container">
        <div className="services-grid">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isPopular = service.popular;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`service-card ${isPopular ? 'popular' : ''}`}
                style={{ position: 'relative' }}
              >
                {isPopular && (
                  <div className="popular-badge">
                    <Star size={12} fill="currentColor" /> Populaire
                  </div>
                )}
                <div className="service-header">
                  <div className="service-icon" style={{ backgroundColor: `${service.color}15` }}>
                    <Icon size={24} style={{ color: service.color }} />
                  </div>
                  <h3 className="service-name">{service.name}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
                <div className="service-body">
                  <div className="service-price">
                    <span className="price-value">{getCurrentPrice(service)}</span>
                    <span className="price-period">
                      {' '}/ {billingPeriod === 'monthly' ? 'mois' : billingPeriod === 'quarterly' ? 'trimestre' : 'an'}
                    </span>
                    {billingPeriod !== 'monthly' && (
                      <div className="discount">{getDiscountLabel()}</div>
                    )}
                  </div>
                  <ul className="features-list">
                    {service.features.map((feature, i) => (
                      <li key={i} className="feature-item">
                        <CheckCircle size={14} style={{ color: '#10b981' }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="btn-service">Demander ce service <ArrowRight size={14} className="inline ml-1" /></Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Packs pré-configurés */}
      <div className="container">
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, textAlign: 'center', margin: '2rem 0 1rem', fontFamily: 'Syne, sans-serif' }}>Packs pré-configurés</h2>
        <div className="packs-grid">
          {packs.map((pack, idx) => (
            <motion.div
              key={pack.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`pack-card ${pack.recommended ? 'recommended' : ''}`}
            >
              {pack.recommended && <div className="pack-recommended-badge">⭐ Recommandé</div>}
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>{pack.name}</h3>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1rem' }}>{pack.description}</p>
              <div style={{ marginBottom: '1rem' }}>
                <span className="pack-price">{pack.price}</span>
                {pack.originalPrice && <span className="pack-original">{pack.originalPrice}</span>}
              </div>
              <ul style={{ textAlign: 'left', marginBottom: '1.5rem', listStyle: 'none', padding: 0 }}>
                {pack.features.map((f, i) => (
                  <li key={i} className="feature-item">
                    <CheckCircle size={14} style={{ color: '#10b981' }} />
                    <span style={{ fontSize: '0.875rem' }}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-pack">Choisir ce pack <ArrowRight size={14} className="inline ml-1" /></Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pourquoi OMDEVE + Devis personnalisé */}
      <div className="container">
        <div className="two-columns">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="info-card"
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', fontFamily: 'Syne, sans-serif' }}>Pourquoi OMDEVE ?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: CheckCircle, title: 'Prix transparents', desc: 'Pas de frais cachés. Ce que vous voyez est ce que vous payez.', color: '#10b981' },
                { icon: Headphones, title: 'Support 24/7', desc: 'Une équipe dédiée à votre écoute, jour et nuit.', color: '#3b82f6' },
                { icon: Calendar, title: 'Sans engagement', desc: "Résiliez à tout moment. Pas de période d'engagement obligatoire.", color: '#a855f7' },
                { icon: TrendingUp, title: 'Évolutif', desc: 'Changez de formule à tout moment selon vos besoins.', color: '#f59e0b' }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '2rem', height: '2rem', background: `${item.color}15`, borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={16} style={{ color: item.color }} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{item.title}</h4>
                    <p style={{ color: '#475569', fontSize: '0.875rem' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="devis-card"
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Besoin d'un devis personnalisé ?</h3>
            <p style={{ color: '#475569', marginBottom: '1rem' }}>Chaque projet est unique. Contactez-nous pour une offre adaptée à vos besoins spécifiques.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link to="/contact" className="btn-service" style={{ background: '#3b82f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Demander un devis gratuit <ArrowRight size={16} />
              </Link>
              <Link to="/audit" className="btn-service" style={{ background: 'transparent', border: '1px solid #3b82f6', color: '#3b82f6' }}>
                Audit gratuit <ArrowRight size={16} className="inline ml-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA finale */}
      <div className="container">
        <div className="final-cta">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'Syne, sans-serif', marginBottom: '0.5rem' }}>Prêt à démarrer ?</h2>
          <p style={{ color: '#475569', marginBottom: '1.5rem' }}>Rejoignez plus de 150 clients satisfaits qui nous font confiance.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/contact" className="btn-primary">Demander un devis <ArrowRight size={16} /></Link>
            <Link to="/contact" className="btn-outline" style={{ borderColor: '#cbd5e1', color: '#1e293b' }}>Nous contacter <Headphones size={16} /></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TarifsPage;