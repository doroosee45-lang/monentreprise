import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import useAuthStore from '../../store/authStore';
import { devisAPI, projectsAPI, ticketsAPI } from '../../services/api';
import { StatCard, StatusBadge, PageLoader } from '../../components/common/UI';

const ClientDashboard = () => {
  const { user } = useAuthStore();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [devisRes, projectsRes, ticketsRes] = await Promise.all([
          devisAPI.getMy(),
          projectsAPI.getMy(),
          ticketsAPI.getMy(),
        ]);
        setData({
          devis: devisRes.data.data,
          projects: projectsRes.data.data,
          tickets: ticketsRes.data.data,
        });
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchAll();
  }, []);

  if (loading) return <DashboardLayout type="client"><PageLoader /></DashboardLayout>;

  const pendingDevis = data?.devis?.filter(d => d.status === 'pending').length || 0;
  const activeProjects = data?.projects?.filter(p => p.status === 'in_progress').length || 0;
  const openTickets = data?.tickets?.filter(t => t.status !== 'closed').length || 0;

  const getHour = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Bonjour';
    if (h < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  return (
    <DashboardLayout type="client">
      {/* Welcome */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--dark-700)', marginBottom: 4 }}>
          {getHour()}, {user?.firstName} 👋
        </h1>
        <p style={{ color: 'var(--gray-500)' }}>Voici un aperçu de votre espace client OMDEVE</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 32 }}>
        <StatCard icon="📋" label="Devis en attente" value={pendingDevis} color="var(--warning)" bg="#fef3c7" />
        <StatCard icon="🚀" label="Projets actifs" value={activeProjects} color="var(--primary)" bg="var(--primary-light)" />
        <StatCard icon="💬" label="Tickets ouverts" value={openTickets} color="var(--info)" bg="#dbeafe" />
        <StatCard icon="📂" label="Total devis" value={data?.devis?.length || 0} color="var(--success)" bg="#dcfce7" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 24 }}>
        {/* Recent devis */}
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>Mes derniers devis</h3>
            <Link to="/client/devis" style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 600 }}>Voir tout →</Link>
          </div>
          {data?.devis?.length === 0 ? (
            <div style={{ padding: '40px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
              <p style={{ color: 'var(--gray-500)', marginBottom: 16 }}>Aucun devis pour l'instant</p>
              <Link to="/devis" className="btn btn-primary btn-sm">Demander un devis</Link>
            </div>
          ) : (
            <table className="table">
              <thead><tr><th>N°</th><th>Service</th><th>Statut</th><th>Date</th></tr></thead>
              <tbody>
                {data?.devis?.slice(0, 5).map(d => (
                  <tr key={d._id}>
                    <td style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--primary)', fontSize: 13 }}>{d.number}</td>
                    <td style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.service}</td>
                    <td><StatusBadge status={d.status} /></td>
                    <td style={{ color: 'var(--gray-400)', fontSize: 13 }}>{new Date(d.createdAt).toLocaleDateString('fr-FR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Active projects */}
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>Projets en cours</h3>
            <Link to="/client/projets" style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 600 }}>Voir tout →</Link>
          </div>
          {data?.projects?.filter(p => p.status === 'in_progress').length === 0 ? (
            <div style={{ padding: '40px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🚀</div>
              <p style={{ color: 'var(--gray-500)' }}>Aucun projet actif</p>
            </div>
          ) : (
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data?.projects?.filter(p => p.status === 'in_progress').slice(0, 4).map(p => (
                <div key={p._id} style={{ background: 'var(--gray-100)', borderRadius: 10, padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{p.title}</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: 13 }}>{p.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {[
          { to: '/devis', icon: '📋', label: 'Nouveau devis', color: 'var(--primary)', bg: 'var(--primary-light)' },
          { to: '/audit', icon: '🔍', label: 'Audit gratuit', color: '#a855f7', bg: '#f3e8ff' },
          { to: '/client/messagerie', icon: '💬', label: 'Contacter le support', color: 'var(--success)', bg: '#dcfce7' },
          { to: '/services', icon: '🛠️', label: 'Voir les services', color: 'var(--warning)', bg: '#fef3c7' },
        ].map(a => (
          <Link key={a.to} to={a.to} style={{ background: '#fff', borderRadius: 14, padding: '20px 20px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: 'var(--shadow-sm)', textDecoration: 'none', transition: 'all 0.2s', border: '1px solid var(--gray-200)' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}>
            <div style={{ width: 44, height: 44, background: a.bg, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{a.icon}</div>
            <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--dark-700)' }}>{a.label}</span>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
