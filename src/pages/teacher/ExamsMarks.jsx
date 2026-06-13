import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  Users, 
  Eye, 
  X, 
  Sparkles,
  Award,
  CheckCircle,
  FileText,
  AlertCircle,
  TrendingUp,
  Percent
} from 'lucide-react';

const INITIAL_EXAMS = [
  {
    id: 'EXM-101',
    title: 'Quadratic Equations Unit Test',
    class: '10-A',
    subject: 'Mathematics',
    date: '2026-04-15',
    maxMarks: 50,
    status: 'Published',
    grades: {
      'STU-2023-001': 45,
      'STU-2023-118': 48,
      'STU-2023-201': 38,
      'STU-2023-227': 42
    }
  },
  {
    id: 'EXM-102',
    title: 'Algebra Mid-Term',
    class: '10-C',
    subject: 'Advanced Algebra',
    date: '2026-04-13',
    maxMarks: 100,
    status: 'Awaiting Marks',
    grades: {}
  },
  {
    id: 'EXM-103',
    title: 'Statistics Final Exam',
    class: '10-D',
    subject: 'Statistics',
    date: '2026-04-18',
    maxMarks: 100,
    status: 'Scheduled',
    grades: {}
  },
  {
    id: 'EXM-104',
    title: 'Trigonometry Quiz 2',
    class: '10-B',
    subject: 'Mathematics',
    date: '2026-04-10',
    maxMarks: 25,
    status: 'Scheduled',
    grades: {}
  }
];

const DEFAULT_STUDENTS = [
  { id: 'STU-2023-001', name: 'Emma Watson', class: '10-A', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267041' },
  { id: 'STU-2023-118', name: 'Sophia Chen', class: '10-A', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267043' },
  { id: 'STU-2023-201', name: 'Ethan Nguyen', class: '10-A', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267046' },
  { id: 'STU-2023-227', name: 'Aarohi Patel', class: '10-A', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267047' },
  { id: 'STU-2023-042', name: 'Marcus Johnson', class: '10-B', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267042' },
  { id: 'STU-2023-089', name: 'Olivia Smith', class: '10-B', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267045' },
  { id: 'STU-2023-055', name: 'Lucas Garcia', class: '10-C', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267044' },
  { id: 'STU-2023-060', name: 'Jack Miller', class: '10-C', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267048' },
  { id: 'STU-2023-070', name: 'Mia Davis', class: '10-D', avatar: 'https://i.pravatar.cc/150?u=a042581f4e290267049' }
];

export default function ExamsMarks() {
  const [exams, setExams] = useState([]);
  const [studentsList, setStudentsList] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('MOCK_STUDENTS');
    if (stored) {
      setStudentsList(JSON.parse(stored));
    } else {
      setStudentsList(DEFAULT_STUDENTS);
    }
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [toastMessage, setToastMessage] = useState(null);

  // Modals state
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isGradingModalOpen, setIsGradingModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  // Form states for scheduling exam
  const [newTitle, setNewTitle] = useState('');
  const [newClass, setNewClass] = useState('10-A');
  const [newSubject, setNewSubject] = useState('Mathematics');
  const [newDate, setNewDate] = useState('');
  const [newMaxMarks, setNewMaxMarks] = useState(100);

  // Grading states inside modal
  const [gradingScores, setGradingScores] = useState({}); // studentId -> score

  // Load data
  useEffect(() => {
    const stored = localStorage.getItem('TEACHER_EXAMS');
    if (stored) {
      setExams(JSON.parse(stored));
    } else {
      setExams(INITIAL_EXAMS);
      localStorage.setItem('TEACHER_EXAMS', JSON.stringify(INITIAL_EXAMS));
    }
  }, []);

  // Save utility
  const saveExams = (updated) => {
    setExams(updated);
    localStorage.setItem('TEACHER_EXAMS', JSON.stringify(updated));
  };

  // Toast helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Dynamic statistics calculations
  const stats = useMemo(() => {
    let totalExams = exams.length;
    let awaitingGrading = exams.filter(e => e.status === 'Awaiting Marks' || e.status === 'Scheduled').length;
    
    // Overall average of all published exam scores
    let totalScoreSum = 0;
    let totalMaxSum = 0;
    let publishedCount = 0;

    exams.forEach(ex => {
      if (ex.status === 'Published' && ex.grades && Object.keys(ex.grades).length > 0) {
        publishedCount++;
        let examScoreSum = 0;
        let examGrades = Object.values(ex.grades);
        examGrades.forEach(score => {
          examScoreSum += score;
        });
        let examAvg = examScoreSum / examGrades.length;
        // Normalize average to percentage
        let examAvgPct = (examAvg / ex.maxMarks) * 100;
        totalScoreSum += examAvgPct;
      }
    });

    let overallAvg = publishedCount > 0 ? Math.round(totalScoreSum / publishedCount) : 0;

    return {
      totalExams,
      awaitingGrading,
      overallAvg
    };
  }, [exams]);

  // Handle schedule exam submit
  const handleScheduleExam = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDate) {
      alert('Please fill out the Exam Title and Date.');
      return;
    }

    const newExm = {
      id: `EXM-${Date.now().toString().slice(-3)}`,
      title: newTitle,
      class: newClass,
      subject: newSubject,
      date: newDate,
      maxMarks: parseInt(newMaxMarks) || 100,
      status: 'Scheduled',
      grades: {}
    };

    const updated = [newExm, ...exams];
    saveExams(updated);
    setIsScheduleModalOpen(false);
    showToast(`Exam "${newTitle}" scheduled successfully!`);

    // Reset fields
    setNewTitle('');
    setNewClass('10-A');
    setNewSubject('Mathematics');
    setNewDate('');
    setNewMaxMarks(100);
  };

  // Open grading modal
  const openGradingModal = (exm) => {
    setSelectedExam(exm);
    
    // Pre-populate with existing grades
    const scores = {};
    if (exm.grades) {
      Object.keys(exm.grades).forEach(stuId => {
        scores[stuId] = exm.grades[stuId];
      });
    }
    setGradingScores(scores);
    setIsGradingModalOpen(true);
  };

  // Submit marks handler
  const handleSaveMarks = (publish = false) => {
    const updated = exams.map(ex => {
      if (ex.id === selectedExam.id) {
        const grades = {};
        
        // Find students in this class
        const classStudents = DEFAULT_STUDENTS.filter(s => s.class === ex.class);
        
        classStudents.forEach(stu => {
          if (gradingScores[stu.id] !== undefined && gradingScores[stu.id] !== '') {
            grades[stu.id] = parseInt(gradingScores[stu.id]);
          }
        });

        let newStatus = ex.status;
        if (publish) {
          newStatus = 'Published';
        } else {
          newStatus = 'Awaiting Marks';
        }

        return {
          ...ex,
          grades,
          status: newStatus
        };
      }
      return ex;
    });

    saveExams(updated);
    setIsGradingModalOpen(false);
    showToast(publish ? 'Exam marks published successfully!' : 'Marks drafts saved successfully!');
  };

  // Filtered list
  const filteredExams = useMemo(() => {
    return exams.filter(exm => {
      const matchesSearch = exm.title.toLowerCase().includes(searchQuery.toLowerCase()) || exm.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesClass = classFilter === 'All Classes' || exm.class === classFilter;
      const matchesStatus = statusFilter === 'All Status' || exm.status === statusFilter;
      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [exams, searchQuery, classFilter, statusFilter]);

  // Format date readable
  const formatDateReadable = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Get student list for selected exam class
  const currentClassStudents = useMemo(() => {
    if (!selectedExam) return [];
    const filtered = studentsList.map(s => {
      const normalizedClass = s.grade ? s.grade.replace('Grade ', '').replace(/\s+/g, '') : '10-A';
      return {
        id: s.id,
        name: s.name,
        class: normalizedClass,
        avatar: s.avatar || `https://i.pravatar.cc/150?u=${s.id}`
      };
    }).filter(s => {
      const normStudentClass = s.class.toLowerCase();
      const normTargetClass = selectedExam.class.toLowerCase().replace('class', '').replace(/\s+/g, '');
      return normStudentClass === normTargetClass || normStudentClass.includes(normTargetClass) || normTargetClass.includes(normStudentClass);
    });

    if (filtered.length === 0) {
      return Array.from({ length: 5 }).map((_, i) => ({
        id: `STU-GEN-${selectedExam.class}-${i}`,
        name: `Student ${i + 1}`,
        class: selectedExam.class,
        avatar: `https://i.pravatar.cc/150?u=gen-exam-${selectedExam.class}-${i}`
      }));
    }
    return filtered;
  }, [selectedExam, studentsList]);

  // Real-time calculations inside the modal
  const liveStats = useMemo(() => {
    if (!selectedExam) return { avg: 0, highest: 0, passRate: 0, totalGraded: 0 };
    
    const scoresArray = Object.values(gradingScores)
      .map(s => parseInt(s))
      .filter(s => !isNaN(s));

    if (scoresArray.length === 0) return { avg: 0, highest: 0, passRate: 0, totalGraded: 0 };

    const totalGraded = scoresArray.length;
    const sum = scoresArray.reduce((a, b) => a + b, 0);
    const avg = Math.round((sum / totalGraded) * 10) / 10;
    const highest = Math.max(...scoresArray);

    // Pass threshold is 40% of maxMarks
    const passThreshold = selectedExam.maxMarks * 0.4;
    const passedCount = scoresArray.filter(s => s >= passThreshold).length;
    const passRate = Math.round((passedCount / totalGraded) * 100);

    return {
      avg,
      highest,
      passRate,
      totalGraded
    };
  }, [gradingScores, selectedExam]);

  return (
    <div className="teacher-exams-container">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="custom-toast">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header-flex">
        <div className="page-title-group">
          <h1>Exams & Marks</h1>
        </div>
        <button className="new-class-btn" onClick={() => setIsScheduleModalOpen(true)}>
          <Plus size={18} /> Schedule Exam
        </button>
      </div>

      {/* Stats Cards */}
      <div className="exams-stats-grid">
        <div className="exm-stat-card">
          <div className="stat-card-left">
            <div className="stat-card-icon-wrapper purple-bg">
              <FileText size={22} color="#8B5CF6" />
            </div>
            <div className="stat-card-content">
              <h2>{stats.totalExams}</h2>
              <p>Total Scheduled Exams</p>
            </div>
          </div>
        </div>

        <div className="exm-stat-card">
          <div className="stat-card-left">
            <div className="stat-card-icon-wrapper orange-bg">
              <AlertCircle size={22} color="#F59E0B" />
            </div>
            <div className="stat-card-content">
              <h2>{stats.awaitingGrading}</h2>
              <p>Awaiting Marks</p>
            </div>
          </div>
        </div>

        <div className="exm-stat-card">
          <div className="stat-card-left">
            <div className="stat-card-icon-wrapper green-bg">
              <TrendingUp size={22} color="#10B981" />
            </div>
            <div className="stat-card-content">
              <h2>{stats.overallAvg}%</h2>
              <p>Overall Class Average</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="assignments-controls-bar">
        <div className="assignments-search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by title or subject..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="assignments-filters-wrapper">
          <div className="filter-dropdown-container">
            <Filter size={16} className="filter-icon" />
            <select 
              value={classFilter} 
              onChange={(e) => setClassFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All Classes">All Classes</option>
              <option value="10-A">10-A</option>
              <option value="10-B">10-B</option>
              <option value="10-C">10-C</option>
              <option value="10-D">10-D</option>
            </select>
          </div>

          <div className="filter-dropdown-container">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All Status">All Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Awaiting Marks">Awaiting Marks</option>
              <option value="Published">Published</option>
            </select>
          </div>
        </div>
      </div>

      {/* Exams Table */}
      <div className="assignments-table-container-card">
        <table className="assignments-data-table">
          <thead>
            <tr>
              <th>EXAM TITLE</th>
              <th>SUBJECT</th>
              <th>CLASS</th>
              <th>DATE</th>
              <th>MAX MARKS</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredExams.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data-cell">
                  <AlertCircle size={24} className="no-data-icon" />
                  <p>No exams found matching your search filters.</p>
                </td>
              </tr>
            ) : (
              filteredExams.map((exm) => {
                return (
                  <tr key={exm.id}>
                    <td>
                      <span className="asn-title" style={{ fontWeight: 600, fontSize: '15px' }}>{exm.title}</span>
                    </td>
                    <td>
                      <span className="text-muted" style={{ fontWeight: 500 }}>{exm.subject}</span>
                    </td>
                    <td>
                      <span className="class-badge-purple">{exm.class}</span>
                    </td>
                    <td>
                      <div className="date-cell">
                        <Calendar size={14} />
                        <span>{formatDateReadable(exm.date)}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600 }}>{exm.maxMarks}</span>
                    </td>
                    <td>
                      <span className={`status-pill badge-${exm.status.toLowerCase().replace(' ', '-')}`}>
                        {exm.status}
                      </span>
                    </td>
                    <td>
                      <div className="actions-cell-wrapper">
                        {exm.status === 'Published' ? (
                          <button 
                            className="action-btn-view"
                            onClick={() => openGradingModal(exm)}
                            title="View Marks"
                          >
                            <Eye size={14} /> View
                          </button>
                        ) : (
                          <button 
                            className="action-btn-grade"
                            onClick={() => openGradingModal(exm)}
                            title="Enter Marks"
                          >
                            <Award size={14} /> Enter Marks
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Floating AI Assistant FAB */}
      <button className="ai-assistant-fab fab-dashboard">
        <Sparkles size={18} /> AI Assistant
      </button>

      {/* Schedule Exam Modal */}
      {isScheduleModalOpen && (
        <div className="modal-overlay-custom">
          <div className="modal-content-card">
            <div className="modal-header-custom">
              <h3>Schedule New Exam</h3>
              <button className="modal-close-btn" onClick={() => setIsScheduleModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleScheduleExam} className="modal-form">
              <div className="form-group-custom">
                <label>Exam Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Algebra Mid-Term" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-row-custom">
                <div className="form-group-custom flex-1">
                  <label>Subject</label>
                  <select value={newSubject} onChange={(e) => setNewSubject(e.target.value)}>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Advanced Algebra">Advanced Algebra</option>
                    <option value="Statistics">Statistics</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                  </select>
                </div>

                <div className="form-group-custom flex-1">
                  <label>Class</label>
                  <select value={newClass} onChange={(e) => setNewClass(e.target.value)}>
                    <option value="10-A">10-A</option>
                    <option value="10-B">10-B</option>
                    <option value="10-C">10-C</option>
                    <option value="10-D">10-D</option>
                  </select>
                </div>
              </div>

              <div className="form-row-custom">
                <div className="form-group-custom flex-1">
                  <label>Exam Date</label>
                  <input 
                    type="date" 
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group-custom flex-1">
                  <label>Max Marks</label>
                  <input 
                    type="number" 
                    value={newMaxMarks}
                    onChange={(e) => setNewMaxMarks(e.target.value)}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="modal-footer-custom">
                <button type="button" className="btn-cancel" onClick={() => setIsScheduleModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enter Marks / Grading Workspace Modal */}
      {isGradingModalOpen && selectedExam && (
        <div className="modal-overlay-custom">
          <div className="modal-content-card modal-large">
            <div className="modal-header-custom">
              <div className="modal-header-title-wrapper">
                <h3>Marks Workspace</h3>
                <span className="modal-subtitle">{selectedExam.title} ({selectedExam.class}) &bull; Subject: {selectedExam.subject}</span>
              </div>
              <button className="modal-close-btn" onClick={() => setIsGradingModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="grading-modal-body">
              {/* Live Statistics Panel inside Modal */}
              <div className="exam-analytics-dashboard-row">
                <div className="live-metric-card">
                  <div className="live-metric-title">Pass Percentage</div>
                  <div className="live-metric-val-row">
                    <span className="live-metric-value">{liveStats.passRate}%</span>
                    <Percent size={18} className="live-metric-icon" color="#10B981" />
                  </div>
                  <div className="live-metric-subtext">Pass threshold: {selectedExam.maxMarks * 0.4} marks</div>
                </div>

                <div className="live-metric-card">
                  <div className="live-metric-title">Class Average</div>
                  <div className="live-metric-val-row">
                    <span className="live-metric-value">{liveStats.avg} <span className="max-limit">/ {selectedExam.maxMarks}</span></span>
                    <TrendingUp size={18} className="live-metric-icon" color="#8B5CF6" />
                  </div>
                  <div className="live-metric-subtext">Graded {liveStats.totalGraded} of {currentClassStudents.length} students</div>
                </div>

                <div className="live-metric-card">
                  <div className="live-metric-title">Highest Score</div>
                  <div className="live-metric-val-row">
                    <span className="live-metric-value">{liveStats.highest === -Infinity ? '--' : liveStats.highest} <span className="max-limit">/ {selectedExam.maxMarks}</span></span>
                    <Award size={18} className="live-metric-icon" color="#F59E0B" />
                  </div>
                  <div className="live-metric-subtext">Top performer score</div>
                </div>
              </div>

              {/* Student Grading List */}
              <div className="students-grading-list-wrapper">
                <h4>Class Student Marks List</h4>
                <div className="students-grading-scrollable">
                  <table className="grading-table-custom">
                    <thead>
                      <tr>
                        <th>STUDENT</th>
                        <th>MARKS OBTAINED</th>
                        <th>PERCENTAGE</th>
                        <th>GRADE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentClassStudents.map(student => {
                        const marksValue = gradingScores[student.id] || '';
                        const parsedValue = parseInt(marksValue);
                        const isGraded = !isNaN(parsedValue);
                        const percentage = isGraded ? Math.round((parsedValue / selectedExam.maxMarks) * 100) : null;
                        
                        let letterGrade = '--';
                        if (isGraded) {
                          if (percentage >= 90) letterGrade = 'A+';
                          else if (percentage >= 80) letterGrade = 'A';
                          else if (percentage >= 70) letterGrade = 'B';
                          else if (percentage >= 60) letterGrade = 'C';
                          else if (percentage >= 40) letterGrade = 'D';
                          else letterGrade = 'F';
                        }

                        return (
                          <tr key={student.id}>
                            <td>
                              <div className="student-cell-info">
                                <img src={student.avatar} alt={student.name} className="student-avatar" />
                                <div className="student-names">
                                  <span className="student-name">{student.name}</span>
                                  <span className="student-id">{student.id}</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="marks-input-cell-wrapper">
                                <input 
                                  type="number" 
                                  className="grade-score-input"
                                  placeholder="--"
                                  min="0"
                                  max={selectedExam.maxMarks}
                                  value={marksValue}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    if (val !== '' && parseInt(val) > selectedExam.maxMarks) {
                                      alert(`Marks cannot exceed maximum marks (${selectedExam.maxMarks}).`);
                                      return;
                                    }
                                    setGradingScores({
                                      ...gradingScores,
                                      [student.id]: val
                                    });
                                  }}
                                  disabled={selectedExam.status === 'Published'}
                                />
                                <span className="max-score-hint">/ {selectedExam.maxMarks}</span>
                              </div>
                            </td>
                            <td>
                              <span style={{ fontWeight: 600 }}>{isGraded ? `${percentage}%` : '--'}</span>
                            </td>
                            <td>
                              <span className={`status-pill badge-${letterGrade.startsWith('F') ? 'needs-grading' : letterGrade !== '--' ? 'active' : 'completed'}`} style={{ minWidth: '40px' }}>
                                {letterGrade}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="modal-footer-custom">
              <button className="btn-cancel" onClick={() => setIsGradingModalOpen(false)}>
                Close
              </button>
              {selectedExam.status !== 'Published' && (
                <div className="footer-actions-right">
                  <button className="btn-save" onClick={() => handleSaveMarks(false)}>
                    Save Draft
                  </button>
                  <button className="btn-submit" onClick={() => handleSaveMarks(true)}>
                    Publish Marks
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
