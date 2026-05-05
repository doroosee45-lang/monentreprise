import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { usersAPI } from '../../services/api';
import { StatCard, StatusBadge, PageLoader } from '../../components/common/UI';

const MONTHS = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
const COLORS = ['#00c2ff','#22c55e','#f59e0b','#a855f7','#ef4444'];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    usersAPI.getDashboard()
      .then(r => setStats(r.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <DashboardLayout type="admin"><PageLoader /></DashboardLayout>;

  const chartData = stats?.monthlyDevis?.map(d => ({
    name: MONTHS[d._id.month - 1],
    devis: d.count,
  })) || [];

  const pieData = [
    { name: 'En attente', value: stats?.openDevis || 0 },
    { name: 'Actifs', value: stats?.activeProjects || 0 },
    { name: 'Clients', value: stats?.totalClients || 0 },
  ];

  return (
    <DashboardLayout type="admin">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--dark-700)' }}>Dashboard Admin</h1>
          <p style={{ color: 'var(--gray-500)', marginTop: 4 }}>
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/admin/devis" className="btn btn-outline btn-sm">📋 Devis</Link>
          <Link to="/admin/projets" className="btn btn-primary btn-sm">🚀 Projets</Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 20, marginBottom: 28 }}>
        <StatCard icon="👥" label="Total clients" value={stats?.totalClients || 0} color="#a855f7" bg="#f3e8ff" />
        <StatCard icon="📋" label="Total devis" value={stats?.totalDevis || 0} color="var(--primary)" bg="var(--primary-light)" />
        <StatCard icon="⏳" label="Devis en attente" value={stats?.openDevis || 0} color="var(--warning)" bg="#fef3c7" />
        <StatCard icon="🚀" label="Projets actifs" value={stats?.activeProjects || 0} color="var(--success)" bg="#dcfce7" />
        <StatCard icon="💬" label="Tickets ouverts" value={stats?.openTickets || 0} color="var(--error)" bg="#fee2e2" />
        <StatCard icon="📁" label="Total projets" value={stats?.totalProjects || 0} color="var(--info)" bg="#dbeafe" />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 28 }}>
        {/* Line chart */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, marginBottom: 20 }}>Évolution des devis (6 derniers mois)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="devis" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00c2ff" />
                  <stop offset="100%" stopColor="#0099cc" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, marginBottom: 20 }}>Répartition activité</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none' }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            {pieData.map((d, i) => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: COLORS[i], flexShrink: 0 }} />
                <span style={{ flex: 1, color: 'var(--gray-600)' }}>{d.name}</span>
                <span style={{ fontWeight: 700 }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent devis table */}
      <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>Derniers devis reçus</h3>
          <Link to="/admin/devis" style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 600 }}>Voir tout →</Link>
        </div>
        {!stats?.recentDevis?.length ? (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--gray-400)' }}>Aucun devis récent</div>
        ) : (
          <table className="table">
            <thead>
              <tr><th>Numéro</th><th>Client</th><th>Service</th><th>Statut</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {stats.recentDevis.map(d => (
                <tr key={d._id}>
                  <td style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--primary)', fontSize: 13 }}>{d.number}</td>
                  <td style={{ fontWeight: 600 }}>{d.client?.firstName} {d.client?.lastName || d.clientInfo?.name}</td>
                  <td style={{ color: 'var(--gray-500)', fontSize: 13 }}>{d.service}</td>
                  <td><StatusBadge status={d.status} /></td>
                  <td style={{ color: 'var(--gray-400)', fontSize: 12 }}>{new Date(d.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <Link to="/admin/devis" className="btn btn-ghost btn-sm" style={{ fontSize: 13, color: 'var(--primary)' }}>Voir →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
