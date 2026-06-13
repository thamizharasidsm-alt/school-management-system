import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  CalendarCheck, 
  IndianRupee, 
  TrendingUp, 
  CreditCard, 
  AlertCircle, 
  CheckCircle,
  FileText,
  User,
  Info,
  Calendar,
  X
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const MOCK_GRADES = [
  { subject: 'Mathematics', score: 88, classAvg: 76, teacher: 'John Smith', remarks: 'Excellent analytical skills' },
  { subject: 'Science', score: 92, classAvg: 78, teacher: 'Lisa Park', remarks: 'Very active in lab activities' },
  { subject: 'English', score: 78, classAvg: 74, teacher: 'Maria Santos', remarks: 'Good written expression' },
  { subject: 'Social Studies', score: 85, classAvg: 75, teacher: 'Alice Johnson', remarks: 'Well-informed in historical facts' },
];

const PERFORMANCE_TREND = [
  { name: 'Unit 1', score: 78, avg: 72 },
  { name: 'Unit 2', score: 82, avg: 74 },
  { name: 'Quarterly', score: 80, avg: 73 },
  { name: 'Unit 3', score: 87, avg: 76 },
  { name: 'Half-Yearly', score: 88, avg: 76 },
];

export default function ParentDashboard({ parent, highlightNoticesTrigger }) {
  const [student, setStudent] = useState(null);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1); // 1 = details, 2 = paying, 3 = success
  const [selectedFee, setSelectedFee] = useState(null);
  const [billingDetails, setBillingDetails] = useState({ cardName: '', cardNumber: '', cardExpiry: '', cardCvv: '' });
  const [paymentError, setPaymentError] = useState('');
  const [highlightNotices, setHighlightNotices] = useState(false);
  const noticesRef = React.useRef(null);
  
  // Paid status for fees stored in localStorage for persistence
  const [feesStatus, setFeesStatus] = useState({
    transport: false,
    library: false
  });

  useEffect(() => {
    if (highlightNoticesTrigger > 0 && noticesRef.current) {
      noticesRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightNotices(true);
      const timer = setTimeout(() => {
        setHighlightNotices(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [highlightNoticesTrigger]);

  useEffect(() => {
    // Look up parent's student from localStorage
    const storedStudents = localStorage.getItem('MOCK_STUDENTS');
    if (storedStudents && parent) {
      const studentsList = JSON.parse(storedStudents);
      const child = studentsList.find(s => s.name === parent.children || s.guardian === parent.name);
      if (child) {
        setStudent(child);
      } else {
        // Fallback using parent child metadata or default student
        setStudent({
          id: 'STU-24001',
          name: parent.children || 'David Chen',
          grade: 'Grade 4 - A',
          status: 'Active',
          joined: 'Oct 18, 2023',
          avatar: 'https://i.pravatar.cc/150?u=1'
        });
      }
    }

    // Load paid fees status from localStorage
    if (parent) {
      const storedFeeStatus = localStorage.getItem(`FEE_STATUS_${parent.id}`);
      if (storedFeeStatus) {
        setFeesStatus(JSON.parse(storedFeeStatus));
      }
    }
  }, [parent]);

  // Calculate fees
  const baseTuition = 5200;
  const activityFee = 800;
  const transportFee = 1200;
  const libraryFee = 400;

  const totalFees = baseTuition + activityFee + transportFee + libraryFee;
  let paidFees = baseTuition + activityFee;
  if (feesStatus.transport) paidFees += transportFee;
  if (feesStatus.library) paidFees += libraryFee;
  const pendingFees = totalFees - paidFees;

  const handlePay = (feeType) => {
    setSelectedFee(feeType);
    setPaymentStep(1);
    setPaymentError('');
    setIsPayModalOpen(true);
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    setPaymentError('');

    if (!billingDetails.cardName.trim() || !billingDetails.cardNumber.trim() || !billingDetails.cardExpiry.trim() || !billingDetails.cardCvv.trim()) {
      setPaymentError('All payment fields are required.');
      return;
    }

    // Mock validation
    const cardNo = billingDetails.cardNumber.replace(/\s+/g, '');
    if (cardNo.length < 16) {
      setPaymentError('Please enter a valid 16-digit card number.');
      return;
    }

    setPaymentStep(2);
    setTimeout(() => {
      // Complete payment
      const updatedStatus = { ...feesStatus, [selectedFee]: true };
      setFeesStatus(updatedStatus);
      localStorage.setItem(`FEE_STATUS_${parent.id}`, JSON.stringify(updatedStatus));
      setPaymentStep(3);
    }, 2000);
  };

  if (!student) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading child details...</div>;
  }

  // Attendance details: e.g. Present: 41 days, Absent: 3 days, Late: 2 days. Total = 46.
  const attPresent = 41;
  const attAbsent = 3;
  const attLate = 2;
  const attTotal = attPresent + attAbsent + attLate;
  const attPercent = Math.round((attPresent / attTotal) * 100);

  return (
    <div className="parent-portal-container animate-fade-in-up">
      {/* Portal Header */}
      <div className="parent-dashboard-header">
        <div className="parent-header-left">
          <h1>Welcome, {parent.name}</h1>
          <p>Here is your daily update regarding your child's academic activities and progress.</p>
        </div>
        <div className="parent-student-badge">
          <span className="badge-label">Student Information</span>
          <span className="badge-value">{student.name} ({student.grade})</span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="parent-grid-three-cols">
        {/* Attendance Card */}
        <div className="parent-stat-card accent-blue">
          <div className="parent-stat-header">
            <span className="parent-stat-title">Attendance Rate</span>
            <div className="parent-stat-icon-wrap blue">
              <CalendarCheck size={18} />
            </div>
          </div>
          <div className="parent-attendance-flex">
            <div className="parent-circular-progress" style={{ '--percent': attPercent }}>
              <div className="parent-percent-text">{attPercent}%</div>
            </div>
            <div className="parent-attendance-legend">
              <div className="parent-legend-item">
                <span className="parent-legend-label">
                  <span className="parent-legend-dot green"></span> Present
                </span>
                <span>{attPresent} Days</span>
              </div>
              <div className="parent-legend-item">
                <span className="parent-legend-label">
                  <span className="parent-legend-dot red"></span> Absent
                </span>
                <span>{attAbsent} Days</span>
              </div>
              <div className="parent-legend-item">
                <span className="parent-legend-label">
                  <span className="parent-legend-dot yellow"></span> Late
                </span>
                <span>{attLate} Days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Academic GPA Card */}
        <div className="parent-stat-card accent-purple">
          <div className="parent-stat-header">
            <span className="parent-stat-title">Academic Score</span>
            <div className="parent-stat-icon-wrap purple">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="parent-stat-value">85.8%</div>
          <div className="parent-stat-footer">
            Child average score (Class Average: 75.8%)
          </div>
        </div>

        {/* Fee Status Card */}
        <div className="parent-stat-card accent-green">
          <div className="parent-stat-header">
            <span className="parent-stat-title">Fee Balance</span>
            <div className="parent-stat-icon-wrap green">
              <IndianRupee size={18} />
            </div>
          </div>
          <div className="parent-stat-value">${pendingFees}</div>
          <div className="parent-stat-footer">
            Pending dues (Paid: ${paidFees} / Total: ${totalFees})
          </div>
        </div>
      </div>

      {/* Second Row Grid */}
      <div className="parent-grid-two-cols">
        {/* Left Column: Grades / Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Subject Grades */}
          <div className="parent-academic-card">
            <div className="parent-academic-header">
              <h2 className="parent-academic-title">Report Card / Subject Grades</h2>
              <span className="badge-new" style={{ background: 'var(--purple-light)', color: 'var(--purple-main)' }}>Term 1</span>
            </div>
            
            <div className="parent-grades-list">
              {MOCK_GRADES.map((g, idx) => (
                <div key={idx} className="parent-grade-item">
                  <div>
                    <span className="parent-grade-subj">{g.subject}</span>
                    <div className="parent-grade-meta">Teacher: {g.teacher} • Remarks: {g.remarks}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Class Avg: {g.classAvg}%</span>
                    <span className={`parent-grade-score ${g.score >= 90 ? 'excellent' : g.score >= 80 ? '' : 'warning'}`}>
                      {g.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Chart */}
          <div className="parent-academic-card">
            <div className="parent-academic-header">
              <div>
                <h2 className="parent-academic-title">Progress Assessment Tracker</h2>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>Student score vs Class average</p>
              </div>
            </div>
            <div style={{ width: '100%', height: 220 }}>
              <ResponsiveContainer>
                <AreaChart data={PERFORMANCE_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary-blue)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="var(--primary-blue)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis domain={[50, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="score" stroke="var(--primary-blue)" strokeWidth={2.5} fillOpacity={1} fill="url(#scoreColor)" />
                  <Area type="monotone" dataKey="avg" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="4 4" fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px', fontSize: '12px', color: '#64748B' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '3px', background: 'var(--primary-blue)', borderRadius: '2px' }}></span>
                David's Score
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '1px', borderTop: '2px dashed #94A3B8' }}></span>
                Class Average
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Fees Breakdown & School News */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Fees Details */}
          <div className="parent-academic-card">
            <h2 className="parent-academic-title" style={{ marginBottom: '18px' }}>Fees Statement</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="parent-grade-item" style={{ background: '#F8FAFC' }}>
                <div>
                  <span className="parent-grade-subj" style={{ fontSize: '14px' }}>Tution Fee</span>
                  <div className="parent-grade-meta">Annual tuition payment</div>
                </div>
                <span className="parent-badge resolved">Paid ($5,200)</span>
              </div>

              <div className="parent-grade-item" style={{ background: '#F8FAFC' }}>
                <div>
                  <span className="parent-grade-subj" style={{ fontSize: '14px' }}>Activity Fee</span>
                  <div className="parent-grade-meta">Extra-curricular & sports</div>
                </div>
                <span className="parent-badge resolved">Paid ($800)</span>
              </div>

              <div className="parent-grade-item" style={{ background: '#F8FAFC' }}>
                <div>
                  <span className="parent-grade-subj" style={{ fontSize: '14px' }}>Transport Fee</span>
                  <div className="parent-grade-meta">School bus services</div>
                </div>
                {feesStatus.transport ? (
                  <span className="parent-badge resolved">Paid ($1,200)</span>
                ) : (
                  <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handlePay('transport')}>
                    Pay Now ($1,200)
                  </button>
                )}
              </div>

              <div className="parent-grade-item" style={{ background: '#F8FAFC' }}>
                <div>
                  <span className="parent-grade-subj" style={{ fontSize: '14px' }}>Library Fee</span>
                  <div className="parent-grade-meta">Book loans & access</div>
                </div>
                {feesStatus.library ? (
                  <span className="parent-badge resolved">Paid ($400)</span>
                ) : (
                  <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handlePay('library')}>
                    Pay Now ($400)
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* School Announcements */}
          <div 
            className={`parent-academic-card ${highlightNotices ? 'highlight-pulse' : ''}`}
            ref={noticesRef}
            style={{ transition: 'all 0.3s ease' }}
          >
            <h2 className="parent-academic-title" style={{ marginBottom: '18px' }}>School Notices</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', paddingBottom: '12px', borderBottom: '1px solid #F1F5F9' }}>
                <div style={{ padding: '8px', background: 'var(--blue-light)', color: 'var(--blue-main)', borderRadius: '10px', height: 'max-content' }}>
                  <Calendar size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>Parent-Teacher Conference</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Scheduled for Friday, June 18th in Class 4-A room. Book your slot.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', paddingBottom: '12px', borderBottom: '1px solid #F1F5F9' }}>
                <div style={{ padding: '8px', background: 'var(--purple-light)', color: 'var(--purple-main)', borderRadius: '10px', height: 'max-content' }}>
                  <Info size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>Annual Sports Meet Info</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Registration for track and field events closes by Monday next week.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ padding: '8px', background: 'var(--yellow-light)', color: 'var(--yellow-main)', borderRadius: '10px', height: 'max-content' }}>
                  <Info size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>Summer Camp Registrations</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Weekly science exploration workshops starting from July 1st.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {isPayModalOpen && (
        <div className="parent-modal-backdrop">
          <div className="parent-modal-container">
            <div className="parent-modal-header">
              <h3>Secure School Fee Payment</h3>
              <button className="parent-modal-close" onClick={() => setIsPayModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {paymentStep === 1 && (
              <form onSubmit={handleProcessPayment}>
                {paymentError && (
                  <div className="parent-alert-error">
                    <AlertCircle size={16} /> {paymentError}
                  </div>
                )}
                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#475569', marginBottom: '6px' }}>
                    <span>Category:</span>
                    <strong style={{ textTransform: 'capitalize' }}>{selectedFee} Fee</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: '#0F172A', fontWeight: 'bold' }}>
                    <span>Amount Due:</span>
                    <span>${selectedFee === 'transport' ? '1,200' : '400'}</span>
                  </div>
                </div>

                <div className="parent-form-group">
                  <label>Cardholder Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Robert Chen" 
                    value={billingDetails.cardName}
                    onChange={e => setBillingDetails({ ...billingDetails, cardName: e.target.value })}
                    required
                  />
                </div>

                <div className="parent-form-group">
                  <label>Card Number</label>
                  <input 
                    type="text" 
                    maxLength="19"
                    placeholder="1234 5678 1234 5678" 
                    value={billingDetails.cardNumber}
                    onChange={e => {
                      // format card number with spaces
                      const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                      setBillingDetails({ ...billingDetails, cardNumber: val });
                    }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="parent-form-group">
                    <label>Expiry Date</label>
                    <input 
                      type="text" 
                      placeholder="MM/YY" 
                      maxLength="5"
                      value={billingDetails.cardExpiry}
                      onChange={e => {
                        let val = e.target.value;
                        if (val.length === 2 && !val.includes('/')) {
                          val = val + '/';
                        }
                        setBillingDetails({ ...billingDetails, cardExpiry: val });
                      }}
                      required
                    />
                  </div>
                  <div className="parent-form-group">
                    <label>CVV</label>
                    <input 
                      type="password" 
                      placeholder="•••" 
                      maxLength="3"
                      value={billingDetails.cardCvv}
                      onChange={e => setBillingDetails({ ...billingDetails, cardCvv: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '12px', padding: '12px' }}>
                  <CreditCard size={18} /> Authorize Payment
                </button>
              </form>
            )}

            {paymentStep === 2 && (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: '48px', height: '48px', border: '4px solid #F1F5F9', borderTop: '4px solid var(--blue-main)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px auto' }}></div>
                <h4 style={{ fontWeight: 600, color: '#0F172A', marginBottom: '8px' }}>Processing Transaction</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Connecting securely to payment gateway...</p>
              </div>
            )}

            {paymentStep === 3 && (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <div style={{ width: '56px', height: '56px', background: 'var(--green-light)', color: 'var(--green-main)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifycontent: 'center', margin: '0 auto 20px auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <CheckCircle size={32} />
                </div>
                <h4 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>Payment Successful!</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>Your transaction has been processed. A receipt has been sent to your email.</p>
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setIsPayModalOpen(false)}>
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
