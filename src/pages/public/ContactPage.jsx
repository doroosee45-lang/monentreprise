// src/pages/Contact.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MapPin, Phone, Mail, MessageCircle, Clock,
  Shield, Star, Briefcase, Handshake, Headphones, FileText, ArrowRight
} from 'lucide-react';
import api from '../../services/api';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const Contact = () => {
  const [form, setForm] = useState({
    nom: '',
    email: '',
    phone: '',
    objet: 'Demande d\'information',
    message: ''
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSent(false);

    try {
      await api.post('/contact', form);
      setSent(true);
      setForm({
        nom: '',
        email: '',
        phone: '',
        objet: 'Demande d\'information',
        message: ''
      });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error(err);
      let msg = err.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer plus tard.';
      if (err.response?.data?.code === 'EAUTH' || msg.includes('Invalid login') || msg.includes('Username and Password not accepted')) {
        msg = 'Erreur de configuration email. Notre équipe technique a été informée. Veuillez nous contacter directement par téléphone.';
      }
      setError(msg);
      setTimeout(() => setError(''), 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Données enrichies
  const contactInfo = [
    { icon: MapPin, title: 'Adresse', content: 'Avenue Kabmabre n°75, Lingwala, Kinshasa', link: 'https://maps.google.com/?q=Kinshasa+Lingwala', color: '#3b82f6' },
    { icon: Phone, title: 'Téléphone', content: '+243 555 503 59', link: 'tel:+24355550359', color: '#10b981' },
    { icon: Mail, title: 'Email', content: 'omedevservices@gmail.com', link: 'mailto:omedevservices@gmail.com', color: '#f97316' },
    { icon: MessageCircle, title: 'WhatsApp', content: '+243 555 503 59', link: 'https://wa.me/24355550359', color: '#10b981' }
  ];

  const hours = [
    { day: 'Lundi – Vendredi', time: '8h – 18h', open: true },
    { day: 'Samedi', time: '9h – 13h', open: true },
    { day: 'Dimanche', time: 'Fermé', open: false }
  ];

  const engagements = [
    { icon: Shield, text: '100% confidentiel' },
    { icon: Star, text: '4.9/5 satisfaction client' },
    { icon: Briefcase, text: '+150 projets IT livrés' },
    { icon: Handshake, text: 'Accompagnement sans engagement' }
  ];

  return (
    <>
      <style>{`
        /* Styles de base (version simple) */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .section {
          padding: 4rem 0;
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
        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          transition: all 0.2s;
          background: #fff;
        }
        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
        }
        .btn-primary {
          background: #3b82f6;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-primary:hover {
          background: #2563eb;
          transform: scale(1.02);
        }
        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid #fff;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .contact-main-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .cards-grid {
            grid-template-columns: 1fr !important;
          }
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
        /* Styles pour les cartes contact enrichies */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-top: -3rem;
          position: relative;
          z-index: 10;
          padding-bottom: 3rem;
        }
        .card-info {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }
        .card-info:hover {
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
        .card-info:hover .card-icon {
          transform: scale(1.05);
        }
        .card-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }
        .card-content {
          color: #475569;
          font-size: 0.875rem;
        }
        /* Sidebar styles */
        .sidebar-block {
          background: #f8fafc;
          border-radius: 1rem;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .info-title-icon {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.125rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 1rem;
        }
        .hours-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.6rem 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .hours-item:last-child {
          border-bottom: none;
        }
        .engagement-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .engagement-item:last-child {
          border-bottom: none;
        }
        .quick-response {
          background: #eff6ff;
          border-radius: 1rem;
          padding: 1.5rem;
        }
        /* Carte & transport */
        .map-placeholder {
          width: 100%;
          height: 300px;
          border-radius: 1rem;
          background: #f1f5f9;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .transport-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }
        .transport-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: #f8fafc;
          border-radius: 0.75rem;
        }
        /* Double CTA */
        .cta-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 1024px;
          margin: 0 auto;
        }
        .cta-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .cta-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1);
        }
        .cta-icon {
          width: 4rem;
          height: 4rem;
          margin: 0 auto 1.25rem;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #3b82f6;
          transition: transform 0.2s;
        }
        .cta-card:hover .cta-icon {
          transform: scale(1.05);
        }
        .btn-outline-light {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 0.625rem 1.25rem;
          color: #1e293b;
          font-weight: 600;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-outline-light:hover {
          background: #e2e8f0;
          transform: scale(1.02);
        }
        .btn-amber {
          background: #f59e0b;
          border-radius: 0.75rem;
          padding: 0.625rem 1.5rem;
          color: white;
          font-weight: 600;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-amber:hover {
          background: #d97706;
          transform: scale(1.02);
        }
        @media (max-width: 900px) {
          .cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .cta-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Hero (identique à la version simple) */}
           {/* Hero avec image de fond - hauteur 400px */}
      <section style={{
        position: 'relative',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Image de fond */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url('https://www.shutterstock.com/image-illustration/smart-city-technology-3d-futuristic-260nw-2605212243.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} />
        {/* Overlay sombre pour lisibilité */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(10,14,26,0.85), rgba(0,0,0,0.7))'
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            color: '#fff',
            fontSize: 'clamp(32px,5vw,56px)',
            marginBottom: 16
          }}>Contactez-nous</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17 }}>
            Notre équipe répond sous 24 heures ouvrables.
          </p>
        </div>
      </section>
      {/* Cartes d'informations (blanches, sans blur) */}
      <div className="container" style={{ marginTop: '-3rem', position: 'relative', zIndex: 10, paddingBottom: '3rem' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="cards-grid"
        >
          {contactInfo.map((info, i) => {
            const Icon = info.icon;
            return (
              <motion.a
                key={i}
                variants={fadeUp}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-info"
              >
                <div className="card-icon" style={{ background: info.color, color: 'white' }}>
                  <Icon size={24} />
                </div>
                <h3 className="card-title">{info.title}</h3>
                <p className="card-content">{info.content}</p>
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      {/* Zone principale : formulaire + sidebar */}
      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="contact-main-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr',
            gap: 48,
            alignItems: 'start'
          }}>
            {/* Formulaire (identique à la version simple) */}
            <div style={{
              background: '#fff',
              borderRadius: 20,
              padding: 36,
              boxShadow: 'var(--shadow-lg)'
            }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 8 }}>
                    Message envoyé !
                  </h3>
                  <p style={{ color: 'var(--gray-500)' }}>
                    Nous vous répondrons dans les 24 heures ouvrables.
                  </p>
                  <button
                    className="btn btn-primary"
                    style={{ marginTop: 20 }}
                    onClick={() => setSent(false)}
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 4 }}>
                    Envoyez-nous un message
                  </h3>

                  {error && (
                    <div style={{
                      background: '#fee2e2',
                      color: '#b91c1c',
                      padding: '12px 16px',
                      borderRadius: 12,
                      fontSize: 14,
                      border: '1px solid #fecaca'
                    }}>
                      ❌ {error}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div className="form-group">
                      <label className="form-label">Votre nom *</label>
                      <input
                        type="text"
                        name="nom"
                        className="form-input"
                        value={form.nom}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Votre email *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-input"
                        value={form.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-input"
                        value={form.phone}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Objet</label>
                    <select
                      name="objet"
                      className="form-input"
                      value={form.objet}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    >
                      <option value="Demande d'information">Demande d'information</option>
                      <option value="Devis">Devis</option>
                      <option value="Partenariat">Partenariat</option>
                      <option value="Support technique">Support technique</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      name="message"
                      className="form-input"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isSubmitting}
                    style={{ justifyContent: 'center', gap: 8 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner" />
                        Envoi en cours...
                      </>
                    ) : (
                      'Envoyer le message →'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar enrichie (horaires, engagements, réponse rapide) */}
            <div>
              <div className="sidebar-block">
                <div className="info-title-icon">
                  <Clock size={20} style={{ color: '#3b82f6' }} />
                  Horaires d'ouverture
                </div>
                {hours.map((h, i) => (
                  <div key={i} className="hours-item">
                    <span style={{ fontSize: '0.875rem', color: '#334155' }}>{h.day}</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: h.open ? '#0f172a' : '#94a3b8' }}>{h.time}</span>
                  </div>
                ))}
                <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#64748b' }}>
                  Assistance technique 24/7<br />
                  <strong style={{ color: '#3b82f6' }}>+243 555 503 59</strong>
                </div>
              </div>

              <div className="sidebar-block">
                <div className="info-title-icon">
                  <Shield size={20} style={{ color: '#3b82f6' }} />
                  Nos engagements
                </div>
                {engagements.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="engagement-item">
                      <Icon size={16} style={{ color: '#3b82f6' }} />
                      <span style={{ fontSize: '0.875rem', color: '#334155' }}>{item.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="quick-response">
                <div className="info-title-icon" style={{ marginBottom: '0.5rem' }}>
                  ⚡ Réponse rapide
                </div>
                <p style={{ color: '#1e293b', fontSize: '0.875rem', lineHeight: '1.5rem' }}>
                  Notre équipe s'engage à répondre sous{' '}
                  <strong style={{ color: '#3b82f6' }}>24h ouvrées</strong>. Pour une urgence, appelez-nous directement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carte & itinéraire */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ background: '#fff', borderRadius: '1rem', padding: '2rem', boxShadow: 'var(--shadow-md)' }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#eef2ff',
                color: '#3b82f6',
                padding: '0.25rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                marginBottom: '0.75rem'
              }}>
                🗺️ Nous trouver
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a', fontFamily: 'var(--font-display)' }}>Notre siège à Kinshasa</h2>
              <p style={{ color: '#64748b', marginTop: '0.25rem' }}>Avenue Kabmabre n°75, Commune de Lingwala</p>
            </div>

            <div className="map-placeholder">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📍</div>
              <div style={{ background: '#fff', padding: '0.5rem 1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 'bold', color: '#0f172a' }}>OMDEVE Services</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Avenue Kabmabre n°75, Lingwala</div>
                <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold', marginTop: '0.25rem' }}>● Ouvert aujourd'hui</div>
              </div>
            </div>

            <div className="transport-grid">
              {[
                { icon: '🚗', title: 'En voiture', desc: 'Parking gratuit sur place' },
                { icon: '🚌', title: 'Transport', desc: 'Bus : arrêt Lingwala (lignes 12, 23)' },
                { icon: '♿', title: 'Accessibilité', desc: 'Entrée adaptée aux PMR' }
              ].map((item, i) => (
                <div key={i} className="transport-item">
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '0.875rem' }}>{item.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Double CTA */}
      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
        <div className="container">
          <div className="cta-grid">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="cta-card"
            >
              <div className="cta-icon" style={{ background: '#3b82f6' }}>
                <Headphones size={28} color="#fff" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '0.75rem' }}>Assistance immédiate</h3>
              <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
                Notre support technique est disponible <strong style={{ color: '#3b82f6' }}>24h/24 et 7j/7</strong> pour répondre à vos urgences.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
                <a href="tel:+24355550359" className="btn-outline-light">
                  <Phone size={16} /> Appeler maintenant
                </a>
                <a href="https://wa.me/24355550359" target="_blank" rel="noopener noreferrer" style={{ background: '#10b981', borderRadius: '0.75rem', padding: '0.625rem 1.25rem', color: 'white', fontWeight: '600', transition: 'all 0.2s', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="cta-card"
            >
              <div className="cta-icon" style={{ background: '#f59e0b' }}>
                <FileText size={28} color="#fff" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '0.75rem' }}>Un projet sur mesure ?</h3>
              <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
                Étudions ensemble votre besoin et obtenez un <strong style={{ color: '#f59e0b' }}>devis personnalisé</strong> sans engagement.
              </p>
              <Link to="/devis" className="btn-amber">
                Demander un devis <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;