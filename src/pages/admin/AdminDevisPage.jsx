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
