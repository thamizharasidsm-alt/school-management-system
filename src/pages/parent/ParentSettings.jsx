import React, { useState, useEffect } from 'react';
import { User, Shield, Check, AlertCircle } from 'lucide-react';

export default function ParentSettings({ parent, onUpdateProfile }) {
  const [student, setStudent] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  
  // Profile form state
  const [name, setName] = useState(parent?.name || '');
  const [email, setEmail] = useState(parent?.email || '');
  const [phone, setPhone] = useState(parent?.phone || '');
  
  // Alert flags
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    // Reset form fields when parent prop updates
    if (parent) {
      setName(parent.name);
      setEmail(parent.email);
      setPhone(parent.phone || '');
    }

    // Look up parent's student from localStorage
    const storedStudents = localStorage.getItem('MOCK_STUDENTS');
    if (storedStudents && parent) {
      const studentsList = JSON.parse(storedStudents);
      const child = studentsList.find(s => s.name === parent.children || s.guardian === parent.name);
      if (child) {
        setStudent(child);
      } else {
        setStudent({
          id: 'STU-24001',
          name: parent.children || 'David Chen',
          grade: 'Grade 4 - A',
          status: 'Active',
          joined: 'Oct 18, 2023',
          avatar: 'https://i.pravatar.cc/150?u=1'
        });
      }
    }
  }, [parent]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSaveSuccess(false);
    setSaveError('');

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setSaveError('All profile fields are required.');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setSaveError('Please enter a valid email address.');
      return;
    }

    // Load MOCK_PARENTS list, find current parent, update details, save back
    const storedParents = localStorage.getItem('MOCK_PARENTS');
    if (storedParents && parent) {
      const parentsList = JSON.parse(storedParents);
      const index = parentsList.findIndex(p => p.id === parent.id);
      
      if (index !== -1) {
        const updatedParent = {
          ...parentsList[index],
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim()
        };

        parentsList[index] = updatedParent;
        localStorage.setItem('MOCK_PARENTS', JSON.stringify(parentsList));
        
        // Notify parent state in App.jsx
        if (onUpdateProfile) {
          onUpdateProfile(updatedParent);
        }

        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setSaveError('Could not find parent record in the system database.');
      }
    }
  };

  return (
    <div className="parent-portal-container animate-fade-in-up">
      {/* Title */}
      <div className="dashboard-title-area">
        <div className="dashboard-title">
          <h1>Account Settings</h1>
          <p>Manage your profile, communication preferences and review linked student accounts.</p>
        </div>
      </div>

      <div className="parent-settings-grid">
        {/* Left Card: Edit Profile */}
        <div className="parent-settings-card">
          <h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={20} color="var(--primary-blue)" />
              <span>Guardian Profile Details</span>
            </div>
          </h3>

          <form onSubmit={handleSaveProfile}>
            {saveSuccess && (
              <div className="parent-alert-success">
                <Check size={16} /> Profile details saved successfully!
              </div>
            )}
            {saveError && (
              <div className="parent-alert-error">
                <AlertCircle size={16} /> {saveError}
              </div>
            )}

            <div className="parent-form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>

            <div className="parent-form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="parent-form-group" style={{ marginBottom: '24px' }}>
              <label>Phone Number</label>
              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 234 567 8901"
                required 
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Save Account Changes
            </button>
          </form>
        </div>

        {/* Right Card: Child Information & Security */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Child Card */}
          {student && (
            <div className="parent-settings-card">
              <h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Shield size={20} color="var(--green-main)" />
                  <span>Linked Student Information</span>
                </div>
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <img 
                  src={student.avatar} 
                  alt={student.name} 
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--green-light)' }} 
                />
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>{student.name}</h4>
                  <span className="grade-badge" style={{ marginTop: '4px', display: 'inline-block' }}>{student.grade}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Student Registration ID:</span>
                  <strong style={{ color: '#0F172A' }}>{student.id}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Enrollment Date:</span>
                  <strong style={{ color: '#0F172A' }}>{student.joined}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                  <strong style={{ color: student.status === 'Active' ? 'var(--green-main)' : 'var(--red-main)' }}>
                    {student.status}
                  </strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>School Board Relationship:</span>
                  <strong style={{ color: '#0F172A' }}>{parent?.relation || 'Guardian'}</strong>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Card */}
          <div className="parent-settings-card">
            <h3 style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={20} color="var(--primary-blue)" />
                <span>System Preferences</span>
              </div>
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--bg-color)', borderRadius: '16px', border: '1px solid #F1F5F9' }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>Dark Mode Theme</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Enable dark colors across the dashboard</p>
              </div>
              <div 
                className={`toggle-switch ${isDarkMode ? 'active' : ''}`} 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                style={{ cursor: 'pointer' }}
              >
                <div className="toggle-circle"></div>
              </div>
            </div>
          </div>

          {/* Settings Info Card */}
          <div className="parent-settings-card" style={{ background: '#F0F9FF', borderColor: '#BAE6FD' }}>
            <h4 style={{ color: '#0369A1', fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Shield size={18} /> Guardian Control Notice
            </h4>
            <p style={{ color: '#0E7490', fontSize: '13px', lineHeight: '1.5' }}>
              Security checks are performed regularly on linked parent accounts. Changes to student enrollment details, transfers, or withdrawals must be processed directly with the school administration registrar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
