import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  AlertCircle, 
  Trash2, 
  Megaphone,
  CheckCircle,
  Video
} from 'lucide-react';

const MOCK_PTM_ANNOUNCEMENTS = [
  {
    id: 'PTMA-1',
    date: 'Jun 10, 2026',
    title: 'Term 1 Parent Teacher Association Meet',
    content: 'The mandatory Term 1 Parent Teacher Meet is scheduled for June 18th, 2026. Guardians are requested to book slots with subject teachers using the portal below. Discussions will focus on Term 1 progress, grades, and extracurricular activity participation.',
    venue: 'Main Auditorium / Online (Hybrid)',
    timing: '09:00 AM - 04:00 PM'
  },
  {
    id: 'PTMA-2',
    date: 'May 28, 2026',
    title: 'Special Education Board Interaction Session',
    content: 'An optional interactive session with principal Sarah Connor and external board counsellors regarding high school stream preparation guidelines. Parents of grade 7 & 8 students are highly recommended to attend.',
    venue: 'Conference Room B',
    timing: '02:00 PM - 03:30 PM'
  }
];

const DEFAULT_BOOKED_MEETINGS = [
  {
    id: 'MTG-301',
    teacherId: 'STF-1001',
    teacherName: 'John Smith',
    subject: 'Math Exam Results Review',
    date: '2026-06-18',
    timeSlot: '10:00 AM - 10:30 AM',
    status: 'Scheduled',
    type: 'Online (Zoom Video)'
  }
];

export default function ParentPTM({ parent }) {
  const [teachers, setTeachers] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [announcements] = useState(MOCK_PTM_ANNOUNCEMENTS);

  // Form state
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('Academic Progress');
  const [meetingDate, setMeetingDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 10:30 AM');
  const [meetingType, setMeetingType] = useState('Online (Zoom Video)');
  
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Load teachers and PTM bookings
  useEffect(() => {
    // 1. Load teachers
    const storedStaff = localStorage.getItem('MOCK_STAFF');
    if (storedStaff) {
      const staffList = JSON.parse(storedStaff);
      // Filter out pure administrative staff, keeping teachers
      const teacherList = staffList.filter(s => s.role.toLowerCase().includes('teacher') || s.department !== 'Administration');
      setTeachers(teacherList);
      if (teacherList.length > 0) {
        setSelectedTeacherId(teacherList[0].id);
      }
    } else {
      // Fallback fallback teachers
      const fallback = [
        { id: 'STF-1001', name: 'John Smith', department: 'Mathematics', role: 'Senior Teacher' },
        { id: 'STF-1002', name: 'Emily Watson', department: 'Science', role: 'Teacher' },
        { id: 'STF-1004', name: 'Sarah Connor', department: 'Mathematics', role: 'Teacher' },
        { id: 'STF-1007', name: 'Lisa Park', department: 'Science', role: 'Teacher' }
      ];
      setTeachers(fallback);
      setSelectedTeacherId(fallback[0].id);
    }

    // 2. Load booked PTM meetings
    if (parent) {
      const storageKey = `PTM_MEETINGS_${parent.id}`;
      let storedMeetings = localStorage.getItem(storageKey);
      if (!storedMeetings) {
        localStorage.setItem(storageKey, JSON.stringify(DEFAULT_BOOKED_MEETINGS));
        storedMeetings = JSON.stringify(DEFAULT_BOOKED_MEETINGS);
      }
      setMeetings(JSON.parse(storedMeetings));
    }
  }, [parent]);

  const handleBookMeeting = (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess(false);

    if (!meetingDate) {
      setFormError('Please select a valid meeting date.');
      return;
    }

    // Ensure selected date is in the future
    const selectedDate = new Date(meetingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setFormError('Meeting date must be today or in the future.');
      return;
    }

    const teacher = teachers.find(t => t.id === selectedTeacherId);
    if (!teacher) {
      setFormError('Selected teacher is invalid.');
      return;
    }

    // Double booking check (same teacher and date/time)
    const isDoubleBooked = meetings.some(m => m.date === meetingDate && m.timeSlot === timeSlot);
    if (isDoubleBooked) {
      setFormError('You already have another meeting scheduled at this date and time.');
      return;
    }

    const newMeeting = {
      id: `MTG-${300 + meetings.length + 1}`,
      teacherId: teacher.id,
      teacherName: teacher.name,
      subject: selectedTopic,
      date: meetingDate,
      timeSlot: timeSlot,
      status: 'Scheduled',
      type: meetingType
    };

    const updated = [newMeeting, ...meetings];
    setMeetings(updated);
    if (parent) {
      localStorage.setItem(`PTM_MEETINGS_${parent.id}`, JSON.stringify(updated));
    }
    
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 3000);
  };

  const handleCancelMeeting = (id) => {
    if (window.confirm("Are you sure you want to cancel this Parent-Teacher meeting?")) {
      const updated = meetings.filter(m => m.id !== id);
      setMeetings(updated);
      if (parent) {
        localStorage.setItem(`PTM_MEETINGS_${parent.id}`, JSON.stringify(updated));
      }
    }
  };

  return (
    <div className="parent-portal-container animate-fade-in-up">
      {/* Page Title */}
      <div className="dashboard-title-area">
        <div className="dashboard-title">
          <h1>Parent Teacher Meetings (PTM)</h1>
          <p>Read PTM announcements, schedule slots, and track video conference invites.</p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="parent-grid-two-cols">
        {/* Left Column: Schedule a Meeting & Announcements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Scheduler Card */}
          <div className="parent-settings-card">
            <h3 style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={20} color="var(--primary-blue)" />
                <span>Schedule a PTM Slot</span>
              </div>
            </h3>

            <form onSubmit={handleBookMeeting}>
              {formSuccess && (
                <div className="parent-alert-success">
                  <CheckCircle size={16} /> Meeting scheduled successfully! Invitation email sent.
                </div>
              )}
              {formError && (
                <div className="parent-alert-error">
                  <AlertCircle size={16} /> {formError}
                </div>
              )}

              <div className="parent-form-group">
                <label>Select Teacher</label>
                <select 
                  value={selectedTeacherId} 
                  onChange={e => setSelectedTeacherId(e.target.value)}
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.department} - {t.role})
                    </option>
                  ))}
                </select>
              </div>

              <div className="parent-form-group">
                <label>Meeting Subject / Topic</label>
                <select 
                  value={selectedTopic} 
                  onChange={e => setSelectedTopic(e.target.value)}
                >
                  <option value="Academic Progress">Academic Progress Check</option>
                  <option value="Mid-Term Marks Inquiry">Mid-Term Marks Inquiry</option>
                  <option value="Attendance / Absence Issues">Attendance / Absence Issues</option>
                  <option value="Behavioral / Classroom Conduct">Behavioral / Classroom Conduct</option>
                  <option value="Extra-curriculars & Sports">Extra-curriculars & Sports</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="parent-form-group">
                  <label>Meeting Date</label>
                  <input 
                    type="date" 
                    value={meetingDate}
                    onChange={e => setMeetingDate(e.target.value)}
                    required
                  />
                </div>
                <div className="parent-form-group">
                  <label>Preferred Time Slot</label>
                  <select 
                    value={timeSlot} 
                    onChange={e => setTimeSlot(e.target.value)}
                  >
                    <option value="09:00 AM - 09:30 AM">09:00 AM - 09:30 AM</option>
                    <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
                    <option value="11:30 AM - 12:00 PM">11:30 AM - 12:00 PM</option>
                    <option value="01:30 PM - 02:00 PM">01:30 PM - 02:00 PM</option>
                    <option value="02:30 PM - 03:00 PM">02:30 PM - 03:00 PM</option>
                    <option value="03:30 PM - 04:00 PM">03:30 PM - 04:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="parent-form-group" style={{ marginBottom: '24px' }}>
                <label>Meeting Medium</label>
                <select 
                  value={meetingType} 
                  onChange={e => setMeetingType(e.target.value)}
                >
                  <option value="Online (Zoom Video)">Online (Zoom Video)</option>
                  <option value="Online (Google Meet)">Online (Google Meet)</option>
                  <option value="On-Campus (Staff Room)">On-Campus (Staff Room)</option>
                </select>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                Confirm PTM Reservation
              </button>
            </form>
          </div>

          {/* Announcements Card */}
          <div className="parent-settings-card">
            <h3 style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Megaphone size={20} color="var(--purple-main)" />
                <span>PTM Notices & Board</span>
              </div>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {announcements.map((ann) => (
                <div key={ann.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #F1F5F9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>{ann.title}</h4>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{ann.date}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>{ann.content}</p>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-muted)', borderTop: '1px solid #E2E8F0', paddingTop: '8px', marginTop: '4px' }}>
                    <span>📍 Venue: <strong>{ann.venue}</strong></span>
                    <span>🕒 Timings: <strong>{ann.timing}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Booked Meetings List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="parent-settings-card" style={{ height: '100%' }}>
            <h3 style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={20} color="var(--green-main)" />
                <span>My Booked PTM Sessions</span>
              </div>
            </h3>

            {meetings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--text-muted)' }}>
                <AlertCircle size={36} style={{ margin: '0 auto 12px auto', color: '#94A3B8' }} />
                <h4>No meetings scheduled</h4>
                <p style={{ fontSize: '13px', marginTop: '4px' }}>Use the scheduler form on the left to request a conference slot.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {meetings.map((m) => (
                  <div key={m.id} style={{ border: '1px solid #F1F5F9', borderRadius: '16px', padding: '16px', background: '#F8FAFC', position: 'relative' }}>
                    
                    <button 
                      onClick={() => handleCancelMeeting(m.id)}
                      style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--red-main)', cursor: 'pointer', padding: '4px', borderRadius: '50%' }}
                      title="Cancel Meeting"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span className="parent-badge resolved" style={{ padding: '2px 6px', fontSize: '10px' }}>
                        {m.status}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ID: {m.id}</span>
                    </div>

                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px', paddingRight: '24px' }}>
                      {m.subject}
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#475569' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <User size={14} color="var(--text-muted)" />
                        <span>Teacher: <strong>{m.teacherName}</strong></span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar size={14} color="var(--text-muted)" />
                        <span>Date: <strong>{new Date(m.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</strong></span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clock size={14} color="var(--text-muted)" />
                        <span>Time: <strong>{m.timeSlot}</strong></span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Video size={14} color="var(--text-muted)" />
                        <span>Medium: <strong>{m.type}</strong></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
