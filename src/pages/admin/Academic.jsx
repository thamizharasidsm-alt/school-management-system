import React, { useState, useEffect } from 'react';
import { Plus, GraduationCap, BookOpen, Clock, CalendarDays, Pencil, Trash2, Users, Search, Filter, ChevronDown, X } from 'lucide-react';
import AcademicTimetable, { MOCK_TIMETABLE } from './AcademicTimetable';
import AcademicExams, { MOCK_EXAMS } from './AcademicExams';
import { MOCK_STUDENTS, MOCK_STAFF } from './UserManagement';

export const MOCK_CLASSES = [
  {
    id: 1,
    grade: 'Grade 5',
    section: 'A',
    room: 'Room 101',
    teacher: 'Sarah Connor',
    schedule: 'Mon - Fri 8:00-15:00',
  },
  {
    id: 2,
    grade: 'Grade 6',
    section: 'B',
    room: 'Room 205',
    teacher: 'Emily Watson',
    schedule: 'Mon - Fri 8:00-15:30',
  },
  {
    id: 3,
    grade: 'Grade 4',
    section: 'A',
    room: 'Room 103',
    teacher: 'Maria Santos',
    schedule: 'Mon - Fri 8:00-14:30',
  },
  {
    id: 4,
    grade: 'Grade 7',
    section: 'C',
    room: 'Room 101',
    teacher: 'James Porter',
    schedule: 'Mon - Fri 8:00-15:00',
  },
  {
    id: 5,
    grade: 'Grade 5',
    section: 'B',
    room: 'Room 205',
    teacher: 'Lisa Park',
    schedule: 'Mon - Fri 8:00-15:30',
  },
  {
    id: 6,
    grade: 'Grade 8',
    section: 'A',
    room: 'Room 103',
    teacher: 'Alice Johnson',
    schedule: 'Mon - Fri 8:00-14:30',
  }
];

export const MOCK_SUBJECTS = [
  { id: 1, name: 'Mathematics', code: 'MATH101', teacher: 'Sarah Connor', hrs: '5h', grade: 'Grade 5 - A' },
  { id: 2, name: 'Science', code: 'SCI101', teacher: 'Robert Chen', hrs: '5h', grade: 'Grade 6 - B' },
  { id: 3, name: 'English', code: 'ENG101', teacher: 'Maria Santos', hrs: '5h', grade: 'Grade 7 - C' },
  { id: 4, name: 'History', code: 'HIS101', teacher: 'James Porter', hrs: '5h', grade: 'Grade 4 - A' },
  { id: 5, name: 'Arts', code: 'ART101', teacher: 'Lisa Park', hrs: '5h', grade: 'Grade 8 - A' },
  { id: 6, name: 'Physical education', code: 'PE101', teacher: 'David Kim', hrs: '5h', grade: 'Grade 5 - B' },
];

export default function Academic() {
  const [activeTab, setActiveTab] = useState('classes');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [updateFlag, setUpdateFlag] = useState(0);

  const [classesList, setClassesList] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newClassData, setNewClassData] = useState({ grade: '', section: '', room: '', teacher: '', schedule: '' });
  const [newSubjectData, setNewSubjectData] = useState({ name: '', code: '', teacher: '', hrs: '', grade: '' });
  const [newTimetableData, setNewTimetableData] = useState({ startTime: '', endTime: '' });
  const [newExamData, setNewExamData] = useState({ title: '', status: 'Planning', date: '', grade: '', subject: '' });

  // Load from LocalStorage
  useEffect(() => {
    // Load staff for dropdown allocation
    let storedStaff = localStorage.getItem('MOCK_STAFF');
    if (!storedStaff) {
      localStorage.setItem('MOCK_STAFF', JSON.stringify(MOCK_STAFF));
      storedStaff = JSON.stringify(MOCK_STAFF);
    }
    const parsedStaff = JSON.parse(storedStaff);
    setStaffList(parsedStaff);

    // Load students for count per class
    let storedStudents = localStorage.getItem('MOCK_STUDENTS');
    if (!storedStudents) {
      localStorage.setItem('MOCK_STUDENTS', JSON.stringify(MOCK_STUDENTS));
      storedStudents = JSON.stringify(MOCK_STUDENTS);
    }
    const parsedStudents = JSON.parse(storedStudents);
    setStudentsList(parsedStudents);

    // Load classes
    let storedClasses = localStorage.getItem('MOCK_CLASSES');
    if (!storedClasses) {
      // Map initial classes to match default staff assignments
      const mappedDefaultClasses = MOCK_CLASSES.map(cls => {
        const staffObj = parsedStaff.find(s => s.name === cls.teacher);
        return {
          id: cls.id,
          grade: cls.grade,
          section: cls.section,
          room: cls.room,
          teacher: cls.teacher,
          teacher_id: staffObj ? staffObj.id : 'STF-1001',
          schedule: cls.schedule
        };
      });
      localStorage.setItem('MOCK_CLASSES', JSON.stringify(mappedDefaultClasses));
      storedClasses = JSON.stringify(mappedDefaultClasses);
    }
    
    const parsedClasses = JSON.parse(storedClasses);
    setClassesList(parsedClasses);
    
    // Mutate the exported reference to keep in sync
    MOCK_CLASSES.length = 0;
    MOCK_CLASSES.push(...parsedClasses);

    setLoading(false);
  }, [updateFlag]);

  return (
    <>
      <div className="dashboard-title-area">
        <div className="dashboard-title">
          <h1>Academic Management</h1>
          <p>Classes, subject , Timetable and exams</p>
        </div>
        <div className="title-actions">
          <button className="btn-primary" onClick={() => { setIsAddModalOpen(true); setFormError(''); }}>
            <Plus size={18} /> {activeTab === 'classes' ? 'Add Class' : activeTab === 'subjects' ? 'Add Subject' : activeTab === 'timetable' ? 'Add Period' : 'Add Exam'}
          </button>
        </div>
      </div>

      <div className="academic-tabs">
        <button 
          className={`acad-tab ${activeTab === 'classes' ? 'active' : ''}`}
          onClick={() => setActiveTab('classes')}
        >
          <GraduationCap size={18} /> Classes & sections
        </button>
        <button 
          className={`acad-tab ${activeTab === 'subjects' ? 'active' : ''}`}
          onClick={() => setActiveTab('subjects')}
        >
          <BookOpen size={18} /> Subjects
        </button>
        <button 
          className={`acad-tab ${activeTab === 'timetable' ? 'active' : ''}`}
          onClick={() => setActiveTab('timetable')}
        >
          <Clock size={18} /> Timetable
        </button>
        <button 
          className={`acad-tab ${activeTab === 'exams' ? 'active' : ''}`}
          onClick={() => setActiveTab('exams')}
        >
          <CalendarDays size={18} /> Exams & Results
        </button>
      </div>

      {loading && activeTab === 'classes' ? (
        <div style={{ textAlign: 'center', padding: '50px', fontSize: '16px', color: '#64748B' }}>Loading classes...</div>
      ) : null}

      {!loading && activeTab === 'classes' && (
        <div className="classes-grid">
          {classesList.map(cls => (
            <div key={cls.id} className="class-card">
              <div className="class-card-header">
                <div className="class-icon">
                  <GraduationCap size={20} />
                </div>
                <div className="class-actions">
                  <button className="action-btn edit"><Pencil size={16} /></button>
                  <button className="action-btn delete" onClick={() => {
                    if (window.confirm(`Are you sure you want to delete ${cls.grade} - ${cls.section}?`)) {
                      const updated = classesList.filter(c => c.id !== cls.id);
                      localStorage.setItem('MOCK_CLASSES', JSON.stringify(updated));
                      setUpdateFlag(prev => prev + 1);
                    }
                  }}><Trash2 size={16} /></button>
                </div>
              </div>
              
              <div className="class-details">
                <h3 className="class-title">{cls.grade} - {cls.section}</h3>
                <p className="class-room">{cls.room}</p>
                <div className="class-stats">
                  <span className="student-count">
                    <Users size={14} /> {studentsList.filter(s => s.grade === `${cls.grade} - ${cls.section}`).length} Students
                  </span>
                  <span className="grade-badge-purple">{cls.grade}</span>
                </div>
              </div>

              <div className="class-footer">
                <div className="footer-item">
                  <span className="footer-label">Class Teacher:</span>
                  <span className="footer-value">{cls.teacher}</span>
                </div>
                <div className="footer-item">
                  <span className="footer-label">Schedule:</span>
                  <span className="footer-value">{cls.schedule}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'subjects' && (
        <div className="subjects-view">
          <div className="table-controls" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="table-search" style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '10px 16px', borderRadius: '12px', width: '300px', gap: '10px', color: 'var(--text-muted)', border: '1px solid #E2E8F0' }}>
              <Search size={18} />
              <input type="text" placeholder="Search by name or ID..." style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontFamily: 'inherit' }} />
            </div>
            
            <div className="filter-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', border: '1px solid #E2E8F0', background: 'white', borderRadius: '12px', fontWeight: '500', color: 'var(--text-main)', cursor: 'pointer' }}>
              <Filter size={16} /> All Grade <ChevronDown size={16} />
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>SUBJECT NAME</th>
                  <th>CODE</th>
                  <th>TEACHER</th>
                  <th>HRS/WK</th>
                  <th>GRADE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_SUBJECTS.map((sub) => (
                  <tr key={sub.id}>
                    <td>
                      <span style={{ fontWeight: '500', color: '#0F172A' }}>{sub.name}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '13px', color: '#64748B', background: '#F1F5F9', padding: '4px 8px', borderRadius: '6px' }}>{sub.code}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '13px', background: '#F0F9FF', color: '#0369A1', padding: '4px 10px', borderRadius: '12px', fontWeight: '500' }}>{sub.teacher}</span>
                    </td>
                    <td>
                      <div className="status-badge active" style={{ background: '#10B981', color: 'white' }}>
                        <div className="status-dot" style={{ background: 'white' }}></div>
                        {sub.hrs}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '13px', color: '#475569' }}>{sub.grade}</span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn edit"><Pencil size={16} /></button>
                        <button className="action-btn delete"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'timetable' && <AcademicTimetable />}
      {activeTab === 'exams' && <AcademicExams />}

      {isAddModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#0F172A' }}>
                {activeTab === 'classes' ? 'Add Class' : activeTab === 'subjects' ? 'Add Subject' : activeTab === 'timetable' ? 'Add Timetable Slot' : 'Add Exam'}
              </h2>
              <X style={{ cursor: 'pointer', color: '#64748B' }} onClick={() => { setIsAddModalOpen(false); setFormError(''); }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {formError && (
                <div style={{ color: '#EF4444', fontSize: '13px', backgroundColor: '#FEF2F2', padding: '10px', borderRadius: '6px', border: '1px solid #FCA5A5' }}>
                  {formError}
                </div>
              )}
              
              {activeTab === 'classes' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Grade</label>
                    <input type="text" placeholder="e.g. Grade 5" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newClassData.grade} onChange={e => setNewClassData({...newClassData, grade: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Section</label>
                    <input type="text" placeholder="e.g. A" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newClassData.section} onChange={e => setNewClassData({...newClassData, section: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Room</label>
                    <input type="text" placeholder="e.g. Room 101" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newClassData.room} onChange={e => setNewClassData({...newClassData, room: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Class Teacher (Compulsory)</label>
                    <select 
                      style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', background: 'white', fontSize: '14px' }} 
                      value={newClassData.teacher} 
                      onChange={e => setNewClassData({...newClassData, teacher: e.target.value})}
                    >
                      <option value="">-- Select Allocated Teacher --</option>
                      {staffList.filter(s => s.status === 'Active').map(teacher => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.name} ({teacher.department})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Schedule</label>
                    <input type="text" placeholder="e.g. Mon - Fri 8:00-15:00" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newClassData.schedule} onChange={e => setNewClassData({...newClassData, schedule: e.target.value})} />
                  </div>
                </>
              )}

              {activeTab === 'subjects' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Subject Name</label>
                    <input type="text" placeholder="e.g. Mathematics" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newSubjectData.name} onChange={e => setNewSubjectData({...newSubjectData, name: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Code</label>
                    <input type="text" placeholder="e.g. MATH101" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newSubjectData.code} onChange={e => setNewSubjectData({...newSubjectData, code: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Teacher</label>
                    <input type="text" placeholder="e.g. Sarah Connor" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newSubjectData.teacher} onChange={e => setNewSubjectData({...newSubjectData, teacher: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Hours/Week</label>
                    <input type="text" placeholder="e.g. 5h" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newSubjectData.hrs} onChange={e => setNewSubjectData({...newSubjectData, hrs: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Grade</label>
                    <input type="text" placeholder="e.g. Grade 5 - A" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newSubjectData.grade} onChange={e => setNewSubjectData({...newSubjectData, grade: e.target.value})} />
                  </div>
                </>
              )}

              {activeTab === 'timetable' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Start Time</label>
                    <input type="text" placeholder="e.g. 01:30 PM" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newTimetableData.startTime} onChange={e => setNewTimetableData({...newTimetableData, startTime: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>End Time</label>
                    <input type="text" placeholder="e.g. 02:30 PM" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newTimetableData.endTime} onChange={e => setNewTimetableData({...newTimetableData, endTime: e.target.value})} />
                  </div>
                </>
              )}

              {activeTab === 'exams' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Exam Title</label>
                    <input type="text" placeholder="e.g. Mid Term" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newExamData.title} onChange={e => setNewExamData({...newExamData, title: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Status</label>
                    <select style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', background: 'white' }} value={newExamData.status} onChange={e => setNewExamData({...newExamData, status: e.target.value})}>
                      <option value="Planning">Planning</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Date</label>
                    <input type="text" placeholder="e.g. Jun 10 2026" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newExamData.date} onChange={e => setNewExamData({...newExamData, date: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Grade</label>
                    <input type="text" placeholder="e.g. Grade 5" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newExamData.grade} onChange={e => setNewExamData({...newExamData, grade: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Subject</label>
                    <input type="text" placeholder="e.g. Mathematics" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newExamData.subject} onChange={e => setNewExamData({...newExamData, subject: e.target.value})} />
                  </div>
                </>
              )}

              <button 
                className="btn-primary" 
                style={{ marginTop: '16px', justifyContent: 'center', width: '100%', padding: '12px' }} 
                onClick={() => {
                  if (activeTab === 'classes') {
                    if (!newClassData.grade.trim() || !newClassData.section.trim() || !newClassData.room.trim() || !newClassData.teacher.trim()) {
                      setFormError('Grade, Section, Room, and Class Teacher allocation are required.'); return;
                    }

                    const teacherObj = staffList.find(s => s.id === newClassData.teacher);
                    const newClass = { 
                      id: classesList.length + 1, 
                      grade: newClassData.grade.trim(),
                      section: newClassData.section.trim(),
                      room: newClassData.room.trim(),
                      teacher: teacherObj ? teacherObj.name : newClassData.teacher,
                      teacher_id: newClassData.teacher,
                      schedule: newClassData.schedule.trim() || 'Mon - Fri 8:00-15:00'
                    };

                    const updated = [...classesList, newClass];
                    localStorage.setItem('MOCK_CLASSES', JSON.stringify(updated));
                    setNewClassData({ grade: '', section: '', room: '', teacher: '', schedule: '' });
                  } else if (activeTab === 'subjects') {
                    if (!newSubjectData.name.trim() || !newSubjectData.code.trim() || !newSubjectData.teacher.trim() || !newSubjectData.grade.trim()) {
                      setFormError('Name, Code, Teacher, and Grade are required.'); return;
                    }
                    MOCK_SUBJECTS.push({ id: MOCK_SUBJECTS.length + 1, ...newSubjectData });
                    setNewSubjectData({ name: '', code: '', teacher: '', hrs: '', grade: '' });
                  } else if (activeTab === 'timetable') {
                    if (!newTimetableData.startTime.trim() || !newTimetableData.endTime.trim()) {
                      setFormError('Start Time and End Time are required.'); return;
                    }
                    MOCK_TIMETABLE.push({
                      time: [newTimetableData.startTime, newTimetableData.endTime],
                      monday: { type: 'empty' }, tuesday: { type: 'empty' }, wednesday: { type: 'empty' }, thursday: { type: 'empty' }, friday: { type: 'empty' }
                    });
                    setNewTimetableData({ startTime: '', endTime: '' });
                  } else if (activeTab === 'exams') {
                    if (!newExamData.title.trim() || !newExamData.date.trim() || !newExamData.grade.trim() || !newExamData.subject.trim()) {
                      setFormError('All fields are required.'); return;
                    }
                    MOCK_EXAMS.push({ id: MOCK_EXAMS.length + 1, ...newExamData });
                    setNewExamData({ title: '', status: 'Planning', date: '', grade: '', subject: '' });
                  }
                  setUpdateFlag(prev => prev + 1);
                  setIsAddModalOpen(false);
                  setFormError('');
                }}
              >
                Save {activeTab === 'classes' ? 'Class' : activeTab === 'subjects' ? 'Subject' : activeTab === 'timetable' ? 'Slot' : 'Exam'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
