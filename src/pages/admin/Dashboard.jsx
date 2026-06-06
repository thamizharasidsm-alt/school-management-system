import React, { useRef, useState } from 'react';
import { 
  Bell,
  Plus,
  GraduationCap,
  Users2,
  BookOpen,
  IndianRupee,
  Check,
  X,
  AlertTriangle
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

  const handleNewAnnouncement = () => {
    if (alertsRef.current) {
      alertsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightAlerts(true);
      setTimeout(() => {
        setHighlightAlerts(false);
      }, 2000);
    }
  };

  const totalStudents = MOCK_STUDENTS.length;
  const totalStaff = MOCK_STAFF.length;
  const totalClasses = MOCK_CLASSES.length;
  const totalRevenueNum = MOCK_FEES.reduce((sum, fee) => {
    return sum + parseInt(fee.amount.replace(/[^0-9]/g, ''), 10);
  }, 0);
  const formattedRevenue = (totalRevenueNum / 1000).toFixed(1) + 'k';
  return (
    <>
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
            <div className="activity-item">
              <div className="activity-icon bg-green">
                <GraduationCap size={18} />
              </div>
              <div className="activity-content">
                <h4>Liam smith admitted to Grade 5</h4>
                <div className="activity-details">
                  <span className="activity-initials">AE</span>
                  Admin Elena . 3 minutes ago
                </div>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon bg-purple">
                <IndianRupee size={18} />
              </div>
              <div className="activity-content">
                <h4>Emily Brown paid fee for Term 1</h4>
                <div className="activity-details">
                  <span className="activity-initials">EB</span>
                  Emily Brown . 12 minutes ago
                </div>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon bg-green">
                <GraduationCap size={18} />
              </div>
              <div className="activity-content">
                <h4>Emily Brown admitted to Grade 6</h4>
                <div className="activity-details">
                  <span className="activity-initials">AE</span>
                  Admin Elena . 25 minutes ago
                </div>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon bg-purple">
                <IndianRupee size={18} />
              </div>
              <div className="activity-content">
                <h4>Emily Brown paid fee for Term 2</h4>
                <div className="activity-details">
                  <span className="activity-initials">EB</span>
                  Emily Brown . 1 hour ago
                </div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon" style={{ background: 'white', color: '#10B981', border: '1px solid #10B981' }}>
                <Check size={18} />
              </div>
              <div className="activity-content">
                <h4>Attendance marked for grade 5A</h4>
                <div className="activity-details">
                  <span className="activity-initials">SC</span>
                  Sarah Connor . 2 hours ago
                </div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon bg-purple">
                <Bell size={18} />
              </div>
              <div className="activity-content">
                <h4>Annual sports day announcement Published</h4>
                <div className="activity-details">
                  <span className="activity-initials">PJ</span>
                  Principal Johnson . 3 hour ago
                </div>
              </div>
            </div>
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
            <span className="badge-new">4 New</span>
          </div>
          <p className="widget-subtitle">4 unread notifications</p>

          <div className="alert-item info">
            <div className="alert-icon info">
              <Bell size={18} />
            </div>
            <div className="alert-content">
              <h4>New Admission Request</h4>
              <p>A New admission request has been submitted for Grade 5</p>
            </div>
          </div>

          <div className="alert-item info">
            <div className="alert-icon info">
              <Bell size={18} />
            </div>
            <div className="alert-content">
              <h4>Approval Request</h4>
              <p>Sarah Connor sumbitted a leave request.</p>
            </div>
          </div>

          <div className="alert-item warning">
            <div className="alert-icon warning">
              <AlertTriangle size={18} />
            </div>
            <div className="alert-content">
              <h4>Fee payment overdue</h4>
              <p>12 Students have overdue fee payments.</p>
            </div>
          </div>

          <div className="alert-item warning">
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
            <span className="badge-count">3</span>
          </div>
          <p className="widget-subtitle">Require your action</p>

          <div className="approval-item">
            <div className="approval-header">
              <h4>Sarah Connor</h4>
              <span className="approval-badge">Leave</span>
            </div>
            <p className="approval-desc">Medical leave request for 3 days</p>
            <div className="approval-actions">
              <button className="btn-approve">
                <Check size={16} /> Approve
              </button>
              <button className="btn-reject">
                <X size={16} /> Reject
              </button>
            </div>
          </div>

          <div className="approval-item">
            <div className="approval-header">
              <h4>James Porter</h4>
              <span className="approval-badge">Attendance Edit</span>
            </div>
            <p className="approval-desc">Request to correct attendance</p>
            <div className="approval-actions">
              <button className="btn-approve">
                <Check size={16} /> Approve
              </button>
              <button className="btn-reject">
                <X size={16} /> Reject
              </button>
            </div>
          </div>

          <div className="approval-item">
            <div className="approval-header">
              <h4>Robert Chen</h4>
              <span className="approval-badge">Attendance Edit</span>
            </div>
            <p className="approval-desc">Attendance correction</p>
            <div className="approval-actions">
              <button className="btn-approve">
                <Check size={16} /> Approve
              </button>
              <button className="btn-reject">
                <X size={16} /> Reject
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
