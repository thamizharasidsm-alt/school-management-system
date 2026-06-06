import React, { useState, useMemo } from 'react';
import { 
  Download, 
  BookOpen, 
  DollarSign, 
  Users,
  CalendarCheck,
  AlertCircle,
  TrendingDown
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { UserCheck, UserX, Clock, Activity } from 'lucide-react';
import { MOCK_STUDENTS } from './UserManagement';

const MONTHLY_COLLECTION_DATA = [
  { month: 'Jan', Collection: 40 },
  { month: 'Feb', Collection: 67 },
  { month: 'Mar', Collection: 60 },
  { month: 'Apr', Collection: 43 },
  { month: 'May', Collection: 90 },
  { month: 'Jun', Collection: 47 },
  { month: 'July', Collection: 64 },
  { month: 'Aug', Collection: 57 },
  { month: 'Sep', Collection: 87 },
  { month: 'Oct', Collection: 67 },
  { month: 'Nov', Collection: 67 },
  { month: 'Dec', Collection: 80 },
];

const FEE_CATEGORY_DATA = [
  { name: 'Tution', value: 45, color: '#A855F7' },
  { name: 'Transport', value: 20, color: '#F87171' },
  { name: 'Activity', value: 15, color: '#22D3EE' },
  { name: 'Library', value: 10, color: '#F59E0B' },
  { name: 'Other', value: 10, color: '#3B82F6' },
];

const ATTENDANCE_TREND_DATA = [
  { month: 'Jan', Rate: 95 },
  { month: 'Feb', Rate: 92 },
  { month: 'Mar', Rate: 96 },
  { month: 'Apr', Rate: 91 },
  { month: 'May', Rate: 98 },
  { month: 'Jun', Rate: 85 },
  { month: 'Jul', Rate: 88 },
  { month: 'Aug', Rate: 93 },
  { month: 'Sep', Rate: 94 },
  { month: 'Oct', Rate: 96 },
  { month: 'Nov', Rate: 95 },
  { month: 'Dec', Rate: 91 },
];

const ATTENDANCE_BY_GRADE = [
  { grade: 'Grade 3', rate: 94 },
  { grade: 'Grade 4', rate: 91 },
  { grade: 'Grade 5', rate: 96 },
  { grade: 'Grade 6', rate: 89 },
  { grade: 'Grade 7', rate: 85 },
  { grade: 'Grade 8', rate: 92 },
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState('academic');

  const { subjectData, passFailData, topStudent, overallAvg, passRate, riskCount } = useMemo(() => {
    if (!MOCK_STUDENTS || MOCK_STUDENTS.length === 0) {
      return { subjectData: [], passFailData: [], topStudent: 'N/A', overallAvg: 0, passRate: 0, riskCount: 0 };
    }

    const hashString = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return Math.abs(hash);
    };

    const subjects = ['Maths', 'English', 'History', 'Arts', 'PE', 'Science'];
    
    // Deterministic score based on student ID and subject
    const getStudentScore = (studentId, subject) => {
      const hash = hashString(studentId + subject);
      return 30 + (hash % 71); // Score between 30 and 100
    };

    let totalScoreSum = 0;
    let totalPassCount = 0;
    let totalRiskCount = 0;
    
    let topStudentName = '';
    let topStudentScore = 0;

    const gradesMap = {};
    const subjectSums = { Maths: 0, English: 0, History: 0, Arts: 0, PE: 0, Science: 0 };

    MOCK_STUDENTS.forEach(student => {
      let studentTotal = 0;
      subjects.forEach(sub => {
        const score = getStudentScore(student.id, sub);
        studentTotal += score;
        subjectSums[sub] += score;
      });
      
      const studentAvg = studentTotal / subjects.length;
      totalScoreSum += studentAvg;
      
      if (studentAvg >= 50) totalPassCount++;
      if (studentAvg < 60) totalRiskCount++;
      
      if (studentAvg > topStudentScore) {
        topStudentScore = studentAvg;
        topStudentName = student.name;
      }

      const baseGrade = student.grade.split(' - ')[0];
      if (!gradesMap[baseGrade]) {
        gradesMap[baseGrade] = { passCount: 0, failCount: 0, total: 0 };
      }
      gradesMap[baseGrade].total += 1;
      if (studentAvg >= 50) {
        gradesMap[baseGrade].passCount += 1;
      } else {
        gradesMap[baseGrade].failCount += 1;
      }
    });

    const sData = subjects.map(sub => ({
      subject: sub,
      avg: Math.round(subjectSums[sub] / MOCK_STUDENTS.length)
    }));

    const pfData = Object.keys(gradesMap).sort().map(grade => {
      const stats = gradesMap[grade];
      return {
        grade,
        pass: Math.round((stats.passCount / stats.total) * 100),
        fail: Math.round((stats.failCount / stats.total) * 100)
      };
    });

    return {
      subjectData: sData,
      passFailData: pfData,
      topStudent: topStudentName,
      overallAvg: (totalScoreSum / MOCK_STUDENTS.length).toFixed(1),
      passRate: ((totalPassCount / MOCK_STUDENTS.length) * 100).toFixed(1),
      riskCount: totalRiskCount
    };
  }, [MOCK_STUDENTS]);

  return (
    <>
      <div className="dashboard-title-area">
        <div className="dashboard-title">
          <h1>Report & Analysis</h1>
          <p>Comprehensive school performance insights and export tools</p>
        </div>
        <div className="title-actions">
          <button className="btn-outline">
            <Download size={18} /> Export Excel
          </button>
        </div>
      </div>

      <div className="fees-tabs-container">
        <button 
          className={`fees-tab ${activeTab === 'academic' ? 'active' : ''}`}
          onClick={() => setActiveTab('academic')}
        >
          <BookOpen size={18} /> Academic Reports
        </button>
        <button 
          className={`fees-tab ${activeTab === 'financial' ? 'active' : ''}`}
          onClick={() => setActiveTab('financial')}
        >
          <DollarSign size={18} /> Financial Reports
        </button>
        <button 
          className={`fees-tab ${activeTab === 'attendance' ? 'active' : ''}`}
          onClick={() => setActiveTab('attendance')}
        >
          <Users size={18} /> Attendance Analysis
        </button>
      </div>

      {activeTab === 'academic' && (
        <>
          {/* Summary Cards */}
          <div className="attendance-summary" style={{ gap: '16px' }}>
            <div className="att-summary-card" style={{ padding: '20px', borderLeftWidth: '6px', borderLeftColor: 'var(--blue-main)' }}>
              <div className="att-icon-wrapper" style={{ background: 'var(--blue-light)', color: 'var(--blue-main)' }}>
                <CalendarCheck size={20} />
              </div>
              <div className="att-info">
                <h2 style={{ fontSize: '24px' }}>{overallAvg}%</h2>
                <p style={{ color: '#0F172A', fontWeight: 600 }}>Overall Average</p>
                <p style={{ fontSize: '11px' }}>Based on all students</p>
              </div>
            </div>

            <div className="att-summary-card" style={{ padding: '20px', borderLeftWidth: '6px', borderLeftColor: 'var(--blue-main)' }}>
              <div className="att-icon-wrapper" style={{ background: 'var(--blue-light)', color: 'var(--blue-main)' }}>
                <CalendarCheck size={20} />
              </div>
              <div className="att-info">
                <h2 style={{ fontSize: '24px' }}>{passRate}%</h2>
                <p style={{ color: '#0F172A', fontWeight: 600 }}>Pass Rate</p>
                <p style={{ fontSize: '11px' }}>Students over 50% avg</p>
              </div>
            </div>

            <div className="att-summary-card" style={{ padding: '20px', borderLeftWidth: '6px', borderLeftColor: 'var(--blue-main)' }}>
              <div className="att-icon-wrapper" style={{ background: 'var(--blue-light)', color: 'var(--blue-main)' }}>
                <CalendarCheck size={20} />
              </div>
              <div className="att-info">
                <h2 style={{ fontSize: '24px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px' }}>{topStudent}</h2>
                <p style={{ color: '#0F172A', fontWeight: 600 }}>Top Score</p>
                <p style={{ fontSize: '11px' }}>Highest avg grade</p>
              </div>
            </div>

            <div className="att-summary-card" style={{ padding: '20px', borderLeftWidth: '6px', borderLeftColor: 'var(--blue-main)' }}>
              <div className="att-icon-wrapper" style={{ background: 'var(--blue-light)', color: 'var(--blue-main)' }}>
                <CalendarCheck size={20} />
              </div>
              <div className="att-info">
                <h2 style={{ fontSize: '24px' }}>{riskCount}</h2>
                <p style={{ color: '#0F172A', fontWeight: 600 }}>Risk students</p>
                <p style={{ fontSize: '11px' }}>Below 60% avg</p>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            
            {/* Chart 1 */}
            <div className="chart-card">
              <h3 className="chart-title" style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '600' }}>Subject Wise Average performance</h3>
              <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                  <BarChart data={subjectData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="subject" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748B', fontSize: 12 }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748B', fontSize: 12 }}
                      domain={[0, 100]}
                      ticks={[0, 20, 40, 60, 80, 100]}
                    />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Legend iconType="square" iconSize={10} wrapperStyle={{ fontSize: '12px', color: '#64748B', paddingTop: '20px' }} />
                    <Bar dataKey="avg" name="Avg" fill="#907CFF" radius={[10, 10, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2 */}
            <div className="chart-card">
              <h3 className="chart-title" style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '600' }}>Pass/Fail rate by grade</h3>
              <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                  <BarChart data={passFailData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="grade" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748B', fontSize: 12 }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748B', fontSize: 12 }}
                      domain={[0, 100]}
                      ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                    />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Legend iconType="square" iconSize={10} wrapperStyle={{ fontSize: '12px', color: '#64748B', paddingTop: '20px' }} />
                    <Bar dataKey="pass" name="Pass" stackId="a" fill="#907CFF" barSize={32} />
                    <Bar dataKey="fail" name="Fail" stackId="a" fill="#FFA3A3" radius={[10, 10, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </>
      )}

      {activeTab === 'financial' && (
        <div className="animate-fade-in-up">
          {/* Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            <div className="att-summary-card animate-fade-in-up delay-100" style={{ padding: '24px', borderLeftWidth: '6px', borderLeftColor: '#10B981', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div className="att-icon-wrapper" style={{ background: '#D1FAE5', color: '#10B981', width: '48px', height: '48px', borderRadius: '12px' }}>
                <DollarSign size={24} />
              </div>
              <div className="att-info">
                <h2 style={{ fontSize: '24px', color: '#0F172A', fontWeight: 700, margin: '0 0 4px 0' }}>$525k</h2>
                <p style={{ color: '#64748B', fontSize: '14px', margin: '0 0 2px 0' }}>Total Collected</p>
                <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>8.2% vs last year</p>
              </div>
            </div>

            <div className="att-summary-card animate-fade-in-up delay-200" style={{ padding: '24px', borderLeftWidth: '6px', borderLeftColor: '#EAB308', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div className="att-icon-wrapper" style={{ background: '#FEF3C7', color: '#EAB308', width: '48px', height: '48px', borderRadius: '12px' }}>
                <AlertCircle size={24} />
              </div>
              <div className="att-info">
                <h2 style={{ fontSize: '24px', color: '#0F172A', fontWeight: 700, margin: '0 0 4px 0' }}>$48k</h2>
                <p style={{ color: '#64748B', fontSize: '14px', margin: '0 0 2px 0' }}>Pending dues</p>
                <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>24 students</p>
              </div>
            </div>

            <div className="att-summary-card animate-fade-in-up delay-300" style={{ padding: '24px', borderLeftWidth: '6px', borderLeftColor: '#EF4444', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div className="att-icon-wrapper" style={{ background: '#FEE2E2', color: '#EF4444', width: '48px', height: '48px', borderRadius: '12px' }}>
                <TrendingDown size={24} />
              </div>
              <div className="att-info">
                <h2 style={{ fontSize: '24px', color: '#0F172A', fontWeight: 700, margin: '0 0 4px 0' }}>$25k</h2>
                <p style={{ color: '#64748B', fontSize: '14px', margin: '0 0 2px 0' }}>Overdue Amounts</p>
                <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>12 Overdue</p>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
            
            {/* Chart 1: Bar Chart */}
            <div className="chart-card animate-fade-in-up delay-200" style={{ padding: '32px' }}>
              <h3 className="chart-title" style={{ marginBottom: '32px', fontSize: '18px', fontWeight: '600' }}>Monthly collection Fee 2026</h3>
              <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                  <BarChart data={MONTHLY_COLLECTION_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={{ stroke: '#E2E8F0' }} 
                      tickLine={false} 
                      tick={{ fill: '#64748B', fontSize: 13 }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748B', fontSize: 13 }}
                      domain={[0, 100]}
                      ticks={[0, 20, 40, 60, 80, 100]}
                    />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Legend iconType="square" iconSize={10} wrapperStyle={{ fontSize: '13px', color: '#64748B', paddingTop: '20px' }} />
                    <Bar dataKey="Collection" fill="#A855F7" radius={[6, 6, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Pie Chart */}
            <div className="chart-card animate-fade-in-up delay-300" style={{ padding: '32px' }}>
              <h3 className="chart-title" style={{ marginBottom: '32px', fontSize: '18px', fontWeight: '600' }}>Fee by Category</h3>
              <div style={{ display: 'flex', alignItems: 'center', height: '350px' }}>
                <ResponsiveContainer width="60%" height="100%">
                  <PieChart>
                    <Pie
                      data={FEE_CATEGORY_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={0}
                      outerRadius={110}
                      paddingAngle={0}
                      dataKey="value"
                      stroke="none"
                    >
                      {FEE_CATEGORY_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', paddingLeft: '20px' }}>
                  {FEE_CATEGORY_DATA.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }} />
                      <span style={{ fontSize: '14px', color: '#64748B' }}>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="animate-fade-in-up">
          {/* Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            <div className="att-summary-card animate-fade-in-up delay-100" style={{ padding: '24px', borderLeftWidth: '6px', borderLeftColor: '#10B981', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div className="att-icon-wrapper" style={{ background: '#D1FAE5', color: '#10B981', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UserCheck size={24} />
              </div>
              <div className="att-info">
                <h2 style={{ fontSize: '24px', color: '#0F172A', fontWeight: 700, margin: '0 0 4px 0' }}>94.2%</h2>
                <p style={{ color: '#64748B', fontSize: '14px', margin: '0 0 2px 0' }}>Avg Present Rate</p>
                <p style={{ fontSize: '13px', color: '#10B981', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>+1.2% this week</p>
              </div>
            </div>

            <div className="att-summary-card animate-fade-in-up delay-200" style={{ padding: '24px', borderLeftWidth: '6px', borderLeftColor: '#EF4444', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div className="att-icon-wrapper" style={{ background: '#FEE2E2', color: '#EF4444', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UserX size={24} />
              </div>
              <div className="att-info">
                <h2 style={{ fontSize: '24px', color: '#0F172A', fontWeight: 700, margin: '0 0 4px 0' }}>5.8%</h2>
                <p style={{ color: '#64748B', fontSize: '14px', margin: '0 0 2px 0' }}>Avg Absent Rate</p>
                <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>Overall average</p>
              </div>
            </div>

            <div className="att-summary-card animate-fade-in-up delay-300" style={{ padding: '24px', borderLeftWidth: '6px', borderLeftColor: '#EAB308', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div className="att-icon-wrapper" style={{ background: '#FEF3C7', color: '#EAB308', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={24} />
              </div>
              <div className="att-info">
                <h2 style={{ fontSize: '24px', color: '#0F172A', fontWeight: 700, margin: '0 0 4px 0' }}>14</h2>
                <p style={{ color: '#64748B', fontSize: '14px', margin: '0 0 2px 0' }}>Late Arrivals Today</p>
                <p style={{ fontSize: '13px', color: '#EAB308', margin: 0 }}>Requires attention</p>
              </div>
            </div>

            <div className="att-summary-card animate-fade-in-up delay-400" style={{ padding: '24px', borderLeftWidth: '6px', borderLeftColor: '#3B82F6', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div className="att-icon-wrapper" style={{ background: '#DBEAFE', color: '#3B82F6', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Activity size={24} />
              </div>
              <div className="att-info">
                <h2 style={{ fontSize: '24px', color: '#0F172A', fontWeight: 700, margin: '0 0 4px 0' }}>Grade 5</h2>
                <p style={{ color: '#64748B', fontSize: '14px', margin: '0 0 2px 0' }}>Best Attendance</p>
                <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>96.5% this month</p>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
            
            {/* Chart 1: Line Chart */}
            <div className="chart-card animate-fade-in-up delay-200" style={{ padding: '32px' }}>
              <h3 className="chart-title" style={{ marginBottom: '32px', fontSize: '18px', fontWeight: '600' }}>Overall Attendance Trend (2026)</h3>
              <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                  <LineChart data={ATTENDANCE_TREND_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={{ stroke: '#E2E8F0' }} 
                      tickLine={false} 
                      tick={{ fill: '#64748B', fontSize: 13 }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748B', fontSize: 13 }}
                      domain={[0, 100]}
                      ticks={[0, 20, 40, 60, 80, 100]}
                    />
                    <Tooltip cursor={{ stroke: '#E2E8F0', strokeWidth: 2 }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: '13px', color: '#64748B', paddingTop: '20px' }} />
                    <Line type="monotone" dataKey="Rate" stroke="#10B981" strokeWidth={4} dot={{ r: 6, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Bar Chart */}
            <div className="chart-card animate-fade-in-up delay-300" style={{ padding: '32px' }}>
              <h3 className="chart-title" style={{ marginBottom: '32px', fontSize: '18px', fontWeight: '600' }}>Attendance Rate by Grade</h3>
              <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                  <BarChart data={ATTENDANCE_BY_GRADE} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      type="number"
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748B', fontSize: 13 }}
                      domain={[0, 100]}
                      ticks={[0, 25, 50, 75, 100]}
                    />
                    <YAxis 
                      type="category"
                      dataKey="grade" 
                      axisLine={{ stroke: '#E2E8F0' }} 
                      tickLine={false} 
                      tick={{ fill: '#64748B', fontSize: 13 }} 
                      dx={-10}
                    />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="rate" fill="#3B82F6" radius={[0, 6, 6, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
