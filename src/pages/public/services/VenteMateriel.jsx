// src/pages/VenteMateriel.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Computer, Server, Wifi, HardDrive, ShoppingBag, CheckCircle, ArrowRight,
  Truck, ShoppingCart, Camera, Wind, Mouse, ChevronRight, ChevronLeft,
  MapPin, CreditCard, Lock
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const VenteMateriel = () => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', address: '', city: '', postalCode: '', country: 'RDC', paymentMethod: 'card'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const products = [
    { id: 1, name: 'Ordinateur Portable Professionnel', category: 'Ordinateurs', description: 'PC portable 15.6" Intel Core i7, 16 Go RAM, SSD 512 Go', price: 899, priceFormatted: '899 €', image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=250&fit=crop', icon: Computer, color: '#3b82f6' },
    { id: 2, name: 'Climatiseur Mobile 12000 BTU', category: 'Climatisation', description: 'Climatiseur monobloc, mode froid/chauffage', price: 449, priceFormatted: '449 €', image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=250&fit=crop', icon: Wind, color: '#06b6d4' },
    { id: 3, name: 'Caméra de Surveillance 4K', category: 'Sécurité', description: 'Caméra IP extérieure, vision nocturne, détection mouvement', price: 129, priceFormatted: '129 €', image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=400&h=250&fit=crop', icon: Camera, color: '#8b5cf6' },
    { id: 4, name: 'Switch Gigabit 24 ports', category: 'Réseau', description: 'Switch administrable, 24 ports Gigabit, PoE+', price: 349, priceFormatted: '349 €', image: 'https://images.unsplash.com/photo-1611095556210-4f2e6a8b4e1a?w=400&h=250&fit=crop', icon: Wifi, color: '#a855f7' },
    { id: 5, name: 'SSD NVMe 1 To', category: 'Composants', description: 'Disque SSD ultra-rapide, lecture 7000 Mo/s', price: 109, priceFormatted: '109 €', image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=250&fit=crop', icon: HardDrive, color: '#10b981' },
    { id: 6, name: 'Souris & Clavier sans fil', category: 'Accessoires', description: 'Set ergonomique, connexion 2.4 GHz', price: 49, priceFormatted: '49 €', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=250&fit=crop', icon: Mouse, color: '#f59e0b' },
    { id: 7, name: 'Serveur Tour Dell PowerEdge', category: 'Serveurs', description: 'Intel Xeon, 32 Go RAM, 4 baies SAS', price: 1899, priceFormatted: '1 899 €', image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=250&fit=crop', icon: Server, color: '#3b82f6' },
    { id: 8, name: 'Kit Caméras Wi-Fi (4 caméras)', category: 'Sécurité', description: 'Pack 4 caméras intérieures, vision 360°', price: 199, priceFormatted: '199 €', image: 'https://images.unsplash.com/photo-1580128665081-1fbf9b8a1c3d?w=400&h=250&fit=crop', icon: Camera, color: '#06b6d4' },
    { id: 9, name: 'Climatiseur Réversible Gainable', category: 'Climatisation', description: 'Puissance 18000 BTU, silence, gain énergétique', price: 2290, priceFormatted: '2 290 €', image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=250&fit=crop', icon: Wind, color: '#14b8a6' }
  ];

  const features = [
    { icon: Computer, title: 'Ordinateurs & périphériques', desc: 'PC, Mac, écrans, claviers, souris', color: '#3b82f6' },
    { icon: Server, title: 'Serveurs & stockage', desc: 'HP, Dell, Lenovo, Synology', color: '#06b6d4' },
    { icon: Wifi, title: 'Équipements réseau', desc: 'Routeurs, switches, bornes Wi-Fi', color: '#8b5cf6' },
    { icon: HardDrive, title: 'Composants & upgrades', desc: 'RAM, SSD, cartes graphiques', color: '#f59e0b' },
    { icon: ShoppingBag, title: 'Licences logicielles', desc: 'Microsoft, Adobe, antivirus', color: '#10b981' },
    { icon: Truck, title: 'Livraison rapide', desc: 'Sous 48h en France métropolitaine', color: '#3b82f6' }
  ];

  const totalPrice = selectedProduct ? selectedProduct.price * quantity : 0;
  const totalFormatted = totalPrice.toLocaleString('fr-FR') + ' €';

  const openOrderForm = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setStep(1);
    setShowOrderForm(true);
    setOrderComplete(false);
    setFormData({ fullName: '', email: '', phone: '', address: '', city: '', postalCode: '', country: 'RDC', paymentMethod: 'card' });
  };

  const closeOrderForm = () => {
    setShowOrderForm(false);
    setSelectedProduct(null);
    setStep(1);
    setOrderComplete(false);
  };

  const nextStep = () => {
    if (step === 1 && !selectedProduct) return alert('Veuillez sélectionner un produit');
    if (step === 2 && quantity < 1) return alert('Quantité invalide');
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const submitOrder = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newOrderNumber = 'CMD-' + Math.floor(Math.random() * 1000000);
    setOrderNumber(newOrderNumber);
    setOrderComplete(true);
    setIsSubmitting(false);
    console.log('Commande envoyée', { product: selectedProduct, quantity, ...formData, total: totalPrice, orderNumber: newOrderNumber });
  };

  const steps = [
    { number: 1, title: 'Produit', icon: ShoppingCart },
    { number: 2, title: 'Quantité', icon: Truck },
    { number: 3, title: 'Livraison', icon: MapPin },
    { number: 4, title: 'Paiement', icon: CreditCard },
    { number: 5, title: 'Confirmation', icon: CheckCircle }
  ];

  return (
    <>
      <style>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .hero {
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
        .hero-highlight {
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
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
          margin-bottom: 2rem;
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
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }
        .divider {
          width: 4rem;
          height: 0.25rem;
          background: #3b82f6;
          border-radius: 9999px;
          margin: 0.5rem auto 1rem;
        }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.5rem;
          transition: all 0.3s;
          text-align: center;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1);
        }
        .card-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .card-title {
          font-weight: 700;
          font-size: 1.125rem;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }
        .card-text {
          color: #475569;
          font-size: 0.875rem;
          line-height: 1.5;
        }
        .product-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.3s;
        }
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1);
        }
        .product-image {
          height: 200px;
          overflow: hidden;
        }
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
        .product-card:hover .product-image img {
          transform: scale(1.05);
        }
        .product-info {
          padding: 1rem;
        }
        .form-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 1.5rem;
          margin: 2rem 0;
        }
        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59,130,246,0.2);
        }
        .step-indicator {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
          position: relative;
        }
        .step-circle {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          background: white;
          border: 2px solid #e2e8f0;
          color: #94a3b8;
          z-index: 1;
        }
        .step-circle.active {
          background: #3b82f6;
          border-color: #3b82f6;
          color: white;
        }
        .step-circle.completed {
          background: #10b981;
          border-color: #10b981;
          color: white;
        }
        .step-line {
          position: absolute;
          top: 1.25rem;
          left: 0;
          right: 0;
          height: 2px;
          background: #e2e8f0;
          z-index: 0;
        }
        .step-label {
          font-size: 0.7rem;
          margin-top: 0.25rem;
          color: #64748b;
        }
        .brands-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
        }
        .brand-tag {
          background: white;
          border: 1px solid #e2e8f0;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          color: #1e293b;
          transition: all 0.2s;
        }
        .brand-tag:hover {
          background: #f8fafc;
          transform: translateY(-2px);
        }
        @media (max-width: 1024px) {
          .cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .cards-grid {
            grid-template-columns: 1fr;
          }
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }
          .btn-primary, .btn-outline {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      {/* ===== HERO 400px ===== */}
      <div className="hero">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="hero-title"
          >
            Le matériel qu’il vous faut,{' '}
            <span className="hero-highlight">au meilleur prix</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-subtitle"
          >
            Ordinateurs, climatiseurs, caméras, serveurs, accessoires... Livraison rapide et support technique inclus.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hero-buttons"
          >
            <Link to="/devis" className="btn-primary">Demander un devis <ArrowRight size={18} /></Link>
            <Link to="/contact" className="btn-outline">Contacter un commercial <CheckCircle size={18} /></Link>
          </motion.div>
        </div>
      </div>

      {/* ===== FEATURES ===== */}
      <div className="container">
        <div className="cards-grid">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="card"
              >
                <div className="card-icon" style={{ backgroundColor: `${feature.color}15`, color: feature.color }}>
                  <Icon size={24} />
                </div>
                <h3 className="card-title">{feature.title}</h3>
                <p className="card-text">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ===== CATALOGUE ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">🛒 Catalogue</div>
          <h2 className="section-title">Nos meilleures ventes</h2>
          <div className="divider"></div>
          <p className="section-subtitle">Découvrez notre sélection de matériel informatique, climatisation et sécurité.</p>
        </div>
        <div className="cards-grid">
          {products.map((product, idx) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="product-card"
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="card-icon" style={{ backgroundColor: `${product.color}15`, color: product.color, width: '2rem', height: '2rem' }}>
                      <Icon size={14} />
                    </div>
                    <h3 className="card-title" style={{ fontSize: '1rem', marginBottom: 0 }}>{product.name}</h3>
                  </div>
                  <p className="card-text" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>{product.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xl font-bold" style={{ color: product.color }}>{product.priceFormatted}</span>
                    <button
                      onClick={() => openOrderForm(product)}
                      className="btn-primary"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', background: product.color }}
                    >
                      <ShoppingCart size={14} /> Acheter
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ===== FORMULAIRE D'ACHAT (si ouvert) ===== */}
      {showOrderForm && (
        <div className="container">
          <div className="form-card" id="order-form">
            <div style={{ textAlign: 'right' }}>
              <button onClick={closeOrderForm} style={{ color: '#64748b', fontSize: '1.5rem', lineHeight: 1 }}>✕</button>
            </div>
            <div className="section-header" style={{ marginBottom: '1rem' }}>
              <div className="section-badge">📝 Commande</div>
              <h2 className="section-title" style={{ fontSize: '1.5rem' }}>Formulaire d'achat</h2>
              <div className="divider" style={{ width: '3rem' }}></div>
            </div>

            {/* Indicateur d'étapes simplifié */}
            <div className="step-indicator">
              <div className="step-line"></div>
              {steps.map((s, idx) => (
                <div key={s.number} className="flex flex-col items-center z-10" style={{ width: `${100 / steps.length}%` }}>
                  <div className={`step-circle ${step > s.number ? 'completed' : step === s.number ? 'active' : ''}`}>
                    {step > s.number ? <CheckCircle size={16} /> : s.number}
                  </div>
                  <div className="step-label hidden sm:block">{s.title}</div>
                </div>
              ))}
            </div>

            {orderComplete ? (
              <div className="text-center py-8">
                <CheckCircle size={48} style={{ color: '#10b981', marginBottom: '1rem' }} />
                <h3 className="card-title" style={{ fontSize: '1.25rem' }}>Commande confirmée !</h3>
                <p className="card-text">Votre commande a été enregistrée sous le numéro :</p>
                <div className="text-xl font-mono font-bold text-blue-600 bg-gray-100 inline-block px-4 py-2 rounded-lg my-4">{orderNumber}</div>
                <p className="card-text">Un email de confirmation vous a été envoyé à <strong>{formData.email}</strong>.</p>
                <button onClick={closeOrderForm} className="btn-primary" style={{ marginTop: '1rem' }}>Nouvelle commande</button>
              </div>
            ) : (
              <>
                {step === 1 && (
                  <div>
                    <h3 className="card-title" style={{ marginBottom: '1rem' }}>Choisissez votre produit</h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {products.map(prod => (
                        <div key={prod.id} onClick={() => setSelectedProduct(prod)} className={`cursor-pointer p-3 rounded-lg border transition-all ${selectedProduct?.id === prod.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                          <div className="flex items-center gap-3">
                            <div className="card-icon" style={{ backgroundColor: `${prod.color}15`, color: prod.color, width: '2rem', height: '2rem' }}>
                              <prod.icon size={14} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{prod.name}</h4>
                              <p className="text-xs text-gray-500">{prod.description.substring(0, 60)}...</p>
                            </div>
                            <div className="font-bold" style={{ color: prod.color }}>{prod.priceFormatted}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && selectedProduct && (
                  <div>
                    <h3 className="card-title" style={{ marginBottom: '1rem' }}>Quantité souhaitée</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between mb-2"><span className="text-gray-600">Produit :</span><span className="font-semibold">{selectedProduct.name}</span></div>
                      <div className="flex justify-between mb-2"><span className="text-gray-600">Prix unitaire :</span><span className="font-semibold" style={{ color: selectedProduct.color }}>{selectedProduct.priceFormatted}</span></div>
                      <div className="flex items-center justify-between gap-4 mt-4">
                        <span className="text-gray-600">Quantité :</span>
                        <div className="flex items-center gap-3">
                          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300">-</button>
                          <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-20 text-center border border-gray-300 rounded-lg py-1" />
                          <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300">+</button>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between">
                        <span className="font-bold">Total :</span>
                        <span className="text-xl font-bold" style={{ color: '#f59e0b' }}>{totalFormatted}</span>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h3 className="card-title" style={{ marginBottom: '1rem' }}>Adresse de livraison</h3>
                    <div className="space-y-3">
                      <input type="text" placeholder="Nom complet *" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} className="form-input" />
                      <input type="email" placeholder="Email *" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="form-input" />
                      <input type="tel" placeholder="Téléphone *" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="form-input" />
                      <input type="text" placeholder="Adresse *" value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} className="form-input" />
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Ville *" value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} className="form-input" />
                        <input type="text" placeholder="Code postal *" value={formData.postalCode} onChange={(e) => handleInputChange('postalCode', e.target.value)} className="form-input" />
                      </div>
                      <input type="text" placeholder="Pays" value={formData.country} onChange={(e) => handleInputChange('country', e.target.value)} className="form-input" />
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <h3 className="card-title" style={{ marginBottom: '1rem' }}>Mode de paiement</h3>
                    <div className="space-y-4">
                      <div className="flex gap-4 flex-wrap">
                        {[
                          { value: 'card', label: 'Carte bancaire' },
                          { value: 'mobile', label: 'Mobile Money' },
                          { value: 'bank', label: 'Virement bancaire' }
                        ].map(m => (
                          <label key={m.value} className="flex items-center gap-2">
                            <input type="radio" name="paymentMethod" value={m.value} checked={formData.paymentMethod === m.value} onChange={() => handleInputChange('paymentMethod', m.value)} />
                            {m.label}
                          </label>
                        ))}
                      </div>
                      {formData.paymentMethod === 'card' && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-3"><Lock size={14} className="text-blue-500" /><span className="text-sm">Paiement sécurisé</span></div>
                          <input type="text" placeholder="Numéro de carte" className="form-input mb-2" />
                          <div className="grid grid-cols-2 gap-2">
                            <input type="text" placeholder="MM/AA" className="form-input" />
                            <input type="text" placeholder="CVV" className="form-input" />
                          </div>
                          <p className="text-xs text-gray-500 mt-2">Simulation de paiement - Aucune carte n'est débitée</p>
                        </div>
                      )}
                      {formData.paymentMethod === 'mobile' && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <input type="text" placeholder="Numéro de téléphone (M-Pesa, Airtel Money)" className="form-input" />
                          <p className="text-xs text-gray-500 mt-2">Vous recevrez une demande de paiement sur votre téléphone.</p>
                        </div>
                      )}
                      {formData.paymentMethod === 'bank' && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm">IBAN : OMDEVE******<br />Vous recevrez les coordonnées bancaires complètes par email.</p>
                        </div>
                      )}
                      <div className="border-t border-gray-200 pt-4 flex justify-between">
                        <span className="font-bold">Total à payer :</span>
                        <span className="text-2xl font-bold" style={{ color: '#f59e0b' }}>{totalFormatted}</span>
                      </div>
                    </div>
                  </div>
                )}

                {step === 5 && selectedProduct && (
                  <div>
                    <h3 className="card-title" style={{ marginBottom: '1rem' }}>Confirmation de commande</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-600">Produit :</span><span className="font-semibold">{selectedProduct.name}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Quantité :</span><span>{quantity}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Prix unitaire :</span><span>{selectedProduct.priceFormatted}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Total :</span><span className="font-bold" style={{ color: '#f59e0b' }}>{totalFormatted}</span></div>
                      <div className="border-t border-gray-200 my-2"></div>
                      <div><span className="text-gray-600">Livraison :</span> {formData.address}, {formData.city}</div>
                      <div><span className="text-gray-600">Contact :</span> {formData.fullName} - {formData.email}</div>
                      <div><span className="text-gray-600">Paiement :</span> {formData.paymentMethod === 'card' ? 'Carte bancaire' : formData.paymentMethod === 'mobile' ? 'Mobile Money' : 'Virement bancaire'}</div>
                    </div>
                    <p className="text-xs text-gray-500 mt-4 text-center">En cliquant sur "Confirmer", vous acceptez nos conditions générales de vente.</p>
                  </div>
                )}

                {/* Boutons navigation */}
                <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                  {step > 1 && <button onClick={prevStep} className="btn-outline" style={{ borderColor: '#cbd5e1', color: '#1e293b' }}><ChevronLeft size={16} /> Précédent</button>}
                  {step < 5 && <button onClick={nextStep} className="btn-primary" style={{ marginLeft: 'auto' }}>Suivant <ChevronRight size={16} /></button>}
                  {step === 5 && <button onClick={submitOrder} disabled={isSubmitting} className="btn-primary" style={{ marginLeft: 'auto', background: '#10b981' }}>
                    {isSubmitting ? 'Envoi...' : 'Confirmer'} <CheckCircle size={16} />
                  </button>}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ===== PARTENAIRES ===== */}
      <div className="container">
        <div className="section-header">
          <div className="section-badge">🤝 Partenaires officiels</div>
          <h2 className="section-title">Partenaires officiels</h2>
          <div className="divider"></div>
        </div>
        <div className="brands-grid">
          {['HP', 'Dell', 'Lenovo', 'Cisco', 'Microsoft', 'Synology', 'Mitsubishi', 'Hikvision'].map((brand, idx) => (
            <motion.span
              key={brand}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="brand-tag"
            >
              {brand}
            </motion.span>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/contact" className="btn-primary">Contacter un commercial <ArrowRight size={18} /></Link>
        </div>
      </div>
    </>
  );
};

export default VenteMateriel;