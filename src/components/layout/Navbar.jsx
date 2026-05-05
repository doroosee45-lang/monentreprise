import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, LogOut } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { isAuthenticated, logout, isAdmin } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/a-propos', label: 'À Propos' },
    { to: '/services', label: 'Services' },
    { to: '/solutions', label: 'Solutions' },
    { to: '/realisations', label: 'Réalisations' },
    { to: '/tarifs', label: 'Tarifs' },
    { to: '/blog', label: 'Blog' },
    { to: '/', label: 'Plus', hasDropdown: true },
    { to: '/Contactpage', label: 'Contact' },
  ];

  const servicesDropdown = [
    { name: 'Réseau & Infrastructure', path: '/services/reseau-infrastructure' },
    { name: 'Sécurité', path: '/services/securite' },
    { name: 'Développement Digital', path: 'DeveloppementDigital' },
    { name: 'Cloud & Hébergement', path: '/services/cloud-hebergement' },
    { name: 'Énergie & Équipements', path: '/services/energie-equipements' },
    { name: 'Vente de Matériel', path: '/services/vente-materiel' },
    { name: 'Formation', path: '/services/formation' },
  ];

  const linkStyle = (path) => ({
    padding: '8px 14px',
    borderRadius: 8,
    color: location.pathname === path ? '#00c2ff' : 'rgba(255,255,255,0.8)',
    fontWeight: location.pathname === path ? 700 : 500,
    fontSize: 14,
    transition: 'all 0.2s',
    background: location.pathname === path ? 'rgba(0,194,255,0.1)' : 'transparent',
    textDecoration: 'none',
  });

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          background: scrolled ? 'rgba(10,14,26,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,194,255,0.15)' : 'none',
          transition: 'all 0.3s ease',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 72,
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 40,
                height: 40,
                background: 'linear-gradient(135deg, #00c2ff, #0099cc)',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                color: '#0a0e1a',
                fontSize: 16,
              }}
            >
              OM
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                color: '#fff',
                fontSize: 20,
                letterSpacing: '-0.5px',
              }}
            >
              OMDEVE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.to}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    style={{
                      ...linkStyle(link.to),
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      style={{
                        transition: 'transform 0.2s',
                        transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          marginTop: 8,
                          width: 260,
                          background: '#0f172a',
                          borderRadius: 12,
                          boxShadow: '0 20px 35px -10px rgba(0,0,0,0.5)',
                          border: '1px solid rgba(0,194,255,0.2)',
                          overflow: 'hidden',
                          zIndex: 1000,
                        }}
                      >
                        {servicesDropdown.map((service) => (
                          <Link
                            key={service.path}
                            to={service.path}
                            style={{
                              display: 'block',
                              padding: '10px 16px',
                              color: 'rgba(255,255,255,0.8)',
                              fontSize: 13,
                              fontWeight: 500,
                              textDecoration: 'none',
                              transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(0,194,255,0.1)';
                              e.currentTarget.style.color = '#00c2ff';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                            }}
                          >
                            {service.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.to} to={link.to} style={linkStyle(link.to)}>
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA / Auth buttons (masqués sur mobile) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="auth-buttons">
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Link
                  to={isAdmin() ? '/admin/dashboard' : '/client/dashboard'}
                  style={{
                    padding: '6px 16px',
                    background: 'linear-gradient(135deg, #00c2ff, #0099cc)',
                    borderRadius: 30,
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 13,
                    textDecoration: 'none',
                    transition: '0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Mon espace
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 30,
                    padding: '6px 14px',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: '0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                  }}
                >
                  <LogOut size={14} /> Déconnexion
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                style={{
                  background: 'rgba(0,194,255,0.1)',
                  border: '1px solid rgba(0,194,255,0.4)',
                  borderRadius: 30,
                  padding: '6px 16px',
                  color: '#00c2ff',
                  fontWeight: 600,
                  fontSize: 13,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#00c2ff';
                  e.currentTarget.style.color = '#0a0e1a';
                  e.currentTarget.style.borderColor = '#00c2ff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(0,194,255,0.1)';
                  e.currentTarget.style.color = '#00c2ff';
                  e.currentTarget.style.borderColor = 'rgba(0,194,255,0.4)';
                }}
              >
                Connexion
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: 24,
                display: 'none',
                cursor: 'pointer',
              }}
              className="mobile-menu-btn"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              top: 72,
              left: 0,
              right: 0,
              background: '#0a0e1a',
              borderTop: '1px solid rgba(0,194,255,0.15)',
              zIndex: 998,
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '16px 24px' }}>
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.to}>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        padding: '12px 0',
                        background: 'transparent',
                        border: 'none',
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: 15,
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      {link.label}
                      <ChevronDown
                        size={18}
                        style={{
                          transition: 'transform 0.2s',
                          transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          style={{ paddingLeft: 16 }}
                        >
                          {servicesDropdown.map((service) => (
                            <Link
                              key={service.path}
                              to={service.path}
                              onClick={() => setMobileMenuOpen(false)}
                              style={{
                                display: 'block',
                                padding: '10px 0',
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: 14,
                                textDecoration: 'none',
                              }}
                            >
                              {service.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '12px 0',
                      color: location.pathname === link.to ? '#00c2ff' : 'rgba(255,255,255,0.9)',
                      fontWeight: location.pathname === link.to ? 600 : 500,
                      fontSize: 15,
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </Link>
                )
              )}

              {/* Mobile auth section */}
              <div style={{ marginTop: 20, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16 }}>
                {isAuthenticated ? (
                  <div style={{ display: 'flex', gap: 12 }}>
                    <Link
                      to={isAdmin() ? '/admin/dashboard' : '/client/dashboard'}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        padding: '10px',
                        background: 'linear-gradient(135deg, #00c2ff, #0099cc)',
                        borderRadius: 30,
                        color: '#fff',
                        fontWeight: 600,
                        textDecoration: 'none',
                      }}
                    >
                      Mon espace
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      style={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 30,
                        color: 'rgba(255,255,255,0.8)',
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      Déconnexion
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      padding: '10px',
                      background: 'linear-gradient(135deg, #00c2ff, #0099cc)',
                      borderRadius: 30,
                      color: '#fff',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    Connexion
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; align-items: center; justify-content: center; }
          /* Masquer les boutons d'authentification dans la barre sur mobile */
          .auth-buttons .btn-auth, 
          .auth-buttons > div, 
          .auth-buttons > a {
            display: none !important;
          }
          /* On garde seulement le bouton burger */
          .auth-buttons {
            gap: 0 !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;