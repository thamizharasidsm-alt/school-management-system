import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Calendar, 
  Plug,
  Upload,
  User,
  ChevronDown,
  Filter,
  LayoutDashboard,
  Users,
  BookOpen,
  CalendarCheck,
  IndianRupee,
  MessageSquare,
  BarChart2,
  Folder,
  Settings as SettingsIcon,
  CreditCard,
  Eye,
  Check,
  Moon,
  Sun
} from 'lucide-react';

const INITIAL_ROLES_DATA = [
  { name: 'Dashboard', icon: <LayoutDashboard size={16} />, admin: true, teacher: true, staff: true, parent: true },
  { name: 'User Management', icon: <Users size={16} />, admin: true, teacher: false, staff: false, parent: false },
  { name: 'Academic', icon: <BookOpen size={16} />, admin: true, teacher: true, staff: false, parent: false },
  { name: 'Attendance', icon: <CalendarCheck size={16} />, admin: true, teacher: true, staff: true, parent: true },
  { name: 'Fees', icon: <IndianRupee size={16} />, admin: true, teacher: false, staff: false, parent: true },
  { name: 'Reports', icon: <BarChart2 size={16} />, admin: true, teacher: true, staff: false, parent: true },
  { name: 'Documents', icon: <Folder size={16} />, admin: true, teacher: false, staff: false, parent: false },
  { name: 'Settings', icon: <SettingsIcon size={16} />, admin: true, teacher: false, staff: false, parent: false },
];

const INITIAL_ACADEMIC_YEARS_DATA = [
  { year: '2025-2026', duration: '2025/08/01 - 2026/06/30', status: 'Current' },
  { year: '2024-2025', duration: '2025/08/01 - 2026/06/30', status: 'Past' },
  { year: '2023-2024', duration: '2025/08/01 - 2026/06/30', status: 'Past' },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Profile Form State
  const [formData, setFormData] = useState({
    schoolName: 'Lincoin Academy',
    email: 'hfdauiskf2@gmial.com',
    phone: '8493208402q',
    website: 'WWW.lincoinacademy.edu',
    address: '123 Education Drive, Springfield, IL 628501',
    board: 'CBSE',
    establishedYear: '1985'
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Roles State
  const [rolesData, setRolesData] = useState(INITIAL_ROLES_DATA);

  // Academic Year State
  const [academicYears, setAcademicYears] = useState(INITIAL_ACADEMIC_YEARS_DATA);
  const [showAddYearForm, setShowAddYearForm] = useState(false);
  const [newYearData, setNewYearData] = useState({ year: '', duration: '', status: 'Current' });

  // Integration State
  const [integrations, setIntegrations] = useState({
    stripe: { secretKey: 'sk_test_1234567890abcdef', webhookSecret: 'whsec_1234567890abcdef', active: true },
    razorpay: { keyId: 'rzp_live_abc123', keySecret: 'secret_abc123', active: true }
  });
  const [showPassword, setShowPassword] = useState({
    stripeSecret: false,
    stripeWebhook: false,
    razorpayId: false,
    razorpaySecret: false
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Profile Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (isSubmitted) {
      validateForm({ ...formData, [name]: value });
    }
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.schoolName.trim()) errors.schoolName = "School Name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      errors.email = "Invalid email format";
    }

    const phoneRegex = /^\d{10}$/; // expecting 10 digits
    if (!data.phone.trim()) {
      errors.phone = "Phone is required";
    } else if (!phoneRegex.test(data.phone)) {
      errors.phone = "Phone must be exactly 10 digits";
    }

    if (!data.website.trim()) errors.website = "Website is required";
    if (!data.address.trim()) errors.address = "Address is required";
    
    const yearRegex = /^(18|19|20)\d{2}$/;
    if (!data.establishedYear.trim()) {
      errors.establishedYear = "Established Year is required";
    } else if (!yearRegex.test(data.establishedYear)) {
      errors.establishedYear = "Please enter a valid 4-digit year";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (validateForm(formData)) {
      alert("Settings saved successfully!");
    }
  };

  // Roles Handlers
  const handleRoleToggle = (index, role) => {
    const updatedRoles = [...rolesData];
    updatedRoles[index][role] = !updatedRoles[index][role];
    setRolesData(updatedRoles);
  };

  // Academic Year Handlers
  const handleAddYear = () => {
    if (!newYearData.year.trim()) return;
    setAcademicYears([newYearData, ...academicYears]);
    setNewYearData({ year: '', duration: '', status: 'Current' });
    setShowAddYearForm(false);
  };

  // Integration Handlers
  const handleIntegrationToggle = (provider) => {
    setIntegrations(prev => ({
      ...prev,
      [provider]: { ...prev[provider], active: !prev[provider].active }
    }));
  };

  const handleIntegrationChange = (provider, field, value) => {
    setIntegrations(prev => ({
      ...prev,
      [provider]: { ...prev[provider], [field]: value }
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <>
      <div className="dashboard-title-area">
        <div className="dashboard-title">
          <h1>Settings</h1>
          <p>Configure school profile, permisson and integration</p>
        </div>
        <div className="title-actions">
          <button 
            className="btn-outline" 
            onClick={toggleDarkMode}
            style={{ borderRadius: '50%', padding: '10px', width: '42px', height: '42px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Internal Tabs */}
      <div className="fees-tabs-container">
        <button 
          className={`fees-tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <Building2 size={18} /> School Profile
        </button>
        <button 
          className={`fees-tab ${activeTab === 'roles' ? 'active' : ''}`}
          onClick={() => setActiveTab('roles')}
        >
          <ShieldCheck size={18} /> Roles & permission
        </button>
        <button 
          className={`fees-tab ${activeTab === 'academic' ? 'active' : ''}`}
          onClick={() => setActiveTab('academic')}
        >
          <Calendar size={18} /> Academic Year
        </button>
        <button 
          className={`fees-tab ${activeTab === 'integration' ? 'active' : ''}`}
          onClick={() => setActiveTab('integration')}
        >
          <Plug size={18} /> Integration
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="settings-card">
          <h2 className="settings-card-title">School Profile</h2>
          
          <div className="upload-logo-section">
            <div className="upload-avatar-placeholder">
              <User size={32} color="#94A3B8" />
              <button className="upload-btn-mini">
                <Upload size={12} color="white" />
              </button>
            </div>
            <div className="upload-text">
              <h3>Upload Logo</h3>
              <p>PNG or JPG max 2MB</p>
            </div>
          </div>

          <form className="settings-form" onSubmit={handleSubmit}>
            <div className="form-group full-width">
              <label>School Name</label>
              <input 
                type="text" 
                name="schoolName"
                value={formData.schoolName} 
                onChange={handleInputChange} 
                style={{ borderColor: formErrors.schoolName ? 'var(--red-main)' : undefined }}
              />
              {formErrors.schoolName && <span className="error-text" style={{ color: 'var(--red-main)', fontSize: '12px', marginTop: '4px', display: 'block' }}>{formErrors.schoolName}</span>}
            </div>

            <div className="form-group full-width">
              <label>Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email} 
                onChange={handleInputChange} 
                style={{ borderColor: formErrors.email ? 'var(--red-main)' : undefined }}
              />
              {formErrors.email && <span className="error-text" style={{ color: 'var(--red-main)', fontSize: '12px', marginTop: '4px', display: 'block' }}>{formErrors.email}</span>}
            </div>

            <div className="form-row">
              <div className="form-group half-width">
                <label>Phone</label>
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  style={{ borderColor: formErrors.phone ? 'var(--red-main)' : undefined }}
                />
                {formErrors.phone && <span className="error-text" style={{ color: 'var(--red-main)', fontSize: '12px', marginTop: '4px', display: 'block' }}>{formErrors.phone}</span>}
              </div>
              <div className="form-group half-width">
                <label>Website</label>
                <input 
                  type="text" 
                  name="website"
                  value={formData.website} 
                  onChange={handleInputChange} 
                  style={{ borderColor: formErrors.website ? 'var(--red-main)' : undefined }}
                />
                {formErrors.website && <span className="error-text" style={{ color: 'var(--red-main)', fontSize: '12px', marginTop: '4px', display: 'block' }}>{formErrors.website}</span>}
              </div>
            </div>

            <div className="form-group full-width">
              <label>Address</label>
              <input 
                type="text" 
                name="address"
                value={formData.address} 
                onChange={handleInputChange} 
                style={{ borderColor: formErrors.address ? 'var(--red-main)' : undefined }}
              />
              {formErrors.address && <span className="error-text" style={{ color: 'var(--red-main)', fontSize: '12px', marginTop: '4px', display: 'block' }}>{formErrors.address}</span>}
            </div>

            <div className="form-row">
              <div className="form-group half-width">
                <label>Board / Affiliation</label>
                <div className="select-wrapper">
                  <Filter size={16} className="select-icon" />
                  <select 
                    name="board"
                    value={formData.board}
                    onChange={handleInputChange}
                  >
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State Board">State Board</option>
                  </select>
                  <ChevronDown size={16} className="select-arrow" />
                </div>
              </div>
              <div className="form-group half-width">
                <label>Established YEar</label>
                <input 
                  type="text" 
                  name="establishedYear"
                  value={formData.establishedYear} 
                  onChange={handleInputChange} 
                  style={{ borderColor: formErrors.establishedYear ? 'var(--red-main)' : undefined }}
                />
                {formErrors.establishedYear && <span className="error-text" style={{ color: 'var(--red-main)', fontSize: '12px', marginTop: '4px', display: 'block' }}>{formErrors.establishedYear}</span>}
              </div>
            </div>

            <button type="submit" className="btn-primary save-btn">
              Save Changes
            </button>
          </form>
        </div>
      )}

      {activeTab === 'roles' && (
        <div className="settings-card" style={{ padding: '0' }}>
          <table className="permissions-table">
            <thead>
              <tr>
                <th>MODULES</th>
                <th style={{ textAlign: 'center' }}>ADMIN</th>
                <th style={{ textAlign: 'center' }}>TEACHER</th>
                <th style={{ textAlign: 'center' }}>STAFF</th>
                <th style={{ textAlign: 'center' }}>PARENT</th>
              </tr>
            </thead>
            <tbody>
              {rolesData.map((module, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="module-name-wrapper">
                      <div className="module-icon">
                        {module.icon}
                      </div>
                      <span>{module.name}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div className={`toggle-switch ${module.admin ? 'active' : ''}`} onClick={() => handleRoleToggle(idx, 'admin')} style={{ cursor: 'pointer' }}>
                      <div className="toggle-circle"></div>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div className={`toggle-switch ${module.teacher ? 'active' : ''}`} onClick={() => handleRoleToggle(idx, 'teacher')} style={{ cursor: 'pointer' }}>
                      <div className="toggle-circle"></div>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div className={`toggle-switch ${module.staff ? 'active' : ''}`} onClick={() => handleRoleToggle(idx, 'staff')} style={{ cursor: 'pointer' }}>
                      <div className="toggle-circle"></div>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div className={`toggle-switch ${module.parent ? 'active' : ''}`} onClick={() => handleRoleToggle(idx, 'parent')} style={{ cursor: 'pointer' }}>
                      <div className="toggle-circle"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #F1F5F9' }}>
            <button className="btn-primary save-btn" onClick={() => alert('Roles & permissions saved!')} style={{ margin: 0, borderRadius: '8px' }}>
              Save Changes
            </button>
          </div>
        </div>
      )}

      {activeTab === 'academic' && (
        <div className="academic-year-view">
          <div className="academic-year-header">
            <div>
              <h2 className="settings-card-title" style={{ marginBottom: '4px' }}>Academic Years</h2>
              <p style={{ fontSize: '13px', color: '#64748B' }}>Manage school academic year calendar</p>
            </div>
            <button className="btn-primary" style={{ padding: '8px 20px', borderRadius: '8px' }} onClick={() => setShowAddYearForm(!showAddYearForm)}>
              {showAddYearForm ? 'Cancel' : '+ Add Year'}
            </button>
          </div>

          <div className="academic-years-list">
            {showAddYearForm && (
              <div className="academic-year-card animate-fade-in-up" style={{ background: '#F8FAFC', border: '1px dashed #CBD5E1', padding: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ flex: 1, display: 'flex', gap: '12px' }}>
                  <input type="text" placeholder="Year (e.g. 2026-2027)" value={newYearData.year} onChange={e => setNewYearData({...newYearData, year: e.target.value})} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', width: '30%', outline: 'none' }} />
                  <input type="text" placeholder="Duration (e.g. 2026/08/01 - 2027/06/30)" value={newYearData.duration} onChange={e => setNewYearData({...newYearData, duration: e.target.value})} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', flex: 1, outline: 'none' }} />
                  <select value={newYearData.status} onChange={e => setNewYearData({...newYearData, status: e.target.value})} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', width: '25%', outline: 'none' }}>
                    <option value="Current">Current</option>
                    <option value="Past">Past</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>
                <button className="btn-primary" onClick={handleAddYear} style={{ padding: '8px 20px', borderRadius: '8px' }}>Save</button>
              </div>
            )}
            {academicYears.map((item, idx) => (
              <div key={idx} className="academic-year-card">
                <div className="academic-year-info">
                  <div className="module-icon" style={{ borderRadius: '12px' }}>
                    <Users size={18} />
                  </div>
                  <div>
                    <h3>{item.year}</h3>
                    <p>{item.duration}</p>
                  </div>
                </div>
                <div className={`academic-badge ${item.status.toLowerCase()}`}>
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'integration' && (
        <div className="integration-view">
          <div className="integration-cards">
            
            {/* Stripe Card */}
            <div className="integration-card">
              <div className="integration-header">
                <div className="integration-info">
                  <div className="module-icon" style={{ borderRadius: '12px' }}>
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <h3>Stripe</h3>
                    <p>Accept online fee payments via cards</p>
                  </div>
                </div>
                <div className={`toggle-switch ${integrations.stripe.active ? 'active' : ''}`} onClick={() => handleIntegrationToggle('stripe')} style={{ cursor: 'pointer' }}>
                  <div className="toggle-circle"></div>
                </div>
              </div>
              <div className="integration-form">
                <div className="form-group full-width">
                  <label>Secret Key</label>
                  <div className="input-with-icon">
                    <input type={showPassword.stripeSecret ? "text" : "password"} value={integrations.stripe.secretKey} onChange={(e) => handleIntegrationChange('stripe', 'secretKey', e.target.value)} />
                    <Eye size={16} className="input-icon-right" onClick={() => togglePasswordVisibility('stripeSecret')} style={{ cursor: 'pointer' }} />
                  </div>
                </div>
                <div className="form-group full-width">
                  <label>WebHook Secret</label>
                  <div className="input-with-icon">
                    <input type={showPassword.stripeWebhook ? "text" : "password"} value={integrations.stripe.webhookSecret} onChange={(e) => handleIntegrationChange('stripe', 'webhookSecret', e.target.value)} />
                    <Eye size={16} className="input-icon-right" onClick={() => togglePasswordVisibility('stripeWebhook')} style={{ cursor: 'pointer' }} />
                  </div>
                </div>
                <button className="btn-primary integration-save" onClick={() => alert('Stripe settings saved!')} style={{ borderRadius: '8px' }}>
                  <Check size={16} /> Save
                </button>
              </div>
            </div>

            {/* Razorpay Card */}
            <div className="integration-card">
              <div className="integration-header">
                <div className="integration-info">
                  <div className="module-icon" style={{ borderRadius: '12px' }}>
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <h3>Razorpay</h3>
                    <p>Indian payment gateway for fees collect</p>
                  </div>
                </div>
                <div className={`toggle-switch ${integrations.razorpay.active ? 'active' : ''}`} onClick={() => handleIntegrationToggle('razorpay')} style={{ cursor: 'pointer' }}>
                  <div className="toggle-circle"></div>
                </div>
              </div>
              <div className="integration-form">
                <div className="form-group full-width">
                  <label>Key ID</label>
                  <div className="input-with-icon">
                    <input type={showPassword.razorpayId ? "text" : "password"} value={integrations.razorpay.keyId} onChange={(e) => handleIntegrationChange('razorpay', 'keyId', e.target.value)} />
                    <Eye size={16} className="input-icon-right" onClick={() => togglePasswordVisibility('razorpayId')} style={{ cursor: 'pointer' }} />
                  </div>
                </div>
                <div className="form-group full-width">
                  <label>Key Secret</label>
                  <div className="input-with-icon">
                    <input type={showPassword.razorpaySecret ? "text" : "password"} value={integrations.razorpay.keySecret} onChange={(e) => handleIntegrationChange('razorpay', 'keySecret', e.target.value)} />
                    <Eye size={16} className="input-icon-right" onClick={() => togglePasswordVisibility('razorpaySecret')} style={{ cursor: 'pointer' }} />
                  </div>
                </div>
                <button className="btn-primary integration-save" onClick={() => alert('Razorpay settings saved!')} style={{ borderRadius: '8px' }}>
                  <Check size={16} /> Save
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
