// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import useAuthStore from '../../store/authStore';

// const clientLinks = [
//   { to: '/client/dashboard',   icon: '🏠', label: 'Tableau de bord' },
//   { to: '/client/devis',       icon: '📋', label: 'Mes devis' },
//   { to: '/client/projets',     icon: '🚀', label: 'Mes projets' },
//   { to: '/client/historique',  icon: '📂', label: 'Historique' },
//   { to: '/client/messagerie',  icon: '💬', label: 'Messagerie' },
//   { to: '/client/profil',      icon: '👤', label: 'Mon profil' },
// ];

// const adminLinks = [
//   { section: 'GÉNÉRAL' },
//   { to: '/admin/dashboard',  icon: '📊', label: 'Dashboard' },
//   { to: '/admin/clients',    icon: '👥', label: 'Clients & Rôles' },
//   { section: 'COMMERCIAL' },
//   { to: '/admin/crm',        icon: '🎯', label: 'CRM & Pipeline' },
//   { to: '/admin/devis',      icon: '📋', label: 'Devis' },
//   { section: 'OPÉRATIONS' },
//   { to: '/admin/projets',    icon: '🚀', label: 'Projets & Tickets' },
//   { section: 'CONTENU' },
//   { to: '/admin/blog',       icon: '✍️', label: 'Blog & Catalogue' },
//   { section: 'OUTILS' },
//   { to: '/audit',            icon: '🔍', label: 'Audits reçus', external: true },
//   { path: '/admin/audits', label: '🔍 Audits IT', icon: '🔍' }
// ];

// const Sidebar = ({ type = 'client' }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, logout } = useAuthStore();

//   const links = type === 'admin' ? adminLinks : clientLinks;

//   const handleLogout = async () => {
//     await logout();
//     navigate('/login');
//   };

//   return (
//     <aside style={{
//       width: collapsed ? 72 : 260,
//       minHeight: '100vh',
//       background: 'var(--dark-800)',
//       display: 'flex',
//       flexDirection: 'column',
//       position: 'fixed',
//       left: 0, top: 0,
//       zIndex: 100,
//       transition: 'width 0.3s ease',
//       overflow: 'hidden',
//     }}>
//       {/* Logo */}
//       <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 72 }}>
//         {!collapsed && (
//           <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//             <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#00c2ff,#0099cc)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#0a0e1a', fontSize: 13, flexShrink: 0 }}>OM</div>
//             <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#fff', fontSize: 18 }}>OMDEVE</span>
//           </Link>
//         )}
//         <button onClick={() => setCollapsed(!collapsed)} style={{ background: 'rgba(255,255,255,0.07)', border: 'none', color: 'var(--gray-400)', borderRadius: 6, padding: '6px 8px', cursor: 'pointer', fontSize: 14, marginLeft: collapsed ? 'auto' : 0 }}>
//           {collapsed ? '→' : '←'}
//         </button>
//       </div>

//       {/* Nav */}
//       <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
//         {links.map((item, i) => {
//           if (item.section) {
//             return !collapsed ? (
//               <div key={i} style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--gray-500)', padding: '16px 8px 6px' }}>{item.section}</div>
//             ) : <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '8px 0' }} />;
//           }
//           const active = location.pathname === item.to;
//           return (
//             <Link key={item.to} to={item.to} style={{
//               display: 'flex', alignItems: 'center', gap: 12,
//               padding: collapsed ? '12px 14px' : '10px 12px',
//               borderRadius: 8, marginBottom: 2,
//               background: active ? 'rgba(0,194,255,0.12)' : 'transparent',
//               color: active ? 'var(--primary)' : 'var(--gray-400)',
//               fontWeight: active ? 700 : 500,
//               fontSize: 14, transition: 'all 0.15s',
//               textDecoration: 'none',
//               justifyContent: collapsed ? 'center' : 'flex-start',
//               title: collapsed ? item.label : '',
//             }}
//             onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--primary)'; }}
//             onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gray-400)'; }}}
//             title={collapsed ? item.label : ''}>
//               <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
//               {!collapsed && <span>{item.label}</span>}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* User info */}
//       <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
//         {!collapsed && (
//           <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, padding: '10px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: 10 }}>
//             <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#00c2ff,#0099cc)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#0a0e1a', fontSize: 14, flexShrink: 0 }}>
//               {user?.firstName?.[0]}{user?.lastName?.[0]}
//             </div>
//             <div style={{ overflow: 'hidden' }}>
//               <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.firstName} {user?.lastName}</div>
//               <div style={{ color: 'var(--gray-500)', fontSize: 11 }}>{user?.role}</div>
//             </div>
//           </div>
//         )}
//         <button onClick={handleLogout} style={{
//           width: '100%', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start',
//           gap: 10, padding: '10px 12px', borderRadius: 8,
//           background: 'transparent', border: 'none', color: 'var(--gray-500)',
//           fontSize: 14, cursor: 'pointer', transition: 'all 0.15s',
//         }}
//         onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = 'var(--error)'; }}
//         onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gray-500)'; }}>
//           <span style={{ fontSize: 18 }}>🚪</span>
//           {!collapsed && <span>Déconnexion</span>}
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;






import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const clientLinks = [
  { to: '/client/dashboard',   icon: '🏠', label: 'Tableau de bord' },
  { to: '/client/devis',       icon: '📋', label: 'Mes devis' },
  { to: '/client/projets',     icon: '🚀', label: 'Mes projets' },
  { to: '/client/historique',  icon: '📂', label: 'Historique' },
  { to: '/client/messagerie',  icon: '💬', label: 'Messagerie' },
  { to: '/client/profil',      icon: '👤', label: 'Mon profil' },
];

const adminLinks = [
  { section: 'GÉNÉRAL' },
  { to: '/admin/dashboard',  icon: '📊', label: 'Dashboard' },
  { to: '/admin/clients',    icon: '👥', label: 'Clients & Rôles' },
  { section: 'COMMERCIAL' },
  { to: '/admin/crm',        icon: '🎯', label: 'CRM & Pipeline' },
  { to: '/admin/devis',      icon: '📋', label: 'Devis' },
  { section: 'OPÉRATIONS' },
  { to: '/admin/projets',    icon: '🚀', label: 'Projets & Tickets' },
  { section: 'CONTENU' },
  { to: '/admin/blog',       icon: '✍️', label: 'Blog & Catalogue' },
  { section: 'OUTILS' },
  { to: '/admin/audits',     icon: '🔍', label: 'Audits IT' },
];

const Sidebar = ({ type = 'client' }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const links = type === 'admin' ? adminLinks : clientLinks;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside style={{
      width: collapsed ? 72 : 260,
      minHeight: '100vh',
      background: 'var(--dark-800)',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0, top: 0,
      zIndex: 100,
      transition: 'width 0.3s ease',
      overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 72 }}>
        {!collapsed && (
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#00c2ff,#0099cc)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#0a0e1a', fontSize: 13, flexShrink: 0 }}>OM</div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#fff', fontSize: 18 }}>OMDEVE</span>
          </Link>
        )}
        <button onClick={() => setCollapsed(!collapsed)} style={{ background: 'rgba(255,255,255,0.07)', border: 'none', color: 'var(--gray-400)', borderRadius: 6, padding: '6px 8px', cursor: 'pointer', fontSize: 14, marginLeft: collapsed ? 'auto' : 0 }}>
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
        {links.map((item, i) => {
          if (item.section) {
            return !collapsed ? (
              <div key={i} style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--gray-500)', padding: '16px 8px 6px' }}>{item.section}</div>
            ) : <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '8px 0' }} />;
          }
          const active = location.pathname === item.to;
          return (
            <Link key={item.to} to={item.to} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: collapsed ? '12px 14px' : '10px 12px',
              borderRadius: 8, marginBottom: 2,
              background: active ? 'rgba(0,194,255,0.12)' : 'transparent',
              color: active ? 'var(--primary)' : 'var(--gray-400)',
              fontWeight: active ? 700 : 500,
              fontSize: 14, transition: 'all 0.15s',
              textDecoration: 'none',
              justifyContent: collapsed ? 'center' : 'flex-start',
            }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--primary)'; }}
            onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gray-400)'; }}}
            title={collapsed ? item.label : ''}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User info */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, padding: '10px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: 10 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#00c2ff,#0099cc)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#0a0e1a', fontSize: 14, flexShrink: 0 }}>
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.firstName} {user?.lastName}</div>
              <div style={{ color: 'var(--gray-500)', fontSize: 11 }}>{user?.role}</div>
            </div>
          </div>
        )}
        <button onClick={handleLogout} style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start',
          gap: 10, padding: '10px 12px', borderRadius: 8,
          background: 'transparent', border: 'none', color: 'var(--gray-500)',
          fontSize: 14, cursor: 'pointer', transition: 'all 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = 'var(--error)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gray-500)'; }}>
          <span style={{ fontSize: 18 }}>🚪</span>
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;