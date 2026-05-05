import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layout/DashboardLayout';
import useAuthStore from '../../store/authStore';
import { devisAPI, projectsAPI, ticketsAPI, authAPI } from '../../services/api';
import { StatusBadge, PageLoader, EmptyState, ProgressBar, Modal } from '../../components/common/UI';

/* ================================================================== */
/*  MES DEVIS                                                           */
/* ================================================================== */
export const ClientDevisPage = () => {
  const [devis, setDevis]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    devisAPI.getMy()
      .then(r => setDevis(r.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
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
        <EmptyState icon="📋" title="Aucun devis" description="Vous n'avez pas encore soumis de demande de devis."
          action={<Link to="/devis" className="btn btn-primary">Demander un devis</Link>} />
      ) : (
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
          <table className="table">
            <thead>
              <tr><th>Numéro</th><th>Service</th><th>Description</th><th>Statut</th><th>Date</th><th>PDF</th></tr>
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
                    {d.pdfUrl
                      ? <a href={d.pdfUrl} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ fontSize: 18 }}>📄</a>
                      : <span style={{ color: 'var(--gray-300)', fontSize: 12 }}>—</span>}
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

/* ================================================================== */
/*  MES PROJETS                                                         */
/* ================================================================== */
export const ClientProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    projectsAPI.getMy()
      .then(r => setProjects(r.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
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
            <div key={p._id}
              style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow)', cursor: 'pointer', transition: 'all 0.2s', border: '2px solid transparent' }}
              onClick={() => setSelected(p)}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, marginBottom: 6 }}>{p.title}</h3>
                  <StatusBadge status={p.status} />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--primary)' }}>{p.progress}%</div>
                  <div style={{ color: 'var(--gray-400)', fontSize: 11 }}>avancement</div>
                </div>
              </div>
              <ProgressBar value={p.progress} />
              <div style={{ marginTop: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {p.manager    && <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>👤 {p.manager.firstName} {p.manager.lastName}</div>}
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

      {/* Detail modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.title} size="lg">
        {selected && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              {[
                ['Statut',            <StatusBadge status={selected.status} />],
                ['Avancement',        `${selected.progress}%`],
                ['Responsable',       selected.manager ? `${selected.manager.firstName} ${selected.manager.lastName}` : 'Non assigné'],
                ['Fin estimée',       selected.estimatedEndDate ? new Date(selected.estimatedEndDate).toLocaleDateString('fr-FR') : 'À définir'],
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

/* ================================================================== */
/*  HISTORIQUE                                                          */
/* ================================================================== */
export const HistoriquePage = () => {
  const [devis, setDevis]       = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState('all'); // all | devis | projects

  useEffect(() => {
    Promise.all([devisAPI.getMy(), projectsAPI.getMy()])
      .then(([dRes, pRes]) => {
        setDevis(dRes.data.data);
        setProjects(pRes.data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <DashboardLayout type="client"><PageLoader /></DashboardLayout>;

  /* Build unified timeline */
  const timeline = [
    ...devis.map(d => ({
      id: d._id, type: 'devis', icon: '📋',
      title: `Devis ${d.number}`,
      subtitle: d.service,
      status: d.status,
      date: new Date(d.createdAt),
      pdfUrl: d.pdfUrl || null,
      color: '#f59e0b', bg: '#fef3c7',
    })),
    ...projects.map(p => ({
      id: p._id, type: 'project', icon: '🚀',
      title: p.title,
      subtitle: p.description?.slice(0, 80) + (p.description?.length > 80 ? '…' : ''),
      status: p.status,
      date: new Date(p.startDate || p.createdAt),
      endDate: p.actualEndDate ? new Date(p.actualEndDate) : null,
      progress: p.progress,
      pdfUrl: null,
      color: 'var(--primary)', bg: 'var(--primary-light)',
    })),
  ].sort((a, b) => b.date - a.date);

  const filtered = filter === 'all' ? timeline : timeline.filter(i => i.type === filter);

  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const totalDevis        = devis.length;
  const validatedDevis    = devis.filter(d => d.status === 'validated').length;

  return (
    <DashboardLayout type="client">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>Historique</h1>
        <p style={{ color: 'var(--gray-500)', marginTop: 4 }}>Journal complet de vos interventions et services</p>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { icon: '📋', label: 'Total devis',          value: totalDevis,       color: '#f59e0b', bg: '#fef3c7' },
          { icon: '✅', label: 'Devis validés',         value: validatedDevis,   color: '#22c55e', bg: '#dcfce7' },
          { icon: '🚀', label: 'Projets complétés',     value: completedProjects, color: 'var(--primary)', bg: 'var(--primary-light)' },
          { icon: '📂', label: 'Total interventions',   value: timeline.length,  color: '#a855f7', bg: '#f3e8ff' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, background: s.bg, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{s.icon}</div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--gray-200)', padding: 4, borderRadius: 10, width: 'fit-content' }}>
        {[['all', '🗂️ Tout'], ['devis', '📋 Devis'], ['project', '🚀 Projets']].map(([id, label]) => (
          <button key={id} onClick={() => setFilter(id)} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, background: filter === id ? '#fff' : 'transparent', color: filter === id ? 'var(--dark-700)' : 'var(--gray-500)', boxShadow: filter === id ? 'var(--shadow-sm)' : 'none', transition: 'all 0.15s' }}>
            {label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      {filtered.length === 0 ? (
        <EmptyState icon="📂" title="Aucun historique" description="Vos interventions et services apparaîtront ici." />
      ) : (
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: 19, top: 0, bottom: 0, width: 2, background: 'var(--gray-200)', borderRadius: 1 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {filtered.map((item, idx) => (
              <div key={item.id} style={{ display: 'flex', gap: 20, paddingBottom: idx < filtered.length - 1 ? 24 : 0, position: 'relative' }}>
                {/* Dot */}
                <div style={{ width: 40, height: 40, background: item.bg, border: `3px solid ${item.color}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, zIndex: 1, background: '#fff' }}>
                  {item.icon}
                </div>

                {/* Card */}
                <div style={{ flex: 1, background: '#fff', borderRadius: 14, padding: '16px 20px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--gray-200)', marginTop: 4 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, fontSize: 15 }}>{item.title}</span>
                        <StatusBadge status={item.status} />
                      </div>
                      {item.subtitle && <p style={{ color: 'var(--gray-500)', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{item.subtitle}</p>}
                      {item.progress !== undefined && (
                        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ flex: 1 }}><ProgressBar value={item.progress} /></div>
                          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', minWidth: 32 }}>{item.progress}%</span>
                        </div>
                      )}
                      {item.endDate && (
                        <div style={{ marginTop: 6, fontSize: 12, color: 'var(--success)', fontWeight: 600 }}>
                          ✅ Terminé le {item.endDate.toLocaleDateString('fr-FR')}
                        </div>
                      )}
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 6 }}>
                        {item.date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      {item.pdfUrl && (
                        <a href={item.pdfUrl} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ fontSize: 13 }}>
                          📄 Rapport PDF
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

/* ================================================================== */
/*  MESSAGERIE                                                          */
/* ================================================================== */
export const ClientMessagingPage = () => {
  const { user } = useAuthStore();                    // ✅ hook, pas require()
  const [tickets, setTickets]   = useState([]);
  const [selected, setSelected] = useState(null);
  const [newMsg, setNewMsg]     = useState('');
  const [loading, setLoading]   = useState(true);
  const [showNew, setShowNew]   = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: '', message: '' });
  const [sending, setSending]   = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    ticketsAPI.getMy()
      .then(r => setTickets(r.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selected?.messages]);

  const selectTicket = async (t) => {
    try {
      const res = await ticketsAPI.getById(t._id);
      setSelected(res.data.data);
    } catch { setSelected(t); }
  };

  const sendMessage = async () => {
    if (!newMsg.trim() || !selected || sending) return;
    setSending(true);
    try {
      const res = await ticketsAPI.addMessage(selected._id, { content: newMsg });
      setSelected(res.data.data);
      setTickets(ts => ts.map(t => t._id === selected._id ? { ...t, updatedAt: new Date().toISOString() } : t));
      setNewMsg('');
    } catch { toast.error('Erreur envoi'); }
    finally { setSending(false); }
  };

  const createTicket = async () => {
    if (!newTicket.subject || !newTicket.message) return;
    try {
      const res = await ticketsAPI.create(newTicket);
      setTickets(t => [res.data.data, ...t]);
      setShowNew(false);
      setNewTicket({ subject: '', message: '' });
      toast.success('Ticket créé !');
      selectTicket(res.data.data);
    } catch { toast.error('Erreur'); }
  };

  if (loading) return <DashboardLayout type="client"><PageLoader /></DashboardLayout>;

  return (
    <DashboardLayout type="client">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>Messagerie</h1>
          <p style={{ color: 'var(--gray-500)', marginTop: 4 }}>Chat avec le support OMDEVE</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowNew(true)}>+ Nouveau ticket</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20, height: '72vh', minHeight: 500 }}>
        {/* Sidebar */}
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--gray-200)', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--gray-500)' }}>
            Conversations ({tickets.length})
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {tickets.length === 0 && (
              <div style={{ padding: 24, textAlign: 'center', color: 'var(--gray-400)', fontSize: 13 }}>Aucune conversation</div>
            )}
            {tickets.map(t => (
              <div key={t._id} onClick={() => selectTicket(t)} style={{
                padding: '14px 16px', borderBottom: '1px solid var(--gray-100)', cursor: 'pointer',
                background: selected?._id === t._id ? 'rgba(0,194,255,0.06)' : 'transparent',
                borderLeft: selected?._id === t._id ? '3px solid var(--primary)' : '3px solid transparent',
                transition: 'all 0.15s',
              }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.subject}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <StatusBadge status={t.status} />
                  <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{new Date(t.updatedAt).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {!selected ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, color: 'var(--gray-400)' }}>
              <span style={{ fontSize: 52 }}>💬</span>
              <p style={{ fontWeight: 600 }}>Sélectionnez une conversation</p>
              <p style={{ fontSize: 13 }}>ou créez un nouveau ticket</p>
            </div>
          ) : (
            <>
              {/* Chat header */}
              <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--gray-100)' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{selected.subject}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2 }}>{selected.messages?.length || 0} message(s)</div>
                </div>
                <StatusBadge status={selected.status} />
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {(!selected.messages || selected.messages.length === 0) && (
                  <div style={{ textAlign: 'center', color: 'var(--gray-400)', fontSize: 13, padding: 20 }}>Aucun message — débutez la conversation</div>
                )}
                {selected.messages?.map(m => {
                  const mine = String(m.sender?._id || m.sender) === String(user?._id);
                  return (
                    <div key={m._id} style={{ display: 'flex', flexDirection: 'column', alignItems: mine ? 'flex-end' : 'flex-start', gap: 4 }}>
                      <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>
                        {mine ? 'Vous' : `${m.sender?.firstName || 'Support'} ${m.sender?.lastName || ''}`}
                        {' • '}
                        {new Date(m.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div style={{
                        maxWidth: '72%', padding: '10px 14px', borderRadius: mine ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                        background: mine ? 'var(--primary)' : 'var(--gray-100)',
                        color: mine ? '#fff' : 'var(--dark-700)',
                        fontSize: 14, lineHeight: 1.5,
                        boxShadow: 'var(--shadow-sm)',
                      }}>
                        {m.content}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div style={{ padding: '12px 16px', borderTop: '1px solid var(--gray-200)', display: 'flex', gap: 10, background: '#fafafa' }}>
                <input
                  className="form-input" style={{ flex: 1 }}
                  placeholder="Votre message..."
                  value={newMsg}
                  onChange={e => setNewMsg(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  disabled={selected.status === 'closed'}
                />
                <button className="btn btn-primary" onClick={sendMessage} disabled={sending || !newMsg.trim() || selected.status === 'closed'}>
                  {sending ? '⏳' : '↗ Envoyer'}
                </button>
              </div>
              {selected.status === 'closed' && (
                <div style={{ textAlign: 'center', padding: '8px', background: '#fee2e2', fontSize: 12, color: 'var(--error)', fontWeight: 600 }}>
                  Ce ticket est fermé — vous ne pouvez plus envoyer de messages
                </div>
              )}
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

/* ================================================================== */
/*  MON PROFIL                                                          */
/* ================================================================== */
export const ClientProfilePage = () => {
  const { user, updateUser } = useAuthStore();        // ✅ hook, pas require()
  const [tab, setTab] = useState('info');
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName:  user?.lastName  || '',
    phone:     user?.phone     || '',
    company:   user?.company   || '',
    address:   user?.address   || '',
  });
  const [prefs, setPrefs] = useState({
    email: user?.notificationPrefs?.email ?? true,
    sms:   user?.notificationPrefs?.sms   ?? false,
  });
  const [pwdForm, setPwdForm] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [saving, setSaving]   = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  /* ---- Save profile ---- */
  const saveProfile = async () => {
    setSaving(true);
    try {
      const { authAPI } = await import('../../services/api');
      const res = await authAPI.updateProfile({ ...form, notificationPrefs: prefs });
      updateUser(res.data.data);
      toast.success('Profil mis à jour !');
    } catch { toast.error('Erreur lors de la mise à jour'); }
    finally { setSaving(false); }
  };

  /* ---- Change password ---- */
  const changePassword = async () => {
    if (pwdForm.newPassword !== pwdForm.confirm) return toast.error('Les mots de passe ne correspondent pas');
    if (pwdForm.newPassword.length < 6) return toast.error('Mot de passe trop court (min 6 caractères)');
    try {
      const { authAPI } = await import('../../services/api');
      await authAPI.changePassword({ currentPassword: pwdForm.currentPassword, newPassword: pwdForm.newPassword });
      toast.success('Mot de passe modifié !');
      setPwdForm({ currentPassword: '', newPassword: '', confirm: '' });
    } catch (e) { toast.error(e.response?.data?.message || 'Erreur'); }
  };

  const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase();

  return (
    <DashboardLayout type="client">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
        <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg,#00c2ff,#0099cc)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#0a0e1a', fontSize: 22, flexShrink: 0 }}>
          {initials}
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>{user?.firstName} {user?.lastName}</h1>
          <p style={{ color: 'var(--gray-500)', marginTop: 2 }}>{user?.email} · <span style={{ textTransform: 'capitalize' }}>{user?.role}</span></p>
        </div>
      </div>

      {/* Sub-tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: 'var(--gray-200)', padding: 4, borderRadius: 10, width: 'fit-content' }}>
        {[['info','👤 Informations'], ['password','🔑 Mot de passe'], ['notifs','🔔 Notifications']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, background: tab === id ? '#fff' : 'transparent', color: tab === id ? 'var(--dark-700)' : 'var(--gray-500)', boxShadow: tab === id ? 'var(--shadow-sm)' : 'none', transition: 'all 0.15s' }}>
            {label}
          </button>
        ))}
      </div>

      {/* ---- Informations ---- */}
      {tab === 'info' && (
        <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: 'var(--shadow)', maxWidth: 640 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 20 }}>Informations personnelles</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[['firstName','Prénom *'],['lastName','Nom *'],['phone','Téléphone'],['company','Entreprise']].map(([k, lbl]) => (
              <div key={k} className="form-group">
                <label className="form-label">{lbl}</label>
                <input className="form-input" value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />
              </div>
            ))}
          </div>
          <div className="form-group" style={{ marginTop: 4 }}>
            <label className="form-label">Adresse</label>
            <input className="form-input" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Votre adresse complète" />
          </div>
          <div style={{ background: 'var(--gray-100)', borderRadius: 10, padding: '12px 16px', marginTop: 16 }}>
            <div style={{ fontSize: 12, color: 'var(--gray-500)', marginBottom: 2 }}>Email (non modifiable)</div>
            <div style={{ fontWeight: 600 }}>{user?.email}</div>
          </div>
          <button className="btn btn-primary" onClick={saveProfile} disabled={saving} style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}>
            {saving ? '⏳ Sauvegarde...' : '💾 Sauvegarder les modifications'}
          </button>
        </div>
      )}

      {/* ---- Mot de passe ---- */}
      {tab === 'password' && (
        <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: 'var(--shadow)', maxWidth: 480 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 20 }}>Changer le mot de passe</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[['currentPassword','Mot de passe actuel'],['newPassword','Nouveau mot de passe'],['confirm','Confirmer le nouveau mot de passe']].map(([k, lbl]) => (
              <div key={k} className="form-group">
                <label className="form-label">{lbl}</label>
                <input type={showPwd ? 'text' : 'password'} className="form-input" value={pwdForm[k]} onChange={e => setPwdForm(f => ({ ...f, [k]: e.target.value }))} />
              </div>
            ))}
            <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ background: 'none', border: 'none', color: 'var(--gray-500)', fontSize: 13, cursor: 'pointer', textAlign: 'left' }}>
              {showPwd ? '🙈 Masquer' : '👁 Afficher'} les mots de passe
            </button>
            <div style={{ background: 'var(--gray-100)', borderRadius: 10, padding: 14, fontSize: 13, color: 'var(--gray-600)' }}>
              <strong>Règles :</strong> minimum 6 caractères
            </div>
            <button className="btn btn-primary" onClick={changePassword} disabled={!pwdForm.currentPassword || !pwdForm.newPassword} style={{ justifyContent: 'center' }}>
              🔑 Changer le mot de passe
            </button>
          </div>
        </div>
      )}

      {/* ---- Notifications ---- */}
      {tab === 'notifs' && (
        <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: 'var(--shadow)', maxWidth: 540 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 8 }}>Préférences de notifications</h3>
          <p style={{ color: 'var(--gray-500)', fontSize: 14, marginBottom: 24 }}>Choisissez comment vous souhaitez être notifié(e).</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { key: 'email', label: 'Notifications par email', desc: 'Recevez des mises à jour sur vos devis, projets et messages par email.', icon: '📧' },
              { key: 'sms',   label: 'Notifications par SMS',   desc: 'Recevez des alertes urgentes par SMS sur votre téléphone.',           icon: '📱' },
            ].map(({ key, label, desc, icon }) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', background: prefs[key] ? 'rgba(0,194,255,0.05)' : 'var(--gray-100)', borderRadius: 12, border: `1px solid ${prefs[key] ? 'var(--primary)' : 'var(--gray-200)'}`, transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontSize: 24 }}>{icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{label}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2 }}>{desc}</div>
                  </div>
                </div>
                <div onClick={() => setPrefs(p => ({ ...p, [key]: !p[key] }))} style={{ width: 48, height: 26, background: prefs[key] ? 'var(--primary)' : 'var(--gray-300)', borderRadius: 999, position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0, marginLeft: 16 }}>
                  <div style={{ position: 'absolute', top: 3, left: prefs[key] ? 24 : 3, width: 20, height: 20, background: '#fff', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-primary" onClick={saveProfile} disabled={saving} style={{ marginTop: 24, width: '100%', justifyContent: 'center' }}>
            {saving ? '⏳ Sauvegarde...' : '💾 Sauvegarder les préférences'}
          </button>
        </div>
      )}
    </DashboardLayout>
  );
};