import React, { useRef, useState, useEffect } from 'react';
import { 
  Bell,
  Plus,
  GraduationCap,
  Users2,
  BookOpen,
  IndianRupee,
  Check,
  X,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { MOCK_STUDENTS, MOCK_STAFF } from './UserManagement';
import { MOCK_CLASSES } from './Academic';
import { MOCK_FEES } from './Fees';

const attendanceData = [
  { name: 'Mon', value: 50 },
  { name: 'Tue', value: 55 },
  { name: 'Wed', value: 75 },
  { name: 'Thu', value: 65 },
  { name: 'Fri', value: 80 },
  { name: 'Sat', value: 70 },
  { name: 'Sun', value: 90 },
];

const feeData = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 68 },
  { name: 'Mar', value: 60 },
  { name: 'Apr', value: 45 },
  { name: 'May', value: 92 },
  { name: 'Jun', value: 48 },
];

export default function Dashboard({ onNavigate }) {
  const alertsRef = useRef(null);
  const [highlightAlerts, setHighlightAlerts] = useState(false);
  const [counts, setCounts] = useState({
    students: MOCK_STUDENTS.length,
    staff: MOCK_STAFF.length,
    classes: MOCK_CLASSES.length
  });
  const [teacherApprovals, setTeacherApprovals] = useState([]);
  const [studentLeaves, setStudentLeaves] = useState([]);
  const [activities, setActivities] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const formatTimeAgo = (timestamp) => {
    const diff = Date.now() - timestamp;
    if (diff < 60 * 1000) return 'Just now';
    const mins = Math.floor(diff / (60 * 1000));
    if (mins < 60) return `${mins} minute${mins > 1 ? 's' : ''} ago`;
    const hours = Math.floor(diff / (3600 * 1000));
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(diff / (24 * 3600 * 1000));
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'student':
      case 'staff':
      case 'parent':
        return { icon: <GraduationCap size={18} />, bg: 'bg-green' };
      case 'fee':
        return { icon: <IndianRupee size={18} />, bg: 'bg-purple' };
      case 'attendance':
        return { icon: <Check size={18} />, bg: '', style: { background: 'white', color: '#10B981', border: '1px solid #10B981' } };
      case 'leave':
        return { icon: <Bell size={18} />, bg: 'bg-purple' };
      default:
        return { icon: <Bell size={18} />, bg: 'bg-purple' };
    }
  };

  useEffect(() => {
    function loadCountsAndApprovals() {
      const storedStudents = localStorage.getItem('MOCK_STUDENTS');
      const parsedStudents = storedStudents ? JSON.parse(storedStudents) : MOCK_STUDENTS;

      const storedStaff = localStorage.getItem('MOCK_STAFF');
      const parsedStaff = storedStaff ? JSON.parse(storedStaff) : MOCK_STAFF;

      const storedClasses = localStorage.getItem('MOCK_CLASSES');
      const parsedClasses = storedClasses ? JSON.parse(storedClasses) : MOCK_CLASSES;

      setCounts({
        students: parsedStudents.length,
        staff: parsedStaff.length,
        classes: parsedClasses.length
      });

      // Load teacher approvals
      const storedTeacher = localStorage.getItem('MOCK_TEACHER_APPROVALS');
      const defaultApprovals = [
        { id: 1, name: 'Sarah Connor', role: 'Teacher', reason: 'Medical Leave request for 3 days', type: 'Leave Request', date: '2026-04-10', status: 'Pending' },
        { id: 2, name: 'John Doe', role: 'Teacher', reason: 'Medical Leave request for 3 days', type: 'Leave Request', date: '2026-04-10', status: 'Approved' },
        { id: 3, name: 'Jane Smith', role: 'Teacher', reason: 'Medical Leave request for 3 days', type: 'Leave Request', date: '2026-04-10', status: 'Approved' },
        { id: 4, name: 'Mike Ross', role: 'Teacher', reason: 'Medical Leave request for 3 days', type: 'Leave Request', date: '2026-04-10', status: 'Pending' },
        { id: 5, name: 'Rachel Zane', role: 'Teacher', reason: 'Medical Leave request for 3 days', type: 'Leave Request', date: '2026-04-10', status: 'Pending' },
        { id: 6, name: 'Harvey Specter', role: 'Teacher', reason: 'Medical Leave request for 3 days', type: 'Leave Request', date: '2026-04-10', status: 'Rejected' },
        { id: 7, name: 'James Porter', role: 'Teacher', reason: 'Request to correct attendance', type: 'Attendance Edit', date: '2026-04-12', status: 'Pending' },
        { id: 8, name: 'Robert Chen', role: 'Parent', reason: 'Attendance correction', type: 'Attendance Edit', date: '2026-04-12', status: 'Pending' },
      ];
      if (storedTeacher) {
        setTeacherApprovals(JSON.parse(storedTeacher));
      } else {
        localStorage.setItem('MOCK_TEACHER_APPROVALS', JSON.stringify(defaultApprovals));
        setTeacherApprovals(defaultApprovals);
      }

      // Load student leaves
      const storedStudentLeaves = localStorage.getItem('MOCK_LEAVE_REQUESTS');
      if (storedStudentLeaves) {
        setStudentLeaves(JSON.parse(storedStudentLeaves));
      }

      // Load recent activities
      const storedActivities = localStorage.getItem('MOCK_ACTIVITIES');
      const defaultActivities = [
        { id: 'act-init-1', title: 'Liam Smith admitted to Grade 5 - B', type: 'student', by: 'Admin Elena', initials: 'AE', timestamp: Date.now() - 3 * 60 * 1000 },
        { id: 'act-init-2', title: 'Emily Brown paid fee for Term 1', type: 'fee', by: 'Emily Brown', initials: 'EB', timestamp: Date.now() - 12 * 60 * 1000 },
        { id: 'act-init-3', title: 'Emily Brown paid fee for Term 2', type: 'fee', by: 'Emily Brown', initials: 'EB', timestamp: Date.now() - 25 * 60 * 1000 }
      ];
      if (storedActivities) {
        setActivities(JSON.parse(storedActivities));
      } else {
        localStorage.setItem('MOCK_ACTIVITIES', JSON.stringify(defaultActivities));
        setActivities(defaultActivities);
      }
    }
    loadCountsAndApprovals();
  }, []);

  const handleNewAnnouncement = () => {
    if (alertsRef.current) {
      alertsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightAlerts(true);
      setTimeout(() => {
        setHighlightAlerts(false);
      }, 2000);
    }
  };

  const handleApproveTeacher = (id) => {
    const updated = teacherApprovals.map(item => 
      item.id === id ? { ...item, status: 'Approved' } : item
    );
    setTeacherApprovals(updated);
    localStorage.setItem('MOCK_TEACHER_APPROVALS', JSON.stringify(updated));
    showToast('Staff approval request approved!');
  };

  const handleRejectTeacher = (id) => {
    const updated = teacherApprovals.map(item => 
      item.id === id ? { ...item, status: 'Rejected' } : item
    );
    setTeacherApprovals(updated);
    localStorage.setItem('MOCK_TEACHER_APPROVALS', JSON.stringify(updated));
    showToast('Staff approval request rejected.');
  };

  const handleApproveStudent = (id) => {
    const updated = studentLeaves.map(leave => {
      if (leave.id === id) {
        const returnEmail = {
          id: `EML-${Date.now().toString().slice(-3)}-admin`,
          from: `Admin Portal (admin@gmail.com)`,
          to: `${leave.parentName} (${leave.parentEmail || 'parent@gmail.com'})`,
          subject: `Leave Request Approved by Admin: ${leave.studentName}`,
          body: `Dear Parent,\n\nThis is to inform you that your leave request for ${leave.studentName} on ${leave.date} has been Approved by the School Administration.\n\nSincerely,\nSchool Administration`,
          date: new Date().toLocaleString(),
          status: 'Sent'
        };
        return {
          ...leave,
          status: 'Approved',
          readByParent: false,
          emailLogs: [...(leave.emailLogs || []), returnEmail]
        };
      }
      return leave;
    });
    setStudentLeaves(updated);
    localStorage.setItem('MOCK_LEAVE_REQUESTS', JSON.stringify(updated));
    showToast('Student leave request approved! Parent notified.');
  };

  const handleRejectStudent = (id) => {
    const updated = studentLeaves.map(leave => {
      if (leave.id === id) {
        const returnEmail = {
          id: `EML-${Date.now().toString().slice(-3)}-admin`,
          from: `Admin Portal (admin@gmail.com)`,
          to: `${leave.parentName} (${leave.parentEmail || 'parent@gmail.com'})`,
          subject: `Leave Request Rejected by Admin: ${leave.studentName}`,
          body: `Dear Parent,\n\nThis is to inform you that your leave request for ${leave.studentName} on ${leave.date} has been Rejected by the School Administration.\n\nSincerely,\nSchool Administration`,
          date: new Date().toLocaleString(),
          status: 'Sent'
        };
        return {
          ...leave,
          status: 'Rejected',
          readByParent: false,
          emailLogs: [...(leave.emailLogs || []), returnEmail]
        };
      }
      return leave;
    });
    setStudentLeaves(updated);
    localStorage.setItem('MOCK_LEAVE_REQUESTS', JSON.stringify(updated));
    showToast('Student leave request rejected. Parent notified.');
  };

  const totalStudents = counts.students;
  const totalStaff = counts.staff;
  const totalClasses = counts.classes;
  const totalRevenueNum = MOCK_FEES.reduce((sum, fee) => {
    return sum + parseInt(fee.amount.replace(/[^0-9]/g, ''), 10);
  }, 0);
  const formattedRevenue = (totalRevenueNum / 1000).toFixed(1) + 'k';
  return (
    <>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="custom-toast">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Dashboard Title */}
      <div className="dashboard-title-area">
        <div className="dashboard-title">
          <h1>Dashboard</h1>
          <p>Welcome Back, Elena Here's What's happening today.</p>
        </div>
        <div className="title-actions">
          <button className="btn-outline" onClick={() => onNavigate && onNavigate('user-management')}>
            <Plus size={18} /> Add Student
          </button>
          <button className="btn-primary" onClick={handleNewAnnouncement}>
            <Bell size={18} /> New Announcement
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="stat-card purple">
          <div className="stat-header">
            <div className="stat-icon" style={{ background: 'var(--purple-light)', color: 'var(--purple-main)' }}>
              <GraduationCap size={24} />
            </div>
            <div className="stat-trend">
              ↗ +3.5%
            </div>
          </div>
          <div className="stat-value">{totalStudents}</div>
          <div className="stat-label">Total Students</div>
          <div className="stat-subtext">Enrolled this year</div>
        </div>
        
        <div className="stat-card green">
          <div className="stat-header">
            <div className="stat-icon" style={{ background: 'var(--green-light)', color: 'var(--green-main)' }}>
              <Users2 size={24} />
            </div>
            <div className="stat-trend">
              ↗ +1.2%
            </div>
          </div>
          <div className="stat-value">{totalStaff}</div>
          <div className="stat-label">Total Staff</div>
          <div className="stat-subtext">Active employees</div>
        </div>

        <div className="stat-card blue">
          <div className="stat-header">
            <div className="stat-icon" style={{ background: 'var(--blue-light)', color: 'var(--blue-main)' }}>
              <BookOpen size={24} />
            </div>
            <div className="stat-trend">
              ↗ +0.8%
            </div>
          </div>
          <div className="stat-value">{totalClasses}</div>
          <div className="stat-label">Total Classes</div>
          <div className="stat-subtext">Across all grades</div>
        </div>

        <div className="stat-card purple">
          <div className="stat-header">
            <div className="stat-icon" style={{ background: 'var(--purple-light)', color: 'var(--purple-main)' }}>
              <IndianRupee size={24} />
            </div>
            <div className="stat-trend">
              ↗ +5.1%
            </div>
          </div>
          <div className="stat-value">{formattedRevenue}</div>
          <div className="stat-label">Total Revenue</div>
          <div className="stat-subtext">Collected this team</div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-area">
        <div className="chart-card">
          <h3 className="chart-title">Attendance overview</h3>
          <p className="chart-subtitle">Last 7 days across all classes</p>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={attendanceData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} tickFormatter={(value) => `${value}%`} dx={-10} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="var(--primary-blue)" strokeWidth={3} dot={{ r: 4, fill: 'var(--primary-blue)', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="chart-card">
          <h3 className="chart-title">Fee collection</h3>
          <p className="chart-subtitle">Monthly collection K</p>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer>
              <BarChart data={feeData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B', fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dx={-10} />
                <Tooltip cursor={{ fill: '#F8FAFC' }} />
                <Bar dataKey="value" fill="#A5B4FC" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <span style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
              <div style={{ width: '12px', height: '12px', background: '#A5B4FC', borderRadius: '3px' }}></div>
              Collected
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Widgets */}
      <div className="bottom-widgets">
        {/* Recent Activity */}
        <div className="widget-card">
          <div className="widget-header">
            <h3 className="widget-title">Recent Activity</h3>
          </div>
          <p className="widget-subtitle">Live update from today</p>
          
          <div className="activity-list">
            {activities.slice(0, 3).map(act => {
              const info = getActivityIcon(act.type);
              return (
                <div key={act.id} className="activity-item">
                  <div className={`activity-icon ${info.bg}`} style={info.style}>
                    {info.icon}
                  </div>
                  <div className="activity-content">
                    <h4>{act.title}</h4>
                    <div className="activity-details">
                      <span className="activity-initials">{act.initials}</span>
                      {act.by} • {formatTimeAgo(act.timestamp)}
                    </div>
                  </div>
                </div>
              );
            })}
            {activities.length === 0 && (
              <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)' }}>
                No recent activity.
              </div>
            )}
          </div>
        </div>

        {/* Alerts */}
        <div 
          className={`widget-card ${highlightAlerts ? 'highlight-pulse' : ''}`}
          ref={alertsRef}
          style={{ transition: 'all 0.3s ease' }}
        >
          <div className="widget-header">
            <h3 className="widget-title">Alert</h3>
            <span className="badge-new">{3 + teacherApprovals.filter(a => a.status === 'Pending').length + studentLeaves.filter(s => s.status === 'Pending').length} New</span>
          </div>
          <p className="widget-subtitle">{3 + teacherApprovals.filter(a => a.status === 'Pending').length + studentLeaves.filter(s => s.status === 'Pending').length} unread notifications</p>

          <div 
            className="alert-item info"
            style={{ cursor: 'pointer' }}
            onClick={() => onNavigate && onNavigate('user-management')}
          >
            <div className="alert-icon info">
              <Bell size={18} />
            </div>
            <div className="alert-content">
              <h4>New Admission Request</h4>
              <p>A New admission request has been submitted for Grade 5</p>
            </div>
          </div>

          {teacherApprovals.filter(item => item.status === 'Pending').map(item => (
            <div 
              key={`alert-staff-${item.id}`} 
              className="alert-item info"
              style={{ cursor: 'pointer' }}
              onClick={() => onNavigate && onNavigate('approvals')}
            >
              <div className="alert-icon info">
                <Bell size={18} />
              </div>
              <div className="alert-content">
                <h4>Approval Request</h4>
                <p>{item.name} submitted a {item.type.toLowerCase()}.</p>
              </div>
            </div>
          ))}

          {studentLeaves.filter(item => item.status === 'Pending').map(item => (
            <div 
              key={`alert-student-${item.id}`} 
              className="alert-item info"
              style={{ cursor: 'pointer' }}
              onClick={() => onNavigate && onNavigate('approvals')}
            >
              <div className="alert-icon info">
                <Bell size={18} />
              </div>
              <div className="alert-content">
                <h4>Student Leave Request</h4>
                <p>{item.studentName} ({item.grade}) requested leave.</p>
              </div>
            </div>
          ))}

          <div 
            className="alert-item warning"
            style={{ cursor: 'pointer' }}
            onClick={() => onNavigate && onNavigate('fees')}
          >
            <div className="alert-icon warning">
              <AlertTriangle size={18} />
            </div>
            <div className="alert-content">
              <h4>Fee payment overdue</h4>
              <p>12 Students have overdue fee payments.</p>
            </div>
          </div>

          <div 
            className="alert-item warning"
            style={{ cursor: 'pointer' }}
            onClick={() => onNavigate && onNavigate('attendance')}
          >
            <div className="alert-icon warning">
              <AlertTriangle size={18} />
            </div>
            <div className="alert-content">
              <h4>Attendance Alert</h4>
              <p>Attendance below 75% for 5 students this week.</p>
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="widget-card">
          <div className="widget-header">
            <h3 className="widget-title">Pending Approvals</h3>
            <span className="badge-count">
              {teacherApprovals.filter(a => a.status === 'Pending').length + studentLeaves.filter(s => s.status === 'Pending').length}
            </span>
          </div>
          <p className="widget-subtitle">Require your action</p>

          {teacherApprovals.filter(item => item.status === 'Pending').map(item => (
            <div key={`pending-staff-${item.id}`} className="approval-item">
              <div className="approval-header">
                <h4>{item.name}</h4>
                <span className="approval-badge">{item.type}</span>
              </div>
              <p className="approval-desc">{item.reason}</p>
              <div className="approval-actions">
                <button className="btn-approve" onClick={() => handleApproveTeacher(item.id)}>
                  <Check size={16} /> Approve
                </button>
                <button className="btn-reject" onClick={() => handleRejectTeacher(item.id)}>
                  <X size={16} /> Reject
                </button>
              </div>
            </div>
          ))}

          {studentLeaves.filter(item => item.status === 'Pending').map(item => (
            <div key={`pending-student-${item.id}`} className="approval-item">
              <div className="approval-header">
                <h4>{item.studentName}</h4>
                <span className="approval-badge">Student Leave</span>
              </div>
              <p className="approval-desc">Leave date: {item.date} • "{item.reason}"</p>
              <div className="approval-actions">
                <button className="btn-approve" onClick={() => handleApproveStudent(item.id)}>
                  <Check size={16} /> Approve
                </button>
                <button className="btn-reject" onClick={() => handleRejectStudent(item.id)}>
                  <X size={16} /> Reject
                </button>
              </div>
            </div>
          ))}

          {teacherApprovals.filter(a => a.status === 'Pending').length === 0 && studentLeaves.filter(s => s.status === 'Pending').length === 0 && (
            <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)' }}>
              No pending approvals. All caught up!
            </div>
          )}
        </div>
      </div>
    </>
  );
}
