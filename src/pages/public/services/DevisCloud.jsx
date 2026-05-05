// src/pages/DevisCloud.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, CheckCircle, ChevronLeft } from 'lucide-react';

const SERVICES = [
  'Hébergement cloud scalable (AWS/Azure/GCP)',
  'Serveurs dédiés & VPS',
  'Sécurité & sauvegarde cloud',
  'Migration assistée vers le cloud',
  'Pack Start (49€/mois)',
  'Pack Business (129€/mois)',
  'Pack Enterprise (Sur devis)',
  'Solution personnalisée',
];

const BUDGETS = [
  'Moins de 500€ / mois',
  '500€ – 1 000€ / mois',
  '1 000€ – 5 000€ / mois',
  '5 000€ – 10 000€ / mois',
  'Plus de 10 000€ / mois',
  'Je ne sais pas encore',
];

const TYPES_PROJET = [
  'Migration complète',
  'Nouvelle infrastructure',
  'Optimisation des coûts',
  'Sécurité & conformité',
  'Autre',
];

const EMPTY_FORM = {
  nom: '', email: '', telephone: '', entreprise: '',
  service: '', budget: '', dateSouhaitee: '', typeProjet: '', message: '',
};

const DevisCloud = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log('Devis cloud :', formData);
      setSubmitted(true);
      setLoading(false);
      setTimeout(() => {
        setSubmitted(false);
        setFormData(EMPTY_FORM);
      }, 3500);
    }, 1500);
  };

  return (
    <>
      <style>{`
        /* ===== STYLES IDENTIQUES AUX AUTRES PAGES ===== */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .devis-hero {
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
          border: none;
          cursor: pointer;
        }
        .btn-primary:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        }
        .form-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1.5rem;
          padding: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
          margin: 2rem 0;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          color: #334155;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          background: white;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
        }
        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1rem;
        }
        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s;
          margin-top: 1rem;
        }
        .back-link:hover {
          color: #3b82f6;
        }
        @media (max-width: 768px) {
          .grid-2 {
            grid-template-columns: 1fr;
          }
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .form-card {
            padding: 1.5rem;
          }
        }
      `}</style>

      {/* ===== HERO 400px ===== */}
      <div className="devis-hero">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="hero-title"
          >
            Devis{' '}
            <span className="hero-highlight">Cloud & Hébergement</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-subtitle"
          >
            Un expert cloud vous recontactera sous 24h avec une offre personnalisée.
          </motion.p>
        </div>
      </div>

      {/* ===== FORMULAIRE ===== */}
      <div className="container">
        <div className="form-card">
          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ textAlign: 'center', padding: '2rem 0' }}
            >
              <CheckCircle size={64} color="#10b981" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                Demande envoyée !
              </h3>
              <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
                Merci, nous vous contacterons sous 24h avec un devis personnalisé.
              </p>
              <Link to="/cloud-hebergement" className="btn-primary">
                Retour à la page Cloud
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Coordonnées */}
              <div className="form-group">
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.25rem', marginBottom: '1rem', color: '#0f172a' }}>Coordonnées</h3>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Nom complet *</label>
                  <input type="text" name="nom" className="form-input" value={formData.nom} onChange={handleChange} required placeholder="Jean Dupont" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email professionnel *</label>
                  <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} required placeholder="jean@entreprise.com" />
                </div>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Téléphone *</label>
                  <input type="tel" name="telephone" className="form-input" value={formData.telephone} onChange={handleChange} required placeholder="+33 6 12 34 56 78" />
                </div>
                <div className="form-group">
                  <label className="form-label">Entreprise / Organisation</label>
                  <input type="text" name="entreprise" className="form-input" value={formData.entreprise} onChange={handleChange} placeholder="Nom de votre entreprise" />
                </div>
              </div>

              <hr style={{ margin: '1.5rem 0', borderColor: '#e2e8f0' }} />

              {/* Détails du projet */}
              <div className="form-group">
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.25rem', marginBottom: '1rem', color: '#0f172a' }}>Détails du projet</h3>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Service souhaité *</label>
                  <select name="service" className="form-select" value={formData.service} onChange={handleChange} required>
                    <option value="">Sélectionnez un service</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Budget estimé *</label>
                  <select name="budget" className="form-select" value={formData.budget} onChange={handleChange} required>
                    <option value="">Sélectionnez un budget</option>
                    {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Date de mise en production</label>
                  <input type="date" name="dateSouhaitee" className="form-input" value={formData.dateSouhaitee} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Type de projet</label>
                  <select name="typeProjet" className="form-select" value={formData.typeProjet} onChange={handleChange}>
                    <option value="">Sélectionnez</option>
                    {TYPES_PROJET.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description & besoins spécifiques</label>
                <textarea name="message" className="form-textarea" value={formData.message} onChange={handleChange} placeholder="Décrivez votre infrastructure actuelle, vos contraintes techniques, vos objectifs, le nombre d'utilisateurs..." />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }} disabled={loading}>
                {loading ? 'Envoi en cours...' : <>Envoyer ma demande de devis <Send size={16} /></>}
              </button>
              <p style={{ fontSize: '0.7rem', color: '#64748b', textAlign: 'center', marginTop: '1rem' }}>
                En soumettant ce formulaire, vous acceptez que vos données soient traitées pour vous recontacter.
                Un devis personnalisé vous sera envoyé sous 24h ouvrées.
              </p>
            </form>
          )}
        </div>

        <Link to="/cloud-hebergement" className="back-link">
          <ChevronLeft size={16} /> Retour à la page Cloud & Hébergement
        </Link>
      </div>
    </>
  );
};

export default DevisCloud;