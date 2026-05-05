// src/pages/public/AuditPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { auditAPI } from '../../services/api';
import {
  ArrowRight, CheckCircle, Target, Handshake, Headphones,
  Users, Clock, Award, Briefcase, Star, Phone, Mail, MapPin, Calendar
} from 'lucide-react';

// ========== DONNÉES (questions) ==========
const questions = [
  {
    id: 'currentNeeds', type: 'multicheck', title: 'Quels sont vos besoins actuels ?',
    subtitle: 'Sélectionnez tout ce qui vous concerne.',
    options: ['Améliorer mon réseau', 'Renforcer la sécurité', 'Créer un site/app', 'Migrer vers le cloud', 'Réduire les coûts énergie', 'Former mon équipe', 'Acheter du matériel', 'Autre'],
  },
  {
    id: 'infrastructure', type: 'radio', title: 'Votre infrastructure actuelle ?',
    subtitle: 'Décrivez votre situation informatique présente.',
    options: ['Aucune infrastructure formelle', 'Infrastructure basique (quelques PC + internet)', 'Infrastructure moyenne (serveur local, réseau câblé)', 'Infrastructure avancée (serveurs, NAS, réseau managé)', 'Infrastructure complexe multi-sites'],
  },
  {
    id: 'teamSize', type: 'radio', title: 'Taille de votre équipe ?',
    subtitle: 'Le nombre de collaborateurs utilisant votre système IT.',
    options: ['1 – 5 personnes', '6 – 20 personnes', '21 – 50 personnes', '51 – 100 personnes', 'Plus de 100 personnes'],
  },
  {
    id: 'budget', type: 'radio', title: 'Votre budget approximatif ?',
    subtitle: 'Pour votre projet d\'amélioration IT.',
    options: ['Moins de 500 $', '500 $ – 2 000 $', '2 000 $ – 5 000 $', '5 000 $ – 15 000 $', 'Plus de 15 000 $', 'À définir selon les recommandations'],
  },
  {
    id: 'objectives', type: 'multicheck', title: 'Quels sont vos objectifs prioritaires ?',
    subtitle: 'Qu\'espérez-vous accomplir dans les 12 prochains mois ?',
    options: ['Réduire les pannes et temps d\'arrêt', 'Améliorer la sécurité des données', 'Accélérer les processus internes', 'Lancer une présence en ligne', 'Réduire les coûts opérationnels', 'Se conformer aux réglementations', 'Améliorer l\'expérience client'],
  },
  {
    id: 'timeline', type: 'radio', title: 'Dans quel délai souhaitez-vous agir ?',
    subtitle: 'Votre horizon de mise en œuvre.',
    options: ['Immédiatement (urgent)', '1 – 3 mois', '3 – 6 mois', '6 – 12 mois', 'Pas de délai précis'],
  },
  {
    id: 'currentIssues', type: 'textarea', title: 'Problèmes actuels à résoudre ?',
    subtitle: 'Décrivez les difficultés que vous rencontrez au quotidien.',
    placeholder: 'Ex : réseau lent, pannes fréquentes, données non sauvegardées, pas de site web...',
  },
];

// ========== CSS ==========
const css = `
  *{margin:0;padding:0;box-sizing:border-box}

  .ab-container{max-width:1200px;margin:0 auto;padding:0 1.5rem}
  .ab-section{padding:4rem 0}
  .ab-section-alt{padding:4rem 0;background:#f8fafc}
  .ab-section-dark{padding:4rem 0;background:linear-gradient(135deg,#0f172a,#1e293b)}

  .ab-hero{position:relative;min-height:440px;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden}
  .ab-hero-bg{position:absolute;inset:0;background-image:url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80');background-size:cover;background-position:center}
  .ab-hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(5,10,25,.92),rgba(0,20,60,.8))}
  .ab-hero-content{position:relative;z-index:2;max-width:780px;padding:4rem 1.5rem 3rem}
  .ab-badge-hero{display:inline-flex;align-items:center;gap:6px;background:rgba(59,130,246,.2);border:1px solid rgba(59,130,246,.4);color:#93c5fd;padding:5px 16px;border-radius:9999px;font-size:.75rem;font-weight:600;letter-spacing:.05em;margin-bottom:1.25rem}
  .ab-hero-title{font-family:'Syne',sans-serif;font-size:clamp(2rem,5vw,3.5rem);font-weight:800;color:white;margin-bottom:1rem;line-height:1.2}
  .ab-hero-sub{color:rgba(255,255,255,.75);font-size:clamp(.9rem,2.5vw,1.1rem);margin-bottom:2rem;line-height:1.7}
  .ab-hero-btns{display:flex;flex-wrap:wrap;gap:1rem;justify-content:center}

  .btn-prim{background:linear-gradient(135deg,#f59e0b,#d97706);color:white;padding:.8rem 1.6rem;border-radius:.75rem;font-weight:700;font-size:.9rem;display:inline-flex;align-items:center;gap:.5rem;transition:.2s;text-decoration:none}
  .btn-prim:hover{transform:translateY(-2px);box-shadow:0 10px 25px rgba(245,158,11,.35)}
  .btn-ghost{border:2px solid rgba(255,255,255,.25);background:rgba(255,255,255,.05);color:white;padding:.8rem 1.6rem;border-radius:.75rem;font-weight:700;font-size:.9rem;display:inline-flex;align-items:center;gap:.5rem;transition:.2s;text-decoration:none}
  .btn-ghost:hover{background:rgba(255,255,255,.12)}
  .btn-blue{background:#3b82f6;color:white;padding:.75rem 1.5rem;border-radius:.75rem;font-weight:600;font-size:.875rem;display:inline-flex;align-items:center;gap:.5rem;text-decoration:none;transition:.2s}
  .btn-blue:hover{background:#2563eb;transform:translateY(-2px)}
  .btn-outline{border:2px solid #e2e8f0;background:white;color:#1e293b;padding:.75rem 1.5rem;border-radius:.75rem;font-weight:600;font-size:.875rem;display:inline-flex;align-items:center;gap:.5rem;text-decoration:none;transition:.2s}
  .btn-outline:hover{border-color:#3b82f6;color:#3b82f6}

  .ab-section-header{text-align:center;margin-bottom:3rem}
  .ab-badge{display:inline-flex;align-items:center;gap:6px;background:#eff6ff;color:#3b82f6;padding:5px 14px;border-radius:9999px;font-size:.75rem;font-weight:700;letter-spacing:.05em;margin-bottom:.75rem;border:1px solid #bfdbfe}
  .ab-section-title{font-family:'Syne',sans-serif;font-size:clamp(1.5rem,3.5vw,2.2rem);font-weight:800;color:#0f172a;margin-bottom:.5rem}
  .ab-divider{width:3rem;height:3px;background:linear-gradient(90deg,#3b82f6,#06b6d4);border-radius:9999px;margin:.75rem auto 1rem}
  .ab-section-sub{color:#64748b;max-width:580px;margin:0 auto;font-size:.95rem;line-height:1.7}

  .ab-grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem}
  .ab-grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
  .ab-grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem}

  .ab-card{background:white;border:1px solid #e2e8f0;border-radius:1.25rem;padding:1.75rem 1.5rem;transition:all .3s;height:100%}
  .ab-card-left{align-items:flex-start;text-align:left}
  .ab-card-icon{width:3.25rem;height:3.25rem;border-radius:1rem;display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem;flex-shrink:0}
  .ab-card-title{font-weight:700;font-size:1.05rem;color:#0f172a;margin-bottom:.5rem}
  .ab-card-text{color:#64748b;font-size:.875rem;line-height:1.6}

  .ab-stats-bar{background:linear-gradient(135deg,#1e3a5f,#0f2744);padding:3rem 0}

  .ab-question-card{background:white;border:1px solid #e2e8f0;border-radius:1.25rem;padding:2rem}
  .ab-progress-bar{height:8px;background:#e2e8f0;border-radius:9999px;overflow:hidden;margin-bottom:0.5rem}
  .ab-progress-fill{height:100%;background:#3b82f6;border-radius:9999px;width:0%}
  .ab-step-counter{text-align:center;color:#64748b;font-size:.8rem;margin-bottom:1rem}

  .ab-option-btn{width:100%;text-align:left;padding:0.8rem 1rem;border-radius:0.75rem;border:2px solid #e2e8f0;background:#f8fafc;cursor:pointer;transition:all .15s;display:flex;align-items:center;gap:0.75rem}
  .ab-option-btn.selected{border-color:#3b82f6;background:#eff6ff}
  .ab-option-radio{width:1.2rem;height:1.2rem;border-radius:50%;border:2px solid #cbd5e1;display:inline-flex;align-items:center;justify-content:center}
  .ab-option-radio.selected{border-color:#3b82f6;background:#3b82f6}
  .ab-option-checkbox{width:1.2rem;height:1.2rem;border-radius:0.25rem;border:2px solid #cbd5e1;display:inline-flex;align-items:center;justify-content:center}
  .ab-option-checkbox.selected{border-color:#3b82f6;background:#3b82f6;color:white}

  .ab-nav-buttons{display:flex;justify-content:space-between;margin-top:2rem}
  .ab-textarea{width:100%;padding:0.8rem;border:1px solid #e2e8f0;border-radius:0.75rem;font-size:0.85rem;font-family:inherit;resize:vertical}

  @media(max-width:1024px){
    .ab-grid-4{grid-template-columns:repeat(2,1fr)}
  }
  @media(max-width:768px){
    .ab-container{padding:0 1rem}
    .ab-section{padding:2.5rem 0}
    .ab-section-alt{padding:2.5rem 0}
    .ab-grid-2,.ab-grid-3,.ab-grid-4{grid-template-columns:1fr}
    .ab-hero{min-height:auto}
    .ab-hero-content{padding:4rem 1rem 2.5rem}
    .ab-hero-btns{flex-direction:column;align-items:stretch}
    .btn-prim,.btn-ghost{justify-content:center}
    .ab-stats-bar{padding:2rem 0}
  }
`;

// ========== COMPOSANT PRINCIPAL ==========
const AuditPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({ name: '', email: '', phone: '', company: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const isContactStep = step === questions.length;
  const q = questions[step];

  const setAnswer = (id, value) => setAnswers(prev => ({ ...prev, [id]: value }));
  const toggleMulti = (id, val) => {
    const cur = answers[id] || [];
    setAnswer(id, cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val]);
  };

  const canNext = () => {
    if (isContactStep) return contact.name && contact.email;
    const a = answers[q?.id];
    if (q?.type === 'multicheck') return a?.length > 0;
    if (q?.type === 'radio') return !!a;
    if (q?.type === 'textarea') return a?.length >= 10;
    return false;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await auditAPI.submit({ ...contact, answers });
      setDone(true);
      toast.success('Audit soumis ! Votre rapport sera envoyé par email.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur');
    } finally { setLoading(false); }
  };

  const progress = Math.round(((isContactStep ? questions.length : step) / (questions.length + 1)) * 100);

  return (
    <>
      <style>{css}</style>

      {/* HERO (comme About) */}
      <div className="ab-hero">
        <div className="ab-hero-bg" />
        <div className="ab-hero-overlay" />
        <div className="ab-hero-content">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="ab-badge-hero">🔍 Audit IT Gratuit</div>
          </motion.div>
          <motion.h1 className="ab-hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            Audit <span style={{ background: 'linear-gradient(135deg,#60a5fa,#22d3ee)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Gratuit</span>
          </motion.h1>
          <motion.p className="ab-hero-sub" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            Répondez à 7 questions — recevez votre diagnostic PDF personnalisé
          </motion.p>
          <motion.div className="ab-hero-btns" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
            <Link to="/devis" className="btn-prim">Demander un devis <ArrowRight size={18} /></Link>
            <Link to="/services" className="btn-ghost">Voir nos services <CheckCircle size={18} /></Link>
          </motion.div>
        </div>
      </div>

      {/* STATS (optionnel, pour garder le rythme) */}
      <div className="ab-stats-bar">
        <div className="ab-container">
          <div className="ab-grid-4">
            {[
              { value: '7', label: 'Questions', icon: null, color: '#3b82f6' },
              { value: '5 min', label: 'Temps moyen', icon: null, color: '#f59e0b' },
              { value: '100%', label: 'Personnalisé', icon: null, color: '#10b981' },
              { value: 'PDF', label: 'Rapport complet', icon: null, color: '#ec4899' }
            ].map((s, i) => (
              <div key={i} className="ab-stat-item" style={{ textAlign: 'center' }}>
                <div className="ab-stat-num" style={{ color: s.color }}>{s.value}</div>
                <div className="ab-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QUESTIONNAIRE */}
      <div className="ab-section-alt">
        <div className="ab-container">
          <div className="ab-section-header">
            <div className="ab-badge"><Target size={13} /> Diagnostic personnalisé</div>
            <h2 className="ab-section-title">Parlons de votre entreprise</h2>
            <div className="ab-divider" />
          </div>

          {!done ? (
            <div className="ab-question-card" style={{ maxWidth: '720px', margin: '0 auto' }}>
              {/* Progression */}
              <div className="ab-progress-bar">
                <div className="ab-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="ab-step-counter">Étape {isContactStep ? questions.length + 1 : step + 1} / {questions.length + 1}</div>

              {!isContactStep && q ? (
                <>
                  <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>{q.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{q.subtitle}</p>

                  {/* Radio */}
                  {q.type === 'radio' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {q.options.map(opt => (
                        <button key={opt} onClick={() => setAnswer(q.id, opt)} className={`ab-option-btn ${answers[q.id] === opt ? 'selected' : ''}`}>
                          <div className={`ab-option-radio ${answers[q.id] === opt ? 'selected' : ''}`}>
                            {answers[q.id] === opt && <div style={{ width: '0.6rem', height: '0.6rem', borderRadius: '50%', background: 'white' }} />}
                          </div>
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Multicheck */}
                  {q.type === 'multicheck' && (
                    <div className="ab-grid-2" style={{ gap: '0.75rem' }}>
                      {q.options.map(opt => {
                        const checked = (answers[q.id] || []).includes(opt);
                        return (
                          <button key={opt} onClick={() => toggleMulti(q.id, opt)} className={`ab-option-btn ${checked ? 'selected' : ''}`}>
                            <div className={`ab-option-checkbox ${checked ? 'selected' : ''}`}>
                              {checked && '✓'}
                            </div>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Textarea */}
                  {q.type === 'textarea' && (
                    <textarea className="ab-textarea" rows={5} value={answers[q.id] || ''} onChange={e => setAnswer(q.id, e.target.value)} placeholder={q.placeholder} />
                  )}
                </>
              ) : (
                /* Contact */
                <>
                  <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Où envoyer votre rapport ?</h3>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Votre rapport PDF personnalisé sera généré et envoyé par email.</p>
                  <div className="ab-grid-2">
                    {[['name', 'Nom complet *', 'text'], ['email', 'Email *', 'email'], ['phone', 'Téléphone', 'tel'], ['company', 'Entreprise', 'text']].map(([k, lbl, type]) => (
                      <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>{lbl}</label>
                        <input type={type} className="ab-textarea" style={{ padding: '0.7rem' }} value={contact[k]} onChange={e => setContact(c => ({ ...c, [k]: e.target.value }))} placeholder={lbl.replace(' *', '')} />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Navigation */}
              <div className="ab-nav-buttons">
                <button className="btn-outline" onClick={() => setStep(s => s - 1)} style={{ visibility: step > 0 ? 'visible' : 'hidden' }}>← Précédent</button>
                {!isContactStep ? (
                  <button className="btn-prim" onClick={() => setStep(s => s + 1)} disabled={!canNext()}>Suivant →</button>
                ) : (
                  <button className="btn-prim" onClick={handleSubmit} disabled={loading || !canNext()}>
                    {loading ? '⏳ Génération...' : '📊 Générer mon rapport'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* DONE */
            <div className="ab-question-card" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Votre rapport est en cours de génération !</h2>
              <p style={{ color: '#64748b', marginBottom: '1.5rem', lineHeight: 1.6 }}>Nous venons d’envoyer votre diagnostic personnalisé à <strong>{contact.email}</strong>.</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn-prim" onClick={() => navigate('/devis')}>Demander un devis →</button>
                <button className="btn-outline" onClick={() => navigate('/')}>Retour à l’accueil</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA FINALE (identique à About) */}
      <div className="ab-section">
        <div className="ab-container">
          <motion.div className="ab-cta-final" style={{ background: 'linear-gradient(135deg,#1e3a5f,#0f172a)', borderRadius: '1.5rem', padding: '3rem 2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, color: 'white', marginBottom: '.75rem' }}>
              Prêt à passer à l’action ?
            </h2>
            <p style={{ color: 'rgba(255,255,255,.65)', marginBottom: '2rem', fontSize: '.95rem', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              Obtenez votre diagnostic gratuit ou demandez un devis personnalisé dès maintenant.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/devis" className="btn-prim">Demander un devis <ArrowRight size={18} /></Link>
              <Link to="/services" className="btn-ghost">Voir nos services <CheckCircle size={18} /></Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AuditPage;