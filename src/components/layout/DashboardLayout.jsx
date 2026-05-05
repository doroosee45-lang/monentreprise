import React, { useState } from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children, type = 'client' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--gray-100)' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99 }} />
      )}

      <Sidebar type={type} />

      <main style={{ flex: 1, marginLeft: 260, padding: '32px', minHeight: '100vh', transition: 'margin-left 0.3s' }}>
        {/* Mobile topbar */}
        <div style={{ display: 'none' }} className="mobile-topbar">
          <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', marginBottom: 16 }}>☰</button>
        </div>

        <div className="page-enter">{children}</div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          main { margin-left: 0 !important; padding: 16px !important; }
          .mobile-topbar { display: flex !important; }
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
