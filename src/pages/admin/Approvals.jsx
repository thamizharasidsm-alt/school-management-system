import React, { useState } from 'react';
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
  UserCheck
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
  const [approvalsData, setApprovalsData] = useState(MOCK_APPROVALS);
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const getStatusClass = (status) => {
    switch(status) {
      case 'Approved': return 'status-approved';
      case 'Pending': return 'status-pending';
      case 'Rejected': return 'status-rejected';
      default: return '';
    }
  };

  const handleApprove = (id) => {
    setApprovalsData(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'Approved' } : item
    ));
  };

  const handleReject = (id) => {
    setApprovalsData(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'Rejected' } : item
    ));
  };

  const filteredApprovals = approvalsData.filter(item => {
    const matchesTab = activeTab === 'pending' ? item.status === 'Pending' : true;
    const matchesFilter = statusFilter === 'All' ? true : item.status === statusFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesFilter && matchesSearch;
  });

  // Calculate stats dynamically
  const approvedCount = approvalsData.filter(item => item.status === 'Approved').length;
  const pendingCount = approvalsData.filter(item => item.status === 'Pending').length;
  const rejectedCount = approvalsData.filter(item => item.status === 'Rejected').length;

  return (
    <>
      <div className="dashboard-title-area">
        <div className="dashboard-title">
          <h1>Approvals</h1>
          <p>Manage leave requests, permissions and other approvals</p>
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
            <p className="sub-stat">+12% vs last week</p>
          </div>
        </div>

        <div className="approval-summary-card pending-card">
          <div className="approval-icon-wrapper yellow-bg">
            <Clock size={20} color="var(--yellow-main)" />
          </div>
          <div className="approval-summary-text">
            <h2>{pendingCount}</h2>
            <p className="main-stat">Pending review</p>
            <p className="sub-stat">3 new today</p>
          </div>
        </div>

        <div className="approval-summary-card reject-card">
          <div className="approval-icon-wrapper red-bg">
            <TrendingDown size={20} color="var(--red-main)" />
          </div>
          <div className="approval-summary-text">
            <h2>{rejectedCount}</h2>
            <p className="main-stat">Rejected this week</p>
            <p className="sub-stat">-5% vs last week</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="fees-tabs-container" style={{ marginBottom: '24px' }}>
        <button 
          className={`fees-tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => { setActiveTab('all'); setStatusFilter('All'); }}
        >
          <Building2 size={18} /> All Request
        </button>
        <button 
          className={`fees-tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => { setActiveTab('pending'); setStatusFilter('Pending'); }}
        >
          <Building2 size={18} /> Pending
        </button>
      </div>

      {/* Filters */}
      <div className="table-controls" style={{ marginBottom: '24px' }}>
        <div className="att-filters-left">
          <div className="table-search" style={{ width: '280px' }}>
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search name or role..." 
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
                      if (status === 'Pending') setActiveTab('pending');
                      else setActiveTab('all');
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
        {filteredApprovals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
            No approvals found.
          </div>
        ) : (
          filteredApprovals.map((item) => (
            <div key={item.id} className="approval-list-item">
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
                      <TrendingDown size={14} /> Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
