import React from 'react';

// Loading Spinner
export const Spinner = ({ size = 24, className = '' }) => (
  <div className={`spinner ${className}`} style={{ width: size, height: size }} />
);

// Page loader
export const PageLoader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
    <div style={{ textAlign: 'center' }}>
      <Spinner size={40} />
      <p style={{ marginTop: 16, color: 'var(--gray-500)', fontFamily: 'var(--font-display)' }}>Chargement...</p>
    </div>
  </div>
);

// Badge
export const Badge = ({ variant = 'gray', children }) => (
  <span className={`badge badge-${variant}`}>{children}</span>
);

// Status badge mapping
export const StatusBadge = ({ status }) => {
  const map = {
    pending:    { variant: 'warning', label: 'En attente' },
    processing: { variant: 'info',    label: 'En cours' },
    validated:  { variant: 'success', label: 'Validé' },
    rejected:   { variant: 'error',   label: 'Refusé' },
    archived:   { variant: 'gray',    label: 'Archivé' },
    open:       { variant: 'info',    label: 'Ouvert' },
    in_progress:{ variant: 'warning', label: 'En cours' },
    resolved:   { variant: 'success', label: 'Résolu' },
    closed:     { variant: 'gray',    label: 'Fermé' },
    completed:  { variant: 'success', label: 'Terminé' },
    on_hold:    { variant: 'warning', label: 'En pause' },
    cancelled:  { variant: 'error',   label: 'Annulé' },
    published:  { variant: 'success', label: 'Publié' },
    draft:      { variant: 'gray',    label: 'Brouillon' },
    lead:       { variant: 'gray',    label: 'Lead' },
    contact:    { variant: 'info',    label: 'Contact' },
    proposal:   { variant: 'warning', label: 'Proposition' },
    negotiation:{ variant: 'primary', label: 'Négociation' },
    signed:     { variant: 'success', label: 'Signé' },
    lost:       { variant: 'error',   label: 'Perdu' },
  };
  const config = map[status] || { variant: 'gray', label: status };
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

// Input
export const Input = React.forwardRef(({ label, error, hint, ...props }, ref) => (
  <div className="form-group">
    {label && <label className="form-label">{label}</label>}
    <input ref={ref} className={`form-input ${error ? 'error' : ''}`} {...props} />
    {error && <span className="form-error">{error}</span>}
    {hint && !error && <span className="form-hint">{hint}</span>}
  </div>
));

// Select
export const Select = React.forwardRef(({ label, error, children, ...props }, ref) => (
  <div className="form-group">
    {label && <label className="form-label">{label}</label>}
    <select ref={ref} className={`form-input ${error ? 'error' : ''}`} {...props}>{children}</select>
    {error && <span className="form-error">{error}</span>}
  </div>
));

// Textarea
export const Textarea = React.forwardRef(({ label, error, rows = 4, ...props }, ref) => (
  <div className="form-group">
    {label && <label className="form-label">{label}</label>}
    <textarea ref={ref} rows={rows} className={`form-input ${error ? 'error' : ''}`} style={{ resize: 'vertical' }} {...props} />
    {error && <span className="form-error">{error}</span>}
  </div>
));

// Button
export const Button = ({ variant = 'primary', size = '', loading = false, children, ...props }) => (
  <button className={`btn btn-${variant} ${size ? `btn-${size}` : ''}`} disabled={loading || props.disabled} {...props}>
    {loading ? <Spinner size={16} /> : null}
    {children}
  </button>
);

// Empty state
export const EmptyState = ({ icon, title, description, action }) => (
  <div style={{ textAlign: 'center', padding: '60px 24px' }}>
    {icon && <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>}
    <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 8 }}>{title}</h3>
    {description && <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>{description}</p>}
    {action}
  </div>
);

// Modal
export const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  const widths = { sm: 400, md: 560, lg: 720, xl: 900 };
  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: widths[size], maxHeight: '90vh', overflow: 'auto', animation: 'slideDown 0.2s ease' }}>
        {title && (
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>{title}</h3>
            <button onClick={onClose} className="btn btn-ghost btn-sm" style={{ fontSize: 20 }}>✕</button>
          </div>
        )}
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
};

// Confirm dialog
export const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirmer', variant = 'error' }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
    <p style={{ color: 'var(--gray-600)', marginBottom: 24 }}>{message}</p>
    <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
      <Button variant="ghost" onClick={onClose}>Annuler</Button>
      <Button variant={variant} onClick={() => { onConfirm(); onClose(); }}>{confirmText}</Button>
    </div>
  </Modal>
);

// Progress bar
export const ProgressBar = ({ value, max = 100, color }) => (
  <div className="progress-bar">
    <div className="progress-fill" style={{ width: `${Math.min((value / max) * 100, 100)}%`, ...(color ? { background: color } : {}) }} />
  </div>
);

// Pagination
export const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 24 }}>
      <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>←</Button>
      {Array.from({ length: Math.min(pages, 7) }, (_, i) => i + 1).map((p) => (
        <Button key={p} variant={p === page ? 'primary' : 'ghost'} size="sm" onClick={() => onPageChange(p)}>{p}</Button>
      ))}
      <Button variant="outline" size="sm" disabled={page >= pages} onClick={() => onPageChange(page + 1)}>→</Button>
    </div>
  );
};

// Section header
export const SectionHeader = ({ title, subtitle, action }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, gap: 16 }}>
    <div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 4 }}>{title}</h2>
      {subtitle && <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>{subtitle}</p>}
    </div>
    {action && <div style={{ flexShrink: 0 }}>{action}</div>}
  </div>
);

// Stat card
export const StatCard = ({ icon, label, value, change, color = 'var(--primary)', bg = 'var(--primary-light)' }) => (
  <div className="stat-card">
    <div className="stat-icon" style={{ background: bg }}>
      <span style={{ color, fontSize: 24 }}>{icon}</span>
    </div>
    <div>
      <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--dark-700)' }}>{value}</div>
      <div style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 2 }}>{label}</div>
      {change !== undefined && (
        <div style={{ fontSize: 12, color: change >= 0 ? 'var(--success)' : 'var(--error)', marginTop: 4, fontWeight: 600 }}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </div>
      )}
    </div>
  </div>
);
