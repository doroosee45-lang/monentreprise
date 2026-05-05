// src/pages/DeveloppementDigital.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Star, Clock, Award, Rocket, Headphones, Phone, MessageCircle,
  Code, Globe, ShoppingCart, Smartphone, Database, Cloud, Cpu, Zap,
  Briefcase  // ✅ Ajouté
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const digitalServices = [
  { id: 'sites-web', name: 'Sites web vitrines', icon: Globe, description: 'Design moderne, responsive, optimisé SEO et administration facile.', price: 'Sur devis', color: '#3b82f6' },
  { id: 'ecommerce', name: 'E-commerce performant', icon: ShoppingCart, description: 'Boutiques en ligne avec paiement sécurisé, gestion de stock et livraison.', price: 'Sur devis', color: '#06b6d4' },
  { id: 'applications-mobiles', name: 'Applications mobiles', icon: Smartphone, description: 'iOS et Android natives ou hybrides (React Native, Flutter).', price: 'Sur devis', color: '#10b981' },
  { id: 'erp', name: 'ERP sur mesure', icon: Database, description: 'Gestion complète : ventes, stocks, RH, facturation, reporting.', price: 'Sur devis', color: '#3b82f6' },
  { id: 'saas', name: 'Solutions SaaS multi-tenant', icon: Cloud, description: 'Plateformes évolutives avec abonnements et espace client.', price: 'Sur devis', color: '#06b6d4' },
  { id: 'maintenance', name: 'Maintenance & évolutivité', icon: Code, description: 'Support continu, mises à jour et améliorations.', price: 'Sur devis', color: '#f59e0b' }
];

const technologies = [
  { name: 'React.js / Next.js', icon: Code, color: '#3b82f6' },
  { name: 'Node.js / Express', icon: Code, color: '#10b981' },
  { name: 'MongoDB / PostgreSQL', icon: Database, color: '#06b6d4' },
  { name: 'Tailwind CSS', icon: Code, color: '#f59e0b' },
  { name: 'Flutter / React Native', icon: Smartphone, color: '#a855f7' },
  { name: 'AWS / Vercel', icon: Cloud, color: '#f97316' },
  { name: 'Docker / Kubernetes', icon: Cpu, color: '#3b82f6' },
  { name: 'GraphQL / REST API', icon: Zap, color: '#ec4899' }
];

const stats = [
  { value: '50+', label: 'Projets livrés', color: '#3b82f6' },
  { value: '100%', label: 'Satisfaction client', color: '#f59e0b' },
  { value: '24/7', label: 'Support technique', color: '#06b6d4' },
  { value: '15+', label: 'Experts certifiés', color: '#10b981' }
];

const testimonials = [
  {
    name: 'Marie L.',
    role: 'Fondatrice, Startup Innov',
    quote: 'OMDEVE a développé notre MVP en 3 mois. L’équipe est réactive, professionnelle et à l’écoute.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    name: 'David K.',
    role: 'Directeur, Groupe Retail',
    quote: 'Notre plateforme e-commerce génère +200% de ventes grâce à l’expertise d’OMDEVE.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  }
];

const benefits = [
  'Méthodologie Agile (SCRUM)',
  'Design UX/UI centré utilisateur',
  'Code propre, documenté et maintenable',
  'Livraison continue et déploiement automatisé',
  'Accompagnement post-livraison (formation, support)'
];

const galleryImages = [
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop'
];

const DeveloppementDigital = () => {
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
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .tech-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.2s;
        }
        .tech-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
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
        .double-cta {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 1024px;
          margin: 0 auto;
        }
        @media (max-width: 1024px) {
          .cards-grid, .cards-grid-4, .stats-grid, .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .double-cta {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 768px) {
          .cards-grid, .cards-grid-2, .cards-grid-4, .stats-grid, .tech-grid, .gallery-grid, .double-cta {
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
            Développement{' '}
            <span className="hero-highlight">Digital</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-subtitle"
          >
            Sites web, applications mobiles, ERP, SaaS – Des solutions sur mesure pour votre transformation digitale.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hero-buttons"
          >
            <Link to="/devis" className="btn-primary">Demander un devis <ArrowRight size={18} /></Link>
            <Link to="/audit" className="btn-outline">Audit gratuit <CheckCircle size={18} /></Link>
          </motion.div>
        </div>
      </div>

      {/* ===== STATISTIQUES ===== */}
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="stat-card"
            >
              <div className="card-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                {idx === 0 && <Briefcase size={24} />}
                {idx === 1 && <Star size={24} />}
                {idx === 2 && <Clock size={24} />}
                {idx === 3 && <Award size={24} />}
              </div>
              <div className="stat-number" style={{ color: stat.color }}>{stat.value}</div>
              <div className="card-text">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== SERVICES ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">💻 Services</div>
          <h2 className="section-title">Nos prestations digitales</h2>
          <div className="divider"></div>
        </div>
        <div className="cards-grid">
          {digitalServices.map((service, idx) => {
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
                <h3 className="card-title">{service.name}</h3>
                <p className="card-text">{service.description}</p>
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
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

      {/* ===== TECHNOLOGIES (2 colonnes) ===== */}
      <div className="container">
        <div className="cards-grid-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
            style={{ textAlign: 'left', alignItems: 'flex-start' }}
          >
            <div className="section-badge" style={{ marginBottom: '1rem' }}>🚀 Stack technique</div>
            <h2 className="section-title" style={{ fontSize: '1.5rem' }}>Technologies de pointe</h2>
            <div className="divider" style={{ marginLeft: 0, marginRight: 0, width: '3rem' }}></div>
            <p className="card-text" style={{ marginBottom: '1rem' }}>
              Nous utilisons les dernières technologies pour garantir performance, sécurité et évolutivité.
              Chaque stack est choisie selon les besoins spécifiques de votre projet.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            <div className="tech-grid">
              {technologies.map((tech, idx) => {
                const Icon = tech.icon;
                return (
                  <div key={idx} className="tech-card">
                    <div className="card-icon" style={{ backgroundColor: `${tech.color}15`, color: tech.color, width: '2rem', height: '2rem' }}>
                      <Icon size={16} />
                    </div>
                    <span className="card-text" style={{ fontSize: '0.8rem' }}>{tech.name}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== POURQUOI OMDEVE DIGITAL ===== */}
      <div className="container">
        <div className="cards-grid-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
              alt="Équipe de développement"
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.75rem', marginBottom: '1rem' }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
            style={{ textAlign: 'left', alignItems: 'flex-start' }}
          >
            <div className="section-badge" style={{ marginBottom: '1rem' }}>🎯 Pourquoi nous</div>
            <h2 className="section-title" style={{ fontSize: '1.5rem' }}>Pourquoi OMDEVE Digital ?</h2>
            <div className="divider" style={{ marginLeft: 0, marginRight: 0, width: '3rem' }}></div>
            <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
              {benefits.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <CheckCircle size={18} style={{ color: '#10b981' }} />
                  <span style={{ color: '#475569' }}>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/devis" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
              Discuter de votre projet <ArrowRight size={16} />
            </Link>
          </motion.div>
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
              <img src={img} alt="Réalisation digitale" className="gallery-img" />
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

export default DeveloppementDigital;