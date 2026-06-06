import React from 'react';
import { Bell } from 'lucide-react';
import { MOCK_STUDENTS } from './UserManagement';

export const PENDING_RECORDS = [
  {
    id: 1,
    studentId: 'STU-24002', // maps to Sarah Williams, Grade 6 - B
    feeType: 'Transport',
    dueAmount: '$6,200',
    daysOverdue: '-',
    dueDate: '2026-04-15',
    status: 'Pending'
  },
  {
    id: 2,
    studentId: 'STU-24003', // maps to David Chen, Grade 4 - A
    feeType: 'Exam',
    dueAmount: '$5,400',
    daysOverdue: '44D',
    dueDate: '2026-03-15',
    status: 'Overdue'
  },
  {
    id: 3,
    studentId: 'STU-24008', // maps to Emma Davis, Grade 6 - A
    feeType: 'Tuition',
    dueAmount: '$5,800',
    daysOverdue: '38D',
    dueDate: '2026-03-15',
    status: 'Overdue'
  },
  {
    id: 4,
    studentId: 'STU-24007', // maps to Omar Hassan, Grade 4 - B
    feeType: 'Lab Fee',
    dueAmount: '$1,200',
    daysOverdue: '32D',
    dueDate: '2026-04-20',
    status: 'Pending'
  }
];

export default function FeesPending() {
  // Map records to include student details
  const recordsWithStudentDetails = PENDING_RECORDS.map(record => {
    const student = MOCK_STUDENTS.find(s => s.id === record.studentId);
    return {
      ...record,
      studentName: student ? student.name : 'Unknown Student',
      grade: student ? student.grade : 'Unknown Grade',
      avatar: student ? student.avatar : 'https://i.pravatar.cc/150?u=default'
    };
  });

  return (
    <div className="fees-pending-section">
      <div className="table-container" style={{ padding: '24px', background: 'white', borderRadius: '16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0F172A', marginBottom: '4px' }}>Pending Dues</h2>
        <p style={{ fontSize: '14px', color: '#0F172A', fontWeight: 500, marginBottom: '24px' }}>
          {recordsWithStudentDetails.length} outstanding records: Total Due <strong>$18,600</strong>
        </p>
        
        <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: '#F8FAFC', color: '#64748B', fontWeight: 600, fontSize: '13px', textAlign: 'left', padding: '16px' }}>Student</th>
              <th style={{ backgroundColor: '#F8FAFC', color: '#64748B', fontWeight: 600, fontSize: '13px', textAlign: 'left', padding: '16px' }}>Grade & Section</th>
              <th style={{ backgroundColor: '#F8FAFC', color: '#64748B', fontWeight: 600, fontSize: '13px', textAlign: 'left', padding: '16px' }}>Fee Type</th>
              <th style={{ backgroundColor: '#F8FAFC', color: '#64748B', fontWeight: 600, fontSize: '13px', textAlign: 'left', padding: '16px' }}>Due Amount</th>
              <th style={{ backgroundColor: '#F8FAFC', color: '#64748B', fontWeight: 600, fontSize: '13px', textAlign: 'left', padding: '16px' }}>Days Overdue</th>
              <th style={{ backgroundColor: '#F8FAFC', color: '#64748B', fontWeight: 600, fontSize: '13px', textAlign: 'left', padding: '16px' }}>Due Date</th>
              <th style={{ backgroundColor: '#F8FAFC', color: '#64748B', fontWeight: 600, fontSize: '13px', textAlign: 'left', padding: '16px' }}>Status</th>
              <th style={{ backgroundColor: '#F8FAFC', color: '#64748B', fontWeight: 600, fontSize: '13px', textAlign: 'left', padding: '16px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {recordsWithStudentDetails.map((record, index) => (
              <tr key={record.id} style={{ borderBottom: index !== recordsWithStudentDetails.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                <td style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={record.avatar} alt={record.studentName} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 500, color: '#0F172A', fontSize: '14px' }}>{record.studentName}</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>{record.studentId}</div>
                  </div>
                </td>
                <td style={{ padding: '16px', color: '#475569', fontSize: '14px' }}>{record.grade}</td>
                <td style={{ padding: '16px', color: '#475569', fontSize: '14px' }}>{record.feeType}</td>
                <td style={{ padding: '16px', fontWeight: 600, color: '#0F172A', fontSize: '14px' }}>{record.dueAmount}</td>
                <td style={{ padding: '16px', fontWeight: 600, color: record.daysOverdue !== '-' ? '#DC2626' : '#0F172A', fontSize: '14px' }}>
                  {record.daysOverdue}
                </td>
                <td style={{ padding: '16px', color: '#475569', fontSize: '14px' }}>{record.dueDate}</td>
                <td style={{ padding: '16px' }}>
                  <span className={`payment-status-badge ${record.status.toLowerCase()}`}>
                    {record.status}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#0F172A', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>
                    <Bell size={14} /> Reminder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
