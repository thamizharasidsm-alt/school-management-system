import React, { useState } from 'react';
import { Upload, Plus, Search, Filter, Pencil, Trash2, X, Download } from 'lucide-react';
import { MOCK_CLASSES } from './Academic';

export const MOCK_STUDENTS = [
  { id: 'STU-24001', name: 'Alex Johnson', email: 'alex.j@example.com', grade: 'Grade 5 - A', guardian: 'Michael Johnson', relation: 'Father', status: 'Active', joined: 'Oct 24, 2023', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267041' },
  { id: 'STU-24002', name: 'Sarah Williams', email: 'sarah.w@example.com', grade: 'Grade 6 - B', guardian: 'Emma Williams', relation: 'Mother', status: 'Inactive', joined: 'Oct 22, 2023', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267042' },
  { id: 'STU-24003', name: 'David Chen', email: 'david.c@example.com', grade: 'Grade 4 - A', guardian: 'Robert Chen', relation: 'Father', status: 'Active', joined: 'Oct 18, 2023', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267043' },
  { id: 'STU-24004', name: 'Maya Patel', email: 'maya.p@example.com', grade: 'Grade 7 - C', guardian: 'Sanjay Patel', relation: 'Father', status: 'Active', joined: 'Oct 15, 2023', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267044' },
  { id: 'STU-24005', name: 'Lucas Silva', email: 'lucas.s@example.com', grade: 'Grade 5 - A', guardian: 'Maria Silva', relation: 'Mother', status: 'Active', joined: 'Oct 10, 2023', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267045' },
  { id: 'STU-24006', name: 'Amina Okafor', email: 'amina.o@example.com', grade: 'Grade 8 - A', guardian: 'Chinedu Okafor', relation: 'Father', status: 'Active', joined: 'Oct 08, 2023', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267046' },
  { id: 'STU-24007', name: 'Omar Hassan', email: 'omar.h@example.com', grade: 'Grade 4 - B', guardian: 'Layla Hassan', relation: 'Mother', status: 'Active', joined: 'Oct 06, 2023', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267047' },
  { id: 'STU-24008', name: 'Emma Davis', email: 'emma.d@example.com', grade: 'Grade 6 - A', guardian: 'James Davis', relation: 'Father', status: 'Inactive', joined: 'Oct 02, 2023', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267048' },
  { id: 'STU-24009', name: 'Liam Wilson', email: 'liam.w@example.com', grade: 'Grade 5 - C', guardian: 'Sophia Wilson', relation: 'Mother', status: 'Active', joined: 'Sep 28, 2023', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267049' },
  { id: 'STU-24010', name: 'Mia Taylor', email: 'mia.t@example.com', grade: 'Grade 7 - A', guardian: 'William Taylor', relation: 'Father', status: 'Active', joined: 'Sep 25, 2023', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267050' },
];

export const MOCK_STAFF = [
  { id: 'STF-1001', name: 'John Smith', email: 'john.s@example.com', department: 'Mathematics', role: 'Senior Teacher', status: 'Active', joined: 'Aug 15, 2020', avatar: 'https://i.pravatar.cc/150?u=b042581f4e290267041' },
  { id: 'STF-1002', name: 'Emily Brown', email: 'emily.b@example.com', department: 'Science', role: 'Teacher', status: 'Active', joined: 'Jan 10, 2021', avatar: 'https://i.pravatar.cc/150?u=b042581f4e290267042' },
  { id: 'STF-1003', name: 'Michael Lee', email: 'michael.l@example.com', department: 'Administration', role: 'Principal', status: 'Active', joined: 'Jul 01, 2015', avatar: 'https://i.pravatar.cc/150?u=b042581f4e290267043' },
  { id: 'STF-1004', name: 'Sarah Connor', email: 'sarah.c@example.com', department: 'Physical Education', role: 'Coach', status: 'Inactive', joined: 'Feb 20, 2022', avatar: 'https://i.pravatar.cc/150?u=b042581f4e290267044' },
  { id: 'STF-1005', name: 'James Porter', email: 'james.p@example.com', department: 'Arts', role: 'Teacher', status: 'Active', joined: 'Sep 05, 2023', avatar: 'https://i.pravatar.cc/150?u=b042581f4e290267045' },
];

const MOCK_PARENTS = [
  { id: 'PAR-5001', name: 'Michael Johnson', email: 'm.johnson@example.com', phone: '+1 234 567 8901', children: 'Alex Johnson', status: 'Active', joined: 'Oct 24, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267041' },
  { id: 'PAR-5002', name: 'Emma Williams', email: 'e.williams@example.com', phone: '+1 234 567 8902', children: 'Sarah Williams', status: 'Active', joined: 'Oct 22, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267042' },
  { id: 'PAR-5003', name: 'Robert Chen', email: 'r.chen@example.com', phone: '+1 234 567 8903', children: 'David Chen', status: 'Active', joined: 'Oct 18, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267043' },
  { id: 'PAR-5004', name: 'Sanjay Patel', email: 's.patel@example.com', phone: '+1 234 567 8904', children: 'Maya Patel', status: 'Active', joined: 'Oct 15, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267044' },
  { id: 'PAR-5005', name: 'Maria Silva', email: 'm.silva@example.com', phone: '+1 234 567 8905', children: 'Lucas Silva', status: 'Active', joined: 'Oct 10, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267045' },
  { id: 'PAR-5006', name: 'Chinedu Okafor', email: 'c.okafor@example.com', phone: '+1 234 567 8906', children: 'Amina Okafor', status: 'Active', joined: 'Oct 08, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267046' },
  { id: 'PAR-5007', name: 'Layla Hassan', email: 'l.hassan@example.com', phone: '+1 234 567 8907', children: 'Omar Hassan', status: 'Active', joined: 'Oct 06, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267047' },
  { id: 'PAR-5008', name: 'James Davis', email: 'j.davis@example.com', phone: '+1 234 567 8908', children: 'Emma Davis', status: 'Active', joined: 'Oct 02, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267048' },
  { id: 'PAR-5009', name: 'Sophia Wilson', email: 's.wilson@example.com', phone: '+1 234 567 8909', children: 'Liam Wilson', status: 'Active', joined: 'Sep 28, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267049' },
  { id: 'PAR-5010', name: 'William Taylor', email: 'w.taylor@example.com', phone: '+1 234 567 8910', children: 'Mia Taylor', status: 'Active', joined: 'Sep 25, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267050' },
];

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [gradeFilter, setGradeFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [addType, setAddType] = useState('student');
  const [newStudentFormData, setNewStudentFormData] = useState({ name: '', email: '', grade: '', guardian: '' });
  const [newStaffFormData, setNewStaffFormData] = useState({ name: '', email: '', department: '', role: '' });
  const [newParentFormData, setNewParentFormData] = useState({ name: '', email: '', phone: '', children: '' });
  const [editingStudent, setEditingStudent] = useState(null);
  const [editingStaff, setEditingStaff] = useState(null);
  const [editingParent, setEditingParent] = useState(null);
  const [formError, setFormError] = useState('');
  const [updateFlag, setUpdateFlag] = useState(0);

  const filterData = (data) => {
    return data.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      
      let matchesGrade = true;
      if (gradeFilter !== 'All') {
        if (activeTab === 'students') matchesGrade = item.grade === gradeFilter;
        else if (activeTab === 'staff') matchesGrade = item.department === gradeFilter;
      }
      
      return matchesSearch && matchesStatus && matchesGrade;
    });
  };

  const getFilterOptions = () => {
    let options = [];
    if (activeTab === 'students') {
      options = [...new Set(MOCK_CLASSES.map(cls => `${cls.grade} - ${cls.section}`))];
    } else if (activeTab === 'staff') {
      options = [...new Set(MOCK_STAFF.map(s => s.department))];
    }
    return options;
  };

  const handleDownload = () => {
    let rawData = [];
    if (activeTab === 'students') rawData = MOCK_STUDENTS;
    else if (activeTab === 'staff') rawData = MOCK_STAFF;
    else rawData = MOCK_PARENTS;
    
    const dataToExport = filterData(rawData);
    
    if (dataToExport.length === 0) return;
    
    const headers = Object.keys(dataToExport[0]).join(',');
    const csvRows = dataToExport.map(row => Object.values(row).map(val => `"${val}"`).join(','));
    const csvContent = [headers, ...csvRows].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTab}_data.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="dashboard-title-area">
        <div className="dashboard-title">
          <h1>User Management</h1>
          <p>Manage Students, Staffs and parents across the school</p>
        </div>
        <div className="title-actions">
          <button className="btn-outline" onClick={handleDownload}>
            <Download size={18} /> Export Excel
          </button>
          <div style={{ position: 'relative' }}>
            <button className="btn-primary" onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}>
              <Plus size={18} /> Add
            </button>
            {isAddMenuOpen && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, width: '150px' }}>
                <button style={{ display: 'block', width: '100%', padding: '10px 16px', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', borderBottom: '1px solid #F1F5F9' }} onClick={() => { setAddType('student'); setIsAddModalOpen(true); setIsAddMenuOpen(false); setFormError(''); }}>Add Student</button>
                <button style={{ display: 'block', width: '100%', padding: '10px 16px', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', borderBottom: '1px solid #F1F5F9' }} onClick={() => { setAddType('staff'); setIsAddModalOpen(true); setIsAddMenuOpen(false); setFormError(''); }}>Add Staff</button>
                <button style={{ display: 'block', width: '100%', padding: '10px 16px', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px' }} onClick={() => { setAddType('parent'); setIsAddModalOpen(true); setIsAddMenuOpen(false); setFormError(''); }}>Add Parent</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="tab-pills">
        <button 
          className={`tab-pill students ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          Students <span className="tab-count">{MOCK_STUDENTS.length < 10 ? `0${MOCK_STUDENTS.length}` : MOCK_STUDENTS.length}</span>
        </button>
        <button 
          className={`tab-pill staff ${activeTab === 'staff' ? 'active' : ''}`}
          onClick={() => setActiveTab('staff')}
        >
          Staff <span className="tab-count">{MOCK_STAFF.length < 10 ? `0${MOCK_STAFF.length}` : MOCK_STAFF.length}</span>
        </button>
        <button 
          className={`tab-pill parents ${activeTab === 'parents' ? 'active' : ''}`}
          onClick={() => setActiveTab('parents')}
        >
          Parents <span className="tab-count">{MOCK_PARENTS.length < 10 ? `0${MOCK_PARENTS.length}` : MOCK_PARENTS.length}</span>
        </button>
      </div>

      <div className="table-controls">
        <div className="table-search">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="table-filters">
          {activeTab !== 'parents' && (
            <select 
              className="filter-btn" 
              style={{ appearance: 'none', background: 'white', border: '1px solid #E2E8F0', padding: '10px 16px', borderRadius: '20px', color: '#64748B', fontWeight: 500, cursor: 'pointer' }}
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
            >
              <option value="All">{activeTab === 'students' ? 'All Grades' : 'All Departments'}</option>
              {getFilterOptions().map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          )}
          <select 
            className="filter-btn" 
            style={{ appearance: 'none', background: 'white', border: '1px solid #E2E8F0', padding: '10px 16px', borderRadius: '20px', color: '#64748B', fontWeight: 500, cursor: 'pointer' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>{activeTab === 'students' ? 'STUDENT' : activeTab === 'staff' ? 'STAFF' : 'PARENT'} DETAILS</th>
              <th>{activeTab === 'students' ? 'STUDENT' : activeTab === 'staff' ? 'STAFF' : 'PARENT'} ID</th>
              <th>{activeTab === 'students' ? 'GRADE/CLASS' : activeTab === 'staff' ? 'DEPARTMENT' : 'PHONE'}</th>
              <th>{activeTab === 'students' ? 'GUARDIAN' : activeTab === 'staff' ? 'ROLE' : 'CHILDREN'}</th>
              <th>STATUS</th>
              <th>JOINED DATE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {activeTab === 'students' && filterData(MOCK_STUDENTS).map(student => (
              <tr key={student.id}>
                <td>
                  <div className="user-info-cell">
                    <img src={student.avatar} alt={student.name} />
                    <div className="user-info-text">
                      <span className="user-name">{student.name}</span>
                      <span className="user-email">{student.email}</span>
                    </div>
                  </div>
                </td>
                <td>{student.id}</td>
                <td><span className="grade-badge">{student.grade}</span></td>
                <td>
                  <div className="guardian-cell">
                    <span className="guardian-name">{student.guardian}</span>
                    <span className="guardian-relation">{student.relation}</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${student.status.toLowerCase()}`}>
                    <span className="status-dot"></span> {student.status}
                  </span>
                </td>
                <td>{student.joined}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn edit" onClick={() => { setEditingStudent(student); setFormError(''); }}>
                      <Pencil size={16} />
                    </button>
                    <button className="action-btn delete" onClick={() => {
                      if (window.confirm("Are you sure you want to delete this student?")) {
                        const index = MOCK_STUDENTS.findIndex(s => s.id === student.id);
                        if (index !== -1) MOCK_STUDENTS.splice(index, 1);
                        setUpdateFlag(prev => prev + 1);
                      }
                    }}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            
            {activeTab === 'staff' && filterData(MOCK_STAFF).map(staff => (
              <tr key={staff.id}>
                <td>
                  <div className="user-info-cell">
                    <img src={staff.avatar} alt={staff.name} />
                    <div className="user-info-text">
                      <span className="user-name">{staff.name}</span>
                      <span className="user-email">{staff.email}</span>
                    </div>
                  </div>
                </td>
                <td>{staff.id}</td>
                <td>{staff.department}</td>
                <td>{staff.role}</td>
                <td>
                  <span className={`status-badge ${staff.status.toLowerCase()}`}>
                    <span className="status-dot"></span> {staff.status}
                  </span>
                </td>
                <td>{staff.joined}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn edit" onClick={() => { setEditingStaff(staff); setFormError(''); }}><Pencil size={16} /></button>
                    <button className="action-btn delete" onClick={() => {
                      if (window.confirm("Are you sure you want to delete this staff member?")) {
                        const index = MOCK_STAFF.findIndex(s => s.id === staff.id);
                        if (index !== -1) MOCK_STAFF.splice(index, 1);
                        setUpdateFlag(prev => prev + 1);
                      }
                    }}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}

            {activeTab === 'parents' && filterData(MOCK_PARENTS).map(parent => (
              <tr key={parent.id}>
                <td>
                  <div className="user-info-cell">
                    <img src={parent.avatar} alt={parent.name} />
                    <div className="user-info-text">
                      <span className="user-name">{parent.name}</span>
                      <span className="user-email">{parent.email}</span>
                    </div>
                  </div>
                </td>
                <td>{parent.id}</td>
                <td>{parent.phone}</td>
                <td>
                  <span className="grade-badge">{parent.children}</span>
                </td>
                <td>
                  <span className={`status-badge ${parent.status.toLowerCase()}`}>
                    <span className="status-dot"></span> {parent.status}
                  </span>
                </td>
                <td>{parent.joined}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn edit" onClick={() => { setEditingParent(parent); setFormError(''); }}><Pencil size={16} /></button>
                    <button className="action-btn delete" onClick={() => {
                      if (window.confirm("Are you sure you want to delete this parent?")) {
                        const index = MOCK_PARENTS.findIndex(p => p.id === parent.id);
                        if (index !== -1) MOCK_PARENTS.splice(index, 1);
                        setUpdateFlag(prev => prev + 1);
                      }
                    }}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#0F172A' }}>
                {addType === 'student' ? 'Add New Student' : addType === 'staff' ? 'Add New Staff' : 'Add New Parent'}
              </h2>
              <X style={{ cursor: 'pointer', color: '#64748B' }} onClick={() => { setIsAddModalOpen(false); setFormError(''); }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {formError && (
                <div style={{ color: '#EF4444', fontSize: '13px', backgroundColor: '#FEF2F2', padding: '10px', borderRadius: '6px', border: '1px solid #FCA5A5' }}>
                  {formError}
                </div>
              )}
              
              {addType === 'student' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Student Name</label>
                    <input type="text" placeholder="e.g. John Doe" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newStudentFormData.name} onChange={e => setNewStudentFormData({...newStudentFormData, name: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Email Address</label>
                    <input type="email" placeholder="john@example.com" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newStudentFormData.email} onChange={e => setNewStudentFormData({...newStudentFormData, email: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Grade & Section</label>
                    <input type="text" placeholder="e.g. Grade 5 - A" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newStudentFormData.grade} onChange={e => setNewStudentFormData({...newStudentFormData, grade: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Guardian Name</label>
                    <input type="text" placeholder="e.g. Jane Doe" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newStudentFormData.guardian} onChange={e => setNewStudentFormData({...newStudentFormData, guardian: e.target.value})} />
                  </div>
                </>
              )}

              {addType === 'staff' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Staff Name</label>
                    <input type="text" placeholder="e.g. John Doe" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newStaffFormData.name} onChange={e => setNewStaffFormData({...newStaffFormData, name: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Email Address</label>
                    <input type="email" placeholder="john@example.com" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newStaffFormData.email} onChange={e => setNewStaffFormData({...newStaffFormData, email: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Department</label>
                    <input type="text" placeholder="e.g. Mathematics" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newStaffFormData.department} onChange={e => setNewStaffFormData({...newStaffFormData, department: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Role</label>
                    <input type="text" placeholder="e.g. Senior Teacher" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newStaffFormData.role} onChange={e => setNewStaffFormData({...newStaffFormData, role: e.target.value})} />
                  </div>
                </>
              )}

              {addType === 'parent' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Parent Name</label>
                    <input type="text" placeholder="e.g. John Doe" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newParentFormData.name} onChange={e => setNewParentFormData({...newParentFormData, name: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Email Address</label>
                    <input type="email" placeholder="john@example.com" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newParentFormData.email} onChange={e => setNewParentFormData({...newParentFormData, email: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Phone Number</label>
                    <input type="text" placeholder="e.g. +1 234 567 8901" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newParentFormData.phone} onChange={e => setNewParentFormData({...newParentFormData, phone: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Children</label>
                    <input type="text" placeholder="e.g. Alex Johnson" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newParentFormData.children} onChange={e => setNewParentFormData({...newParentFormData, children: e.target.value})} />
                  </div>
                </>
              )}
              
              <button 
                className="btn-primary" 
                style={{ marginTop: '16px', justifyContent: 'center', width: '100%', padding: '12px' }} 
                onClick={() => {
                  if (addType === 'student') {
                    if (!newStudentFormData.name.trim() || !newStudentFormData.email.trim() || !newStudentFormData.grade.trim() || !newStudentFormData.guardian.trim()) {
                      setFormError('All fields are required.'); return;
                    }
                    const nameRegex = /^[A-Za-z\s]+$/;
                    if (!nameRegex.test(newStudentFormData.name)) { setFormError('Student Name must contain only letters.'); return; }
                    if (!nameRegex.test(newStudentFormData.guardian)) { setFormError('Guardian Name must contain only letters.'); return; }
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(newStudentFormData.email)) { setFormError('Please enter a valid email address.'); return; }

                    const newStudent = {
                      id: `STU-240${MOCK_STUDENTS.length + 11}`,
                      name: newStudentFormData.name.trim(),
                      email: newStudentFormData.email.trim(),
                      grade: newStudentFormData.grade.trim(),
                      guardian: newStudentFormData.guardian.trim(),
                      relation: 'Parent',
                      status: 'Active',
                      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                      avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
                    };
                    MOCK_STUDENTS.unshift(newStudent);
                    setNewStudentFormData({ name: '', email: '', grade: '', guardian: '' });
                  } else if (addType === 'staff') {
                    if (!newStaffFormData.name.trim() || !newStaffFormData.email.trim() || !newStaffFormData.department.trim() || !newStaffFormData.role.trim()) {
                      setFormError('All fields are required.'); return;
                    }
                    const nameRegex = /^[A-Za-z\s]+$/;
                    if (!nameRegex.test(newStaffFormData.name)) { setFormError('Staff Name must contain only letters.'); return; }
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(newStaffFormData.email)) { setFormError('Please enter a valid email address.'); return; }

                    const newStaff = {
                      id: `STF-10${MOCK_STAFF.length + 1}`,
                      name: newStaffFormData.name.trim(),
                      email: newStaffFormData.email.trim(),
                      department: newStaffFormData.department.trim(),
                      role: newStaffFormData.role.trim(),
                      status: 'Active',
                      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                      avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
                    };
                    MOCK_STAFF.unshift(newStaff);
                    setNewStaffFormData({ name: '', email: '', department: '', role: '' });
                  } else if (addType === 'parent') {
                    if (!newParentFormData.name.trim() || !newParentFormData.email.trim() || !newParentFormData.phone.trim() || !newParentFormData.children.trim()) {
                      setFormError('All fields are required.'); return;
                    }
                    const nameRegex = /^[A-Za-z\s]+$/;
                    if (!nameRegex.test(newParentFormData.name)) { setFormError('Parent Name must contain only letters.'); return; }
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(newParentFormData.email)) { setFormError('Please enter a valid email address.'); return; }

                    const newParent = {
                      id: `PAR-50${MOCK_PARENTS.length + 1}`,
                      name: newParentFormData.name.trim(),
                      email: newParentFormData.email.trim(),
                      phone: newParentFormData.phone.trim(),
                      children: newParentFormData.children.trim(),
                      status: 'Active',
                      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                      avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
                    };
                    MOCK_PARENTS.unshift(newParent);
                    setNewParentFormData({ name: '', email: '', phone: '', children: '' });
                  }

                  setUpdateFlag(prev => prev + 1);
                  setIsAddModalOpen(false);
                  setFormError('');
                }}
              >
                Save {addType === 'student' ? 'Student' : addType === 'staff' ? 'Staff' : 'Parent'}
              </button>
            </div>
          </div>
        </div>
      )}

      {editingStudent && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#0F172A' }}>Edit Student</h2>
              <X style={{ cursor: 'pointer', color: '#64748B' }} onClick={() => { setEditingStudent(null); setFormError(''); }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {formError && (
                <div style={{ color: '#EF4444', fontSize: '13px', backgroundColor: '#FEF2F2', padding: '10px', borderRadius: '6px', border: '1px solid #FCA5A5' }}>
                  {formError}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Student Name</label>
                <input type="text" placeholder="e.g. John Doe" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingStudent.name} onChange={e => setEditingStudent({...editingStudent, name: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Email Address</label>
                <input type="email" placeholder="john@example.com" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingStudent.email} onChange={e => setEditingStudent({...editingStudent, email: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Grade & Section</label>
                <input type="text" placeholder="e.g. Grade 5 - A" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingStudent.grade} onChange={e => setEditingStudent({...editingStudent, grade: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Guardian Name</label>
                <input type="text" placeholder="e.g. Jane Doe" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingStudent.guardian} onChange={e => setEditingStudent({...editingStudent, guardian: e.target.value})} />
              </div>
              
              <button 
                className="btn-primary" 
                style={{ marginTop: '16px', justifyContent: 'center', width: '100%', padding: '12px' }} 
                onClick={() => {
                  if (!editingStudent.name.trim() || !editingStudent.email.trim() || !editingStudent.grade.trim() || !editingStudent.guardian.trim()) {
                    setFormError('All fields are required.');
                    return;
                  }
                  
                  const nameRegex = /^[A-Za-z\s]+$/;
                  if (!nameRegex.test(editingStudent.name)) {
                    setFormError('Student Name must contain only letters.');
                    return;
                  }
                  if (!nameRegex.test(editingStudent.guardian)) {
                    setFormError('Guardian Name must contain only letters.');
                    return;
                  }

                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(editingStudent.email)) {
                    setFormError('Please enter a valid email address.');
                    return;
                  }

                  const index = MOCK_STUDENTS.findIndex(s => s.id === editingStudent.id);
                  if (index !== -1) {
                    MOCK_STUDENTS[index] = {
                      ...editingStudent,
                      name: editingStudent.name.trim(),
                      email: editingStudent.email.trim(),
                      grade: editingStudent.grade.trim(),
                      guardian: editingStudent.guardian.trim()
                    };
                  }
                  
                  setUpdateFlag(prev => prev + 1);
                  setEditingStudent(null);
                  setFormError('');
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {editingStaff && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#0F172A' }}>Edit Staff</h2>
              <X style={{ cursor: 'pointer', color: '#64748B' }} onClick={() => { setEditingStaff(null); setFormError(''); }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {formError && (
                <div style={{ color: '#EF4444', fontSize: '13px', backgroundColor: '#FEF2F2', padding: '10px', borderRadius: '6px', border: '1px solid #FCA5A5' }}>
                  {formError}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Staff Name</label>
                <input type="text" placeholder="e.g. John Doe" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingStaff.name} onChange={e => setEditingStaff({...editingStaff, name: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Email Address</label>
                <input type="email" placeholder="john@example.com" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingStaff.email} onChange={e => setEditingStaff({...editingStaff, email: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Department</label>
                <input type="text" placeholder="e.g. Mathematics" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingStaff.department} onChange={e => setEditingStaff({...editingStaff, department: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Role</label>
                <input type="text" placeholder="e.g. Senior Teacher" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingStaff.role} onChange={e => setEditingStaff({...editingStaff, role: e.target.value})} />
              </div>
              
              <button 
                className="btn-primary" 
                style={{ marginTop: '16px', justifyContent: 'center', width: '100%', padding: '12px' }} 
                onClick={() => {
                  if (!editingStaff.name.trim() || !editingStaff.email.trim() || !editingStaff.department.trim() || !editingStaff.role.trim()) {
                    setFormError('All fields are required.');
                    return;
                  }
                  
                  const nameRegex = /^[A-Za-z\s]+$/;
                  if (!nameRegex.test(editingStaff.name)) {
                    setFormError('Staff Name must contain only letters.');
                    return;
                  }

                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(editingStaff.email)) {
                    setFormError('Please enter a valid email address.');
                    return;
                  }

                  const index = MOCK_STAFF.findIndex(s => s.id === editingStaff.id);
                  if (index !== -1) {
                    MOCK_STAFF[index] = {
                      ...editingStaff,
                      name: editingStaff.name.trim(),
                      email: editingStaff.email.trim(),
                      department: editingStaff.department.trim(),
                      role: editingStaff.role.trim()
                    };
                  }
                  
                  setUpdateFlag(prev => prev + 1);
                  setEditingStaff(null);
                  setFormError('');
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {editingParent && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#0F172A' }}>Edit Parent</h2>
              <X style={{ cursor: 'pointer', color: '#64748B' }} onClick={() => { setEditingParent(null); setFormError(''); }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {formError && (
                <div style={{ color: '#EF4444', fontSize: '13px', backgroundColor: '#FEF2F2', padding: '10px', borderRadius: '6px', border: '1px solid #FCA5A5' }}>
                  {formError}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Parent Name</label>
                <input type="text" placeholder="e.g. John Doe" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingParent.name} onChange={e => setEditingParent({...editingParent, name: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Email Address</label>
                <input type="email" placeholder="john@example.com" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingParent.email} onChange={e => setEditingParent({...editingParent, email: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Phone Number</label>
                <input type="text" placeholder="e.g. +1 234 567 8901" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingParent.phone} onChange={e => setEditingParent({...editingParent, phone: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Children</label>
                <input type="text" placeholder="e.g. Alex Johnson" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingParent.children} onChange={e => setEditingParent({...editingParent, children: e.target.value})} />
              </div>
              
              <button 
                className="btn-primary" 
                style={{ marginTop: '16px', justifyContent: 'center', width: '100%', padding: '12px' }} 
                onClick={() => {
                  if (!editingParent.name.trim() || !editingParent.email.trim() || !editingParent.phone.trim() || !editingParent.children.trim()) {
                    setFormError('All fields are required.');
                    return;
                  }
                  
                  const nameRegex = /^[A-Za-z\s]+$/;
                  if (!nameRegex.test(editingParent.name)) {
                    setFormError('Parent Name must contain only letters.');
                    return;
                  }

                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(editingParent.email)) {
                    setFormError('Please enter a valid email address.');
                    return;
                  }

                  const index = MOCK_PARENTS.findIndex(p => p.id === editingParent.id);
                  if (index !== -1) {
                    MOCK_PARENTS[index] = {
                      ...editingParent,
                      name: editingParent.name.trim(),
                      email: editingParent.email.trim(),
                      phone: editingParent.phone.trim(),
                      children: editingParent.children.trim()
                    };
                  }
                  
                  setUpdateFlag(prev => prev + 1);
                  setEditingParent(null);
                  setFormError('');
                }}
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
