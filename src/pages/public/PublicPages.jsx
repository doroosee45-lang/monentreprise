import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';
import { blogAPI, projectsAPI } from '../../services/api';
import { PageLoader, StatusBadge } from '../../components/common/UI';

/* ===================== BLOG LIST ===================== */
export const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const CATS = ['','it','reseau','energie','digital','securite','cloud','formation'];

  useEffect(() => {
    setLoading(true);
    blogAPI.getAll({ category: cat || undefined, page, limit: 9 })
      .then(r => { setBlogs(r.data.data); setPages(r.data.pages || 1); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [cat, page]);

  return (
    <PublicLayout>
      <section style={{ background: 'linear-gradient(135deg, var(--dark-900), var(--dark-700))', padding: '72px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: 'clamp(32px,5vw,56px)', marginBottom: 16 }}>Blog OMDEVE</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, maxWidth: 480, margin: '0 auto' }}>Actualités IT, guides pratiques et conseils d'experts.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {/* Category filter */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 40, justifyContent: 'center' }}>
            {CATS.map(c => (
              <button key={c} onClick={() => { setCat(c); setPage(1); }} style={{ padding: '8px 18px', borderRadius: 999, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, background: cat === c ? 'var(--primary)' : 'var(--gray-200)', color: cat === c ? '#0a0e1a' : 'var(--gray-600)', transition: 'all 0.15s' }}>
                {c || 'Tous'}
              </button>
            ))}
          </div>

          {loading ? <PageLoader /> : blogs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gray-400)' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📰</div>
              <p>Aucun article dans cette catégorie pour l'instant.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px,1fr))', gap: 28 }}>
              {blogs.map(b => (
                <Link key={b._id} to={`/blog/${b.slug}`} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-xl)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}>
                  <div style={{ height: 180, background: `linear-gradient(135deg, var(--dark-700), var(--dark-800))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
                    {b.coverImage ? <img src={b.coverImage} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '📰'}
                  </div>
                  <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                      <span style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>{b.category}</span>
                      <span style={{ color: 'var(--gray-400)', fontSize: 12 }}>⏱ {b.readTime} min</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, marginBottom: 8, color: 'var(--dark-700)', lineHeight: 1.3 }}>{b.title}</h3>
                    <p style={{ color: 'var(--gray-500)', fontSize: 13, lineHeight: 1.6, flex: 1 }}>{b.excerpt}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--gray-200)' }}>
                      <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{b.author?.firstName} {b.author?.lastName}</span>
                      <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{b.publishedAt ? new Date(b.publishedAt).toLocaleDateString('fr-FR') : ''}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {pages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
              {Array.from({ length: pages }, (_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: page === i + 1 ? 'var(--primary)' : 'var(--gray-200)', color: page === i + 1 ? '#0a0e1a' : 'var(--gray-600)', fontWeight: 700 }}>{i + 1}</button>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
};

/* ===================== BLOG DETAIL ===================== */
export const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogAPI.getBySlug(slug).then(r => setBlog(r.data.data)).catch(console.error).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <PublicLayout><PageLoader /></PublicLayout>;
  if (!blog) return <PublicLayout><div style={{ textAlign: 'center', padding: '80px 0' }}>Article introuvable</div></PublicLayout>;

  return (
    <PublicLayout>
      <section style={{ background: 'linear-gradient(135deg, var(--dark-900), var(--dark-700))', padding: '72px 0 40px' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            <Link to="/blog" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>← Blog</Link>
          </div>
          <span style={{ background: 'rgba(0,194,255,0.15)', color: 'var(--primary)', padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, marginBottom: 16, display: 'inline-block' }}>{blog.category}</span>
          <h1 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: 'clamp(24px,4vw,44px)', lineHeight: 1.2, marginBottom: 20 }}>{blog.title}</h1>
          <div style={{ display: 'flex', gap: 20, color: 'rgba(255,255,255,0.5)', fontSize: 13, flexWrap: 'wrap' }}>
            <span>✍️ {blog.author?.firstName} {blog.author?.lastName}</span>
            <span>👁 {blog.views} vues</span>
            <span>⏱ {blog.readTime} min de lecture</span>
            {blog.publishedAt && <span>📅 {new Date(blog.publishedAt).toLocaleDateString('fr-FR')}</span>}
          </div>
        </div>
      </section>
      <section className="section-sm">
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: '40px 48px', boxShadow: 'var(--shadow)', lineHeight: 1.8, fontSize: 16, color: 'var(--gray-700)' }}
            dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }} />

          {blog.tags?.length > 0 && (
            <div style={{ marginTop: 28, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {blog.tags.map(t => <span key={t} style={{ background: 'var(--gray-200)', color: 'var(--gray-600)', padding: '6px 14px', borderRadius: 999, fontSize: 13 }}>#{t}</span>)}
            </div>
          )}

          {blog.related?.length > 0 && (
            <div style={{ marginTop: 48 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 20 }}>Articles similaires</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                {blog.related.map(r => (
                  <Link key={r._id} to={`/blog/${r.slug}`} style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: 'var(--shadow-sm)', textDecoration: 'none', transition: 'all 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--dark-700)', marginBottom: 6, lineHeight: 1.3 }}>{r.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{r.excerpt?.slice(0, 60)}...</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: 40, background: 'linear-gradient(135deg, var(--dark-700), var(--dark-800))', borderRadius: 16, padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', color: '#fff', marginBottom: 6 }}>Un projet en tête ?</h4>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Contactez OMDEVE pour une consultation gratuite.</p>
            </div>
            <Link to="/devis" className="btn btn-primary">Demander un devis →</Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

/* ===================== REALISATIONS ===================== */
export const RealisationsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState('');

  useEffect(() => {
    projectsAPI.getPortfolio({ category: cat || undefined })
      .then(r => setProjects(r.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [cat]);

  const CATS = [['','Tous'],['reseau','Réseau'],['digital','Digital'],['securite','Sécurité'],['cloud','Cloud'],['energie','Énergie'],['formation','Formation']];

  return (
    <PublicLayout>
      <section style={{ background: 'linear-gradient(135deg, var(--dark-900), var(--dark-700))', padding: '72px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: 'clamp(32px,5vw,56px)', marginBottom: 16 }}>Nos Réalisations</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, maxWidth: 500, margin: '0 auto' }}>Découvrez les projets que nous avons livrés avec succès pour nos clients.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 40, justifyContent: 'center' }}>
            {CATS.map(([id, lbl]) => (
              <button key={id} onClick={() => setCat(id)} style={{ padding: '8px 18px', borderRadius: 999, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, background: cat === id ? 'var(--primary)' : 'var(--gray-200)', color: cat === id ? '#0a0e1a' : 'var(--gray-600)', transition: 'all 0.15s' }}>{lbl}</button>
            ))}
          </div>
          {loading ? <PageLoader /> : projects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gray-400)' }}>
              <p>Aucune réalisation publiée dans cette catégorie.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px,1fr))', gap: 24 }}>
              {projects.map(p => (
                <div key={p._id} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-xl)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}>
                  <div style={{ height: 180, background: 'linear-gradient(135deg, var(--dark-700), var(--dark-800))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 56 }}>{p.category === 'digital' ? '💻' : p.category === 'energie' ? '☀️' : p.category === 'reseau' ? '🌐' : p.category === 'securite' ? '🔒' : '🚀'}</span>
                  </div>
                  <div style={{ padding: '20px 22px' }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                      <span style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>{p.category}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, marginBottom: 8 }}>{p.title}</h3>
                    <p style={{ color: 'var(--gray-500)', fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>{p.description?.slice(0,120)}...</p>
                    {p.technologies?.length > 0 && (
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                        {p.technologies.map(t => <span key={t} style={{ background: 'var(--gray-200)', padding: '3px 8px', borderRadius: 6, fontSize: 11, color: 'var(--gray-600)', fontWeight: 600 }}>{t}</span>)}
                      </div>
                    )}
                    {p.testimonial?.text && (
                      <div style={{ background: 'var(--gray-100)', borderRadius: 10, padding: '12px 14px', borderLeft: '3px solid var(--primary)' }}>
                        <p style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--gray-600)', lineHeight: 1.6 }}>"{p.testimonial.text}"</p>
                        <div style={{ display: 'flex', gap: 2, marginTop: 6 }}>
                          {Array(p.testimonial.rating || 5).fill(0).map((_, i) => <span key={i} style={{ color: '#f59e0b', fontSize: 12 }}>★</span>)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
};

/* ===================== TARIFS ===================== */
export const TarifsPage = () => {
  const plans = [
    { name: 'Starter', price: '500 $', period: 'projet', color: '#3b82f6', features: ['1 service inclus', 'Support email', 'Délai standard', '1 révision gratuite', 'Documentation de base'], noFeatures: ['Support prioritaire', 'Maintenance incluse', 'SLA garanti'] },
    { name: 'Business', price: '2 500 $', period: 'projet', color: '#00c2ff', popular: true, features: ['Jusqu\'à 3 services', 'Support email + téléphone', 'Délai prioritaire', '3 révisions gratuites', 'Documentation complète', 'Formation équipe (4h)', 'Maintenance 3 mois'], noFeatures: ['SLA garanti', 'Dedicated manager'] },
    { name: 'Enterprise', price: 'Sur devis', period: '', color: '#a855f7', features: ['Services illimités', 'Support 24/7 dédié', 'Délai express', 'Révisions illimitées', 'Documentation sur mesure', 'Formation complète', 'Maintenance 1 an', 'SLA garanti 99.9%', 'Dedicated account manager'], noFeatures: [] },
  ];

  const faqs = [
    { q: 'Comment est calculé le prix final ?', a: 'Le prix dépend de la complexité du projet, du nombre de services requis et du délai. Nous fournissons un devis détaillé après étude de votre besoin.' },
    { q: 'Quels moyens de paiement acceptez-vous ?', a: 'Nous acceptons les virements bancaires, Airtel Money, Orange Money, M-Pesa et les paiements en espèces pour les projets locaux.' },
    { q: 'Y a-t-il un acompte requis ?', a: 'Oui, un acompte de 40% est requis à la signature du contrat. Le solde est réglé à la livraison du projet.' },
    { q: 'Proposez-vous des facilités de paiement ?', a: 'Pour les grands projets (> 5 000 $), nous proposons un échelonnement en 3 versements sans frais supplémentaires.' },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <PublicLayout>
      <section style={{ background: 'linear-gradient(135deg, var(--dark-900), var(--dark-700))', padding: '72px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: 'clamp(32px,5vw,56px)', marginBottom: 16 }}>Nos Tarifs</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17 }}>Des prix transparents adaptés à votre budget.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px,1fr))', gap: 24, marginBottom: 64 }}>
            {plans.map(plan => (
              <div key={plan.name} style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: plan.popular ? `0 12px 40px ${plan.color}30` : 'var(--shadow)', border: `2px solid ${plan.popular ? plan.color : 'transparent'}`, position: 'relative', transform: plan.popular ? 'translateY(-8px)' : 'none' }}>
                {plan.popular && <div style={{ background: plan.color, color: '#0a0e1a', fontSize: 11, fontWeight: 800, padding: '6px 0', textAlign: 'center', letterSpacing: '1px' }}>⭐ PLUS POPULAIRE</div>}
                <div style={{ padding: '28px 28px 20px', background: `linear-gradient(135deg, ${plan.color}12, transparent)`, borderBottom: `3px solid ${plan.color}` }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 12 }}>{plan.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: plan.color }}>{plan.price}</span>
                    {plan.period && <span style={{ color: 'var(--gray-400)', fontSize: 14 }}>/ {plan.period}</span>}
                  </div>
                </div>
                <div style={{ padding: '24px 28px' }}>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                    {plan.features.map(f => <li key={f} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--gray-700)' }}><span style={{ color: plan.color, fontWeight: 800 }}>✓</span>{f}</li>)}
                    {plan.noFeatures?.map(f => <li key={f} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--gray-300)' }}><span>✗</span>{f}</li>)}
                  </ul>
                  <Link to="/devis" className="btn" style={{ width: '100%', justifyContent: 'center', background: plan.popular ? plan.color : 'transparent', color: plan.popular ? '#0a0e1a' : plan.color, border: `2px solid ${plan.color}`, fontWeight: 700 }}>
                    Choisir {plan.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, textAlign: 'center', marginBottom: 32 }}>FAQ Tarifs</h2>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 12, marginBottom: 10, boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: 700, fontSize: 15, color: 'var(--dark-700)' }}>
                  {faq.q}
                  <span style={{ color: 'var(--primary)', fontSize: 20, transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>↓</span>
                </button>
                {openFaq === i && <div style={{ padding: '0 20px 18px', color: 'var(--gray-600)', fontSize: 14, lineHeight: 1.7 }}>{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

/* ===================== CONTACT ===================== */
export const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => setSent(true), 500);
  };

  return (
    <PublicLayout>
      <section style={{ background: 'linear-gradient(135deg, var(--dark-900), var(--dark-700))', padding: '72px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: 'clamp(32px,5vw,56px)', marginBottom: 16 }}>Contactez-nous</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17 }}>Notre équipe répond sous 24 heures ouvrables.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 48, alignItems: 'start' }}>
            {/* Info */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 20 }}>Nos coordonnées</h2>
              {[
                { icon: '📍', title: 'Adresse', text: 'Kinshasa, République Démocratique du Congo' },
                { icon: '📞', title: 'Téléphone', text: '+243 XXX XXX XXX' },
                { icon: '✉️', title: 'Email', text: 'info@omdeve.com' },
                { icon: '🕐', title: 'Horaires', text: 'Lun–Ven : 8h00–18h00\nSam : 9h00–13h00' },
              ].map(c => (
                <div key={c.title} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, background: 'var(--primary-light)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{c.title}</div>
                    <div style={{ color: 'var(--gray-500)', fontSize: 14, whiteSpace: 'pre-line' }}>{c.text}</div>
                  </div>
                </div>
              ))}
              <div style={{ background: 'var(--gray-200)', borderRadius: 12, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 24, fontSize: 14, color: 'var(--gray-400)' }}>
                📍 Carte Google Maps (intégrer iframe)
              </div>
            </div>

            {/* Form */}
            <div style={{ background: '#fff', borderRadius: 20, padding: 36, boxShadow: 'var(--shadow-lg)' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 8 }}>Message envoyé !</h3>
                  <p style={{ color: 'var(--gray-500)' }}>Nous vous répondrons dans les 24 heures ouvrables.</p>
                  <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => setSent(false)}>Envoyer un autre message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 4 }}>Envoyez-nous un message</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    {[['name','Votre nom *','text'],['email','Votre email *','email'],['phone','Téléphone','tel']].map(([k, lbl, type], i) => (
                      <div key={k} className="form-group" style={i === 2 ? { gridColumn: '1 / -1' } : {}}>
                        <label className="form-label">{lbl}</label>
                        <input type={type} className="form-input" value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} required={lbl.includes('*')} />
                      </div>
                    ))}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Objet</label>
                    <select className="form-input" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}>
                      <option value="">-- Sélectionnez --</option>
                      {['Demande d\'information','Devis','Partenariat','Support technique','Autre'].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea className="form-input" rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required style={{ resize: 'vertical' }} />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg" style={{ justifyContent: 'center' }}>Envoyer le message →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

/* ===================== A PROPOS ===================== */
export const AProposPage = () => {
  const team = [
    { name: 'Directeur Général', role: 'CEO & Fondateur', emoji: '👨‍💼' },
    { name: 'Responsable Technique', role: 'CTO', emoji: '👨‍💻' },
    { name: 'Chef Projets', role: 'Project Manager', emoji: '👩‍💼' },
    { name: 'Ingénieur Réseau', role: 'Network Engineer', emoji: '🧑‍🔧' },
    { name: 'Développeur Full Stack', role: 'Lead Developer', emoji: '👨‍💻' },
    { name: 'Expert Énergie', role: 'Solar Energy Specialist', emoji: '⚡' },
  ];
  const values = [
    { icon: '🎯', title: 'Excellence', desc: 'Nous visons la perfection dans chaque projet, sans compromis sur la qualité.' },
    { icon: '🤝', title: 'Confiance', desc: 'Transparence totale sur les prix, délais et processus de travail.' },
    { icon: '💡', title: 'Innovation', desc: 'Technologies de pointe pour des solutions durables et évolutives.' },
    { icon: '🌍', title: 'Impact local', desc: 'Contribuer au développement numérique de la RDC et d\'Afrique.' },
  ];

  return (
    <PublicLayout>
      <section className="hero-gradient" style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ maxWidth: 680 }}>
            <div style={{ display: 'inline-block', background: 'rgba(0,194,255,0.12)', color: 'var(--primary)', padding: '6px 16px', borderRadius: 999, fontSize: 13, fontWeight: 700, marginBottom: 20 }}>À PROPOS</div>
            <h1 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: 'clamp(32px,5vw,60px)', marginBottom: 20 }}>Pionniers du digital en RDC depuis 2016</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, lineHeight: 1.7 }}>OMDEVE est née de la conviction que chaque entreprise congolaise mérite une infrastructure technologique de classe mondiale. Depuis 8 ans, nous accompagnons les PME et grandes entreprises dans leur transformation numérique.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Mission */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', marginBottom: 80 }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, marginBottom: 16 }}>Notre mission</h2>
              <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, fontSize: 16, marginBottom: 20 }}>Démocratiser l'accès aux technologies avancées pour les entreprises congolaises et africaines, en leur fournissant des solutions IT fiables, sécurisées et adaptées à leur contexte local.</p>
              <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, fontSize: 16 }}>Nous croyons que la technologie est le levier le plus puissant pour le développement économique. Notre rôle est de rendre ce levier accessible à tous.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[['150+','Clients'],['300+','Projets'],['8','Années'],['99%','Satisfaction']].map(([v, l]) => (
                <div key={l} style={{ background: 'linear-gradient(135deg, var(--dark-700), var(--dark-800))', borderRadius: 16, padding: '28px 24px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: 'var(--primary)', marginBottom: 4 }}>{v}</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div style={{ marginBottom: 80 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, textAlign: 'center', marginBottom: 40 }}>Nos valeurs</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
              {values.map(v => (
                <div key={v.title} style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow)', textAlign: 'center', borderTop: '4px solid var(--primary)' }}>
                  <div style={{ fontSize: 40, marginBottom: 14 }}>{v.icon}</div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 8 }}>{v.title}</h4>
                  <p style={{ color: 'var(--gray-500)', fontSize: 14, lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, textAlign: 'center', marginBottom: 40 }}>Notre équipe</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px,1fr))', gap: 20 }}>
              {team.map(m => (
                <div key={m.name} style={{ background: '#fff', borderRadius: 16, padding: '24px 20px', textAlign: 'center', boxShadow: 'var(--shadow)' }}>
                  <div style={{ width: 72, height: 72, background: 'linear-gradient(135deg, var(--dark-700), var(--dark-800))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 14px' }}>{m.emoji}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 4 }}>{m.name}</div>
                  <div style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 600 }}>{m.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
