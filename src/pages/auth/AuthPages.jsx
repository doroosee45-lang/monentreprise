import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuthStore from '../../store/authStore';

export const LoginPage = () => {
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || null;

  const [form, setForm] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { role } = await login(form.email, form.password);
      toast.success('Connexion réussie !');
      if (from) return navigate(from, { replace: true });
      const dest = ['super_admin', 'admin', 'manager'].includes(role) ? '/admin/dashboard' : '/client/dashboard';
      navigate(dest, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Email ou mot de passe incorrect');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--dark-900)' }}>
      {/* Left panel */}
      <div style={{ flex: 1, background: 'linear-gradient(135deg, var(--dark-800), var(--dark-700))', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 60px', position: 'relative', overflow: 'hidden' }} className="auth-left">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(0,194,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48, position: 'relative' }}>
          <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg,#00c2ff,#0099cc)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#0a0e1a', fontSize: 16 }}>OM</div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#fff', fontSize: 22 }}>OMDEVE</span>
        </Link>
        <div style={{ position: 'relative' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.2, marginBottom: 16 }}>Bienvenue sur votre<br /><span style={{ color: 'var(--primary)' }}>espace client</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 40, maxWidth: 380 }}>Accédez à vos devis, suivez vos projets et communiquez avec notre équipe en temps réel.</p>
          {['📋 Suivi de vos devis en temps réel', '🚀 Avancement de vos projets', '💬 Messagerie directe avec l\'équipe', '📂 Historique complet des interventions'].map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, color: 'rgba(255,255,255,0.7)', fontSize: 15 }}>
              <span style={{ width: 28, height: 28, background: 'rgba(0,194,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{f[0]}</span>
              {f.slice(2)}
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: '0 0 480px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 48px', background: '#fff' }} className="auth-right">
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--dark-700)', marginBottom: 6 }}>Connexion</h2>
          <p style={{ color: 'var(--gray-500)' }}>Entrez vos identifiants pour accéder à votre espace.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="form-group">
            <label className="form-label">Adresse email</label>
            <input type="email" className="form-input" placeholder="vous@exemple.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required autoComplete="email" />
          </div>
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label className="form-label">Mot de passe</label>
              <Link to="/forgot-password" style={{ color: 'var(--primary)', fontSize: 13 }}>Mot de passe oublié ?</Link>
            </div>
            <div style={{ position: 'relative' }}>
              <input type={show ? 'text' : 'password'} className="form-input" placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required autoComplete="current-password" style={{ paddingRight: 48 }} />
              <button type="button" onClick={() => setShow(!show)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--gray-400)', cursor: 'pointer', fontSize: 18 }}>
                {show ? '🙈' : '👁'}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading} style={{ justifyContent: 'center', marginTop: 8 }}>
            {isLoading ? '⏳ Connexion...' : 'Se connecter →'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--gray-200)' }}>
          <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>Pas encore de compte ? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700 }}>Créer un compte</Link></p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .auth-left { display: none !important; }
          .auth-right { flex: 1 !important; padding: 40px 24px !important; }
        }
      `}</style>
    </div>
  );
};

export const RegisterPage = () => {
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '' });
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return toast.error('Les mots de passe ne correspondent pas');
    if (form.password.length < 6) return toast.error('Mot de passe trop court (min 6 caractères)');
    try {
      await register({ firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone, password: form.password });
      toast.success('Compte créé ! Bienvenue chez OMDEVE 🎉');
      navigate('/client/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de la création du compte');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-100)', padding: '40px 16px' }}>
      <div style={{ width: '100%', maxWidth: 520, background: '#fff', borderRadius: 20, padding: 40, boxShadow: 'var(--shadow-xl)' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#00c2ff,#0099cc)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#0a0e1a', fontSize: 13 }}>OM</div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--dark-700)', fontSize: 18 }}>OMDEVE</span>
        </Link>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 6 }}>Créer votre compte</h2>
        <p style={{ color: 'var(--gray-500)', marginBottom: 28 }}>Rejoignez plus de 150 clients satisfaits.</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Prénom *</label>
              <input className="form-input" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label className="form-label">Nom *</label>
              <input className="form-input" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input type="email" className="form-input" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
          </div>
          <div className="form-group">
            <label className="form-label">Téléphone</label>
            <input type="tel" className="form-input" placeholder="+243 XXX XXX XXX" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Mot de passe *</label>
              <input type={show ? 'text' : 'password'} className="form-input" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required minLength={6} />
            </div>
            <div className="form-group">
              <label className="form-label">Confirmation *</label>
              <input type={show ? 'text' : 'password'} className="form-input" value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} required />
            </div>
          </div>
          <button type="button" onClick={() => setShow(!show)} style={{ background: 'none', border: 'none', color: 'var(--gray-500)', fontSize: 13, cursor: 'pointer', textAlign: 'left' }}>
            {show ? '🙈 Masquer' : '👁 Afficher'} les mots de passe
          </button>
          <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading} style={{ justifyContent: 'center' }}>
            {isLoading ? '⏳ Création...' : 'Créer mon compte →'}
          </button>
          <p style={{ color: 'var(--gray-400)', fontSize: 12, textAlign: 'center', lineHeight: 1.6 }}>
            En créant un compte, vous acceptez nos <Link to="/conditions" style={{ color: 'var(--primary)' }}>Conditions d'utilisation</Link>
          </p>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--gray-200)' }}>
          <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>Déjà un compte ? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>Se connecter</Link></p>
        </div>
      </div>
    </div>
  );
};
