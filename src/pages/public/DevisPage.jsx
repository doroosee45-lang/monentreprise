// src/pages/DevisPage.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { devisAPI } from '../../services/api';

const STEPS = ['Service', 'Description', 'Budget & Lieu', 'Fichiers', 'Confirmation'];

const services = [
  'Réseau & Infrastructure', 'Sécurité IT', 'Développement Digital',
  'Cloud & Hébergement', 'Énergie Solaire', 'Vente de Matériel',
  'Formation IT', 'Pack Entreprise', 'Pack E-commerce',
  'Pack Digital Complet', 'Autre / Combiné',
];

const DevisPage = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submittedNumber, setSubmittedNumber] = useState(null);

  const [form, setForm] = useState({
    service: '', description: '', budget: { min: '', max: '', currency: 'USD' },
    location: '', files: [],
    clientInfo: { name: '', email: '', phone: '', company: '' },
  });

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const canNext = () => {
    if (step === 0) return form.service !== '';
    if (step === 1) return form.description.length >= 20 && form.clientInfo.name && form.clientInfo.email;
    if (step === 2) return form.location !== '';
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('service', form.service);
      fd.append('description', form.description);
      fd.append('location', form.location);
      fd.append('budget', JSON.stringify(form.budget));
      fd.append('clientInfo', JSON.stringify(form.clientInfo));
      form.files.forEach(f => fd.append('attachments', f));
      const { data } = await devisAPI.create(fd);
      setSubmittedNumber(data.data.number);
      setStep(5);
      toast.success('Devis soumis avec succès !');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de la soumission');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
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
        .hero-subtitle {
          color: rgba(255,255,255,0.8);
          font-size: 1.125rem;
          margin-bottom: 2rem;
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
        .form-hint {
          font-size: 0.7rem;
          color: #64748b;
          margin-top: 0.25rem;
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
        .stepper {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
        }
        .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .step-circle {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          background: white;
          border: 2px solid #e2e8f0;
          color: #94a3b8;
        }
        .step-circle.active {
          background: #3b82f6;
          border-color: #3b82f6;
          color: white;
        }
        .step-circle.completed {
          background: #10b981;
          border-color: #10b981;
          color: white;
        }
        .step-label {
          font-size: 0.7rem;
          color: #64748b;
        }
        .step-label.active {
          font-weight: 600;
          color: #0f172a;
        }
        .step-line {
          flex: 1;
          height: 2px;
          background: #e2e8f0;
          margin: 0 0.5rem;
          margin-bottom: 1.2rem;
        }
        .step-line.completed {
          background: #10b981;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
        .service-btn {
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          text-align: left;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
          color: #1e293b;
        }
        .service-btn.selected {
          background: rgba(59,130,246,0.1);
          border-color: #3b82f6;
          color: #3b82f6;
          font-weight: 700;
        }
        .file-dropzone {
          border: 2px dashed #e2e8f0;
          border-radius: 1rem;
          padding: 2rem 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          background: #f8fafc;
        }
        .file-dropzone:hover {
          border-color: #3b82f6;
        }
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .form-card {
            padding: 1.5rem;
          }
          .step-label {
            display: none;
          }
          .step-line {
            margin-bottom: 0;
          }
        }
      `}</style>

      {/* Hero 400px identique aux autres pages */}
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
            Demander un devis
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-subtitle"
          >
            Remplissez le formulaire — réponse garantie sous 48h
          </motion.p>
        </div>
      </div>

      {/* Formulaire */}
      <div className="container">
        <div className="form-card">
          {/* Stepper */}
          {step < 5 && (
            <div className="stepper">
              {STEPS.map((label, i) => (
                <div key={i} className="step-item" style={{ flex: i === STEPS.length - 1 ? 'none' : 'auto' }}>
                  <div className={`step-circle ${i < step ? 'completed' : i === step ? 'active' : ''}`}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <div className={`step-label ${i === step ? 'active' : ''}`}>{label}</div>
                  {i < STEPS.length - 1 && (
                    <div className={`step-line ${i < step ? 'completed' : ''}`} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Étape 0 — Service */}
          {step === 0 && (
            <div>
              <h2 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Quel service vous intéresse ?</h2>
              <p className="card-text" style={{ marginBottom: '1.5rem' }}>Sélectionnez le service ou pack souhaité.</p>
              <div className="services-grid">
                {services.map(s => (
                  <button
                    key={s}
                    onClick={() => set('service', s)}
                    className={`service-btn ${form.service === s ? 'selected' : ''}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Étape 1 — Description + Contact */}
          {step === 1 && (
            <div>
              <h2 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Décrivez votre besoin</h2>
              <p className="card-text" style={{ marginBottom: '1.5rem' }}>Plus c'est précis, plus notre devis sera adapté.</p>
              <div className="form-group">
                <label className="form-label">Description détaillée *</label>
                <textarea
                  className="form-textarea"
                  rows={5}
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                  placeholder="Décrivez votre projet, vos besoins actuels, les problèmes à résoudre..."
                />
                <div className="form-hint">{form.description.length}/20 caractères minimum</div>
              </div>
              <div className="form-group" style={{ marginTop: '1.5rem' }}>
                <h3 className="card-title" style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Vos coordonnées</h3>
                <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Nom complet *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={form.clientInfo.name}
                      onChange={e => set('clientInfo', { ...form.clientInfo, name: e.target.value })}
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-input"
                      value={form.clientInfo.email}
                      onChange={e => set('clientInfo', { ...form.clientInfo, email: e.target.value })}
                      placeholder="jean@entreprise.com"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Téléphone</label>
                    <input
                      type="tel"
                      className="form-input"
                      value={form.clientInfo.phone}
                      onChange={e => set('clientInfo', { ...form.clientInfo, phone: e.target.value })}
                      placeholder="+243 XXX XXX XXX"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Entreprise</label>
                    <input
                      type="text"
                      className="form-input"
                      value={form.clientInfo.company}
                      onChange={e => set('clientInfo', { ...form.clientInfo, company: e.target.value })}
                      placeholder="Nom de votre société"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Étape 2 — Budget & Localisation */}
          {step === 2 && (
            <div>
              <h2 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Budget & Localisation</h2>
              <p className="card-text" style={{ marginBottom: '1.5rem' }}>Donnez-nous une fourchette pour mieux adapter notre offre.</p>
              <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Budget min ($)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={form.budget.min}
                    onChange={e => set('budget', { ...form.budget, min: e.target.value })}
                    placeholder="500"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Budget max ($)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={form.budget.max}
                    onChange={e => set('budget', { ...form.budget, max: e.target.value })}
                    placeholder="5000"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Devise</label>
                  <select
                    className="form-select"
                    value={form.budget.currency}
                    onChange={e => set('budget', { ...form.budget, currency: e.target.value })}
                  >
                    <option value="USD">USD</option>
                    <option value="CDF">CDF</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Localisation géographique *</label>
                <input
                  className="form-input"
                  value={form.location}
                  onChange={e => set('location', e.target.value)}
                  placeholder="Kinshasa, Gombe / Lubumbashi / autre..."
                />
                <div className="form-hint">Commune, ville ou province concernée</div>
              </div>
              <div className="info-box" style={{ background: '#eef2ff', borderRadius: '0.75rem', padding: '1rem', marginTop: '1rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#1e40af' }}>💡 Aucun budget défini ? Indiquez simplement votre localisation — nous vous proposerons la solution la plus adaptée.</p>
              </div>
            </div>
          )}

          {/* Étape 3 — Fichiers */}
          {step === 3 && (
            <div>
              <h2 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Documents joints (optionnel)</h2>
              <p className="card-text" style={{ marginBottom: '1.5rem' }}>Plans, cahier des charges, photos de l'installation existante...</p>
              <div
                className="file-dropzone"
                onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = '#3b82f6'; }}
                onDragLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
                onDrop={e => {
                  e.preventDefault();
                  const files = Array.from(e.dataTransfer.files).slice(0, 5);
                  set('files', files);
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📎</div>
                <p className="card-text" style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Glissez vos fichiers ici</p>
                <p className="card-text" style={{ fontSize: '0.75rem', marginBottom: '0.75rem' }}>PDF, images, documents Word — max 10 Mo par fichier (5 fichiers max)</p>
                <label style={{ cursor: 'pointer' }}>
                  <span className="btn-outline" style={{ display: 'inline-block', padding: '0.5rem 1rem', fontSize: '0.75rem' }}>Parcourir les fichiers</span>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    style={{ display: 'none' }}
                    onChange={e => set('files', Array.from(e.target.files).slice(0, 5))}
                  />
                </label>
              </div>
              {form.files.length > 0 && (
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {form.files.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f8fafc', borderRadius: '0.5rem', padding: '0.5rem 0.75rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>📄</span>
                      <span style={{ flex: 1, fontSize: '0.875rem', color: '#0f172a' }}>{f.name}</span>
                      <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{(f.size / 1024).toFixed(1)} Ko</span>
                      <button onClick={() => set('files', form.files.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Étape 4 — Récapitulatif */}
          {step === 4 && (
            <div>
              <h2 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Récapitulatif</h2>
              <p className="card-text" style={{ marginBottom: '1.5rem' }}>Vérifiez votre demande avant envoi.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { label: '🎯 Service', value: form.service },
                  { label: '📝 Description', value: form.description.slice(0, 120) + (form.description.length > 120 ? '...' : '') },
                  { label: '👤 Contact', value: `${form.clientInfo.name} — ${form.clientInfo.email}` },
                  { label: '📍 Lieu', value: form.location },
                  { label: '💰 Budget', value: form.budget.min || form.budget.max ? `${form.budget.min || '?'} – ${form.budget.max || '?'} ${form.budget.currency}` : 'Non spécifié' },
                  { label: '📎 Fichiers', value: form.files.length > 0 ? `${form.files.length} fichier(s)` : 'Aucun' },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{ fontWeight: 700, minWidth: '7rem', fontSize: '0.875rem' }}>{r.label}</span>
                    <span style={{ color: '#475569', fontSize: '0.875rem' }}>{r.value}</span>
                  </div>
                ))}
              </div>
              <div className="info-box" style={{ background: '#eef2ff', borderRadius: '0.75rem', padding: '0.75rem 1rem', marginTop: '1rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#1e40af' }}>ℹ️ En soumettant, vous acceptez que notre équipe vous recontacte dans les 48h ouvrables.</p>
              </div>
            </div>
          )}

          {/* Succès */}
          {step === 5 && (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ width: '4rem', height: '4rem', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1rem' }}>✅</div>
              <h2 className="card-title" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Devis soumis avec succès !</h2>
              <p className="card-text" style={{ marginBottom: '1rem' }}>Votre demande a bien été enregistrée. Vous recevrez une confirmation par email.</p>
              <div style={{ background: '#f8fafc', borderRadius: '0.75rem', padding: '0.75rem 1.5rem', display: 'inline-block', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Numéro de suivi</div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', fontWeight: 800, color: '#3b82f6' }}>{submittedNumber}</div>
              </div>
              <div>
                <Link to="/" className="btn-primary">Retour à l'accueil</Link>
              </div>
            </div>
          )}

          {/* Navigation */}
          {step < 5 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', gap: '1rem' }}>
              <button
                className="btn-outline"
                onClick={() => setStep(s => s - 1)}
                style={{ visibility: step > 0 ? 'visible' : 'hidden', borderColor: '#cbd5e1', color: '#1e293b' }}
              >
                ← Précédent
              </button>
              {step < 4 ? (
                <button
                  className="btn-primary"
                  onClick={() => setStep(s => s + 1)}
                  disabled={!canNext()}
                >
                  Suivant →
                </button>
              ) : (
                <button
                  className="btn-primary"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? '⏳ Envoi...' : '🚀 Soumettre le devis'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DevisPage;