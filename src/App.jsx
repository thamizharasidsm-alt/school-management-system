import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CalendarCheck, 
  Calendar,
  CreditCard, 
  MessageSquare, 
  BarChart2, 
  Folder, 
  Settings as SettingsIcon, 
  CheckSquare,
  Search,
  Bell,
  GraduationCap,
  IndianRupee,
  Book,
  ClipboardList,
  PenTool,
  FileText,
  Menu,
  X,
  Mail
} from 'lucide-react';

import Dashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import Academic from './pages/admin/Academic';
import Attendance from './pages/admin/Attendance';
import Fees from './pages/admin/Fees';
import Communication from './pages/admin/Communication';
import Reports from './pages/admin/Reports';
import Documents from './pages/admin/Documents';
import Settings from './pages/admin/Settings';
import Approvals from './pages/admin/Approvals';
import Login from './pages/auth/Login';
import Messages from './pages/teacher/Messages';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import MyClasses from './pages/teacher/MyClasses';
import Students from './pages/teacher/Students';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import TeacherAssignment from './pages/teacher/TeacherAssignment';
import ExamsMarks from './pages/teacher/ExamsMarks';
import TeacherLeave from './pages/teacher/TeacherLeave';

import ParentDashboard from './pages/parent/ParentDashboard';
import ParentComplaints from './pages/parent/ParentComplaints';
import ParentSettings from './pages/parent/ParentSettings';
import ParentPTM from './pages/parent/ParentPTM';
import ParentReports from './pages/parent/ParentReports';
import ParentLeave from './pages/parent/ParentLeave';
import './pages/parent/ParentPortal.css';

const SEED_STUDENTS = [
  { id: 'STU-24001', name: 'David Chen', email: 'david.c@example.com', grade: 'Grade 4 - A', guardian: 'Robert Chen', relation: 'Father', status: 'Active', joined: 'Oct 18, 2023', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 'STU-24002', name: 'Omar Hassan', email: 'omar.h@example.com', grade: 'Grade 4 - A', guardian: 'Layla Hassan', relation: 'Mother', status: 'Active', joined: 'Oct 06, 2023', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 'STU-24003', name: 'Tommy Miller', email: 'tommy.m@example.com', grade: 'Grade 4 - A', guardian: 'Gary Miller', relation: 'Father', status: 'Active', joined: 'Jan 10, 2024', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 'STU-24011', name: 'Alex Johnson', email: 'alex.j@example.com', grade: 'Grade 5 - A', guardian: 'Michael Johnson', relation: 'Father', status: 'Active', joined: 'Oct 24, 2023', avatar: 'https://i.pravatar.cc/150?u=11' },
  { id: 'STU-24013', name: 'Liam Smith', email: 'liam.s@example.com', grade: 'Grade 5 - B', guardian: 'Sophia Wilson', relation: 'Mother', status: 'Active', joined: 'Sep 28, 2023', avatar: 'https://i.pravatar.cc/150?u=13' },
  { id: 'STU-24022', name: 'Emma Davis', email: 'emma.d@example.com', grade: 'Grade 6 - B', guardian: 'James Davis', relation: 'Father', status: 'Active', joined: 'Oct 02, 2023', avatar: 'https://i.pravatar.cc/150?u=22' },
  { id: 'STU-24052', name: 'Emily Brown', email: 'emily.b@example.com', grade: 'Grade 6 - B', guardian: 'Emma Williams', relation: 'Mother', status: 'Active', joined: 'Oct 02, 2023', avatar: 'https://i.pravatar.cc/150?u=eb' }
];

const SEED_PARENTS = [
  { id: 'PAR-5003', name: 'Robert Chen', email: 'r.chen@example.com', phone: '+1 234 567 8903', children: 'David Chen', status: 'Active', joined: 'Oct 18, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267043' },
  { id: 'PAR-5001', name: 'Michael Johnson', email: 'm.johnson@example.com', phone: '+1 234 567 8901', children: 'Alex Johnson', status: 'Active', joined: 'Oct 24, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267041' },
  { id: 'PAR-5002', name: 'Emma Williams', email: 'e.williams@example.com', phone: '+1 234 567 8902', children: 'Emily Brown', status: 'Active', joined: 'Oct 22, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267042' }
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [highlightNoticesTrigger, setHighlightNoticesTrigger] = useState(0);

  // Parent notifications state
  const [unreadLeaves, setUnreadLeaves] = useState([]);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  // Auto-close sidebar on page navigation
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activePage]);

  // Central seeding on mount
  useEffect(() => {
    // Seed students if not present
    let storedStudents = localStorage.getItem('MOCK_STUDENTS');
    if (!storedStudents) {
      localStorage.setItem('MOCK_STUDENTS', JSON.stringify(SEED_STUDENTS));
    }

    // Seed parents if not present
    let storedParents = localStorage.getItem('MOCK_PARENTS');
    if (!storedParents) {
      localStorage.setItem('MOCK_PARENTS', JSON.stringify(SEED_PARENTS));
    }

    // Seed leave requests if not present
    let storedLeaves = localStorage.getItem('MOCK_LEAVE_REQUESTS');
    if (!storedLeaves) {
      const initialLeaves = [
        {
          id: 'LV-9001',
          studentId: 'STU-24001',
          studentName: 'David Chen',
          grade: 'Grade 4 - A',
          parentName: 'Robert Chen',
          parentEmail: 'r.chen@example.com',
          date: '2026-06-15',
          reason: 'Family wedding out of town',
          status: 'Pending',
          submittedDate: '2026-06-12',
          readByParent: true,
          emailLogs: [
            {
              id: 'EML-101-1',
              from: 'Robert Chen (r.chen@example.com)',
              to: 'Sarah Johnson (teacher@gmail.com)',
              subject: 'Leave Request Notification: David Chen',
              body: 'Dear Class Teacher,\n\nMy child David Chen (Grade 4 - A) will not be able to attend school on 2026-06-15 due to: "Family wedding out of town". Please approve this leave request.\n\nSincerely,\nRobert Chen',
              date: '6/12/2026, 8:00:00 AM',
              status: 'Sent'
            }
          ]
        }
      ];
      localStorage.setItem('MOCK_LEAVE_REQUESTS', JSON.stringify(initialLeaves));
    }
  }, []);

  // Poll for parent unread leave updates dynamically
  useEffect(() => {
    if (userRole === 'parent' && currentUser) {
      const checkNotifications = () => {
        const stored = localStorage.getItem('MOCK_LEAVE_REQUESTS');
        if (stored) {
          const parsed = JSON.parse(stored);
          const unread = parsed.filter(l => 
            (l.parentName === currentUser.name || l.parentEmail === currentUser.email) && 
            l.readByParent === false
          );
          setUnreadLeaves(unread);
        }
      };
      checkNotifications();
      const interval = setInterval(checkNotifications, 1500);
      return () => clearInterval(interval);
    } else {
      setUnreadLeaves([]);
    }
  }, [userRole, currentUser]);

  const handleLogin = (role, userDetails = null) => {
    setUserRole(role);
    setCurrentUser(userDetails);
    setIsAuthenticated(true);
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setCurrentUser(null);
    setHighlightNoticesTrigger(0);
    setUnreadLeaves([]);
  };

  const handleNotificationClick = () => {
    if (userRole === 'parent') {
      if (unreadLeaves.length > 0) {
        setIsNotificationModalOpen(true);
      } else {
        setActivePage('dashboard');
        setHighlightNoticesTrigger(prev => prev + 1);
      }
    } else {
      alert("No new announcements.");
    }
  };

  const handleClearNotifications = () => {
    const stored = localStorage.getItem('MOCK_LEAVE_REQUESTS');
    if (stored) {
      const parsed = JSON.parse(stored);
      const updated = parsed.map(l => {
        if (l.parentName === currentUser.name || l.parentEmail === currentUser.email) {
          return { ...l, readByParent: true };
        }
        return l;
      });
      localStorage.setItem('MOCK_LEAVE_REQUESTS', JSON.stringify(updated));
    }
    setUnreadLeaves([]);
    setIsNotificationModalOpen(false);
    setActivePage('leave');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      {/* Mobile Sidebar overlay backdrop */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}
      {/* Sidebar */}
      <aside className={`sidebar ${userRole === 'teacher' ? 'teacher-sidebar' : ''} ${userRole === 'parent' ? 'parent-sidebar' : ''} ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <GraduationCap size={28} />
          <span>EduSmart</span>
        </div>
        
        <nav className="sidebar-nav">
          {userRole === 'admin' && (
            <>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('dashboard'); }}
              >
                <LayoutDashboard size={20} /> Dashboard
              </a>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'user-management' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('user-management'); }}
              >
                <Users size={20} /> User Management
              </a>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'academic' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('academic'); }}
              >
                <BookOpen size={20} /> Academic
              </a>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'attendance' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('attendance'); }}
              >
                <CalendarCheck size={20} /> Attendance
              </a>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'fees' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('fees'); }}
              >
                <IndianRupee size={20} /> Fees
              </a>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'communication' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('communication'); }}
              >
                <MessageSquare size={20} /> Communication
              </a>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'reports' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('reports'); }}
              >
                <BarChart2 size={20} /> Reports
              </a>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'documents' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('documents'); }}
              >
                <Folder size={20} /> Documents
              </a>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'settings' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('settings'); }}
              >
                <SettingsIcon size={20} /> Settings
              </a>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'approvals' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('approvals'); }}
              >
                <CheckSquare size={20} /> Approvals
              </a>
            </>
          )}

          {userRole === 'teacher' && (
            <>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('dashboard'); }}
              >
                <LayoutDashboard size={20} /> Dashboard
              </a>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'my-classes' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('my-classes'); }}
              >
                <Book size={20} /> My Classes
              </a>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'students' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('students'); }}
              >
                <Users size={20} /> Students
              </a>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'attendance' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('attendance'); }}
              >
                <ClipboardList size={20} /> Attendance
              </a>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'assignment' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('assignment'); }}
              >
                <PenTool size={20} /> Assignment
              </a>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'exams-marks' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('exams-marks'); }}
              >
                <FileText size={20} /> Exams & Marks
              </a>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'leave' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('leave'); }}
              >
                <CalendarCheck size={20} /> Leave Requests
              </a>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'messages' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('messages'); }}
              >
                <MessageSquare size={20} /> Messages
              </a>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'settings' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('settings'); }}
              >
                <SettingsIcon size={20} /> Settings
              </a>
            </>
          )}

          {userRole === 'parent' && (
            <>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('dashboard'); }}
              >
                <LayoutDashboard size={20} /> Dashboard
              </a>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'reports' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('reports'); }}
              >
                <BarChart2 size={20} /> Reports
              </a>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'ptm' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('ptm'); }}
              >
                <Calendar size={20} /> PTM Meetings
              </a>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'leave' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('leave'); }}
              >
                <CalendarCheck size={20} /> Leave Requests
              </a>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'complaints' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('complaints'); }}
              >
                <MessageSquare size={20} /> Complaints
              </a>
              <a 
                href="#" 
                className={`nav-item ${activePage === 'settings' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('settings'); }}
              >
                <SettingsIcon size={20} /> Settings
              </a>
            </>
          )}
        </nav>

        <div className="sidebar-footer" style={{ cursor: 'pointer' }} onClick={handleLogout} title="Click to logout">
          <img 
            src={userRole === 'parent' ? (currentUser?.avatar || 'https://i.pravatar.cc/150?u=parent') : 'https://i.pravatar.cc/150?u=a042581f4e29026704d'} 
            alt="Profile" 
            className="avatar" 
          />
          <div className="flex-column">
            <span className="text-sm font-semibold">
              {userRole === 'parent' ? (currentUser?.name || 'Parent User') : 'Sarah Johnson'}
            </span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
              {userRole === 'admin' ? 'Admin' : userRole === 'teacher' ? 'Teacher' : 'Parent'}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Global Header */}
        <header className="header">
          <button className="sidebar-toggle-btn" onClick={() => setIsSidebarOpen(true)} aria-label="Open sidebar">
            <Menu size={22} />
          </button>
          
          <div className="header-actions">
            <button className="notification-btn" onClick={handleNotificationClick} style={{ position: 'relative' }}>
              <Bell size={22} />
              {unreadLeaves.length > 0 ? (
                <span className="pulsing-notification-dot" style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, background: '#EF4444', borderRadius: '50%' }}></span>
              ) : (
                <span style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, background: '#EF4444', borderRadius: '50%' }}></span>
              )}
            </button>
            <div className="header-profile">
              <img 
                src={userRole === 'parent' ? (currentUser?.avatar || 'https://i.pravatar.cc/150?u=parent') : 'https://i.pravatar.cc/150?u=a042581f4e29026704d'} 
                alt="Profile" 
                className="avatar" 
              />
              <div className="flex-column">
                <span className="text-sm font-semibold">
                  {userRole === 'parent' ? (currentUser?.name || 'Parent User') : 'Sarah Johnson'}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {userRole === 'admin' ? 'Admin' : userRole === 'teacher' ? 'Teacher' : 'Parent'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Rendering */}
        {userRole === 'admin' && (
          <>
            {activePage === 'dashboard' && <Dashboard onNavigate={setActivePage} />}
            {activePage === 'user-management' && <UserManagement />}
            {activePage === 'academic' && <Academic />}
            {activePage === 'attendance' && <Attendance />}
            {activePage === 'fees' && <Fees />}
            {activePage === 'communication' && <Communication />}
            {activePage === 'reports' && <Reports />}
            {activePage === 'documents' && <Documents />}
            {activePage === 'settings' && <Settings />}
            {activePage === 'approvals' && <Approvals />}
          </>
        )}

        {userRole === 'teacher' && (
          <>
            {activePage === 'dashboard' && <TeacherDashboard />}
            {activePage === 'my-classes' && <MyClasses />}
            {activePage === 'students' && <Students />}
            {activePage === 'attendance' && <TeacherAttendance />}
            {activePage === 'assignment' && <TeacherAssignment />}
            {activePage === 'exams-marks' && <ExamsMarks />}
            {activePage === 'leave' && <TeacherLeave />}
            {activePage === 'messages' && <Messages />}
            {activePage === 'settings' && <Settings />}
            {/* Fallback for unbuilt teacher pages */}
            {!['dashboard', 'my-classes', 'students', 'attendance', 'assignment', 'exams-marks', 'leave', 'messages', 'settings'].includes(activePage) && (
              <div className="p-8" style={{ padding: '40px' }}>
                <h2>Feature coming soon!</h2>
                <p>The {activePage} module is currently under construction.</p>
              </div>
            )}
          </>
        )}

        {userRole === 'parent' && (
          <>
            {activePage === 'dashboard' && (
              <ParentDashboard 
                parent={currentUser} 
                highlightNoticesTrigger={highlightNoticesTrigger} 
              />
            )}
            {activePage === 'reports' && <ParentReports parent={currentUser} />}
            {activePage === 'ptm' && <ParentPTM parent={currentUser} />}
            {activePage === 'complaints' && <ParentComplaints parent={currentUser} />}
            {activePage === 'leave' && <ParentLeave parent={currentUser} />}
            {activePage === 'settings' && (
              <ParentSettings 
                parent={currentUser} 
                onUpdateProfile={(updatedUser) => setCurrentUser(updatedUser)} 
              />
            )}
          </>
        )}

      </main>

      {/* Parent Notifications Modal */}
      {isNotificationModalOpen && (
        <div className="modal-overlay-custom">
          <div className="modal-content-card">
            <div className="modal-header-custom">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bell size={20} color="var(--primary-blue)" />
                <h3 style={{ margin: 0 }}>Roster Updates & Notifications</h3>
              </div>
              <button className="modal-close-btn" onClick={handleClearNotifications}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>
                You have new updates regarding filed leave requests:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto' }}>
                {unreadLeaves.map((l) => (
                  <div key={l.id} style={{ border: '1px solid #E2E8F0', padding: '16px', borderRadius: '12px', background: '#F8FAFC' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <strong style={{ fontSize: '14px', color: 'var(--text-main)' }}>Leave: {l.date}</strong>
                      <span className={`status-pill badge-${l.status === 'Approved' ? 'active' : 'needs-grading'}`} style={{ fontSize: '11px', textTransform: 'capitalize' }}>
                        {l.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      Child: {l.studentName} &bull; Reason: "{l.reason}"
                    </div>
                    {/* Simulated Email confirmation info */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', background: 'white', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '11px' }}>
                      <Mail size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <strong style={{ color: '#334155' }}>Email Notification Received</strong>
                        <p style={{ margin: '2px 0 0 0', color: '#64748B', lineHeight: '1.4' }}>
                          From Class Teacher: "Leave request has been {l.status.toLowerCase()}."
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer-custom">
              <button className="btn-submit" onClick={handleClearNotifications} style={{ width: '100%', justifyContent: 'center' }}>
                Acknowledge and View Leaves
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
