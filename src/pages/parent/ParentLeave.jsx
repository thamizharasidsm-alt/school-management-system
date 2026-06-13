import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Calendar, 
  Clock, 
  Mail, 
  AlertCircle, 
  CheckCircle,
  X,
  Sparkles,
  Info
} from 'lucide-react';

export default function ParentLeave({ parent }) {
  const [leaves, setLeaves] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaveDate, setLeaveDate] = useState('');
  const [reason, setReason] = useState('');
  const [formError, setFormError] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  
  // Find child details from MOCK_STUDENTS in localStorage
  const child = useMemo(() => {
    if (!parent) return null;
    const stored = localStorage.getItem('MOCK_STUDENTS');
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.find(s => s.guardian === parent.name || s.name === parent.children) || {
        id: 'STU-24001',
        name: parent.children || 'David Chen',
        grade: 'Grade 4 - A'
      };
    }
    return { id: 'STU-24001', name: 'David Chen', grade: 'Grade 4 - A' };
  }, [parent]);

  // Load leaves
  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = () => {
    const stored = localStorage.getItem('MOCK_LEAVE_REQUESTS');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Filter leaves matching parent name or child ID
      const filtered = parsed.filter(l => l.parentName === parent.name || l.studentId === child.id);
      setLeaves(filtered);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleApplyLeave = (e) => {
    e.preventDefault();
    setFormError('');

    if (!leaveDate) {
      setFormError('Please select a leave date.');
      return;
    }
    if (reason.trim().length < 5) {
      setFormError('Please provide a reason (minimum 5 characters).');
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const newLeave = {
      id: `LV-${Date.now().toString().slice(-4)}`,
      studentId: child.id,
      studentName: child.name,
      grade: child.grade,
      parentName: parent.name,
      parentEmail: parent.email,
      date: leaveDate,
      reason: reason.trim(),
      status: 'Pending',
      submittedDate: todayStr,
      readByParent: true,
      emailLogs: [
        {
          id: `EML-${Date.now().toString().slice(-3)}-1`,
          from: `${parent.name} (${parent.email})`,
          to: `Sarah Johnson (teacher@gmail.com)`,
          subject: `Leave Request Notification: ${child.name}`,
          body: `Dear Class Teacher,\n\nMy child ${child.name} (${child.grade}) will not be able to attend school on ${leaveDate} due to: "${reason.trim()}". Please approve this leave request.\n\nSincerely,\n${parent.name}`,
          date: new Date().toLocaleString(),
          status: 'Sent'
        }
      ]
    };

    // Load overall, insert, save
    const stored = localStorage.getItem('MOCK_LEAVE_REQUESTS');
    const allLeaves = stored ? JSON.parse(stored) : [];
    const updated = [newLeave, ...allLeaves];
    
    localStorage.setItem('MOCK_LEAVE_REQUESTS', JSON.stringify(updated));
    loadLeaves();
    setIsModalOpen(false);
    setLeaveDate('');
    setReason('');
    
    showToast('Leave request submitted & email notification sent to Teacher!');
  };

  return (
    <div className="parent-portal-container animate-fade-in-up">
      {/* Toast */}
      {toastMessage && (
        <div className="custom-toast">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="dashboard-title-area">
        <div className="dashboard-title">
          <h1>Leave Requests</h1>
          <p>Request leaves for your child and track approval communications.</p>
        </div>
        <div className="title-actions">
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> Apply Leave
          </button>
        </div>
      </div>

      {/* Child summary */}
      <div className="parent-student-badge" style={{ marginBottom: '24px', width: 'max-content', background: 'white', border: '1px solid #E2E8F0', padding: '10px 16px', borderRadius: '12px' }}>
        <span className="badge-label" style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Applying Leave For</span>
        <span className="badge-value" style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-main)' }}>{child?.name} ({child?.grade})</span>
      </div>

      {/* Leaves Roster */}
      <div className="parent-complaints-grid">
        {leaves.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '20px', border: '1px solid #F1F5F9', color: 'var(--text-muted)' }}>
            <Calendar size={40} style={{ margin: '0 auto 12px auto', color: '#94A3B8' }} />
            <h3>No Leave Requests Found</h3>
            <p style={{ fontSize: '14px', marginTop: '4px' }}>Submit a leave application using the button above.</p>
          </div>
        ) : (
          leaves.map((leave) => {
            return (
              <div key={leave.id} className="parent-complaint-card" style={{ cursor: 'default' }}>
                <div className="parent-complaint-header">
                  <div className="parent-complaint-title-block">
                    <h3>Leave Date: {leave.date}</h3>
                    <div className="parent-complaint-meta-row">
                      <strong>ID: {leave.id}</strong>
                      <span>•</span>
                      <span>Filed: {leave.submittedDate}</span>
                      <span>•</span>
                      <span>Reason: "{leave.reason}"</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span className={`status-pill badge-${leave.status === 'Approved' ? 'active' : leave.status === 'Rejected' ? 'needs-grading' : 'completed'}`} style={{ textTransform: 'capitalize' }}>
                      {leave.status}
                    </span>
                  </div>
                </div>

                {/* Timeline and Email Logs */}
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '24px' }}>
                    {/* Progress Timeline */}
                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', marginBottom: '12px' }}>Leave Status Timeline</h4>
                      <div className="parent-timeline">
                        <div className="parent-timeline-item completed">
                          <div className="parent-timeline-node"></div>
                          <span className="parent-timeline-title">Submitted</span>
                          <span className="parent-timeline-desc">Applied on {leave.submittedDate}</span>
                        </div>

                        <div className={`parent-timeline-item ${leave.status !== 'Pending' ? 'completed' : 'active'}`}>
                          <div className="parent-timeline-node"></div>
                          <span className="parent-timeline-title">Teacher Review</span>
                          <span className="parent-timeline-desc">
                            {leave.status === 'Pending' ? 'Awaiting teacher action' : `Reviewed by Teacher`}
                          </span>
                        </div>

                        <div className={`parent-timeline-item ${leave.status === 'Approved' ? 'completed' : leave.status === 'Rejected' ? 'rejected-timeline' : ''}`}>
                          <div className="parent-timeline-node"></div>
                          <span className="parent-timeline-title">{leave.status === 'Rejected' ? 'Rejected' : 'Approved'}</span>
                          <span className="parent-timeline-desc">
                            {leave.status === 'Pending' ? 'Resolution pending' : `Leave status set to ${leave.status}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Email Logs */}
                    <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                      <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Mail size={14} color="#8B5CF6" /> Simulated Email Dispatch Logs
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '200px', overflowY: 'auto' }}>
                        {leave.emailLogs && leave.emailLogs.map((log) => (
                          <div key={log.id} style={{ background: 'white', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                              <span>To: {log.to.split(' ')[0]}</span>
                              <span style={{ color: '#10B981', background: '#D1FAE5', padding: '1px 6px', borderRadius: '4px', fontSize: '10px' }}>{log.status}</span>
                            </div>
                            <div style={{ color: '#475569', fontWeight: 500, marginBottom: '2px' }}>Subject: {log.subject}</div>
                            <div style={{ color: '#64748B', whiteSpace: 'pre-line', fontSize: '11px', marginTop: '6px', background: '#F8FAFC', padding: '6px', borderRadius: '4px', borderLeft: '3px solid #8B5CF6' }}>
                              {log.body}
                            </div>
                            <div style={{ textAlign: 'right', fontSize: '9px', color: '#94A3B8', marginTop: '4px' }}>{log.date}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Apply Leave Modal */}
      {isModalOpen && (
        <div className="parent-modal-backdrop">
          <div className="parent-modal-container">
            <div className="parent-modal-header">
              <h3>Apply Student Leave Request</h3>
              <button className="parent-modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleApplyLeave}>
              {formError && (
                <div className="parent-alert-error">
                  <AlertCircle size={16} /> {formError}
                </div>
              )}

              <div className="parent-form-group">
                <label>Leave Date</label>
                <input 
                  type="date" 
                  value={leaveDate}
                  onChange={(e) => setLeaveDate(e.target.value)}
                  required
                />
              </div>

              <div className="parent-form-group" style={{ marginBottom: '24px' }}>
                <label>Reason / Explanation</label>
                <textarea 
                  rows="4" 
                  placeholder="Explain why the student is taking leave (e.g. sick leave, travel, family function)..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                Submit Leave Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
