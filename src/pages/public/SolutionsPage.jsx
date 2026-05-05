// src/pages/SolutionsPage.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowRight, CheckCircle, Clock, Headphones, Layers, Rocket, ChevronRight,
  Building2, ShoppingCart, Smartphone, Sun, GraduationCap, Camera, Snowflake, Wrench,
  X, Sparkles, Phone, DollarSign
} from 'lucide-react';

// Monnaie
const CURRENCY = 'FC';

const packs = [
  {
    id: 'entreprise',
    name: 'Pack Entreprise',
    tagline: 'La solution complète pour les grandes entreprises',
    icon: Building2,
    color: '#3b82f6',
    price: CURRENCY === 'FC' ? 'À partir de 5 000 000 FC' : 'À partir de 2 500 $',
    priceRange: CURRENCY === 'FC' ? '5M - 20M FC' : '2 500 - 10 000 $',
    popular: true,
    description: 'Une infrastructure IT complète pour les entreprises de taille moyenne à grande.',
    features: [
      'Infrastructure réseau complète (fibre + WiFi entreprise)',
      'Sécurité avancée (Firewall, antivirus, sauvegarde)',
      'ERP sur mesure adapté à votre secteur',
      'Serveurs dédiés et cloud privé',
      'Support technique 24/7 avec SLA',
      'Formation des équipes (20 personnes)',
      'Maintenance préventive et corrective',
      'Téléphonie d\'entreprise VoIP'
    ],
    bonus: '✅ Audit de sécurité offert'
  },
  {
    id: 'ecommerce',
    name: 'Pack E-commerce',
    tagline: 'Vendez en ligne avec une boutique professionnelle',
    icon: ShoppingCart,
    color: '#06b6d4',
    price: CURRENCY === 'FC' ? 'À partir de 1 500 000 FC' : 'À partir de 750 $',
    priceRange: CURRENCY === 'FC' ? '1.5M - 5M FC' : '750 - 2 500 $',
    popular: false,
    description: 'Une boutique en ligne performante pour développer vos ventes sur internet.',
    features: [
      'Site e-commerce complet (jusqu\'à 1000 produits)',
      'Design responsive et moderne',
      'Paiement sécurisé (Mobile Money, Carte, Orange Money)',
      'Gestion des stocks et commandes',
      'Dashboard administrateur',
      'SEO optimisé pour le référencement',
      'Intégration des réseaux sociaux',
      'Formation à l\'administration du site'
    ],
    bonus: '✅ 3 mois de maintenance offerts'
  },
  {
    id: 'digital',
    name: 'Pack Digital Complet',
    tagline: 'La transformation digitale totale de votre entreprise',
    icon: Smartphone,
    color: '#f59e0b',
    price: CURRENCY === 'FC' ? 'À partir de 8 000 000 FC' : 'À partir de 4 000 $',
    priceRange: CURRENCY === 'FC' ? '8M - 30M FC' : '4 000 - 15 000 $',
    popular: true,
    description: 'Une solution tout-en-un pour digitaliser l\'ensemble de vos processus.',
    features: [
      'Site web vitrine + Application mobile',
      'CRM et ERP intégrés',
      'Solution cloud complète',
      'Cybersécurité avancée',
      'Stratégie digitale et SEO',
      'Formation complète des équipes',
      'Support prioritaire 24/7',
      'Dashboard de pilotage en temps réel'
    ],
    bonus: '✅ Audit digital offert + 6 mois de maintenance'
  },
  {
    id: 'energie',
    name: 'Pack Énergie Solaire',
    tagline: 'Économisez avec une énergie propre et durable',
    icon: Sun,
    color: '#f97316',
    price: CURRENCY === 'FC' ? 'À partir de 3 000 000 FC' : 'À partir de 1 500 $',
    priceRange: CURRENCY === 'FC' ? '3M - 15M FC' : '1 500 - 7 500 $',
    popular: false,
    description: 'Solutions solaires pour réduire votre facture énergétique.',
    features: [
      'Installation de panneaux solaires (5-50 kWp)',
      'Onduleurs et batteries de stockage',
      'Système de monitoring à distance',
      'Éclairage public solaire',
      'Maintenance préventive',
      'Étude de faisabilité gratuite',
      'Garantie 5 ans sur les équipements',
      'Financement possible'
    ],
    bonus: '✅ Énergie gratuite pendant 25 ans'
  },
  {
    id: 'formation',
    name: 'Pack Formation',
    tagline: 'Montez en compétences avec nos formations certifiantes',
    icon: GraduationCap,
    color: '#10b981',
    price: CURRENCY === 'FC' ? 'À partir de 500 000 FC' : 'À partir de 250 $',
    priceRange: CURRENCY === 'FC' ? '500K - 3M FC' : '250 - 1 500 $',
    popular: false,
    description: 'Formez vos équipes aux technologies digitales.',
    features: [
      'Formation en développement web et mobile',
      'Formation en cybersécurité',
      'Formation en marketing digital',
      'Formation en cloud computing',
      'Certification reconnue',
      'Support post-formation',
      'Accès à la plateforme e-learning',
      'Suivi personnalisé'
    ],
    bonus: '✅ 5 places offertes pour 10 inscrits'
  },
  {
    id: 'camera',
    name: 'Pack Caméra de Surveillance',
    tagline: 'Protection 360° pour votre entreprise',
    icon: Camera,
    color: '#a855f7',
    price: CURRENCY === 'FC' ? 'À partir de 2 000 000 FC' : 'À partir de 1 000 $',
    priceRange: CURRENCY === 'FC' ? '2M - 8M FC' : '1 000 - 4 000 $',
    popular: false,
    description: 'Un système de surveillance complet pour sécuriser vos locaux 24h/24.',
    features: [
      'Caméras IP 4K (4 à 16 caméras)',
      'Enregistreur vidéo (NVR) haute capacité',
      'Vision nocturne jusqu\'à 30 mètres',
      'Détection de mouvement et alertes en temps réel',
      'Accès à distance via application mobile',
      'Stockage cloud sécurisé (30 jours)',
      'Installation et câblage professionnel',
      'Support technique inclus'
    ],
    bonus: '✅ 1 an de stockage cloud offert'
  },
  {
    id: 'climatisation',
    name: 'Pack Climatisation',
    tagline: 'Confort thermique et économies d\'énergie',
    icon: Snowflake,
    color: '#14b8a6',
    price: CURRENCY === 'FC' ? 'À partir de 3 500 000 FC' : 'À partir de 1 800 $',
    priceRange: CURRENCY === 'FC' ? '3.5M - 12M FC' : '1 800 - 6 000 $',
    popular: false,
    description: 'Solutions de climatisation performantes pour vos bureaux.',
    features: [
      'Climatiseurs split ou gainables (2 à 8 unités)',
      'Installation par des techniciens certifiés',
      'Maintenance préventive annuelle incluse',
      'Garantie 3 ans sur les équipements',
      'Télécommande et programmation',
      'Filtres antibactériens et purification d\'air',
      'Consommation énergétique optimisée',
      'Support après-vente réactif'
    ],
    bonus: '✅ 2 ans de maintenance gratuite'
  },
  {
    id: 'salle-informatique',
    name: 'Pack Installation de salle informatique',
    tagline: 'Performance, fiabilité et sécurité pour votre infrastructure IT',
    icon: Wrench,
    color: '#14b8a6',
    price: CURRENCY === 'FC' ? 'À partir de 4 500 000 FC' : 'À partir de 2 300 $',
    priceRange: CURRENCY === 'FC' ? '4.5M - 15M FC' : '2 300 - 7 500 $',
    popular: false,
    description: 'Solutions complètes pour l’aménagement et l’équipement de salles informatiques professionnelles.',
    features: [
      'Câblage structuré cuivre / fibre optique (jusqu’à 24 points)',
      'Baies de brassage et armoires serveur 19 pouces',
      'Postes de travail complets (PC, écrans, claviers, souris)',
      'Switch réseau PoE + routeur professionnel',
      'Onduleurs avec régulation de tension',
      'Système de refroidissement adapté (climatisation / ventilation)',
      'Mise en conformité électrique (prises, disjoncteurs, parafoudre)',
      'Support technique pendant 1 an'
    ],
    bonus: '✅ Audit gratuit de la salle avant installation'
  }
];

const comparisonFeatures = [
  'Infrastructure réseau', 'Sécurité avancée', 'Application mobile',
  'ERP intégré', 'Support 24/7', 'Formation incluse', 'Maintenance', 'Cloud',
  'Vidéosurveillance', 'Climatisation', 'Énergie solaire'
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const SolutionsPage = () => {
  return (
    <>
      <style>{`
        /* Styles globaux – identiques à Contact */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* Hero avec image 400px */
        .solutions-hero {
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

        /* Grilles de cartes (blanches) */
        .cards-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .cards-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .info-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }
        .info-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1);
          border-color: #cbd5e1;
        }
        .card-icon {
          width: 3.5rem;
          height: 3.5rem;
          margin: 0 auto 1rem;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }
        .info-card:hover .card-icon {
          transform: scale(1.05);
        }

        /* Pack cards */
        .packs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        .pack-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.3s;
          position: relative;
        }
        .pack-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1);
        }
        .pack-popular {
          border: 2px solid #3b82f6;
          box-shadow: 0 4px 6px -1px rgba(59,130,246,0.2);
        }
        .popular-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #3b82f6;
          color: white;
          font-size: 0.75rem;
          font-weight: bold;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
        }
        .pack-content {
          padding: 1.5rem;
        }
        .pack-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }
        .pack-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pack-price {
          text-align: right;
        }
        .pack-price-main {
          font-size: 1.25rem;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          color: #0f172a;
        }
        .pack-price-range {
          font-size: 0.75rem;
          color: #64748b;
        }
        .pack-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.25rem;
        }
        .pack-tagline {
          color: #3b82f6;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .pack-description {
          color: #475569;
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: 1rem;
        }
        .features-list {
          margin-bottom: 1rem;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #475569;
          margin-bottom: 0.5rem;
        }
        .bonus-box {
          background: #f8fafc;
          border-radius: 0.75rem;
          padding: 0.75rem;
          margin-bottom: 1rem;
        }
        .pack-actions {
          display: flex;
          gap: 0.75rem;
        }
        .btn-devis {
          flex: 1;
          background: #3b82f6;
          color: white;
          padding: 0.625rem;
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 0.875rem;
          text-align: center;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-devis:hover {
          background: #2563eb;
          transform: scale(1.02);
        }
        .btn-contact {
          padding: 0.625rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          color: #1e293b;
          transition: all 0.2s;
        }
        .btn-contact:hover {
          background: #f1f5f9;
          transform: scale(1.02);
        }

        /* Comparison cards */
        .comparison-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        .comparison-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          overflow: hidden;
          transition: all 0.2s;
        }
        .comparison-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
        }
        .comparison-header {
          padding: 1rem;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
        }
        .comparison-body {
          padding: 0.75rem;
        }
        .comparison-feature {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .comparison-feature:last-child {
          border-bottom: none;
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

        @media (max-width: 1024px) {
          .cards-grid-4 {
            grid-template-columns: repeat(2, 1fr);
          }
          .packs-grid, .comparison-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .packs-grid, .cards-grid-2, .cards-grid-4, .comparison-grid {
            grid-template-columns: 1fr;
          }
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>

      {/* Hero avec image 400px */}
      <div className="solutions-hero">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="hero-title"
          >
            Nos Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-subtitle"
          >
            Des packs complets et prêts à déployer pour accélérer votre croissance
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hero-buttons"
          >
            <Link to="/contact" className="btn-primary">
              Tous nos packs <ArrowRight size={18} />
            </Link>
            <Link to="/audit" className="btn-outline">
              Audit gratuit <CheckCircle size={18} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Pourquoi choisir nos packs */}
      <div className="container" style={{ marginTop: '3rem' }}>
        <div className="cards-grid-4">
          {[
            { icon: CheckCircle, title: 'Clé en main', desc: 'Solutions prêtes à déployer', color: '#3b82f6' },
            { icon: Clock, title: 'Déploiement rapide', desc: 'Installation en quelques jours', color: '#06b6d4' },
            { icon: DollarSign, title: 'Tarifs transparents', desc: `Sans frais cachés (en ${CURRENCY})`, color: '#f59e0b' },
            { icon: Headphones, title: 'Support inclus', desc: 'Assistance 24/7', color: '#10b981' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="info-card"
            >
              <div className="card-icon" style={{ backgroundColor: item.color }}>
                <item.icon size={24} color="white" />
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1.125rem', color: '#0f172a', marginBottom: '0.5rem' }}>{item.title}</h3>
              <p style={{ color: '#475569', fontSize: '0.875rem' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Grille des packs */}
      <div className="container" style={{ margin: '3rem auto' }}>
        <div className="packs-grid">
          {packs.map((pack, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={`pack-card ${pack.popular ? 'pack-popular' : ''}`}
            >
              {pack.popular && <div className="popular-badge">⭐ Populaire</div>}
              <div className="pack-content">
                <div className="pack-header">
                  <div className="pack-icon" style={{ backgroundColor: pack.color }}>
                    <pack.icon size={24} color="white" />
                  </div>
                  <div className="pack-price">
                    <div className="pack-price-main">{pack.price}</div>
                    <div className="pack-price-range">{pack.priceRange}</div>
                  </div>
                </div>
                <div className="pack-title">{pack.name}</div>
                <div className="pack-tagline">{pack.tagline}</div>
                <div className="pack-description">{pack.description}</div>
                <div className="features-list">
                  {pack.features.slice(0, 5).map((feature, i) => (
                    <div key={i} className="feature-item">
                      <CheckCircle size={14} style={{ color: '#10b981' }} />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {pack.features.length > 5 && (
                    <div className="feature-item" style={{ color: '#64748b', fontSize: '0.75rem' }}>
                      +{pack.features.length - 5} autres services
                    </div>
                  )}
                </div>
                <div className="bonus-box">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sparkles size={14} style={{ color: '#f59e0b' }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0f172a' }}>🎁 Offre spéciale</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#1e293b', marginTop: '0.25rem' }}>{pack.bonus}</p>
                </div>
                <div className="pack-actions">
                  <Link to="/devis" className="btn-devis">Demander un devis</Link>
                  <Link to="/contact" className="btn-contact">
                    <Phone size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Comparaison des packs */}
      <div className="container" style={{ margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 1rem', borderRadius: '9999px', background: '#eef2ff', color: '#3b82f6', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            <Layers size={14} /> Comparaison
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', fontFamily: 'Syne, sans-serif', marginBottom: '0.5rem' }}>Comparez nos packs</h2>
          <p style={{ color: '#475569', maxWidth: 600, margin: '0 auto' }}>Trouvez la solution qui correspond le mieux à vos besoins</p>
        </div>

        <div className="comparison-grid">
          {packs.map((pack, idx) => {
            const hasFeature = (feature) => {
              return pack.features.some(f => f.toLowerCase().includes(feature.toLowerCase()) ||
                (feature === 'Infrastructure réseau' && (f.includes('réseau') || f.includes('fibre'))) ||
                (feature === 'Sécurité avancée' && (f.includes('Sécurité') || f.includes('Firewall'))) ||
                (feature === 'Application mobile' && f.includes('mobile')) ||
                (feature === 'ERP intégré' && f.includes('ERP')) ||
                (feature === 'Support 24/7' && f.includes('Support')) ||
                (feature === 'Formation incluse' && f.includes('Formation')) ||
                (feature === 'Maintenance' && f.includes('Maintenance')) ||
                (feature === 'Cloud' && f.includes('cloud')) ||
                (feature === 'Vidéosurveillance' && (f.includes('Caméra') || f.includes('surveillance'))) ||
                (feature === 'Climatisation' && (f.includes('Climatisation') || f.includes('Climatiseur'))) ||
                (feature === 'Énergie solaire' && (f.includes('solaire') || f.includes('panneaux')))
              );
            };
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
                className="comparison-card"
              >
                <div className="comparison-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="pack-icon" style={{ backgroundColor: pack.color, width: '2rem', height: '2rem' }}>
                      <pack.icon size={16} color="white" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '0.875rem', color: '#0f172a' }}>{pack.name}</div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{pack.priceRange.split(' - ')[0]}</div>
                    </div>
                  </div>
                </div>
                <div className="comparison-body">
                  {comparisonFeatures.map((feature, fIdx) => (
                    <div key={fIdx} className="comparison-feature">
                      <span style={{ fontSize: '0.7rem', color: '#475569' }}>{feature}</span>
                      {hasFeature(feature) ? (
                        <CheckCircle size={12} style={{ color: '#10b981' }} />
                      ) : (
                        <X size={12} style={{ color: '#cbd5e1' }} />
                      )}
                    </div>
                  ))}
                </div>
                <div style={{ padding: '0.75rem', borderTop: '1px solid #e2e8f0' }}>
                  <Link to="/demander-devis" className="btn-devis" style={{ fontSize: '0.75rem', padding: '0.5rem' }}>Demander un devis</Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem', fontSize: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle size={12} style={{ color: '#10b981' }} />
            <span style={{ color: '#475569' }}>Inclus</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <X size={12} style={{ color: '#cbd5e1' }} />
            <span style={{ color: '#475569' }}>Non inclus</span>
          </div>
        </div>
      </div>

      {/* CTA finale */}
      <div className="final-cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#eef2ff', color: '#3b82f6', padding: '0.25rem 1rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              <Rocket size={14} /> Besoin d'un pack personnalisé ?
            </div>
            <h2 className="cta-title">Vous avez un besoin spécifique ?</h2>
            <p className="cta-description">
              Notre équipe peut créer un pack sur mesure adapté exactement à vos besoins et à votre budget.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/contact" className="btn-primary">
                Contactez-nous <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="btn-outline" style={{ borderColor: '#cbd5e1', color: '#1e293b' }}>
                Voir tous les services <ChevronRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SolutionsPage;