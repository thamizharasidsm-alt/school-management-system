import React from 'react';
import { Plus, Search, Filter, ChevronDown, MapPin, User, AlertTriangle, MoreVertical } from 'lucide-react';

export const MOCK_TIMETABLE = [
  {
    time: ["08:00 AM", "09:00 AM"],
    monday: { subject: "Mathematics", teacher: "Mr. Anderson", room: "Room 101", color: "blue" },
    tuesday: { subject: "Physics", teacher: "Dr. Banner", room: "Lab 3", color: "green" },
    wednesday: { subject: "English Lit.", teacher: "Mrs. Smith", room: "Room 205", color: "purple" },
    thursday: { subject: "World History", teacher: "Mr. Jones", room: "Room 110", color: "orange" },
    friday: { subject: "Mathematics", teacher: "Mr. Anderson", room: "Room 101", color: "blue" },
  },
  {
    time: ["09:00 AM", "10:00 AM"],
    monday: { subject: "English Lit.", teacher: "Mrs. Smith", color: "purple" },
    tuesday: { subject: "Physics", teacher: "Dr. Banner", color: "red", warning: "Teacher overlap" },
    wednesday: { subject: "Biology", teacher: "Dr. Stark", color: "green" },
    thursday: { subject: "Mathematics", teacher: "Mr. Anderson", color: "blue" },
    friday: { subject: "Geography", teacher: "Mr. Jones", color: "orange" },
  },
  {
    type: "break",
    time: ["10:00 AM", "10:30 AM"],
    label: "LUNCH BREAK"
  },
  {
    time: ["10:30 AM", "11:30 AM"],
    monday: { subject: "Chemistry", teacher: "Dr. Pym", color: "green" },
    tuesday: { subject: "World History", teacher: "Mr. Jones", color: "orange" },
    wednesday: { type: "empty" },
    thursday: { subject: "English Lit.", teacher: "Mrs. Smith", color: "purple" },
    friday: { subject: "Physics", teacher: "Dr. Banner", color: "green" },
  },
  {
    time: ["11:30 AM", "12:30 PM"],
    monday: { subject: "Chemistry", teacher: "Dr. Pym", color: "green" },
    tuesday: { subject: "World History", teacher: "Mr. Jones", color: "orange" },
    wednesday: { type: "empty" },
    thursday: { subject: "English Lit.", teacher: "Mrs. Smith", color: "purple" },
    friday: { subject: "Physics", teacher: "Dr. Banner", color: "green" },
  }
];

export default function AcademicTimetable() {
  return (
    <div className="timetable-wrapper">
      <div className="table-controls" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="table-search" style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '10px 16px', borderRadius: '12px', width: '300px', gap: '10px', color: 'var(--text-muted)', border: '1px solid #E2E8F0' }}>
          <Search size={18} />
          <input type="text" placeholder="Search by name or ID..." style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontFamily: 'inherit' }} />
        </div>
        
        <div className="filter-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', border: '1px solid #E2E8F0', background: 'white', borderRadius: '12px', fontWeight: '500', color: 'var(--text-main)', cursor: 'pointer' }}>
          <Filter size={16} /> Grade 3 <ChevronDown size={16} />
        </div>
      </div>

      <div className="timetable-view">
        <div className="timetable-grid">
          {/* Header */}
          <div className="timetable-header">TIME</div>
          <div className="timetable-header">MONDAY</div>
          <div className="timetable-header">TUESDAY</div>
          <div className="timetable-header">WEDNESDAY</div>
          <div className="timetable-header">THURSDAY</div>
          <div className="timetable-header">FRIDAY</div>

          {/* Rows */}
          {MOCK_TIMETABLE.map((row, idx) => {
            if (row.type === 'break') {
              return (
                <React.Fragment key={idx}>
                  <div className="time-column">
                    <span>{row.time[0]}</span>
                    <span>{row.time[1]}</span>
                  </div>
                  <div className="lunch-break">{row.label}</div>
                </React.Fragment>
              );
            }

            const renderCell = (dayData) => {
              if (!dayData) return <div className="timetable-cell"></div>;
              if (dayData.type === 'empty') {
                return (
                  <div className="timetable-cell">
                    <div className="timetable-empty">
                      <Plus size={16} />
                      <span>Add Period</span>
                    </div>
                  </div>
                );
              }
              
              return (
                <div className="timetable-cell">
                  <div className={`timetable-card ${dayData.color}`}>
                    <MoreVertical size={14} className="more-btn" />
                    <h4>{dayData.subject}</h4>
                    {dayData.teacher && (
                      <div className="card-info" style={{ color: dayData.color === 'blue' ? '#3B82F6' : dayData.color === 'green' ? '#10B981' : dayData.color === 'purple' ? '#A855F7' : dayData.color === 'orange' ? '#F97316' : '#94A3B8' }}>
                        <User size={12} className="card-icon" />
                        <span>{dayData.teacher}</span>
                      </div>
                    )}
                    {dayData.room && (
                      <div className="card-info" style={{ color: dayData.color === 'blue' ? '#3B82F6' : dayData.color === 'green' ? '#10B981' : dayData.color === 'purple' ? '#A855F7' : dayData.color === 'orange' ? '#F97316' : '#94A3B8' }}>
                        <MapPin size={12} className="card-icon" />
                        <span>{dayData.room}</span>
                      </div>
                    )}
                    {dayData.warning && (
                      <div className="warning-badge">
                        <AlertTriangle size={10} />
                        {dayData.warning}
                      </div>
                    )}
                  </div>
                </div>
              );
            };

            return (
              <React.Fragment key={idx}>
                <div className="time-column">
                  <span>{row.time[0]}</span>
                  <span>{row.time[1]}</span>
                </div>
                {renderCell(row.monday)}
                {renderCell(row.tuesday)}
                {renderCell(row.wednesday)}
                {renderCell(row.thursday)}
                {renderCell(row.friday)}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
