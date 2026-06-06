import React, { useState } from 'react';
import FeesPayment, { PAYMENT_RECORDS } from './FeesPayment';
import FeesPending, { PENDING_RECORDS } from './FeesPending';
import { 
  Download, 
  CheckCircle2, 
  IndianRupee, 
  Home,
  BookText,
  CreditCard,
  AlertCircle,
  Layers,
  Pencil,
  Trash2,
  X
} from 'lucide-react';

export const MOCK_FEES = [
  { id: 1, title: 'Tution Fee', grade: 'Grade 3-5', amount: '$5,200', frequency: 'Annual' },
  { id: 2, title: 'Activity Fee', grade: 'Grade 3-8', amount: '$800', frequency: 'Annual' },
  { id: 3, title: 'Transport Fee', grade: 'Grade 3-8', amount: '$1,200', frequency: 'Annual' },
  { id: 4, title: 'Library Fee', grade: 'Grade 3-8', amount: '$400', frequency: 'Annual' },
  { id: 5, title: 'Lab Fee', grade: 'Grade 6-8', amount: '$600', frequency: 'Annual' },
  { id: 6, title: 'Sports Fee', grade: 'Grade 3-8', amount: '$350', frequency: 'Quartely' },
];

export default function Fees() {
  const [activeTab, setActiveTab] = useState('structure');
  const [fees, setFees] = useState(MOCK_FEES);
  const [editingFee, setEditingFee] = useState(null);
  const [formError, setFormError] = useState('');

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this fee category?")) {
      setFees(fees.filter(fee => fee.id !== id));
    }
  };

  const handleEditSave = () => {
    if (!editingFee.title.trim() || !editingFee.grade.trim() || !editingFee.amount.trim() || !editingFee.frequency.trim()) {
      setFormError('All fields are required.');
      return;
    }
    
    setFees(fees.map(fee => fee.id === editingFee.id ? editingFee : fee));
    setEditingFee(null);
    setFormError('');
  };

  const handleDownload = () => {
    let rawData = [];
    if (activeTab === 'structure') rawData = fees;
    else if (activeTab === 'payments') rawData = PAYMENT_RECORDS;
    else rawData = PENDING_RECORDS;
    
    if (rawData.length === 0) return;
    
    const headers = Object.keys(rawData[0]).join(',');
    const csvRows = rawData.map(row => Object.values(row).map(val => `"${val}"`).join(','));
    const csvContent = [headers, ...csvRows].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fees_${activeTab}_data.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="dashboard-title-area">
        <div className="dashboard-title">
          <h1>Fee Management</h1>
          <p>Track fees structure, payments and pending.</p>
        </div>
        <div className="title-actions">
          <button className="btn-outline" onClick={handleDownload}>
            <Download size={18} /> Export Excel
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="attendance-summary">
        <div className="att-summary-card present" style={{ padding: '28px 24px' }}>
          <div className="att-icon-wrapper">
            <CheckCircle2 size={24} />
          </div>
          <div className="att-info">
            <h2>$25,200</h2>
            <p>Total collected</p>
          </div>
        </div>

        <div className="att-summary-card late" style={{ padding: '28px 24px' }}>
          <div className="att-icon-wrapper">
            <IndianRupee size={24} />
          </div>
          <div className="att-info">
            <h2>$11,800</h2>
            <p>Pending/Partial</p>
          </div>
        </div>

        <div className="att-summary-card absent" style={{ padding: '28px 24px' }}>
          <div className="att-icon-wrapper">
            <Home size={24} />
          </div>
          <div className="att-info">
            <h2>$6,6000</h2>
            <p>Total overdue</p>
          </div>
        </div>
      </div>

      {/* Internal Tabs */}
      <div className="fees-tabs-container">
        <button 
          className={`fees-tab ${activeTab === 'structure' ? 'active' : ''}`}
          onClick={() => setActiveTab('structure')}
        >
          <BookText size={18} /> Fee Structure
        </button>
        <button 
          className={`fees-tab ${activeTab === 'payments' ? 'active' : ''}`}
          onClick={() => setActiveTab('payments')}
        >
          <CreditCard size={18} /> Payments
        </button>
        <button 
          className={`fees-tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          <AlertCircle size={18} /> Pending dues
        </button>
      </div>

      {activeTab === 'structure' && (
        <div className="fee-categories-section">
          <div className="section-header" style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0F172A', marginBottom: '4px' }}>Fee Categories</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Define and manage school fee categories</p>
          </div>

          <div className="classes-grid">
            {fees.map(fee => (
              <div key={fee.id} className="class-card fee-card">
                <div className="class-card-header">
                  <div className="fee-icon-title">
                    <div className="class-icon" style={{ width: '40px', height: '40px' }}>
                      <Layers size={18} />
                    </div>
                    <div>
                      <h3 className="class-title" style={{ fontSize: '15px' }}>{fee.title}</h3>
                      <p className="class-room" style={{ margin: 0, fontSize: '12px' }}>{fee.grade}</p>
                    </div>
                  </div>
                  <div className="class-actions">
                    <button className="action-btn edit" onClick={() => { setEditingFee(fee); setFormError(''); }}><Pencil size={16} /></button>
                    <button className="action-btn delete" onClick={() => handleDelete(fee.id)}><Trash2 size={16} /></button>
                  </div>
                </div>
                
                <div className="fee-details" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A' }}>{fee.amount}</h2>
                  <span className={`fee-badge ${fee.frequency === 'Annual' ? 'green' : 'purple'}`}>
                    {fee.frequency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'payments' && <FeesPayment />}
      {activeTab === 'pending' && <FeesPending />}

      {editingFee && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#0F172A' }}>Edit Fee Category</h2>
              <X style={{ cursor: 'pointer', color: '#64748B' }} onClick={() => { setEditingFee(null); setFormError(''); }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {formError && (
                <div style={{ color: '#EF4444', fontSize: '13px', backgroundColor: '#FEF2F2', padding: '10px', borderRadius: '6px', border: '1px solid #FCA5A5' }}>
                  {formError}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Fee Title</label>
                <input type="text" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingFee.title} onChange={e => setEditingFee({...editingFee, title: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Applicable Grade</label>
                <input type="text" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingFee.grade} onChange={e => setEditingFee({...editingFee, grade: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Amount</label>
                <input type="text" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingFee.amount} onChange={e => setEditingFee({...editingFee, amount: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Frequency</label>
                <select style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', background: 'white' }} value={editingFee.frequency} onChange={e => setEditingFee({...editingFee, frequency: e.target.value})}>
                  <option value="Annual">Annual</option>
                  <option value="Quartely">Quarterly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="One-time">One-time</option>
                </select>
              </div>
              
              <button 
                className="btn-primary" 
                style={{ marginTop: '16px', justifyContent: 'center', width: '100%', padding: '12px' }} 
                onClick={handleEditSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
