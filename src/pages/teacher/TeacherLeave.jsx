import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Calendar, 
  Search, 
  Filter, 
  Mail, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function TeacherLeave() {
  const [leaves, setLeaves] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = () => {
    const stored = localStorage.getItem('MOCK_LEAVE_REQUESTS');
    if (stored) {
      setLeaves(JSON.parse(stored));
    }
  };

  const saveLeaves = (updated) => {
    setLeaves(updated);
    localStorage.setItem('MOCK_LEAVE_REQUESTS', JSON.stringify(updated));
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDecision = (id, decision) => {
    const updated = leaves.map(leave => {
      if (leave.id === id) {
        const returnEmail = {
          id: `EML-${Date.now().toString().slice(-3)}-2`,
          from: `Sarah Johnson (teacher@gmail.com)`,
          to: `${leave.parentName} (${leave.parentEmail || 'parent@gmail.com'})`,
          subject: `Leave Request ${decision}: ${leave.studentName}`,
          body: `Dear Parent,\n\nThis is to inform you that your leave request for ${leave.studentName} on ${leave.date} has been ${decision}.\n\nSincerely,\nSarah Johnson (Class Teacher)`,
          date: new Date().toLocaleString(),
          status: 'Sent'
        };

        return {
          ...leave,
          status: decision,
          readByParent: false, // Mark unread so Parent is notified
          emailLogs: [...(leave.emailLogs || []), returnEmail]
        };
      }
      return leave;
    });

    saveLeaves(updated);
    showToast(`Leave request ${decision.toLowerCase()}! Email notification dispatched to Parent.`);
  };

  // Filter leaves
  const filteredLeaves = leaves.filter(leave => {
    const matchesSearch = leave.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          leave.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Support normalizing class comparisons e.g. "Grade 4 - A" matches "10-A" class replacement or similar
    const matchesClass = classFilter === 'All Classes' || leave.grade.includes(classFilter) || classFilter.includes(leave.grade);
    const matchesStatus = statusFilter === 'All Status' || leave.status === statusFilter;

    return matchesSearch && matchesClass && matchesStatus;
  });

  return (
    <div className="teacher-assignments-container animate-fade-in-up">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="custom-toast">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="page-header-flex">
        <div className="page-title-group">
          <h1>Student Leave Requests</h1>
          <p>Review leave applications, send approval notifications, and track communication history.</p>
        </div>
      </div>

      {/* Controls */}
      <div className="assignments-controls-bar">
        <div className="assignments-search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by student name or ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="assignments-filters-wrapper">
          <div className="filter-dropdown-container">
            <Filter size={16} className="filter-icon" />
            <select 
              value={classFilter} 
              onChange={(e) => setClassFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All Classes">All Classes</option>
              <option value="Grade 4 - A">Grade 4 - A</option>
              <option value="Grade 5 - A">Grade 5 - A</option>
              <option value="Grade 5 - B">Grade 5 - B</option>
              <option value="Grade 6 - B">Grade 6 - B</option>
              <option value="Grade 7 - C">Grade 7 - C</option>
              <option value="Grade 8 - A">Grade 8 - A</option>
            </select>
          </div>

          <div className="filter-dropdown-container">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All Status">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Roster list */}
      <div className="assignments-table-container-card">
        {filteredLeaves.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
            <AlertCircle size={24} className="no-data-icon" />
            <p>No student leave requests found.</p>
          </div>
        ) : (
          <table className="assignments-data-table">
            <thead>
              <tr>
                <th>STUDENT</th>
                <th>CLASS</th>
                <th>LEAVE DATE</th>
                <th>REASON</th>
                <th>EMAIL LOGS</th>
                <th>STATUS / ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map((leave) => {
                return (
                  <tr key={leave.id}>
                    <td>
                      <div className="assignment-title-cell">
                        <span className="asn-title">{leave.studentName}</span>
                        <span className="asn-sub-info text-muted">ID: {leave.studentId} • Parent: {leave.parentName}</span>
                      </div>
                    </td>
                    <td>
                      <span className="class-badge-purple">{leave.grade}</span>
                    </td>
                    <td>
                      <div className="date-cell">
                        <Calendar size={14} />
                        <span>{leave.date}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 500, fontSize: '13px', color: '#475569' }}>{leave.reason}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px', color: '#64748B', maxWidth: '240px' }}>
                        {leave.emailLogs && leave.emailLogs.map((log) => (
                          <div key={log.id} style={{ background: '#F8FAFC', padding: '4px 8px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                            <span style={{ color: '#8B5CF6', fontWeight: 600 }}>{log.from.split(' ')[0]} &rarr; {log.to.split(' ')[0]}</span>: "{log.subject}"
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="actions-cell-wrapper" style={{ flexWrap: 'wrap', gap: '8px' }}>
                        {leave.status === 'Pending' ? (
                          <>
                            <button 
                              className="btn-approve" 
                              style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', background: 'var(--green-main)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                              onClick={() => handleDecision(leave.id, 'Approved')}
                            >
                              <CheckCircle size={14} /> Approve
                            </button>
                            <button 
                              className="btn-reject" 
                              style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', background: 'var(--red-main)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                              onClick={() => handleDecision(leave.id, 'Rejected')}
                            >
                              <XCircle size={14} /> Reject
                            </button>
                          </>
                        ) : (
                          <span className={`status-pill badge-${leave.status === 'Approved' ? 'active' : leave.status === 'Rejected' ? 'needs-grading' : 'completed'}`} style={{ textTransform: 'capitalize' }}>
                            {leave.status}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Floating AI Assistant FAB */}
      <button className="ai-assistant-fab fab-dashboard">
        <Sparkles size={18} /> AI Assistant
      </button>
    </div>
  );
}
