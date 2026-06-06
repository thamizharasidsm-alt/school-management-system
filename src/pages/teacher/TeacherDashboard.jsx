import React from 'react';
import { 
  BookOpen, 
  Users, 
  LayoutGrid, 
  Activity,
  Pin,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';

const attendanceData = [
  { name: 'Jan', rate: 95 },
  { name: 'Feb', rate: 92 },
  { name: 'Mar', rate: 96 },
  { name: 'Apr', rate: 89 },
  { name: 'May', rate: 94 },
  { name: 'Jun', rate: 98 },
  { name: 'July', rate: 90 },
  { name: 'Aug', rate: 95 },
];

const performanceData = [
  { name: 'Jan', avg: 72, top: 88 },
  { name: 'Feb', avg: 75, top: 90 },
  { name: 'Mar', avg: 68, top: 85 },
  { name: 'Apr', avg: 78, top: 92 },
  { name: 'May', avg: 80, top: 95 },
  { name: 'Jun', avg: 82, top: 96 },
  { name: 'July', avg: 77, top: 91 },
  { name: 'Aug', avg: 84, top: 92 },
];

const TIMETABLE = [
  { time: '8.00AM', duration: '1h', subject: 'Mathematics', details: 'Class 10-A Room 201', type: 'Lecture' },
  { time: '10.00AM', duration: '1h', subject: 'Advanced Algebra', details: 'Class 10-c Room 105', type: 'Lab' },
  { time: '12.00AM', duration: '30m', subject: 'Lunch Break', details: '', type: 'Break' },
  { time: '1.00AM', duration: '1h', subject: 'Mathematics', details: 'Class 10-B Room 202', type: 'Lecture' },
  { time: '3.00AM', duration: '1h', subject: 'Statistics', details: 'Class 10-D Room 106', type: 'Lecture' },
];

export default function TeacherDashboard() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="teacher-dashboard">
      <div className="dashboard-header-teacher">
        <h1>Welcome Back, Sarah!</h1>
        <p>Here's what's happening in your classes today - {today}</p>
      </div>

      {/* Stat Cards */}
      <div className="teacher-stats-grid">
        <div className="teacher-stat-card">
          <div className="stat-header">
            <div className="stat-icon purple-light-bg"><BookOpen size={20} color="#8B5CF6" /></div>
            <span className="stat-badge positive">↗ 0%</span>
          </div>
          <h2>4</h2>
          <p>Total Classes<br/>This Semester</p>
        </div>

        <div className="teacher-stat-card">
          <div className="stat-header">
            <div className="stat-icon purple-light-bg"><Users size={20} color="#8B5CF6" /></div>
            <span className="stat-badge positive">↗ 5%</span>
          </div>
          <h2>15</h2>
          <p>Total Students<br/>vs last semester</p>
        </div>

        <div className="teacher-stat-card">
          <div className="stat-header">
            <div className="stat-icon purple-light-bg"><LayoutGrid size={20} color="#8B5CF6" /></div>
            <span className="stat-badge positive">↗ 3%</span>
          </div>
          <h2>86</h2>
          <p>Avg Attendance<br/>vs last month</p>
        </div>

        <div className="teacher-stat-card">
          <div className="stat-header">
            <div className="stat-icon blue-light-bg"><Activity size={20} color="#3B82F6" /></div>
            <span className="stat-badge negative">↘ 1%</span>
          </div>
          <h2>3</h2>
          <p>Pending Tasks<br/>vs Yesterday</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="teacher-charts-grid">
        <div className="teacher-chart-card">
          <div className="chart-header">
            <h3>Attendance overview</h3>
            <p>Monthly attendance rate %</p>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <Tooltip />
                <Area type="monotone" dataKey="rate" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#colorRate)" activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="chart-legend-custom">
              <span className="legend-dot purple-dot"></span> rate
            </div>
          </div>
        </div>

        <div className="teacher-chart-card">
          <div className="chart-header">
            <h3>Student Performance</h3>
            <p>Avg vs Top Performers</p>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={12}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="avg" fill="#A78BFA" radius={[4, 4, 0, 0]} />
                <Bar dataKey="top" fill="#FDA4AF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="chart-legend-custom">
              <span><span className="legend-dot purple-dot"></span> Avg</span>
              <span><span className="legend-dot red-dot"></span> Top</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Layout */}
      <div className="teacher-bottom-grid">
        {/* Left: Timetable */}
        <div className="teacher-timetable-section">
          <h3>Today's Timetable</h3>
          <div className="timetable-list">
            {TIMETABLE.map((slot, index) => (
              <div key={index} className="timetable-item">
                <div className="time-col">
                  <strong>{slot.time}</strong>
                  <span>{slot.duration}</span>
                </div>
                <div className="details-col">
                  {slot.type === 'Break' ? (
                    <div className="break-slot">Lunch Break</div>
                  ) : (
                    <>
                      <div className="subject-info">
                        <h4>{slot.subject}</h4>
                        <p>{slot.details}</p>
                      </div>
                      <span className={`type-badge ${slot.type.toLowerCase()}`}>
                        {slot.type}
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Activity & Notifications */}
        <div className="teacher-right-col">
          <div className="teacher-activity-card">
            <div className="card-header-flex">
              <h3>Recent Activity</h3>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <Pin size={16} color="#DC2626" className="act-icon" />
                <div className="act-details">
                  <h4>Emma Rodriguez submitted Assignment #3</h4>
                  <span>10 minutes ago</span>
                </div>
              </div>
              <div className="activity-item">
                <Pin size={16} color="#DC2626" className="act-icon" />
                <div className="act-details">
                  <h4>Attendance marked for class 10-A</h4>
                  <span>1 hour ago</span>
                </div>
              </div>
              <div className="activity-item">
                <Pin size={16} color="#DC2626" className="act-icon" />
                <div className="act-details">
                  <h4>Marks published for unit 3 exam 10-B</h4>
                  <span>2 hour ago</span>
                </div>
              </div>
              <div className="activity-item">
                <MessageCircle size={16} color="#3B82F6" className="act-icon" />
                <div className="act-details">
                  <h4>New message from david johnson ( parent of Noah)</h4>
                  <span>3 hour ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="teacher-notifications-card">
            <h3>Notificatons</h3>
            <div className="notification-item">
              <span className="dot yellow-dot"></span>
              <p>Isabella Davis Attendance below 70% threshold</p>
            </div>
            <div className="notification-item">
              <span className="dot blue-dot"></span>
              <p>Parent teacher conference scheduled for friday</p>
            </div>
            <div className="notification-item">
              <span className="dot green-dot"></span>
              <p>Exam results for class 10A approved by Admin</p>
            </div>
          </div>
        </div>
      </div>

      <button className="ai-assistant-fab fab-dashboard">
        <Sparkles size={18} /> AI Assistant
      </button>
    </div>
  );
}
