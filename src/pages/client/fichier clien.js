import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import useAuthStore from '../../store/authStore';
import { devisAPI, projectsAPI, ticketsAPI } from '../../services/api';
import { StatCard, StatusBadge, PageLoader } from '../../components/common/UI';

const ClientDashboard = () => {
  const { user } = useAuthStore();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [devisRes, projectsRes, ticketsRes] = await Promise.all([
          devisAPI.getMy(),
          projectsAPI.getMy(),
          ticketsAPI.getMy(),
        ]);
        setData({
          devis: devisRes.data.data,
          projects: projectsRes.data.data,
          tickets: ticketsRes.data.data,
        });
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchAll();
  }, []);

  if (loading) return <DashboardLayout type="client"><PageLoader /></DashboardLayout>;

  const pendingDevis = data?.devis?.filter(d => d.status === 'pending').length || 0;
  const activeProjects = data?.projects?.filter(p => p.status === 'in_progress').length || 0;
  const openTickets = data?.tickets?.filter(t => t.status !== 'closed').length || 0;

  const getHour = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Bonjour';
    if (h < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  return (
    <DashboardLayout type="client">
      {/* Welcome */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--dark-700)', marginBottom: 4 }}>
          {getHour()}, {user?.firstName} 👋
        </h1>
        <p style={{ color: 'var(--gray-500)' }}>Voici un aperçu de votre espace client OMDEVE</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 32 }}>
        <StatCard icon="📋" label="Devis en attente" value={pendingDevis} color="var(--warning)" bg="#fef3c7" />
        <StatCard icon="🚀" label="Projets actifs" value={activeProjects} color="var(--primary)" bg="var(--primary-light)" />
        <StatCard icon="💬" label="Tickets ouverts" value={openTickets} color="var(--info)" bg="#dbeafe" />
        <StatCard icon="📂" label="Total devis" value={data?.devis?.length || 0} color="var(--success)" bg="#dcfce7" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 24 }}>
        {/* Recent devis */}
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>Mes derniers devis</h3>
            <Link to="/client/devis" style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 600 }}>Voir tout →</Link>
          </div>
          {data?.devis?.length === 0 ? (
            <div style={{ padding: '40px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
              <p style={{ color: 'var(--gray-500)', marginBottom: 16 }}>Aucun devis pour l'instant</p>
              <Link to="/devis" className="btn btn-primary btn-sm">Demander un devis</Link>
            </div>
          ) : (
            <table className="table">
              <thead><tr><th>N°</th><th>Service</th><th>Statut</th><th>Date</th></tr></thead>
              <tbody>
                {data?.devis?.slice(0, 5).map(d => (
                  <tr key={d._id}>
                    <td style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--primary)', fontSize: 13 }}>{d.number}</td>
                    <td style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.service}</td>
                    <td><StatusBadge status={d.status} /></td>
                    <td style={{ color: 'var(--gray-400)', fontSize: 13 }}>{new Date(d.createdAt).toLocaleDateString('fr-FR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Active projects */}
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>Projets en cours</h3>
            <Link to="/client/projets" style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 600 }}>Voir tout →</Link>
          </div>
          {data?.projects?.filter(p => p.status === 'in_progress').length === 0 ? (
            <div style={{ padding: '40px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🚀</div>
              <p style={{ color: 'var(--gray-500)' }}>Aucun projet actif</p>
            </div>
          ) : (
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data?.projects?.filter(p => p.status === 'in_progress').slice(0, 4).map(p => (
                <div key={p._id} style={{ background: 'var(--gray-100)', borderRadius: 10, padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{p.title}</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: 13 }}>{p.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {[
          { to: '/devis', icon: '📋', label: 'Nouveau devis', color: 'var(--primary)', bg: 'var(--primary-light)' },
          { to: '/audit', icon: '🔍', label: 'Audit gratuit', color: '#a855f7', bg: '#f3e8ff' },
          { to: '/client/messagerie', icon: '💬', label: 'Contacter le support', color: 'var(--success)', bg: '#dcfce7' },
          { to: '/services', icon: '🛠️', label: 'Voir les services', color: 'var(--warning)', bg: '#fef3c7' },
        ].map(a => (
          <Link key={a.to} to={a.to} style={{ background: '#fff', borderRadius: 14, padding: '20px 20px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: 'var(--shadow-sm)', textDecoration: 'none', transition: 'all 0.2s', border: '1px solid var(--gray-200)' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}>
            <div style={{ width: 44, height: 44, background: a.bg, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{a.icon}</div>
            <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--dark-700)' }}>{a.label}</span>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { devisAPI, projectsAPI, ticketsAPI } from '../../services/api';
import { StatusBadge, PageLoader, EmptyState, ProgressBar, Modal, Button } from '../../components/common/UI';
import toast from 'react-hot-toast';

/* ============================= MES DEVIS ============================= */
export const ClientDevisPage = () => {
  const [devis, setDevis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    devisAPI.getMy().then(r => setDevis(r.data.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <DashboardLayout type="client"><PageLoader /></DashboardLayout>;

  return (
    <DashboardLayout type="client">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>Mes devis</h1>
          <p style={{ color: 'var(--gray-500)', marginTop: 4 }}>{devis.length} demande(s) au total</p>
        </div>
        <Link to="/devis" className="btn btn-primary">+ Nouveau devis</Link>
      </div>

      {devis.length === 0 ? (
        <EmptyState icon="📋" title="Aucun devis" description="Vous n'avez pas encore soumis de demande de devis." action={<Link to="/devis" className="btn btn-primary">Demander un devis</Link>} />
      ) : (
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Numéro</th><th>Service</th><th>Description</th><th>Statut</th><th>Date</th><th>PDF</th>
              </tr>
            </thead>
            <tbody>
              {devis.map(d => (
                <tr key={d._id}>
                  <td style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--primary)' }}>{d.number}</td>
                  <td style={{ fontWeight: 600 }}>{d.service}</td>
                  <td style={{ maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--gray-500)', fontSize: 13 }}>{d.description}</td>
                  <td><StatusBadge status={d.status} /></td>
                  <td style={{ color: 'var(--gray-400)', fontSize: 13 }}>{new Date(d.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td>
                    {d.pdfUrl ? (
                      <a href={d.pdfUrl} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ fontSize: 18 }}>📄</a>
                    ) : <span style={{ color: 'var(--gray-300)', fontSize: 12 }}>—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

/* ============================= MES PROJETS ============================= */
export const ClientProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    projectsAPI.getMy().then(r => setProjects(r.data.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <DashboardLayout type="client"><PageLoader /></DashboardLayout>;

  return (
    <DashboardLayout type="client">
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>Mes projets</h1>
        <p style={{ color: 'var(--gray-500)', marginTop: 4 }}>{projects.length} projet(s) au total</p>
      </div>

      {projects.length === 0 ? (
        <EmptyState icon="🚀" title="Aucun projet" description="Vous n'avez pas encore de projet en cours." />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {projects.map(p => (
            <div key={p._id} style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow)', cursor: 'pointer', transition: 'all 0.2s', border: '2px solid transparent' }}
              onClick={() => setSelected(p)}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, marginBottom: 4 }}>{p.title}</h3>
                  <StatusBadge status={p.status} />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--primary)' }}>{p.progress}%</div>
                  <div style={{ color: 'var(--gray-400)', fontSize: 11 }}>avancement</div>
                </div>
              </div>
              <ProgressBar value={p.progress} />
              <div style={{ marginTop: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {p.manager && <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>👤 {p.manager.firstName} {p.manager.lastName}</div>}
                {p.estimatedEndDate && <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>📅 {new Date(p.estimatedEndDate).toLocaleDateString('fr-FR')}</div>}
              </div>
              {p.tasks?.length > 0 && (
                <div style={{ marginTop: 12, background: 'var(--gray-100)', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: 'var(--gray-600)' }}>
                  ✅ {p.tasks.filter(t => t.status === 'done').length}/{p.tasks.length} tâches complétées
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Project detail modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.title} size="lg">
        {selected && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              {[
                ['Statut', <StatusBadge status={selected.status} />],
                ['Avancement', `${selected.progress}%`],
                ['Responsable', selected.manager ? `${selected.manager.firstName} ${selected.manager.lastName}` : 'Non assigné'],
                ['Date de fin estimée', selected.estimatedEndDate ? new Date(selected.estimatedEndDate).toLocaleDateString('fr-FR') : 'À définir'],
              ].map(([label, value]) => (
                <div key={label} style={{ background: 'var(--gray-100)', borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontWeight: 600 }}>{value}</div>
                </div>
              ))}
            </div>
            <ProgressBar value={selected.progress} />
            {selected.description && <p style={{ color: 'var(--gray-600)', marginTop: 16, lineHeight: 1.7 }}>{selected.description}</p>}
            {selected.tasks?.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 12 }}>Tâches ({selected.tasks.length})</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {selected.tasks.map(t => (
                    <div key={t._id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'var(--gray-100)', borderRadius: 8 }}>
                      <span style={{ fontSize: 16 }}>{t.status === 'done' ? '✅' : t.status === 'in_progress' ? '🔄' : '⏳'}</span>
                      <span style={{ fontSize: 14, fontWeight: 500, textDecoration: t.status === 'done' ? 'line-through' : 'none', color: t.status === 'done' ? 'var(--gray-400)' : 'inherit' }}>{t.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

/* ============================= MESSAGERIE ============================= */
export const ClientMessagingPage = () => {
  const [tickets, setTickets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [newMsg, setNewMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: '', message: '' });
  const { user } = require('../../store/authStore').default.getState();

  useEffect(() => {
    ticketsAPI.getMy().then(r => setTickets(r.data.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  const selectTicket = async (t) => {
    try {
      const res = await ticketsAPI.getById(t._id);
      setSelected(res.data.data);
    } catch { setSelected(t); }
  };

  const sendMessage = async () => {
    if (!newMsg.trim() || !selected) return;
    try {
      const res = await ticketsAPI.addMessage(selected._id, { content: newMsg });
      setSelected(res.data.data);
      setNewMsg('');
    } catch { toast.error('Erreur envoi'); }
  };

  const createTicket = async () => {
    if (!newTicket.subject || !newTicket.message) return;
    try {
      const res = await ticketsAPI.create(newTicket);
      setTickets(t => [res.data.data, ...t]);
      setShowNew(false);
      setNewTicket({ subject: '', message: '' });
      toast.success('Ticket créé !');
    } catch { toast.error('Erreur'); }
  };

  if (loading) return <DashboardLayout type="client"><PageLoader /></DashboardLayout>;

  return (
    <DashboardLayout type="client">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>Messagerie</h1>
        <button className="btn btn-primary" onClick={() => setShowNew(true)}>+ Nouveau ticket</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20, height: '70vh', minHeight: 500 }}>
        {/* Ticket list */}
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--gray-200)', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--gray-500)' }}>Conversations ({tickets.length})</div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {tickets.length === 0 && <div style={{ padding: 24, textAlign: 'center', color: 'var(--gray-400)', fontSize: 14 }}>Aucun ticket</div>}
            {tickets.map(t => (
              <div key={t._id} onClick={() => selectTicket(t)} style={{
                padding: '14px 16px', borderBottom: '1px solid var(--gray-100)', cursor: 'pointer',
                background: selected?._id === t._id ? 'rgba(0,194,255,0.06)' : 'transparent',
                borderLeft: selected?._id === t._id ? '3px solid var(--primary)' : '3px solid transparent',
                transition: 'all 0.15s',
              }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{t.subject}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <StatusBadge status={t.status} />
                  <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{new Date(t.updatedAt).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {!selected ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, color: 'var(--gray-400)' }}>
              <span style={{ fontSize: 48 }}>💬</span>
              <p>Sélectionnez une conversation</p>
            </div>
          ) : (
            <>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{selected.subject}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{selected.messages?.length} message(s)</div>
                </div>
                <StatusBadge status={selected.status} />
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {selected.messages?.map(m => {
                  const mine = String(m.sender?._id) === String(user?._id) || String(m.sender) === String(user?._id);
                  return (
                    <div key={m._id} style={{ display: 'flex', flexDirection: 'column', alignItems: mine ? 'flex-end' : 'flex-start', gap: 4 }}>
                      <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{m.sender?.firstName} {m.sender?.lastName} • {new Date(m.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
                      <div className={`chat-bubble ${mine ? 'mine' : 'theirs'}`}>{m.content}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ padding: '14px 16px', borderTop: '1px solid var(--gray-200)', display: 'flex', gap: 10 }}>
                <input className="form-input" style={{ flex: 1 }} placeholder="Votre message..." value={newMsg} onChange={e => setNewMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} />
                <button className="btn btn-primary" onClick={sendMessage}>Envoyer</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* New ticket modal */}
      <Modal isOpen={showNew} onClose={() => setShowNew(false)} title="Nouveau ticket" size="md">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Sujet *</label>
            <input className="form-input" value={newTicket.subject} onChange={e => setNewTicket(t => ({ ...t, subject: e.target.value }))} placeholder="Décrivez votre demande en quelques mots" />
          </div>
          <div className="form-group">
            <label className="form-label">Message *</label>
            <textarea className="form-input" rows={5} value={newTicket.message} onChange={e => setNewTicket(t => ({ ...t, message: e.target.value }))} placeholder="Détaillez votre demande..." style={{ resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn btn-ghost" onClick={() => setShowNew(false)}>Annuler</button>
            <button className="btn btn-primary" onClick={createTicket} disabled={!newTicket.subject || !newTicket.message}>Créer le ticket</button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

/* ============================= PROFIL CLIENT ============================= */
export const ClientProfilePage = () => {
  const { user, updateUser } = require('../../store/authStore').default();
  const [form, setForm] = useState({ firstName: user?.firstName || '', lastName: user?.lastName || '', phone: user?.phone || '', company: user?.company || '', address: user?.address || '' });
  const [pwdForm, setPwdForm] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [saving, setSaving] = useState(false);

  const saveProfile = async () => {
    setSaving(true);
    try {
      const { authAPI } = await import('../../services/api');
      const res = await authAPI.updateProfile(form);
      updateUser(res.data.data);
      toast.success('Profil mis à jour !');
    } catch { toast.error('Erreur'); }
    finally { setSaving(false); }
  };

  const changePassword = async () => {
    if (pwdForm.newPassword !== pwdForm.confirm) return toast.error('Les mots de passe ne correspondent pas');
    try {
      const { authAPI } = await import('../../services/api');
      await authAPI.changePassword({ currentPassword: pwdForm.currentPassword, newPassword: pwdForm.newPassword });
      toast.success('Mot de passe modifié !');
      setPwdForm({ currentPassword: '', newPassword: '', confirm: '' });
    } catch (e) { toast.error(e.response?.data?.message || 'Erreur'); }
  };

  return (
    <DashboardLayout type="client">
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, marginBottom: 28 }}>Mon profil</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Profile info */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: 'var(--shadow)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 20 }}>Informations personnelles</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[['firstName','Prénom'],['lastName','Nom'],['phone','Téléphone'],['company','Entreprise']].map(([k, lbl]) => (
              <div key={k} className="form-group">
                <label className="form-label">{lbl}</label>
                <input className="form-input" value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />
              </div>
            ))}
          </div>
          <div className="form-group" style={{ marginTop: 14 }}>
            <label className="form-label">Adresse</label>
            <input className="form-input" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Votre adresse" />
          </div>
          <button className="btn btn-primary" onClick={saveProfile} disabled={saving} style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}>
            {saving ? '⏳ Sauvegarde...' : '💾 Sauvegarder'}
          </button>
        </div>

        {/* Password */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: 'var(--shadow)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 20 }}>Changer de mot de passe</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[['currentPassword','Mot de passe actuel'],['newPassword','Nouveau mot de passe'],['confirm','Confirmation']].map(([k, lbl]) => (
              <div key={k} className="form-group">
                <label className="form-label">{lbl}</label>
                <input type="password" className="form-input" value={pwdForm[k]} onChange={e => setPwdForm(f => ({ ...f, [k]: e.target.value }))} />
              </div>
            ))}
            <button className="btn btn-dark" onClick={changePassword} style={{ justifyContent: 'center' }}>🔑 Changer le mot de passe</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
