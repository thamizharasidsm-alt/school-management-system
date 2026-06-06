import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CalendarCheck, 
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
  FileText
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [activePage, setActivePage] = useState('dashboard');

  const handleLogin = (role) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className={`sidebar ${userRole === 'teacher' ? 'teacher-sidebar' : ''}`}>
        <div className="sidebar-logo">
          <GraduationCap size={28} />
          <span>EduSmart</span>
        </div>
        
        <nav className="sidebar-nav">
          {userRole === 'admin' ? (
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
          ) : (
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
        </nav>

        <div className="sidebar-footer" style={{ cursor: 'pointer' }} onClick={handleLogout} title="Click to logout">
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="avatar" />
          <div className="flex-column">
            <span className="text-sm font-semibold">Sarah Johnson</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
              {userRole === 'admin' ? 'Admin' : 'Student'}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Global Header */}
        <header className="header">
          <div className="search-container">
            <div className="search-bar">
              <Search size={18} />
              <input type="text" placeholder="Search......." />
            </div>
          </div>
          
          <div className="header-actions">
            <button className="notification-btn">
              <Bell size={22} />
              <span style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, background: '#EF4444', borderRadius: '50%' }}></span>
            </button>
            <div className="header-profile">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="avatar" />
              <div className="flex-column">
                <span className="text-sm font-semibold">Sarah Johnson</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {userRole === 'admin' ? 'Admin' : 'Student'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Rendering */}
        {userRole === 'admin' ? (
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
        ) : (
          <>
            {activePage === 'dashboard' && <TeacherDashboard />}
            {activePage === 'my-classes' && <MyClasses />}
            {activePage === 'students' && <Students />}
            {activePage === 'attendance' && <TeacherAttendance />}
            {activePage === 'messages' && <Messages />}
            {activePage === 'settings' && <Settings />}
            {/* Fallback for unbuilt teacher pages */}
            {!['dashboard', 'messages', 'settings'].includes(activePage) && (
              <div className="p-8" style={{ padding: '40px' }}>
                <h2>Feature coming soon!</h2>
                <p>The {activePage} module is currently under construction.</p>
              </div>
            )}
          </>
        )}

      </main>
    </div>
  );
}

export default App;
