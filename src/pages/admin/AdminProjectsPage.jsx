import React, { useEffect, useState, useCallback } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { projectsAPI, ticketsAPI, usersAPI } from '../../services/api';
import { StatusBadge, Modal, PageLoader, ProgressBar, EmptyState } from '../../components/common/UI';
import toast from 'react-hot-toast';

const PROJ_STATUSES = ['pending','in_progress','completed','on_hold','cancelled'];
const STATUS_LABELS = { pending:'En attente', in_progress:'En cours', completed:'Terminé', on_hold:'En pause', cancelled:'Annulé' };
const TICKET_STATUSES = ['open','in_progress','resolved','closed'];

const AdminProjectsPage = () => {
  const [tab, setTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [showNewProject, setShowNewProject] = useState(false);
  const [clients, setClients] = useState([]);
  const [managers, setManagers] = useState([]);

  const [projForm, setProjForm] = useState({ title: '', description: '', client: '', manager: '', status: 'pending', category: 'digital', startDate: '', estimatedEndDate: '' });

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [projRes, tickRes, usersRes] = await Promise.all([
        projectsAPI.getAll({ limit: 100 }),
        ticketsAPI.getAll({ limit: 100 }),
        usersAPI.getAll({ limit: 200 }),
      ]);
      setProjects(projRes.data.data);
      setTickets(tickRes.data.data);
      const users = usersRes.data.data;
      setClients(users.filter(u => u.role === 'client'));
      setManagers(users.filter(u => ['admin','manager','super_admin'].includes(u.role)));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const createProject = async () => {
    try {
      const res = await projectsAPI.create(projForm);
      setProjects(p => [res.data.data, ...p]);
      setShowNewProject(false);
      toast.success('Projet créé !');
    } catch (e) { toast.error(e.response?.data?.message || 'Erreur'); }
  };

  const updateProjectStatus = async (id, status) => {
    try {
      const res = await projectsAPI.update(id, { status });
      setProjects(ps => ps.map(p => p._id === id ? res.data.data : p));
      if (selected?._id === id) setSelected(res.data.data);
      toast.success('Statut mis à jour');
    } catch { toast.error('Erreur'); }
  };

  const updateProjectProgress = async (id, progress) => {
    try {
      const res = await projectsAPI.update(id, { progress: parseInt(progress) });
      setProjects(ps => ps.map(p => p._id === id ? res.data.data : p));
      if (selected?._id === id) setSelected(res.data.data);
    } catch { toast.error('Erreur'); }
  };

  const updateTicketStatus = async (id, status) => {
    try {
      const res = await ticketsAPI.update(id, { status });
      setTickets(ts => ts.map(t => t._id === id ? res.data.data : t));
      toast.success('Ticket mis à jour');
    } catch { toast.error('Erreur'); }
  };

  const PRIORITY_ICONS = { low: '🟢', normal: '🟡', high: '🟠', urgent: '🔴' };

  return (
    <DashboardLayout type="admin">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>Projets & Tickets</h1>
          <p style={{ color: 'var(--gray-500)', marginTop: 4 }}>{projects.length} projets · {tickets.filter(t => t.status === 'open').length} tickets ouverts</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowNewProject(true)}>+ Nouveau projet</button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--gray-200)', padding: 4, borderRadius: 10, width: 'fit-content' }}>
        {[['projects', '🚀 Projets'], ['tickets', '🎫 Tickets']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, transition: 'all 0.15s', background: tab === id ? '#fff' : 'transparent', color: tab === id ? 'var(--dark-700)' : 'var(--gray-500)', boxShadow: tab === id ? 'var(--shadow-sm)' : 'none' }}>
            {label}
          </button>
        ))}
      </div>

      {loading ? <PageLoader /> : (
        <>
          {/* ---- PROJECTS ---- */}
          {tab === 'projects' && (
            <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 20 }}>
              <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
                {projects.length === 0 ? (
                  <EmptyState icon="🚀" title="Aucun projet" description="Créez votre premier projet." action={<button className="btn btn-primary" onClick={() => setShowNewProject(true)}>Créer un projet</button>} />
                ) : (
                  <table className="table">
                    <thead><tr><th>Titre</th><th>Client</th><th>Statut</th><th>Avancement</th><th>Responsable</th><th>Fin estimée</th><th>Actions</th></tr></thead>
                    <tbody>
                      {projects.map(p => (
                        <tr key={p._id} style={{ cursor: 'pointer' }} onClick={() => setSelected(p)}>
                          <td style={{ fontWeight: 700 }}>{p.title}</td>
                          <td style={{ fontSize: 13, color: 'var(--gray-500)' }}>{p.client?.firstName} {p.client?.lastName}</td>
                          <td>
                            <select value={p.status} onClick={e => e.stopPropagation()} onChange={e => updateProjectStatus(p._id, e.target.value)} className="form-input" style={{ padding: '4px 8px', fontSize: 12, minWidth: 0 }}>
                              {PROJ_STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                            </select>
                          </td>
                          <td style={{ minWidth: 120 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <ProgressBar value={p.progress} />
                              <span style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 700, minWidth: 32 }}>{p.progress}%</span>
                            </div>
                          </td>
                          <td style={{ fontSize: 13, color: 'var(--gray-500)' }}>{p.manager?.firstName || '—'}</td>
                          <td style={{ fontSize: 12, color: 'var(--gray-400)' }}>{p.estimatedEndDate ? new Date(p.estimatedEndDate).toLocaleDateString('fr-FR') : '—'}</td>
                          <td>
                            <button onClick={e => { e.stopPropagation(); projectsAPI.delete(p._id).then(() => { setProjects(ps => ps.filter(x => x._id !== p._id)); if(selected?._id === p._id) setSelected(null); toast.success('Supprimé'); }); }} className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }}>🗑</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Project detail panel */}
              {selected && (
                <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow)', overflow: 'auto', maxHeight: '80vh' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>{selected.title}</h3>
                    <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--gray-400)' }}>✕</button>
                  </div>
                  <StatusBadge status={selected.status} />
                  <div style={{ marginTop: 16 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase' }}>Avancement</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                      <input type="range" min={0} max={100} value={selected.progress} onChange={e => updateProjectProgress(selected._id, e.target.value)} style={{ flex: 1, accentColor: 'var(--primary)' }} />
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--primary)', minWidth: 40 }}>{selected.progress}%</span>
                    </div>
                  </div>
                  {selected.description && <p style={{ color: 'var(--gray-600)', fontSize: 14, lineHeight: 1.7, marginTop: 14 }}>{selected.description}</p>}
                  {selected.tasks?.length > 0 && (
                    <div style={{ marginTop: 16 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', marginBottom: 10 }}>Tâches ({selected.tasks.length})</div>
                      {selected.tasks.map(t => (
                        <div key={t._id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', background: 'var(--gray-100)', borderRadius: 8, marginBottom: 6 }}>
                          <span>{t.status === 'done' ? '✅' : t.status === 'in_progress' ? '🔄' : '⏳'}</span>
                          <span style={{ flex: 1, fontSize: 13, textDecoration: t.status === 'done' ? 'line-through' : 'none', color: t.status === 'done' ? 'var(--gray-400)' : 'inherit' }}>{t.title}</span>
                          <span style={{ fontSize: 11 }}>{PRIORITY_ICONS[t.priority]}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ---- TICKETS ---- */}
          {tab === 'tickets' && (
            <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
              {tickets.length === 0 ? (
                <EmptyState icon="🎫" title="Aucun ticket" description="Aucun ticket support ouvert." />
              ) : (
                <table className="table">
                  <thead><tr><th>Sujet</th><th>Client</th><th>Statut</th><th>Priorité</th><th>Messages</th><th>Date</th><th>Actions</th></tr></thead>
                  <tbody>
                    {tickets.map(t => (
                      <tr key={t._id}>
                        <td style={{ fontWeight: 700, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.subject}</td>
                        <td style={{ fontSize: 13, color: 'var(--gray-500)' }}>{t.client?.firstName} {t.client?.lastName}</td>
                        <td>
                          <select value={t.status} onChange={e => updateTicketStatus(t._id, e.target.value)} className="form-input" style={{ padding: '4px 8px', fontSize: 12 }}>
                            {TICKET_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td><span style={{ fontSize: 14 }}>{PRIORITY_ICONS[t.priority]}</span> <span style={{ fontSize: 12 }}>{t.priority}</span></td>
                        <td style={{ textAlign: 'center' }}><span style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', padding: '3px 8px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>{t.messages?.length || 0}</span></td>
                        <td style={{ fontSize: 12, color: 'var(--gray-400)' }}>{new Date(t.createdAt).toLocaleDateString('fr-FR')}</td>
                        <td>
                          <button className="btn btn-ghost btn-sm" onClick={() => toast('Messagerie interne — voir /client/messagerie')} title="Ouvrir">💬</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </>
      )}

      {/* New project modal */}
      <Modal isOpen={showNewProject} onClose={() => setShowNewProject(false)} title="Nouveau projet" size="lg">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Titre du projet *</label>
            <input className="form-input" value={projForm.title} onChange={e => setProjForm(f => ({ ...f, title: e.target.value }))} placeholder="Ex : Déploiement réseau Kinshasa" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Client *</label>
              <select className="form-input" value={projForm.client} onChange={e => setProjForm(f => ({ ...f, client: e.target.value }))}>
                <option value="">-- Sélectionner --</option>
                {clients.map(c => <option key={c._id} value={c._id}>{c.firstName} {c.lastName}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Responsable</label>
              <select className="form-input" value={projForm.manager} onChange={e => setProjForm(f => ({ ...f, manager: e.target.value }))}>
                <option value="">-- Sélectionner --</option>
                {managers.map(m => <option key={m._id} value={m._id}>{m.firstName} {m.lastName}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Catégorie</label>
              <select className="form-input" value={projForm.category} onChange={e => setProjForm(f => ({ ...f, category: e.target.value }))}>
                {['reseau','securite','digital','cloud','energie','formation','materiel'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Statut initial</label>
              <select className="form-input" value={projForm.status} onChange={e => setProjForm(f => ({ ...f, status: e.target.value }))}>
                {PROJ_STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Date de début</label>
              <input type="date" className="form-input" value={projForm.startDate} onChange={e => setProjForm(f => ({ ...f, startDate: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Date de fin estimée</label>
              <input type="date" className="form-input" value={projForm.estimatedEndDate} onChange={e => setProjForm(f => ({ ...f, estimatedEndDate: e.target.value }))} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-input" rows={3} value={projForm.description} onChange={e => setProjForm(f => ({ ...f, description: e.target.value }))} style={{ resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn btn-ghost" onClick={() => setShowNewProject(false)}>Annuler</button>
            <button className="btn btn-primary" onClick={createProject} disabled={!projForm.title || !projForm.client}>Créer le projet</button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default AdminProjectsPage;
