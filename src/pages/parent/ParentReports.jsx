import React, { useState, useEffect } from 'react';
import { 
  Download, 
  FileSpreadsheet, 
  BookOpen, 
  Calendar, 
  IndianRupee, 
  CheckCircle2, 
  Info 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const MOCK_GRADES = [
  { subject: 'Mathematics', type: 'Midterm', marks: '88/100', classAvg: '76%', grade: 'A', status: 'Pass' },
  { subject: 'Science', type: 'Midterm', marks: '92/100', classAvg: '78%', grade: 'A+', status: 'Pass' },
  { subject: 'English', type: 'Midterm', marks: '78/100', classAvg: '74%', grade: 'B+', status: 'Pass' },
  { subject: 'Social Studies', type: 'Midterm', marks: '85/100', classAvg: '75%', grade: 'A', status: 'Pass' },
  { subject: 'Mathematics', type: 'Test 1', marks: '45/50', classAvg: '38%', grade: 'A', status: 'Pass' },
  { subject: 'Science', type: 'Test 1', marks: '48/50', classAvg: '39%', grade: 'A+', status: 'Pass' },
  { subject: 'English', type: 'Test 1', marks: '38/50', classAvg: '36%', grade: 'B', status: 'Pass' },
  { subject: 'Social Studies', type: 'Test 1', marks: '42/50', classAvg: '37%', grade: 'A', status: 'Pass' }
];

const MOCK_ATTENDANCE = [
  { name: 'Aug', present: 20, absent: 1, late: 1, rate: 91 },
  { name: 'Sep', present: 22, absent: 0, late: 0, rate: 100 },
  { name: 'Oct', present: 18, absent: 2, late: 1, rate: 86 },
  { name: 'Nov', present: 21, absent: 1, late: 0, rate: 95 },
  { name: 'Dec', present: 15, absent: 0, late: 0, rate: 100 },
  { name: 'Jan', present: 19, absent: 2, late: 1, rate: 86 },
  { name: 'Feb', present: 20, absent: 0, late: 0, rate: 100 },
  { name: 'Mar', present: 22, absent: 1, late: 0, rate: 95 },
  { name: 'Apr', present: 17, absent: 2, late: 1, rate: 85 },
  { name: 'May', present: 21, absent: 0, late: 0, rate: 100 }
];

export default function ParentReports({ parent }) {
  const [activeTab, setActiveTab] = useState('grades');
  const [student, setStudent] = useState(null);
  const [feesStatus, setFeesStatus] = useState({ transport: false, library: false });

  useEffect(() => {
    // 1. Look up student
    const storedStudents = localStorage.getItem('MOCK_STUDENTS');
    if (storedStudents && parent) {
      const studentsList = JSON.parse(storedStudents);
      const child = studentsList.find(s => s.name === parent.children || s.guardian === parent.name);
      if (child) {
        setStudent(child);
      } else {
        setStudent({ id: 'STU-24001', name: parent.children || 'David Chen', grade: 'Grade 4 - A' });
      }
    }

    // 2. Look up paid fees
    if (parent) {
      const storedFeeStatus = localStorage.getItem(`FEE_STATUS_${parent.id}`);
      if (storedFeeStatus) {
        setFeesStatus(JSON.parse(storedFeeStatus));
      }
    }
  }, [parent]);

  // Construct payments list dynamically based on local storage status
  const getPayments = () => {
    const list = [
      { id: 'RCP-501', title: 'Tution Fee', date: '2025-09-05', amount: 5200, method: 'Card Ending 4242', status: 'Paid' },
      { id: 'RCP-502', title: 'Activity Fee', date: '2025-09-10', amount: 800, method: 'Card Ending 4242', status: 'Paid' }
    ];
    if (feesStatus.transport) {
      list.push({ id: 'RCP-503', title: 'Transport Fee', date: new Date().toISOString().split('T')[0], amount: 1200, method: 'Card Online Authorization', status: 'Paid' });
    }
    if (feesStatus.library) {
      list.push({ id: 'RCP-504', title: 'Library Fee', date: new Date().toISOString().split('T')[0], amount: 400, method: 'Card Online Authorization', status: 'Paid' });
    }
    return list;
  };

  const handleExportGrades = () => {
    if (!student) return;
    const csvContent = [
      ['Student ID', 'Student Name', 'Grade & Section'],
      [student.id, student.name, student.grade],
      [],
      ['Subject', 'Exam Type', 'Marks Obtained', 'Class Average', 'Letter Grade', 'Status'],
      ...MOCK_GRADES.map(g => [g.subject, g.type, g.marks, g.classAvg, g.grade, g.status])
    ].map(row => row.map(val => `"${val}"`).join(',')).join('\n');

    triggerDownload(csvContent, `${student.name.replace(/\s+/g, '_')}_Academic_Report.csv`);
  };

  const handleExportAttendance = () => {
    if (!student) return;
    const csvContent = [
      ['Student ID', 'Student Name', 'Academic Year'],
      [student.id, student.name, '2025-2026'],
      [],
      ['Month', 'Days Present', 'Days Absent', 'Days Late', 'Attendance Rate %'],
      ...MOCK_ATTENDANCE.map(a => [a.name, a.present, a.absent, a.late, `${a.rate}%`])
    ].map(row => row.map(val => `"${val}"`).join(',')).join('\n');

    triggerDownload(csvContent, `${student.name.replace(/\s+/g, '_')}_Attendance_Report.csv`);
  };

  const handleExportFees = () => {
    const list = getPayments();
    const csvContent = [
      ['Guardian Name', 'Student Name', 'Payment Receipts Log'],
      [parent?.name || 'N/A', student?.name || 'N/A', new Date().toLocaleDateString()],
      [],
      ['Receipt ID', 'Fee Description', 'Payment Date', 'Amount Paid ($)', 'Payment Method', 'Status'],
      ...list.map(p => [p.id, p.title, p.date, p.amount, p.method, p.status])
    ].map(row => row.map(val => `"${val}"`).join(',')).join('\n');

    triggerDownload(csvContent, `${student?.name.replace(/\s+/g, '_') || 'Student'}_Fee_Receipts.csv`);
  };

  const triggerDownload = (csvData, filename) => {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="parent-portal-container animate-fade-in-up">
      {/* Title */}
      <div className="dashboard-title-area">
        <div className="dashboard-title">
          <h1>Student Reports</h1>
          <p>Download academic grades, attendance statements, and payment receipts in CSV format.</p>
        </div>
        <div className="title-actions">
          {activeTab === 'grades' && (
            <button className="btn-primary" onClick={handleExportGrades}>
              <Download size={18} /> Export Academic Report
            </button>
          )}
          {activeTab === 'attendance' && (
            <button className="btn-primary" onClick={handleExportAttendance}>
              <Download size={18} /> Export Attendance Report
            </button>
          )}
          {activeTab === 'fees' && (
            <button className="btn-primary" onClick={handleExportFees}>
              <Download size={18} /> Export Fee Receipts
            </button>
          )}
        </div>
      </div>

      {/* Internal Tabs */}
      <div className="fees-tabs-container">
        <button 
          className={`fees-tab ${activeTab === 'grades' ? 'active' : ''}`}
          onClick={() => setActiveTab('grades')}
        >
          <BookOpen size={18} /> Report Card / Grades
        </button>
        <button 
          className={`fees-tab ${activeTab === 'attendance' ? 'active' : ''}`}
          onClick={() => setActiveTab('attendance')}
        >
          <Calendar size={18} /> Attendance Statement
        </button>
        <button 
          className={`fees-tab ${activeTab === 'fees' ? 'active' : ''}`}
          onClick={() => setActiveTab('fees')}
        >
          <IndianRupee size={18} /> Payment Receipts
        </button>
      </div>

      {/* Report Card Tab */}
      {activeTab === 'grades' && (
        <div className="parent-academic-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 className="parent-academic-title">Academic Marks & Term Grades</h2>
            <div style={{ display: 'flex', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
              <span>Student ID: <strong>{student?.id}</strong></span> • 
              <span>Name: <strong>{student?.name}</strong></span>
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>SUBJECT</th>
                  <th>EXAM TYPE</th>
                  <th>MARKS</th>
                  <th>CLASS AVERAGE</th>
                  <th>GRADE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_GRADES.map((g, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{g.subject}</td>
                    <td>{g.type}</td>
                    <td style={{ fontWeight: 600 }}>{g.marks}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{g.classAvg}</td>
                    <td>
                      <span className={`parent-badge ${g.grade.startsWith('A') ? 'resolved' : ''}`} style={{ padding: '2px 8px' }}>
                        {g.grade}
                      </span>
                    </td>
                    <td>
                      <span className="status-badge active" style={{ fontSize: '11px' }}>
                        <span className="status-dot"></span> {g.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Attendance History Tab */}
      {activeTab === 'attendance' && (
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
          {/* Monthly stats table */}
          <div className="parent-academic-card">
            <h2 className="parent-academic-title" style={{ marginBottom: '20px' }}>Attendance Monthly Log</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>MONTH</th>
                    <th>DAYS PRESENT</th>
                    <th>DAYS ABSENT</th>
                    <th>DAYS LATE</th>
                    <th>ATTENDANCE RATE</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_ATTENDANCE.map((a, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{a.name}</td>
                      <td>{a.present} Days</td>
                      <td style={{ color: a.absent > 0 ? 'var(--red-main)' : 'inherit' }}>{a.absent} Days</td>
                      <td>{a.late} Days</td>
                      <td style={{ fontWeight: 700, color: a.rate >= 90 ? 'var(--green-main)' : 'var(--yellow-main)' }}>{a.rate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chart visualizer */}
          <div className="parent-academic-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 className="parent-academic-title" style={{ marginBottom: '4px' }}>Monthly Rate Chart</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>Visual rate analysis (%)</p>
            <div style={{ flex: 1, width: '100%', minHeight: '250px' }}>
              <ResponsiveContainer>
                <BarChart data={MOCK_ATTENDANCE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis domain={[70, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                  <Tooltip cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }} />
                  <Bar dataKey="rate" fill="var(--sidebar-active)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Payment Receipts Tab */}
      {activeTab === 'fees' && (
        <div className="parent-academic-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 className="parent-academic-title">Paid Transaction Receipts</h2>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Receipt records are updated immediately upon online payment.
            </span>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>RECEIPT ID</th>
                  <th>FEE CATEGORY</th>
                  <th>PAYMENT DATE</th>
                  <th>AMOUNT PAID</th>
                  <th>PAYMENT METHOD</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {getPayments().map((p) => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 600, color: 'var(--primary-blue)' }}>{p.id}</td>
                    <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{p.title}</td>
                    <td>{new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td style={{ fontWeight: 700, color: 'var(--green-main)' }}>${p.amount}</td>
                    <td>{p.method}</td>
                    <td>
                      <span className="status-badge active" style={{ background: 'var(--green-light)', color: 'var(--green-main)' }}>
                        <span className="status-dot" style={{ background: 'var(--green-main)' }}></span> {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{ marginTop: '20px', display: 'flex', gap: '8px', padding: '16px', background: '#F0F9FF', borderRadius: '16px', border: '1px solid #BAE6FD', color: '#0369A1' }}>
            <Info size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontSize: '13px', lineHeight: '1.5' }}>
              <strong>Need a stamped physical receipt?</strong> Stamped, physical payment receipts can be collected from the school administrative fees counter during business hours by presenting the Receipt ID listed above.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
