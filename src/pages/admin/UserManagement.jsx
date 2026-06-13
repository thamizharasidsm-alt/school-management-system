import React, { useState, useEffect } from 'react';
import { Upload, Plus, Search, Filter, Pencil, Trash2, X, Download } from 'lucide-react';

const logActivity = (title, type, by = 'Admin Elena', initials = 'AE') => {
  const stored = localStorage.getItem('MOCK_ACTIVITIES');
  const activities = stored ? JSON.parse(stored) : [];
  const newActivity = {
    id: `ACT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    title,
    type,
    by,
    initials,
    timestamp: Date.now()
  };
  localStorage.setItem('MOCK_ACTIVITIES', JSON.stringify([newActivity, ...activities].slice(0, 50)));
};

export const MOCK_STUDENTS = [
  // Grade 4 - A (10 Students)
  { id: 'STU-24001', name: 'David Chen', email: 'david.c@example.com', grade: 'Grade 4 - A', guardian: 'Robert Chen', relation: 'Father', status: 'Active', joined: 'Oct 18, 2023', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 'STU-24002', name: 'Omar Hassan', email: 'omar.h@example.com', grade: 'Grade 4 - A', guardian: 'Layla Hassan', relation: 'Mother', status: 'Active', joined: 'Oct 06, 2023', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 'STU-24003', name: 'Tommy Miller', email: 'tommy.m@example.com', grade: 'Grade 4 - A', guardian: 'Gary Miller', relation: 'Father', status: 'Active', joined: 'Jan 10, 2024', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 'STU-24004', name: 'Lily Evans', email: 'lily.e@example.com', grade: 'Grade 4 - A', guardian: 'Jane Evans', relation: 'Mother', status: 'Active', joined: 'Jan 15, 2024', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 'STU-24005', name: 'Jack Nelson', email: 'jack.n@example.com', grade: 'Grade 4 - A', guardian: 'Paul Nelson', relation: 'Father', status: 'Active', joined: 'Feb 01, 2024', avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: 'STU-24006', name: 'Zoey Hall', email: 'zoey.h@example.com', grade: 'Grade 4 - A', guardian: 'Sara Hall', relation: 'Mother', status: 'Active', joined: 'Feb 10, 2024', avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: 'STU-24007', name: 'Leo Wright', email: 'leo.w@example.com', grade: 'Grade 4 - A', guardian: 'Mark Wright', relation: 'Father', status: 'Active', joined: 'Feb 15, 2024', avatar: 'https://i.pravatar.cc/150?u=7' },
  { id: 'STU-24008', name: 'Mia King', email: 'mia.k@example.com', grade: 'Grade 4 - A', guardian: 'Lucy King', relation: 'Mother', status: 'Active', joined: 'Mar 01, 2024', avatar: 'https://i.pravatar.cc/150?u=8' },
  { id: 'STU-24009', name: 'Ryan Green', email: 'ryan.g@example.com', grade: 'Grade 4 - A', guardian: 'Adam Green', relation: 'Father', status: 'Active', joined: 'Mar 10, 2024', avatar: 'https://i.pravatar.cc/150?u=9' },
  { id: 'STU-24010', name: 'Ava Adams', email: 'ava.a@example.com', grade: 'Grade 4 - A', guardian: 'Lisa Adams', relation: 'Mother', status: 'Active', joined: 'Mar 15, 2024', avatar: 'https://i.pravatar.cc/150?u=10' },

  // Grade 5 - A / B (10 Students)
  { id: 'STU-24011', name: 'Alex Johnson', email: 'alex.j@example.com', grade: 'Grade 5 - A', guardian: 'Michael Johnson', relation: 'Father', status: 'Active', joined: 'Oct 24, 2023', avatar: 'https://i.pravatar.cc/150?u=11' },
  { id: 'STU-24012', name: 'Lucas Silva', email: 'lucas.s@example.com', grade: 'Grade 5 - A', guardian: 'Maria Silva', relation: 'Mother', status: 'Active', joined: 'Oct 10, 2023', avatar: 'https://i.pravatar.cc/150?u=12' },
  { id: 'STU-24013', name: 'Liam Smith', email: 'liam.s@example.com', grade: 'Grade 5 - B', guardian: 'Sophia Wilson', relation: 'Mother', status: 'Active', joined: 'Sep 28, 2023', avatar: 'https://i.pravatar.cc/150?u=13' },
  { id: 'STU-24014', name: 'Mason Carter', email: 'mason.c@example.com', grade: 'Grade 5 - A', guardian: 'John Carter', relation: 'Father', status: 'Active', joined: 'Jan 05, 2024', avatar: 'https://i.pravatar.cc/150?u=14' },
  { id: 'STU-24015', name: 'Ella Brooks', email: 'ella.b@example.com', grade: 'Grade 5 - B', guardian: 'Kate Brooks', relation: 'Mother', status: 'Active', joined: 'Jan 12, 2024', avatar: 'https://i.pravatar.cc/150?u=15' },
  { id: 'STU-24016', name: 'Ethan Gray', email: 'ethan.g@example.com', grade: 'Grade 5 - A', guardian: 'Fred Gray', relation: 'Father', status: 'Active', joined: 'Jan 20, 2024', avatar: 'https://i.pravatar.cc/150?u=16' },
  { id: 'STU-24017', name: 'Chloe Price', email: 'chloe.p@example.com', grade: 'Grade 5 - B', guardian: 'Nelly Price', relation: 'Mother', status: 'Active', joined: 'Jan 28, 2024', avatar: 'https://i.pravatar.cc/150?u=17' },
  { id: 'STU-24018', name: 'Aiden Bell', email: 'aiden.b@example.com', grade: 'Grade 5 - A', guardian: 'Greg Bell', relation: 'Father', status: 'Active', joined: 'Feb 05, 2024', avatar: 'https://i.pravatar.cc/150?u=18' },
  { id: 'STU-24019', name: 'Grace Ward', email: 'grace.w@example.com', grade: 'Grade 5 - B', guardian: 'Tina Ward', relation: 'Mother', status: 'Active', joined: 'Feb 12, 2024', avatar: 'https://i.pravatar.cc/150?u=19' },
  { id: 'STU-24020', name: 'Logan Watson', email: 'logan.w@example.com', grade: 'Grade 5 - A', guardian: 'Carl Watson', relation: 'Father', status: 'Active', joined: 'Feb 20, 2024', avatar: 'https://i.pravatar.cc/150?u=20' },

  // Grade 6 - B (10 Students)
  { id: 'STU-24021', name: 'Sarah Williams', email: 'sarah.w@example.com', grade: 'Grade 6 - B', guardian: 'Emma Williams', relation: 'Mother', status: 'Inactive', joined: 'Oct 22, 2023', avatar: 'https://i.pravatar.cc/150?u=21' },
  { id: 'STU-24022', name: 'Emma Davis', email: 'emma.d@example.com', grade: 'Grade 6 - B', guardian: 'James Davis', relation: 'Father', status: 'Inactive', joined: 'Oct 02, 2023', avatar: 'https://i.pravatar.cc/150?u=22' },
  { id: 'STU-24023', name: 'Jacob Rogers', email: 'jacob.r@example.com', grade: 'Grade 6 - B', guardian: 'Kyle Rogers', relation: 'Father', status: 'Active', joined: 'Feb 25, 2024', avatar: 'https://i.pravatar.cc/150?u=23' },
  { id: 'STU-24024', name: 'Hailey Reed', email: 'hailey.r@example.com', grade: 'Grade 6 - B', guardian: 'Vicky Reed', relation: 'Mother', status: 'Active', joined: 'Mar 02, 2024', avatar: 'https://i.pravatar.cc/150?u=24' },
  { id: 'STU-24025', name: 'Caleb Cook', email: 'caleb.c@example.com', grade: 'Grade 6 - B', guardian: 'Seth Cook', relation: 'Father', status: 'Active', joined: 'Mar 08, 2024', avatar: 'https://i.pravatar.cc/150?u=25' },
  { id: 'STU-24026', name: 'Abigail Bailey', email: 'abigail.b@example.com', grade: 'Grade 6 - B', guardian: 'Wendy Bailey', relation: 'Mother', status: 'Active', joined: 'Mar 15, 2024', avatar: 'https://i.pravatar.cc/150?u=26' },
  { id: 'STU-24027', name: 'Dylan Cooper', email: 'dylan.c@example.com', grade: 'Grade 6 - B', guardian: 'Sean Cooper', relation: 'Father', status: 'Active', joined: 'Mar 22, 2024', avatar: 'https://i.pravatar.cc/150?u=27' },
  { id: 'STU-24028', name: 'Emily Morgan', email: 'emily.m@example.com', grade: 'Grade 6 - B', guardian: 'Tracy Morgan', relation: 'Mother', status: 'Active', joined: 'Mar 28, 2024', avatar: 'https://i.pravatar.cc/150?u=28' },
  { id: 'STU-24029', name: 'Luke Kelly', email: 'luke.k@example.com', grade: 'Grade 6 - B', guardian: 'Dan Kelly', relation: 'Father', status: 'Active', joined: 'Apr 02, 2024', avatar: 'https://i.pravatar.cc/150?u=29' },
  { id: 'STU-24030', name: 'Madison Howard', email: 'madison.h@example.com', grade: 'Grade 6 - B', guardian: 'Julie Howard', relation: 'Mother', status: 'Active', joined: 'Apr 10, 2024', avatar: 'https://i.pravatar.cc/150?u=30' },

  // Grade 7 - C (10 Students)
  { id: 'STU-24031', name: 'Maya Patel', email: 'maya.p@example.com', grade: 'Grade 7 - C', guardian: 'Sanjay Patel', relation: 'Father', status: 'Active', joined: 'Oct 15, 2023', avatar: 'https://i.pravatar.cc/150?u=31' },
  { id: 'STU-24032', name: 'Mia Taylor', email: 'mia.t@example.com', grade: 'Grade 7 - C', guardian: 'William Taylor', relation: 'Father', status: 'Active', joined: 'Sep 25, 2023', avatar: 'https://i.pravatar.cc/150?u=32' },
  { id: 'STU-24033', name: 'Nathan Cox', email: 'nathan.c@example.com', grade: 'Grade 7 - C', guardian: 'Jeff Cox', relation: 'Father', status: 'Active', joined: 'Apr 15, 2024', avatar: 'https://i.pravatar.cc/150?u=33' },
  { id: 'STU-24034', name: 'Elizabeth Ward', email: 'elizabeth.w@example.com', grade: 'Grade 7 - C', guardian: 'Amy Ward', relation: 'Mother', status: 'Active', joined: 'Apr 20, 2024', avatar: 'https://i.pravatar.cc/150?u=34' },
  { id: 'STU-24035', name: 'Christian Foster', email: 'christian.f@example.com', grade: 'Grade 7 - C', guardian: 'Roy Foster', relation: 'Father', status: 'Active', joined: 'Apr 25, 2024', avatar: 'https://i.pravatar.cc/150?u=35' },
  { id: 'STU-24036', name: 'Avery Reyes', email: 'avery.r@example.com', grade: 'Grade 7 - C', guardian: 'Kim Reyes', relation: 'Mother', status: 'Active', joined: 'May 01, 2024', avatar: 'https://i.pravatar.cc/150?u=36' },
  { id: 'STU-24037', name: 'Hunter Graham', email: 'hunter.g@example.com', grade: 'Grade 7 - C', guardian: 'Bob Graham', relation: 'Father', status: 'Active', joined: 'May 05, 2024', avatar: 'https://i.pravatar.cc/150?u=37' },
  { id: 'STU-24038', name: 'Sofia Perry', email: 'sofia.p@example.com', grade: 'Grade 7 - C', guardian: 'Eva Perry', relation: 'Mother', status: 'Active', joined: 'May 10, 2024', avatar: 'https://i.pravatar.cc/150?u=38' },
  { id: 'STU-24039', name: 'Jonathan Butler', email: 'jonathan.b@example.com', grade: 'Grade 7 - C', guardian: 'Paul Butler', relation: 'Father', status: 'Active', joined: 'May 15, 2024', avatar: 'https://i.pravatar.cc/150?u=39' },
  { id: 'STU-24040', name: 'Hannah Fisher', email: 'hannah.f@example.com', grade: 'Grade 7 - C', guardian: 'Sue Fisher', relation: 'Mother', status: 'Active', joined: 'May 20, 2024', avatar: 'https://i.pravatar.cc/150?u=40' },

  // Grade 8 - A (10 Students)
  { id: 'STU-24041', name: 'Amina Okafor', email: 'amina.o@example.com', grade: 'Grade 8 - A', guardian: 'Chinedu Okafor', relation: 'Father', status: 'Active', joined: 'Oct 08, 2023', avatar: 'https://i.pravatar.cc/150?u=41' },
  { id: 'STU-24042', name: 'Isaiah Ortiz', email: 'isaiah.o@example.com', grade: 'Grade 8 - A', guardian: 'Luis Ortiz', relation: 'Father', status: 'Active', joined: 'May 25, 2024', avatar: 'https://i.pravatar.cc/150?u=42' },
  { id: 'STU-24043', name: 'Ashley Gomez', email: 'ashley.g@example.com', grade: 'Grade 8 - A', guardian: 'Ana Gomez', relation: 'Mother', status: 'Active', joined: 'Jun 01, 2024', avatar: 'https://i.pravatar.cc/150?u=43' },
  { id: 'STU-24044', name: 'Aaron Murray', email: 'aaron.m@example.com', grade: 'Grade 8 - A', guardian: 'Joe Murray', relation: 'Father', status: 'Active', joined: 'Jun 05, 2024', avatar: 'https://i.pravatar.cc/150?u=44' },
  { id: 'STU-24045', name: 'Samantha Webb', email: 'samantha.w@example.com', grade: 'Grade 8 - A', guardian: 'Joy Webb', relation: 'Mother', status: 'Active', joined: 'Jun 10, 2024', avatar: 'https://i.pravatar.cc/150?u=45' },
  { id: 'STU-24046', name: 'Eli Patterson', email: 'eli.p@example.com', grade: 'Grade 8 - A', guardian: 'Sam Patterson', relation: 'Father', status: 'Active', joined: 'Jun 15, 2024', avatar: 'https://i.pravatar.cc/150?u=46' },
  { id: 'STU-24047', name: 'Sarah Jordan', email: 'sarah.j@example.com', grade: 'Grade 8 - A', guardian: 'Kay Jordan', relation: 'Mother', status: 'Active', joined: 'Jun 20, 2024', avatar: 'https://i.pravatar.cc/150?u=47' },
  { id: 'STU-24048', name: 'Connor Reynolds', email: 'connor.r@example.com', grade: 'Grade 8 - A', guardian: 'Ian Reynolds', relation: 'Father', status: 'Active', joined: 'Jun 25, 2024', avatar: 'https://i.pravatar.cc/150?u=48' },
  { id: 'STU-24049', name: 'Victoria Hamilton', email: 'victoria.h@example.com', grade: 'Grade 8 - A', guardian: 'Val Hamilton', relation: 'Mother', status: 'Active', joined: 'Jul 01, 2024', avatar: 'https://i.pravatar.cc/150?u=49' },
  { id: 'STU-24050', name: 'Landon Myers', email: 'landon.m@example.com', grade: 'Grade 8 - A', guardian: 'Roy Myers', relation: 'Father', status: 'Active', joined: 'Jul 05, 2024', avatar: 'https://i.pravatar.cc/150?u=50' },
  { id: 'STU-24052', name: 'Emily Brown', email: 'emily.b@example.com', grade: 'Grade 6 - B', guardian: 'Emma Williams', relation: 'Mother', status: 'Active', joined: 'Oct 02, 2023', avatar: 'https://i.pravatar.cc/150?u=eb' }
];

export const MOCK_STAFF = [
  { id: 'STF-1001', name: 'John Smith', email: 'john.s@example.com', department: 'Mathematics', role: 'Senior Teacher', status: 'Active', joined: 'Aug 15, 2020', avatar: 'https://i.pravatar.cc/150?u=b042581f4e290267041' },
  { id: 'STF-1002', name: 'Emily Watson', email: 'emily.w@example.com', department: 'Science', role: 'Teacher', status: 'Active', joined: 'Jan 10, 2021', avatar: 'https://i.pravatar.cc/150?u=b042581f4e290267042' },
  { id: 'STF-1003', name: 'Michael Lee', email: 'michael.l@example.com', department: 'Administration', role: 'Principal', status: 'Active', joined: 'Jul 01, 2015', avatar: 'https://i.pravatar.cc/150?u=b042581f4e290267043' },
  { id: 'STF-1004', name: 'Sarah Connor', email: 'sarah.c@example.com', department: 'Mathematics', role: 'Teacher', status: 'Active', joined: 'Feb 20, 2022', avatar: 'https://i.pravatar.cc/150?u=b042581f4e290267044' },
  { id: 'STF-1005', name: 'James Porter', email: 'james.p@example.com', department: 'Arts', role: 'Teacher', status: 'Active', joined: 'Sep 05, 2023', avatar: 'https://i.pravatar.cc/150?u=b042581f4e290267045' },
  { id: 'STF-1006', name: 'Maria Santos', email: 'maria.s@example.com', department: 'English', role: 'Teacher', status: 'Active', joined: 'Oct 12, 2021', avatar: 'https://i.pravatar.cc/150?u=b042581f4e290267046' },
  { id: 'STF-1007', name: 'Lisa Park', email: 'lisa.p@example.com', department: 'Science', role: 'Teacher', status: 'Active', joined: 'Nov 01, 2022', avatar: 'https://i.pravatar.cc/150?u=b042581f4e290267047' },
  { id: 'STF-1008', name: 'Alice Johnson', email: 'alice.j@example.com', department: 'History', role: 'Teacher', status: 'Active', joined: 'Mar 15, 2023', avatar: 'https://i.pravatar.cc/150?u=b042581f4e290267048' }
];

const MOCK_PARENTS = [
  { id: 'PAR-5001', name: 'Michael Johnson', email: 'm.johnson@example.com', phone: '+1 234 567 8901', children: 'Alex Johnson', status: 'Active', joined: 'Oct 24, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267041' },
  { id: 'PAR-5002', name: 'Emma Williams', email: 'e.williams@example.com', phone: '+1 234 567 8902', children: 'Sarah Williams', status: 'Active', joined: 'Oct 22, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267042' },
  { id: 'PAR-5003', name: 'Robert Chen', email: 'r.chen@example.com', phone: '+1 234 567 8903', children: 'David Chen', status: 'Active', joined: 'Oct 18, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267043' },
  { id: 'PAR-5004', name: 'Sanjay Patel', email: 's.patel@example.com', phone: '+1 234 567 8904', children: 'Maya Patel', status: 'Active', joined: 'Oct 15, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267044' },
  { id: 'PAR-5005', name: 'Maria Silva', email: 'm.silva@example.com', phone: '+1 234 567 8905', children: 'Lucas Silva', status: 'Active', joined: 'Oct 10, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267045' },
  { id: 'PAR-5006', name: 'Chinedu Okafor', email: 'c.okafor@example.com', phone: '+1 234 567 8906', children: 'Amina Okafor', status: 'Active', joined: 'Oct 08, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267046' },
  { id: 'PAR-5007', name: 'Layla Hassan', email: 'l.hassan@example.com', phone: '+1 234 567 8907', children: 'Omar Hassan', status: 'Active', joined: 'Oct 06, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267047' },
  { id: 'PAR-5008', name: 'James Davis', email: 'j.davis@example.com', phone: '+1 234 567 8908', children: 'Emma Davis', status: 'Active', joined: 'Oct 02, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267048' },
  { id: 'PAR-5009', name: 'Sophia Wilson', email: 's.wilson@example.com', phone: '+1 234 567 8909', children: 'Liam Smith', status: 'Active', joined: 'Sep 28, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267049' },
  { id: 'PAR-5010', name: 'William Taylor', email: 'w.taylor@example.com', phone: '+1 234 567 8910', children: 'Mia Taylor', status: 'Active', joined: 'Sep 25, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267050' },
];

export default function UserManagement() {
  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [parents, setParents] = useState([]);
  const [localClasses, setLocalClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [gradeFilter, setGradeFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [addType, setAddType] = useState('student');
  const [newStudentFormData, setNewStudentFormData] = useState({ name: '', email: '', grade: '', guardian: '' });
  const [newStaffFormData, setNewStaffFormData] = useState({ name: '', email: '', department: '', role: '' });
  const [newParentFormData, setNewParentFormData] = useState({ name: '', email: '', phone: '', children: '' });
  const [editingStudent, setEditingStudent] = useState(null);
  const [editingStaff, setEditingStaff] = useState(null);
  const [editingParent, setEditingParent] = useState(null);
  const [formError, setFormError] = useState('');
  const [updateFlag, setUpdateFlag] = useState(0);

  // Load data from LocalStorage or seed defaults
  useEffect(() => {
    // Load students
    let storedStudents = localStorage.getItem('MOCK_STUDENTS');
    if (!storedStudents) {
      localStorage.setItem('MOCK_STUDENTS', JSON.stringify(MOCK_STUDENTS));
      storedStudents = JSON.stringify(MOCK_STUDENTS);
    }
    const parsedStudents = JSON.parse(storedStudents);
    setStudents(parsedStudents);
    MOCK_STUDENTS.length = 0;
    MOCK_STUDENTS.push(...parsedStudents);

    // Load staff
    let storedStaff = localStorage.getItem('MOCK_STAFF');
    if (!storedStaff) {
      localStorage.setItem('MOCK_STAFF', JSON.stringify(MOCK_STAFF));
      storedStaff = JSON.stringify(MOCK_STAFF);
    }
    const parsedStaff = JSON.parse(storedStaff);
    setStaff(parsedStaff);
    MOCK_STAFF.length = 0;
    MOCK_STAFF.push(...parsedStaff);

    // Load parents
    let storedParents = localStorage.getItem('MOCK_PARENTS');
    if (!storedParents) {
      localStorage.setItem('MOCK_PARENTS', JSON.stringify(MOCK_PARENTS));
      storedParents = JSON.stringify(MOCK_PARENTS);
    }
    setParents(JSON.parse(storedParents));

    // Load classes for grade filter options
    let storedClasses = localStorage.getItem('MOCK_CLASSES');
    if (storedClasses) {
      setLocalClasses(JSON.parse(storedClasses));
    }

    setLoading(false);
  }, [updateFlag]);

  const getActiveList = () => {
    if (activeTab === 'students') return students;
    if (activeTab === 'staff') return staff;
    return parents;
  };

  const filterData = (data) => {
    return data.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      
      let matchesGrade = true;
      if (gradeFilter !== 'All') {
        if (activeTab === 'students') matchesGrade = item.grade === gradeFilter;
        else if (activeTab === 'staff') matchesGrade = item.department === gradeFilter;
      }
      
      return matchesSearch && matchesStatus && matchesGrade;
    });
  };

  const getFilterOptions = () => {
    let options = [];
    if (activeTab === 'students') {
      if (localClasses.length > 0) {
        options = [...new Set(localClasses.map(cls => `${cls.grade} - ${cls.section}`))];
      } else {
        options = ['Grade 4 - A', 'Grade 5 - A', 'Grade 5 - B', 'Grade 6 - B', 'Grade 7 - C', 'Grade 8 - A'];
      }
    } else if (activeTab === 'staff') {
      options = [...new Set(staff.map(s => s.department))];
    }
    return options;
  };

  const handleDownload = () => {
    const rawData = getActiveList();
    const dataToExport = filterData(rawData);
    
    if (dataToExport.length === 0) return;
    
    const headers = Object.keys(dataToExport[0]).join(',');
    const csvRows = dataToExport.map(row => Object.values(row).map(val => `"${val}"`).join(','));
    const csvContent = [headers, ...csvRows].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTab}_data.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="dashboard-title-area">
        <div className="dashboard-title">
          <h1>User Management</h1>
          <p>Manage Students, Staffs and parents across the school</p>
        </div>
        <div className="title-actions">
          <button className="btn-outline" onClick={handleDownload}>
            <Download size={18} /> Export Excel
          </button>
          <div style={{ position: 'relative' }}>
            <button className="btn-primary" onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}>
              <Plus size={18} /> Add
            </button>
            {isAddMenuOpen && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, width: '150px' }}>
                <button style={{ display: 'block', width: '100%', padding: '10px 16px', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', borderBottom: '1px solid #F1F5F9' }} onClick={() => { setAddType('student'); setIsAddModalOpen(true); setIsAddMenuOpen(false); setFormError(''); }}>Add Student</button>
                <button style={{ display: 'block', width: '100%', padding: '10px 16px', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', borderBottom: '1px solid #F1F5F9' }} onClick={() => { setAddType('staff'); setIsAddModalOpen(true); setIsAddMenuOpen(false); setFormError(''); }}>Add Staff</button>
                <button style={{ display: 'block', width: '100%', padding: '10px 16px', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px' }} onClick={() => { setAddType('parent'); setIsAddModalOpen(true); setIsAddMenuOpen(false); setFormError(''); }}>Add Parent</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="tab-pills">
        <button 
          className={`tab-pill students ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          Students <span className="tab-count">{students.length < 10 ? `0${students.length}` : students.length}</span>
        </button>
        <button 
          className={`tab-pill staff ${activeTab === 'staff' ? 'active' : ''}`}
          onClick={() => setActiveTab('staff')}
        >
          Staff <span className="tab-count">{staff.length < 10 ? `0${staff.length}` : staff.length}</span>
        </button>
        <button 
          className={`tab-pill parents ${activeTab === 'parents' ? 'active' : ''}`}
          onClick={() => setActiveTab('parents')}
        >
          Parents <span className="tab-count">{parents.length < 10 ? `0${parents.length}` : parents.length}</span>
        </button>
      </div>

      <div className="table-controls">
        <div className="table-search">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="table-filters">
          {activeTab !== 'parents' && (
            <select 
              className="filter-btn" 
              style={{ appearance: 'none', background: 'white', border: '1px solid #E2E8F0', padding: '10px 16px', borderRadius: '20px', color: '#64748B', fontWeight: 500, cursor: 'pointer' }}
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
            >
              <option value="All">{activeTab === 'students' ? 'All Grades' : 'All Departments'}</option>
              {getFilterOptions().map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          )}
          <select 
            className="filter-btn" 
            style={{ appearance: 'none', background: 'white', border: '1px solid #E2E8F0', padding: '10px 16px', borderRadius: '20px', color: '#64748B', fontWeight: 500, cursor: 'pointer' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px', fontSize: '16px', color: '#64748B' }}>Loading data...</div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>{activeTab === 'students' ? 'STUDENT' : activeTab === 'staff' ? 'STAFF' : 'PARENT'} DETAILS</th>
                <th>{activeTab === 'students' ? 'STUDENT' : activeTab === 'staff' ? 'STAFF' : 'PARENT'} ID</th>
                <th>{activeTab === 'students' ? 'GRADE/CLASS' : activeTab === 'staff' ? 'DEPARTMENT' : 'PHONE'}</th>
                <th>{activeTab === 'students' ? 'GUARDIAN' : activeTab === 'staff' ? 'ROLE' : 'CHILDREN'}</th>
                <th>STATUS</th>
                <th>JOINED DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {activeTab === 'students' && filterData(students).map(student => (
                <tr key={student.id}>
                  <td>
                    <div className="user-info-cell">
                      <img src={student.avatar} alt={student.name} />
                      <div className="user-info-text">
                        <span className="user-name">{student.name}</span>
                        <span className="user-email">{student.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{student.id}</td>
                  <td><span className="grade-badge">{student.grade}</span></td>
                  <td>
                    <div className="guardian-cell">
                      <span className="guardian-name">{student.guardian}</span>
                      <span className="guardian-relation">{student.relation}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${student.status.toLowerCase()}`}>
                      <span className="status-dot"></span> {student.status}
                    </span>
                  </td>
                  <td>{student.joined}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit" onClick={() => { setEditingStudent(student); setFormError(''); }}>
                        <Pencil size={16} />
                      </button>
                      <button className="action-btn delete" onClick={() => {
                        if (window.confirm("Are you sure you want to delete this student?")) {
                          const updated = students.filter(s => s.id !== student.id);
                          localStorage.setItem('MOCK_STUDENTS', JSON.stringify(updated));
                          logActivity(`Student ${student.name} removed from roster`, 'student', 'Admin Elena', 'AE');
                          setUpdateFlag(prev => prev + 1);
                        }
                      }}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {activeTab === 'staff' && filterData(staff).map(staffMember => (
                <tr key={staffMember.id}>
                  <td>
                    <div className="user-info-cell">
                      <img src={staffMember.avatar} alt={staffMember.name} />
                      <div className="user-info-text">
                        <span className="user-name">{staffMember.name}</span>
                        <span className="user-email">{staffMember.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{staffMember.id}</td>
                  <td>{staffMember.department}</td>
                  <td>{staffMember.role}</td>
                  <td>
                    <span className={`status-badge ${staffMember.status.toLowerCase()}`}>
                      <span className="status-dot"></span> {staffMember.status}
                    </span>
                  </td>
                  <td>{staffMember.joined}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit" onClick={() => { setEditingStaff(staffMember); setFormError(''); }}><Pencil size={16} /></button>
                      <button className="action-btn delete" onClick={() => {
                        if (window.confirm("Are you sure you want to delete this staff member?")) {
                          const updated = staff.filter(s => s.id !== staffMember.id);
                          localStorage.setItem('MOCK_STAFF', JSON.stringify(updated));
                          logActivity(`Staff ${staffMember.name} removed from roster`, 'staff', 'Admin Elena', 'AE');
                          setUpdateFlag(prev => prev + 1);
                        }
                      }}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}

              {activeTab === 'parents' && filterData(parents).map(parent => (
                <tr key={parent.id}>
                  <td>
                    <div className="user-info-cell">
                      <img src={parent.avatar} alt={parent.name} />
                      <div className="user-info-text">
                        <span className="user-name">{parent.name}</span>
                        <span className="user-email">{parent.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{parent.id}</td>
                  <td>{parent.phone}</td>
                  <td>
                    <span className="grade-badge">{parent.children}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${parent.status.toLowerCase()}`}>
                      <span className="status-dot"></span> {parent.status}
                    </span>
                  </td>
                  <td>{parent.joined}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit" onClick={() => { setEditingParent(parent); setFormError(''); }}><Pencil size={16} /></button>
                      <button className="action-btn delete" onClick={() => {
                        if (window.confirm("Are you sure you want to delete this parent?")) {
                          const updated = parents.filter(p => p.id !== parent.id);
                          localStorage.setItem('MOCK_PARENTS', JSON.stringify(updated));
                          logActivity(`Parent ${parent.name} removed from roster`, 'parent', 'Admin Elena', 'AE');
                          setUpdateFlag(prev => prev + 1);
                        }
                      }}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isAddModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#0F172A' }}>
                {addType === 'student' ? 'Add New Student' : addType === 'staff' ? 'Add New Staff' : 'Add New Parent'}
              </h2>
              <X style={{ cursor: 'pointer', color: '#64748B' }} onClick={() => { setIsAddModalOpen(false); setFormError(''); }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {formError && (
                <div style={{ color: '#EF4444', fontSize: '13px', backgroundColor: '#FEF2F2', padding: '10px', borderRadius: '6px', border: '1px solid #FCA5A5' }}>
                  {formError}
                </div>
              )}
              
              {addType === 'student' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Student Name</label>
                    <input type="text" placeholder="e.g. John Doe" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newStudentFormData.name} onChange={e => setNewStudentFormData({...newStudentFormData, name: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Email Address</label>
                    <input type="email" placeholder="john@example.com" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newStudentFormData.email} onChange={e => setNewStudentFormData({...newStudentFormData, email: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Grade & Section</label>
                    <input type="text" placeholder="e.g. Grade 5 - A" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newStudentFormData.grade} onChange={e => setNewStudentFormData({...newStudentFormData, grade: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Guardian Name</label>
                    <input type="text" placeholder="e.g. Jane Doe" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newStudentFormData.guardian} onChange={e => setNewStudentFormData({...newStudentFormData, guardian: e.target.value})} />
                  </div>
                </>
              )}

              {addType === 'staff' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Staff Name</label>
                    <input type="text" placeholder="e.g. John Doe" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newStaffFormData.name} onChange={e => setNewStaffFormData({...newStaffFormData, name: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Email Address</label>
                    <input type="email" placeholder="john@example.com" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newStaffFormData.email} onChange={e => setNewStaffFormData({...newStaffFormData, email: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Department</label>
                    <input type="text" placeholder="e.g. Mathematics" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newStaffFormData.department} onChange={e => setNewStaffFormData({...newStaffFormData, department: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Role</label>
                    <input type="text" placeholder="e.g. Senior Teacher" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newStaffFormData.role} onChange={e => setNewStaffFormData({...newStaffFormData, role: e.target.value})} />
                  </div>
                </>
              )}

              {addType === 'parent' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Parent Name</label>
                    <input type="text" placeholder="e.g. John Doe" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newParentFormData.name} onChange={e => setNewParentFormData({...newParentFormData, name: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Email Address</label>
                    <input type="email" placeholder="john@example.com" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newParentFormData.email} onChange={e => setNewParentFormData({...newParentFormData, email: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Phone Number</label>
                    <input type="text" placeholder="e.g. +1 234 567 8901" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newParentFormData.phone} onChange={e => setNewParentFormData({...newParentFormData, phone: e.target.value})} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Children</label>
                    <input type="text" placeholder="e.g. Alex Johnson" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={newParentFormData.children} onChange={e => setNewParentFormData({...newParentFormData, children: e.target.value})} />
                  </div>
                </>
              )}
              
              <button 
                className="btn-primary" 
                style={{ marginTop: '16px', justifyContent: 'center', width: '100%', padding: '12px' }} 
                onClick={() => {
                  if (addType === 'student') {
                    if (!newStudentFormData.name.trim() || !newStudentFormData.email.trim() || !newStudentFormData.grade.trim() || !newStudentFormData.guardian.trim()) {
                      setFormError('All fields are required.'); return;
                    }
                    const nameRegex = /^[A-Za-z\s]+$/;
                    if (!nameRegex.test(newStudentFormData.name)) { setFormError('Student Name must contain only letters.'); return; }
                    if (!nameRegex.test(newStudentFormData.guardian)) { setFormError('Guardian Name must contain only letters.'); return; }
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(newStudentFormData.email)) { setFormError('Please enter a valid email address.'); return; }

                    const gradeRegex = /^[Gg]rade\s+(\d+)\s*-\s*([A-Za-z])$/;
                    const gradeMatch = newStudentFormData.grade.trim().match(gradeRegex);
                    if (!gradeMatch) {
                      setFormError('Grade & Section must be in the format: Grade [Number] - [Section] (e.g., Grade 5 - A).');
                      return;
                    }
                    const [_, gradeNum, section] = gradeMatch;
                    if (section !== section.toUpperCase()) {
                      setFormError('Grade section letter must be in CAPITAL letter only (e.g., Grade 5 - A instead of Grade 5 - a).');
                      return;
                    }
                    const formattedGrade = `Grade ${gradeNum} - ${section}`;

                    const newStudent = {
                      id: `STU-240${students.length + 11}`,
                      name: newStudentFormData.name.trim(),
                      email: newStudentFormData.email.trim(),
                      grade: formattedGrade,
                      guardian: newStudentFormData.guardian.trim(),
                      relation: 'Parent',
                      status: 'Active',
                      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                      avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
                    };

                    const updated = [newStudent, ...students];
                    localStorage.setItem('MOCK_STUDENTS', JSON.stringify(updated));
                    logActivity(`${newStudent.name} admitted to ${newStudent.grade}`, 'student', 'Admin Elena', 'AE');
                    setNewStudentFormData({ name: '', email: '', grade: '', guardian: '' });
                  } else if (addType === 'staff') {
                    if (!newStaffFormData.name.trim() || !newStaffFormData.email.trim() || !newStaffFormData.department.trim() || !newStaffFormData.role.trim()) {
                      setFormError('All fields are required.'); return;
                    }
                    const nameRegex = /^[A-Za-z\s]+$/;
                    if (!nameRegex.test(newStaffFormData.name)) { setFormError('Staff Name must contain only letters.'); return; }
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(newStaffFormData.email)) { setFormError('Please enter a valid email address.'); return; }

                    const newStaff = {
                      id: `STF-10${staff.length + 1}`,
                      name: newStaffFormData.name.trim(),
                      email: newStaffFormData.email.trim(),
                      department: newStaffFormData.department.trim(),
                      role: newStaffFormData.role.trim(),
                      status: 'Active',
                      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                      avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
                    };

                    const updated = [newStaff, ...staff];
                    localStorage.setItem('MOCK_STAFF', JSON.stringify(updated));
                    logActivity(`${newStaff.name} joined as ${newStaff.role} (${newStaff.department})`, 'staff', 'Admin Elena', 'AE');
                    setNewStaffFormData({ name: '', email: '', department: '', role: '' });
                  } else if (addType === 'parent') {
                    if (!newParentFormData.name.trim() || !newParentFormData.email.trim() || !newParentFormData.phone.trim() || !newParentFormData.children.trim()) {
                      setFormError('All fields are required.'); return;
                    }
                    const nameRegex = /^[A-Za-z\s]+$/;
                    if (!nameRegex.test(newParentFormData.name)) { setFormError('Parent Name must contain only letters.'); return; }
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(newParentFormData.email)) { setFormError('Please enter a valid email address.'); return; }

                    const newParent = {
                      id: `PAR-50${parents.length + 1}`,
                      name: newParentFormData.name.trim(),
                      email: newParentFormData.email.trim(),
                      phone: newParentFormData.phone.trim(),
                      children: newParentFormData.children.trim(),
                      status: 'Active',
                      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                      avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
                    };

                    const updated = [newParent, ...parents];
                    localStorage.setItem('MOCK_PARENTS', JSON.stringify(updated));
                    logActivity(`Parent ${newParent.name} registered for ${newParent.children}`, 'parent', 'Admin Elena', 'AE');
                    setNewParentFormData({ name: '', email: '', phone: '', children: '' });
                  }

                  setUpdateFlag(prev => prev + 1);
                  setIsAddModalOpen(false);
                  setFormError('');
                }}
              >
                Save {addType === 'student' ? 'Student' : addType === 'staff' ? 'Staff' : 'Parent'}
              </button>
            </div>
          </div>
        </div>
      )}

      {editingStudent && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#0F172A' }}>Edit Student</h2>
              <X style={{ cursor: 'pointer', color: '#64748B' }} onClick={() => { setEditingStudent(null); setFormError(''); }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {formError && (
                <div style={{ color: '#EF4444', fontSize: '13px', backgroundColor: '#FEF2F2', padding: '10px', borderRadius: '6px', border: '1px solid #FCA5A5' }}>
                  {formError}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Student Name</label>
                <input type="text" placeholder="e.g. John Doe" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingStudent.name} onChange={e => setEditingStudent({...editingStudent, name: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Email Address</label>
                <input type="email" placeholder="john@example.com" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingStudent.email} onChange={e => setEditingStudent({...editingStudent, email: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Grade & Section</label>
                <input type="text" placeholder="e.g. Grade 5 - A" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingStudent.grade} onChange={e => setEditingStudent({...editingStudent, grade: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Guardian Name</label>
                <input type="text" placeholder="e.g. Jane Doe" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingStudent.guardian} onChange={e => setEditingStudent({...editingStudent, guardian: e.target.value})} />
              </div>
              
              <button 
                className="btn-primary" 
                style={{ marginTop: '16px', justifyContent: 'center', width: '100%', padding: '12px' }} 
                onClick={() => {
                  if (!editingStudent.name.trim() || !editingStudent.email.trim() || !editingStudent.grade.trim() || !editingStudent.guardian.trim()) {
                    setFormError('All fields are required.');
                    return;
                  }
                  
                  const nameRegex = /^[A-Za-z\s]+$/;
                  if (!nameRegex.test(editingStudent.name)) {
                    setFormError('Student Name must contain only letters.');
                    return;
                  }
                  if (!nameRegex.test(editingStudent.guardian)) {
                    setFormError('Guardian Name must contain only letters.');
                    return;
                  }

                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(editingStudent.email)) {
                    setFormError('Please enter a valid email address.');
                    return;
                  }

                  const gradeRegex = /^[Gg]rade\s+(\d+)\s*-\s*([A-Za-z])$/;
                  const gradeMatch = editingStudent.grade.trim().match(gradeRegex);
                  if (!gradeMatch) {
                    setFormError('Grade & Section must be in the format: Grade [Number] - [Section] (e.g., Grade 5 - A).');
                    return;
                  }
                  const [_, gradeNum, section] = gradeMatch;
                  if (section !== section.toUpperCase()) {
                    setFormError('Grade section letter must be in CAPITAL letter only (e.g., Grade 5 - A instead of Grade 5 - a).');
                    return;
                  }
                  const formattedGrade = `Grade ${gradeNum} - ${section}`;

                  const updated = students.map(s => {
                    if (s.id === editingStudent.id) {
                      return {
                        ...editingStudent,
                        name: editingStudent.name.trim(),
                        email: editingStudent.email.trim(),
                        grade: formattedGrade,
                        guardian: editingStudent.guardian.trim()
                      };
                    }
                    return s;
                  });
                  localStorage.setItem('MOCK_STUDENTS', JSON.stringify(updated));
                  logActivity(`Student ${editingStudent.name} profile updated`, 'student', 'Admin Elena', 'AE');
                  setUpdateFlag(prev => prev + 1);
                  setEditingStudent(null);
                  setFormError('');
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {editingStaff && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#0F172A' }}>Edit Staff</h2>
              <X style={{ cursor: 'pointer', color: '#64748B' }} onClick={() => { setEditingStaff(null); setFormError(''); }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {formError && (
                <div style={{ color: '#EF4444', fontSize: '13px', backgroundColor: '#FEF2F2', padding: '10px', borderRadius: '6px', border: '1px solid #FCA5A5' }}>
                  {formError}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Staff Name</label>
                <input type="text" placeholder="e.g. John Doe" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingStaff.name} onChange={e => setEditingStaff({...editingStaff, name: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Email Address</label>
                <input type="email" placeholder="john@example.com" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingStaff.email} onChange={e => setEditingStaff({...editingStaff, email: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Department</label>
                <input type="text" placeholder="e.g. Mathematics" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingStaff.department} onChange={e => setEditingStaff({...editingStaff, department: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Role</label>
                <input type="text" placeholder="e.g. Senior Teacher" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingStaff.role} onChange={e => setEditingStaff({...editingStaff, role: e.target.value})} />
              </div>
              
              <button 
                className="btn-primary" 
                style={{ marginTop: '16px', justifyContent: 'center', width: '100%', padding: '12px' }} 
                onClick={() => {
                  if (!editingStaff.name.trim() || !editingStaff.email.trim() || !editingStaff.department.trim() || !editingStaff.role.trim()) {
                    setFormError('All fields are required.');
                    return;
                  }
                  
                  const nameRegex = /^[A-Za-z\s]+$/;
                  if (!nameRegex.test(editingStaff.name)) {
                    setFormError('Staff Name must contain only letters.');
                    return;
                  }

                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(editingStaff.email)) {
                    setFormError('Please enter a valid email address.');
                    return;
                  }

                  const updated = staff.map(s => {
                    if (s.id === editingStaff.id) {
                      return {
                        ...editingStaff,
                        name: editingStaff.name.trim(),
                        email: editingStaff.email.trim(),
                        department: editingStaff.department.trim(),
                        role: editingStaff.role.trim()
                      };
                    }
                    return s;
                  });
                  localStorage.setItem('MOCK_STAFF', JSON.stringify(updated));
                  logActivity(`Staff ${editingStaff.name} profile updated`, 'staff', 'Admin Elena', 'AE');
                  setUpdateFlag(prev => prev + 1);
                  setEditingStaff(null);
                  setFormError('');
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {editingParent && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#0F172A' }}>Edit Parent</h2>
              <X style={{ cursor: 'pointer', color: '#64748B' }} onClick={() => { setEditingParent(null); setFormError(''); }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {formError && (
                <div style={{ color: '#EF4444', fontSize: '13px', backgroundColor: '#FEF2F2', padding: '10px', borderRadius: '6px', border: '1px solid #FCA5A5' }}>
                  {formError}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Parent Name</label>
                <input type="text" placeholder="e.g. John Doe" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingParent.name} onChange={e => setEditingParent({...editingParent, name: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Email Address</label>
                <input type="email" placeholder="john@example.com" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingParent.email} onChange={e => setEditingParent({...editingParent, email: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Phone Number</label>
                <input type="text" placeholder="e.g. +1 234 567 8901" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingParent.phone} onChange={e => setEditingParent({...editingParent, phone: e.target.value})} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Children</label>
                <input type="text" placeholder="e.g. Alex Johnson" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }} value={editingParent.children} onChange={e => setEditingParent({...editingParent, children: e.target.value})} />
              </div>
              
              <button 
                className="btn-primary" 
                style={{ marginTop: '16px', justifyContent: 'center', width: '100%', padding: '12px' }} 
                onClick={() => {
                  if (!editingParent.name.trim() || !editingParent.email.trim() || !editingParent.phone.trim() || !editingParent.children.trim()) {
                    setFormError('All fields are required.');
                    return;
                  }
                  
                  const nameRegex = /^[A-Za-z\s]+$/;
                  if (!nameRegex.test(editingParent.name)) {
                    setFormError('Parent Name must contain only letters.');
                    return;
                  }

                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(editingParent.email)) {
                    setFormError('Please enter a valid email address.');
                    return;
                  }

                  const updated = parents.map(p => {
                    if (p.id === editingParent.id) {
                      return {
                        ...editingParent,
                        name: editingParent.name.trim(),
                        email: editingParent.email.trim(),
                        phone: editingParent.phone.trim(),
                        children: editingParent.children.trim()
                      };
                    }
                    return p;
                  });
                  localStorage.setItem('MOCK_PARENTS', JSON.stringify(updated));
                  logActivity(`Parent ${editingParent.name} profile updated`, 'parent', 'Admin Elena', 'AE');
                  setUpdateFlag(prev => prev + 1);
                  setEditingParent(null);
                  setFormError('');
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
