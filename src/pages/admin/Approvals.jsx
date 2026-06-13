import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Clock, 
  TrendingDown,
  Building2,
  Calendar,
  Search,
  Filter,
  ChevronDown,
  Users,
  UserCheck,
  Mail,
  XCircle,
  Sparkles
} from 'lucide-react';

const MOCK_APPROVALS = [
  { id: 1, name: 'Sarah Connor', role: 'Teacher', reason: 'Medical Leave request for 3 days', type: 'Leave Request', date: '2026-04-10', status: 'Pending' },
  { id: 2, name: 'John Doe', role: 'Teacher', reason: 'Medical Leave request for 3 days', type: 'Leave Request', date: '2026-04-10', status: 'Approved' },
  { id: 3, name: 'Jane Smith', role: 'Teacher', reason: 'Medical Leave request for 3 days', type: 'Leave Request', date: '2026-04-10', status: 'Approved' },
  { id: 4, name: 'Mike Ross', role: 'Teacher', reason: 'Medical Leave request for 3 days', type: 'Leave Request', date: '2026-04-10', status: 'Pending' },
  { id: 5, name: 'Rachel Zane', role: 'Teacher', reason: 'Medical Leave request for 3 days', type: 'Leave Request', date: '2026-04-10', status: 'Pending' },
  { id: 6, name: 'Harvey Specter', role: 'Teacher', reason: 'Medical Leave request for 3 days', type: 'Leave Request', date: '2026-04-10', status: 'Rejected' },
];

export default function Approvals() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [approvalsData, setApprovalsData] = useState([]);
  const [studentLeaves, setStudentLeaves] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    // Load teacher approvals from localStorage or defaults
    const storedTeacher = localStorage.getItem('MOCK_TEACHER_APPROVALS');
    if (storedTeacher) {
      setApprovalsData(JSON.parse(storedTeacher));
    } else {
      localStorage.setItem('MOCK_TEACHER_APPROVALS', JSON.stringify(MOCK_APPROVALS));
      setApprovalsData(MOCK_APPROVALS);
    }

    // Load student leaves
    loadStudentLeaves();
  }, []);

  const loadStudentLeaves = () => {
    const stored = localStorage.getItem('MOCK_LEAVE_REQUESTS');
    if (stored) {
      setStudentLeaves(JSON.parse(stored));
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const saveTeacherApprovals = (updated) => {
    setApprovalsData(updated);
    localStorage.setItem('MOCK_TEACHER_APPROVALS', JSON.stringify(updated));
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'Approved': return 'status-approved';
      case 'Pending': return 'status-pending';
      case 'Rejected': return 'status-rejected';
      default: return '';
    }
  };

  const handleApprove = (id) => {
    const updated = approvalsData.map(item => 
      item.id === id ? { ...item, status: 'Approved' } : item
    );
    saveTeacherApprovals(updated);
    showToast('Teacher leave request approved!');
  };

  const handleReject = (id) => {
    const updated = approvalsData.map(item => 
      item.id === id ? { ...item, status: 'Rejected' } : item
    );
    saveTeacherApprovals(updated);
    showToast('Teacher leave request rejected.');
  };

  // Student leaves approve/reject
  const handleApproveStudent = (id) => {
    const stored = localStorage.getItem('MOCK_LEAVE_REQUESTS');
    if (stored) {
      const parsed = JSON.parse(stored);
      const updated = parsed.map(leave => {
        if (leave.id === id) {
          const returnEmail = {
            id: `EML-${Date.now().toString().slice(-3)}-admin`,
            from: `Admin Portal (admin@gmail.com)`,
            to: `${leave.parentName} (${leave.parentEmail || 'parent@gmail.com'})`,
            subject: `Leave Request Approved by Admin: ${leave.studentName}`,
            body: `Dear Parent,\n\nThis is to inform you that your leave request for ${leave.studentName} on ${leave.date} has been Approved by the School Administration.\n\nSincerely,\nSchool Administration`,
            date: new Date().toLocaleString(),
            status: 'Sent'
          };
          return {
            ...leave,
            status: 'Approved',
            readByParent: false,
            emailLogs: [...(leave.emailLogs || []), returnEmail]
          };
        }
        return leave;
      });
      localStorage.setItem('MOCK_LEAVE_REQUESTS', JSON.stringify(updated));
      setStudentLeaves(updated);
      showToast('Student leave request approved! Parent notified.');
    }
  };

  const handleRejectStudent = (id) => {
    const stored = localStorage.getItem('MOCK_LEAVE_REQUESTS');
    if (stored) {
      const parsed = JSON.parse(stored);
      const updated = parsed.map(leave => {
        if (leave.id === id) {
          const returnEmail = {
            id: `EML-${Date.now().toString().slice(-3)}-admin`,
            from: `Admin Portal (admin@gmail.com)`,
            to: `${leave.parentName} (${leave.parentEmail || 'parent@gmail.com'})`,
            subject: `Leave Request Rejected by Admin: ${leave.studentName}`,
            body: `Dear Parent,\n\nThis is to inform you that your leave request for ${leave.studentName} on ${leave.date} has been Rejected by the School Administration.\n\nSincerely,\nSchool Administration`,
            date: new Date().toLocaleString(),
            status: 'Sent'
          };
          return {
            ...leave,
            status: 'Rejected',
            readByParent: false,
            emailLogs: [...(leave.emailLogs || []), returnEmail]
          };
        }
        return leave;
      });
      localStorage.setItem('MOCK_LEAVE_REQUESTS', JSON.stringify(updated));
      setStudentLeaves(updated);
      showToast('Student leave request rejected. Parent notified.');
    }
  };

  // Filter listings
  const filteredApprovals = approvalsData.filter(item => {
    const matchesTab = activeTab === 'pending' ? item.status === 'Pending' : true;
    const matchesFilter = statusFilter === 'All' ? true : item.status === statusFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesFilter && matchesSearch;
  });

  const filteredStudentLeaves = studentLeaves.filter(leave => {
    const matchesFilter = statusFilter === 'All' ? true : leave.status === statusFilter;
    const matchesSearch = leave.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          leave.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate dynamic stats for dashboard cards
  const approvedCount = approvalsData.filter(item => item.status === 'Approved').length + studentLeaves.filter(s => s.status === 'Approved').length;
  const pendingCount = approvalsData.filter(item => item.status === 'Pending').length + studentLeaves.filter(s => s.status === 'Pending').length;
  const rejectedCount = approvalsData.filter(item => item.status === 'Rejected').length + studentLeaves.filter(s => s.status === 'Rejected').length;

  return (
    <>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="custom-toast">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="dashboard-title-area">
        <div className="dashboard-title">
          <h1>Approvals</h1>
          <p>Manage leave requests, student leave applications, and administrative approvals</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="approvals-summary-container">
        <div className="approval-summary-card approve-card">
          <div className="approval-icon-wrapper green-bg">
            <CheckCircle size={20} color="var(--green-main)" />
          </div>
          <div className="approval-summary-text">
            <h2>{approvedCount}</h2>
            <p className="main-stat">Approve this week</p>
            <p className="sub-stat">Dynamic updates</p>
          </div>
        </div>

        <div className="approval-summary-card pending-card">
          <div className="approval-icon-wrapper yellow-bg">
            <Clock size={20} color="var(--yellow-main)" />
          </div>
          <div className="approval-summary-text">
            <h2>{pendingCount}</h2>
            <p className="main-stat">Pending review</p>
            <p className="sub-stat">Requires action</p>
          </div>
        </div>

        <div className="approval-summary-card reject-card">
          <div className="approval-icon-wrapper red-bg">
            <TrendingDown size={20} color="var(--red-main)" />
          </div>
          <div className="approval-summary-text">
            <h2>{rejectedCount}</h2>
            <p className="main-stat">Rejected this week</p>
            <p className="sub-stat">Historical audits</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="fees-tabs-container" style={{ marginBottom: '24px' }}>
        <button 
          className={`fees-tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => { setActiveTab('all'); setStatusFilter('All'); }}
        >
          <Building2 size={18} /> Staff Request
        </button>
        <button 
          className={`fees-tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => { setActiveTab('pending'); setStatusFilter('Pending'); }}
        >
          <Clock size={18} /> Pending Staff
        </button>
        <button 
          className={`fees-tab ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => { setActiveTab('students'); setStatusFilter('All'); }}
        >
          <Users size={18} /> Student Leaves
        </button>
      </div>

      {/* Filters */}
      <div className="table-controls" style={{ marginBottom: '24px' }}>
        <div className="att-filters-left">
          <div className="table-search" style={{ width: '280px' }}>
            <Search size={18} />
            <input 
              type="text" 
              placeholder={activeTab === 'students' ? "Search student name or ID..." : "Search name or role..."} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div style={{ position: 'relative' }}>
            <div 
              className="filter-btn" 
              style={{ padding: '10px 16px', color: '#64748B', cursor: 'pointer' }}
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              <Filter size={16} /> {statusFilter === 'All' ? 'All Status' : statusFilter} <ChevronDown size={16} />
            </div>
            
            {showFilterDropdown && (
              <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '8px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', zIndex: 10, width: '150px', overflow: 'hidden' }}>
                {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
                  <div 
                    key={status}
                    style={{ padding: '10px 16px', cursor: 'pointer', background: statusFilter === status ? '#F1F5F9' : 'white', fontSize: '14px', color: '#1E293B' }}
                    onClick={() => {
                      setStatusFilter(status);
                      setShowFilterDropdown(false);
                      if (status === 'Pending' && activeTab !== 'students') setActiveTab('pending');
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                    onMouseLeave={(e) => e.currentTarget.style.background = statusFilter === status ? '#F1F5F9' : 'white'}
                  >
                    {status === 'All' ? 'All Status' : status}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Approvals List */}
      <div className="approvals-list">
        {activeTab !== 'students' ? (
          filteredApprovals.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
              No approvals found.
            </div>
          ) : (
            filteredApprovals.map((item) => (
              <div key={item.id} className="approval-list-item animate-fade-in-up">
                <div className="approval-main-info">
                  <div className="module-icon" style={{ borderRadius: '12px' }}>
                    <Users size={18} />
                  </div>
                  <div className="approval-text">
                    <h3>{item.name} <span className="approval-role">. {item.role}</span></h3>
                    <p>{item.reason}</p>
                  </div>
                </div>
                
                <div className="approval-meta">
                  <div className="meta-item">
                    <UserCheck size={16} />
                    <span>{item.type}</span>
                  </div>
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>{item.date}</span>
                  </div>
                </div>

                <div className="approval-actions-wrapper">
                  <div className={`approval-badge ${getStatusClass(item.status)}`}>
                    {item.status}
                  </div>
                  
                  {item.status === 'Pending' && (
                    <div className="approval-action-buttons">
                      <button className="btn-approve" onClick={() => handleApprove(item.id)}>
                        <CheckCircle size={14} /> Approve
                      </button>
                      <button className="btn-reject" onClick={() => handleReject(item.id)}>
                        <XCircle size={14} /> Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )
        ) : (
          filteredStudentLeaves.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
              No student leave requests found.
            </div>
          ) : (
            filteredStudentLeaves.map((leave) => (
              <div key={leave.id} className="approval-list-item animate-fade-in-up">
                <div className="approval-main-info">
                  <div className="module-icon" style={{ borderRadius: '12px', background: 'var(--purple-light)' }}>
                    <Users size={18} color="var(--purple-main)" />
                  </div>
                  <div className="approval-text">
                    <h3>{leave.studentName} <span className="approval-role">. Child (Class: {leave.grade})</span></h3>
                    <p><strong>Reason:</strong> "{leave.reason}"</p>
                  </div>
                </div>
                
                <div className="approval-meta">
                  <div className="meta-item">
                    <UserCheck size={16} />
                    <span>Parent: {leave.parentName}</span>
                  </div>
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>Leave: {leave.date}</span>
                  </div>
                </div>

                {/* Email dispatch updates showing dynamically inside admin approvals list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px', color: '#64748B', maxWidth: '300px', background: '#F8FAFC', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={12} /> Email Communication Logs:</span>
                  {leave.emailLogs && leave.emailLogs.slice(-1).map((log, idx) => (
                    <div key={idx}>Latest: {log.from.split(' ')[0]} &rarr; {log.to.split(' ')[0]} on "{log.subject}"</div>
                  ))}
                </div>

                <div className="approval-actions-wrapper">
                  <div className={`approval-badge ${getStatusClass(leave.status)}`}>
                    {leave.status}
                  </div>
                  
                  {leave.status === 'Pending' && (
                    <div className="approval-action-buttons">
                      <button className="btn-approve" onClick={() => handleApproveStudent(leave.id)}>
                        <CheckCircle size={14} /> Approve
                      </button>
                      <button className="btn-reject" onClick={() => handleRejectStudent(leave.id)}>
                        <XCircle size={14} /> Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )
        )}
      </div>
    </>
  );
}
