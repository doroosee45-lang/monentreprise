// src/pages/Inscription.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  GraduationCap, User, Mail, Phone, MapPin, Calendar, DollarSign,
  MessageSquare, Send, CheckCircle, ArrowRight, ArrowLeft
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const Inscription = () => {
  const [formData, setFormData] = useState({
    nom: '', email: '', telephone: '', formation: '',
    centre: '', disponibilite: '', financement: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          nom: '', email: '', telephone: '', formation: '',
          centre: '', disponibilite: '', financement: '', message: ''
        });
      }, 4000);
    }, 1600);
  };

  const formationsList = [
    'Réseaux & Infrastructure', 'Cybersécurité', 'Cloud & Virtualisation',
    'Développement DevOps', 'Soft skills IT', 'Préparation certifications'
  ];
  const centresList = ['Paris', 'Lyon', 'Bordeaux'];
  const disponibilitesList = [
    'Matin (9h–12h)', 'Après-midi (14h–17h)', 'Soir (18h–21h)',
    'Week-end', 'Intra-entreprise (dates à définir)'
  ];
  const financementsList = [
    'Entreprise (OPCO, plan de formation)', 'CPF (Compte Personnel de Formation)',
    'Financement personnel', 'Pôle Emploi / AIF', 'Je ne sais pas encore'
  ];

  const fields = ['nom', 'email', 'telephone', 'formation', 'centre', 'disponibilite', 'financement'];
  const filled = fields.filter(k => formData[k]).length;
  const pct = Math.round((filled / fields.length) * 100);

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
          color: #1e293b;
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
        .progress-bar {
          margin-bottom: 1.5rem;
        }
        .progress-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.7rem;
          color: #64748b;
          margin-bottom: 0.25rem;
        }
        .progress-track {
          background: #e2e8f0;
          border-radius: 9999px;
          height: 0.375rem;
          overflow: hidden;
        }
        .progress-fill {
          background: #3b82f6;
          height: 100%;
          border-radius: 9999px;
          width: 0%;
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
            Rejoignez{' '}
            <span className="hero-highlight">nos formations</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-subtitle"
          >
            Remplissez le formulaire ci-dessous. Un conseiller vous recontactera
            sous <strong>24h</strong> pour valider votre inscription.
          </motion.p>
        </div>
      </div>

      {/* ===== FORMULAIRE ===== */}
      <div className="container">
        <div className="form-card">
          {/* Barre de progression */}
          <div className="progress-bar">
            <div className="progress-label">
              <span>Progression</span>
              <span>{pct}%</span>
            </div>
            <div className="progress-track">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ textAlign: 'center', padding: '2rem 0' }}
            >
              <CheckCircle size={64} color="#10b981" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                Inscription envoyée !
              </h3>
              <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
                Merci, notre équipe vous recontactera dans les plus brefs délais.
              </p>
              <Link to="/formation" className="btn-primary">
                Retour aux formations <ArrowRight size={16} />
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
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
                  <label className="form-label">Formation souhaitée *</label>
                  <select name="formation" className="form-select" value={formData.formation} onChange={handleChange} required>
                    <option value="">Sélectionnez une formation</option>
                    {formationsList.map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Centre de formation *</label>
                  <select name="centre" className="form-select" value={formData.centre} onChange={handleChange} required>
                    <option value="">Choisissez un centre</option>
                    {centresList.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Disponibilité *</label>
                  <select name="disponibilite" className="form-select" value={formData.disponibilite} onChange={handleChange} required>
                    <option value="">Choisissez une période</option>
                    {disponibilitesList.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Mode de financement *</label>
                <select name="financement" className="form-select" value={formData.financement} onChange={handleChange} required>
                  <option value="">Sélectionnez un mode de financement</option>
                  {financementsList.map(f => <option key={f}>{f}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message complémentaire</label>
                <textarea name="message" className="form-textarea" value={formData.message} onChange={handleChange} rows={4} placeholder="Informations supplémentaires, besoins spécifiques…" />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }} disabled={loading}>
                {loading ? (
                  <>Envoi en cours...</>
                ) : (
                  <>Envoyer ma demande d'inscription <Send size={16} /></>
                )}
              </button>
              <p style={{ fontSize: '0.7rem', color: '#64748b', textAlign: 'center', marginTop: '1rem' }}>
                En soumettant ce formulaire, vous acceptez que vos données soient traitées pour vous recontacter.<br />
                Conformément au RGPD, vous disposez d'un droit d'accès et de suppression.
              </p>
            </form>
          )}
        </div>

        <Link to="/formation" className="back-link">
          <ArrowLeft size={16} /> Retour aux formations
        </Link>
      </div>
    </>
  );
};

export default Inscription;