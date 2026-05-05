// src/pages/ServicesPage.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, Code, Cloud, Sun, Monitor, BookOpen, Network,
  CheckCircle, Rocket
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

// Données des services – chaque catégorie a sa propre couleur spécifique (pas de bleu majoritaire)
const serviceCategories = [
  {
    id: 'reseau',
    name: 'Réseau & Infrastructure',
    icon: Network,
    color: '#3b82f6',    // bleu
    description: 'Des infrastructures réseau robustes et performantes pour connecter votre entreprise',
    services: [
      { name: 'Câblage structuré', description: 'Installation de câblage cuivre et fibre optique', price: 'Sur devis' },
      { name: 'WiFi entreprise', description: 'Solutions WiFi haute performance', price: 'Sur devis' },
      { name: 'Fibre optique', description: 'Déploiement de réseaux fibre optique ultra-rapide', price: 'Sur devis' },
      { name: 'Infrastructure réseau', description: 'Conception et déploiement d’infrastructures complètes', price: 'Sur devis' },
    ]
  },
  {
    id: 'securite',
    name: 'Sécurité & Surveillance',
    icon: Shield,
    color: '#06b6d4',    // cyan
    description: 'Protection avancée de vos données et surveillance intelligente de vos sites',
    services: [
      { name: 'Cybersécurité', description: 'Protection contre les cyberattaques', price: 'Sur devis' },
      { name: 'Vidéosurveillance', description: 'Caméras IP, PTZ, monitoring 24/7', price: 'Sur devis' },
      { name: 'Audit de sécurité', description: 'Analyse de vulnérabilités', price: 'Sur devis' },
      { name: "Contrôle d'accès", description: 'Systèmes biométriques et badgeuses', price: 'Sur devis' },
    ]
  },
  {
    id: 'developpement',
    name: 'Développement Digital',
    icon: Code,
    color: '#f59e0b',    // ambre
    description: 'Des solutions digitales sur mesure pour booster votre activité',
    services: [
      { name: 'Sites web & e-commerce', description: 'Création de sites vitrine et boutiques en ligne', price: 'Sur devis' },
      { name: 'Applications mobiles', description: 'iOS/Android, React Native', price: 'Sur devis' },
      { name: 'ERP sur mesure', description: 'Solutions ERP adaptées à votre secteur', price: 'Sur devis' },
      { name: 'API & intégrations', description: 'Création d’API REST', price: 'Sur devis' },
    ]
  },
  {
    id: 'cloud',
    name: 'Cloud & Hébergement',
    icon: Cloud,
    color: '#8b5cf6',    // violet
    description: 'Infrastructures cloud scalable et sécurisées',
    services: [
      { name: 'Hébergement cloud', description: 'Haute disponibilité 99.9% uptime', price: 'Sur devis' },
      { name: 'Migration cloud', description: 'Migration de vos infrastructures', price: 'Sur devis' },
      { name: 'DevOps', description: 'CI/CD, Docker, Kubernetes', price: 'Sur devis' },
      { name: 'SaaS personnalisé', description: 'Solutions SaaS clé en main', price: 'Sur devis' },
    ]
  },
  {
    id: 'energie',
    name: 'Énergie & Équipements',
    icon: Sun,
    color: '#f97316',    // orange
    description: 'Solutions énergétiques durables et équipements haute performance',
    services: [
      { name: 'Panneaux solaires', description: 'Installation de systèmes photovoltaïques', price: 'Sur devis' },
      { name: 'Climatisation', description: 'Solutions pour bureaux et data centers', price: 'Sur devis' },
      { name: 'Onduleurs & UPS', description: 'Protection électrique et alimentation de secours', price: 'Sur devis' },
      { name: 'Maintenance énergétique', description: 'Contrats préventifs et correctifs', price: 'Sur devis' },
    ]
  },
  {
    id: 'materiel',
    name: 'Vente de Matériel',
    icon: Monitor,
    color: '#ec4899',    // rose
    description: 'Matériel IT professionnel des meilleures marques',
    services: [
      { name: 'Ordinateurs & serveurs', description: 'PC, laptops, serveurs haute performance', price: 'Sur devis' },
      { name: 'Équipements réseau', description: 'Switches, routeurs, firewalls', price: 'Sur devis' },
      { name: 'Caméras de surveillance', description: 'Caméras IP, 4K, PTZ avec IA', price: 'Sur devis' },
      { name: 'Accessoires IT', description: 'Écrans, périphériques, câblage', price: 'Sur devis' },
    ]
  },
  {
    id: 'formation',
    name: 'Formation & Accompagnement',
    icon: BookOpen,
    color: '#10b981',    // émeraude
    description: 'Formation et support pour maîtriser vos outils digitaux',
    services: [
      { name: 'Formation IT', description: 'Formations certifiantes en développement, réseau, sécurité', price: 'Sur devis' },
      { name: 'Support technique', description: 'Assistance technique réactive 24/7', price: 'Sur devis' },
      { name: 'Accompagnement digital', description: 'Conseil dans votre transformation digitale', price: 'Sur devis' },
      { name: 'Maintenance', description: 'Contrats de maintenance pour équipements et logiciels', price: 'Sur devis' },
    ]
  }
];

const ServiceCard = ({ service, color, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="service-card"
    >
      <div className="service-card-header">
        <div className="service-card-icon" style={{ backgroundColor: color }}>
          <CheckCircle size={22} color="#fff" />
        </div>
        <span className="service-card-price">{service.price}</span>
      </div>
      <h3 className="service-card-title">{service.name}</h3>
      <p className="service-card-description">{service.description}</p>
      <Link to="/demander-devis" className="service-card-link">
        Demander un devis <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
};

const CategorySection = ({ category, index }) => {
  return (
    <div className="category-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="category-header"
        >
          <div className="category-title-wrapper">
            <div className="category-icon" style={{ backgroundColor: category.color }}>
              <category.icon size={28} color="#fff" />
            </div>
            <div>
              <h2 className="category-name">{category.name}</h2>
              <div className="category-underline" style={{ backgroundColor: category.color }} />
            </div>
          </div>
          <span className="category-count">4 services disponibles</span>
        </motion.div>
        <p className="category-description">{category.description}</p>
        <div className="services-grid">
          {category.services.map((service, idx) => (
            <ServiceCard key={idx} service={service} color={category.color} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ServicesPage = () => {
  return (
    <>
      <style>{`
        /* Styles globaux – identiques à Contact */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .section {
          padding: 4rem 0;
        }

        /* Hero avec image (400px) */
        .services-hero {
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

        /* Statistiques clés – mêmes cartes que Contact */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .stat-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1);
        }
        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          margin-bottom: 0.25rem;
        }
        .stat-label {
          color: #475569;
          font-size: 0.875rem;
        }

        /* Navigation rapide */
        .quick-nav {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 3rem;
        }
        .quick-nav-link {
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s;
          background: white;
          border: 1px solid #e2e8f0;
          color: #1e293b;
        }
        .quick-nav-link:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }

        /* Sections catégories */
        .category-section {
          padding: 3rem 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .category-section:last-child {
          border-bottom: none;
        }
        .category-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }
        .category-title-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .category-icon {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }
        .category-icon:hover {
          transform: scale(1.05);
        }
        .category-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          font-family: 'Syne', sans-serif;
        }
        .category-underline {
          width: 3rem;
          height: 0.25rem;
          border-radius: 9999px;
          margin-top: 0.5rem;
        }
        .category-count {
          color: #64748b;
          font-size: 0.875rem;
        }
        .category-description {
          color: #475569;
          max-width: 600px;
          margin-bottom: 2rem;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem;
        }
        .service-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.5rem;
          transition: all 0.3s;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }
        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1);
          border-color: #cbd5e1;
        }
        .service-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .service-card-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }
        .service-card:hover .service-card-icon {
          transform: scale(1.05);
        }
        .service-card-price {
          font-size: 0.75rem;
          font-weight: 600;
          background: #f1f5f9;
          color: #475569;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
        }
        .service-card-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }
        .service-card-description {
          color: #475569;
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: 1rem;
        }
        .service-card-link {
          color: #f59e0b;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          transition: gap 0.2s;
        }
        .service-card-link:hover {
          gap: 0.5rem;
        }

        /* CTA finale */
        .final-cta {
          text-align: center;
          padding: 4rem 0;
          background: #f8fafc;
          margin-top: 2rem;
        }
        .cta-title {
          font-size: 2rem;
          font-weight: 700;
          color: #0f172a;
          font-family: 'Syne', sans-serif;
          margin-bottom: 0.5rem;
        }
        .cta-description {
          color: #475569;
          max-width: 500px;
          margin: 0 auto 2rem;
        }

        @media (max-width: 900px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .category-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .services-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Hero avec image – exactement comme Contact */}
      <div className="services-hero">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="hero-title"
          >
            Nos Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-subtitle"
          >
            Des solutions complètes pour la transformation digitale de votre entreprise
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hero-buttons"
          >
            <Link to="/contact" className="btn-primary">
              Contactez un expert <ArrowRight size={18} />
            </Link>
            <Link to="/realisations" className="btn-outline">
              Voir nos réalisations <CheckCircle size={18} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Statistiques clés – fond blanc, cartes blanches */}
      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#3b82f6' }}>7+</div>
            <div className="stat-label">Catégories de services</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#06b6d4' }}>28+</div>
            <div className="stat-label">Services proposés</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#f59e0b' }}>150+</div>
            <div className="stat-label">Clients satisfaits</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#10b981' }}>24/7</div>
            <div className="stat-label">Support technique</div>
          </div>
        </div>
      </div>

      {/* Navigation rapide (filtres par catégorie) */}
      <div className="container">
        <div className="quick-nav">
          {serviceCategories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="quick-nav-link"
              style={{ backgroundColor: `${cat.color}10`, color: cat.color, borderColor: `${cat.color}30` }}
            >
              {cat.name}
            </a>
          ))}
        </div>
      </div>

      {/* Liste des catégories */}
      <div className="container">
        {serviceCategories.map((category, idx) => (
          <div key={idx} id={category.id}>
            <CategorySection category={category} index={idx} />
          </div>
        ))}
      </div>

      {/* CTA finale – fond gris clair comme dans Contact */}
      <div className="final-cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#eef2ff', color: '#3b82f6', padding: '0.25rem 1rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              <Rocket size={14} /> Besoin d'un service personnalisé ?
            </div>
            <h2 className="cta-title">Vous avez un projet spécifique ?</h2>
            <p className="cta-description">
              Notre équipe d'experts est à votre écoute pour étudier votre besoin et vous proposer une solution sur mesure.
            </p>
            <Link to="/contact" className="btn-primary">
              Contactez-nous <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;