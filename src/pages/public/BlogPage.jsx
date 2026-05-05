// src/pages/BlogPage.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogAPI } from '../../services/api';
import { Calendar, Clock, User, ArrowRight, ChevronRight, ImageOff } from 'lucide-react';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Catégories avec couleurs
  const categories = [
    { id: '', name: 'Tous', color: '#64748b' },
    { id: 'it', name: 'IT', color: '#3b82f6' },
    { id: 'reseau', name: 'Réseau', color: '#06b6d4' },
    { id: 'energie', name: 'Énergie', color: '#f97316' },
    { id: 'digital', name: 'Digital', color: '#a855f7' },
    { id: 'securite', name: 'Sécurité', color: '#ef4444' },
    { id: 'cloud', name: 'Cloud', color: '#8b5cf6' },
    { id: 'formation', name: 'Formation', color: '#10b981' }
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const params = { category: category || undefined, page, limit: 9 };
        const res = await blogAPI.getAll(params);
        setBlogs(res.data.data || []);
        setTotalPages(res.data.pages || 1);
      } catch (err) {
        console.error('Erreur chargement blog:', err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [category, page]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Fonction pour obtenir l'URL de l'image (supporte plusieurs noms de champs)
  const getImageUrl = (article) => {
    return article?.coverImage || article?.image || article?.photo || article?.thumbnail || null;
  };

  return (
    <>
      <style>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .blog-hero {
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
        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          color: white;
          margin-bottom: 1rem;
        }
        .hero-subtitle {
          color: rgba(255,255,255,0.8);
          font-size: 1.125rem;
          margin-bottom: 2rem;
        }
        /* Filtres */
        .filters-bar {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          z-index: 40;
          padding: 1rem 0;
        }
        .filter-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
        }
        .filter-btn {
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
          cursor: pointer;
          border: 1px solid #e2e8f0;
          background: white;
          color: #1e293b;
        }
        .filter-btn.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }
        .filter-btn:not(.active):hover {
          background: #f8fafc;
          transform: scale(1.02);
        }
        /* Grille d'articles */
        .articles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .article-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.3s;
          text-decoration: none;
          display: flex;
          flex-direction: column;
        }
        .article-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1);
        }
        .article-image {
          height: 180px;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }
        .article-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        .article-card:hover .article-image img {
          transform: scale(1.05);
        }
        .image-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          font-size: 0.875rem;
        }
        .article-content {
          padding: 1.25rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .article-meta {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }
        .article-category {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          color: white;
        }
        .article-read-time {
          font-size: 0.7rem;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .article-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }
        .article-excerpt {
          color: #475569;
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: 1rem;
          flex: 1;
        }
        .article-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.75rem;
          border-top: 1px solid #e2e8f0;
          font-size: 0.75rem;
          color: #64748b;
        }
        .article-author {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        /* Pagination */
        .pagination {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2rem;
        }
        .page-btn {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
          background: white;
          color: #1e293b;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .page-btn.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }
        .page-btn:hover:not(.active) {
          background: #f8fafc;
        }
        @media (max-width: 1024px) {
          .articles-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .articles-grid {
            grid-template-columns: 1fr;
          }
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .filter-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e2e8f0;
          border-top-color: #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 2rem auto;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Hero avec image 400px */}
      <div className="blog-hero">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="hero-title"
          >
            Blog OMDEVE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-subtitle"
          >
            Actualités IT, guides pratiques et conseils d'experts.
          </motion.p>
        </div>
      </div>

      {/* Filtres par catégorie */}
      <div className="filters-bar">
        <div className="container">
          <div className="filter-buttons">
            {categories.map((cat) => {
              const isActive = category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategory(cat.id);
                    setPage(1);
                  }}
                  className={`filter-btn ${isActive ? 'active' : ''}`}
                  style={isActive ? { background: cat.color, borderColor: cat.color } : {}}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grille des articles */}
      <div className="container">
        {loading ? (
          <div className="spinner" />
        ) : blogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📰</div>
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a' }}>Aucun article trouvé</h3>
            <p style={{ color: '#64748b' }}>Aucun article dans cette catégorie pour l'instant.</p>
          </div>
        ) : (
          <>
            <div className="articles-grid">
              {blogs.map((article) => {
                const catInfo = categories.find(c => c.id === article.category) || categories[0];
                const imageUrl = getImageUrl(article);
                return (
                  <Link key={article._id} to={`/blog/${article.slug}`} className="article-card">
                    <div className="article-image">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={article.title}
                          onError={(e) => {
                            // Si l'image ne charge pas, on cache l'img et on affiche le placeholder
                            e.target.style.display = 'none';
                            e.target.parentElement.querySelector('.image-placeholder').style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="image-placeholder" style={{ display: imageUrl ? 'none' : 'flex' }}>
                        <ImageOff size={32} />
                        <span>Image non disponible</span>
                      </div>
                    </div>
                    <div className="article-content">
                      <div className="article-meta">
                        <span className="article-category" style={{ background: catInfo.color }}>
                          {catInfo.name}
                        </span>
                        {article.readTime && (
                          <span className="article-read-time">
                            <Clock size={12} /> {article.readTime} min
                          </span>
                        )}
                      </div>
                      <h3 className="article-title">{article.title}</h3>
                      <p className="article-excerpt">{article.excerpt || article.content?.substring(0, 120)}…</p>
                      <div className="article-footer">
                        <span className="article-author">
                          <User size={12} /> {article.author?.firstName} {article.author?.lastName}
                        </span>
                        <span>
                          <Calendar size={12} /> {formatDate(article.publishedAt)}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`page-btn ${page === i + 1 ? 'active' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default BlogPage;