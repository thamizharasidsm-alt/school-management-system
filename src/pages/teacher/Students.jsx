import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter,
  ChevronDown,
  Sparkles
} from 'lucide-react';

const STUDENTS_DATA = [
  { id: 'STU-2023-001', name: 'Emma Watson', class: '10-A', attPercent: 98, attText: 'Excellent', attStatus: 'excellent', grade: 'Grade A+', score: 92, avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267041' },
  { id: 'STU-2023-042', name: 'Marcus Johnson', class: '10-B', attPercent: 82, attText: 'Need Attention', attStatus: 'warning', grade: 'Grade B', score: 76, avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267042' },
  { id: 'STU-2023-118', name: 'Sophia Chen', class: '10-A', attPercent: 100, attText: 'Excellent', attStatus: 'excellent', grade: 'Grade A', score: 88, avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267043' },
  { id: 'STU-2023-055', name: 'Lucas Garcia', class: '10-C', attPercent: 68, attText: 'At Risk', attStatus: 'danger', grade: 'Grade C', score: 58, avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267044' },
  { id: 'STU-2023-089', name: 'Olivia Smith', class: '10-B', attPercent: 94, attText: 'Good', attStatus: 'excellent', grade: 'Grade A-', score: 84, avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267045' },
  { id: 'STU-2023-201', name: 'Ethan Nguyen', class: '10-A', attPercent: 88, attText: 'Need Attention', attStatus: 'warning', grade: 'Grade B+', score: 79, avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267046' },
  { id: 'STU-2023-227', name: 'Aarohi Patel', class: '10-A', attPercent: 96, attText: 'Excellent', attStatus: 'excellent', grade: 'Grade A', score: 90, avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267047' },
];

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    function loadTeacherStudents() {
      setLoading(true);
      const storedStudents = localStorage.getItem('MOCK_STUDENTS');
      const parsedStudents = storedStudents ? JSON.parse(storedStudents) : STUDENTS_DATA;

      // Map student records to include the attendance and performance fields expected by this UI
      const mapped = parsedStudents.map((s, idx) => {
        // Generate mock performance data deterministically based on their name/id length
        const score = 60 + ((s.name.length * 7) % 38); 
        const attPercent = 75 + ((s.id.length * 9) % 26);
        let attText = 'Good';
        let attStatus = 'excellent';
        if (attPercent < 80) {
          attText = 'At Risk';
          attStatus = 'danger';
        } else if (attPercent < 90) {
          attText = 'Need Attention';
          attStatus = 'warning';
        } else {
          attText = 'Excellent';
          attStatus = 'excellent';
        }

        let grade = 'Grade B';
        if (score >= 90) grade = 'Grade A+';
        else if (score >= 80) grade = 'Grade A';
        else if (score >= 70) grade = 'Grade B+';

        return {
          id: s.id,
          name: s.name,
          class: s.grade ? s.grade.replace('Grade ', '') : '10-A', // Map e.g. "Grade 4 - A" -> "4-A"
          attPercent,
          attText,
          attStatus,
          grade,
          score,
          avatar: s.avatar
        };
      });
      setStudents(mapped);
      setLoading(false);
    }
    loadTeacherStudents();
  }, []);

  const filteredStudents = students.filter(student => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return student.name.toLowerCase().includes(query) || student.id.toLowerCase().includes(query);
  });

  return (
    <div className="students-page-container">
      <div className="page-header-flex">
        <div className="page-title-group">
          <h1>Students</h1>
        </div>
      </div>

      <div className="students-content-card">
        {/* Controls */}
        <div className="students-controls">
          <div className="students-search-bar">
            <Search size={18} color="#94A3B8" />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button className="students-filter-btn">
            <Filter size={16} /> All Classes <ChevronDown size={16} />
          </button>
        </div>

        {/* Table */}
        <div className="students-table-container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>Loading students...</div>
          ) : (
            <table className="students-table">
              <thead>
                <tr>
                  <th>STUDENT</th>
                  <th>CLASS</th>
                  <th>ATTENDANCE %</th>
                  <th>PERFORMANCE</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                      No students found.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map(student => (
                    <tr key={student.id}>
                      <td>
                        <div className="student-info-cell">
                          <img src={student.avatar} alt={student.name} className="student-avatar-img" />
                          <div className="student-name-id">
                            <span className="student-name">{student.name}</span>
                            <span className="student-id">{student.id}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="class-badge-purple">{student.class}</span>
                      </td>
                      <td>
                        <div className={`attendance-cell status-${student.attStatus}`}>
                          <span className="att-percent">{student.attPercent}%</span>
                          <span className="att-text">{student.attText}</span>
                        </div>
                      </td>
                      <td>
                        <div className="performance-cell">
                          <div className="perf-text-row">
                            <span className="grade-text">{student.grade}</span>
                            <span className="score-text">{student.score}/100</span>
                          </div>
                          <div className="perf-bar-track">
                            <div 
                              className={`perf-bar-fill ${student.attStatus === 'danger' ? 'danger-fill' : student.attStatus === 'warning' ? 'warning-fill' : 'success-fill'}`} 
                              style={{ width: `${student.score}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <button className="ai-assistant-fab fab-dashboard">
        <Sparkles size={18} /> AI Assistant
      </button>
    </div>
  );
}
