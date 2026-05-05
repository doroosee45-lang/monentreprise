// src/pages/Experts.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Award, Calendar, Briefcase, Star, Headphones, Target, Handshake,
  Users, Mail
} from 'lucide-react';
import { FaLinkedin, FaTwitter, FaGithub, FaInstagram, FaBehance } from 'react-icons/fa';

import expert1 from '/src/assets/images/experts/os1.jpg';
import expert2 from '/src/assets/images/experts/os2.jpg';
import expert3 from '/src/assets/images/experts/os3.jpg';
import expert4 from '/src/assets/images/experts/os4.jpg';
import expert5 from '/src/assets/images/experts/os5.jpeg';
import expert6 from '/src/assets/images/experts/fido.jpeg';
import expert7 from '/src/assets/images/experts/am.jpeg';
import expert8 from '/src/assets/images/experts/ro.jpeg';
import expert9 from '/src/assets/images/experts/glo.jpeg';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const Experts = () => {
  const experts = [
    {
      id: 1,
      name: 'Meya Dorodoro',
      role: 'CEO & Fondateur',
      position: 'Expert en Informatique Appliquée & Développeur Full-Stack',
      bio: "Plus de 15 ans d'expérience en infrastructure IT et cybersécurité en Afrique centrale.",
      image: expert1,
      skills: ['Cybersécurité', 'Infrastructure IT', 'Cloud Computing'],
      certifications: ['CISSP', 'PMP', 'AWS Solutions Architect'],
      socials: { linkedin: '#', github: '#', twitter: '#', email: 'oseedoro@gmail.com' }
    },
    {
      id: 2,
      name: 'Osee Mbongo',
      role: 'Directrice Technique',
      position: 'Ingénieur Télécoms',
      bio: "Spécialiste des réseaux haut débit et des solutions cloud.",
      image: expert2,
      skills: ['Réseaux', 'Télécommunications', 'Cloud'],
      certifications: ['CCNP', 'Azure Administrator', '5G Specialist'],
      socials: { linkedin: '#', github: '#', twitter: '#', email: 'osee.mbongo@omedev.com' }
    },
    {
      id: 3,
      name: 'Paul Kasongo',
      role: 'Responsable Énergie',
      position: 'Ingénieur Énergies Renouvelables',
      bio: "Expert en solutions photovoltaïques et efficacité énergétique.",
      image: expert3,
      skills: ['Solaire photovoltaïque', 'Efficacité énergétique', 'Micro-grids'],
      certifications: ['PV Design Expert', 'Energy Manager'],
      socials: { linkedin: '#', twitter: '#', email: 'paul.kasongo@omedev.com' }
    },
    {
      id: 4,
      name: 'Stéphane',
      role: 'Développement',
      position: 'Développeuse Full-Stack',
      bio: "Conçoit des applications web et mobiles sur mesure.",
      image: expert4,
      skills: ['React', 'Node.js', 'Flutter', 'AWS'],
      certifications: ['Meta Frontend Developer', 'AWS Cloud Practitioner'],
      socials: { linkedin: '#', github: '#', twitter: '#', email: 'claire.mbenza@omedev.com' }
    },
    {
      id: 5,
      name: 'Rodric Kasway',
      role: 'Expert Cybersécurité',
      position: 'Pentester & Consultant Sécurité',
      bio: "Audits de sécurité, tests d'intrusion et conformité.",
      image: expert5,
      skills: ['Pentest', 'Audit sécurité', 'SOC'],
      certifications: ['CEH', 'OSCP', 'CISA'],
      socials: { linkedin: '#', github: '#', twitter: '#', email: 'yannick.tshibangu@omedev.com' }
    },
    {
      id: 6,
      name: 'Fido Makayabu',
      role: 'Admin. Réseau',
      position: 'Expert Télécommunications & Administration Réseau',
      bio: "Conçoit et maintient des infrastructures réseau robustes.",
      image: expert6,
      skills: ['Networking', 'Cisco', 'Linux'],
      certifications: ['CCNA', 'CCNP', 'MCSE'],
      socials: { linkedin: '#', instagram: '#', email: 'fido.makayabu@omedev.com' }
    },
    {
      id: 7,
      name: 'Amosi Aristote',
      role: 'Resp. Climatisation',
      position: 'Expert en Installation & Maintenance HVAC',
      bio: "Installation et maintenance de systèmes de climatisation.",
      image: expert7,
      skills: ['Climatisation', 'HVAC', 'Installation'],
      certifications: ['Certificat Climatisation', 'Maintenance HVAC'],
      socials: { linkedin: '#', instagram: '#', email: 'amosi.aristote@omedev.com' }
    },
    {
      id: 8,
      name: 'Rodric Kasway',
      role: 'Resp. Vidéosurveillance',
      position: 'Expert en Vidéosurveillance & Configuration Serveurs',
      bio: "Conçoit des systèmes de surveillance robustes.",
      image: expert8,
      skills: ['Vidéosurveillance', 'NVR/DVR', 'IP Cameras'],
      certifications: ['Certificat Vidéosurveillance', 'Technicien Sécurité'],
      socials: { linkedin: '#', instagram: '#', email: 'rodric.kasway@omedev.com' }
    },
    {
      id: 9,
      name: 'Glody Ntudi',
      role: 'Infographie & IT',
      position: 'Expert en Infographie & Informatique',
      bio: "Solutions visuelles et numériques innovantes.",
      image: expert9,
      skills: ['Photoshop', 'Illustrator', 'Web Design'],
      certifications: ['Adobe Certified', 'Web Designer'],
      socials: { linkedin: '#', behance: '#', email: 'glody.ntudi@omedev.com' }
    }
  ];

  const stats = [
    { value: '8+', label: "Années d'expertise", icon: Calendar, color: '#3b82f6' },
    { value: '150+', label: 'Projets réalisés', icon: Briefcase, color: '#f59e0b' },
    { value: '98%', label: 'Clients satisfaits', icon: Star, color: '#10b981' },
    { value: '24/7', label: 'Support technique', icon: Headphones, color: '#ec4899' }
  ];

  const SocialIcon = ({ platform, url }) => {
    const icons = {
      linkedin: FaLinkedin,
      twitter: FaTwitter,
      github: FaGithub,
      instagram: FaInstagram,
      behance: FaBehance,
      email: Mail
    };
    const Icon = icons[platform];
    if (!url || !Icon) return null;
    return (
      <a
        href={platform === 'email' ? `mailto:${url}` : url}
        target={platform === 'email' ? '_self' : '_blank'}
        rel="noopener noreferrer"
        className="p-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all"
      >
        <Icon size={14} />
      </a>
    );
  };

  return (
    <>
      <style>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .experts-hero {
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
        .experts-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .expert-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.3s;
        }
        .expert-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1);
        }
        .expert-image {
          height: 260px;
          overflow: hidden;
        }
        .expert-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 15%;
          transition: transform 0.5s;
        }
        .expert-card:hover .expert-image img {
          transform: scale(1.05);
        }
        .expert-info {
          padding: 1.25rem;
        }
        .expert-name {
          font-weight: 700;
          font-size: 1.125rem;
          color: #0f172a;
          margin-bottom: 0.25rem;
        }
        .expert-role {
          font-size: 0.75rem;
          font-weight: 600;
          color: #3b82f6;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .expert-position {
          font-size: 0.7rem;
          color: #64748b;
          margin-bottom: 0.75rem;
        }
        .expert-bio {
          color: #475569;
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: 1rem;
        }
        .expert-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .skill-tag {
          background: #f1f5f9;
          color: #1e293b;
          font-size: 0.7rem;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
        }
        .expert-certs {
          margin-top: 0.5rem;
        }
        .certs-summary {
          color: #3b82f6;
          font-size: 0.75rem;
          cursor: pointer;
          user-select: none;
        }
        .certs-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
        .cert-badge {
          background: #eef2ff;
          color: #3b82f6;
          font-size: 0.7rem;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
        }
        .expert-socials {
          display: flex;
          gap: 0.5rem;
          justify-content: flex-start;
          margin-top: 1rem;
          padding-top: 0.75rem;
          border-top: 1px solid #e2e8f0;
        }
        .double-cta {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 1024px;
          margin: 3rem auto;
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
          margin: 0 auto 1rem;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 1024px) {
          .experts-grid, .stats-grid, .double-cta {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .experts-grid, .stats-grid, .double-cta {
            grid-template-columns: 1fr;
          }
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>

      {/* Hero */}
      <div className="experts-hero">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="hero-title"
          >
            Nos Experts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-subtitle"
          >
            Une équipe d'experts passionnés à votre service.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hero-buttons"
          >
            <Link to="/contact" className="btn-primary">Nous contacter <ArrowRight size={18} /></Link>
            <Link to="/realisations" className="btn-outline">Voir nos réalisations</Link>
          </motion.div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="stat-card"
              >
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

      {/* Grille des experts */}
      <div className="container">
        <div className="experts-grid">
          {experts.map((expert, idx) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="expert-card"
            >
              <div className="expert-image">
                <img src={expert.image} alt={expert.name} />
              </div>
              <div className="expert-info">
                <h3 className="expert-name">{expert.name}</h3>
                <div className="expert-role">{expert.role}</div>
                <div className="expert-position">{expert.position}</div>
                <p className="expert-bio">{expert.bio}</p>
                <div className="expert-skills">
                  {expert.skills.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
                {expert.certifications && expert.certifications.length > 0 && (
                  <details className="expert-certs">
                    <summary className="certs-summary">Certifications ({expert.certifications.length})</summary>
                    <div className="certs-list">
                      {expert.certifications.map((cert, i) => (
                        <span key={i} className="cert-badge">{cert}</span>
                      ))}
                    </div>
                  </details>
                )}
                <div className="expert-socials">
                  {Object.entries(expert.socials).map(([platform, url]) => (
                    <SocialIcon key={platform} platform={platform} url={url} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Double CTA */}
      <div className="container" style={{ margin: '3rem auto' }}>
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
            <Link to="/audit-gratuit" className="btn-primary">Demander un audit <ArrowRight size={16} /></Link>
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
            <Link to="/demander-devis" className="btn-primary">Demander un devis <ArrowRight size={16} /></Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Experts;