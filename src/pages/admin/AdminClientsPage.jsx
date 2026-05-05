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
