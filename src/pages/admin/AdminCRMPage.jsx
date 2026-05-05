// // import React, { useEffect, useState, useCallback } from 'react';
// // import DashboardLayout from '../../components/layout/DashboardLayout';
// // import { prospectsAPI } from '../../services/api';
// // import { StatusBadge, Modal, PageLoader } from '../../components/common/UI';
// // import toast from 'react-hot-toast';

// // const STAGES = [
// //   { id: 'lead',        label: 'Lead',         color: '#94a3b8', bg: '#f1f5f9' },
// //   { id: 'contact',     label: 'Contact',       color: '#3b82f6', bg: '#dbeafe' },
// //   { id: 'proposal',    label: 'Proposition',   color: '#f59e0b', bg: '#fef3c7' },
// //   { id: 'negotiation', label: 'Négociation',   color: '#a855f7', bg: '#f3e8ff' },
// //   { id: 'signed',      label: 'Signé ✅',      color: '#22c55e', bg: '#dcfce7' },
// //   { id: 'lost',        label: 'Perdu ❌',      color: '#ef4444', bg: '#fee2e2' },
// // ];

// // const EMPTY_FORM = { firstName: '', lastName: '', email: '', phone: '', company: '', source: 'website', stage: 'lead', estimatedValue: '', notes: '' };

// // const AdminCRMPage = () => {
// //   const [prospects, setProspects] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [showModal, setShowModal] = useState(false);
// //   const [editing, setEditing] = useState(null);
// //   const [form, setForm] = useState(EMPTY_FORM);
// //   const [detail, setDetail] = useState(null);
// //   const [interaction, setInteraction] = useState({ type: 'note', content: '' });
// //   const [dragging, setDragging] = useState(null);

// //   const fetch = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const res = await prospectsAPI.getAll({ limit: 200 });
// //       setProspects(res.data.data);
// //     } catch (e) { console.error(e); }
// //     finally { setLoading(false); }
// //   }, []);

// //   useEffect(() => { fetch(); }, [fetch]);

// //   const byStage = (stageId) => prospects.filter(p => p.stage === stageId);

// //   const openAdd = () => { setForm(EMPTY_FORM); setEditing(null); setShowModal(true); };
// //   const openEdit = (p) => {
// //     setForm({ firstName: p.firstName, lastName: p.lastName, email: p.email || '', phone: p.phone || '', company: p.company || '', source: p.source, stage: p.stage, estimatedValue: p.estimatedValue || '', notes: p.notes || '' });
// //     setEditing(p._id);
// //     setShowModal(true);
// //   };

// //   const save = async () => {
// //     try {
// //       if (editing) {
// //         const res = await prospectsAPI.update(editing, form);
// //         setProspects(ps => ps.map(p => p._id === editing ? res.data.data : p));
// //         toast.success('Prospect mis à jour !');
// //       } else {
// //         const res = await prospectsAPI.create(form);
// //         setProspects(ps => [res.data.data, ...ps]);
// //         toast.success('Prospect ajouté !');
// //       }
// //       setShowModal(false);
// //     } catch (e) { toast.error(e.response?.data?.message || 'Erreur'); }
// //   };

// //   const moveStage = async (id, newStage) => {
// //     try {
// //       const res = await prospectsAPI.update(id, { stage: newStage });
// //       setProspects(ps => ps.map(p => p._id === id ? res.data.data : p));
// //     } catch { toast.error('Erreur déplacement'); }
// //   };

// //   const addInteraction = async () => {
// //     if (!interaction.content.trim()) return;
// //     try {
// //       const res = await prospectsAPI.addInteraction(detail._id, interaction);
// //       setDetail(res.data.data);
// //       setProspects(ps => ps.map(p => p._id === detail._id ? res.data.data : p));
// //       setInteraction({ type: 'note', content: '' });
// //       toast.success('Interaction ajoutée !');
// //     } catch { toast.error('Erreur'); }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!window.confirm('Supprimer ce prospect ?')) return;
// //     try {
// //       await prospectsAPI.delete(id);
// //       setProspects(ps => ps.filter(p => p._id !== id));
// //       toast.success('Supprimé');
// //     } catch { toast.error('Erreur'); }
// //   };

// //   return (
// //     <DashboardLayout type="admin">
// //       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
// //         <div>
// //           <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>CRM — Pipeline Commercial</h1>
// //           <p style={{ color: 'var(--gray-500)', marginTop: 4 }}>{prospects.length} prospects au total</p>
// //         </div>
// //         <button className="btn btn-primary" onClick={openAdd}>+ Nouveau prospect</button>
// //       </div>

// //       {/* Summary row */}
// //       <div style={{ display: 'flex', gap: 12, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }}>
// //         {STAGES.map(s => (
// //           <div key={s.id} style={{ background: '#fff', borderRadius: 12, padding: '12px 18px', border: `2px solid ${s.color}22`, flexShrink: 0 }}>
// //             <div style={{ fontWeight: 800, fontSize: 22, fontFamily: 'var(--font-display)', color: s.color }}>{byStage(s.id).length}</div>
// //             <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2 }}>{s.label}</div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Kanban board */}
// //       {loading ? <PageLoader /> : (
// //         <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 16, alignItems: 'flex-start' }}>
// //           {STAGES.map(stage => (
// //             <div
// //               key={stage.id}
// //               style={{ minWidth: 270, background: 'var(--gray-200)', borderRadius: 14, padding: 14, flexShrink: 0 }}
// //               onDragOver={e => e.preventDefault()}
// //               onDrop={e => { e.preventDefault(); if (dragging) moveStage(dragging, stage.id); setDragging(null); }}
// //             >
// //               {/* Column header */}
// //               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 10, borderBottom: `2px solid ${stage.color}` }}>
// //                 <span style={{ fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', color: stage.color }}>{stage.label}</span>
// //                 <span style={{ background: stage.color, color: '#fff', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>{byStage(stage.id).length}</span>
// //               </div>

// //               {/* Cards */}
// //               <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 80 }}>
// //                 {byStage(stage.id).map(p => (
// //                   <div
// //                     key={p._id}
// //                     draggable
// //                     onDragStart={() => setDragging(p._id)}
// //                     onDragEnd={() => setDragging(null)}
// //                     style={{
// //                       background: '#fff', borderRadius: 10, padding: '14px 14px',
// //                       boxShadow: 'var(--shadow-sm)', cursor: 'grab',
// //                       borderLeft: `3px solid ${stage.color}`,
// //                       transition: 'box-shadow 0.15s',
// //                       opacity: dragging === p._id ? 0.5 : 1,
// //                     }}
// //                     onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow)'}
// //                     onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
// //                   >
// //                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
// //                       <div style={{ fontWeight: 700, fontSize: 14 }}>{p.firstName} {p.lastName}</div>
// //                       <div style={{ display: 'flex', gap: 4 }}>
// //                         <button onClick={() => setDetail(p)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }} title="Voir">👁</button>
// //                         <button onClick={() => openEdit(p)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }} title="Éditer">✏️</button>
// //                         <button onClick={() => handleDelete(p._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }} title="Supprimer">🗑</button>
// //                       </div>
// //                     </div>
// //                     {p.company && <div style={{ fontSize: 12, color: 'var(--gray-500)', marginBottom: 4 }}>🏢 {p.company}</div>}
// //                     {p.email && <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>✉️ {p.email}</div>}
// //                     {p.estimatedValue > 0 && <div style={{ fontSize: 12, color: 'var(--success)', fontWeight: 700, marginTop: 6 }}>💰 {p.estimatedValue.toLocaleString()} $</div>}
// //                     {p.interactions?.length > 0 && <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4 }}>💬 {p.interactions.length} interaction(s)</div>}
// //                   </div>
// //                 ))}

// //                 {byStage(stage.id).length === 0 && (
// //                   <div style={{ textAlign: 'center', color: 'var(--gray-400)', fontSize: 13, padding: '20px 0', border: '2px dashed var(--gray-300)', borderRadius: 8 }}>
// //                     Glisser ici
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* Add/Edit modal */}
// //       <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Modifier prospect' : 'Nouveau prospect'} size="md">
// //         <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
// //           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
// //             {[['firstName','Prénom *'],['lastName','Nom *'],['email','Email'],['phone','Téléphone'],['company','Entreprise']].map(([k, lbl]) => (
// //               <div key={k} className="form-group" style={k === 'company' ? { gridColumn: '1 / -1' } : {}}>
// //                 <label className="form-label">{lbl}</label>
// //                 <input className="form-input" value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />
// //               </div>
// //             ))}
// //           </div>
// //           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
// //             <div className="form-group">
// //               <label className="form-label">Source</label>
// //               <select className="form-input" value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))}>
// //                 {['website','referral','social','direct','other'].map(s => <option key={s} value={s}>{s}</option>)}
// //               </select>
// //             </div>
// //             <div className="form-group">
// //               <label className="form-label">Étape</label>
// //               <select className="form-input" value={form.stage} onChange={e => setForm(f => ({ ...f, stage: e.target.value }))}>
// //                 {STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
// //               </select>
// //             </div>
// //             <div className="form-group">
// //               <label className="form-label">Valeur estimée ($)</label>
// //               <input type="number" className="form-input" value={form.estimatedValue} onChange={e => setForm(f => ({ ...f, estimatedValue: e.target.value }))} />
// //             </div>
// //           </div>
// //           <div className="form-group">
// //             <label className="form-label">Notes</label>
// //             <textarea className="form-input" rows={3} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} style={{ resize: 'vertical' }} />
// //           </div>
// //           <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
// //             <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Annuler</button>
// //             <button className="btn btn-primary" onClick={save} disabled={!form.firstName || !form.lastName}>{editing ? 'Mettre à jour' : 'Créer'}</button>
// //           </div>
// //         </div>
// //       </Modal>

// //       {/* Detail modal */}
// //       <Modal isOpen={!!detail} onClose={() => setDetail(null)} title={detail ? `${detail.firstName} ${detail.lastName}` : ''} size="lg">
// //         {detail && (
// //           <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
// //             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
// //               {[['Email', detail.email || '—'], ['Téléphone', detail.phone || '—'], ['Entreprise', detail.company || '—'], ['Source', detail.source], ['Valeur estimée', detail.estimatedValue ? `${detail.estimatedValue} $` : '—'], ['Étape', detail.stage]].map(([k, v]) => (
// //                 <div key={k} style={{ background: 'var(--gray-100)', borderRadius: 10, padding: '12px 14px' }}>
// //                   <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 4 }}>{k}</div>
// //                   <div style={{ fontWeight: 600, fontSize: 13 }}>{v}</div>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Interactions */}
// //             <div>
// //               <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 12 }}>Interactions ({detail.interactions?.length || 0})</h4>
// //               <div style={{ maxHeight: 200, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
// //                 {detail.interactions?.map((i, idx) => (
// //                   <div key={idx} style={{ background: 'var(--gray-100)', borderRadius: 8, padding: '10px 14px', fontSize: 13 }}>
// //                     <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
// //                       <span style={{ background: '#dbeafe', color: '#2563eb', padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>{i.type}</span>
// //                       <span style={{ color: 'var(--gray-400)', fontSize: 11 }}>{new Date(i.date).toLocaleDateString('fr-FR')}</span>
// //                     </div>
// //                     <div style={{ color: 'var(--gray-700)' }}>{i.content}</div>
// //                   </div>
// //                 ))}
// //                 {!detail.interactions?.length && <p style={{ color: 'var(--gray-400)', fontSize: 13 }}>Aucune interaction enregistrée</p>}
// //               </div>

// //               <div style={{ display: 'flex', gap: 10 }}>
// //                 <select className="form-input" style={{ width: 120 }} value={interaction.type} onChange={e => setInteraction(i => ({ ...i, type: e.target.value }))}>
// //                   {['call','email','meeting','note'].map(t => <option key={t} value={t}>{t}</option>)}
// //                 </select>
// //                 <input className="form-input" style={{ flex: 1 }} placeholder="Contenu de l'interaction..." value={interaction.content} onChange={e => setInteraction(i => ({ ...i, content: e.target.value }))} onKeyDown={e => e.key === 'Enter' && addInteraction()} />
// //                 <button className="btn btn-primary btn-sm" onClick={addInteraction}>Ajouter</button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </Modal>
// //     </DashboardLayout>
// //   );
// // };

// // export default AdminCRMPage;




// import React, { useEffect, useState, useCallback } from 'react';
// import DashboardLayout from '../../components/layout/DashboardLayout';
// import { prospectsAPI } from '../../services/api';
// import { Modal, PageLoader } from '../../components/common/UI';
// import toast from 'react-hot-toast';

// const STAGES = [
//   { id: 'lead',        label: 'Lead',         color: '#94a3b8', bg: '#f1f5f9' },
//   { id: 'contact',     label: 'Contact',       color: '#3b82f6', bg: '#dbeafe' },
//   { id: 'proposal',    label: 'Proposition',   color: '#f59e0b', bg: '#fef3c7' },
//   { id: 'negotiation', label: 'Négociation',   color: '#a855f7', bg: '#f3e8ff' },
//   { id: 'signed',      label: 'Signé ✅',      color: '#22c55e', bg: '#dcfce7' },
//   { id: 'lost',        label: 'Perdu ❌',      color: '#ef4444', bg: '#fee2e2' },
// ];

// const EMPTY_FORM = {
//   firstName: '', lastName: '', email: '', phone: '',
//   company: '', source: 'website', stage: 'lead', estimatedValue: '', notes: '',
// };

// const AdminCRMPage = () => {
//   const [prospects, setProspects]     = useState([]);
//   const [loading, setLoading]         = useState(true);
//   const [showModal, setShowModal]     = useState(false);
//   const [editing, setEditing]         = useState(null);
//   const [form, setForm]               = useState(EMPTY_FORM);
//   const [detail, setDetail]           = useState(null);
//   const [interaction, setInteraction] = useState({ type: 'note', content: '' });
//   const [dragging, setDragging]       = useState(null);
//   const [dragOver, setDragOver]       = useState(null);

//   const fetchProspects = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await prospectsAPI.getAll({ limit: 200 });
//       setProspects(res.data.data);
//     } catch (e) { console.error(e); }
//     finally { setLoading(false); }
//   }, []);

//   useEffect(() => { fetchProspects(); }, [fetchProspects]);

//   const byStage = (stageId) => prospects.filter(p => p.stage === stageId);

//   // ── CRUD ──────────────────────────────────────────────────────────────────
//   const openAdd = () => { setForm(EMPTY_FORM); setEditing(null); setShowModal(true); };

//   const openEdit = (e, p) => {
//     e.stopPropagation();
//     setForm({
//       firstName: p.firstName, lastName: p.lastName,
//       email: p.email || '', phone: p.phone || '',
//       company: p.company || '', source: p.source,
//       stage: p.stage, estimatedValue: p.estimatedValue || '',
//       notes: p.notes || '',
//     });
//     setEditing(p._id);
//     setShowModal(true);
//   };

//   const openDetail = (e, p) => {
//     e.stopPropagation();
//     setDetail(p);
//   };

//   const save = async () => {
//     try {
//       if (editing) {
//         const res = await prospectsAPI.update(editing, form);
//         setProspects(ps => ps.map(p => p._id === editing ? res.data.data : p));
//         toast.success('Prospect mis à jour !');
//       } else {
//         const res = await prospectsAPI.create(form);
//         setProspects(ps => [res.data.data, ...ps]);
//         toast.success('Prospect ajouté !');
//       }
//       setShowModal(false);
//     } catch (err) { toast.error(err.response?.data?.message || 'Erreur'); }
//   };

//   const handleDelete = async (e, id) => {
//     e.stopPropagation();
//     if (!window.confirm('Supprimer ce prospect ?')) return;
//     try {
//       await prospectsAPI.delete(id);
//       setProspects(ps => ps.filter(p => p._id !== id));
//       toast.success('Supprimé');
//     } catch { toast.error('Erreur'); }
//   };

//   // ── DRAG & DROP ───────────────────────────────────────────────────────────
//   const moveStage = async (id, newStage) => {
//     // Optimistic update
//     setProspects(ps => ps.map(p => p._id === id ? { ...p, stage: newStage } : p));
//     try {
//       const res = await prospectsAPI.update(id, { stage: newStage });
//       setProspects(ps => ps.map(p => p._id === id ? res.data.data : p));
//     } catch {
//       toast.error('Erreur déplacement');
//       fetchProspects(); // rollback
//     }
//   };

//   const handleDragStart = (e, id) => {
//     e.dataTransfer.effectAllowed = 'move';
//     setDragging(id);
//   };

//   const handleDrop = (e, stageId) => {
//     e.preventDefault();
//     if (dragging && dragging !== stageId) moveStage(dragging, stageId);
//     setDragging(null);
//     setDragOver(null);
//   };

//   // ── INTERACTIONS ──────────────────────────────────────────────────────────
//   const addInteraction = async () => {
//     if (!interaction.content.trim()) return;
//     try {
//       const res = await prospectsAPI.addInteraction(detail._id, interaction);
//       setDetail(res.data.data);
//       setProspects(ps => ps.map(p => p._id === detail._id ? res.data.data : p));
//       setInteraction({ type: 'note', content: '' });
//       toast.success('Interaction ajoutée !');
//     } catch { toast.error('Erreur'); }
//   };

//   // ── RENDER ────────────────────────────────────────────────────────────────
//   return (
//     <DashboardLayout type="admin">

//       {/* Header */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
//         <div>
//           <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>CRM — Pipeline Commercial</h1>
//           <p style={{ color: 'var(--gray-500)', marginTop: 4 }}>{prospects.length} prospects au total</p>
//         </div>
//         <button className="btn btn-primary" onClick={openAdd}>+ Nouveau prospect</button>
//       </div>

//       {/* Stage summary */}
//       <div style={{ display: 'flex', gap: 12, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }}>
//         {STAGES.map(s => (
//           <div key={s.id} style={{ background: '#fff', borderRadius: 12, padding: '12px 18px', border: `2px solid ${s.color}22`, flexShrink: 0 }}>
//             <div style={{ fontWeight: 800, fontSize: 22, fontFamily: 'var(--font-display)', color: s.color }}>{byStage(s.id).length}</div>
//             <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2 }}>{s.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* Kanban board */}
//       {loading ? <PageLoader /> : (
//         <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 16, alignItems: 'flex-start' }}>
//           {STAGES.map(stage => (
//             <div
//               key={stage.id}
//               style={{
//                 minWidth: 270, borderRadius: 14, padding: 14, flexShrink: 0,
//                 background: dragOver === stage.id ? `${stage.color}18` : 'var(--gray-200)',
//                 transition: 'background 0.15s',
//               }}
//               onDragOver={e => { e.preventDefault(); setDragOver(stage.id); }}
//               onDragLeave={() => setDragOver(null)}
//               onDrop={e => handleDrop(e, stage.id)}
//             >
//               {/* Column header */}
//               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 10, borderBottom: `2px solid ${stage.color}` }}>
//                 <span style={{ fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', color: stage.color }}>{stage.label}</span>
//                 <span style={{ background: stage.color, color: '#fff', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>
//                   {byStage(stage.id).length}
//                 </span>
//               </div>

//               {/* Cards */}
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 80 }}>
//                 {byStage(stage.id).map(p => (
//                   <div
//                     key={p._id}
//                     draggable
//                     onDragStart={e => handleDragStart(e, p._id)}
//                     onDragEnd={() => { setDragging(null); setDragOver(null); }}
//                     style={{
//                       background: '#fff', borderRadius: 10, padding: '14px',
//                       boxShadow: 'var(--shadow-sm)', cursor: 'grab',
//                       borderLeft: `3px solid ${stage.color}`,
//                       opacity: dragging === p._id ? 0.45 : 1,
//                       transition: 'box-shadow 0.15s, opacity 0.15s',
//                       userSelect: 'none',
//                     }}
//                     onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow)'}
//                     onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
//                   >
//                     {/* Card header */}
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
//                       <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>{p.firstName} {p.lastName}</div>

//                       {/* Action buttons — stopPropagation so drag doesn't interfere */}
//                       <div style={{ display: 'flex', gap: 2, flexShrink: 0, marginLeft: 8 }}>
//                         <button
//                           onPointerDown={e => e.stopPropagation()}
//                           onClick={e => openDetail(e, p)}
//                           style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, padding: '2px 4px', borderRadius: 4, lineHeight: 1 }}
//                           title="Voir le détail"
//                         >👁</button>
//                         <button
//                           onPointerDown={e => e.stopPropagation()}
//                           onClick={e => openEdit(e, p)}
//                           style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, padding: '2px 4px', borderRadius: 4, lineHeight: 1 }}
//                           title="Modifier"
//                         >✏️</button>
//                         <button
//                           onPointerDown={e => e.stopPropagation()}
//                           onClick={e => handleDelete(e, p._id)}
//                           style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, padding: '2px 4px', borderRadius: 4, lineHeight: 1 }}
//                           title="Supprimer"
//                         >🗑</button>
//                       </div>
//                     </div>

//                     {p.company && <div style={{ fontSize: 12, color: 'var(--gray-500)', marginBottom: 4 }}>🏢 {p.company}</div>}
//                     {p.email   && <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>✉️ {p.email}</div>}
//                     {p.estimatedValue > 0 && (
//                       <div style={{ fontSize: 12, color: 'var(--success)', fontWeight: 700, marginTop: 6 }}>
//                         💰 {Number(p.estimatedValue).toLocaleString()} $
//                       </div>
//                     )}
//                     {p.interactions?.length > 0 && (
//                       <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4 }}>
//                         💬 {p.interactions.length} interaction(s)
//                       </div>
//                     )}
//                   </div>
//                 ))}

//                 {byStage(stage.id).length === 0 && (
//                   <div style={{
//                     textAlign: 'center', color: 'var(--gray-400)', fontSize: 13,
//                     padding: '20px 0', border: '2px dashed var(--gray-300)', borderRadius: 8,
//                   }}>
//                     Glisser ici
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ── Add / Edit modal ── */}
//       <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Modifier prospect' : 'Nouveau prospect'} size="md">
//         <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
//             {[['firstName','Prénom *'],['lastName','Nom *'],['email','Email'],['phone','Téléphone'],['company','Entreprise']].map(([k, lbl]) => (
//               <div key={k} className="form-group" style={k === 'company' ? { gridColumn: '1 / -1' } : {}}>
//                 <label className="form-label">{lbl}</label>
//                 <input className="form-input" value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />
//               </div>
//             ))}
//           </div>
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
//             <div className="form-group">
//               <label className="form-label">Source</label>
//               <select className="form-input" value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))}>
//                 {['website','referral','social','direct','other'].map(s => <option key={s} value={s}>{s}</option>)}
//               </select>
//             </div>
//             <div className="form-group">
//               <label className="form-label">Étape</label>
//               <select className="form-input" value={form.stage} onChange={e => setForm(f => ({ ...f, stage: e.target.value }))}>
//                 {STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
//               </select>
//             </div>
//             <div className="form-group">
//               <label className="form-label">Valeur estimée ($)</label>
//               <input type="number" className="form-input" value={form.estimatedValue} onChange={e => setForm(f => ({ ...f, estimatedValue: e.target.value }))} />
//             </div>
//           </div>
//           <div className="form-group">
//             <label className="form-label">Notes</label>
//             <textarea className="form-input" rows={3} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} style={{ resize: 'vertical' }} />
//           </div>
//           <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
//             <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Annuler</button>
//             <button className="btn btn-primary" onClick={save} disabled={!form.firstName || !form.lastName}>
//               {editing ? 'Mettre à jour' : 'Créer'}
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* ── Detail modal ── */}
//       <Modal isOpen={!!detail} onClose={() => setDetail(null)} title={detail ? `${detail.firstName} ${detail.lastName}` : ''} size="lg">
//         {detail && (
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
//               {[
//                 ['Email',           detail.email           || '—'],
//                 ['Téléphone',       detail.phone           || '—'],
//                 ['Entreprise',      detail.company         || '—'],
//                 ['Source',          detail.source],
//                 ['Valeur estimée',  detail.estimatedValue  ? `${detail.estimatedValue} $` : '—'],
//                 ['Étape',           detail.stage],
//               ].map(([k, v]) => (
//                 <div key={k} style={{ background: 'var(--gray-100)', borderRadius: 10, padding: '12px 14px' }}>
//                   <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 4 }}>{k}</div>
//                   <div style={{ fontWeight: 600, fontSize: 13 }}>{v}</div>
//                 </div>
//               ))}
//             </div>

//             {detail.notes && (
//               <div style={{ background: 'var(--gray-100)', borderRadius: 10, padding: '12px 14px' }}>
//                 <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 6 }}>Notes</div>
//                 <div style={{ fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.6 }}>{detail.notes}</div>
//               </div>
//             )}

//             {/* Interactions */}
//             <div>
//               <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 12 }}>
//                 Interactions ({detail.interactions?.length || 0})
//               </h4>
//               <div style={{ maxHeight: 200, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
//                 {detail.interactions?.map((inter, idx) => (
//                   <div key={idx} style={{ background: 'var(--gray-100)', borderRadius: 8, padding: '10px 14px', fontSize: 13 }}>
//                     <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
//                       <span style={{ background: '#dbeafe', color: '#2563eb', padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>{inter.type}</span>
//                       <span style={{ color: 'var(--gray-400)', fontSize: 11 }}>{new Date(inter.date).toLocaleDateString('fr-FR')}</span>
//                     </div>
//                     <div style={{ color: 'var(--gray-700)' }}>{inter.content}</div>
//                   </div>
//                 ))}
//                 {!detail.interactions?.length && (
//                   <p style={{ color: 'var(--gray-400)', fontSize: 13 }}>Aucune interaction enregistrée</p>
//                 )}
//               </div>

//               <div style={{ display: 'flex', gap: 10 }}>
//                 <select
//                   className="form-input" style={{ width: 120 }}
//                   value={interaction.type}
//                   onChange={e => setInteraction(i => ({ ...i, type: e.target.value }))}
//                 >
//                   {['call','email','meeting','note'].map(t => <option key={t} value={t}>{t}</option>)}
//                 </select>
//                 <input
//                   className="form-input" style={{ flex: 1 }}
//                   placeholder="Contenu de l'interaction..."
//                   value={interaction.content}
//                   onChange={e => setInteraction(i => ({ ...i, content: e.target.value }))}
//                   onKeyDown={e => e.key === 'Enter' && addInteraction()}
//                 />
//                 <button className="btn btn-primary btn-sm" onClick={addInteraction}>Ajouter</button>
//               </div>
//             </div>

//             <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
//               <button className="btn btn-ghost" onClick={() => setDetail(null)}>Fermer</button>
//               <button className="btn btn-outline" onClick={e => { setDetail(null); openEdit(e, detail); }}>✏️ Modifier</button>
//             </div>
//           </div>
//         )}
//       </Modal>

//     </DashboardLayout>
//   );
// };

// export default AdminCRMPage;


import React, { useEffect, useState, useCallback } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { prospectsAPI } from '../../services/api';
import { Modal, PageLoader } from '../../components/common/UI';
import toast from 'react-hot-toast';

// ── Config ────────────────────────────────────────────────────────────────────
const STAGES = [
  { id: 'lead',        label: 'Lead',         color: '#94a3b8' },
  { id: 'contact',     label: 'Contact',       color: '#3b82f6' },
  { id: 'proposal',    label: 'Proposition',   color: '#f59e0b' },
  { id: 'negotiation', label: 'Négociation',   color: '#a855f7' },
  { id: 'signed',      label: 'Signé ✅',      color: '#22c55e' },
  { id: 'lost',        label: 'Perdu ❌',      color: '#ef4444' },
];

const EMPTY_FORM = {
  firstName: '', lastName: '', email: '', phone: '',
  company: '', source: 'website', stage: 'lead', estimatedValue: '', notes: '',
};

// ── Modal Déplacer ────────────────────────────────────────────────────────────
const ModalDeplacer = ({ isOpen, onClose, prospect, currentStage, onMove }) => {
  if (!isOpen || !prospect) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)', padding: 16,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 380,
          background: '#fff', borderRadius: 20,
          boxShadow: 'var(--shadow-xl)', overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid var(--gray-200)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700 }}>
            Déplacer — {prospect.firstName} {prospect.lastName}
          </h3>
          <button onClick={onClose} style={{ background: 'var(--gray-100)', border: 'none', borderRadius: 8, width: 30, height: 30, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-500)' }}>✕</button>
        </div>
        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {STAGES.filter(s => s.id !== currentStage).map(stage => (
            <button
              key={stage.id}
              onClick={() => { onMove(prospect._id, stage.id); onClose(); }}
              style={{
                width: '100%', textAlign: 'left', padding: '12px 16px',
                borderRadius: 12, border: `1.5px solid ${stage.color}33`,
                background: `${stage.color}0d`, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 10,
                color: stage.color, fontWeight: 700, fontSize: 14,
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = `${stage.color}1e`}
              onMouseLeave={e => e.currentTarget.style.background = `${stage.color}0d`}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: stage.color, flexShrink: 0 }} />
              {stage.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Modal Relancer ────────────────────────────────────────────────────────────
const ModalRelancer = ({ isOpen, onClose, prospect }) => {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!prospect?.email) return;
    const subject = encodeURIComponent(`Relance commerciale — ${prospect.company || prospect.firstName}`);
    const body = encodeURIComponent(message || `Bonjour ${prospect.firstName},\n\nJe me permets de vous recontacter suite à nos échanges précédents.\n\nCordialement`);
    window.location.href = `mailto:${prospect.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => { setSent(false); setMessage(''); onClose(); }, 1500);
  };

  if (!isOpen || !prospect) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)', padding: 16,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 440, background: '#fff', borderRadius: 20, boxShadow: 'var(--shadow-xl)', overflow: 'hidden' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid var(--gray-200)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700 }}>✉️ Relancer — {prospect.firstName} {prospect.lastName}</h3>
          <button onClick={onClose} style={{ background: 'var(--gray-100)', border: 'none', borderRadius: 8, width: 30, height: 30, cursor: 'pointer', fontSize: 16, color: 'var(--gray-500)' }}>✕</button>
        </div>
        <form onSubmit={handleSend} style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: 'var(--gray-100)', borderRadius: 10, padding: '10px 14px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 3 }}>Destinataire</div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{prospect.email || '—'}</div>
          </div>
          <div className="form-group">
            <label className="form-label">Message de relance</label>
            <textarea
              className="form-input" rows={4} value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={`Bonjour ${prospect.firstName},\n\nJe me permets de vous recontacter...`}
              style={{ resize: 'vertical' }}
            />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="button" onClick={onClose} className="btn btn-ghost" style={{ flex: 1 }}>Annuler</button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              {sent ? '✅ Ouverture mail...' : '📤 Envoyer la relance'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── Prospect Card ─────────────────────────────────────────────────────────────
const ProspectCard = ({ p, stage, onEdit, onDelete, onDetail, onMove }) => {
  const [expanded, setExpanded]       = useState(false);
  const [showMove, setShowMove]       = useState(false);
  const [showRelance, setShowRelance] = useState(false);

  return (
    <>
      <div
        style={{
          background: '#fff', borderRadius: 12,
          boxShadow: 'var(--shadow-sm)',
          borderLeft: `3px solid ${stage.color}`,
          overflow: 'hidden', cursor: 'pointer',
          transition: 'box-shadow 0.15s, transform 0.15s',
          userSelect: 'none',
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'none'; }}
        onClick={() => setExpanded(v => !v)}
      >
        {/* Top accent bar */}
        <div style={{ height: 3, background: stage.color, opacity: 0.35 }} />

        <div style={{ padding: '12px 14px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>{p.firstName} {p.lastName}</div>
              {p.company && <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2 }}>🏢 {p.company}</div>}
            </div>
            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 2, flexShrink: 0, marginLeft: 8 }}>
              <button onPointerDown={e => e.stopPropagation()} onClick={e => { e.stopPropagation(); onDetail(p); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, padding: '3px 5px', borderRadius: 6 }} title="Détail">👁</button>
              <button onPointerDown={e => e.stopPropagation()} onClick={e => { e.stopPropagation(); onEdit(p); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, padding: '3px 5px', borderRadius: 6 }} title="Modifier">✏️</button>
              <button onPointerDown={e => e.stopPropagation()} onClick={e => { e.stopPropagation(); onDelete(p._id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, padding: '3px 5px', borderRadius: 6, color: 'var(--error)' }} title="Supprimer">🗑</button>
            </div>
          </div>

          {p.estimatedValue > 0 && (
            <div style={{ fontSize: 12, color: 'var(--success)', fontWeight: 800, marginBottom: 4 }}>
              💰 {Number(p.estimatedValue).toLocaleString()} $
            </div>
          )}
          {p.interactions?.length > 0 && (
            <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>💬 {p.interactions.length} interaction(s)</div>
          )}

          {/* Expanded details */}
          {expanded && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--gray-200)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {p.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                  <span style={{ color: 'var(--primary)' }}>✉️</span>
                  <a href={`mailto:${p.email}`} onClick={e => e.stopPropagation()} style={{ color: 'var(--gray-600)', textDecoration: 'none' }}>{p.email}</a>
                </div>
              )}
              {p.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                  <span>📞</span>
                  <a href={`tel:${p.phone}`} onClick={e => e.stopPropagation()} style={{ color: 'var(--gray-600)', textDecoration: 'none' }}>{p.phone}</a>
                </div>
              )}
              {/* Action strip */}
              <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                {p.email && (
                  <a
                    href={`mailto:${p.email}`}
                    onClick={e => e.stopPropagation()}
                    style={{ flex: 1, textAlign: 'center', padding: '6px 4px', borderRadius: 8, background: 'var(--primary-light)', color: 'var(--primary-dark)', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}
                  >✉️ Contacter</a>
                )}
                <button
                  onPointerDown={e => e.stopPropagation()}
                  onClick={e => { e.stopPropagation(); setShowRelance(true); }}
                  style={{ flex: 1, padding: '6px 4px', borderRadius: 8, background: '#f3e8ff', color: '#7c3aed', fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer' }}
                >📤 Relancer</button>
                <button
                  onPointerDown={e => e.stopPropagation()}
                  onClick={e => { e.stopPropagation(); setShowMove(true); }}
                  style={{ flex: 1, padding: '6px 4px', borderRadius: 8, background: '#dcfce7', color: '#16a34a', fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer' }}
                >↕️ Déplacer</button>
              </div>
            </div>
          )}

          {!expanded && (
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <span style={{ fontSize: 10, color: 'var(--gray-400)' }}>Cliquez pour les détails</span>
            </div>
          )}
        </div>
      </div>

      <ModalDeplacer
        isOpen={showMove}
        onClose={() => setShowMove(false)}
        prospect={p}
        currentStage={stage.id}
        onMove={onMove}
      />
      <ModalRelancer
        isOpen={showRelance}
        onClose={() => setShowRelance(false)}
        prospect={p}
      />
    </>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const AdminCRMPage = () => {
  const [prospects, setProspects]     = useState([]);
  const [loading, setLoading]         = useState(true);
  const [showModal, setShowModal]     = useState(false);
  const [editing, setEditing]         = useState(null);
  const [form, setForm]               = useState(EMPTY_FORM);
  const [detail, setDetail]           = useState(null);
  const [interaction, setInteraction] = useState({ type: 'note', content: '' });
  const [dragging, setDragging]       = useState(null);
  const [dragOver, setDragOver]       = useState(null);

  const fetchProspects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await prospectsAPI.getAll({ limit: 200 });
      setProspects(res.data.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchProspects(); }, [fetchProspects]);

  const byStage = (stageId) => prospects.filter(p => p.stage === stageId);

  // ── CRUD ──────────────────────────────────────────────────────────────────
  const openAdd = (stageId = 'lead') => {
    setForm({ ...EMPTY_FORM, stage: stageId });
    setEditing(null);
    setShowModal(true);
  };

  const openEdit = (p) => {
    setForm({
      firstName: p.firstName, lastName: p.lastName,
      email: p.email || '', phone: p.phone || '',
      company: p.company || '', source: p.source,
      stage: p.stage, estimatedValue: p.estimatedValue || '',
      notes: p.notes || '',
    });
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
    } catch (err) { toast.error(err.response?.data?.message || 'Erreur'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce prospect ?')) return;
    try {
      await prospectsAPI.delete(id);
      setProspects(ps => ps.filter(p => p._id !== id));
      toast.success('Supprimé');
    } catch { toast.error('Erreur'); }
  };

  // ── DRAG & DROP ───────────────────────────────────────────────────────────
  const moveStage = async (id, newStage) => {
    setProspects(ps => ps.map(p => p._id === id ? { ...p, stage: newStage } : p));
    try {
      const res = await prospectsAPI.update(id, { stage: newStage });
      setProspects(ps => ps.map(p => p._id === id ? res.data.data : p));
    } catch {
      toast.error('Erreur déplacement');
      fetchProspects();
    }
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.effectAllowed = 'move';
    setDragging(id);
  };

  const handleDrop = (e, stageId) => {
    e.preventDefault();
    if (dragging) moveStage(dragging, stageId);
    setDragging(null);
    setDragOver(null);
  };

  // ── INTERACTIONS ──────────────────────────────────────────────────────────
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

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <DashboardLayout type="admin">

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>CRM — Pipeline Commercial</h1>
          <p style={{ color: 'var(--gray-500)', marginTop: 4 }}>{prospects.length} prospects au total</p>
        </div>
        <button className="btn btn-primary" onClick={() => openAdd()}>+ Nouveau prospect</button>
      </div>

      {/* Stage summary */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }}>
        {STAGES.map(s => (
          <div key={s.id} style={{ background: '#fff', borderRadius: 12, padding: '12px 18px', border: `2px solid ${s.color}33`, flexShrink: 0 }}>
            <div style={{ fontWeight: 800, fontSize: 22, fontFamily: 'var(--font-display)', color: s.color }}>{byStage(s.id).length}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Kanban board */}
      {loading ? <PageLoader /> : (
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 20, alignItems: 'flex-start' }}>
          {STAGES.map(stage => (
            <div
              key={stage.id}
              style={{
                minWidth: 280, borderRadius: 16, padding: 14, flexShrink: 0,
                background: dragOver === stage.id ? `${stage.color}18` : 'var(--gray-200)',
                border: dragOver === stage.id ? `2px dashed ${stage.color}` : '2px solid transparent',
                transition: 'background 0.15s, border 0.15s',
              }}
              onDragOver={e => { e.preventDefault(); setDragOver(stage.id); }}
              onDragLeave={() => setDragOver(null)}
              onDrop={e => handleDrop(e, stage.id)}
            >
              {/* Column header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, paddingBottom: 10, borderBottom: `2px solid ${stage.color}` }}>
                <span style={{ fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', color: stage.color }}>{stage.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ background: stage.color, color: '#fff', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>
                    {byStage(stage.id).length}
                  </span>
                  <button
                    onClick={() => openAdd(stage.id)}
                    style={{ background: `${stage.color}22`, border: 'none', borderRadius: 6, width: 22, height: 22, cursor: 'pointer', fontSize: 15, color: stage.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}
                    title={`Ajouter dans ${stage.label}`}
                  >+</button>
                </div>
              </div>

              {/* Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 80 }}>
                {byStage(stage.id).map(p => (
                  <div
                    key={p._id}
                    draggable
                    onDragStart={e => handleDragStart(e, p._id)}
                    onDragEnd={() => { setDragging(null); setDragOver(null); }}
                    style={{ opacity: dragging === p._id ? 0.4 : 1, transition: 'opacity 0.15s' }}
                  >
                    <ProspectCard
                      p={p}
                      stage={stage}
                      onEdit={openEdit}
                      onDelete={handleDelete}
                      onDetail={setDetail}
                      onMove={moveStage}
                    />
                  </div>
                ))}

                {byStage(stage.id).length === 0 && (
                  <div
                    onClick={() => openAdd(stage.id)}
                    style={{
                      textAlign: 'center', color: 'var(--gray-400)', fontSize: 13,
                      padding: '24px 0', border: '2px dashed var(--gray-300)', borderRadius: 10,
                      cursor: 'pointer', transition: 'border-color 0.15s, color 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = stage.color; e.currentTarget.style.color = stage.color; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-300)'; e.currentTarget.style.color = 'var(--gray-400)'; }}
                  >
                    + Ajouter un prospect
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Add / Edit modal ── */}
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
            <button className="btn btn-primary" onClick={save} disabled={!form.firstName || !form.lastName}>
              {editing ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </div>
      </Modal>

      {/* ── Detail modal ── */}
      <Modal isOpen={!!detail} onClose={() => setDetail(null)} title={detail ? `${detail.firstName} ${detail.lastName}` : ''} size="lg">
        {detail && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              {[
                ['Email',          detail.email          || '—'],
                ['Téléphone',      detail.phone          || '—'],
                ['Entreprise',     detail.company        || '—'],
                ['Source',         detail.source],
                ['Valeur estimée', detail.estimatedValue ? `${detail.estimatedValue} $` : '—'],
                ['Étape',          detail.stage],
              ].map(([k, v]) => (
                <div key={k} style={{ background: 'var(--gray-100)', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 4 }}>{k}</div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div style={{ display: 'flex', gap: 10 }}>
              {detail.email && (
                <a href={`mailto:${detail.email}`} className="btn btn-outline btn-sm" style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}>✉️ Envoyer un email</a>
              )}
              {detail.phone && (
                <a href={`tel:${detail.phone}`} className="btn btn-outline btn-sm" style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}>📞 Appeler</a>
              )}
            </div>

            {detail.notes && (
              <div style={{ background: 'var(--gray-100)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 6 }}>Notes</div>
                <div style={{ fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.6 }}>{detail.notes}</div>
              </div>
            )}

            {/* Interactions */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: 12 }}>Interactions ({detail.interactions?.length || 0})</h4>
              <div style={{ maxHeight: 200, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                {detail.interactions?.map((inter, idx) => (
                  <div key={idx} style={{ background: 'var(--gray-100)', borderRadius: 8, padding: '10px 14px', fontSize: 13 }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                      <span style={{ background: '#dbeafe', color: '#2563eb', padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>{inter.type}</span>
                      <span style={{ color: 'var(--gray-400)', fontSize: 11 }}>{new Date(inter.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div style={{ color: 'var(--gray-700)' }}>{inter.content}</div>
                  </div>
                ))}
                {!detail.interactions?.length && (
                  <p style={{ color: 'var(--gray-400)', fontSize: 13 }}>Aucune interaction enregistrée</p>
                )}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <select className="form-input" style={{ width: 120 }} value={interaction.type} onChange={e => setInteraction(i => ({ ...i, type: e.target.value }))}>
                  {['call','email','meeting','note'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <input
                  className="form-input" style={{ flex: 1 }}
                  placeholder="Contenu de l'interaction..."
                  value={interaction.content}
                  onChange={e => setInteraction(i => ({ ...i, content: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && addInteraction()}
                />
                <button className="btn btn-primary btn-sm" onClick={addInteraction}>Ajouter</button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setDetail(null)}>Fermer</button>
              <button className="btn btn-outline" onClick={() => { setDetail(null); openEdit(detail); }}>✏️ Modifier</button>
            </div>
          </div>
        )}
      </Modal>

    </DashboardLayout>
  );
};

export default AdminCRMPage;