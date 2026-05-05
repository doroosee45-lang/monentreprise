// src/pages/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users, Award, Target, Globe, Zap, Shield, Lightbulb, TrendingUp,
  ArrowRight, Headphones, CheckCircle, Rocket, Heart, Briefcase,
  Calendar, MapPin, Star, Phone, Mail, Handshake
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';


import meyaImg from '../../assets/images/experts/mm.jpeg';
import oseeImg from '../../assets/images/experts/mab.jpeg';
import paulImg from '../../assets/images/experts/ro.jpeg';
import claireImg from '../../assets/images/experts/st.jpeg';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const About = () => {

  const valeurs = [
    { icon: Target, title: 'Excellence', text: "Nous visons l'excellence dans chaque projet, avec des standards internationaux.", color: '#3b82f6' },
    { icon: Shield, title: 'Sécurité', text: 'La protection de vos données et infrastructures est notre priorité absolue.', color: '#10b981' },
    { icon: Lightbulb, title: 'Innovation', text: 'Nous anticipons les besoins futurs pour vous offrir des solutions modernes et évolutives.', color: '#f59e0b' },
    { icon: Users, title: 'Proximité', text: 'Un accompagnement humain et personnalisé, proche de vos réalités terrain.', color: '#8b5cf6' }
  ];

  const expertises = [
    { icon: Globe, title: "Réseau & Infrastructure", desc: "Câblage, WiFi pro, VLAN, parcs informatiques", color: "#3b82f6" },
    { icon: Shield, title: "Cybersécurité", desc: "Audit, vidéosurveillance, firewalls, formations", color: "#06b6d4" },
    { icon: Zap, title: "Développement Digital", desc: "Sites web, e-commerce, apps mobiles, ERP", color: "#f59e0b" },
    { icon: TrendingUp, title: "Cloud & Hébergement", desc: "Solutions haute disponibilité et migration", color: "#8b5cf6" },
    { icon: Lightbulb, title: "Énergie Solaire", desc: "Panneaux photovoltaïques et optimisation énergétique", color: "#f97316" },
    { icon: Award, title: "Formation & Coaching", desc: "Formations certifiantes et e-learning", color: "#10b981" },
  ];

  const stats = [
    { value: '8+', label: "Années d'expertise", icon: Calendar, color: '#3b82f6' },
    { value: '150+', label: 'Projets réalisés', icon: Briefcase, color: '#f59e0b' },
    { value: '95%', label: 'Clients satisfaits', icon: Star, color: '#10b981' },
    { value: '24/7', label: 'Support technique', icon: Headphones, color: '#ec4899' },
  ];

  const engagements = [
    { icon: Award, title: 'Qualité Certifiée', desc: 'Solutions conformes aux meilleures pratiques internationales.', color: '#10b981' },
    { icon: Target, title: 'Résultats Mesurables', desc: 'Nous nous engageons sur des objectifs concrets et vérifiables.', color: '#3b82f6' },
    { icon: Users, title: 'Accompagnement Continu', desc: 'Support technique et formation tout au long de votre projet.', color: '#f59e0b' },
  ];

  const team = [
    {
      name: 'Meya Dorodoro',
      role: 'CEO & Fondateur',
      position: 'Informatique & Full-Stack',
      bio: "Expert en infrastructure IT et cybersécurité avec plus de 7 ans d'expérience en domaines d'informatique.",
      image: meyaImg,
      color: '#3b82f6',
      initial: 'M',
    },
    {
      name: 'Maboko Alida',
      role: 'Directrice Technique en Données',
      position: 'Experte en réseaux et solutions cloud',
      bio: "Spécialiste des réseaux haut débit et des solutions cloud.",
      image: oseeImg,
      color: '#06b6d4',
      initial: 'O',
    },
    {
      name: 'Kasway Rodrick',
      role: 'Responsable Énergie',
      position: 'Ingénieur Énergies Renouvelables',
      bio: "Ingénieur en énergies renouvelables, il pilote nos projets solaires et d'efficacité énergétique.",
      image: paulImg,
      color: '#f59e0b',
      initial: 'P',
    },
    {
      name: 'Stephane',
      role: 'Lead Développement',
      position: 'Développeuse Full-Stack',
      bio: "Développeuse full-stack, elle conçoit des applications web et mobiles sur mesure.",
      image: claireImg,
      color: '#ec4899',
      initial: 'S',
    }
  ];

  return (
    <>
    <Navbar />
      <style>{`
        /* Styles globaux – identiques à Contact */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .section {
          padding: 4rem 0;
        }

        /* Hero avec image 400px */
        .about-hero {
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
        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }
        .btn-primary {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
          text-decoration: none;
        }
        .btn-primary:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        }
        .btn-outline {
          border: 2px solid rgba(255,255,255,0.3);
          background: transparent;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
          text-decoration: none;
        }
        .btn-outline:hover {
          background: rgba(255,255,255,0.1);
          transform: scale(1.02);
        }

        /* Grilles de cartes (blanches) */
        .cards-grid {
          display: grid;
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .grid-2 { grid-template-columns: repeat(2, 1fr); }
        .grid-3 { grid-template-columns: repeat(3, 1fr); }
        .grid-4 { grid-template-columns: repeat(4, 1fr); }

        .info-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
          text-decoration: none;
          color: inherit;
        }
        .info-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1);
          border-color: #cbd5e1;
        }
        .card-icon {
          width: 3.5rem;
          height: 3.5rem;
          margin: 0 auto 1rem;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }
        .info-card:hover .card-icon {
          transform: scale(1.05);
        }
        .card-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }
        .card-text {
          color: #475569;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        /* Statistiques */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .stat-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1);
        }
        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          margin-bottom: 0.25rem;
        }
        .stat-label {
          color: #475569;
          font-size: 0.875rem;
        }

        /* Sections avec titres */
        .section-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #eef2ff;
          color: #3b82f6;
          padding: 0.25rem 1rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: #0f172a;
          font-family: 'Syne', sans-serif;
          margin-bottom: 0.5rem;
        }
        .section-subtitle {
          color: #475569;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Team cards */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .team-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.3s;
        }
        .team-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1);
        }
        .team-photo {
          height: 260px;
          overflow: hidden;
          position: relative;
        }
        .team-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        .team-card:hover .team-photo img {
          transform: scale(1.05);
        }
        .team-info {
          padding: 1.25rem;
        }
        .team-name {
          font-weight: 700;
          font-size: 1.125rem;
          color: #0f172a;
        }
        .team-position {
          font-size: 0.75rem;
          color: #475569;
          margin-bottom: 0.5rem;
        }
        .team-bio {
          font-size: 0.875rem;
          color: #64748b;
          line-height: 1.4;
        }

        /* Double CTA (fin) */
        .double-cta {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 1024px;
          margin: 0 auto;
        }
        .cta-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s;
        }
        .cta-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1);
        }
        .cta-icon {
          width: 4rem;
          height: 4rem;
          margin: 0 auto 1.25rem;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }
        .cta-card:hover .cta-icon {
          transform: scale(1.05);
        }
        .btn-cta {
          background: #3b82f6;
          color: white;
          padding: 0.625rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-cta:hover {
          background: #2563eb;
          transform: scale(1.02);
        }

        @media (max-width: 1024px) {
          .grid-4, .team-grid, .stats-grid, .double-cta {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .grid-3, .grid-2, .grid-4, .team-grid, .stats-grid, .double-cta {
            grid-template-columns: 1fr;
          }
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>

      {/* Hero avec image 400px (identique à Contact) */}
      <div className="about-hero">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="hero-title"
          >
            À propos d'OMDEVE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-subtitle"
          >
            Leader en solutions IT, énergétiques et digitales en République Démocratique du Congo.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hero-buttons"
          >
            <Link to="/contact" className="btn-primary">
              Nous contacter <ArrowRight size={18} />
            </Link>
            <Link to="/realisations" className="btn-outline">
              Voir nos réalisations <CheckCircle size={18} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Histoire & Mission (deux cartes côte à côte) */}
      <div className="container" style={{ marginTop: '3rem' }}>
        <div className="grid-2 cards-grid">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="info-card"
            style={{ textAlign: 'left' }}
          >
            <div className="card-icon" style={{ backgroundColor: '#3b82f6', color: 'white', margin: '0 0 1rem 0' }}>
              <Calendar size={24} />
            </div>
            <h3 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Notre histoire</h3>
            <div className="card-text">
              <p>Fondée en 2018 à Kinshasa, <strong>OMDEVE Services</strong> est née de la volonté de répondre aux défis numériques et énergétiques de la RDC. Partant d'une petite équipe de 3 passionnés d'informatique, nous avons rapidement grandi pour devenir un acteur incontournable du secteur.</p>
              <p className="mt-3">En 2020, nous avons élargi nos compétences aux énergies renouvelables, puis au développement digital en 2022. Aujourd'hui, nous accompagnons plus de 150 entreprises congolaises dans leur transformation technologique.</p>
              <p className="mt-3"><strong>Notre mot d'ordre : innovation locale, standards internationaux.</strong></p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="info-card"
            style={{ textAlign: 'left' }}
          >
            <div className="card-icon" style={{ backgroundColor: '#f59e0b', color: 'white', margin: '0 0 1rem 0' }}>
              <Target size={24} />
            </div>
            <h3 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Notre mission</h3>
            <div className="card-text">
              <p><strong>Accélérer la digitalisation et la transition énergétique des entreprises congolaises</strong> en leur fournissant des solutions fiables, sécurisées et adaptées à leur environnement.</p>
              <p className="mt-3">Nous croyons que la technologie doit être accessible à tous. C'est pourquoi nous proposons des services sur mesure, avec un accompagnement de proximité et une veille technologique constante.</p>
              <p className="mt-3"><strong>Notre engagement : zéro panne non anticipée, zéro vulnérabilité négligée, zéro projet sans formation.</strong></p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Chiffres clés */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge"><TrendingUp size={14} /> Quelques chiffres</div>
          <h2 className="section-title">OMDEVE en quelques données</h2>
        </div>
        <div className="stats-grid">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="stat-card">
                <div className="card-icon" style={{ backgroundColor: stat.color, marginBottom: '1rem' }}>
                  <Icon size={24} color="white" />
                </div>
                <div className="stat-number" style={{ color: stat.color }}>{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Nos valeurs */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge"><Heart size={14} /> Nos piliers</div>
          <h2 className="section-title">Nos valeurs</h2>
        </div>
        <div className="grid-4 cards-grid">
          {valeurs.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="info-card">
                <div className="card-icon" style={{ backgroundColor: v.color }}>
                  <Icon size={24} color="white" />
                </div>
                <h3 className="card-title">{v.title}</h3>
                <p className="card-text">{v.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Notre expertise */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge"><Zap size={14} /> Notre savoir-faire</div>
          <h2 className="section-title">Notre expertise</h2>
          <p className="section-subtitle">7 domaines de compétences au service de votre croissance</p>
        </div>
        <div className="grid-3 cards-grid">
          {expertises.map((exp, i) => {
            const Icon = exp.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="info-card" style={{ textAlign: 'left' }}>
                <div className="card-icon" style={{ backgroundColor: exp.color, margin: '0 0 1rem 0' }}>
                  <Icon size={22} color="white" />
                </div>
                <h3 className="card-title">{exp.title}</h3>
                <p className="card-text">{exp.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Nos engagements */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge"><Award size={14} /> Nos promesses</div>
          <h2 className="section-title">Notre engagement</h2>
        </div>
        <div className="grid-3 cards-grid">
          {engagements.map((eng, i) => {
            const Icon = eng.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="info-card" style={{ textAlign: 'left' }}>
                <div className="card-icon" style={{ backgroundColor: eng.color, margin: '0 0 1rem 0' }}>
                  <Icon size={22} color="white" />
                </div>
                <h3 className="card-title">{eng.title}</h3>
                <p className="card-text">{eng.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Notre équipe */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge"><Users size={14} /> Notre équipe</div>
          <h2 className="section-title">Des experts passionnés</h2>
          <p className="section-subtitle">Une équipe multidisciplinaire unie par une seule mission : votre réussite technologique.</p>
        </div>
        <div className="team-grid">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="team-card"
            >
              <div className="team-photo">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="team-info">
                <div className="team-name">{member.name}</div>
                <div className="team-position" style={{ color: member.color }}>{member.position}</div>
                <div className="team-bio">{member.bio}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link to="/experts" className="btn-primary">
            Rencontrer toute l'équipe <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Section contact simplifiée (inspirée de Contact) */}
     {/* Section contact simplifiée (inspirée de Contact) - Version responsive */}
<div className="container" style={{ marginTop: '4rem' }}>
  <div className="info-card" style={{ 
    display: 'grid', 
    gridTemplateColumns: 'repeat(2, 1fr)', 
    padding: 0, 
    overflow: 'hidden',
    // Sur mobile, on passe en colonne
    '@media (max-width: 768px)': { gridTemplateColumns: '1fr' }
  }}>
    <div style={{ padding: '2rem' }}>
      <h3 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Contactez-nous</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div className="card-icon" style={{ width: '2.5rem', height: '2.5rem', margin: 0, backgroundColor: '#3b82f6', flexShrink: 0 }}>
            <Phone size={16} color="white" />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Téléphone</div>
            <a href="tel:+243816590788" style={{ fontWeight: 600, color: '#0f172a', textDecoration: 'none', wordBreak: 'break-word' }}>+243 816 590 788</a>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div className="card-icon" style={{ width: '2.5rem', height: '2.5rem', margin: 0, backgroundColor: '#10b981', flexShrink: 0 }}>
            <Mail size={16} color="white" />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Email</div>
            <a href="mailto:omedevservices@gmail.com" style={{ fontWeight: 600, color: '#0f172a', textDecoration: 'none', wordBreak: 'break-word' }}>omedevservices@gmail.com</a>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div className="card-icon" style={{ width: '2.5rem', height: '2.5rem', margin: 0, backgroundColor: '#f59e0b', flexShrink: 0 }}>
            <MapPin size={16} color="white" />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Adresse</div>
            <div style={{ fontWeight: 600, color: '#0f172a', wordBreak: 'break-word' }}>Avenue Kabmabre n°75, Lingwala, Kinshasa, RDC</div>
          </div>
        </div>
      </div>
    </div>
    <div style={{ 
      background: '#f8fafc', 
      padding: '2rem', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      textAlign: 'center', 
      borderLeft: '1px solid #e2e8f0',
      // Supprimer la bordure gauche sur mobile
      '@media (max-width: 768px)': { borderLeft: 'none', borderTop: '1px solid #e2e8f0' }
    }}>
      <div className="cta-icon" style={{ backgroundColor: '#3b82f6', width: '4rem', height: '4rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Headphones size={28} color="white" />
      </div>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '1rem 0 0.5rem' }}>Support 24/7</h3>
      <p style={{ color: '#475569', marginBottom: '1rem' }}>Une question urgente ? Notre équipe est là pour vous.</p>
      <Link to="/contact" className="btn-cta" style={{ background: '#3b82f6', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600 }}>Nous écrire</Link>
    </div>
  </div>
</div>

      {/* Double CTA finale (identique à Contact) */}
      <div className="container" style={{ margin: '4rem auto' }}>
        <div className="double-cta">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="cta-card"
          >
            <div className="cta-icon" style={{ backgroundColor: '#3b82f6' }}>
              <Target size={28} color="white" />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '0.75rem' }}>Audit gratuit</h3>
            <p style={{ color: '#475569', marginBottom: '1.5rem' }}>Bénéficiez d'un diagnostic complet de vos infrastructures sans engagement.</p>
            <Link to="/audit-gratuit" className="btn-cta">Demander un audit <ArrowRight size={16} /></Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="cta-card"
          >
            <div className="cta-icon" style={{ backgroundColor: '#f59e0b' }}>
              <Handshake size={28} color="white" />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '0.75rem' }}>Devis personnalisé</h3>
            <p style={{ color: '#475569', marginBottom: '1.5rem' }}>Recevez une proposition sur mesure adaptée à vos besoins et votre budget.</p>
            <Link to="/demander-devis" className="btn-cta" style={{ background: '#f59e0b' }}>Demander un devis <ArrowRight size={16} /></Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;