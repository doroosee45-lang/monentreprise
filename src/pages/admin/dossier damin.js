import React, { useEffect, useState, useCallback } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { blogAPI } from '../../services/api';
import { StatusBadge, Modal, PageLoader, EmptyState } from '../../components/common/UI';
import toast from 'react-hot-toast';

const CATEGORIES = ['it','reseau','energie','digital','securite','cloud','formation'];
const EMPTY_FORM = { title: '', excerpt: '', content: '', category: 'it', tags: '', status: 'draft', seo: { metaTitle: '', metaDescription: '' } };

const AdminBlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState('list');

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await blogAPI.getAll({ status: 'all', limit: 100 });
      setBlogs(res.data.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const openNew = () => { setForm(EMPTY_FORM); setEditing(null); setShowEditor(true); };
  const openEdit = (b) => {
    setForm({ title: b.title, excerpt: b.excerpt, content: b.content, category: b.category, tags: b.tags?.join(', ') || '', status: b.status, seo: b.seo || { metaTitle: '', metaDescription: '' } });
    setEditing(b._id);
    setShowEditor(true);
  };

  const save = async (publish = false) => {
    setSaving(true);
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
    if (publish) payload.status = 'published';
    try {
      if (editing) {
        const res = await blogAPI.update(editing, payload);
        setBlogs(bs => bs.map(b => b._id === editing ? res.data.data : b));
        toast.success('Article mis à jour !');
      } else {
        const res = await blogAPI.create(payload);
        setBlogs(bs => [res.data.data, ...bs]);
        toast.success('Article créé !');
      }
      setShowEditor(false);
    } catch (e) { toast.error(e.response?.data?.message || 'Erreur'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet article ?')) return;
    try {
      await blogAPI.delete(id);
      setBlogs(bs => bs.filter(b => b._id !== id));
      toast.success('Article supprimé');
    } catch { toast.error('Erreur'); }
  };

  return (
    <DashboardLayout type="admin">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>Blog & Catalogue</h1>
          <p style={{ color: 'var(--gray-500)', marginTop: 4 }}>{blogs.length} article(s)</p>
        </div>
        <button className="btn btn-primary" onClick={openNew}>+ Nouvel article</button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--gray-200)', padding: 4, borderRadius: 10, width: 'fit-content' }}>
        {[['list','📝 Articles'], ['seo','🎯 SEO Config']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, background: tab === id ? '#fff' : 'transparent', color: tab === id ? 'var(--dark-700)' : 'var(--gray-500)', boxShadow: tab === id ? 'var(--shadow-sm)' : 'none' }}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'list' && (
        <>
          {loading ? <PageLoader /> : blogs.length === 0 ? (
            <EmptyState icon="✍️" title="Aucun article" description="Créez votre premier article de blog." action={<button className="btn btn-primary" onClick={openNew}>Créer un article</button>} />
          ) : (
            <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
              <table className="table">
                <thead><tr><th>Titre</th><th>Catégorie</th><th>Statut</th><th>Vues</th><th>Date</th><th>Actions</th></tr></thead>
                <tbody>
                  {blogs.map(b => (
                    <tr key={b._id}>
                      <td>
                        <div style={{ fontWeight: 700, maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</div>
                        <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>/{b.slug}</div>
                      </td>
                      <td><span style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>{b.category}</span></td>
                      <td><StatusBadge status={b.status} /></td>
                      <td style={{ fontSize: 13, color: 'var(--gray-500)' }}>👁 {b.views || 0}</td>
                      <td style={{ fontSize: 12, color: 'var(--gray-400)' }}>{new Date(b.createdAt).toLocaleDateString('fr-FR')}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-ghost btn-sm" onClick={() => openEdit(b)}>✏️</button>
                          <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(b._id)} style={{ color: 'var(--error)' }}>🗑</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {tab === 'seo' && (
        <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: 'var(--shadow)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 20 }}>Configuration SEO générale</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 600 }}>
            {[['Titre du site', 'text', 'OMDEVE — Solutions IT & Digitales'],['Meta description', 'text', 'Votre partenaire en solutions IT, réseau, sécurité, cloud et énergie à Kinshasa'],['Mots-clés', 'text', 'IT, réseau, sécurité, cloud, énergie solaire, Kinshasa']].map(([lbl, type, ph]) => (
              <div key={lbl} className="form-group">
                <label className="form-label">{lbl}</label>
                <input type={type} className="form-input" placeholder={ph} />
              </div>
            ))}
            <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Sauvegarder la config SEO</button>
          </div>
        </div>
      )}

      {/* Article Editor Modal */}
      <Modal isOpen={showEditor} onClose={() => setShowEditor(false)} title={editing ? 'Modifier l\'article' : 'Nouvel article'} size="xl">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Titre de l'article *</label>
              <input className="form-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Titre accrocheur SEO-friendly..." />
            </div>
            <div className="form-group">
              <label className="form-label">Catégorie *</label>
              <select className="form-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Statut</label>
              <select className="form-input" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Extrait (résumé) *</label>
            <textarea className="form-input" rows={2} value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Résumé affiché dans la liste d'articles (150-200 caractères)..." style={{ resize: 'vertical' }} />
          </div>

          <div className="form-group">
            <label className="form-label">Contenu complet *</label>
            <textarea className="form-input" rows={12} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Rédigez votre article ici. Supporte le HTML basique..." style={{ resize: 'vertical', fontFamily: 'monospace', fontSize: 13 }} />
          </div>

          <div className="form-group">
            <label className="form-label">Tags (séparés par virgule)</label>
            <input className="form-input" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="réseau, sécurité, cloud, Kinshasa..." />
          </div>

          {/* SEO */}
          <div style={{ background: 'var(--gray-100)', borderRadius: 12, padding: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>🎯 SEO</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Meta title</label>
                <input className="form-input" value={form.seo.metaTitle} onChange={e => setForm(f => ({ ...f, seo: { ...f.seo, metaTitle: e.target.value } }))} placeholder="Titre SEO (60 car. max)" />
              </div>
              <div className="form-group">
                <label className="form-label">Meta description</label>
                <input className="form-input" value={form.seo.metaDescription} onChange={e => setForm(f => ({ ...f, seo: { ...f.seo, metaDescription: e.target.value } }))} placeholder="Description SEO (160 car. max)" />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn btn-ghost" onClick={() => setShowEditor(false)}>Annuler</button>
            <button className="btn btn-outline" onClick={() => save(false)} disabled={saving || !form.title || !form.content}>
              {saving ? '⏳...' : '💾 Brouillon'}
            </button>
            <button className="btn btn-primary" onClick={() => save(true)} disabled={saving || !form.title || !form.content}>
              {saving ? '⏳...' : '🚀 Publier'}
            </button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default AdminBlogPage;
,,, 

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


import React, { useEffect, useState, useCallback } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { devisAPI } from '../../services/api';
import { StatusBadge, PageLoader, Modal, Button, Pagination } from '../../components/common/UI';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['pending','processing','validated','rejected','archived'];
const STATUS_LABELS  = { pending:'En attente', processing:'En cours', validated:'Validé', rejected:'Refusé', archived:'Archivé' };

const AdminDevisPage = () => {
  const [devis, setDevis] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({ status: '', search: '' });
  const [editStatus, setEditStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchDevis = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 15, ...filters };
      if (!params.status) delete params.status;
      if (!params.search) delete params.search;
      const res = await devisAPI.getAll(params);
      setDevis(res.data.data);
      setTotal(res.data.total);
      setPages(res.data.pages);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [page, filters]);

  useEffect(() => { fetchDevis(); }, [fetchDevis]);

  const openDetail = (d) => {
    setSelected(d);
    setEditStatus(d.status);
    setAdminNotes(d.adminNotes || '');
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      const res = await devisAPI.update(selected._id, { status: editStatus, adminNotes });
      setDevis(prev => prev.map(d => d._id === selected._id ? res.data.data : d));
      setSelected(res.data.data);
      toast.success('Devis mis à jour !');
    } catch { toast.error('Erreur mise à jour'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce devis ?')) return;
    try {
      await devisAPI.delete(id);
      setDevis(prev => prev.filter(d => d._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success('Devis supprimé');
    } catch { toast.error('Erreur suppression'); }
  };

  return (
    <DashboardLayout type="admin">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>Gestion des devis</h1>
          <p style={{ color: 'var(--gray-500)', marginTop: 4 }}>{total} devis au total</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', borderRadius: 12, padding: '16px 20px', marginBottom: 20, boxShadow: 'var(--shadow-sm)', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <input className="form-input" style={{ flex: 1, minWidth: 200, maxWidth: 320 }} placeholder="🔍 Recherche (n°, nom, email)..." value={filters.search} onChange={e => setFilters(f => ({ ...f, search: e.target.value }))} />
        <select className="form-input" style={{ minWidth: 160 }} value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
          <option value="">Tous les statuts</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
        </select>
        <button className="btn btn-ghost btn-sm" onClick={() => setFilters({ status: '', search: '' })}>Réinitialiser</button>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
        {loading ? <div style={{ padding: 40 }}><PageLoader /></div> : (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr><th>N°</th><th>Client</th><th>Email</th><th>Service</th><th>Statut</th><th>Priorité</th><th>Date</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {devis.length === 0 && (
                    <tr><td colSpan={8} style={{ textAlign: 'center', padding: 32, color: 'var(--gray-400)' }}>Aucun devis trouvé</td></tr>
                  )}
                  {devis.map(d => (
                    <tr key={d._id}>
                      <td style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--primary)', fontSize: 13 }}>{d.number}</td>
                      <td style={{ fontWeight: 600 }}>{d.client?.firstName} {d.client?.lastName || d.clientInfo?.name}</td>
                      <td style={{ color: 'var(--gray-500)', fontSize: 13 }}>{d.clientInfo?.email}</td>
                      <td style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 13 }}>{d.service}</td>
                      <td><StatusBadge status={d.status} /></td>
                      <td>
                        <span style={{ fontSize: 12, color: d.priority === 'urgent' ? 'var(--error)' : d.priority === 'high' ? 'var(--warning)' : 'var(--gray-400)' }}>
                          {d.priority === 'urgent' ? '🔴' : d.priority === 'high' ? '🟠' : d.priority === 'normal' ? '🟡' : '🟢'} {d.priority}
                        </span>
                      </td>
                      <td style={{ color: 'var(--gray-400)', fontSize: 12 }}>{new Date(d.createdAt).toLocaleDateString('fr-FR')}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-ghost btn-sm" onClick={() => openDetail(d)} title="Voir détail">👁</button>
                          {d.pdfUrl && <a href={d.pdfUrl} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" title="Télécharger PDF">📄</a>}
                          <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(d._id)} title="Supprimer" style={{ color: 'var(--error)' }}>🗑</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={page} pages={pages} onPageChange={setPage} />
          </>
        )}
      </div>

      {/* Detail modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={`Devis ${selected?.number}`} size="lg">
        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                ['Client', `${selected.client?.firstName || ''} ${selected.client?.lastName || selected.clientInfo?.name || ''}`],
                ['Email', selected.clientInfo?.email],
                ['Téléphone', selected.clientInfo?.phone || '—'],
                ['Entreprise', selected.clientInfo?.company || '—'],
                ['Service', selected.service],
                ['Lieu', selected.location || '—'],
                ['Budget', selected.budget?.min ? `${selected.budget.min} – ${selected.budget.max} ${selected.budget.currency}` : '—'],
                ['Date', new Date(selected.createdAt).toLocaleDateString('fr-FR')],
              ].map(([k, v]) => (
                <div key={k} style={{ background: 'var(--gray-100)', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 4 }}>{k}</div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{v}</div>
                </div>
              ))}
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 8 }}>Description</div>
              <div style={{ background: 'var(--gray-100)', borderRadius: 10, padding: 14, fontSize: 14, lineHeight: 1.7 }}>{selected.description}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Changer le statut</label>
                <select className="form-input" value={editStatus} onChange={e => setEditStatus(e.target.value)}>
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Notes internes (admin)</label>
              <textarea className="form-input" rows={3} value={adminNotes} onChange={e => setAdminNotes(e.target.value)} placeholder="Notes visibles uniquement par l'équipe..." style={{ resize: 'vertical' }} />
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setSelected(null)}>Fermer</button>
              <button className="btn btn-primary" onClick={saveChanges} disabled={saving}>
                {saving ? '⏳ Sauvegarde...' : '💾 Sauvegarder'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default AdminDevisPage;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { usersAPI } from '../../services/api';
import { StatCard, StatusBadge, PageLoader } from '../../components/common/UI';

const MONTHS = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
const COLORS = ['#00c2ff','#22c55e','#f59e0b','#a855f7','#ef4444'];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    usersAPI.getDashboard()
      .then(r => setStats(r.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <DashboardLayout type="admin"><PageLoader /></DashboardLayout>;

  const chartData = stats?.monthlyDevis?.map(d => ({
    name: MONTHS[d._id.month - 1],
    devis: d.count,
  })) || [];

  const pieData = [
    { name: 'En attente', value: stats?.openDevis || 0 },
    { name: 'Actifs', value: stats?.activeProjects || 0 },
    { name: 'Clients', value: stats?.totalClients || 0 },
  ];

  return (
    <DashboardLayout type="admin">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--dark-700)' }}>Dashboard Admin</h1>
          <p style={{ color: 'var(--gray-500)', marginTop: 4 }}>
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/admin/devis" className="btn btn-outline btn-sm">📋 Devis</Link>
          <Link to="/admin/projets" className="btn btn-primary btn-sm">🚀 Projets</Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 20, marginBottom: 28 }}>
        <StatCard icon="👥" label="Total clients" value={stats?.totalClients || 0} color="#a855f7" bg="#f3e8ff" />
        <StatCard icon="📋" label="Total devis" value={stats?.totalDevis || 0} color="var(--primary)" bg="var(--primary-light)" />
        <StatCard icon="⏳" label="Devis en attente" value={stats?.openDevis || 0} color="var(--warning)" bg="#fef3c7" />
        <StatCard icon="🚀" label="Projets actifs" value={stats?.activeProjects || 0} color="var(--success)" bg="#dcfce7" />
        <StatCard icon="💬" label="Tickets ouverts" value={stats?.openTickets || 0} color="var(--error)" bg="#fee2e2" />
        <StatCard icon="📁" label="Total projets" value={stats?.totalProjects || 0} color="var(--info)" bg="#dbeafe" />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 28 }}>
        {/* Line chart */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, marginBottom: 20 }}>Évolution des devis (6 derniers mois)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="devis" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00c2ff" />
                  <stop offset="100%" stopColor="#0099cc" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, marginBottom: 20 }}>Répartition activité</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none' }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            {pieData.map((d, i) => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: COLORS[i], flexShrink: 0 }} />
                <span style={{ flex: 1, color: 'var(--gray-600)' }}>{d.name}</span>
                <span style={{ fontWeight: 700 }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent devis table */}
      <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>Derniers devis reçus</h3>
          <Link to="/admin/devis" style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 600 }}>Voir tout →</Link>
        </div>
        {!stats?.recentDevis?.length ? (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--gray-400)' }}>Aucun devis récent</div>
        ) : (
          <table className="table">
            <thead>
              <tr><th>Numéro</th><th>Client</th><th>Service</th><th>Statut</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {stats.recentDevis.map(d => (
                <tr key={d._id}>
                  <td style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--primary)', fontSize: 13 }}>{d.number}</td>
                  <td style={{ fontWeight: 600 }}>{d.client?.firstName} {d.client?.lastName || d.clientInfo?.name}</td>
                  <td style={{ color: 'var(--gray-500)', fontSize: 13 }}>{d.service}</td>
                  <td><StatusBadge status={d.status} /></td>
                  <td style={{ color: 'var(--gray-400)', fontSize: 12 }}>{new Date(d.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <Link to="/admin/devis" className="btn btn-ghost btn-sm" style={{ fontSize: 13, color: 'var(--primary)' }}>Voir →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
import React, { useEffect, useState, useCallback } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { prospectsAPI } from '../../services/api';
import { StatusBadge, Modal, PageLoader } from '../../components/common/UI';
import toast from 'react-hot-toast';

const STAGES = [
  { id: 'lead',        label: 'Lead',         color: '#94a3b8', bg: '#f1f5f9' },
  { id: 'contact',     label: 'Contact',       color: '#3b82f6', bg: '#dbeafe' },
  { id: 'proposal',    label: 'Proposition',   color: '#f59e0b', bg: '#fef3c7' },
  { id: 'negotiation', label: 'Négociation',   color: '#a855f7', bg: '#f3e8ff' },
  { id: 'signed',      label: 'Signé ✅',      color: '#22c55e', bg: '#dcfce7' },
  { id: 'lost',        label: 'Perdu ❌',      color: '#ef4444', bg: '#fee2e2' },
];

const EMPTY_FORM = { firstName: '', lastName: '', email: '', phone: '', company: '', source: 'website', stage: 'lead', estimatedValue: '', notes: '' };

const AdminCRMPage = () => {
  const [prospects, setProspects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [detail, setDetail] = useState(null);
  const [interaction, setInteraction] = useState({ type: 'note', content: '' });
  const [dragging, setDragging] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await prospectsAPI.getAll({ limit: 200 });
      setProspects(res.data.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const byStage = (stageId) => prospects.filter(p => p.stage === stageId);

  const openAdd = () => { setForm(EMPTY_FORM); setEditing(null); setShowModal(true); };
  const openEdit = (p) => {
    setForm({ firstName: p.firstName, lastName: p.lastName, email: p.email || '', phone: p.phone || '', company: p.company || '', source: p.source, stage: p.stage, estimatedValue: p.estimatedValue || '', notes: p.notes || '' });
    setEditing(p._id);
    setShowModal(true);
  };

  const save = async () => {
    try {
      if (editing) {
        const res = await prospectsAPI.update(editing, form);
        setProspects(ps => ps.map(p => p._id === editing ? res.data.data : p));
        toast.success('Prospect mis à jour !');
      } else {
        const res = await prospectsAPI.create(form);
        setProspects(ps => [res.data.data, ...ps]);
        toast.success('Prospect ajouté !');
      }
      setShowModal(false);
    } catch (e) { toast.error(e.response?.data?.message || 'Erreur'); }
  };

  const moveStage = async (id, newStage) => {
    try {
      const res = await prospectsAPI.update(id, { stage: newStage });
      setProspects(ps => ps.map(p => p._id === id ? res.data.data : p));
    } catch { toast.error('Erreur déplacement'); }
  };

  const addInteraction = async () => {
    if (!interaction.content.trim()) return;
    try {
      const res = await prospectsAPI.addInteraction(detail._id, interaction);
      setDetail(res.data.data);
      setProspects(ps => ps.map(p => p._id === detail._id ? res.data.data : p));
      setInteraction({ type: 'note', content: '' });
      toast.success('Interaction ajoutée !');
    } catch { toast.error('Erreur'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce prospect ?')) return;
    try {
      await prospectsAPI.delete(id);
      setProspects(ps => ps.filter(p => p._id !== id));
      toast.success('Supprimé');
    } catch { toast.error('Erreur'); }
  };

  return (
    <DashboardLayout type="admin">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>CRM — Pipeline Commercial</h1>
          <p style={{ color: 'var(--gray-500)', marginTop: 4 }}>{prospects.length} prospects au total</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>+ Nouveau prospect</button>
      </div>

      {/* Summary row */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }}>
        {STAGES.map(s => (
          <div key={s.id} style={{ background: '#fff', borderRadius: 12, padding: '12px 18px', border: `2px solid ${s.color}22`, flexShrink: 0 }}>
            <div style={{ fontWeight: 800, fontSize: 22, fontFamily: 'var(--font-display)', color: s.color }}>{byStage(s.id).length}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Kanban board */}
      {loading ? <PageLoader /> : (
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 16, alignItems: 'flex-start' }}>
          {STAGES.map(stage => (
            <div
              key={stage.id}
              style={{ minWidth: 270, background: 'var(--gray-200)', borderRadius: 14, padding: 14, flexShrink: 0 }}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); if (dragging) moveStage(dragging, stage.id); setDragging(null); }}
            >
              {/* Column header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 10, borderBottom: `2px solid ${stage.color}` }}>
                <span style={{ fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', color: stage.color }}>{stage.label}</span>
                <span style={{ background: stage.color, color: '#fff', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>{byStage(stage.id).length}</span>
              </div>

              {/* Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 80 }}>
                {byStage(stage.id).map(p => (
                  <div
                    key={p._id}
                    draggable
                    onDragStart={() => setDragging(p._id)}
                    onDragEnd={() => setDragging(null)}
                    style={{
                      background: '#fff', borderRadius: 10, padding: '14px 14px',
                      boxShadow: 'var(--shadow-sm)', cursor: 'grab',
                      borderLeft: `3px solid ${stage.color}`,
                      transition: 'box-shadow 0.15s',
                      opacity: dragging === p._id ? 0.5 : 1,
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{p.firstName} {p.lastName}</div>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button onClick={() => setDetail(p)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }} title="Voir">👁</button>
                        <button onClick={() => openEdit(p)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }} title="Éditer">✏️</button>
                        <button onClick={() => handleDelete(p._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }} title="Supprimer">🗑</button>
                      </div>
                    </div>
                    {p.company && <div style={{ fontSize: 12, color: 'var(--gray-500)', marginBottom: 4 }}>🏢 {p.company}</div>}
                    {p.email && <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>✉️ {p.email}</div>}
                    {p.estimatedValue > 0 && <div style={{ fontSize: 12, color: 'var(--success)', fontWeight: 700, marginTop: 6 }}>💰 {p.estimatedValue.toLocaleString()} $</div>}
                    {p.interactions?.length > 0 && <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4 }}>💬 {p.interactions.length} interaction(s)</div>}
                  </div>
                ))}

                {byStage(stage.id).length === 0 && (
                  <div style={{ textAlign: 'center', color: 'var(--gray-400)', fontSize: 13, padding: '20px 0', border: '2px dashed var(--gray-300)', borderRadius: 8 }}>
                    Glisser ici
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Modifier prospect' : 'Nouveau prospect'} size="md">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[['firstName','Prénom *'],['lastName','Nom *'],['email','Email'],['phone','Téléphone'],['company','Entreprise']].map(([k, lbl]) => (
              <div key={k} className="form-group" style={k === 'company' ? { gridColumn: '1 / -1' } : {}}>
                <label className="form-label">{lbl}</label>
                <input className="form-input" value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Source</label>
              <select className="form-input" value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))}>
                {['website','referral','social','direct','other'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Étape</label>
              <select className="form-input" value={form.stage} onChange={e => setForm(f => ({ ...f, stage: e.target.value }))}>
                {STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Valeur estimée ($)</label>
              <input type="number" className="form-input" value={form.estimatedValue} onChange={e => setForm(f => ({ ...f, estimatedValue: e.target.value }))} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea className="form-input" rows={3} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} style={{ resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Annuler</button>
            <button className="btn btn-primary" onClick={save} disabled={!form.firstName || !form.lastName}>{editing ? 'Mettre à jour' : 'Créer'}</button>
          </div>
        </div>
      </Modal>

      {/* Detail modal */}
      <Modal isOpen={!!detail} onClose={() => setDetail(null)} title={detail ? `${detail.firstName} ${detail.lastName}` : ''} size="lg">
        {detail && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              {[['Email', detail.email || '—'], ['Téléphone', detail.phone || '—'], ['Entreprise', detail.company || '—'], ['Source', detail.source], ['Valeur estimée', detail.estimatedValue ? `${detail.estimatedValue} $` : '—'], ['Étape', detail.stage]].map(([k, v]) => (
                <div key={k} style={{ background: 'var(--gray-100)', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 4 }}>{k}</div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Interactions */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 12 }}>Interactions ({detail.interactions?.length || 0})</h4>
              <div style={{ maxHeight: 200, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                {detail.interactions?.map((i, idx) => (
                  <div key={idx} style={{ background: 'var(--gray-100)', borderRadius: 8, padding: '10px 14px', fontSize: 13 }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                      <span style={{ background: '#dbeafe', color: '#2563eb', padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>{i.type}</span>
                      <span style={{ color: 'var(--gray-400)', fontSize: 11 }}>{new Date(i.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div style={{ color: 'var(--gray-700)' }}>{i.content}</div>
                  </div>
                ))}
                {!detail.interactions?.length && <p style={{ color: 'var(--gray-400)', fontSize: 13 }}>Aucune interaction enregistrée</p>}
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <select className="form-input" style={{ width: 120 }} value={interaction.type} onChange={e => setInteraction(i => ({ ...i, type: e.target.value }))}>
                  {['call','email','meeting','note'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <input className="form-input" style={{ flex: 1 }} placeholder="Contenu de l'interaction..." value={interaction.content} onChange={e => setInteraction(i => ({ ...i, content: e.target.value }))} onKeyDown={e => e.key === 'Enter' && addInteraction()} />
                <button className="btn btn-primary btn-sm" onClick={addInteraction}>Ajouter</button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default AdminCRMPage;


import React, { useEffect, useState, useCallback } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { usersAPI } from '../../services/api';
import { StatusBadge, Modal, PageLoader, Pagination } from '../../components/common/UI';
import toast from 'react-hot-toast';

const ROLES = ['super_admin','admin','manager','client','visitor'];
const ROLE_COLORS = { super_admin: 'error', admin: 'warning', manager: 'info', client: 'success', visitor: 'gray' };

const AdminClientsPage = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({ search: '', role: '' });
  const [editForm, setEditForm] = useState({ role: '', isActive: true });

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 20, ...filters };
      if (!params.search) delete params.search;
      if (!params.role) delete params.role;
      const res = await usersAPI.getAll(params);
      setUsers(res.data.data);
      setTotal(res.data.total);
      setPages(Math.ceil(res.data.total / 20));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [page, filters]);

  useEffect(() => { fetch(); }, [fetch]);

  const openEdit = (u) => {
    setSelected(u);
    setEditForm({ role: u.role, isActive: u.isActive });
  };

  const saveUser = async () => {
    try {
      const res = await usersAPI.update(selected._id, editForm);
      setUsers(us => us.map(u => u._id === selected._id ? res.data.data : u));
      setSelected(null);
      toast.success('Utilisateur mis à jour !');
    } catch (e) { toast.error(e.response?.data?.message || 'Erreur'); }
  };

  const toggleActive = async (u) => {
    try {
      const res = await usersAPI.update(u._id, { isActive: !u.isActive });
      setUsers(us => us.map(x => x._id === u._id ? res.data.data : x));
      toast.success(res.data.data.isActive ? 'Compte activé' : 'Compte désactivé');
    } catch { toast.error('Erreur'); }
  };

  return (
    <DashboardLayout type="admin">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>Clients & Gestion des rôles</h1>
          <p style={{ color: 'var(--gray-500)', marginTop: 4 }}>{total} utilisateurs au total</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', borderRadius: 12, padding: '16px 20px', marginBottom: 20, boxShadow: 'var(--shadow-sm)', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <input className="form-input" style={{ flex: 1, minWidth: 200 }} placeholder="🔍 Recherche nom, email..." value={filters.search} onChange={e => setFilters(f => ({ ...f, search: e.target.value }))} />
        <select className="form-input" style={{ minWidth: 160 }} value={filters.role} onChange={e => setFilters(f => ({ ...f, role: e.target.value }))}>
          <option value="">Tous les rôles</option>
          {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <button className="btn btn-ghost btn-sm" onClick={() => setFilters({ search: '', role: '' })}>Réinitialiser</button>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
        {loading ? <div style={{ padding: 40 }}><PageLoader /></div> : (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr><th>Utilisateur</th><th>Email</th><th>Rôle</th><th>Téléphone</th><th>Statut</th><th>Inscription</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {users.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center', padding: 32, color: 'var(--gray-400)' }}>Aucun utilisateur trouvé</td></tr>}
                  {users.map(u => (
                    <tr key={u._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#00c2ff,#0099cc)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#0a0e1a', fontSize: 13, flexShrink: 0 }}>
                            {u.firstName?.[0]}{u.lastName?.[0]}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 14 }}>{u.firstName} {u.lastName}</div>
                            {u.company && <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{u.company}</div>}
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize: 13, color: 'var(--gray-500)' }}>{u.email}</td>
                      <td>
                        <span style={{ background: `var(--${ROLE_COLORS[u.role] || 'gray'}-100, var(--gray-200))`, color: 'var(--gray-700)', padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
                          {u.role}
                        </span>
                      </td>
                      <td style={{ fontSize: 13, color: 'var(--gray-500)' }}>{u.phone || '—'}</td>
                      <td>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: u.isActive ? 'var(--success)' : 'var(--error)', fontWeight: 600 }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: u.isActive ? 'var(--success)' : 'var(--error)', flexShrink: 0 }} />
                          {u.isActive ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                      <td style={{ fontSize: 12, color: 'var(--gray-400)' }}>{new Date(u.createdAt).toLocaleDateString('fr-FR')}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-ghost btn-sm" onClick={() => openEdit(u)} title="Modifier">✏️</button>
                          <button className="btn btn-ghost btn-sm" onClick={() => toggleActive(u)} title={u.isActive ? 'Désactiver' : 'Activer'} style={{ color: u.isActive ? 'var(--error)' : 'var(--success)' }}>
                            {u.isActive ? '🚫' : '✅'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={page} pages={pages} onPageChange={setPage} />
          </>
        )}
      </div>

      {/* Edit modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={`Modifier — ${selected?.firstName} ${selected?.lastName}`} size="sm">
        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'var(--gray-100)', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 2 }}>Email</div>
              <div style={{ fontWeight: 600 }}>{selected.email}</div>
            </div>
            <div className="form-group">
              <label className="form-label">Rôle</label>
              <select className="form-input" value={editForm.role} onChange={e => setEditForm(f => ({ ...f, role: e.target.value }))}>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <label style={{ fontWeight: 600, fontSize: 14 }}>Compte actif</label>
              <div
                onClick={() => setEditForm(f => ({ ...f, isActive: !f.isActive }))}
                style={{ width: 44, height: 24, background: editForm.isActive ? 'var(--success)' : 'var(--gray-300)', borderRadius: 999, position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
                <div style={{ position: 'absolute', top: 2, left: editForm.isActive ? 22 : 2, width: 20, height: 20, background: '#fff', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </div>
              <span style={{ fontSize: 13, color: editForm.isActive ? 'var(--success)' : 'var(--error)', fontWeight: 600 }}>{editForm.isActive ? 'Actif' : 'Inactif'}</span>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
              <button className="btn btn-ghost" onClick={() => setSelected(null)}>Annuler</button>
              <button className="btn btn-primary" onClick={saveUser}>Sauvegarder</button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default AdminClientsPage;


import React, { useEffect, useState, useCallback } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { blogAPI } from '../../services/api';
import { StatusBadge, Modal, PageLoader, EmptyState } from '../../components/common/UI';
import toast from 'react-hot-toast';

const CATEGORIES = ['it','reseau','energie','digital','securite','cloud','formation'];
const EMPTY_FORM = { title: '', excerpt: '', content: '', category: 'it', tags: '', status: 'draft', seo: { metaTitle: '', metaDescription: '' } };

const AdminBlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState('list');

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await blogAPI.getAll({ status: 'all', limit: 100 });
      setBlogs(res.data.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const openNew = () => { setForm(EMPTY_FORM); setEditing(null); setShowEditor(true); };
  const openEdit = (b) => {
    setForm({ title: b.title, excerpt: b.excerpt, content: b.content, category: b.category, tags: b.tags?.join(', ') || '', status: b.status, seo: b.seo || { metaTitle: '', metaDescription: '' } });
    setEditing(b._id);
    setShowEditor(true);
  };

  const save = async (publish = false) => {
    setSaving(true);
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
    if (publish) payload.status = 'published';
    try {
      if (editing) {
        const res = await blogAPI.update(editing, payload);
        setBlogs(bs => bs.map(b => b._id === editing ? res.data.data : b));
        toast.success('Article mis à jour !');
      } else {
        const res = await blogAPI.create(payload);
        setBlogs(bs => [res.data.data, ...bs]);
        toast.success('Article créé !');
      }
      setShowEditor(false);
    } catch (e) { toast.error(e.response?.data?.message || 'Erreur'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet article ?')) return;
    try {
      await blogAPI.delete(id);
      setBlogs(bs => bs.filter(b => b._id !== id));
      toast.success('Article supprimé');
    } catch { toast.error('Erreur'); }
  };

  return (
    <DashboardLayout type="admin">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>Blog & Catalogue</h1>
          <p style={{ color: 'var(--gray-500)', marginTop: 4 }}>{blogs.length} article(s)</p>
        </div>
        <button className="btn btn-primary" onClick={openNew}>+ Nouvel article</button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--gray-200)', padding: 4, borderRadius: 10, width: 'fit-content' }}>
        {[['list','📝 Articles'], ['seo','🎯 SEO Config']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, background: tab === id ? '#fff' : 'transparent', color: tab === id ? 'var(--dark-700)' : 'var(--gray-500)', boxShadow: tab === id ? 'var(--shadow-sm)' : 'none' }}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'list' && (
        <>
          {loading ? <PageLoader /> : blogs.length === 0 ? (
            <EmptyState icon="✍️" title="Aucun article" description="Créez votre premier article de blog." action={<button className="btn btn-primary" onClick={openNew}>Créer un article</button>} />
          ) : (
            <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
              <table className="table">
                <thead><tr><th>Titre</th><th>Catégorie</th><th>Statut</th><th>Vues</th><th>Date</th><th>Actions</th></tr></thead>
                <tbody>
                  {blogs.map(b => (
                    <tr key={b._id}>
                      <td>
                        <div style={{ fontWeight: 700, maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</div>
                        <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>/{b.slug}</div>
                      </td>
                      <td><span style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>{b.category}</span></td>
                      <td><StatusBadge status={b.status} /></td>
                      <td style={{ fontSize: 13, color: 'var(--gray-500)' }}>👁 {b.views || 0}</td>
                      <td style={{ fontSize: 12, color: 'var(--gray-400)' }}>{new Date(b.createdAt).toLocaleDateString('fr-FR')}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-ghost btn-sm" onClick={() => openEdit(b)}>✏️</button>
                          <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(b._id)} style={{ color: 'var(--error)' }}>🗑</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {tab === 'seo' && (
        <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: 'var(--shadow)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 20 }}>Configuration SEO générale</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 600 }}>
            {[['Titre du site', 'text', 'OMDEVE — Solutions IT & Digitales'],['Meta description', 'text', 'Votre partenaire en solutions IT, réseau, sécurité, cloud et énergie à Kinshasa'],['Mots-clés', 'text', 'IT, réseau, sécurité, cloud, énergie solaire, Kinshasa']].map(([lbl, type, ph]) => (
              <div key={lbl} className="form-group">
                <label className="form-label">{lbl}</label>
                <input type={type} className="form-input" placeholder={ph} />
              </div>
            ))}
            <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Sauvegarder la config SEO</button>
          </div>
        </div>
      )}

      {/* Article Editor Modal */}
      <Modal isOpen={showEditor} onClose={() => setShowEditor(false)} title={editing ? 'Modifier l\'article' : 'Nouvel article'} size="xl">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Titre de l'article *</label>
              <input className="form-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Titre accrocheur SEO-friendly..." />
            </div>
            <div className="form-group">
              <label className="form-label">Catégorie *</label>
              <select className="form-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Statut</label>
              <select className="form-input" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Extrait (résumé) *</label>
            <textarea className="form-input" rows={2} value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Résumé affiché dans la liste d'articles (150-200 caractères)..." style={{ resize: 'vertical' }} />
          </div>

          <div className="form-group">
            <label className="form-label">Contenu complet *</label>
            <textarea className="form-input" rows={12} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Rédigez votre article ici. Supporte le HTML basique..." style={{ resize: 'vertical', fontFamily: 'monospace', fontSize: 13 }} />
          </div>

          <div className="form-group">
            <label className="form-label">Tags (séparés par virgule)</label>
            <input className="form-input" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="réseau, sécurité, cloud, Kinshasa..." />
          </div>

          {/* SEO */}
          <div style={{ background: 'var(--gray-100)', borderRadius: 12, padding: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>🎯 SEO</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Meta title</label>
                <input className="form-input" value={form.seo.metaTitle} onChange={e => setForm(f => ({ ...f, seo: { ...f.seo, metaTitle: e.target.value } }))} placeholder="Titre SEO (60 car. max)" />
              </div>
              <div className="form-group">
                <label className="form-label">Meta description</label>
                <input className="form-input" value={form.seo.metaDescription} onChange={e => setForm(f => ({ ...f, seo: { ...f.seo, metaDescription: e.target.value } }))} placeholder="Description SEO (160 car. max)" />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn btn-ghost" onClick={() => setShowEditor(false)}>Annuler</button>
            <button className="btn btn-outline" onClick={() => save(false)} disabled={saving || !form.title || !form.content}>
              {saving ? '⏳...' : '💾 Brouillon'}
            </button>
            <button className="btn btn-primary" onClick={() => save(true)} disabled={saving || !form.title || !form.content}>
              {saving ? '⏳...' : '🚀 Publier'}
            </button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default AdminBlogPage;
