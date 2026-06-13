import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  Paperclip, 
  Users, 
  Eye, 
  X, 
  DownloadCloud, 
  Sparkles,
  BookOpen,
  CheckSquare,
  CheckCircle,
  FileText,
  AlertCircle
} from 'lucide-react';

const INITIAL_ASSIGNMENTS = [
  {
    id: 'ASN-001',
    title: 'Quadratic Equations Practice set',
    filesCount: 2,
    class: '10-A',
    dueDate: '2026-04-15',
    submittedCount: 28,
    totalCount: 30,
    status: 'Active',
    isGroupProject: false,
    description: 'Solve the equations on page 42. Show all your steps clearly.',
    grades: {} // Maps studentId to grade/score
  },
  {
    id: 'ASN-002',
    title: 'Algebraic Expressions',
    filesCount: 1,
    class: '10-C',
    dueDate: '2026-04-13',
    submittedCount: 30,
    totalCount: 30,
    status: 'Needs Grading',
    isGroupProject: false,
    description: 'Worksheet on simplifying expressions and finding variables.',
    grades: {}
  },
  {
    id: 'ASN-003',
    title: 'Statistics chapter 4 problems',
    filesCount: 3,
    class: '10-D',
    dueDate: '2026-04-18',
    submittedCount: 25,
    totalCount: 25,
    status: 'Completed',
    isGroupProject: false,
    description: 'Calculate mean, median, and mode for the given dataset.',
    grades: {
      'STU-2023-055': { score: 85, comment: 'Good work' }
    }
  },
  {
    id: 'ASN-004',
    title: 'Trigonometry Introduction Quiz',
    filesCount: 1,
    class: '10-B',
    dueDate: '2026-04-10',
    submittedCount: 12,
    totalCount: 24,
    status: 'Active',
    isGroupProject: false,
    description: 'Online quiz introduction to sine, cosine and tangent ratios.',
    grades: {}
  },
  {
    id: 'ASN-005',
    title: 'Coordinate Geometry Final Project',
    filesCount: 0,
    class: '10-A',
    dueDate: '2026-04-25',
    submittedCount: 6,
    totalCount: 8,
    status: 'Active',
    isGroupProject: true,
    description: 'Group project mapping coordinates of local landmarks.',
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

export default function TeacherAssignment() {
  const [assignments, setAssignments] = useState([]);
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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isGradingModalOpen, setIsGradingModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Form states for creating assignment
  const [newTitle, setNewTitle] = useState('');
  const [newClass, setNewClass] = useState('10-A');
  const [newDueDate, setNewDueDate] = useState('');
  const [newTotalCount, setNewTotalCount] = useState(30);
  const [newIsGroup, setNewIsGroup] = useState(false);
  const [newFilesCount, setNewFilesCount] = useState(1);
  const [newDescription, setNewDescription] = useState('');

  // Grading state inside modal
  const [gradingScores, setGradingScores] = useState({}); // studentId -> score
  const [gradingComments, setGradingComments] = useState({}); // studentId -> comment

  // Load data
  useEffect(() => {
    const stored = localStorage.getItem('TEACHER_ASSIGNMENTS');
    if (stored) {
      setAssignments(JSON.parse(stored));
    } else {
      setAssignments(INITIAL_ASSIGNMENTS);
      localStorage.setItem('TEACHER_ASSIGNMENTS', JSON.stringify(INITIAL_ASSIGNMENTS));
    }
  }, []);

  // Save utility
  const saveAssignments = (updated) => {
    setAssignments(updated);
    localStorage.setItem('TEACHER_ASSIGNMENTS', JSON.stringify(updated));
  };

  // Toast helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Stats calculation
  const stats = useMemo(() => {
    return assignments.reduce((acc, a) => {
      if (a.status === 'Active') acc.active++;
      else if (a.status === 'Needs Grading') acc.needsGrading++;
      else if (a.status === 'Completed') acc.completed++;
      return acc;
    }, { active: 0, needsGrading: 0, completed: 0 });
  }, [assignments]);

  // Handle file download action
  const handleDownload = (assignmentTitle) => {
    showToast(`Downloading submissions for "${assignmentTitle}"...`);
  };

  // Create assignment handler
  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDueDate) {
      alert('Please fill out the Assignment Title and Due Date.');
      return;
    }

    const newAsn = {
      id: `ASN-${Date.now().toString().slice(-3)}`,
      title: newTitle,
      filesCount: newIsGroup ? 0 : parseInt(newFilesCount) || 0,
      class: newClass,
      dueDate: newDueDate,
      submittedCount: 0,
      totalCount: parseInt(newTotalCount) || 30,
      status: 'Active',
      isGroupProject: newIsGroup,
      description: newDescription,
      grades: {}
    };

    const updated = [newAsn, ...assignments];
    saveAssignments(updated);
    setIsCreateModalOpen(false);
    showToast(`Assignment "${newTitle}" created successfully!`);

    // Reset fields
    setNewTitle('');
    setNewClass('10-A');
    setNewDueDate('');
    setNewTotalCount(30);
    setNewIsGroup(false);
    setNewFilesCount(1);
    setNewDescription('');
  };

  // Open grading modal
  const openGradingModal = (asn) => {
    setSelectedAssignment(asn);
    
    // Pre-populate with existing grades
    const scores = {};
    const comments = {};
    if (asn.grades) {
      Object.keys(asn.grades).forEach(stuId => {
        scores[stuId] = asn.grades[stuId].score || '';
        comments[stuId] = asn.grades[stuId].comment || '';
      });
    }
    setGradingScores(scores);
    setGradingComments(comments);
    setIsGradingModalOpen(true);
  };

  // Submit grades handler
  const handleSaveGrades = (submitAll = false) => {
    const updated = assignments.map(asn => {
      if (asn.id === selectedAssignment.id) {
        const grades = { ...asn.grades };
        
        // Find students in this class
        const classStudents = DEFAULT_STUDENTS.filter(s => s.class === asn.class);
        
        classStudents.forEach(stu => {
          if (gradingScores[stu.id] !== undefined && gradingScores[stu.id] !== '') {
            grades[stu.id] = {
              score: parseInt(gradingScores[stu.id]),
              comment: gradingComments[stu.id] || ''
            };
          }
        });

        // Determine if they graded everyone
        const totalGraded = Object.keys(grades).length;
        const allSubmitted = asn.submittedCount;
        
        let newStatus = asn.status;
        if (submitAll) {
          newStatus = 'Completed';
        } else if (totalGraded > 0) {
          // If some are graded but not explicitly completed
          newStatus = 'Needs Grading';
        }

        return {
          ...asn,
          grades,
          status: newStatus
        };
      }
      return asn;
    });

    saveAssignments(updated);
    setIsGradingModalOpen(false);
    showToast(submitAll ? 'Grades finalized & assignment completed!' : 'Grades saved successfully!');
  };

  // Filtered list
  const filteredAssignments = useMemo(() => {
    return assignments.filter(asn => {
      const matchesSearch = asn.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesClass = classFilter === 'All Classes' || asn.class === classFilter;
      const matchesStatus = statusFilter === 'All Status' || asn.status === statusFilter;
      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [assignments, searchQuery, classFilter, statusFilter]);

  // Check if date is red (past due or today)
  const isPastOrNearDue = (dateStr) => {
    const due = new Date(dateStr);
    const today = new Date();
    // Normalize times
    due.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    return due <= today;
  };

  // Format date readable
  const formatDateReadable = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Get student list for selected assignment class
  const currentClassStudents = useMemo(() => {
    if (!selectedAssignment) return [];
    // Filter by assignment class
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
      const normTargetClass = selectedAssignment.class.toLowerCase().replace('class', '').replace(/\s+/g, '');
      return normStudentClass === normTargetClass || normStudentClass.includes(normTargetClass) || normTargetClass.includes(normStudentClass);
    });

    if (filtered.length === 0) {
      return Array.from({ length: 5 }).map((_, i) => ({
        id: `STU-GEN-${selectedAssignment.class}-${i}`,
        name: `Student ${i + 1} (${selectedAssignment.class})`,
        class: selectedAssignment.class,
        avatar: `https://i.pravatar.cc/150?u=gen-${selectedAssignment.class}-${i}`
      }));
    }
    return filtered;
  }, [selectedAssignment, studentsList]);

  return (
    <div className="teacher-assignments-container">
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
          <h1>Assignments</h1>
        </div>
        <button className="new-class-btn" onClick={() => setIsCreateModalOpen(true)}>
          <Plus size={18} /> Create Assignment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="assignments-stats-grid">
        <div className="asn-stat-card">
          <div className="stat-card-left">
            <div className="stat-card-icon-wrapper purple-bg">
              <BookOpen size={22} color="#8B5CF6" />
            </div>
            <div className="stat-card-content">
              <h2>{stats.active}</h2>
              <p>Active Assignments</p>
            </div>
          </div>
        </div>

        <div className="asn-stat-card">
          <div className="stat-card-left">
            <div className="stat-card-icon-wrapper orange-bg">
              <CheckSquare size={22} color="#F59E0B" />
            </div>
            <div className="stat-card-content">
              <h2>{stats.needsGrading}</h2>
              <p>Needs Grading</p>
            </div>
          </div>
        </div>

        <div className="asn-stat-card">
          <div className="stat-card-left">
            <div className="stat-card-icon-wrapper green-bg">
              <CheckCircle size={22} color="#10B981" />
            </div>
            <div className="stat-card-content">
              <h2>{stats.completed}</h2>
              <p>Completed</p>
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
            placeholder="Search assignments..." 
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
              <option value="Active">Active</option>
              <option value="Needs Grading">Needs Grading</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Assignments Table */}
      <div className="assignments-table-container-card">
        <table className="assignments-data-table">
          <thead>
            <tr>
              <th>ASSIGNMENT TITLE</th>
              <th>CLASS</th>
              <th>DUE DATE</th>
              <th>SUBMISSIONS</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data-cell">
                  <AlertCircle size={24} className="no-data-icon" />
                  <p>No assignments found matching your search filters.</p>
                </td>
              </tr>
            ) : (
              filteredAssignments.map((asn) => {
                const submissionPercent = asn.totalCount > 0 
                  ? Math.round((asn.submittedCount / asn.totalCount) * 100) 
                  : 0;

                const redDate = isPastOrNearDue(asn.dueDate) && asn.status !== 'Completed';

                return (
                  <tr key={asn.id}>
                    <td>
                      <div className="assignment-title-cell">
                        <span className="asn-title">{asn.title}</span>
                        {asn.isGroupProject ? (
                          <span className="asn-sub-info text-muted">
                            <Users size={12} className="inline-icon" /> Group Project
                          </span>
                        ) : (
                          <span className="asn-sub-info text-muted">
                            <Paperclip size={12} className="inline-icon" /> {asn.filesCount} File{asn.filesCount !== 1 ? 's' : ''} attached
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="class-badge-purple">{asn.class}</span>
                    </td>
                    <td>
                      <div className={`date-cell ${redDate ? 'date-red' : ''}`}>
                        <Calendar size={14} />
                        <span>{formatDateReadable(asn.dueDate)}</span>
                      </div>
                    </td>
                    <td>
                      <div className="submissions-cell-wrapper">
                        <div className="submissions-info-row">
                          <span className="submissions-count">
                            {asn.submittedCount} / {asn.totalCount} {asn.isGroupProject ? 'Groups' : 'Submitted'}
                          </span>
                          <span className="submissions-pct">{submissionPercent}%</span>
                        </div>
                        <div className="submissions-bar-track">
                          <div 
                            className="submissions-bar-fill" 
                            style={{ width: `${submissionPercent}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`status-pill badge-${asn.status.toLowerCase().replace(' ', '-')}`}>
                        {asn.status}
                      </span>
                    </td>
                    <td>
                      <div className="actions-cell-wrapper">
                        {asn.status === 'Completed' ? (
                          <button 
                            className="action-btn-view"
                            onClick={() => openGradingModal(asn)}
                            title="View Grades"
                          >
                            <Eye size={14} /> View
                          </button>
                        ) : (
                          <button 
                            className="action-btn-grade"
                            onClick={() => openGradingModal(asn)}
                            title="Grade Submissions"
                          >
                            <FileText size={14} /> Grade
                          </button>
                        )}
                        <button 
                          className="action-btn-download"
                          onClick={() => handleDownload(asn.title)}
                          title="Download Submissions"
                        >
                          <DownloadCloud size={16} />
                        </button>
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

      {/* Create Assignment Modal */}
      {isCreateModalOpen && (
        <div className="modal-overlay-custom">
          <div className="modal-content-card">
            <div className="modal-header-custom">
              <h3>Create New Assignment</h3>
              <button className="modal-close-btn" onClick={() => setIsCreateModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateAssignment} className="modal-form">
              <div className="form-group-custom">
                <label>Assignment Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Quadratic Equations Practice set" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-row-custom">
                <div className="form-group-custom flex-1">
                  <label>Class</label>
                  <select value={newClass} onChange={(e) => setNewClass(e.target.value)}>
                    <option value="10-A">10-A</option>
                    <option value="10-B">10-B</option>
                    <option value="10-C">10-C</option>
                    <option value="10-D">10-D</option>
                  </select>
                </div>

                <div className="form-group-custom flex-1">
                  <label>Due Date</label>
                  <input 
                    type="date" 
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row-custom">
                <div className="form-group-custom flex-1">
                  <label>Total Students/Groups</label>
                  <input 
                    type="number" 
                    value={newTotalCount}
                    onChange={(e) => setNewTotalCount(e.target.value)}
                    min="1"
                    required
                  />
                </div>

                <div className="form-group-custom flex-1">
                  <label>Files Attached</label>
                  <input 
                    type="number" 
                    value={newFilesCount}
                    onChange={(e) => setNewFilesCount(e.target.value)}
                    disabled={newIsGroup}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group-custom checkbox-group-custom">
                <input 
                  type="checkbox" 
                  id="isGroup"
                  checked={newIsGroup}
                  onChange={(e) => setNewIsGroup(e.target.checked)}
                />
                <label htmlFor="isGroup">This is a Group Project</label>
              </div>

              <div className="form-group-custom">
                <label>Description / Instructions</label>
                <textarea 
                  rows="3" 
                  placeholder="Enter instructions for the students..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="modal-footer-custom">
                <button type="button" className="btn-cancel" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grading Modal */}
      {isGradingModalOpen && selectedAssignment && (
        <div className="modal-overlay-custom">
          <div className="modal-content-card modal-large">
            <div className="modal-header-custom">
              <div className="modal-header-title-wrapper">
                <h3>Grading Dashboard</h3>
                <span className="modal-subtitle">{selectedAssignment.title} ({selectedAssignment.class})</span>
              </div>
              <button className="modal-close-btn" onClick={() => setIsGradingModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="grading-modal-body">
              <div className="assignment-details-summary">
                <p><strong>Instructions:</strong> {selectedAssignment.description || 'No instructions provided.'}</p>
                <div className="details-badges-row">
                  <span className="badge-item">Due: {formatDateReadable(selectedAssignment.dueDate)}</span>
                  <span className="badge-item">Submissions: {selectedAssignment.submittedCount} / {selectedAssignment.totalCount}</span>
                  <span className="badge-item">Status: {selectedAssignment.status}</span>
                </div>
              </div>

              <div className="students-grading-list-wrapper">
                <h4>Submissions List ({currentClassStudents.length} Students)</h4>
                <div className="students-grading-scrollable">
                  <table className="grading-table-custom">
                    <thead>
                      <tr>
                        <th>STUDENT</th>
                        <th>STATUS</th>
                        <th>SCORE (MAX 100)</th>
                        <th>FEEDBACK COMMENT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentClassStudents.map(student => {
                        // Deterministic submission logic
                        const hasSubmitted = selectedAssignment.isGroupProject 
                          ? true // mock group projects as submitted
                          : (student.name.length % 2 === 0 || selectedAssignment.status === 'Completed');
                        
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
                              {hasSubmitted ? (
                                <span className="submission-status-badge submitted">Submitted</span>
                              ) : (
                                <span className="submission-status-badge pending">Pending</span>
                              )}
                            </td>
                            <td>
                              <input 
                                type="number" 
                                className="grade-score-input"
                                placeholder="--"
                                min="0"
                                max="100"
                                value={gradingScores[student.id] || ''}
                                onChange={(e) => setGradingScores({
                                  ...gradingScores,
                                  [student.id]: e.target.value
                                })}
                                disabled={!hasSubmitted}
                              />
                            </td>
                            <td>
                              <input 
                                type="text" 
                                className="grade-comment-input"
                                placeholder="Add comments..."
                                value={gradingComments[student.id] || ''}
                                onChange={(e) => setGradingComments({
                                  ...gradingComments,
                                  [student.id]: e.target.value
                                })}
                                disabled={!hasSubmitted}
                              />
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
              <div className="footer-actions-right">
                <button className="btn-save" onClick={() => handleSaveGrades(false)}>
                  Save Progress
                </button>
                {selectedAssignment.status !== 'Completed' && (
                  <button className="btn-submit" onClick={() => handleSaveGrades(true)}>
                    Finalize & Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
