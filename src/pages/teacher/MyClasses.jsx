import React from 'react';
import { 
  Book, 
  Users, 
  Eye, 
  CalendarCheck,
  Sparkles
} from 'lucide-react';

const CLASSES_DATA = [
  {
    id: 1,
    className: 'Class 10-A',
    subject: 'Mathematics',
    students: 32,
    room: 'Room 201',
    schedule: 'Mon, Wed, Fri 9.00AM'
  },
  {
    id: 2,
    className: 'Class 10-B',
    subject: 'Mathematics',
    students: 30,
    room: 'Room 202',
    schedule: 'Tue, Thurs 10.30AM'
  },
  {
    id: 3,
    className: 'Class 10-C',
    subject: 'Advanced Algebra',
    students: 28,
    room: 'Room 105',
    schedule: 'Mon, Wed, 2.00pm'
  },
  {
    id: 4,
    className: 'Class 10-D',
    subject: 'Statistics',
    students: 26,
    room: 'Room 106',
    schedule: 'Tues, thurs, fri 11.00AM'
  }
];

export default function MyClasses() {
  return (
    <div className="my-classes-container">
      <div className="page-header-flex">
        <div className="page-title-group">
          <h1>My Classes</h1>
          <p>Manage at your assigned classes and subjects</p>
        </div>
        <button className="new-class-btn">
          <Book size={18} /> New Class
        </button>
      </div>

      <div className="classes-grid">
        {CLASSES_DATA.map(cls => (
          <div key={cls.id} className="class-card">
            <div className="class-card-header">
              <div className="class-icon-wrapper">
                <Book size={24} color="#8B5CF6" />
              </div>
              <div className="class-title-info">
                <h2>{cls.className}</h2>
                <span className="class-subject">{cls.subject}</span>
              </div>
            </div>

            <div className="class-card-body">
              <div className="class-stat-row">
                <span className="stat-label"><Users size={16} /> Students</span>
                <span className="stat-value">{cls.students}</span>
              </div>
              <div className="class-stat-row">
                <span className="stat-label">Room</span>
                <span className="stat-value">{cls.room}</span>
              </div>
              <div className="class-schedule-pill">
                {cls.schedule}
              </div>
            </div>

            <div className="class-card-footer">
              <button className="class-action-btn primary">
                <Eye size={16} /> View Students
              </button>
              <button className="class-action-btn primary">
                <CalendarCheck size={16} /> Attendance
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="ai-assistant-fab fab-dashboard">
        <Sparkles size={18} /> AI Assistant
      </button>
    </div>
  );
}
