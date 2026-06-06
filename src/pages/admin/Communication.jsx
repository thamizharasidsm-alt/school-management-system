import React, { useState } from 'react';
import CommunicationNotifications from './CommunicationNotifications';
import CommunicationBroadcast from './CommunicationBroadcast';
import { 
  Megaphone, 
  Bell, 
  Radio, 
  Plus, 
  User,
  Calendar,
  Clock,
  X
} from 'lucide-react';

const MOCK_ANNOUNCEMENTS = [
  { 
    id: 1, 
    title: 'Annual sports Day 2026', 
    priority: 'High', 
    status: 'Published',
    description: 'We are excited to announce our annual sports day on April 25th. All students are encouraged to participate in atleast one event. Practice Sessions start from Monday.',
    audience: 'Everyone',
    date: '2026-04-10',
    author: 'By principal Johnson',
    expires: 'Expires 2026-04-25',
    color: 'red'
  },
  { 
    id: 2, 
    title: 'Parent teacher conference schedula', 
    priority: 'Medium', 
    status: 'Published',
    description: 'The parent teacher conference is scheduled for April 20th.. Please book your slot via the parent portal. Sessions run from 9AM to 5PM.',
    audience: 'Parent, Staff',
    date: '2026-04-08',
    author: 'By Admin office',
    expires: null,
    color: 'orange'
  },
  { 
    id: 3, 
    title: 'Library Book Return Reminder', 
    priority: 'Low', 
    status: 'Published',
    description: 'The parent teacher conference is scheduled for April 20th.. Please book your slot via the parent portal. Sessions run from 9AM to 5PM.',
    audience: 'Student',
    date: '2026-04-08',
    author: 'By Library staff',
    expires: null,
    color: 'gray'
  },
  { 
    id: 4, 
    title: 'Science Fair Registration open', 
    priority: 'Medium', 
    status: 'Published',
    description: 'The parent teacher conference is scheduled for April 20th.. Please book your slot via the parent portal. Sessions run from 9AM to 5PM.',
    audience: 'Student',
    date: '2026-04-08',
    author: 'By Science department',
    expires: null,
    color: 'orange'
  }
];

export default function Communication() {
  const [activeTab, setActiveTab] = useState('announcements');
  const [announcements, setAnnouncements] = useState(MOCK_ANNOUNCEMENTS);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', priority: 'Medium', audience: 'Everyone', description: '', expires: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    else if (formData.title.trim().length < 5) newErrors.title = 'Title must be at least 5 characters';
    
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    else if (formData.description.trim().length < 10) newErrors.description = 'Description must be at least 10 characters';
    
    if (formData.expires) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const expDate = new Date(formData.expires);
      if (expDate < today) newErrors.expires = 'Expiry date cannot be in the past';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateAnnouncement = () => {
    if (validateForm()) {
      const newAnn = {
        id: Date.now(),
        title: formData.title,
        priority: formData.priority,
        status: 'Published',
        description: formData.description,
        audience: formData.audience,
        date: new Date().toISOString().split('T')[0],
        author: 'By Admin office',
        expires: formData.expires ? `Expires ${formData.expires}` : null,
        color: formData.priority === 'High' ? 'red' : formData.priority === 'Medium' ? 'orange' : 'gray'
      };
      setAnnouncements([newAnn, ...announcements]);
      setIsModalOpen(false);
      setFormData({ title: '', priority: 'Medium', audience: 'Everyone', description: '', expires: '' });
      setErrors({});
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'var(--red-main)';
      case 'Medium': return 'var(--yellow-main)';
      case 'Low': return '#64748B'; // slate
      default: return '#64748B';
    }
  };

  const getBorderColor = (color) => {
    switch(color) {
      case 'red': return 'var(--red-main)';
      case 'orange': return 'var(--yellow-main)'; // The image shows orange, we'll map to yellow or a specific hex
      case 'gray': return '#64748B';
      default: return 'var(--blue-main)';
    }
  };

  return (
    <>
      <div className="dashboard-title-area">
        <div className="dashboard-title">
          <h1>Communication</h1>
          <p>Announcements, notifications and broadcasts</p>
        </div>
        <div className="title-actions">
          <button className="btn-primary" onClick={() => { setIsModalOpen(true); setErrors({}); }}>
            <Plus size={18} /> New Announcement
          </button>
        </div>
      </div>

      <div className="fees-tabs-container">
        <button 
          className={`fees-tab ${activeTab === 'announcements' ? 'active' : ''}`}
          onClick={() => setActiveTab('announcements')}
        >
          <Megaphone size={18} /> Announcements
        </button>
        <button 
          className={`fees-tab ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          <Bell size={18} /> Notifications
        </button>
        <button 
          className={`fees-tab ${activeTab === 'broadcast' ? 'active' : ''}`}
          onClick={() => setActiveTab('broadcast')}
        >
          <Radio size={18} /> Broadcast
        </button>
      </div>

      {activeTab === 'announcements' && (
        <div className="announcements-list">
          {announcements.map(announcement => (
            <div 
              key={announcement.id} 
              className="announcement-card"
              style={{ borderLeftColor: announcement.color === 'orange' ? '#F97316' : getBorderColor(announcement.color) }}
            >
              <div className="announcement-header">
                <h2>{announcement.title}</h2>
                <div className="announcement-badges">
                  <span 
                    className="priority-badge" 
                    style={{ 
                      color: announcement.color === 'orange' ? '#F97316' : getPriorityColor(announcement.priority), 
                      borderColor: announcement.color === 'orange' ? '#F97316' : getPriorityColor(announcement.priority) 
                    }}
                  >
                    {announcement.priority}
                  </span>
                  <span className="status-badge-solid">
                    {announcement.status}
                  </span>
                </div>
              </div>
              
              <p className="announcement-desc">
                {announcement.description}
              </p>

              <div className="announcement-footer">
                <div className="footer-meta">
                  <User size={14} /> {announcement.audience}
                </div>
                <div className="footer-meta">
                  <Calendar size={14} /> {announcement.date}
                </div>
                <div className="footer-meta">
                  {announcement.author}
                </div>
                {announcement.expires && (
                  <div className="footer-meta">
                    <Clock size={14} /> {announcement.expires}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'notifications' && <CommunicationNotifications />}
      {activeTab === 'broadcast' && <CommunicationBroadcast />}

      {isModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '500px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#0F172A' }}>New Announcement</h2>
              <X style={{ cursor: 'pointer', color: '#64748B' }} onClick={() => setIsModalOpen(false)} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Title <span style={{color: '#EF4444'}}>*</span></label>
                <input 
                  type="text" 
                  placeholder="e.g. School Assembly Schedule" 
                  style={{ padding: '10px 12px', borderRadius: '8px', border: `1px solid ${errors.title ? '#EF4444' : '#E2E8F0'}`, outline: 'none' }} 
                  value={formData.title} 
                  onChange={e => { setFormData({...formData, title: e.target.value}); if (errors.title) setErrors({...errors, title: ''}); }} 
                />
                {errors.title && <span style={{ color: '#EF4444', fontSize: '12px' }}>{errors.title}</span>}
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Priority <span style={{color: '#EF4444'}}>*</span></label>
                  <select 
                    style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', background: 'white' }}
                    value={formData.priority}
                    onChange={e => setFormData({...formData, priority: e.target.value})}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Audience <span style={{color: '#EF4444'}}>*</span></label>
                  <select 
                    style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', background: 'white' }}
                    value={formData.audience}
                    onChange={e => setFormData({...formData, audience: e.target.value})}
                  >
                    <option value="Everyone">Everyone</option>
                    <option value="Student">Student</option>
                    <option value="Parent">Parent</option>
                    <option value="Staff">Staff</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Description <span style={{color: '#EF4444'}}>*</span></label>
                <textarea 
                  rows="4"
                  placeholder="Enter announcement details..." 
                  style={{ padding: '10px 12px', borderRadius: '8px', border: `1px solid ${errors.description ? '#EF4444' : '#E2E8F0'}`, outline: 'none', resize: 'vertical' }} 
                  value={formData.description} 
                  onChange={e => { setFormData({...formData, description: e.target.value}); if (errors.description) setErrors({...errors, description: ''}); }} 
                />
                {errors.description && <span style={{ color: '#EF4444', fontSize: '12px' }}>{errors.description}</span>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Expiry Date (Optional)</label>
                <input 
                  type="date" 
                  style={{ padding: '10px 12px', borderRadius: '8px', border: `1px solid ${errors.expires ? '#EF4444' : '#E2E8F0'}`, outline: 'none' }} 
                  value={formData.expires} 
                  onChange={e => { setFormData({...formData, expires: e.target.value}); if (errors.expires) setErrors({...errors, expires: ''}); }} 
                />
                {errors.expires && <span style={{ color: '#EF4444', fontSize: '12px' }}>{errors.expires}</span>}
              </div>

              <button 
                className="btn-primary" 
                style={{ marginTop: '16px', justifyContent: 'center', width: '100%', padding: '12px' }} 
                onClick={handleCreateAnnouncement}
              >
                Publish Announcement
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
