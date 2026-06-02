'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Camera, RefreshCw, AlertTriangle } from 'lucide-react';

/* ─────────────────────────────────────────────
   ADMIN BUTTON
   Reusable button with variant-based styling
   ───────────────────────────────────────────── */
interface AdminButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  /** Visual style variant */
  variant?: 'primary' | 'ghost' | 'danger' | 'accent' | 'accentSmall' | 'pill' | 'icon';
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  /** Framer Motion hover/tap animation */
  animated?: boolean;
}

const VARIANT_CLASSES: Record<string, string> = {
  primary:
    'relative flex items-center space-x-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-primary-dark font-black uppercase text-[10px] tracking-[0.15em] py-3 px-6 rounded-xl shadow-[0_6px_24px_rgba(34,211,238,0.25)] hover:shadow-[0_10px_32px_rgba(34,211,238,0.4)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden cursor-pointer',
  ghost:
    'w-full flex items-center justify-center space-x-2 font-bold py-2.5 rounded-lg text-[10px] uppercase tracking-widest transition-all cursor-pointer',
  danger:
    'w-full flex items-center justify-center space-x-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold py-2.5 rounded-lg text-[10px] uppercase tracking-widest transition-all border border-red-500/10 cursor-pointer',
  accent:
    'flex items-center space-x-2 bg-accent/10 hover:bg-accent/20 text-accent font-black uppercase tracking-widest rounded-xl border border-accent/20 hover:border-accent/40 transition-all duration-300 text-[10px] py-2.5 px-5 cursor-pointer',
  accentSmall:
    'flex items-center space-x-1 bg-accent/10 hover:bg-accent/20 text-accent font-black uppercase tracking-widest rounded-xl border border-accent/20 hover:border-accent/40 transition-all duration-300 text-[9px] py-2 px-4 cursor-pointer',
  pill:
    'px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer',
  icon:
    'p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/10 transition-opacity duration-200 cursor-pointer',
};

export const AdminButton = ({
  onClick,
  children,
  variant = 'ghost',
  type = 'button',
  disabled = false,
  className = '',
  style,
  title,
  animated = true,
}: AdminButtonProps) => {
  const base = VARIANT_CLASSES[variant] || VARIANT_CLASSES.ghost;

  if (animated) {
    return (
      <motion.button
        type={type}
        onClick={onClick}
        disabled={disabled}
        whileHover={{ scale: disabled ? 1 : 1.04 }}
        whileTap={{ scale: disabled ? 1 : 0.96 }}
        className={`${base} ${className}`}
        style={style}
        title={title}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${className}`}
      style={style}
      title={title}
    >
      {children}
    </button>
  );
};

/* ─────────────────────────────────────────────
   ADMIN INPUT
   Standard text input with label
   ───────────────────────────────────────────── */
interface AdminInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Use 'surface' for top-level section fields, 'deep' for nested card fields */
  variant?: 'surface' | 'deep';
  className?: string;
}

export const AdminInput = ({ label, value, onChange, variant = 'surface', className = '' }: AdminInputProps) => (
  <div className={className}>
    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none ${
        variant === 'deep' ? 'bg-black/20' : 'bg-white/5'
      }`}
    />
  </div>
);

/* ─────────────────────────────────────────────
   ADMIN TEXTAREA
   Standard textarea with label
   ───────────────────────────────────────────── */
interface AdminTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  variant?: 'surface' | 'deep';
  className?: string;
}

export const AdminTextarea = ({ label, value, onChange, rows = 3, variant = 'surface', className = '' }: AdminTextareaProps) => (
  <div className={className}>
    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">{label}</label>
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full border border-white/10 rounded-xl p-3 text-white text-xs focus:outline-none ${
        variant === 'deep' ? 'bg-black/20' : 'bg-white/5'
      }`}
    />
  </div>
);

/* ─────────────────────────────────────────────
   ADMIN SELECT
   Dropdown selector with label
   ───────────────────────────────────────────── */
interface AdminSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
}

export const AdminSelect = ({ label, value, onChange, options, className = '' }: AdminSelectProps) => (
  <div className={className}>
    <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none appearance-none cursor-pointer"
    >
      {options.map(opt => (
        <option key={opt} value={opt} className="bg-gray-900 text-white">{opt}</option>
      ))}
    </select>
  </div>
);

/* ─────────────────────────────────────────────
   SECTION HEADER
   "Title (X Items)" + Add button row
   ───────────────────────────────────────────── */
interface SectionHeaderProps {
  title: string;
  count: number;
  unit?: string;
  addLabel: string;
  onAdd: () => void;
  /** Use 'large' for main section headers, 'compact' for sub-lists */
  size?: 'large' | 'compact';
}

export const SectionHeader = ({ title, count, unit = 'Items', addLabel, onAdd, size = 'large' }: SectionHeaderProps) => (
  <div className={`flex justify-between items-center ${size === 'large' ? 'mb-4' : 'mb-3'}`}>
    <h4 className="text-sm font-bold uppercase tracking-wider text-accent">
      {title} ({count} {unit})
    </h4>
    <AdminButton variant={size === 'compact' ? 'accentSmall' : 'accent'} onClick={onAdd}>
      <Plus size={size === 'compact' ? 12 : 14} />
      <span>{addLabel}</span>
    </AdminButton>
  </div>
);

/* ─────────────────────────────────────────────
   CONFIRM DIALOG
   Custom confirmation modal
   ───────────────────────────────────────────── */
interface ConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
}

export const ConfirmDialog = ({ isOpen, onConfirm, onCancel, title = 'Confirm Action', message = 'Are you sure you want to proceed?' }: ConfirmDialogProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-sm border rounded-2xl p-6 shadow-2xl overflow-hidden"
            style={{ backgroundColor: 'var(--admin-surface)', borderColor: 'var(--admin-border)' }}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight mb-1" style={{ color: 'var(--admin-text)' }}>{title}</h3>
                <p className="text-xs font-semibold" style={{ color: 'var(--admin-text-muted)' }}>{message}</p>
              </div>
              <div className="flex w-full space-x-3 pt-2">
                <AdminButton variant="ghost" onClick={onCancel} className="flex-1 border" style={{ borderColor: 'var(--admin-border)', color: 'var(--admin-text)' }}>
                  Cancel
                </AdminButton>
                <AdminButton variant="danger" onClick={onConfirm} className="flex-1">
                  Delete
                </AdminButton>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* ─────────────────────────────────────────────
   DELETE BUTTON
   Hover-reveal trash icon
   ───────────────────────────────────────────── */
interface DeleteButtonProps {
  onClick: () => void;
  /** Group name for hover reveal (e.g. 'card', 'point', 'feat') */
  groupName: string;
  size?: number;
  title?: string;
}

export const DeleteButton = ({ onClick, groupName, size = 13, title = 'Remove' }: DeleteButtonProps) => {
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    onClick();
  };

  return (
    <>
      <AdminButton
        variant="icon"
        onClick={handleClick}
        className={`opacity-100 md:opacity-70 md:group-hover/${groupName}:opacity-100 shrink-0`}
        title={title}
      >
        <Trash2 size={size} />
      </AdminButton>
      <ConfirmDialog 
        isOpen={showConfirm} 
        onCancel={() => setShowConfirm(false)} 
        onConfirm={handleConfirm} 
        title="Delete Item" 
        message="Are you sure you want to delete this item? This action cannot be undone." 
      />
    </>
  );
};

/* ─────────────────────────────────────────────
   ADMIN CARD
   Animated card with header label + delete
   ───────────────────────────────────────────── */
interface AdminCardProps {
  label: string;
  index: number;
  onDelete: () => void;
  children: React.ReactNode;
  groupName?: string;
}

export const AdminCard = ({ label, index, onDelete, children, groupName = 'card' }: AdminCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.2 }}
    className={`bg-white/3 p-4 rounded-xl border border-white/5 space-y-3 relative group/${groupName}`}
  >
    <div className="flex justify-between items-center">
      <span className="text-xs font-bold text-accent">{label} #{index + 1}</span>
      <DeleteButton onClick={onDelete} groupName={groupName} />
    </div>
    {children}
  </motion.div>
);

/* ─────────────────────────────────────────────
   LIST ITEM ROW
   Animated single-line text item with delete
   (Used for points, why-choose-us, etc.)
   ───────────────────────────────────────────── */
interface ListItemRowProps {
  value: string;
  index: number;
  onChange: (value: string) => void;
  onDelete: () => void;
  groupName?: string;
  showNumber?: boolean;
}

export const ListItemRow = ({ value, index, onChange, onDelete, groupName = 'point', showNumber = true }: ListItemRowProps) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.2 }}
    className={`flex items-center space-x-3 bg-white/3 p-3 rounded-xl border border-white/5 group/${groupName}`}
  >
    {showNumber && (
      <span className="text-xs font-bold text-accent shrink-0 w-8 text-center">#{index + 1}</span>
    )}
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex-grow bg-black/20 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none"
    />
    <DeleteButton onClick={onDelete} groupName={groupName} size={11} />
  </motion.div>
);

/* ─────────────────────────────────────────────
   SECTION FIELDS
   Badge / Title / TitleAccent / Description grid
   (Used at top of every section)
   ───────────────────────────────────────────── */
interface SectionFieldsProps {
  section: string;
  data: any;
  updateField: (section: any, field: string, value: any) => void;
  /** Set true if description should be textarea */
  descriptionAsTextarea?: boolean;
}

export const SectionFields = ({ section, data, updateField, descriptionAsTextarea = false }: SectionFieldsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
    <AdminInput label="Section Badge" value={data.badge || ''} onChange={(v) => updateField(section, 'badge', v)} />
    <AdminInput label="Title Main" value={data.title || ''} onChange={(v) => updateField(section, 'title', v)} />
    <AdminInput label="Title Accent" value={data.titleAccent || ''} onChange={(v) => updateField(section, 'titleAccent', v)} />
    <div className="md:col-span-3">
      {descriptionAsTextarea ? (
        <AdminTextarea label="Section Description" value={data.description || ''} onChange={(v) => updateField(section, 'description', v)} rows={3} />
      ) : (
        <AdminInput label="Section Description" value={data.description || ''} onChange={(v) => updateField(section, 'description', v)} />
      )}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   FEATURE LIST ROW (for pricing sub-features)
   Inline text input with small delete
   ───────────────────────────────────────────── */
interface FeatureListRowProps {
  value: string;
  onChange: (value: string) => void;
  onDelete: () => void;
  groupName?: string;
}

export const FeatureListRow = ({ value, onChange, onDelete, groupName = 'feat' }: FeatureListRowProps) => {
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    onDelete();
  };

  return (
    <div className={`flex items-center space-x-2 group/${groupName}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-grow bg-black/10 hover:bg-black/20 border border-white/5 rounded-lg p-2 text-white text-xs focus:outline-none"
      />
      <AdminButton
        variant="icon"
        onClick={handleDeleteClick}
        className={`opacity-100 md:opacity-70 md:group-hover/${groupName}:opacity-100 !p-1`}
        title="Remove feature"
      >
        <Trash2 size={10} />
      </AdminButton>
      <ConfirmDialog 
        isOpen={showConfirm} 
        onCancel={() => setShowConfirm(false)} 
        onConfirm={handleConfirm} 
        title="Delete Feature" 
        message="Are you sure you want to delete this feature? This action cannot be undone." 
      />
    </div>
  );
};

/* ─────────────────────────────────────────────
   ADMIN IMAGE UPLOAD
   File input with preview & upload functionality
   ───────────────────────────────────────────── */
interface AdminImageUploadProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

import { getAuthToken } from '../../../src/utils/api';

export const AdminImageUpload = ({ label, value, onChange, className = '' }: AdminImageUploadProps) => {
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = getAuthToken();
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Upload failed');
      }

      const data = await res.json();
      onChange(data.url);
    } catch (err: any) {
      setError(err.message || 'Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={className}>
      <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">{label}</label>
      <div className="flex items-center space-x-4">
        {/* Preview */}
        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <Camera size={24} className="text-white/20" />
          )}
          {uploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <RefreshCw size={18} className="animate-spin text-accent" />
            </div>
          )}
        </div>

        {/* Action */}
        <div className="flex-grow space-y-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            accept="image/*"
            className="hidden"
          />
          <div className="flex space-x-2">
            <AdminButton
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="!w-auto !py-2 !px-4 !bg-white/5 hover:!bg-white/10 !text-white"
            >
              Choose Image
            </AdminButton>
            {value && (
              <AdminButton
                variant="danger"
                onClick={() => onChange('')}
                className="!w-auto !py-2 !px-4"
              >
                Clear
              </AdminButton>
            )}
          </div>
          {error && <p className="text-red-400 text-xs font-semibold">{error}</p>}
          <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Supports PNG, JPG, JPEG. Max file size: 5MB.</p>
        </div>
      </div>
    </div>
  );
};
