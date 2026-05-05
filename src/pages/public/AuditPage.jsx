import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import PublicLayout from '../../components/layout/PublicLayout';
import { auditAPI } from '../../services/api';

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
    <PublicLayout>
      <section style={{ background: 'linear-gradient(135deg, var(--dark-900), var(--dark-700))', padding: '60px 0 40px' }}>
        <div className="container" style={{ maxWidth: 680 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: 40, marginBottom: 8 }}>🔍 Audit IT Gratuit</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16 }}>Répondez à 7 questions — recevez votre diagnostic PDF personnalisé</p>
          </div>
          {!done && (
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 999, height: 8, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'var(--primary)', borderRadius: 999, width: `${progress}%`, transition: 'width 0.4s ease' }} />
            </div>
          )}
          {!done && <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 8 }}>{isContactStep ? questions.length + 1 : step + 1} / {questions.length + 1}</div>}
        </div>
      </section>

      <section style={{ background: 'var(--gray-100)', padding: '40px 0 80px' }}>
        <div className="container" style={{ maxWidth: 680 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 40, boxShadow: 'var(--shadow-lg)' }}>

            {/* DONE */}
            {done && (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ fontSize: 64, marginBottom: 20 }}>📊</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 30, marginBottom: 12 }}>Votre rapport est en cours de génération !</h2>
                <p style={{ color: 'var(--gray-500)', lineHeight: 1.7, marginBottom: 28, maxWidth: 440, margin: '0 auto 28px' }}>
                  Votre rapport d'audit personnalisé sera envoyé à <strong>{contact.email}</strong> dans les prochaines minutes.
                </p>
                <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button className="btn btn-primary" onClick={() => navigate('/devis')}>Demander un devis →</button>
                  <button className="btn btn-ghost" onClick={() => navigate('/')}>Retour à l'accueil</button>
                </div>
              </div>
            )}

            {/* QUESTIONS */}
            {!done && !isContactStep && q && (
              <div style={{ animation: 'fadeSlideIn 0.3s ease' }}>
                <div style={{ marginBottom: 28 }}>
                  <div style={{ color: 'var(--primary)', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>Question {step + 1}</div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 6 }}>{q.title}</h2>
                  <p style={{ color: 'var(--gray-500)', fontSize: 15 }}>{q.subtitle}</p>
                </div>

                {/* Radio */}
                {q.type === 'radio' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {q.options.map(opt => (
                      <button key={opt} onClick={() => setAnswer(q.id, opt)} style={{
                        padding: '14px 18px', borderRadius: 12, textAlign: 'left',
                        background: answers[q.id] === opt ? 'rgba(0,194,255,0.08)' : 'var(--gray-100)',
                        border: `2px solid ${answers[q.id] === opt ? 'var(--primary)' : 'var(--gray-200)'}`,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.15s',
                        color: 'var(--gray-700)', fontSize: 14, fontWeight: answers[q.id] === opt ? 700 : 400,
                      }}>
                        <span style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${answers[q.id] === opt ? 'var(--primary)' : 'var(--gray-400)'}`, background: answers[q.id] === opt ? 'var(--primary)' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {answers[q.id] === opt && <span style={{ width: 8, height: 8, background: '#0a0e1a', borderRadius: '50%' }} />}
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Multicheck */}
                {q.type === 'multicheck' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
                    {q.options.map(opt => {
                      const sel = (answers[q.id] || []).includes(opt);
                      return (
                        <button key={opt} onClick={() => toggleMulti(q.id, opt)} style={{
                          padding: '14px 16px', borderRadius: 12, textAlign: 'left',
                          background: sel ? 'rgba(0,194,255,0.08)' : 'var(--gray-100)',
                          border: `2px solid ${sel ? 'var(--primary)' : 'var(--gray-200)'}`,
                          cursor: 'pointer', fontSize: 13, fontWeight: sel ? 700 : 400,
                          color: sel ? 'var(--primary)' : 'var(--gray-700)', transition: 'all 0.15s',
                          display: 'flex', alignItems: 'center', gap: 10,
                        }}>
                          <span style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${sel ? 'var(--primary)' : 'var(--gray-400)'}`, background: sel ? 'var(--primary)' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#0a0e1a' }}>
                            {sel && '✓'}
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Textarea */}
                {q.type === 'textarea' && (
                  <textarea className="form-input" rows={5} value={answers[q.id] || ''} onChange={e => setAnswer(q.id, e.target.value)} placeholder={q.placeholder} style={{ resize: 'vertical' }} />
                )}
              </div>
            )}

            {/* CONTACT STEP */}
            {!done && isContactStep && (
              <div style={{ animation: 'fadeSlideIn 0.3s ease' }}>
                <div style={{ marginBottom: 28 }}>
                  <div style={{ color: 'var(--primary)', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>Dernière étape</div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 6 }}>Où envoyer votre rapport ?</h2>
                  <p style={{ color: 'var(--gray-500)' }}>Votre rapport PDF personnalisé sera généré et envoyé par email.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[['name','Nom complet *','text'],['email','Email *','email'],['phone','Téléphone','tel'],['company','Entreprise','text']].map(([k, lbl, type]) => (
                    <div key={k} className="form-group">
                      <label className="form-label">{lbl}</label>
                      <input type={type} className="form-input" value={contact[k]} onChange={e => setContact(c => ({ ...c, [k]: e.target.value }))} placeholder={lbl.replace(' *','')} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            {!done && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
                <button className="btn btn-ghost" onClick={() => setStep(s => s - 1)} style={{ visibility: step > 0 ? 'visible' : 'hidden' }}>← Précédent</button>
                {!isContactStep ? (
                  <button className="btn btn-primary" onClick={() => setStep(s => s + 1)} disabled={!canNext()}>Suivant →</button>
                ) : (
                  <button className="btn btn-primary btn-lg" onClick={handleSubmit} disabled={loading || !canNext()}>
                    {loading ? '⏳ Génération...' : '📊 Générer mon rapport'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default AuditPage;
