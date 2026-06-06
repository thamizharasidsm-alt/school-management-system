import React, { useState } from 'react';
import { Download, GraduationCap, Users2, CheckCircle2, XCircle, Clock, CalendarCheck, Search, Calendar, Filter } from 'lucide-react';

import { MOCK_STUDENTS, MOCK_STAFF } from './UserManagement';

export default function Attendance() {
  const [activeTab, setActiveTab] = useState('student');
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [dateStr, setDateStr] = useState(new Date().toISOString().split('T')[0]);
  const [gradeFilter, setGradeFilter] = useState('All');

  const currentData = activeTab === 'student' ? MOCK_STUDENTS : MOCK_STAFF;

  const getFilterOptions = () => {
    if (activeTab === 'student') return [...new Set(MOCK_STUDENTS.map(s => s.grade))];
    else return [...new Set(MOCK_STAFF.map(s => s.department))];
  };

  const filteredData = currentData.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase()) || person.id.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesGrade = true;
    if (gradeFilter !== 'All') {
      matchesGrade = activeTab === 'student' ? person.grade === gradeFilter : person.department === gradeFilter;
    }
    return matchesSearch && matchesGrade;
  });

  const handleStatusChange = (id, newStatus) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [id]: { ...(prev[id] || { status: 'present', remarks: '' }), status: newStatus }
    }));
  };

  const handleRemarksChange = (id, remarks) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [id]: { ...(prev[id] || { status: 'present', remarks: '' }), remarks }
    }));
  };

  let presentCount = 0, absentCount = 0, lateCount = 0;
  filteredData.forEach(person => {
    const record = attendanceRecords[person.id] || { status: 'present' };
    if (record.status === 'present') presentCount++;
    else if (record.status === 'absent') absentCount++;
    else if (record.status === 'late') lateCount++;
  });

  return (
    <>
      <div className="dashboard-title-area">
        <div className="dashboard-title">
          <h1>Attendance</h1>
          <p>Track and manage student and staff attendance</p>
        </div>
        <div className="title-actions">
          <button className="btn-outline">
            <Download size={18} /> Export Excel
          </button>
        </div>
      </div>

      <div className="academic-tabs">
        <button 
          className={`acad-tab ${activeTab === 'student' ? 'active' : ''}`}
          onClick={() => { setActiveTab('student'); setGradeFilter('All'); }}
        >
          <GraduationCap size={18} /> Student Attendance
        </button>
        <button 
          className={`acad-tab ${activeTab === 'staff' ? 'active' : ''}`}
          onClick={() => { setActiveTab('staff'); setGradeFilter('All'); }}
        >
          <Users2 size={18} /> Staff Attendance
        </button>
      </div>

      {/* Summary Cards */}
      <div className="attendance-summary">
        <div className="att-summary-card present">
          <div className="att-icon-wrapper">
            <CheckCircle2 size={24} />
          </div>
          <div className="att-info">
            <h2>{presentCount}</h2>
            <p>Present</p>
          </div>
        </div>

        <div className="att-summary-card absent">
          <div className="att-icon-wrapper">
            <XCircle size={24} />
          </div>
          <div className="att-info">
            <h2>{absentCount}</h2>
            <p>Absent</p>
          </div>
        </div>

        <div className="att-summary-card late">
          <div className="att-icon-wrapper">
            <Clock size={24} />
          </div>
          <div className="att-info">
            <h2>{lateCount}</h2>
            <p>Late</p>
          </div>
        </div>

        <div className="att-summary-card excused">
          <div className="att-icon-wrapper">
            <CalendarCheck size={24} />
          </div>
          <div className="att-info">
            <h2>0</h2>
            <p>Excused</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="table-controls attendance-controls">
        <div className="att-filters-left">
          <div className="table-search" style={{ width: '250px' }}>
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="date-picker-input" style={{ display: 'flex', alignItems: 'center', background: 'white', border: '1px solid #E2E8F0', padding: '8px 12px', borderRadius: '12px' }}>
            <input 
              type="date" 
              value={dateStr} 
              onChange={e => setDateStr(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontFamily: 'inherit', color: '#475569', fontWeight: 500 }}
            />
          </div>

          <select 
            className="filter-btn" 
            style={{ appearance: 'none', background: 'white', border: '1px solid #E2E8F0', padding: '10px 16px', borderRadius: '20px', color: '#64748B', fontWeight: 500, cursor: 'pointer' }}
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
          >
            <option value="All">{activeTab === 'student' ? 'All Grades' : 'All Departments'}</option>
            {getFilterOptions().map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        
        <button className="btn-primary" style={{ borderRadius: '8px' }} onClick={() => alert(`Attendance successfully saved for ${filteredData.length} records on ${dateStr}!`)}>
          Save Batch
        </button>
      </div>

      {/* Data Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>{activeTab === 'student' ? 'STUDENT' : 'STAFF'}</th>
              <th>ID</th>
              <th>{activeTab === 'student' ? 'GRADE' : 'DEPARTMENT'}</th>
              <th>STATUS</th>
              <th>REMARKS</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(person => {
              const record = attendanceRecords[person.id] || { status: 'present', remarks: '' };
              return (
                <tr key={person.id}>
                  <td style={{ fontWeight: 500, color: '#0F172A' }}>{person.name}</td>
                  <td style={{ color: '#475569' }}>{person.id}</td>
                  <td>{activeTab === 'student' ? person.grade : person.department}</td>
                  <td>
                    <div className="status-toggles">
                      <button 
                        className={`status-toggle present ${record.status === 'present' ? 'active' : ''}`}
                        onClick={() => handleStatusChange(person.id, 'present')}
                      >
                        <CheckCircle2 size={14} /> Present
                      </button>
                      <button 
                        className={`status-toggle absent ${record.status === 'absent' ? 'active' : ''}`}
                        onClick={() => handleStatusChange(person.id, 'absent')}
                      >
                        <XCircle size={14} /> Absent
                      </button>
                      <button 
                        className={`status-toggle late ${record.status === 'late' ? 'active' : ''}`}
                        onClick={() => handleStatusChange(person.id, 'late')}
                      >
                        <Clock size={14} /> Late
                      </button>
                    </div>
                  </td>
                  <td>
                    <input 
                      type="text" 
                      className="remarks-input" 
                      placeholder="Add remarks" 
                      value={record.remarks}
                      onChange={(e) => handleRemarksChange(person.id, e.target.value)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
