// import React, { useEffect, useState, useCallback } from 'react';
// import DashboardLayout from '../../components/layout/DashboardLayout';
// import { blogAPI } from '../../services/api';
// import { StatusBadge, Modal, PageLoader, EmptyState } from '../../components/common/UI';
// import toast from 'react-hot-toast';

// const CATEGORIES = ['it','reseau','energie','digital','securite','cloud','formation'];
// const EMPTY_FORM = { title: '', excerpt: '', content: '', category: 'it', tags: '', status: 'draft', seo: { metaTitle: '', metaDescription: '' } };

// const AdminBlogPage = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showEditor, setShowEditor] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [form, setForm] = useState(EMPTY_FORM);
//   const [saving, setSaving] = useState(false);
//   const [tab, setTab] = useState('list');

//   const fetchBlogs = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await blogAPI.getAll({ status: 'all', limit: 100 });
//       setBlogs(res.data.data);
//     } catch (e) { console.error(e); }
//     finally { setLoading(false); }
//   }, []);

//   useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

//   const openNew = () => { setForm(EMPTY_FORM); setEditing(null); setShowEditor(true); };
//   const openEdit = (b) => {
//     setForm({ title: b.title, excerpt: b.excerpt, content: b.content, category: b.category, tags: b.tags?.join(', ') || '', status: b.status, seo: b.seo || { metaTitle: '', metaDescription: '' } });
//     setEditing(b._id);
//     setShowEditor(true);
//   };

//   const save = async (publish = false) => {
//     setSaving(true);
//     const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
//     if (publish) payload.status = 'published';
//     try {
//       if (editing) {
//         const res = await blogAPI.update(editing, payload);
//         setBlogs(bs => bs.map(b => b._id === editing ? res.data.data : b));
//         toast.success('Article mis à jour !');
//       } else {
//         const res = await blogAPI.create(payload);
//         setBlogs(bs => [res.data.data, ...bs]);
//         toast.success('Article créé !');
//       }
//       setShowEditor(false);
//     } catch (e) { toast.error(e.response?.data?.message || 'Erreur'); }
//     finally { setSaving(false); }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Supprimer cet article ?')) return;
//     try {
//       await blogAPI.delete(id);
//       setBlogs(bs => bs.filter(b => b._id !== id));
//       toast.success('Article supprimé');
//     } catch { toast.error('Erreur'); }
//   };

//   return (
//     <DashboardLayout type="admin">
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
//         <div>
//           <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>Blog & Catalogue</h1>
//           <p style={{ color: 'var(--gray-500)', marginTop: 4 }}>{blogs.length} article(s)</p>
//         </div>
//         <button className="btn btn-primary" onClick={openNew}>+ Nouvel article</button>
//       </div>

//       {/* Tabs */}
//       <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--gray-200)', padding: 4, borderRadius: 10, width: 'fit-content' }}>
//         {[['list','📝 Articles'], ['seo','🎯 SEO Config']].map(([id, label]) => (
//           <button key={id} onClick={() => setTab(id)} style={{ padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, background: tab === id ? '#fff' : 'transparent', color: tab === id ? 'var(--dark-700)' : 'var(--gray-500)', boxShadow: tab === id ? 'var(--shadow-sm)' : 'none' }}>
//             {label}
//           </button>
//         ))}
//       </div>

//       {tab === 'list' && (
//         <>
//           {loading ? <PageLoader /> : blogs.length === 0 ? (
//             <EmptyState icon="✍️" title="Aucun article" description="Créez votre premier article de blog." action={<button className="btn btn-primary" onClick={openNew}>Créer un article</button>} />
//           ) : (
//             <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
//               <table className="table">
//                 <thead><tr><th>Titre</th><th>Catégorie</th><th>Statut</th><th>Vues</th><th>Date</th><th>Actions</th></tr></thead>
//                 <tbody>
//                   {blogs.map(b => (
//                     <tr key={b._id}>
//                       <td>
//                         <div style={{ fontWeight: 700, maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</div>
//                         <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>/{b.slug}</div>
//                       </td>
//                       <td><span style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>{b.category}</span></td>
//                       <td><StatusBadge status={b.status} /></td>
//                       <td style={{ fontSize: 13, color: 'var(--gray-500)' }}>👁 {b.views || 0}</td>
//                       <td style={{ fontSize: 12, color: 'var(--gray-400)' }}>{new Date(b.createdAt).toLocaleDateString('fr-FR')}</td>
//                       <td>
//                         <div style={{ display: 'flex', gap: 6 }}>
//                           <button className="btn btn-ghost btn-sm" onClick={() => openEdit(b)}>✏️</button>
//                           <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(b._id)} style={{ color: 'var(--error)' }}>🗑</button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </>
//       )}

//       {tab === 'seo' && (
//         <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: 'var(--shadow)' }}>
//           <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 20 }}>Configuration SEO générale</h3>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 600 }}>
//             {[['Titre du site', 'text', 'OMDEVE — Solutions IT & Digitales'],['Meta description', 'text', 'Votre partenaire en solutions IT, réseau, sécurité, cloud et énergie à Kinshasa'],['Mots-clés', 'text', 'IT, réseau, sécurité, cloud, énergie solaire, Kinshasa']].map(([lbl, type, ph]) => (
//               <div key={lbl} className="form-group">
//                 <label className="form-label">{lbl}</label>
//                 <input type={type} className="form-input" placeholder={ph} />
//               </div>
//             ))}
//             <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Sauvegarder la config SEO</button>
//           </div>
//         </div>
//       )}

//       {/* Article Editor Modal */}
//       <Modal isOpen={showEditor} onClose={() => setShowEditor(false)} title={editing ? 'Modifier l\'article' : 'Nouvel article'} size="xl">
//         <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
//           <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 14 }}>
//             <div className="form-group">
//               <label className="form-label">Titre de l'article *</label>
//               <input className="form-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Titre accrocheur SEO-friendly..." />
//             </div>
//             <div className="form-group">
//               <label className="form-label">Catégorie *</label>
//               <select className="form-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
//                 {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
//               </select>
//             </div>
//             <div className="form-group">
//               <label className="form-label">Statut</label>
//               <select className="form-input" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
//                 <option value="draft">Brouillon</option>
//                 <option value="published">Publié</option>
//               </select>
//             </div>
//           </div>

//           <div className="form-group">
//             <label className="form-label">Extrait (résumé) *</label>
//             <textarea className="form-input" rows={2} value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Résumé affiché dans la liste d'articles (150-200 caractères)..." style={{ resize: 'vertical' }} />
//           </div>

//           <div className="form-group">
//             <label className="form-label">Contenu complet *</label>
//             <textarea className="form-input" rows={12} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Rédigez votre article ici. Supporte le HTML basique..." style={{ resize: 'vertical', fontFamily: 'monospace', fontSize: 13 }} />
//           </div>

//           <div className="form-group">
//             <label className="form-label">Tags (séparés par virgule)</label>
//             <input className="form-input" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="réseau, sécurité, cloud, Kinshasa..." />
//           </div>

//           {/* SEO */}
//           <div style={{ background: 'var(--gray-100)', borderRadius: 12, padding: 16 }}>
//             <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>🎯 SEO</div>
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
//               <div className="form-group">
//                 <label className="form-label">Meta title</label>
//                 <input className="form-input" value={form.seo.metaTitle} onChange={e => setForm(f => ({ ...f, seo: { ...f.seo, metaTitle: e.target.value } }))} placeholder="Titre SEO (60 car. max)" />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Meta description</label>
//                 <input className="form-input" value={form.seo.metaDescription} onChange={e => setForm(f => ({ ...f, seo: { ...f.seo, metaDescription: e.target.value } }))} placeholder="Description SEO (160 car. max)" />
//               </div>
//             </div>
//           </div>

//           <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
//             <button className="btn btn-ghost" onClick={() => setShowEditor(false)}>Annuler</button>
//             <button className="btn btn-outline" onClick={() => save(false)} disabled={saving || !form.title || !form.content}>
//               {saving ? '⏳...' : '💾 Brouillon'}
//             </button>
//             <button className="btn btn-primary" onClick={() => save(true)} disabled={saving || !form.title || !form.content}>
//               {saving ? '⏳...' : '🚀 Publier'}
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </DashboardLayout>
//   );
// };

// export default AdminBlogPage;





import React, { useEffect, useState, useCallback } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { blogAPI } from '../../services/api';
import { StatusBadge, Modal, PageLoader, EmptyState } from '../../components/common/UI';
import toast from 'react-hot-toast';

/* ------------------------------------------------------------------ */
/*  Constants                                                           */
/* ------------------------------------------------------------------ */
const CATEGORIES = ['it', 'reseau', 'energie', 'digital', 'securite', 'cloud', 'formation'];
const EMPTY_FORM  = { title: '', excerpt: '', content: '', category: 'it', tags: '', status: 'draft', seo: { metaTitle: '', metaDescription: '' } };

const INITIAL_SERVICES = [
  { id: 1, name: 'Infrastructure Réseau',   icon: '🌐', description: 'Câblage, switches, Wi-Fi, VPN, firewall',          price: 'Sur devis', category: 'reseau',   active: true  },
  { id: 2, name: 'Cybersécurité',           icon: '🔒', description: 'Audit sécurité, firewall UTM, SIEM, antivirus',    price: 'Sur devis', category: 'securite', active: true  },
  { id: 3, name: 'Solutions Cloud',         icon: '☁️',  description: 'Migration, hébergement, sauvegarde cloud',         price: 'Dès 150$/mo', category: 'cloud',  active: true  },
  { id: 4, name: 'Développement Digital',   icon: '💻', description: 'Sites web, e-commerce, applications mobiles',      price: 'Sur devis', category: 'digital',  active: true  },
  { id: 5, name: 'Énergie Solaire',         icon: '☀️',  description: 'Installation panneaux, stockage, monitoring',      price: 'Sur devis', category: 'energie',  active: true  },
  { id: 6, name: 'Formation IT',            icon: '🎓', description: 'Formation équipes, certifications, workshops',     price: 'Dès 200$/j', category: 'formation', active: false },
];

const INITIAL_TARIFS = [
  { id: 1, name: 'Pack Starter',     price: 499,  currency: 'USD', period: 'mois', features: ['Support email 9h-17h', 'Maintenance préventive', '2h intervention/mois', 'Rapport mensuel'],          popular: false },
  { id: 2, name: 'Pack Business',    price: 999,  currency: 'USD', period: 'mois', features: ['Support 24/7', 'Maintenance proactive', '8h intervention/mois', 'Dashboard temps réel', 'SLA garanti'], popular: true  },
  { id: 3, name: 'Pack Entreprise',  price: 2499, currency: 'USD', period: 'mois', features: ['Support dédié 24/7', 'Technicien sur site', 'Interventions illimitées', 'CISO virtuel', 'Audit trimestriel'], popular: false },
];

const INITIAL_CONFIG = {
  siteName:     'OMDEVE',
  tagline:      'Solutions IT & Digitales à Kinshasa',
  description:  'Votre partenaire en solutions réseau, sécurité, cloud, digital et énergie solaire en RDC.',
  email:        'contact@omdeve.com',
  phone:        '+243 810 000 001',
  whatsapp:     '+243 810 000 001',
  address:      'Kinshasa, RD Congo',
  facebook:     'https://facebook.com/omdeve',
  linkedin:     'https://linkedin.com/company/omdeve',
  twitter:      '',
  instagram:    '',
  primaryColor: '#00c2ff',
  maintenanceMode: false,
  googleAnalytics: '',
  metaTitle:    'OMDEVE — Solutions IT & Digitales à Kinshasa',
  metaDescription: 'Votre partenaire en solutions IT, réseau, sécurité, cloud et énergie à Kinshasa, RDC.',
};

/* ================================================================== */
/*  Component                                                           */
/* ================================================================== */
const AdminBlogPage = () => {
  /* ---- Blog state ---- */
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  /* ---- Catalogue state ---- */
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [tarifs, setTarifs] = useState(INITIAL_TARIFS);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({ name: '', icon: '🔧', description: '', price: 'Sur devis', category: 'it', active: true });

  /* ---- Config state ---- */
  const [config, setConfig] = useState(INITIAL_CONFIG);
  const [configSaving, setConfigSaving] = useState(false);

  /* ---- Tab ---- */
  const [tab, setTab] = useState('blog');
  const [catalogTab, setCatalogTab] = useState('services');

  /* ---- Fetch blogs ---- */
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await blogAPI.getAll({ status: 'all', limit: 100 });
      setBlogs(res.data.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  /* ---------------------------------------------------------------- */
  /*  Blog handlers                                                     */
  /* ---------------------------------------------------------------- */
  const openNew  = () => { setForm(EMPTY_FORM); setEditing(null); setShowEditor(true); };
  const openEdit = (b) => {
    setForm({ title: b.title, excerpt: b.excerpt, content: b.content, category: b.category, tags: b.tags?.join(', ') || '', status: b.status, seo: b.seo || { metaTitle: '', metaDescription: '' } });
    setEditing(b._id);
    setShowEditor(true);
  };

  const saveBlog = async (publish = false) => {
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

  const deleteBlog = async (id) => {
    if (!window.confirm('Supprimer cet article ?')) return;
    try { await blogAPI.delete(id); setBlogs(bs => bs.filter(b => b._id !== id)); toast.success('Supprimé'); }
    catch { toast.error('Erreur'); }
  };

  /* ---------------------------------------------------------------- */
  /*  Catalogue handlers                                                */
  /* ---------------------------------------------------------------- */
  const openServiceEdit = (s) => {
    setServiceForm({ name: s.name, icon: s.icon, description: s.description, price: s.price, category: s.category, active: s.active });
    setEditingService(s.id);
    setShowServiceModal(true);
  };
  const openServiceNew = () => {
    setServiceForm({ name: '', icon: '🔧', description: '', price: 'Sur devis', category: 'it', active: true });
    setEditingService(null);
    setShowServiceModal(true);
  };
  const saveService = () => {
    if (!serviceForm.name) return toast.error('Nom requis');
    if (editingService) {
      setServices(ss => ss.map(s => s.id === editingService ? { ...s, ...serviceForm } : s));
      toast.success('Service mis à jour !');
    } else {
      setServices(ss => [...ss, { ...serviceForm, id: Date.now() }]);
      toast.success('Service ajouté !');
    }
    setShowServiceModal(false);
  };
  const deleteService = (id) => { if (window.confirm('Supprimer ce service ?')) { setServices(ss => ss.filter(s => s.id !== id)); toast.success('Supprimé'); } };
  const toggleService = (id) => setServices(ss => ss.map(s => s.id === id ? { ...s, active: !s.active } : s));

  /* ---------------------------------------------------------------- */
  /*  Config save (mock — adapt to your API)                           */
  /* ---------------------------------------------------------------- */
  const saveConfig = async () => {
    setConfigSaving(true);
    await new Promise(r => setTimeout(r, 800)); // replace with actual API call
    setConfigSaving(false);
    toast.success('Configuration sauvegardée !');
  };

  /* ================================================================ */
  /*  Render                                                            */
  /* ================================================================ */
  return (
    <DashboardLayout type="admin">
      {/* ---- Page header ---- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>Blog, Catalogue & Configuration</h1>
          <p style={{ color: 'var(--gray-500)', marginTop: 4 }}>Gérez votre contenu, services et paramètres du site</p>
        </div>
        {tab === 'blog' && <button className="btn btn-primary" onClick={openNew}>+ Nouvel article</button>}
        {tab === 'catalogue' && catalogTab === 'services' && <button className="btn btn-primary" onClick={openServiceNew}>+ Nouveau service</button>}
      </div>

      {/* ---- Main tabs ---- */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: 'var(--gray-200)', padding: 4, borderRadius: 12, width: 'fit-content' }}>
        {[['blog','📝 Blog'], ['catalogue','🛍️ Catalogue'], ['config','⚙️ Configuration']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ padding: '9px 22px', borderRadius: 9, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, transition: 'all 0.15s', background: tab === id ? '#fff' : 'transparent', color: tab === id ? 'var(--dark-700)' : 'var(--gray-500)', boxShadow: tab === id ? 'var(--shadow-sm)' : 'none' }}>
            {label}
          </button>
        ))}
      </div>

      {/* ================================================================ */}
      {/* TAB: BLOG                                                        */}
      {/* ================================================================ */}
      {tab === 'blog' && (
        <>
          {loading ? <PageLoader /> : blogs.length === 0 ? (
            <EmptyState icon="✍️" title="Aucun article" description="Créez votre premier article de blog." action={<button className="btn btn-primary" onClick={openNew}>Créer un article</button>} />
          ) : (
            <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: 'var(--gray-600)' }}>{blogs.length} article(s)</span>
              </div>
              <table className="table">
                <thead>
                  <tr><th>Titre</th><th>Catégorie</th><th>Statut</th><th>Vues</th><th>Date</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {blogs.map(b => (
                    <tr key={b._id}>
                      <td>
                        <div style={{ fontWeight: 700, maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</div>
                        <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>/{b.slug}</div>
                      </td>
                      <td><span style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>{b.category}</span></td>
                      <td><StatusBadge status={b.status} /></td>
                      <td style={{ fontSize: 13, color: 'var(--gray-500)' }}>👁 {b.views || 0}</td>
                      <td style={{ fontSize: 12, color: 'var(--gray-400)' }}>{new Date(b.createdAt).toLocaleDateString('fr-FR')}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-ghost btn-sm" onClick={() => openEdit(b)}>✏️</button>
                          <button className="btn btn-ghost btn-sm" onClick={() => deleteBlog(b._id)} style={{ color: 'var(--error)' }}>🗑</button>
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

      {/* ================================================================ */}
      {/* TAB: CATALOGUE                                                    */}
      {/* ================================================================ */}
      {tab === 'catalogue' && (
        <>
          {/* Sub-tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--gray-200)', padding: 4, borderRadius: 10, width: 'fit-content' }}>
            {[['services', '🛠️ Services'], ['tarifs', '💰 Tarifs']].map(([id, label]) => (
              <button key={id} onClick={() => setCatalogTab(id)} style={{ padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, background: catalogTab === id ? '#fff' : 'transparent', color: catalogTab === id ? 'var(--dark-700)' : 'var(--gray-500)', boxShadow: catalogTab === id ? 'var(--shadow-sm)' : 'none' }}>
                {label}
              </button>
            ))}
          </div>

          {/* ---- Services ---- */}
          {catalogTab === 'services' && (
            <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
              <table className="table">
                <thead><tr><th>Service</th><th>Catégorie</th><th>Prix</th><th>Statut</th><th>Actions</th></tr></thead>
                <tbody>
                  {services.map(s => (
                    <tr key={s.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: 24 }}>{s.icon}</span>
                          <div>
                            <div style={{ fontWeight: 700 }}>{s.name}</div>
                            <div style={{ fontSize: 12, color: 'var(--gray-400)', maxWidth: 280 }}>{s.description}</div>
                          </div>
                        </div>
                      </td>
                      <td><span style={{ background: 'var(--gray-100)', padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>{s.category}</span></td>
                      <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{s.price}</td>
                      <td>
                        <div onClick={() => toggleService(s.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                          <div style={{ width: 40, height: 22, background: s.active ? 'var(--success)' : 'var(--gray-300)', borderRadius: 999, position: 'relative', transition: 'background 0.2s' }}>
                            <div style={{ position: 'absolute', top: 2, left: s.active ? 20 : 2, width: 18, height: 18, background: '#fff', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 600, color: s.active ? 'var(--success)' : 'var(--gray-400)' }}>{s.active ? 'Actif' : 'Inactif'}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-ghost btn-sm" onClick={() => openServiceEdit(s)}>✏️</button>
                          <button className="btn btn-ghost btn-sm" onClick={() => deleteService(s.id)} style={{ color: 'var(--error)' }}>🗑</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ---- Tarifs ---- */}
          {catalogTab === 'tarifs' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {tarifs.map((t, idx) => (
                <div key={t.id} style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow)', border: t.popular ? '2px solid var(--primary)' : '2px solid var(--gray-200)', position: 'relative' }}>
                  {t.popular && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: '#fff', padding: '4px 16px', borderRadius: 999, fontSize: 12, fontWeight: 800, whiteSpace: 'nowrap' }}>⭐ Populaire</div>}
                  <div style={{ marginBottom: 16 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20 }}>{t.name}</h3>
                    <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--primary)', marginTop: 8 }}>
                      ${t.price}<span style={{ fontSize: 14, fontWeight: 400, color: 'var(--gray-400)' }}>/{t.period}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
                    {t.features.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                        <span style={{ color: 'var(--success)', fontWeight: 800 }}>✓</span>
                        <span style={{ color: 'var(--gray-600)' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => {
                      const name = window.prompt('Nom du pack :', t.name);
                      if (name) { setTarifs(ts => ts.map(x => x.id === t.id ? { ...x, name } : x)); toast.success('Mis à jour'); }
                    }}>✏️ Modifier</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setTarifs(ts => ts.map(x => x.id === t.id ? { ...x, popular: !x.popular } : ts.map(y => ({ ...y, popular: false })).find(y => y.id === x.id)))}>
                      {t.popular ? '⭐ Retirer vedette' : '⭐ Mettre en vedette'}
                    </button>
                  </div>
                </div>
              ))}
              <div style={{ background: 'var(--gray-100)', borderRadius: 16, padding: 24, border: '2px dashed var(--gray-300)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, cursor: 'pointer', minHeight: 200 }} onClick={() => toast('Fonctionnalité d\'ajout de pack — à connecter à votre API')}>
                <span style={{ fontSize: 32 }}>➕</span>
                <span style={{ fontWeight: 700, color: 'var(--gray-500)' }}>Ajouter un pack</span>
              </div>
            </div>
          )}
        </>
      )}

      {/* ================================================================ */}
      {/* TAB: CONFIGURATION                                                */}
      {/* ================================================================ */}
      {tab === 'config' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Infos générales */}
          <Section title="🏢 Informations générales">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                ['siteName',    'Nom du site',        'text'],
                ['tagline',     'Tagline',             'text'],
                ['email',       'Email de contact',    'email'],
                ['phone',       'Téléphone',           'tel'],
                ['whatsapp',    'WhatsApp',            'tel'],
                ['address',     'Adresse',             'text'],
              ].map(([key, label, type]) => (
                <div key={key} className="form-group">
                  <label className="form-label">{label}</label>
                  <input type={type} className="form-input" value={config[key]} onChange={e => setConfig(c => ({ ...c, [key]: e.target.value }))} />
                </div>
              ))}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Description du site</label>
                <textarea className="form-input" rows={2} value={config.description} onChange={e => setConfig(c => ({ ...c, description: e.target.value }))} style={{ resize: 'vertical' }} />
              </div>
            </div>
          </Section>

          {/* Réseaux sociaux */}
          <Section title="📱 Réseaux sociaux">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[['facebook','Facebook'],['linkedin','LinkedIn'],['twitter','Twitter / X'],['instagram','Instagram']].map(([key, label]) => (
                <div key={key} className="form-group">
                  <label className="form-label">{label}</label>
                  <input type="url" className="form-input" value={config[key]} onChange={e => setConfig(c => ({ ...c, [key]: e.target.value }))} placeholder="https://..." />
                </div>
              ))}
            </div>
          </Section>

          {/* SEO */}
          <Section title="🎯 SEO & Analytics">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Meta Title (60 car. max)</label>
                <input type="text" className="form-input" value={config.metaTitle} onChange={e => setConfig(c => ({ ...c, metaTitle: e.target.value }))} maxLength={60} />
                <div style={{ fontSize: 11, color: config.metaTitle.length > 55 ? 'var(--error)' : 'var(--gray-400)', marginTop: 4 }}>{config.metaTitle.length}/60 caractères</div>
              </div>
              <div className="form-group">
                <label className="form-label">Meta Description (160 car. max)</label>
                <textarea className="form-input" rows={2} value={config.metaDescription} onChange={e => setConfig(c => ({ ...c, metaDescription: e.target.value }))} maxLength={160} style={{ resize: 'vertical' }} />
                <div style={{ fontSize: 11, color: config.metaDescription.length > 150 ? 'var(--error)' : 'var(--gray-400)', marginTop: 4 }}>{config.metaDescription.length}/160 caractères</div>
              </div>
              <div className="form-group">
                <label className="form-label">Google Analytics ID</label>
                <input type="text" className="form-input" value={config.googleAnalytics} onChange={e => setConfig(c => ({ ...c, googleAnalytics: e.target.value }))} placeholder="G-XXXXXXXXXX" />
              </div>
            </div>
          </Section>

          {/* Apparence */}
          <Section title="🎨 Apparence">
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Couleur principale</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
                  <input type="color" value={config.primaryColor} onChange={e => setConfig(c => ({ ...c, primaryColor: e.target.value }))} style={{ width: 48, height: 40, borderRadius: 8, border: '1px solid var(--gray-200)', cursor: 'pointer', padding: 2 }} />
                  <input type="text" className="form-input" value={config.primaryColor} onChange={e => setConfig(c => ({ ...c, primaryColor: e.target.value }))} style={{ width: 120 }} />
                  <div style={{ width: 40, height: 40, background: config.primaryColor, borderRadius: 8 }} />
                </div>
              </div>
            </div>
          </Section>

          {/* Mode maintenance */}
          <Section title="🔧 Maintenance">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: config.maintenanceMode ? '#fee2e2' : 'var(--gray-100)', borderRadius: 12, transition: 'background 0.3s' }}>
              <div>
                <div style={{ fontWeight: 700, color: config.maintenanceMode ? 'var(--error)' : 'var(--dark-700)' }}>
                  {config.maintenanceMode ? '⚠️ Mode maintenance ACTIVÉ' : '✅ Site en ligne'}
                </div>
                <div style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 2 }}>
                  {config.maintenanceMode ? 'Le site affiche une page de maintenance aux visiteurs.' : 'Le site est accessible à tous les visiteurs.'}
                </div>
              </div>
              <div onClick={() => setConfig(c => ({ ...c, maintenanceMode: !c.maintenanceMode }))} style={{ width: 52, height: 28, background: config.maintenanceMode ? 'var(--error)' : 'var(--gray-300)', borderRadius: 999, position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: 3, left: config.maintenanceMode ? 26 : 3, width: 22, height: 22, background: '#fff', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </div>
            </div>
          </Section>

          {/* Save button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <button className="btn btn-ghost" onClick={() => setConfig(INITIAL_CONFIG)}>Réinitialiser</button>
            <button className="btn btn-primary btn-lg" onClick={saveConfig} disabled={configSaving}>
              {configSaving ? '⏳ Sauvegarde...' : '💾 Sauvegarder la configuration'}
            </button>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL: Blog editor                                                */}
      {/* ================================================================ */}
      <Modal isOpen={showEditor} onClose={() => setShowEditor(false)} title={editing ? "Modifier l'article" : 'Nouvel article'} size="xl">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Titre *</label>
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
            <label className="form-label">Extrait *</label>
            <textarea className="form-input" rows={2} value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Résumé (150–200 caractères)..." style={{ resize: 'vertical' }} />
          </div>

          <div className="form-group">
            <label className="form-label">Contenu *</label>
            <textarea className="form-input" rows={12} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Rédigez l'article ici. Supporte le HTML..." style={{ resize: 'vertical', fontFamily: 'monospace', fontSize: 13 }} />
          </div>

          <div className="form-group">
            <label className="form-label">Tags (séparés par virgule)</label>
            <input className="form-input" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="réseau, sécurité, cloud..." />
          </div>

          <div style={{ background: 'var(--gray-100)', borderRadius: 12, padding: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>🎯 SEO</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Meta title</label>
                <input className="form-input" value={form.seo.metaTitle} onChange={e => setForm(f => ({ ...f, seo: { ...f.seo, metaTitle: e.target.value } }))} placeholder="Titre SEO (60 car.)" />
              </div>
              <div className="form-group">
                <label className="form-label">Meta description</label>
                <input className="form-input" value={form.seo.metaDescription} onChange={e => setForm(f => ({ ...f, seo: { ...f.seo, metaDescription: e.target.value } }))} placeholder="Description SEO (160 car.)" />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn btn-ghost" onClick={() => setShowEditor(false)}>Annuler</button>
            <button className="btn btn-outline" onClick={() => saveBlog(false)} disabled={saving || !form.title || !form.content}>{saving ? '⏳...' : '💾 Brouillon'}</button>
            <button className="btn btn-primary" onClick={() => saveBlog(true)} disabled={saving || !form.title || !form.content}>{saving ? '⏳...' : '🚀 Publier'}</button>
          </div>
        </div>
      </Modal>

      {/* ================================================================ */}
      {/* MODAL: Service editor                                             */}
      {/* ================================================================ */}
      <Modal isOpen={showServiceModal} onClose={() => setShowServiceModal(false)} title={editingService ? 'Modifier le service' : 'Nouveau service'} size="md">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Icône</label>
              <input className="form-input" value={serviceForm.icon} onChange={e => setServiceForm(f => ({ ...f, icon: e.target.value }))} style={{ fontSize: 22, textAlign: 'center' }} maxLength={2} />
            </div>
            <div className="form-group">
              <label className="form-label">Nom du service *</label>
              <input className="form-input" value={serviceForm.name} onChange={e => setServiceForm(f => ({ ...f, name: e.target.value }))} placeholder="Ex : Infrastructure Réseau" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-input" rows={2} value={serviceForm.description} onChange={e => setServiceForm(f => ({ ...f, description: e.target.value }))} style={{ resize: 'vertical' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Catégorie</label>
              <select className="form-input" value={serviceForm.category} onChange={e => setServiceForm(f => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Prix affiché</label>
              <input className="form-input" value={serviceForm.price} onChange={e => setServiceForm(f => ({ ...f, price: e.target.value }))} placeholder="Sur devis / Dès 500$" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <label style={{ fontWeight: 600 }}>Service actif</label>
            <div onClick={() => setServiceForm(f => ({ ...f, active: !f.active }))} style={{ width: 44, height: 24, background: serviceForm.active ? 'var(--success)' : 'var(--gray-300)', borderRadius: 999, position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
              <div style={{ position: 'absolute', top: 2, left: serviceForm.active ? 22 : 2, width: 20, height: 20, background: '#fff', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
            </div>
            <span style={{ fontSize: 13, color: serviceForm.active ? 'var(--success)' : 'var(--gray-400)', fontWeight: 600 }}>{serviceForm.active ? 'Actif' : 'Inactif'}</span>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn btn-ghost" onClick={() => setShowServiceModal(false)}>Annuler</button>
            <button className="btn btn-primary" onClick={saveService} disabled={!serviceForm.name}>
              {editingService ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

/* ---- Helper: section card ---- */
const Section = ({ title, children }) => (
  <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow)' }}>
    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid var(--gray-200)' }}>{title}</h3>
    {children}
  </div>
);

export default AdminBlogPage;


