// import React, { useEffect } from 'react';
// import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import useAuthStore from './store/authStore';
// import './styles/globals.css';

// // Auth pages
// import { LoginPage, RegisterPage } from './pages/auth/AuthPages';

// // Public pages
// import HomePage from './pages/public/HomePage'
// import ServicesPage from './pages/public/ServicesPage';
// import SolutionsPage from './pages/public/SolutionsPage';
// import DevisPage from './pages/public/DevisPage';
// import AuditPage from './pages/public/AuditPage';
// import BlogPage from './pages/public/BlogPage';
// import BlogDetailPage from './pages/public/BlogDetailPage';
// import Contactpage from './pages/public/ContactPage';
// import RealisationsPage from './pages/public/RealisationsPage';
// import About from './pages/public/About';
// import TarifsPage from './pages/public/TarifsPage';
// import Experts from './pages/public/Experts'; 



// // Services
// import ReseauInfrastructure from './pages/public/services/ReseauInfrastructure'
// import Securite from './pages/public/services/Securite'
// import DeveloppementDigital from './pages/public/services/DeveloppementDigital'
// import CloudHebergement from './pages/public/services/CloudHebergement'
// import EnergieEquipements from './pages/public/services/EnergieEquipements'
// import VenteMateriel from './pages/public/services/VenteMateriel'
// import Formation from './pages/public/services/Formation'
// import Inscription from './pages/public/services/Inscription'
// import DevisCloud from './pages/public/services/DevisCloud'





// // Client pages
// import ClientDashboard from './pages/client/ClientDashboard';
// import { ClientDevisPage, ClientProjectsPage, ClientMessagingPage, ClientProfilePage, HistoriquePage } from './pages/client/ClientPages';

// // Admin pages
// import AdminDashboard from './pages/admin/AdminDashboard';
// import AdminDevisPage from './pages/admin/AdminDevisPage';
// import AdminCRMPage from './pages/admin/AdminCRMPage';
// import AdminProjectsPage from './pages/admin/AdminProjectsPage';
// import AdminClientsPage from './pages/admin/AdminClientsPage';
// import AdminBlogPage from './pages/admin/AdminBlogPage';
// import AdminAuditPage from './pages/admin/AdminAuditPage'; // ← NOUVEAU

// // Guards
// import { ProtectedRoute, GuestRoute } from './components/common/ProtectedRoute';

// const queryClient = new QueryClient({
//   defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
// });

// const ADMIN_ROLES = ['super_admin', 'admin', 'manager'];

// /* ------------------------------------------------------------------ */
// /*  App                                                                 */
// /* ------------------------------------------------------------------ */
// function App() {
//   const { isAuthenticated, fetchMe } = useAuthStore();

//   useEffect(() => {
//     if (isAuthenticated) fetchMe();
//   }, []); // eslint-disable-line

//   return (
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter>
//         <Toaster
//           position="top-right"
//           toastOptions={{
//             duration: 4000,
//             style: {
//               fontFamily: 'var(--font-body)',
//               borderRadius: '10px',
//               fontSize: '14px',
//               boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
//             },
//             success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
//             error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
//           }}
//         />

//         <Routes>
//           {/* ===== PUBLIC ===== */}
//           <Route path="/"             element={<HomePage />} />
//           <Route path="/services"     element={<ServicesPage />} />
//           <Route path="/solutions"    element={<SolutionsPage />} />
//           <Route path="/realisations" element={<RealisationsPage />} />
//           <Route path="/tarifs"       element={<TarifsPage />} />
//           <Route path="/a-propos"     element={<About />} />
//           <Route path="/Contactpage"      element={<Contactpage />} />
//           <Route path="/blog"         element={<BlogPage />} />
//           <Route path="/blog/:slug"   element={<BlogDetailPage />} />
//           <Route path="/devis"        element={<DevisPage />} />
//           <Route path="/audit"        element={<AuditPage />} />
//           <Route path="/experts"      element={<Experts />} />



//           {/* ========== SERVICES ========== */}
//           <Route path="/services/reseau-infrastructure" element={<ReseauInfrastructure />} />
//           <Route path="/services/securite" element={<Securite />} />
//           <Route path="/services/developpement-digital" element={<DeveloppementDigital />} />
//           <Route path="/services/cloud-hebergement" element={<CloudHebergement />} />
//           <Route path="/services/energie-equipements" element={<EnergieEquipements />} />
//           <Route path="/services/vente-materiel" element={<VenteMateriel />} />
//           <Route path="/services/formation" element={<Formation />} />
//           <Route path="/devis-cloud" element={<DevisCloud />} />
 
//           {/* ===== AUTH ===== */}
//           <Route path="/login"    element={<GuestRoute><LoginPage /></GuestRoute>} />
//           <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
//           <Route path="/forgot-password"        element={<ForgotPasswordPage />} />
//           <Route path="/reset-password/:token"  element={<ResetPasswordPage />} />

//           {/* ===== CLIENT ===== */}
//           <Route path="/client/dashboard"  element={<ProtectedRoute roles={['client','super_admin','admin','manager']}><ClientDashboard /></ProtectedRoute>} />
//           <Route path="/client/devis"      element={<ProtectedRoute roles={['client','super_admin','admin','manager']}><ClientDevisPage /></ProtectedRoute>} />
//           <Route path="/client/projets"    element={<ProtectedRoute roles={['client','super_admin','admin','manager']}><ClientProjectsPage /></ProtectedRoute>} />
//           <Route path="/client/historique" element={<ProtectedRoute roles={['client','super_admin','admin','manager']}><HistoriquePage /></ProtectedRoute>} />
//           <Route path="/client/messagerie" element={<ProtectedRoute roles={['client','super_admin','admin','manager']}><ClientMessagingPage /></ProtectedRoute>} />
//           <Route path="/client/profil"     element={<ProtectedRoute><ClientProfilePage /></ProtectedRoute>} />

//           {/* ===== ADMIN ===== */}
//           <Route path="/admin/dashboard" element={<ProtectedRoute roles={ADMIN_ROLES}><AdminDashboard /></ProtectedRoute>} />
//           <Route path="/admin/clients"   element={<ProtectedRoute roles={ADMIN_ROLES}><AdminClientsPage /></ProtectedRoute>} />
//           <Route path="/admin/crm"       element={<ProtectedRoute roles={ADMIN_ROLES}><AdminCRMPage /></ProtectedRoute>} />
//           <Route path="/admin/projets"   element={<ProtectedRoute roles={ADMIN_ROLES}><AdminProjectsPage /></ProtectedRoute>} />
//           <Route path="/admin/devis"     element={<ProtectedRoute roles={ADMIN_ROLES}><AdminDevisPage /></ProtectedRoute>} />
//           <Route path="/admin/blog"      element={<ProtectedRoute roles={ADMIN_ROLES}><AdminBlogPage /></ProtectedRoute>} />
//           <Route path="/admin/audits"    element={<ProtectedRoute roles={ADMIN_ROLES}><AdminAuditPage /></ProtectedRoute>} /> {/* ← NOUVEAU */}

//           {/* ===== MISC ===== */}
//           <Route path="/unauthorized" element={<UnauthorizedPage />} />
//           <Route path="*"             element={<NotFoundPage />} />
//         </Routes>
//       </BrowserRouter>
//     </QueryClientProvider>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  ForgotPasswordPage                                                  */
// /* ------------------------------------------------------------------ */
// const ForgotPasswordPage = () => {
//   const [email, setEmail] = React.useState('');
//   const [sent, setSent] = React.useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { authAPI } = await import('./services/api');
//       await authAPI.forgotPassword(email);
//     } catch { /* silenced for UX */ }
//     setSent(true);
//   };

//   return (
//     <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-100)', padding: 24 }}>
//       <div style={{ background: '#fff', borderRadius: 20, padding: 40, width: '100%', maxWidth: 440, boxShadow: 'var(--shadow-xl)' }}>
//         <div style={{ textAlign: 'center', marginBottom: 28 }}>
//           <div style={{ fontSize: 48, marginBottom: 12 }}>🔐</div>
//           <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>Mot de passe oublié</h2>
//           <p style={{ color: 'var(--gray-500)', marginTop: 6 }}>Entrez votre email pour recevoir un lien de réinitialisation.</p>
//         </div>
//         {sent ? (
//           <div style={{ background: '#dcfce7', borderRadius: 12, padding: 20, textAlign: 'center' }}>
//             <p style={{ color: '#16a34a', fontWeight: 600 }}>✅ Si cet email existe, un lien vous a été envoyé.</p>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//             <div className="form-group">
//               <label className="form-label">Adresse email</label>
//               <input type="email" className="form-input" value={email} onChange={e => setEmail(e.target.value)} required placeholder="vous@exemple.com" />
//             </div>
//             <button type="submit" className="btn btn-primary btn-lg" style={{ justifyContent: 'center' }}>Envoyer le lien →</button>
//           </form>
//         )}
//         <div style={{ textAlign: 'center', marginTop: 20 }}>
//           <a href="/login" style={{ color: 'var(--primary)', fontSize: 14 }}>← Retour à la connexion</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ------------------------------------------------------------------ */
// /*  ResetPasswordPage                                                  */
// /* ------------------------------------------------------------------ */
// const ResetPasswordPage = () => {
//   const { token } = useParams();
//   const navigate   = useNavigate();
//   const [form, setForm] = React.useState({ password: '', confirm: '' });
//   const [done, setDone] = React.useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (form.password !== form.confirm) return alert('Les mots de passe ne correspondent pas');
//     try {
//       const { authAPI } = await import('./services/api');
//       await authAPI.resetPassword(token, form.password);
//       setDone(true);
//       setTimeout(() => navigate('/login'), 2500);
//     } catch (err) {
//       alert(err.response?.data?.message || 'Lien invalide ou expiré');
//     }
//   };

//   return (
//     <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-100)', padding: 24 }}>
//       <div style={{ background: '#fff', borderRadius: 20, padding: 40, width: '100%', maxWidth: 440, boxShadow: 'var(--shadow-xl)' }}>
//         <div style={{ textAlign: 'center', marginBottom: 28 }}>
//           <div style={{ fontSize: 48, marginBottom: 12 }}>🔑</div>
//           <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>Nouveau mot de passe</h2>
//         </div>
//         {done ? (
//           <div style={{ background: '#dcfce7', borderRadius: 12, padding: 20, textAlign: 'center' }}>
//             <p style={{ color: '#16a34a', fontWeight: 600 }}>✅ Mot de passe modifié ! Redirection...</p>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//             {[['password', 'Nouveau mot de passe'], ['confirm', 'Confirmation']].map(([k, lbl]) => (
//               <div key={k} className="form-group">
//                 <label className="form-label">{lbl}</label>
//                 <input type="password" className="form-input" value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} required minLength={6} />
//               </div>
//             ))}
//             <button type="submit" className="btn btn-primary btn-lg" style={{ justifyContent: 'center' }}>Réinitialiser →</button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// /* ------------------------------------------------------------------ */
// /*  UnauthorizedPage                                                   */
// /* ------------------------------------------------------------------ */
// const UnauthorizedPage = () => (
//   <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, background: 'var(--gray-100)' }}>
//     <div style={{ fontSize: 64 }}>🚫</div>
//     <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--dark-700)' }}>Accès refusé</h1>
//     <p style={{ color: 'var(--gray-500)', maxWidth: 380, textAlign: 'center' }}>Vous n'avez pas les droits pour accéder à cette page.</p>
//     <a href="/" className="btn btn-primary">Retour à l'accueil</a>
//   </div>
// );

// /* ------------------------------------------------------------------ */
// /*  NotFoundPage                                                       */
// /* ------------------------------------------------------------------ */
// const NotFoundPage = () => (
//   <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, background: 'linear-gradient(135deg, var(--dark-900), var(--dark-700))' }}>
//     <div style={{ fontFamily: 'var(--font-display)', fontSize: 120, fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>404</div>
//     <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: '#fff' }}>Page introuvable</h2>
//     <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 380, textAlign: 'center' }}>La page que vous cherchez n'existe pas ou a été déplacée.</p>
//     <a href="/" className="btn btn-primary btn-lg">Retour à l'accueil →</a>
//   </div>
// );

// export default App;






















import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useAuthStore from './store/authStore';
import './styles/globals.css';

// Composants de layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Auth pages
import { LoginPage, RegisterPage } from './pages/auth/AuthPages';

// Public pages
import HomePage from './pages/public/HomePage';
import ServicesPage from './pages/public/ServicesPage';
import SolutionsPage from './pages/public/SolutionsPage';
import DevisPage from './pages/public/DevisPage';
import AuditPage from './pages/public/AuditPage';
import BlogPage from './pages/public/BlogPage';
import BlogDetailPage from './pages/public/BlogDetailPage';
import Contactpage from './pages/public/ContactPage';
import RealisationsPage from './pages/public/RealisationsPage';
import About from './pages/public/About';
import TarifsPage from './pages/public/TarifsPage';
import Experts from './pages/public/Experts';

// Services
import ReseauInfrastructure from './pages/public/services/ReseauInfrastructure';
import Securite from './pages/public/services/Securite';
import DeveloppementDigital from './pages/public/services/DeveloppementDigital';
import CloudHebergement from './pages/public/services/CloudHebergement';
import EnergieEquipements from './pages/public/services/EnergieEquipements';
import VenteMateriel from './pages/public/services/VenteMateriel';
import Formation from './pages/public/services/Formation';
import Inscription from './pages/public/services/Inscription';
import DevisCloud from './pages/public/services/DevisCloud';

// Client pages
import ClientDashboard from './pages/client/ClientDashboard';
import { ClientDevisPage, ClientProjectsPage, ClientMessagingPage, ClientProfilePage, HistoriquePage } from './pages/client/ClientPages';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDevisPage from './pages/admin/AdminDevisPage';
import AdminCRMPage from './pages/admin/AdminCRMPage';
import AdminProjectsPage from './pages/admin/AdminProjectsPage';
import AdminClientsPage from './pages/admin/AdminClientsPage';
import AdminBlogPage from './pages/admin/AdminBlogPage';
import AdminAuditPage from './pages/admin/AdminAuditPage';

// Guards
import { ProtectedRoute, GuestRoute } from './components/common/ProtectedRoute';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
});

const ADMIN_ROLES = ['super_admin', 'admin', 'manager'];

// Layout commun avec Navbar et Footer
const Layout = () => (
  <>
    <Navbar />
    {/* Ajout d'un padding-top pour éviter que le contenu soit caché sous la navbar fixe */}
    <main style={{ paddingTop: '72px' }}>
      <Outlet />
    </main>
    <Footer />
  </>
);

/* ------------------------------------------------------------------ */
/*  App                                                               */
/* ------------------------------------------------------------------ */
function App() {
  const { isAuthenticated, fetchMe } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) fetchMe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: 'var(--font-body)',
              borderRadius: '10px',
              fontSize: '14px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            },
            success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
            error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />

        <Routes>
          {/* Routes avec Navbar + Footer */}
          <Route element={<Layout />}>
            {/* ===== PUBLIC ===== */}
            <Route path="/"             element={<HomePage />} />
            <Route path="/services"     element={<ServicesPage />} />
            <Route path="/solutions"    element={<SolutionsPage />} />
            <Route path="/realisations" element={<RealisationsPage />} />
            <Route path="/tarifs"       element={<TarifsPage />} />
            <Route path="/a-propos"     element={<About />} />
            <Route path="/Contactpage"  element={<Contactpage />} />
            <Route path="/blog"         element={<BlogPage />} />
            <Route path="/blog/:slug"   element={<BlogDetailPage />} />
            <Route path="/devis"        element={<DevisPage />} />
            <Route path="/audit"        element={<AuditPage />} />
            <Route path="/experts"      element={<Experts />} />

            {/* ========== SERVICES ========== */}
            <Route path="/services/reseau-infrastructure" element={<ReseauInfrastructure />} />
            <Route path="/services/securite" element={<Securite />} />
            <Route path="DeveloppementDigital" element={<DeveloppementDigital />} />
            <Route path="/services/cloud-hebergement" element={<CloudHebergement />} />
            <Route path="/services/energie-equipements" element={<EnergieEquipements />} />
            <Route path="/services/vente-materiel" element={<VenteMateriel />} />
            <Route path="/services/formation" element={<Formation />} />
            <Route path="/devis-cloud" element={<DevisCloud />} />

            {/* ===== CLIENT ===== */}
            <Route path="/client/dashboard"  element={<ProtectedRoute roles={['client','super_admin','admin','manager']}><ClientDashboard /></ProtectedRoute>} />
            <Route path="/client/devis"      element={<ProtectedRoute roles={['client','super_admin','admin','manager']}><ClientDevisPage /></ProtectedRoute>} />
            <Route path="/client/projets"    element={<ProtectedRoute roles={['client','super_admin','admin','manager']}><ClientProjectsPage /></ProtectedRoute>} />
            <Route path="/client/historique" element={<ProtectedRoute roles={['client','super_admin','admin','manager']}><HistoriquePage /></ProtectedRoute>} />
            <Route path="/client/messagerie" element={<ProtectedRoute roles={['client','super_admin','admin','manager']}><ClientMessagingPage /></ProtectedRoute>} />
            <Route path="/client/profil"     element={<ProtectedRoute><ClientProfilePage /></ProtectedRoute>} />

            {/* ===== ADMIN ===== */}
            <Route path="/admin/dashboard" element={<ProtectedRoute roles={ADMIN_ROLES}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/clients"   element={<ProtectedRoute roles={ADMIN_ROLES}><AdminClientsPage /></ProtectedRoute>} />
            <Route path="/admin/crm"       element={<ProtectedRoute roles={ADMIN_ROLES}><AdminCRMPage /></ProtectedRoute>} />
            <Route path="/admin/projets"   element={<ProtectedRoute roles={ADMIN_ROLES}><AdminProjectsPage /></ProtectedRoute>} />
            <Route path="/admin/devis"     element={<ProtectedRoute roles={ADMIN_ROLES}><AdminDevisPage /></ProtectedRoute>} />
            <Route path="/admin/blog"      element={<ProtectedRoute roles={ADMIN_ROLES}><AdminBlogPage /></ProtectedRoute>} />
            <Route path="/admin/audits"    element={<ProtectedRoute roles={ADMIN_ROLES}><AdminAuditPage /></ProtectedRoute>} />
          </Route>

          {/* Routes sans Navbar/Footer (authentification & erreurs) */}
          <Route path="/login"    element={<GuestRoute><LoginPage /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
          <Route path="/forgot-password"        element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token"  element={<ResetPasswordPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*"             element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

/* ------------------------------------------------------------------ */
/*  ForgotPasswordPage (conservé tel quel)                           */
/* ------------------------------------------------------------------ */
const ForgotPasswordPage = () => {
  const [email, setEmail] = React.useState('');
  const [sent, setSent] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { authAPI } = await import('./services/api');
      await authAPI.forgotPassword(email);
    } catch { /* silenced */ }
    setSent(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-100)', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: 40, width: '100%', maxWidth: 440, boxShadow: 'var(--shadow-xl)' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔐</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>Mot de passe oublié</h2>
          <p style={{ color: 'var(--gray-500)', marginTop: 6 }}>Entrez votre email pour recevoir un lien de réinitialisation.</p>
        </div>
        {sent ? (
          <div style={{ background: '#dcfce7', borderRadius: 12, padding: 20, textAlign: 'center' }}>
            <p style={{ color: '#16a34a', fontWeight: 600 }}>✅ Si cet email existe, un lien vous a été envoyé.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">Adresse email</label>
              <input type="email" className="form-input" value={email} onChange={e => setEmail(e.target.value)} required placeholder="vous@exemple.com" />
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ justifyContent: 'center' }}>Envoyer le lien →</button>
          </form>
        )}
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <a href="/login" style={{ color: 'var(--primary)', fontSize: 14 }}>← Retour à la connexion</a>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  ResetPasswordPage (conservé tel quel)                            */
/* ------------------------------------------------------------------ */
const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = React.useState({ password: '', confirm: '' });
  const [done, setDone] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return alert('Les mots de passe ne correspondent pas');
    try {
      const { authAPI } = await import('./services/api');
      await authAPI.resetPassword(token, form.password);
      setDone(true);
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      alert(err.response?.data?.message || 'Lien invalide ou expiré');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-100)', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: 40, width: '100%', maxWidth: 440, boxShadow: 'var(--shadow-xl)' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔑</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>Nouveau mot de passe</h2>
        </div>
        {done ? (
          <div style={{ background: '#dcfce7', borderRadius: 12, padding: 20, textAlign: 'center' }}>
            <p style={{ color: '#16a34a', fontWeight: 600 }}>✅ Mot de passe modifié ! Redirection...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[['password', 'Nouveau mot de passe'], ['confirm', 'Confirmation']].map(([k, lbl]) => (
              <div key={k} className="form-group">
                <label className="form-label">{lbl}</label>
                <input type="password" className="form-input" value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} required minLength={6} />
              </div>
            ))}
            <button type="submit" className="btn btn-primary btn-lg" style={{ justifyContent: 'center' }}>Réinitialiser →</button>
          </form>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  UnauthorizedPage (conservé tel quel)                             */
/* ------------------------------------------------------------------ */
const UnauthorizedPage = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, background: 'var(--gray-100)' }}>
    <div style={{ fontSize: 64 }}>🚫</div>
    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--dark-700)' }}>Accès refusé</h1>
    <p style={{ color: 'var(--gray-500)', maxWidth: 380, textAlign: 'center' }}>Vous n'avez pas les droits pour accéder à cette page.</p>
    <a href="/" className="btn btn-primary">Retour à l'accueil</a>
  </div>
);

/* ------------------------------------------------------------------ */
/*  NotFoundPage (conservé tel quel)                                 */
/* ------------------------------------------------------------------ */
const NotFoundPage = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, background: 'linear-gradient(135deg, var(--dark-900), var(--dark-700))' }}>
    <div style={{ fontFamily: 'var(--font-display)', fontSize: 120, fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>404</div>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: '#fff' }}>Page introuvable</h2>
    <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 380, textAlign: 'center' }}>La page que vous cherchez n'existe pas ou a été déplacée.</p>
    <a href="/" className="btn btn-primary btn-lg">Retour à l'accueil →</a>
  </div>
);

export default App;