import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  X 
} from 'lucide-react';

const DEFAULT_COMPLAINTS = [
  {
    id: 'CMP-8001',
    date: 'Jun 05, 2026',
    category: 'Transport',
    subject: 'School bus #4 running late',
    priority: 'Medium',
    description: 'The school bus #4 has been arriving 15-20 minutes late consistently for the last 3 days. This is causing my child to miss morning assembly.',
    status: 'In Progress',
    updates: [
      { status: 'Submitted', date: 'Jun 05, 2026', note: 'Complaint filed by parent.' },
      { status: 'Under Review', date: 'Jun 06, 2026', note: 'Route operator contacted. Driver reported vehicle minor issue.' }
    ]
  },
  {
    id: 'CMP-8002',
    date: 'May 24, 2026',
    category: 'Academics',
    subject: 'Math midterm exam grading inquiry',
    priority: 'Low',
    description: 'I would like to request a recheck of Question #5 in the Math Midterm paper. My son David Chen had solved it correctly but seems to have lost marks due to step-calculation mismatches.',
    status: 'Resolved',
    updates: [
      { status: 'Submitted', date: 'May 24, 2026', note: 'Complaint filed by parent.' },
      { status: 'Under Review', date: 'May 25, 2026', note: 'Forwarded to Math Teacher Mr. John Smith.' },
      { status: 'Resolved', date: 'May 28, 2026', note: 'Paper reviewed. Correction made, 3 marks added. Report card updated.' }
    ]
  }
];

export default function ParentComplaints({ parent }) {
  const [complaints, setComplaints] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    subject: '',
    category: 'Academics',
    priority: 'Medium',
    description: ''
  });

  // Load from localStorage
  useEffect(() => {
    if (parent) {
      const storageKey = `COMPLAINTS_${parent.id}`;
      let stored = localStorage.getItem(storageKey);
      if (!stored) {
        localStorage.setItem(storageKey, JSON.stringify(DEFAULT_COMPLAINTS));
        stored = JSON.stringify(DEFAULT_COMPLAINTS);
      }
      setComplaints(JSON.parse(stored));
    }
  }, [parent]);

  const saveComplaints = (updatedComplaints) => {
    setComplaints(updatedComplaints);
    if (parent) {
      localStorage.setItem(`COMPLAINTS_${parent.id}`, JSON.stringify(updatedComplaints));
    }
  };

  const handleToggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.subject.trim()) {
      setFormError('Subject/Title is required.');
      return;
    }
    if (formData.description.trim().length < 10) {
      setFormError('Please provide a detailed description (minimum 10 characters).');
      return;
    }

    const todayStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });

    const newComplaint = {
      id: `CMP-${8000 + complaints.length + 1}`,
      date: todayStr,
      category: formData.category,
      subject: formData.subject.trim(),
      priority: formData.priority,
      description: formData.description.trim(),
      status: 'Pending',
      updates: [
        { status: 'Submitted', date: todayStr, note: 'Complaint submitted online by parent.' }
      ]
    };

    const updated = [newComplaint, ...complaints];
    saveComplaints(updated);
    setIsModalOpen(false);
    
    // Reset form
    setFormData({
      subject: '',
      category: 'Academics',
      priority: 'Medium',
      description: ''
    });
  };

  // Filter complaints
  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = c.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="parent-portal-container animate-fade-in-up">
      {/* Title Header */}
      <div className="dashboard-title-area">
        <div className="dashboard-title">
          <h1>Complaints & Inquiries</h1>
          <p>Submit and track academic, administrative, or facility related issues.</p>
        </div>
        <div className="title-actions">
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> File a Complaint
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="parent-complaints-filters">
        <div className="parent-search-wrapper">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search complaints by ID, subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="parent-filter-group">
          <select 
            className="parent-filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Academics">Academics</option>
            <option value="Transport">Transport</option>
            <option value="Facilities">Facilities</option>
            <option value="Food">Food / Cafeteria</option>
            <option value="Behavior">Student Behavior</option>
          </select>

          <select 
            className="parent-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Complaints List */}
      <div className="parent-complaints-grid">
        {filteredComplaints.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '20px', border: '1px solid #F1F5F9', color: 'var(--text-muted)' }}>
            <AlertCircle size={40} style={{ margin: '0 auto 12px auto', color: '#94A3B8' }} />
            <h3>No complaints found</h3>
            <p style={{ fontSize: '14px', marginTop: '4px' }}>Try adjusting your filters or file a new ticket.</p>
          </div>
        ) : (
          filteredComplaints.map((c) => {
            const isExpanded = expandedId === c.id;
            return (
              <div key={c.id} className="parent-complaint-card" onClick={() => handleToggleExpand(c.id)}>
                <div className="parent-complaint-header">
                  <div className="parent-complaint-title-block">
                    <h3>{c.subject}</h3>
                    <div className="parent-complaint-meta-row">
                      <strong>{c.id}</strong>
                      <span>•</span>
                      <span>Filed: {c.date}</span>
                      <span>•</span>
                      <span className="grade-badge" style={{ padding: '2px 8px', fontSize: '11px' }}>{c.category}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span className={`parent-badge priority-${c.priority.toLowerCase()}`}>
                      {c.priority}
                    </span>
                    <span className={`parent-badge ${c.status.replace(/\s+/g, '-').toLowerCase()}`}>
                      {c.status}
                    </span>
                    {isExpanded ? <ChevronUp size={18} color="#94A3B8" /> : <ChevronDown size={18} color="#94A3B8" />}
                  </div>
                </div>

                <div className="parent-complaint-body">
                  {c.description}
                </div>

                {isExpanded && (
                  <div style={{ marginTop: '10px', paddingTop: '20px', borderTop: '1px solid #F1F5F9' }} onClick={(e) => e.stopPropagation()}>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', marginBottom: '16px' }}>Status tracking Timeline</h4>
                    <div className="parent-timeline">
                      {/* Timeline Steps */}
                      <div className={`parent-timeline-item ${c.updates.some(u => u.status === 'Submitted') ? 'completed' : ''}`}>
                        <div className="parent-timeline-node"></div>
                        <span className="parent-timeline-title">Submitted</span>
                        <span className="parent-timeline-desc">
                          Filed on {c.updates.find(u => u.status === 'Submitted')?.date || c.date}
                        </span>
                      </div>

                      <div className={`parent-timeline-item ${c.status === 'In Progress' ? 'active' : c.updates.some(u => u.status === 'Under Review' || u.status === 'Resolved') ? 'completed' : ''}`}>
                        <div className="parent-timeline-node"></div>
                        <span className="parent-timeline-title">Under Review</span>
                        {c.updates.some(u => u.status === 'Under Review' || u.status === 'Resolved') ? (
                          <span className="parent-timeline-desc">
                            Reviewed on {c.updates.find(u => u.status === 'Under Review')?.date || c.date}. {c.updates.find(u => u.status === 'Under Review')?.note}
                          </span>
                        ) : (
                          <span className="parent-timeline-desc">Awaiting staff review.</span>
                        )}
                      </div>

                      <div className={`parent-timeline-item ${c.status === 'Resolved' ? 'completed' : ''}`}>
                        <div className="parent-timeline-node"></div>
                        <span className="parent-timeline-title">Resolved</span>
                        {c.status === 'Resolved' ? (
                          <span className="parent-timeline-desc">
                            Completed on {c.updates.find(u => u.status === 'Resolved')?.date}. {c.updates.find(u => u.status === 'Resolved')?.note}
                          </span>
                        ) : (
                          <span className="parent-timeline-desc">Resolution pending.</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="parent-complaint-footer">
                  <span style={{ color: 'var(--text-muted)' }}>Click card to {isExpanded ? 'collapse details' : 'track resolution progress'}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* File Complaint Modal */}
      {isModalOpen && (
        <div className="parent-modal-backdrop">
          <div className="parent-modal-container">
            <div className="parent-modal-header">
              <h3>File New Complaint</h3>
              <button className="parent-modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {formError && (
                <div className="parent-alert-error">
                  <AlertCircle size={16} /> {formError}
                </div>
              )}

              <div className="parent-form-group">
                <label>Subject / Short Summary</label>
                <input 
                  type="text" 
                  placeholder="e.g. Issue with classroom air conditioning"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="parent-form-group">
                  <label>Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Academics">Academics</option>
                    <option value="Transport">Transport</option>
                    <option value="Facilities">Facilities</option>
                    <option value="Food">Food / Cafeteria</option>
                    <option value="Behavior">Student Behavior</option>
                  </select>
                </div>

                <div className="parent-form-group">
                  <label>Priority</label>
                  <select 
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="parent-form-group" style={{ marginBottom: '24px' }}>
                <label>Detailed Description</label>
                <textarea 
                  rows="4" 
                  placeholder="Explain the issue in detail. If applicable, mention names, locations, and timings..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                Submit Complaint Ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
