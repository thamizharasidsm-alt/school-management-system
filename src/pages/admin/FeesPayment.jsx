import React, { useState } from 'react';
import { Search, Calendar } from 'lucide-react';

export const PAYMENT_RECORDS = [
  {
    id: 1,
    student: 'Liam smith',
    idNumber: 'STD-10231',
    grade: 'Grade 5 - A',
    feeType: 'Tuition',
    receiptNo: 'REC-6821',
    amount: '$2,500',
    paidDate: '15 Oct 2024',
    status: 'Paid',
    method: 'Online',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg' 
  },
  {
    id: 2,
    student: 'John Smith',
    idNumber: 'STD-10245',
    grade: 'Grade 6 - B',
    feeType: 'Transport',
    receiptNo: '-',
    amount: '$450',
    paidDate: '-',
    status: 'Pending',
    method: '-',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 3,
    student: 'Michael Chang',
    idNumber: 'STD-10258',
    grade: 'Grade 4 - C',
    feeType: 'Exam',
    receiptNo: '-',
    amount: '$150',
    paidDate: '-',
    status: 'Overdue',
    method: '-',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg'
  },
  {
    id: 4,
    student: 'Sophia Patel',
    idNumber: 'STD-10262',
    grade: 'Grade 7 - C',
    feeType: 'Tuition',
    receiptNo: 'REC-6841',
    amount: '$2,200',
    paidDate: '07 Oct 2024',
    status: 'Paid',
    method: 'Online',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
  },
  {
    id: 5,
    student: 'Sophia martinez',
    idNumber: 'STD-10262',
    grade: 'Grade 5 - A',
    feeType: 'Library',
    receiptNo: 'REC-6841',
    amount: '$2,200',
    paidDate: '07 Oct 2024',
    status: 'Paid',
    method: 'Cash',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  }
];

export default function FeesPayment() {
  const [searchQuery, setSearchQuery] = useState('');
  const [monthFilter, setMonthFilter] = useState('All Months');

  const filteredRecords = PAYMENT_RECORDS.filter(record => {
    const matchesSearch = record.student.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          record.idNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesMonth = true;
    if (monthFilter !== 'All Months') {
      matchesMonth = record.paidDate.includes(monthFilter);
    }
    
    return matchesSearch && matchesMonth;
  });

  return (
    <div className="fees-payment-section">
      <div className="table-controls" style={{ marginBottom: '24px', display: 'flex', gap: '16px' }}>
        <div className="table-search" style={{ borderRadius: '8px', padding: '8px 16px', background: 'white', width: '300px', display: 'flex', alignItems: 'center' }}>
          <Search size={18} color="#94A3B8" style={{ marginRight: '8px' }} />
          <input 
            type="text" 
            placeholder="Search Student or roll no......" 
            style={{ width: '100%', fontSize: '14px', border: 'none', outline: 'none' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="table-filter" style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '8px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', position: 'relative' }}>
          <Calendar size={18} color="#64748B" style={{ marginRight: '8px' }} />
          <select 
            style={{ fontSize: '14px', color: '#64748B', fontWeight: 500, border: 'none', outline: 'none', background: 'transparent', appearance: 'none', paddingRight: '24px', cursor: 'pointer' }}
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          >
            <option value="All Months">All Months</option>
            <option value="Jan">January</option>
            <option value="Feb">February</option>
            <option value="Mar">March</option>
            <option value="Apr">April</option>
            <option value="May">May</option>
            <option value="Jun">June</option>
            <option value="Jul">July</option>
            <option value="Aug">August</option>
            <option value="Sep">September</option>
            <option value="Oct">October</option>
            <option value="Nov">November</option>
            <option value="Dec">December</option>
          </select>
          <svg style={{ position: 'absolute', right: '12px', pointerEvents: 'none' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>

      <div className="table-container" style={{ padding: '24px', background: 'white', borderRadius: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0F172A', marginBottom: '24px' }}>Student Payment Records</h2>
        
        <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: '#F8FAFC', color: '#64748B', fontWeight: 600, fontSize: '13px', textAlign: 'left', padding: '16px' }}>Student</th>
              <th style={{ backgroundColor: '#F8FAFC', color: '#64748B', fontWeight: 600, fontSize: '13px', textAlign: 'left', padding: '16px' }}>Grade & Section</th>
              <th style={{ backgroundColor: '#F8FAFC', color: '#64748B', fontWeight: 600, fontSize: '13px', textAlign: 'left', padding: '16px' }}>Fee Type</th>
              <th style={{ backgroundColor: '#F8FAFC', color: '#64748B', fontWeight: 600, fontSize: '13px', textAlign: 'left', padding: '16px' }}>Receipt No.</th>
              <th style={{ backgroundColor: '#F8FAFC', color: '#64748B', fontWeight: 600, fontSize: '13px', textAlign: 'left', padding: '16px' }}>Amount</th>
              <th style={{ backgroundColor: '#F8FAFC', color: '#64748B', fontWeight: 600, fontSize: '13px', textAlign: 'left', padding: '16px' }}>Paid Date</th>
              <th style={{ backgroundColor: '#F8FAFC', color: '#64748B', fontWeight: 600, fontSize: '13px', textAlign: 'left', padding: '16px' }}>Status</th>
              <th style={{ backgroundColor: '#F8FAFC', color: '#64748B', fontWeight: 600, fontSize: '13px', textAlign: 'left', padding: '16px' }}>Method</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record, index) => (
              <tr key={record.id} style={{ borderBottom: index !== filteredRecords.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                <td style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={record.avatar} alt={record.student} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 500, color: '#0F172A', fontSize: '14px' }}>{record.student}</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>{record.idNumber}</div>
                  </div>
                </td>
                <td style={{ padding: '16px', color: '#475569', fontSize: '14px' }}>{record.grade}</td>
                <td style={{ padding: '16px', color: '#475569', fontSize: '14px' }}>{record.feeType}</td>
                <td style={{ padding: '16px', color: '#475569', fontSize: '14px' }}>{record.receiptNo}</td>
                <td style={{ padding: '16px', fontWeight: 600, color: '#0F172A', fontSize: '14px' }}>{record.amount}</td>
                <td style={{ padding: '16px', color: '#475569', fontSize: '14px' }}>{record.paidDate}</td>
                <td style={{ padding: '16px' }}>
                  <span className={`payment-status-badge ${record.status.toLowerCase()}`}>
                    {record.status}
                  </span>
                </td>
                <td style={{ padding: '16px', color: '#475569', fontSize: '14px' }}>{record.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
