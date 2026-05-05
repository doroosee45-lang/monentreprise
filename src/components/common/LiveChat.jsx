// src/components/common/LiveChat.jsx (version finale avec IA simple)
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

// Fonction intelligente de réponse (basée sur mots-clés étendue)
const getSmartResponse = (userMessage) => {
  const msg = userMessage.toLowerCase();
  
  // Mots-clés par thème
  const keywords = {
    salutation: /bonjour|salut|coucou|hello|hey|bjr|bonsoir|yo/,
    devis: /devis|prix|tarif|coût|combien|budget|facture|payer/,
    audit: /audit|diagnostic|gratuit|gratis|gratuité/,
    reseau: /r[ée]seau|fibre|wifi|switch|routeur|câblage|connectivité|vlan/,
    securite: /s[ée]curit[ée]|cyber|firewall|antivirus|pentest|hack|piratage|ransomware/,
    dev: /site web|application|mobile|e-?commerce|erp|saas|logiciel|développement|coder/,
    cloud: /cloud|h[ée]bergement|aws|azure|serveur|migration|stockage|disque/,
    energie: /solaire|panneau|photovoltaïque|batterie|énergie|électricité/,
    clim: /climatisation|clim|split|chauffage|froid|air conditionné/,
    materiel: /mat[ée]riel|ordinateur|pc|écran|clavier|souris|serveur physique/,
    formation: /formation|apprentissage|certification|stage|bootcamp|atelier/,
    contact: /contact|expert|technicien|support|équipe|téléphone|email|appeler|joindre/,
    merci: /merci|thanks|bravo|top|super/,
    au_revoir: /au revoir|bye|ciao|à plus|salut/,
  };
  
  // Vérifier chaque catégorie
  if (msg.match(keywords.salutation)) {
    return "Bonjour ! 👋 Je suis l'assistant virtuel d'OMDEVE. Comment puis-je vous aider ? (devis, infos services, support...)";
  }
  if (msg.match(keywords.devis)) {
    return "📋 Vous pouvez demander un devis personnalisé directement sur notre page https://omdeve.com/devis. Voulez‑je vous aider à remplir le formulaire ?";
  }
  if (msg.match(keywords.audit)) {
    return "🔍 Audit gratuit : nous analysons vos besoins et proposons un diagnostic sans engagement. Vous souhaitez en bénéficier ?";
  }
  if (msg.match(keywords.reseau)) {
    return "🌐 Nos experts réseaux déploient des infrastructures haut débit (fibre, WiFi 6, câblage structuré) pour les entreprises. Demandez une étude personnalisée.";
  }
  if (msg.match(keywords.securite)) {
    return "🔒 Nous protégeons vos données avec des solutions complètes : firewalls, antivirus, vidéosurveillance, sensibilisation des équipes. Besoin d'un audit cybersécurité ?";
  }
  if (msg.match(keywords.dev)) {
    return "💻 Création de sites web, applications mobiles, ERP et SaaS sur mesure. Quelles fonctionnalités souhaitez‑vous ?";
  }
  if (msg.match(keywords.cloud)) {
    return "☁️ Hébergement cloud, migration, backup : nous vous accompagnons sur AWS, Azure, OVH. Voulez‑vous un devis gratuit ?";
  }
  if (msg.match(keywords.energie)) {
    return "☀️ Réduisez votre facture avec nos installations solaires (panneaux, onduleurs, batteries). Demandez une étude de faisabilité.";
  }
  if (msg.match(keywords.clim)) {
    return "❄️ Climatisation réversible, gainable, mobile – installation et maintenance. Un devis vous intéresse ?";
  }
  if (msg.match(keywords.materiel)) {
    return "🖥️ Achat d'ordinateurs, serveurs, caméras, clim... Neuf ou reconditionné sous garantie. Livraison rapide. Que recherchez‑vous ?";
  }
  if (msg.match(keywords.formation)) {
    return "🎓 Formations certifiantes en IT (réseau, sécurité, cloud, DevOps). Catalogue gratuit sur demande. Quels domaines vous intéressent ?";
  }
  if (msg.match(keywords.contact)) {
    return "📞 Contactez notre support : +243 555 503 59 ou omedevservices@gmail.com. Un conseiller vous répond sous 24h.";
  }
  if (msg.match(keywords.merci)) {
    return "😊 Merci à vous ! N'hésitez pas si d'autres questions.";
  }
  if (msg.match(keywords.au_revoir)) {
    return "👋 Au revoir ! Passez une excellente journée. À bientôt sur OMDEVE.";
  }
  
  // Réponse par défaut (pour les questions hors contexte)
  return "Je ne comprends pas encore bien votre demande. Pourriez‑vous reformuler ou nous laisser vos coordonnées (nom + email) ? Un conseiller vous recontactera rapidement. Merci !";
};

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Bonjour ! 👋 Je suis l'assistant intelligent d'OMDEVE. Comment puis-je vous aider aujourd'hui ? (devis, services, support...)", sender: "bot" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = { id: messages.length + 1, text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulation de réponse intelligente (délai naturel)
    setTimeout(() => {
      const botResponse = getSmartResponse(userMsg.text);
      const botMsg = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  // Style CSS (identique à votre version, adapté pour conserver l'apparence existante)
  // Je conserve la même structure JSX pour la fenêtre, seules les logiques changent
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 9999,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 20px rgba(245,158,11,0.4)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 12px 28px rgba(245,158,11,0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(245,158,11,0.4)';
        }}
      >
        {isOpen ? <X size={24} color="white" /> : <MessageCircle size={24} color="white" />}
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '96px',
            left: '24px',
            width: '340px',
            maxWidth: 'calc(100vw - 48px)',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            zIndex: 9998,
            fontFamily: 'var(--font-body, "DM Sans", sans-serif)',
            animation: 'fadeInUp 0.2s ease-out',
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            padding: '14px 16px',
            color: 'white',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%', boxShadow: '0 0 0 2px rgba(74,222,128,0.4)' }} />
              <span style={{ fontWeight: 700, fontFamily: 'Syne, sans-serif' }}>Support OMDEVE (IA)</span>
            </div>
            <p style={{ fontSize: '11px', opacity: 0.85, marginTop: '4px' }}>Réponses automatiques 24h/24</p>
          </div>

          <div style={{
            height: '320px',
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: '#faf9fe',
          }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '10px 14px',
                    borderRadius: '20px',
                    background: msg.sender === 'user' ? '#3b82f6' : '#eef2ff',
                    color: msg.sender === 'user' ? 'white' : '#1e293b',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  background: '#eef2ff',
                  padding: '10px 14px',
                  borderRadius: '20px',
                  display: 'flex',
                  gap: '4px',
                }}>
                  <span style={{ width: '8px', height: '8px', background: '#94a3b8', borderRadius: '50%', animation: 'bounce 1.2s infinite' }} />
                  <span style={{ width: '8px', height: '8px', background: '#94a3b8', borderRadius: '50%', animation: 'bounce 1.2s infinite 0.2s' }} />
                  <span style={{ width: '8px', height: '8px', background: '#94a3b8', borderRadius: '50%', animation: 'bounce 1.2s infinite 0.4s' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{
            display: 'flex',
            gap: '10px',
            padding: '12px 16px',
            borderTop: '1px solid #e2e8f0',
            background: 'white',
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Posez votre question..."
              style={{
                flex: 1,
                border: '1px solid #e2e8f0',
                borderRadius: '40px',
                padding: '10px 16px',
                fontSize: '13px',
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#f59e0b'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                border: 'none',
                borderRadius: '40px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: input.trim() ? 'pointer' : 'default',
                opacity: input.trim() ? 1 : 0.5,
                transition: 'opacity 0.2s',
              }}
            >
              <Send size="16" color="white" />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </>
  );
};

export default LiveChat;