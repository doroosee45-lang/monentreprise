// src/pages/BlogDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogAPI } from '../../services/api';
import { Calendar, Clock, User, Eye, ArrowLeft, ChevronRight } from 'lucide-react';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await blogAPI.getBySlug(slug);
        setBlog(res.data.data);
      } catch (err) {
        console.error(err);
        setError('Article introuvable');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getCategoryColor = (catId) => {
    const colors = {
      it: '#3b82f6',
      reseau: '#06b6d4',
      energie: '#f97316',
      digital: '#a855f7',
      securite: '#ef4444',
      cloud: '#8b5cf6',
      formation: '#10b981'
    };
    return colors[catId] || '#64748b';
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📰</div>
          <h2 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.5rem' }}>Article introuvable</h2>
          <p style={{ color: '#64748b' }}>L'article que vous cherchez n'existe pas ou a été déplacé.</p>
          <Link to="/blog" style={{ display: 'inline-block', marginTop: '1rem', color: '#3b82f6', textDecoration: 'none' }}>← Retour au blog</Link>
        </div>
      </div>
    );
  }

  const categoryColor = getCategoryColor(blog.category);

  return (
    <>
      <style>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        /* Hero identique aux autres pages */
        .blog-detail-hero {
          position: relative;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('https://www.shutterstock.com/image-illustration/smart-city-technology-3d-futuristic-260nw-2605212243.jpg');
          background-size: cover;
          background-position: center;
        }
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(10,14,26,0.85), rgba(0,0,0,0.7));
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
          transition: color 0.2s;
        }
        .back-link:hover {
          color: white;
        }
        .category-badge {
          display: inline-block;
          padding: 0.25rem 1rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1rem;
        }
        .article-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.75rem, 5vw, 2.5rem);
          font-weight: 800;
          color: white;
          line-height: 1.2;
          margin-bottom: 1rem;
        }
        .article-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: center;
          color: rgba(255,255,255,0.7);
          font-size: 0.875rem;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .article-content {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
          margin: 2rem 0;
          line-height: 1.8;
          color: #1e293b;
        }
        .article-content img {
          max-width: 100%;
          border-radius: 0.75rem;
          margin: 1rem 0;
        }
        .article-content h2 {
          font-family: 'Syne', sans-serif;
          font-size: 1.5rem;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }
        .article-content h3 {
          font-size: 1.25rem;
          margin-top: 1rem;
          margin-bottom: 0.75rem;
        }
        .article-content p {
          margin-bottom: 1rem;
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: 1.5rem 0;
        }
        .tag {
          background: #f1f5f9;
          color: #475569;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
        }
        .related-section {
          margin-top: 2rem;
        }
        .related-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        .related-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 1rem;
          text-decoration: none;
          transition: all 0.2s;
        }
        .related-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
        }
        .related-card-title {
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.25rem;
        }
        .related-card-excerpt {
          font-size: 0.75rem;
          color: #64748b;
        }
        .cta-box {
          background: #f8fafc;
          border-radius: 1rem;
          padding: 1.5rem;
          margin: 2rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .btn-devis {
          background: #f59e0b;
          color: #0f172a;
          padding: 0.625rem 1.25rem;
          border-radius: 0.75rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-devis:hover {
          background: #d97706;
          transform: scale(1.02);
        }
        @media (max-width: 768px) {
          .related-grid {
            grid-template-columns: 1fr;
          }
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .article-content {
            padding: 1.5rem;
          }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Hero avec image 400px (identique aux autres pages) */}
      <div className="blog-detail-hero">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <Link to="/blog" className="back-link">
            <ArrowLeft size={16} /> Retour au blog
          </Link>
          <div className="category-badge" style={{ background: categoryColor }}>
            {blog.category || 'Article'}
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="article-title"
          >
            {blog.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="article-meta"
          >
            <span className="meta-item"><User size={14} /> {blog.author?.firstName} {blog.author?.lastName}</span>
            <span className="meta-item"><Eye size={14} /> {blog.views} vues</span>
            {blog.readTime && <span className="meta-item"><Clock size={14} /> {blog.readTime} min de lecture</span>}
            {blog.publishedAt && <span className="meta-item"><Calendar size={14} /> {formatDate(blog.publishedAt)}</span>}
          </motion.div>
        </div>
      </div>

      {/* Contenu de l'article */}
      <div className="container">
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: blog.content?.replace(/\n/g, '<br/>') || '' }}
        />

        {blog.tags && blog.tags.length > 0 && (
          <div className="tags">
            {blog.tags.map((tag) => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        )}

        {blog.related && blog.related.length > 0 && (
          <div className="related-section">
            <h3 className="related-title">Articles similaires</h3>
            <div className="related-grid">
              {blog.related.map((item) => (
                <Link key={item._id} to={`/blog/${item.slug}`} className="related-card">
                  <div className="related-card-title">{item.title}</div>
                  <div className="related-card-excerpt">{item.excerpt?.slice(0, 80)}…</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="cta-box">
          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.125rem', marginBottom: '0.25rem' }}>Un projet en tête ?</h4>
            <p style={{ fontSize: '0.875rem', color: '#475569' }}>Contactez OMDEVE pour une consultation gratuite.</p>
          </div>
          <Link to="/devis" className="btn-devis">Demander un devis <ChevronRight size={14} /></Link>
        </div>
      </div>
    </>
  );
};

export default BlogDetailPage;