import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import PublicLayout from '../../components/layout/PublicLayout';
import { devisAPI } from '../../services/api';

const STEPS = ['Service', 'Description', 'Budget & Lieu', 'Fichiers', 'Confirmation'];

const services = [
  'Réseau & Infrastructure', 'Sécurité IT', 'Développement Digital',
  'Cloud & Hébergement', 'Énergie Solaire', 'Vente de Matériel',
  'Formation IT', 'Pack Entreprise', 'Pack E-commerce',
  'Pack Digital Complet', 'Autre / Combiné',
];

const DevisPage = () => {
  const navigate = useNavigate();
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
      fd.append('budget', JSON.stringify({ min: form.budget.min, max: form.budget.max, currency: form.budget.currency }));
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
    <PublicLayout>
      <section style={{ background: 'linear-gradient(135deg, var(--dark-900), var(--dark-700))', padding: '60px 0 40px' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: 40, marginBottom: 8 }}>Demander un devis</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>Remplissez le formulaire — réponse garantie sous 48h</p>
          </div>

          {/* Stepper */}
          {step < 5 && (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
              {STEPS.map((label, i) => (
                <React.Fragment key={i}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: i < step ? 'var(--success)' : i === step ? 'var(--primary)' : 'rgba(255,255,255,0.15)',
                      color: i <= step ? '#0a0e1a' : 'rgba(255,255,255,0.5)',
                      fontWeight: 800, fontSize: 14, transition: 'all 0.3s',
                    }}>
                      {i < step ? '✓' : i + 1}
                    </div>
                    <span style={{ color: i === step ? '#fff' : 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: i === step ? 700 : 400 }}>{label}</span>
                  </div>
                  {i < STEPS.length - 1 && <div style={{ flex: 1, height: 2, background: i < step ? 'var(--success)' : 'rgba(255,255,255,0.15)', margin: '0 8px', marginBottom: 22, transition: 'background 0.3s' }} />}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </section>

      <section style={{ background: 'var(--gray-100)', padding: '40px 0 80px' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 40, boxShadow: 'var(--shadow-lg)' }}>

            {/* SUCCESS */}
            {step === 5 && (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ width: 80, height: 80, background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 24px' }}>✅</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 30, marginBottom: 8 }}>Devis soumis avec succès !</h2>
                <p style={{ color: 'var(--gray-500)', marginBottom: 20 }}>Votre demande a bien été enregistrée. Vous recevrez une confirmation par email.</p>
                <div style={{ background: 'var(--gray-100)', borderRadius: 12, padding: '16px 24px', display: 'inline-block', marginBottom: 32 }}>
                  <div style={{ color: 'var(--gray-500)', fontSize: 13 }}>Numéro de suivi</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--primary)' }}>{submittedNumber}</div>
                </div>
                <br />
                <button className="btn btn-primary" onClick={() => navigate('/')}>Retour à l'accueil</button>
              </div>
            )}

            {/* STEP 0 — Service */}
            {step === 0 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 6 }}>Quel service vous intéresse ?</h2>
                <p style={{ color: 'var(--gray-500)', marginBottom: 28 }}>Sélectionnez le service ou pack souhaité.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                  {services.map(s => (
                    <button key={s} onClick={() => set('service', s)} style={{
                      padding: '14px 18px', borderRadius: 12, textAlign: 'left',
                      background: form.service === s ? 'rgba(0,194,255,0.1)' : 'var(--gray-100)',
                      border: `2px solid ${form.service === s ? 'var(--primary)' : 'var(--gray-300)'}`,
                      fontWeight: form.service === s ? 700 : 500, fontSize: 14, cursor: 'pointer',
                      color: form.service === s ? 'var(--primary)' : 'var(--gray-700)', transition: 'all 0.15s',
                    }}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 1 — Description + Contact */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 6 }}>Décrivez votre besoin</h2>
                  <p style={{ color: 'var(--gray-500)', marginBottom: 20 }}>Plus c'est précis, plus notre devis sera adapté.</p>
                </div>
                <div className="form-group">
                  <label className="form-label">Description détaillée *</label>
                  <textarea className="form-input" rows={5} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Décrivez votre projet, vos besoins actuels, les problèmes à résoudre..." style={{ resize: 'vertical' }} />
                  <span className="form-hint">{form.description.length}/20 caractères minimum</span>
                </div>
                <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: 20 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 16 }}>Vos coordonnées</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {[['name', 'Nom complet *', 'text'], ['email', 'Email *', 'email'], ['phone', 'Téléphone', 'tel'], ['company', 'Entreprise', 'text']].map(([k, label, type]) => (
                      <div key={k} className="form-group">
                        <label className="form-label">{label}</label>
                        <input type={type} className="form-input" value={form.clientInfo[k]} onChange={e => set('clientInfo', { ...form.clientInfo, [k]: e.target.value })} placeholder={label.replace(' *', '')} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 — Budget */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 6 }}>Budget & Localisation</h2>
                  <p style={{ color: 'var(--gray-500)', marginBottom: 20 }}>Donnez-nous une fourchette pour mieux adapter notre offre.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label className="form-label">Budget min ($)</label>
                    <input type="number" className="form-input" value={form.budget.min} onChange={e => set('budget', { ...form.budget, min: e.target.value })} placeholder="500" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Budget max ($)</label>
                    <input type="number" className="form-input" value={form.budget.max} onChange={e => set('budget', { ...form.budget, max: e.target.value })} placeholder="5000" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Devise</label>
                    <select className="form-input" value={form.budget.currency} onChange={e => set('budget', { ...form.budget, currency: e.target.value })}>
                      <option value="USD">USD</option>
                      <option value="CDF">CDF</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Localisation géographique *</label>
                  <input className="form-input" value={form.location} onChange={e => set('location', e.target.value)} placeholder="Kinshasa, Gombe / Lubumbashi / autre..." />
                  <span className="form-hint">Commune, ville ou province concernée</span>
                </div>
                <div style={{ background: 'var(--primary-light)', borderRadius: 12, padding: 16, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 20 }}>💡</span>
                  <p style={{ color: 'var(--primary-dark)', fontSize: 14, lineHeight: 1.6 }}>Aucun budget défini ? Indiquez simplement votre localisation — nous vous proposerons la solution la plus adaptée.</p>
                </div>
              </div>
            )}

            {/* STEP 3 — Files */}
            {step === 3 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 6 }}>Documents joints (optionnel)</h2>
                <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Plans, cahier des charges, photos de l'installation existante...</p>
                <div style={{ border: '2px dashed var(--gray-300)', borderRadius: 16, padding: '40px 24px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', background: 'var(--gray-100)' }}
                  onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--primary)'; }}
                  onDragLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-300)'; }}
                  onDrop={e => { e.preventDefault(); const files = Array.from(e.dataTransfer.files).slice(0, 5); set('files', files); }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>📎</div>
                  <p style={{ fontWeight: 600, marginBottom: 6 }}>Glissez vos fichiers ici</p>
                  <p style={{ color: 'var(--gray-400)', fontSize: 13, marginBottom: 16 }}>PDF, images, documents Word — max 10 Mo par fichier (5 fichiers max)</p>
                  <label style={{ cursor: 'pointer' }}>
                    <span className="btn btn-outline btn-sm">Parcourir les fichiers</span>
                    <input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={e => set('files', Array.from(e.target.files).slice(0, 5))} />
                  </label>
                </div>
                {form.files.length > 0 && (
                  <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {form.files.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--gray-100)', borderRadius: 10, padding: '10px 14px' }}>
                        <span style={{ fontSize: 20 }}>📄</span>
                        <span style={{ flex: 1, fontSize: 14, color: 'var(--gray-700)' }}>{f.name}</span>
                        <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{(f.size / 1024).toFixed(1)} Ko</span>
                        <button onClick={() => set('files', form.files.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', fontSize: 16 }}>✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* STEP 4 — Recap */}
            {step === 4 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 6 }}>Récapitulatif</h2>
                <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Vérifiez votre demande avant envoi.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { label: '🎯 Service', value: form.service },
                    { label: '📝 Description', value: form.description.slice(0, 120) + (form.description.length > 120 ? '...' : '') },
                    { label: '👤 Contact', value: `${form.clientInfo.name} — ${form.clientInfo.email}` },
                    { label: '📍 Lieu', value: form.location },
                    { label: '💰 Budget', value: form.budget.min || form.budget.max ? `${form.budget.min || '?'} – ${form.budget.max || '?'} ${form.budget.currency}` : 'Non spécifié' },
                    { label: '📎 Fichiers', value: form.files.length > 0 ? `${form.files.length} fichier(s)` : 'Aucun' },
                  ].map(r => (
                    <div key={r.label} style={{ display: 'flex', gap: 16, padding: '14px 0', borderBottom: '1px solid var(--gray-200)' }}>
                      <span style={{ fontWeight: 700, minWidth: 130, fontSize: 14 }}>{r.label}</span>
                      <span style={{ color: 'var(--gray-600)', fontSize: 14 }}>{r.value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'var(--primary-light)', borderRadius: 12, padding: '14px 16px', marginTop: 20, display: 'flex', gap: 10 }}>
                  <span>ℹ️</span>
                  <p style={{ color: 'var(--primary-dark)', fontSize: 13 }}>En soumettant, vous acceptez que notre équipe vous recontacte dans les 48h ouvrables.</p>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            {step < 5 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, gap: 12 }}>
                <button className="btn btn-ghost" onClick={() => setStep(s => s - 1)} style={{ visibility: step > 0 ? 'visible' : 'hidden' }}>← Précédent</button>
                {step < 4 ? (
                  <button className="btn btn-primary" onClick={() => setStep(s => s + 1)} disabled={!canNext()}>Suivant →</button>
                ) : (
                  <button className="btn btn-primary btn-lg" onClick={handleSubmit} disabled={loading}>
                    {loading ? '⏳ Envoi...' : '🚀 Soumettre le devis'}
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

export default DevisPage;
