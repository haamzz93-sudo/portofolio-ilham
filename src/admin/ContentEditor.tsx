import React, { useState } from 'react';
import { Edit2, Trash2, Plus, X, Save } from 'lucide-react';
import './admin.css';

interface ContentEditorProps {
  title: string;
  items: any[];
  onSave: (items: any[]) => void;
  fields: { key: string; label: string; type: 'text' | 'textarea' | 'number' | 'boolean' }[];
}

export const ContentEditor: React.FC<ContentEditorProps> = ({ title, items, onSave, fields }) => {
  const [localItems, setLocalItems] = useState(items);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditForm({ ...localItems[index] });
    setIsAdding(false);
  };

  const handleDelete = (index: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const newItems = localItems.filter((_, i) => i !== index);
      setLocalItems(newItems);
      onSave(newItems);
    }
  };

  const handleAdd = () => {
    const newItem = fields.reduce((acc, field) => ({ ...acc, [field.key]: field.type === 'boolean' ? false : '' }), { id: Date.now().toString() });
    setEditForm(newItem);
    setEditingIndex(null);
    setIsAdding(true);
  };

  const handleSaveItem = () => {
    let newItems = [...localItems];
    if (isAdding) {
      newItems.push(editForm);
    } else if (editingIndex !== null) {
      newItems[editingIndex] = editForm;
    }
    setLocalItems(newItems);
    onSave(newItems);
    setEditingIndex(null);
    setIsAdding(false);
  };

  return (
    <div className="admin-card">
      <div className="admin-card__header">
        <h3 className="admin-card__title">{title}</h3>
        <button className="admin-btn admin-btn--primary" onClick={handleAdd}>
          <Plus size={16} /> Add New
        </button>
      </div>

      <div className="admin-list">
        {localItems.map((item, index) => (
          <div key={item.id || index} className="admin-list-item">
            <div className="admin-list-item__content">
              <strong>{item.title || item.name || item.company}</strong>
            </div>
            <div className="admin-list-item__actions">
              <button className="admin-btn admin-btn--icon" onClick={() => handleEdit(index)}><Edit2 size={16} /></button>
              <button className="admin-btn admin-btn--icon admin-btn--danger" onClick={() => handleDelete(index)}><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      {(editingIndex !== null || isAdding) && (
        <div className="admin-modal">
          <div className="admin-modal__content">
            <div className="admin-modal__header">
              <h3>{isAdding ? 'Add New' : 'Edit'} Item</h3>
              <button className="admin-btn admin-btn--icon" onClick={() => { setEditingIndex(null); setIsAdding(false); }}><X size={16} /></button>
            </div>
            <div className="admin-form">
              {fields.map(field => (
                <div key={field.key} className="admin-form__group">
                  <label>{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea 
                      value={editForm[field.key] || ''} 
                      onChange={e => setEditForm({...editForm, [field.key]: e.target.value})}
                      className="admin-input"
                    />
                  ) : field.type === 'boolean' ? (
                    <input 
                      type="checkbox" 
                      checked={!!editForm[field.key]} 
                      onChange={e => setEditForm({...editForm, [field.key]: e.target.checked})}
                    />
                  ) : (
                    <input 
                      type={field.type} 
                      value={editForm[field.key] || ''} 
                      onChange={e => setEditForm({...editForm, [field.key]: e.target.value})}
                      className="admin-input"
                    />
                  )}
                </div>
              ))}
              <button className="admin-btn admin-btn--primary admin-btn--full" onClick={handleSaveItem}>
                <Save size={16} /> Save Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
