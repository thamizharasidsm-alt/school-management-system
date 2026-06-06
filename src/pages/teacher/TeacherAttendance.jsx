import React, { useState, useMemo } from 'react';
import { 
  Save, 
  Users, 
  Calendar,
  Check,
  X,
  Clock,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const INITIAL_STUDENTS = [
  { id: 1, name: 'Alice Freeman', roll: 'Roll No: 01', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267051', status: 'present' },
  { id: 2, name: 'David Martinez', roll: 'Roll No: 02', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267052', status: 'absent' },
  { id: 3, name: 'Emma Chen', roll: 'Roll No: 03', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267053', status: 'present' },
  { id: 4, name: 'James Wilson', roll: 'Roll No: 04', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267054', status: 'late' },
  { id: 5, name: 'Priya Patel', roll: 'Roll No: 05', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267055', status: 'absent' },
  { id: 6, name: 'Mateo Garcia', roll: 'Roll No: 06', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267056', status: 'present' },
];

const ANALYTICS_DATA = [
  { name: 'Jan', present: 92, absent: 8 },
  { name: 'Feb', present: 88, absent: 12 },
  { name: 'Mar', present: 94, absent: 6 },
  { name: 'Apr', present: 90, absent: 10 },
];

const CLASS_STATS = [
  { name: 'Class 10-A', value: 92 },
  { name: 'Class 10-B', value: 96 },
  { name: 'Class 10-C', value: 85 },
  { name: 'Class 10-D', value: 96 },
];

export default function TeacherAttendance() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [isSaving, setIsSaving] = useState(false);

  const handleStatusChange = (id, newStatus) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === id ? { ...student, status: newStatus } : student
      )
    );
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      alert("Attendance saved successfully!");
      setIsSaving(false);
    }, 600);
  };

  // Derived state for the summary cards
  const stats = useMemo(() => {
    return students.reduce((acc, student) => {
      acc[student.status]++;
      return acc;
    }, { present: 0, absent: 0, late: 0 });
  }, [students]);

  return (
    <div className="teacher-attendance-container">
      <div className="page-header-flex">
        <div className="page-title-group">
          <h1>Attendance Marking</h1>
        </div>
        <button className="save-attendance-btn" onClick={handleSave} disabled={isSaving}>
          <Save size={18} /> {isSaving ? 'Saving...' : 'Save Attendance'}
        </button>
      </div>

      {/* Top Stat Cards */}
      <div className="attendance-stats-grid">
        <div className="att-stat-card present">
          <h2>{stats.present}</h2>
          <p>Present</p>
        </div>
        <div className="att-stat-card absent">
          <h2>{stats.absent}</h2>
          <p>Absent</p>
        </div>
        <div className="att-stat-card late">
          <h2>{stats.late}</h2>
          <p>Late</p>
        </div>
      </div>

      <div className="attendance-main-grid">
        {/* Left Panel: Marking List */}
        <div className="attendance-marking-panel">
          <div className="marking-panel-header">
            <div className="marking-controls">
              <button className="filter-dropdown">
                <Users size={16} className="text-muted" /> 
                Class 10-A Mathematics 
                <ChevronDown size={16} />
              </button>
              <button className="filter-dropdown">
                <Calendar size={16} className="text-muted" /> 
                Today, Apr 26 
                <ChevronDown size={16} />
              </button>
            </div>
            <span className="student-count-badge">32 Students</span>
          </div>

          <div className="marking-list">
            {students.map(student => (
              <div key={student.id} className="marking-list-item">
                <div className="student-info-cell">
                  <img src={student.avatar} alt={student.name} className="student-avatar-img" />
                  <div className="student-name-id">
                    <span className="student-name">{student.name}</span>
                    <span className="student-id">{student.roll}</span>
                  </div>
                </div>
                
                <div className="status-buttons-group">
                  <button 
                    className={`status-btn btn-present ${student.status === 'present' ? 'active' : ''}`}
                    onClick={() => handleStatusChange(student.id, 'present')}
                  >
                    <Check size={14} /> Present
                  </button>
                  <button 
                    className={`status-btn btn-absent ${student.status === 'absent' ? 'active' : ''}`}
                    onClick={() => handleStatusChange(student.id, 'absent')}
                  >
                    <X size={14} /> Absent
                  </button>
                  <button 
                    className={`status-btn btn-late ${student.status === 'late' ? 'active' : ''}`}
                    onClick={() => handleStatusChange(student.id, 'late')}
                  >
                    <Clock size={14} /> Late
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Analytics */}
        <div className="attendance-analytics-panel">
          <h3>Monthly Analytics</h3>
          
          <div className="analytics-chart-wrapper">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ANALYTICS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={12}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="present" fill="#A78BFA" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" fill="#FDA4AF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="chart-legend-custom">
              <span><span className="legend-dot purple-dot"></span> Present</span>
              <span><span className="legend-dot red-dot"></span> Absent</span>
            </div>
          </div>

          <div className="class-stats-list">
            {CLASS_STATS.map((stat, idx) => (
              <div key={idx} className="class-stat-row-item">
                <span className="class-stat-name">{stat.name}</span>
                <div className="class-stat-bar-container">
                  <div className="class-stat-bar-track">
                    <div className="class-stat-bar-fill" style={{ width: `${stat.value}%` }}></div>
                  </div>
                  <span className="class-stat-value">{stat.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="ai-assistant-fab fab-dashboard">
        <Sparkles size={18} /> AI Assistant
      </button>
    </div>
  );
}
