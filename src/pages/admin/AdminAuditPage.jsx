import React, { useEffect, useState, useCallback } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { auditAPI } from '../../services/api';
import { StatusBadge, Modal, PageLoader, EmptyState, Pagination } from '../../components/common/UI';
import toast from 'react-hot-toast';

// ── helpers ──────────────────────────────────────────────────────────────────
const SCORE_COLORS = { low: '#ef4444', medium: '#f59e0b', high: '#22c55e' };
const scoreLevel = (s) => s < 40 ? 'low' : s < 70 ? 'medium' : 'high';

const QUESTION_LABELS = {
  currentNeeds:    'Besoins actuels',
  infrastructure:  'Infrastructure',
  teamSize:        'Taille d\'équipe',
  budget:          'Budget',
  objectives:      'Objectifs',
  timeline:        'Délai',
  currentIssues:   'Problèmes décrits',
};

const BadgeScore = ({ score }) => {
  const lvl = scoreLevel(score ?? 0);
  const color = SCORE_COLORS[lvl];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: `${color}18`, color, padding: '4px 12px',
      borderRadius: 999, fontSize: 12, fontWeight: 800,
    }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: color }} />
      {score ?? '—'} / 100
    </span>
  );
};

// ── page ─────────────────────────────────────────────────────────────────────
const AdminAuditPage = () => {
  const [audits, setAudits]       = useState([]);
  const [total, setTotal]         = useState(0);
  const [page, setPage]           = useState(1);
  const [pages, setPages]         = useState(1);
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState(null);
  const [filters, setFilters]     = useState({ search: '', status: '' });
  const [sendingEmail, setSendingEmail] = useState(false);
  const [tab, setTab]             = useState('list');   // 'list' | 'stats'

  const fetchAudits = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 15, ...filters };
      if (!params.search) delete params.search;
      if (!params.status) delete params.status;
      const res = await auditAPI.getAll(params);
      setAudits(res.data.data);
      setTotal(res.data.total ?? res.data.data.length);
      setPages(res.data.pages ?? Math.ceil((res.data.total ?? res.data.data.length) / 15));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [page, filters]);

  useEffect(() => { fetchAudits(); }, [fetchAudits]);

  // ── actions ────────────────────────────────────────────────────────────────
  const resendReport = async (audit) => {
    setSendingEmail(true);
    try {
      await auditAPI.resendReport(audit._id);
      toast.success(`Rapport renvoyé à ${audit.email} !`);
    } catch { toast.error('Erreur lors de l\'envoi'); }
    finally { setSendingEmail(false); }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await auditAPI.update(id, { status });
      setAudits(prev => prev.map(a => a._id === id ? res.data.data : a));
      if (selected?._id === id) setSelected(res.data.data);
      toast.success('Statut mis à jour');
    } catch { toast.error('Erreur'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet audit ?')) return;
    try {
      await auditAPI.delete(id);
      setAudits(prev => prev.filter(a => a._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success('Audit supprimé');
    } catch { toast.error('Erreur'); }
  };

  // ── stats (computed client-side as fallback) ───────────────────────────────
  const stats = {
    total:     audits.length,
    pending:   audits.filter(a => !a.status || a.status === 'pending').length,
    sent:      audits.filter(a => a.status === 'sent').length,
    reviewed:  audits.filter(a => a.status === 'reviewed').length,
    avgScore:  audits.length
      ? Math.round(audits.reduce((s, a) => s + (a.score ?? 0), 0) / audits.length)
      : 0,
  };

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <DashboardLayout type="admin">

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>🔍 Audits IT</h1>
          <p style={{ color: 'var(--gray-500)', marginTop: 4 }}>{total} audit(s) soumis</p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={fetchAudits}>🔄 Actualiser</button>
      </div>

      {/* ── KPI row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { icon: '📋', label: 'Total audits',   value: total,          color: 'var(--primary)',  bg: 'var(--primary-light)' },
          { icon: '⏳', label: 'En attente',      value: stats.pending,  color: 'var(--warning)',  bg: '#fef3c7' },
          { icon: '📤', label: 'Rapports envoyés',value: stats.sent,     color: '#a855f7',         bg: '#f3e8ff' },
          { icon: '✅', label: 'Examinés',        value: stats.reviewed, color: 'var(--success)',  bg: '#dcfce7' },
          { icon: '🎯', label: 'Score moyen',     value: `${stats.avgScore}/100`, color: 'var(--info)', bg: '#dbeafe' },
        ].map(({ icon, label, value, color, bg }) => (
          <div key={label} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', boxShadow: 'var(--shadow)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 10 }}>{icon}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color }}>{value}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--gray-200)', padding: 4, borderRadius: 10, width: 'fit-content' }}>
        {[['list','📋 Liste'], ['stats','📊 Statistiques']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
            fontWeight: 700, fontSize: 14,
            background: tab === id ? '#fff' : 'transparent',
            color: tab === id ? 'var(--dark-700)' : 'var(--gray-500)',
            boxShadow: tab === id ? 'var(--shadow-sm)' : 'none',
          }}>{label}</button>
        ))}
      </div>

      {/* ═══ TAB: LIST ═══ */}
      {tab === 'list' && (
        <>
          {/* Filters */}
          <div style={{ background: '#fff', borderRadius: 12, padding: '16px 20px', marginBottom: 20, boxShadow: 'var(--shadow-sm)', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              className="form-input" style={{ flex: 1, minWidth: 200, maxWidth: 320 }}
              placeholder="🔍 Recherche nom, email, entreprise..."
              value={filters.search}
              onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
            />
            <select className="form-input" style={{ minWidth: 160 }} value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
              <option value="">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="sent">Rapport envoyé</option>
              <option value="reviewed">Examiné</option>
            </select>
            <button className="btn btn-ghost btn-sm" onClick={() => setFilters({ search: '', status: '' })}>Réinitialiser</button>
          </div>

          {/* Table */}
          <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
            {loading ? <div style={{ padding: 40 }}><PageLoader /></div> : audits.length === 0 ? (
              <EmptyState icon="🔍" title="Aucun audit trouvé" description="Les audits soumis apparaîtront ici." />
            ) : (
              <>
                <div style={{ overflowX: 'auto' }}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Demandeur</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th>Score</th>
                        <th>Statut</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {audits.map(a => (
                        <tr key={a._id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <div style={{
                                width: 34, height: 34, borderRadius: '50%',
                                background: 'linear-gradient(135deg,#00c2ff,#0099cc)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontFamily: 'var(--font-display)', fontWeight: 800, color: '#0a0e1a', fontSize: 13, flexShrink: 0,
                              }}>
                                {(a.name || a.firstName || '?')[0].toUpperCase()}
                              </div>
                              <span style={{ fontWeight: 700, fontSize: 14 }}>{a.name || `${a.firstName || ''} ${a.lastName || ''}`.trim() || '—'}</span>
                            </div>
                          </td>
                          <td style={{ fontSize: 13, color: 'var(--gray-500)' }}>{a.email}</td>
                          <td style={{ fontSize: 13, color: 'var(--gray-500)' }}>{a.company || '—'}</td>
                          <td><BadgeScore score={a.score} /></td>
                          <td>
                            <select
                              value={a.status || 'pending'}
                              onChange={e => updateStatus(a._id, e.target.value)}
                              className="form-input"
                              style={{ padding: '4px 8px', fontSize: 12, minWidth: 0 }}
                            >
                              <option value="pending">En attente</option>
                              <option value="sent">Rapport envoyé</option>
                              <option value="reviewed">Examiné</option>
                            </select>
                          </td>
                          <td style={{ fontSize: 12, color: 'var(--gray-400)' }}>{new Date(a.createdAt).toLocaleDateString('fr-FR')}</td>
                          <td>
                            <div style={{ display: 'flex', gap: 6 }}>
                              <button className="btn btn-ghost btn-sm" title="Voir le détail" onClick={() => setSelected(a)}>👁</button>
                              <button className="btn btn-ghost btn-sm" title="Renvoyer le rapport" onClick={() => resendReport(a)} disabled={sendingEmail}>📤</button>
                              <button className="btn btn-ghost btn-sm" title="Supprimer" onClick={() => handleDelete(a._id)} style={{ color: 'var(--error)' }}>🗑</button>
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
        </>
      )}

      {/* ═══ TAB: STATS ═══ */}
      {tab === 'stats' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

          {/* Répartition des scores */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: 'var(--shadow)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 20 }}>Répartition des scores</h3>
            {[
              { label: 'Score bas (< 40)', color: '#ef4444', count: audits.filter(a => (a.score ?? 0) < 40).length },
              { label: 'Score moyen (40–69)', color: '#f59e0b', count: audits.filter(a => (a.score ?? 0) >= 40 && (a.score ?? 0) < 70).length },
              { label: 'Score élevé (≥ 70)', color: '#22c55e', count: audits.filter(a => (a.score ?? 0) >= 70).length },
            ].map(({ label, color, count }) => {
              const pct = audits.length ? Math.round((count / audits.length) * 100) : 0;
              return (
                <div key={label} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                    <span style={{ color: 'var(--gray-600)' }}>{label}</span>
                    <span style={{ color }}>{count} ({pct}%)</span>
                  </div>
                  <div style={{ height: 8, background: 'var(--gray-200)', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 999, transition: 'width 0.4s' }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Besoins les plus fréquents */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: 'var(--shadow)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 20 }}>Besoins les plus fréquents</h3>
            {(() => {
              const freq = {};
              audits.forEach(a => {
                const needs = a.answers?.currentNeeds || [];
                (Array.isArray(needs) ? needs : [needs]).forEach(n => { freq[n] = (freq[n] || 0) + 1; });
              });
              const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 6);
              const max = sorted[0]?.[1] || 1;
              return sorted.length === 0
                ? <p style={{ color: 'var(--gray-400)', fontSize: 13 }}>Aucune donnée disponible</p>
                : sorted.map(([need, cnt]) => (
                  <div key={need} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, marginBottom: 5 }}>
                      <span style={{ color: 'var(--gray-700)' }}>{need}</span>
                      <span style={{ color: 'var(--primary)', fontWeight: 800 }}>{cnt}</span>
                    </div>
                    <div style={{ height: 6, background: 'var(--gray-200)', borderRadius: 999 }}>
                      <div style={{ height: '100%', width: `${(cnt / max) * 100}%`, background: 'var(--primary)', borderRadius: 999 }} />
                    </div>
                  </div>
                ));
            })()}
          </div>

          {/* Budget distribution */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: 'var(--shadow)', gridColumn: '1 / -1' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 20 }}>Distribution des budgets déclarés</h3>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {(() => {
                const freq = {};
                audits.forEach(a => {
                  const b = a.answers?.budget;
                  if (b) freq[b] = (freq[b] || 0) + 1;
                });
                return Object.entries(freq).sort((x, y) => y[1] - x[1]).map(([budget, cnt]) => (
                  <div key={budget} style={{
                    background: 'var(--gray-100)', borderRadius: 10, padding: '12px 18px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>{cnt}</span>
                    <span style={{ fontSize: 12, color: 'var(--gray-500)', textAlign: 'center', maxWidth: 120 }}>{budget}</span>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ═══ DETAIL MODAL ═══ */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={`Audit — ${selected?.name || selected?.firstName || ''}`} size="lg">
        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

            {/* Score banner */}
            <div style={{
              background: `${SCORE_COLORS[scoreLevel(selected.score ?? 0)]}12`,
              border: `1.5px solid ${SCORE_COLORS[scoreLevel(selected.score ?? 0)]}44`,
              borderRadius: 12, padding: '16px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 4 }}>Score IT global</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 900, color: SCORE_COLORS[scoreLevel(selected.score ?? 0)] }}>{selected.score ?? '—'}<span style={{ fontSize: 18, opacity: 0.6 }}>/100</span></div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 6 }}>Rapport envoyé à</div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{selected.email}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 4 }}>{selected.phone || ''}</div>
              </div>
            </div>

            {/* Contact info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              {[
                ['Nom', selected.name || `${selected.firstName || ''} ${selected.lastName || ''}`.trim() || '—'],
                ['Email', selected.email || '—'],
                ['Téléphone', selected.phone || '—'],
                ['Entreprise', selected.company || '—'],
                ['Date de soumission', new Date(selected.createdAt).toLocaleDateString('fr-FR')],
                ['Statut', selected.status || 'pending'],
              ].map(([k, v]) => (
                <div key={k} style={{ background: 'var(--gray-100)', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 4 }}>{k}</div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Answers */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 16, marginBottom: 14 }}>Réponses au questionnaire</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {selected.answers && Object.entries(selected.answers).map(([key, value]) => (
                  <div key={key} style={{ background: 'var(--gray-100)', borderRadius: 10, padding: '12px 16px' }}>
                    <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', marginBottom: 6 }}>
                      {QUESTION_LABELS[key] || key}
                    </div>
                    {Array.isArray(value) ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {value.map((v, i) => (
                          <span key={i} style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', padding: '3px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>{v}</span>
                        ))}
                      </div>
                    ) : (
                      <div style={{ fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.6 }}>{value || '—'}</div>
                    )}
                  </div>
                ))}
                {!selected.answers && <p style={{ color: 'var(--gray-400)', fontSize: 13 }}>Aucune réponse enregistrée.</p>}
              </div>
            </div>

            {/* PDF link */}
            {selected.pdfUrl && (
              <div style={{ background: 'var(--gray-100)', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>📄 Rapport PDF généré</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2 }}>Envoyé automatiquement par email</div>
                </div>
                <a href={selected.pdfUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">Télécharger</a>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button className="btn btn-ghost" onClick={() => setSelected(null)}>Fermer</button>
              <button
                className="btn btn-outline"
                disabled={sendingEmail}
                onClick={() => resendReport(selected)}
              >
                {sendingEmail ? '⏳...' : '📤 Renvoyer le rapport'}
              </button>
              <button
                className="btn btn-primary"
                onClick={() => { updateStatus(selected._id, 'reviewed'); setSelected(null); }}
              >
                ✅ Marquer comme examiné
              </button>
            </div>
          </div>
        )}
      </Modal>

    </DashboardLayout>
  );
};

export default AdminAuditPage;