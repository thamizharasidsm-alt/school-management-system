import React, { useState } from 'react';
import { GraduationCap, Pencil, Trash2, ChevronDown, X } from 'lucide-react';
import './AcademicExams.css';

export const MOCK_EXAMS = [
  {
    id: 1,
    title: 'English Writing Assessment',
    status: 'Completed',
    date: 'April 16 2026',
    grade: 'Grade 6',
    subject: 'English',
    passed: '4/5 Passed'
  },
  {
    id: 2,
    title: 'Unit Test Mathematics',
    status: 'Completed',
    date: 'April 18 2026',
    grade: 'Grade 5',
    subject: 'Mathematics',
    passed: '3/8 Passed'
  },
  {
    id: 3,
    title: 'Mid Term Examination',
    status: 'Scheduled',
    date: 'April 20-25 2026',
    grade: 'Grade 5-8',
    subject: 'All Subjects',
    passed: '8/8 Passed'
  },
  {
    id: 4,
    title: 'Final Exam Term 1',
    status: 'Planning',
    date: 'May 5-15 2026',
    grade: 'Grade 3-8',
    subject: 'All Subjects'
  },
  {
    id: 5,
    title: 'Science Lab Practical',
    status: 'Upcoming',
    date: 'Apr 22 2026',
    grade: 'Grade 7-8',
    subject: 'Science'
  }
];

export default function AcademicExams() {
  const [updateFlag, setUpdateFlag] = useState(0);
  const [editingExam, setEditingExam] = useState(null);
  const [formError, setFormError] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'status-completed';
      case 'Scheduled': return 'status-scheduled';
      case 'Planning': return 'status-planning';
      case 'Upcoming': return 'status-upcoming';
      default: return 'status-planning';
    }
  };

  return (
    <div className="exams-list-container">
      {MOCK_EXAMS.map(exam => (
        <div key={exam.id} className="exam-card">
          <div className="exam-icon-container">
            <GraduationCap size={24} className="exam-icon" />
          </div>
          
          <div className="exam-content">
            <div className="exam-header-row">
              <h3 className="exam-title">{exam.title}</h3>
              <span className={`exam-status-badge ${getStatusColor(exam.status)}`}>
                {exam.status}
              </span>
            </div>
            
            <div className="exam-details-row">
              <span className="exam-meta">
                {exam.date} &bull; {exam.grade} &bull; {exam.subject}
              </span>
              {exam.passed && (
                <span className="exam-passed">{exam.passed}</span>
              )}
            </div>
          </div>
          
          <div className="exam-actions">
            <button className="action-btn edit" onClick={() => { setEditingExam(exam); setFormError(''); }}><Pencil size={18} /></button>
            <button className="action-btn delete" onClick={() => {
              if (window.confirm("Are you sure you want to delete this exam?")) {
                const index = MOCK_EXAMS.findIndex(e => e.id === exam.id);
                if (index !== -1) MOCK_EXAMS.splice(index, 1);
                setUpdateFlag(prev => prev + 1);
              }
            }}><Trash2 size={18} /></button>
            <button className="action-btn more"><ChevronDown size={18} /></button>
          </div>
        </div>
      ))}

      {editingExam && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#0F172A' }}>Edit Exam</h2>
              <X style={{ cursor: 'pointer', color: '#64748B' }} onClick={() => { setEditingExam(null); setFormError(''); }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {formError && (
                <div style={{ color: '#EF4444', fontSize: '13px', backgroundColor: '#FEF2F2', padding: '10px', borderRadius: '6px', border: '1px solid #FCA5A5' }}>
                  {formError}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Exam Title</label>
                <input type="text" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingExam.title} onChange={e => setEditingExam({...editingExam, title: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Status</label>
                <select style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', background: 'white' }} value={editingExam.status} onChange={e => setEditingExam({...editingExam, status: e.target.value})}>
                  <option value="Completed">Completed</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Planning">Planning</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Date</label>
                <input type="text" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingExam.date} onChange={e => setEditingExam({...editingExam, date: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Grade</label>
                <input type="text" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingExam.grade} onChange={e => setEditingExam({...editingExam, grade: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Subject</label>
                <input type="text" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingExam.subject} onChange={e => setEditingExam({...editingExam, subject: e.target.value})} />
              </div>
              
              <button 
                className="btn-primary" 
                style={{ marginTop: '16px', justifyContent: 'center', width: '100%', padding: '12px' }} 
                onClick={() => {
                  if (!editingExam.title.trim() || !editingExam.date.trim() || !editingExam.grade.trim() || !editingExam.subject.trim()) {
                    setFormError('All fields except Passed are required.');
                    return;
                  }
                  
                  const index = MOCK_EXAMS.findIndex(e => e.id === editingExam.id);
                  if (index !== -1) {
                    MOCK_EXAMS[index] = {
                      ...editingExam,
                      title: editingExam.title.trim(),
                      date: editingExam.date.trim(),
                      grade: editingExam.grade.trim(),
                      subject: editingExam.subject.trim()
                    };
                  }
                  
                  setUpdateFlag(prev => prev + 1);
                  setEditingExam(null);
                  setFormError('');
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
