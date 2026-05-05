// src/pages/RealisationsPage.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  ArrowRight, CheckCircle, Rocket, Star, Calendar, MapPin, Briefcase, Clock,
  Eye, X, Search, Quote, ThumbsUp, Award, Users,
  Network, Shield, Code, Cloud, Sun, Monitor, BookOpen,
  Filter, ChevronRight, Headphones, Grid, Camera, Download
} from 'lucide-react';
import { projectsAPI } from '../../services/api'; // ✅ Import correct de l'API

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

// Catégories (identiques à celles utilisées par l'API)
const categoriesStatic = [
  { id: 'all', name: 'Tous', icon: CheckCircle, color: '#64748b' },
  { id: 'reseau', name: 'Réseau & Télécom', icon: Network, color: '#3b82f6' },
  { id: 'securite', name: 'Sécurité & Surveillance', icon: Shield, color: '#06b6d4' },
  { id: 'developpement', name: 'Développement Digital', icon: Code, color: '#f59e0b' },
  { id: 'cloud', name: 'Cloud & Hébergement', icon: Cloud, color: '#8b5cf6' },
  { id: 'energie', name: 'Énergie', icon: Sun, color: '#f97316' },
  { id: 'formation', name: 'Formation & Accompagnement', icon: BookOpen, color: '#10b981' }
];

const RealisationsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Chargement des projets via l'API (avec ou sans catégorie)
  const fetchProjects = async (category) => {
    try {
      setLoading(true);
      // Si la catégorie est 'all', on passe undefined pour récupérer tout
      const catParam = category !== 'all' ? category : undefined;
      const response = await projectsAPI.getPortfolio({ category: catParam });
      // La réponse est de la forme : { data: [...] }
      const data = response.data?.data || response.data || [];
      setProjects(data);
      setError(null);
    } catch (err) {
      console.error('Erreur chargement réalisations:', err);
      setError('Impossible de charger les réalisations. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  // Recharger quand la catégorie change
  useEffect(() => {
    fetchProjects(activeFilter);
    // Réinitialiser la recherche quand la catégorie change (optionnel)
    setSearchTerm('');
  }, [activeFilter]);

  // Filtrage côté client pour la recherche (la catégorie est déjà gérée par l'API)
  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchTerm === '' || 
      project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const stats = [
    { value: projects.length + '+', label: 'Projets réalisés', icon: Briefcase, color: '#3b82f6' },
    { value: '95+', label: 'Clients satisfaits', icon: Users, color: '#f59e0b' },
    { value: '8+', label: "Années d'expérience", icon: Award, color: '#10b981' },
    { value: '98%', label: 'Taux de satisfaction', icon: ThumbsUp, color: '#ec4899' }
  ];

  // Galerie : on prend les images des 5 premiers projets (si elles existent)
  const galleryImages = projects.slice(0, 5).map(p => p.image).filter(Boolean);
  const mainImage = galleryImages[0] || '';
  const thumbnails = galleryImages.slice(1, 5);

  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div className="text-center">
          <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
          <p style={{ color: '#475569' }}>Chargement des réalisations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '2rem' }}>
        <div className="text-center" style={{ maxWidth: '400px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h3 style={{ fontSize: '1.25rem', color: '#dc2626', marginBottom: '0.5rem' }}>Erreur</h3>
          <p style={{ color: '#475569' }}>{error}</p>
          <button onClick={() => fetchProjects(activeFilter)} className="btn-primary" style={{ marginTop: '1rem' }}>Réessayer</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        /* TOUS LES STYLES SONT IDENTIQUES À VOTRE VERSION PRÉCÉDENTE */
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
        .realisations-hero {
          position: relative; height: 400px; display: flex; align-items: center;
          justify-content: center; text-align: center; overflow: hidden;
        }
        .hero-bg {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background-image: url('https://www.shutterstock.com/image-illustration/smart-city-technology-3d-futuristic-260nw-2605212243.jpg');
          background-size: cover; background-position: center;
        }
        .hero-overlay {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(135deg, rgba(10,14,26,0.85), rgba(0,0,0,0.7));
        }
        .hero-content { position: relative; z-index: 2; max-width: 800px; margin: 0 auto; padding: 0 1rem; }
        .hero-title {
          font-family: 'Syne', sans-serif; font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800; color: white; margin-bottom: 1rem;
        }
        .hero-subtitle { color: rgba(255,255,255,0.8); font-size: 1.125rem; margin-bottom: 2rem; }
        .hero-buttons { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
        .btn-primary {
          background: linear-gradient(135deg, #f59e0b, #d97706); color: white;
          padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-weight: 600;
          display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.2s;
          text-decoration: none;
        }
        .btn-primary:hover { transform: scale(1.02); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
        .btn-outline {
          border: 2px solid rgba(255,255,255,0.3); background: transparent; color: white;
          padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-weight: 600;
          display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.2s;
          text-decoration: none;
        }
        .btn-outline:hover { background: rgba(255,255,255,0.1); transform: scale(1.02); }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin: 2rem 0; }
        .stat-card {
          background: white; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1.5rem;
          text-align: center; transition: all 0.3s;
        }
        .stat-card:hover { transform: translateY(-4px); box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1); }
        .stat-number { font-size: 2rem; font-weight: 700; font-family: 'Syne', sans-serif; margin-bottom: 0.25rem; }
        .stat-label { color: #475569; font-size: 0.875rem; }
        .filters-bar {
          background: white; border-bottom: 1px solid #e2e8f0; position: sticky;
          top: 0; z-index: 40; padding: 1rem 0;
        }
        .filter-buttons { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
        .filter-btn {
          padding: 0.5rem 1rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 500;
          display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.2s;
          cursor: pointer; border: 1px solid #e2e8f0; background: white; color: #1e293b;
        }
        .filter-btn.active { background: #3b82f6; color: white; border-color: #3b82f6; }
        .filter-btn:not(.active):hover { background: #f8fafc; transform: scale(1.02); }
        .search-wrapper { position: relative; }
        .search-input {
          padding-left: 2rem; padding-right: 2rem; border-radius: 9999px;
          border: 1px solid #e2e8f0; background: white; font-size: 0.875rem; height: 2.5rem;
        }
        .search-input:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59,130,246,0.1); }
        .projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0; }
        .project-card {
          background: white; border: 1px solid #e2e8f0; border-radius: 1rem;
          overflow: hidden; transition: all 0.3s; cursor: pointer;
        }
        .project-card:hover { transform: translateY(-6px); box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1); }
        .project-image { height: 200px; overflow: hidden; position: relative; background: #f1f5f9; display: flex; align-items: center; justify-content: center; }
        .project-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
        .project-card:hover .project-image img { transform: scale(1.05); }
        .project-category {
          position: absolute; top: 0.75rem; left: 0.75rem;
          padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.7rem;
          font-weight: bold; color: white;
        }
        .project-year {
          position: absolute; top: 0.75rem; right: 0.75rem;
          background: rgba(0,0,0,0.6); color: white; font-size: 0.7rem;
          padding: 0.25rem 0.5rem; border-radius: 9999px;
          display: flex; align-items: center; gap: 0.25rem;
        }
        .project-info { padding: 1rem; }
        .project-title { font-weight: 700; font-size: 1.125rem; color: #0f172a; margin-bottom: 0.5rem; }
        .project-description { color: #475569; font-size: 0.875rem; margin-bottom: 0.75rem; }
        .project-tech { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem; }
        .project-tech span {
          background: #f1f5f9; color: #1e293b; font-size: 0.7rem;
          padding: 0.25rem 0.5rem; border-radius: 9999px;
        }
        .project-footer {
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 0.75rem; border-top: 1px solid #e2e8f0; font-size: 0.75rem; color: #64748b;
        }
        .gallery-section { background: #f8fafc; padding: 3rem 0; margin-top: 2rem; }
        .gallery-grid { display: flex; gap: 1.5rem; align-items: stretch; }
        .gallery-main { flex: 1; border-radius: 1rem; overflow: hidden; cursor: pointer; background: #f1f5f9; display: flex; align-items: center; justify-content: center; }
        .gallery-thumbs { flex: 1; display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .gallery-thumb { border-radius: 0.75rem; overflow: hidden; cursor: pointer; aspect-ratio: 1; background: #f1f5f9; display: flex; align-items: center; justify-content: center; }
        .gallery-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
        .gallery-img:hover { transform: scale(1.05); }
        .double-cta { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; max-width: 1024px; margin: 3rem auto; }
        .cta-card {
          background: white; border: 1px solid #e2e8f0; border-radius: 1rem;
          padding: 2rem; text-align: center; transition: all 0.3s;
        }
        .cta-card:hover { transform: translateY(-5px); box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1); }
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px); z-index: 50; display: flex;
          align-items: center; justify-content: center; padding: 1rem;
        }
        .modal-content {
          background: white; border-radius: 1.5rem; max-width: 1024px;
          width: 100%; max-height: 90vh; overflow-y: auto;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr); }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .double-cta { grid-template-columns: 1fr; }
          .gallery-grid { flex-direction: column; }
        }
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: 1fr; }
          .container { padding-left: 1rem; padding-right: 1rem; }
          .filter-buttons { flex-direction: column; align-items: center; }
        }
      `}</style>

      {/* Hero identique */}
      <div className="realisations-hero">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="hero-title">
            Nos Réalisations
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="hero-subtitle">
            Découvrez des projets concrets qui ont transformé nos clients en leaders de leur secteur
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="hero-buttons">
            <Link to="/contact" className="btn-primary">Nous écrire <ArrowRight size={18} /></Link>
            <Link to="/audit" className="btn-outline">Audit gratuit <CheckCircle size={18} /></Link>
          </motion.div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="stat-card">
                <div style={{ width: '3rem', height: '3rem', backgroundColor: `${stat.color}15`, borderRadius: '0.75rem', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={24} style={{ color: stat.color }} />
                </div>
                <div className="stat-number" style={{ color: stat.color }}>{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="filters-bar">
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="filter-buttons">
              {categoriesStatic.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`filter-btn ${isActive ? 'active' : ''}`}
                    style={isActive ? { background: cat.color, borderColor: cat.color } : {}}
                  >
                    <Icon size={14} />
                    {cat.name}
                  </button>
                );
              })}
            </div>
            <div className="search-wrapper">
              <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}>
                  <X size={14} style={{ color: '#94a3b8' }} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Grille des projets (dynamique depuis l'API) */}
      <div className="container">
        {filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ width: '4rem', height: '4rem', background: '#f1f5f9', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Search size={24} style={{ color: '#94a3b8' }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a' }}>Aucun projet trouvé</h3>
            <p style={{ color: '#64748b' }}>Aucun projet ne correspond à vos critères.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project) => {
              const cat = categoriesStatic.find(c => c.id === project.category) || categoriesStatic[0];
              // Adapter les champs API vers le format attendu
              const projectImage = project.image || null;
              const projectTitle = project.title || 'Projet sans titre';
              const projectDesc = project.description || '';
              const projectClient = project.client || 'Client';
              const projectLocation = project.location || 'Kinshasa, RDC';
              const projectYear = project.year || new Date().getFullYear();
              const projectTechnologies = project.technologies || [];
              const projectRating = project.testimonial?.rating || 5;
              const projectCategoryName = project.categoryName || cat.name;
              return (
                <motion.div
                  key={project._id || project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0 }}
                  className="project-card"
                  onClick={() => openModal(project)}
                >
                  <div className="project-image">
                    {projectImage ? (
                      <img src={projectImage} alt={projectTitle} />
                    ) : (
                      <div style={{ fontSize: '3rem' }}>{cat.icon ? <cat.icon size={48} color={cat.color} /> : '📷'}</div>
                    )}
                    <div className="project-category" style={{ background: cat.color }}>{projectCategoryName}</div>
                    <div className="project-year"><Calendar size={10} /> {projectYear}</div>
                  </div>
                  <div className="project-info">
                    <h3 className="project-title">{projectTitle}</h3>
                    <p className="project-description">{projectDesc}</p>
                    <div className="project-tech">
                      {projectTechnologies.slice(0, 3).map((tech, i) => <span key={i}>{tech}</span>)}
                      {projectTechnologies.length > 3 && <span>+{projectTechnologies.length - 3}</span>}
                    </div>
                    <div className="project-footer">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={12} /> <span>{projectLocation}</span></div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f59e0b' }}><Star size={12} fill="currentColor" /> <span>{projectRating}.0</span></div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Galerie d'images (utilise les images réelles des projets) */}
      {galleryImages.length > 0 && (
        <div className="gallery-section">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#eef2ff', color: '#3b82f6', padding: '0.25rem 1rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                <Camera size={14} /> Notre galerie
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', fontFamily: 'Syne, sans-serif', marginBottom: '0.5rem' }}>Dernières réalisations en images</h2>
              <p style={{ color: '#475569', maxWidth: 600, margin: '0 auto' }}>Découvrez en un coup d’œil la qualité de nos interventions.</p>
            </div>
            <div className="gallery-grid">
              <div className="gallery-main" onClick={() => window.open(mainImage, '_blank')}>
                {mainImage ? (
                  <img src={mainImage} alt="Galerie principale" className="gallery-img" style={{ height: '100%', minHeight: '300px' }} />
                ) : (
                  <div style={{ padding: '3rem' }}>📷</div>
                )}
              </div>
              <div className="gallery-thumbs">
                {thumbnails.map((img, idx) => (
                  <div key={idx} className="gallery-thumb" onClick={() => window.open(img, '_blank')}>
                    <img src={img} alt={`Galerie ${idx+2}`} className="gallery-img" />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
              <button className="btn-outline" style={{ borderColor: '#cbd5e1', color: '#1e293b' }}><Grid size={16} /> Voir toute la galerie</button>
              <Link to="/contact" className="btn-primary">Demander un devis <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      )}

      {/* Double CTA finale – inchangée */}
      <div className="container" style={{ margin: '3rem auto' }}>
        <div className="double-cta">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="cta-card">
            <div style={{ width: '4rem', height: '4rem', background: '#3b82f6', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Rocket size={24} color="white" />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '0.75rem' }}>Construisons ensemble votre succès</h3>
            <p style={{ color: '#475569', marginBottom: '1.5rem' }}>Profitez d’un accompagnement sur-mesure et de solutions innovantes adaptées à votre secteur.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/contact" className="btn-primary">Devenir partenaire <ArrowRight size={16} /></Link>
              <Link to="/audit" className="btn-outline" style={{ borderColor: '#cbd5e1', color: '#1e293b' }}>Audit gratuit <CheckCircle size={16} /></Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="cta-card">
            <div style={{ width: '4rem', height: '4rem', background: '#f59e0b', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Headphones size={24} color="white" />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '0.75rem' }}>Prêt à donner vie à votre projet ?</h3>
            <p style={{ color: '#475569', marginBottom: '1.5rem' }}>Contactez-nous pour discuter de votre besoin et obtenir un devis personnalisé.</p>
            <Link to="/contact" className="btn-primary">Contactez-nous <ArrowRight size={16} /></Link>
          </motion.div>
        </div>
      </div>

      {/* Modal détail projet (adapté aux champs API) */}
      {showModal && selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ position: 'relative', height: '240px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {selectedProject.image ? (
                <img src={selectedProject.image} alt={selectedProject.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem' }} />
              ) : (
                <div style={{ fontSize: '4rem' }}>📷</div>
              )}
              <button onClick={closeModal} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '9999px', padding: '0.5rem', cursor: 'pointer' }}>
                <X size={20} color="white" />
              </button>
              <div style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}>
                <span style={{ background: categoriesStatic.find(c => c.id === selectedProject.category)?.color || '#3b82f6', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', color: 'white' }}>{selectedProject.categoryName}</span>
                <h2 style={{ color: 'white', marginTop: '0.5rem', fontSize: '1.5rem' }}>{selectedProject.title}</h2>
                <p style={{ color: '#e2e8f0' }}>{selectedProject.client || 'Client'}</p>
              </div>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                <div>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Description du projet</h3>
                  <div style={{ whiteSpace: 'pre-line', color: '#334155', marginBottom: '1rem' }}>{selectedProject.fullDescription || selectedProject.description || 'Aucune description disponible.'}</div>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Technologies</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                    {selectedProject.technologies?.map((tech, idx) => <span key={idx} style={{ background: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem' }}>{tech}</span>)}
                  </div>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Résultats clés</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                    {selectedProject.stats?.map((stat, idx) => (
                      <div key={idx} style={{ textAlign: 'center', padding: '0.75rem', background: '#f8fafc', borderRadius: '0.75rem' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#3b82f6' }}>{stat.value}</div>
                        <div style={{ fontSize: '0.7rem', color: '#475569' }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ background: '#f8fafc', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1rem' }}>
                    <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Informations client</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      <Briefcase size={14} /> {selectedProject.client || 'Client'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      <MapPin size={14} /> {selectedProject.location || 'Kinshasa, RDC'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      <Calendar size={14} /> {selectedProject.year || new Date().getFullYear()}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                      <Clock size={14} /> Durée: {selectedProject.duration || 'Sur devis'}
                    </div>
                  </div>
                  <div style={{ background: '#eef2ff', borderRadius: '0.75rem', padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <Quote size={16} style={{ color: '#3b82f6' }} />
                      <h4 style={{ fontWeight: 'bold' }}>Témoignage</h4>
                    </div>
                    <p style={{ fontSize: '0.875rem', fontStyle: 'italic', marginBottom: '0.75rem' }}>"{selectedProject.testimonial?.text || selectedProject.testimonial?.content || 'Aucun témoignage disponible.'}"</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={selectedProject.testimonial?.avatar} alt="" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px' }} />
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>{selectedProject.testimonial?.author || 'Client satisfait'}</div>
                        <div style={{ fontSize: '0.7rem', color: '#475569' }}>{selectedProject.testimonial?.position || ''}</div>
                        <div style={{ display: 'flex', gap: '0.1rem', marginTop: '0.25rem' }}>
                          {[...Array(selectedProject.testimonial?.rating || 5)].map((_, i) => <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                <Link to="/contact" className="btn-primary">Demander un projet similaire <ArrowRight size={16} /></Link>
                <button className="btn-outline" style={{ borderColor: '#cbd5e1', color: '#1e293b' }}><Download size={16} /> Télécharger l'étude de cas</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RealisationsPage;