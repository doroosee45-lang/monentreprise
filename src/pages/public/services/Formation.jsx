// src/pages/Formation.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  GraduationCap, Users, BookOpen, Award, Clock, CheckCircle,
  ArrowRight, Calendar, Star, Quote, Shield, Cloud, Code,
  MapPin, Phone, Mail
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

// ========== DONNÉES ==========
const formationCards = [
  { title: 'Réseaux & Infrastructure', desc: 'Cisco, MikroTik, conception et dépannage avancé', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop', icon: BookOpen, color: '#3b82f6' },
  { title: 'Cybersécurité', desc: 'Protection des données, pare-feu, sensibilisation', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop', icon: Shield, color: '#06b6d4' },
  { title: 'Cloud & Virtualisation', desc: 'AWS, Azure, VMware, Docker', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop', icon: Cloud, color: '#8b5cf6' },
  { title: 'Développement DevOps', desc: 'CI/CD, Git, Python, automatisation', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop', icon: Code, color: '#f59e0b' },
  { title: 'Soft skills IT', desc: 'Gestion de projet agile, leadership technique', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop', icon: Users, color: '#10b981' },
  { title: 'Préparation certifications', desc: 'CCNA, Security+, Cloud Practitioner', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop', icon: Award, color: '#f59e0b' }
];

const acceleratedTrainings = [
  { title: 'Bootcamp Réseaux (5 jours)', duration: '40h', price: '1 490€ HT', start: '14 avril 2025', spots: 8, color: '#3b82f6' },
  { title: 'Cybersécurité intensive', duration: '35h', price: '1 790€ HT', start: '5 mai 2025', spots: 6, color: '#06b6d4' },
  { title: 'DevOps en 4 jours', duration: '32h', price: '1 590€ HT', start: '2 juin 2025', spots: 10, color: '#8b5cf6' }
];

const testimonials = [
  { name: 'Sophie Martin', role: 'Responsable Infrastructure', company: 'Groupe Logistique France', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', quote: 'La formation Réseaux a complètement monté en compétence mon équipe. Les cas pratiques sur du vrai matériel ont fait la différence.', rating: 5 },
  { name: 'Thomas Lefebvre', role: 'Admin Sys', company: 'Digital Solutions', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', quote: 'Formation Cybersécurité très concrète. Le formateur est un expert du terrain, je recommande vivement.', rating: 5 },
  { name: 'Amel Benali', role: 'DevOps Engineer', company: 'Startup Innov', photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop', quote: 'Le bootcamp DevOps m\'a permis d\'être opérationnelle en moins d\'une semaine. Un vrai accélérateur de carrière.', rating: 5 }
];

const stats = [
  { value: '1 200+', label: 'Élèves formés', icon: Users, color: '#3b82f6' },
  { value: '98%', label: 'Taux de satisfaction', icon: Star, color: '#f59e0b' },
  { value: '45+', label: 'Sessions par an', icon: Calendar, color: '#06b6d4' },
  { value: '15', label: 'Formateurs experts', icon: Award, color: '#8b5cf6' }
];

const centers = [
  { city: 'Paris', address: '123 avenue des Champs-Élysées, 75008', phone: '+33 1 23 45 67 89', email: 'paris@omdeve.com', color: '#3b82f6' },
  { city: 'Lyon', address: '45 rue de la République, 69002', phone: '+33 4 56 78 90 12', email: 'lyon@omdeve.com', color: '#8b5cf6' },
  { city: 'Bordeaux', address: '78 cours de l\'Intendance, 33000', phone: '+33 5 67 89 01 23', email: 'bordeaux@omdeve.com', color: '#06b6d4' }
];

const Formation = () => {
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
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .centers-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
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
        .training-item {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          transition: all 0.2s;
        }
        .training-item:hover {
          transform: translateX(4px);
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }
        .image-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          overflow: hidden;
        }
        .gallery-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
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
          .cards-grid, .stats-grid, .centers-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .double-cta {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 768px) {
          .cards-grid, .cards-grid-2, .stats-grid, .centers-grid, .double-cta {
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
            Montez en compétences{' '}
            <span className="hero-highlight">avec nos experts</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-subtitle"
          >
            Formations techniques et soft skills, en présentiel ou à distance, pour vos équipes IT.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hero-buttons"
          >
            <Link to="/devis" className="btn-primary">Demander un catalogue <ArrowRight size={18} /></Link>
            <Link to="/contact" className="btn-outline">Parler à un conseiller</Link>
          </motion.div>
        </div>
      </div>

      {/* ===== NOS FORMATIONS ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">📚 Nos formations</div>
          <h2 className="section-title">Nos formations</h2>
          <div className="divider"></div>
        </div>
        <div className="cards-grid">
          {formationCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="card"
                style={{ textAlign: 'left', alignItems: 'flex-start' }}
              >
                <div className="card-icon" style={{ backgroundColor: `${card.color}15`, color: card.color }}>
                  <Icon size={24} />
                </div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-text">{card.desc}</p>
                <Link to="/inscription" style={{ color: card.color, fontSize: '0.875rem', fontWeight: 500, marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  S'inscrire <ArrowRight size={14} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ===== STATISTIQUES ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">📊 Chiffres clés</div>
          <h2 className="section-title">Nos élèves en chiffres</h2>
          <div className="divider"></div>
        </div>
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

      {/* ===== FORMATIONS ACCÉLÉRÉES + IMAGE ===== */}
      <div className="container">
        <div className="cards-grid-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
            style={{ textAlign: 'left', alignItems: 'flex-start' }}
          >
            <div className="section-badge" style={{ marginBottom: '1rem' }}>⚡ Accéléré</div>
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Formations accélérées</h2>
            <p className="card-text" style={{ marginBottom: '1rem' }}>
              Des bootcamps intensifs de 2 à 5 jours pour monter en compétences rapidement.
              Travaux pratiques sur cas réels, formateurs experts et petit groupe.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
              {acceleratedTrainings.map((training, i) => (
                <div key={i} className="training-item">
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{training.title}</div>
                    <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.7rem', color: '#64748b' }}>
                      <span><Clock size={12} style={{ display: 'inline', marginRight: '0.25rem' }} /> {training.duration}</span>
                      <span><Calendar size={12} style={{ display: 'inline', marginRight: '0.25rem' }} /> {training.start}</span>
                      <span>{training.spots} places</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontWeight: 'bold', color: training.color }}>{training.price}</span>
                    <Link to="/inscription" style={{ color: training.color }}>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/formations-accelerees" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
              Voir toutes nos sessions <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="image-card"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
              alt="Session de formation en présentiel"
              style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '250px' }}
            />
          </motion.div>
        </div>
      </div>

      {/* ===== TÉMOIGNAGES ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">🗣️ Témoignages</div>
          <h2 className="section-title">Ils ont suivi nos formations</h2>
          <div className="divider"></div>
        </div>
        <div className="cards-grid">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="testimonial-card"
              style={{ textAlign: 'left' }}
            >
              <Quote size={24} style={{ color: '#3b82f6', opacity: 0.5, marginBottom: '1rem' }} />
              <p className="card-text" style={{ fontStyle: 'italic', marginBottom: '1rem' }}>"{t.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src={t.photo} alt={t.name} style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{t.name}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{t.role}, {t.company}</div>
                  <div style={{ display: 'flex', gap: '0.1rem', marginTop: '0.25rem' }}>
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== CENTRES DE FORMATION ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">📍 Nous trouver</div>
          <h2 className="section-title">Nos centres de formation</h2>
          <div className="divider"></div>
        </div>
        <div className="centers-grid">
          {centers.map((center, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="card"
              style={{ textAlign: 'left', alignItems: 'flex-start' }}
            >
              <div className="card-icon" style={{ backgroundColor: `${center.color}15`, color: center.color }}>
                <MapPin size={24} />
              </div>
              <h3 className="card-title">{center.city}</h3>
              <p className="card-text">{center.address}</p>
              <div style={{ marginTop: '1rem', width: '100%' }}>
                <div className="card-text" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Phone size={14} style={{ color: center.color }} /> {center.phone}
                </div>
                <div className="card-text" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={14} style={{ color: center.color }} /> {center.email}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carte Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ borderRadius: '1rem', overflow: 'hidden', marginTop: '1rem' }}
        >
          <iframe
            title="Carte des centres OMDEVE"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.991440608414!2d2.292292615509614!3d48.85837360869918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1647863945678!5m2!1sfr!2sfr"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </motion.div>
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
              <GraduationCap size={24} color="white" />
            </div>
            <h3 className="card-title">Inscription en centre</h3>
            <p className="card-text">Rejoignez nos sessions en présentiel à Paris, Lyon ou Bordeaux.</p>
            <Link to="/inscription" className="btn-primary" style={{ marginTop: '1rem', background: '#3b82f6' }}>Je m'inscris <ArrowRight size={16} /></Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card"
            style={{ textAlign: 'center' }}
          >
            <div className="card-icon" style={{ backgroundColor: '#8b5cf6', margin: '0 auto 1rem' }}>
              <BookOpen size={24} color="white" />
            </div>
            <h3 className="card-title">Catalogue complet</h3>
            <p className="card-text">Recevez toutes nos formations par email.</p>
            <Link to="/devis" className="btn-primary" style={{ marginTop: '1rem', background: '#8b5cf6' }}>Télécharger <ArrowRight size={16} /></Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Formation;