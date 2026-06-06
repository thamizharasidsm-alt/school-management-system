import React, { useState } from 'react';
import { 
  Download, 
  Folder, 
  FileText, 
  Award,
  Search,
  ChevronDown,
  Upload,
  Trash2,
  FileImage,
  ClipboardList
} from 'lucide-react';

const MOCK_DOCUMENTS = [
  { 
    id: 1, 
    title: 'Enrollment Certificate - Liam Smith', 
    meta: 'Liam smith . 2026-03-01 . 245KB . By Admin Office', 
    category: 'Certificates', 
    iconColor: 'red' 
  },
  { 
    id: 2, 
    title: 'Grade 6 Report Card - Emily Brown', 
    meta: 'Emily Brown . 2026-02-28 . 180KB . By Robert Chen', 
    category: 'Report Card', 
    iconColor: 'red' 
  },
  { 
    id: 3, 
    title: 'School Calendar 2026', 
    meta: '2026-01-10 . 520KB . By Principal', 
    category: 'Other', 
    iconColor: 'red' 
  },
  { 
    id: 4, 
    title: 'Staff Handbook 2026', 
    meta: '2026-01-05 . 1.2MB . By HR Department', 
    category: 'Other', 
    iconColor: 'red' 
  },
  { 
    id: 5, 
    title: 'Student ID - Noah Johnson', 
    meta: 'Noah Johnson . 2026-04-01 . 95KB . By Admin Office', 
    category: 'ID Card', 
    iconColor: 'blue' 
  },
  { 
    id: 6, 
    title: 'Merit Certificate - Emily Brown', 
    meta: 'Emily Brown . 2026-03-15 . 210KB . By Principal', 
    category: 'Certificates', 
    iconColor: 'red' 
  },
  { 
    id: 7, 
    title: 'Attendance Certificate - Noah Johnson', 
    meta: 'Noah Johnson . 2026-03-20 . 195KB . By Admin Office', 
    category: 'Certificates', 
    iconColor: 'red' 
  },
  { 
    id: 8, 
    title: 'Grade 5 Report Card - Ethan Jones', 
    meta: 'Ethan Jones . 2026-02-10 . 165KB . By Sarah Connor', 
    category: 'Report Card', 
    iconColor: 'red' 
  },
  { 
    id: 9, 
    title: 'Staff Attendance Sheet - April', 
    meta: '2026-04-01 . 88KB . By HR Department', 
    category: 'Other', 
    iconColor: 'green' 
  },
  { 
    id: 10, 
    title: 'Fee Receipt - Olivia Williams', 
    meta: 'Olivia Williams . 2026-04-05 . 72KB . By Accounts Office', 
    category: 'Other', 
    iconColor: 'red' 
  },
  { 
    id: 11, 
    title: 'Student photo - Sophia Martinez', 
    meta: 'Sophia Martinez . 2026-02-15 . 312KB . By Admin office', 
    category: 'ID Card', 
    iconColor: 'blue' 
  },
  {
    id: 12,
    title: 'Medical Certificate - James Wilson',
    meta: 'James Wilson . 2026-04-10 . 145KB . By Admin Office',
    category: 'Certificates',
    iconColor: 'red'
  },
  {
    id: 13,
    title: 'Grade 8 Report Card - Ava Taylor',
    meta: 'Ava Taylor . 2026-02-28 . 190KB . By Sarah Connor',
    category: 'Report Card',
    iconColor: 'red'
  },
  {
    id: 14,
    title: 'Parent Consent Form - Field Trip',
    meta: '2026-04-12 . 250KB . By Admin Office',
    category: 'Other',
    iconColor: 'green'
  },
  {
    id: 15,
    title: 'Library Membership - Liam Smith',
    meta: 'Liam Smith . 2026-01-20 . 85KB . By Library',
    category: 'ID Card',
    iconColor: 'blue'
  }
];

export default function Documents() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const getBadgeStyle = (category) => {
    switch(category) {
      case 'Certificates': return { bg: 'var(--green-light)', color: 'var(--green-main)' };
      case 'Report Card': return { bg: 'var(--purple-light)', color: 'var(--purple-main)' };
      case 'ID Card': return { bg: 'var(--yellow-light)', color: 'var(--yellow-main)' };
      case 'Other': return { bg: '#F1F5F9', color: '#64748B' };
      default: return { bg: '#F1F5F9', color: '#64748B' };
    }
  };

  const getIcon = (color) => {
    if (color === 'red') return <FileText size={18} color="var(--red-main)" />;
    if (color === 'blue') return <FileImage size={18} color="var(--blue-main)" />;
    if (color === 'green') return <ClipboardList size={18} color="var(--green-main)" />;
    return <FileText size={18} />;
  };

  const getIconBg = (color) => {
    if (color === 'red') return 'var(--red-light)';
    if (color === 'blue') return 'var(--blue-light)';
    if (color === 'green') return 'var(--green-light)';
    return '#F1F5F9';
  };

  const filteredDocuments = MOCK_DOCUMENTS.filter(doc => {
    // Tab logic
    if (activeTab === 'records' && !(doc.category === 'Report Card' || doc.category === 'ID Card')) return false;
    if (activeTab === 'certificates' && doc.category !== 'Certificates') return false;

    // Type filter logic
    if (typeFilter !== 'All Types' && doc.category !== typeFilter) return false;

    // Search logic
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!doc.title.toLowerCase().includes(query) && !doc.meta.toLowerCase().includes(query)) {
        return false;
      }
    }

    return true;
  });

  return (
    <>
      {/* Internal Tabs */}
      <div className="fees-tabs-container" style={{ marginTop: '10px' }}>
        <button 
          className={`fees-tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => { setActiveTab('all'); setTypeFilter('All Types'); }}
        >
          <Folder size={18} /> All documents
        </button>
        <button 
          className={`fees-tab ${activeTab === 'records' ? 'active' : ''}`}
          onClick={() => { setActiveTab('records'); setTypeFilter('All Types'); }}
        >
          <Folder size={18} /> Student records
        </button>
        <button 
          className={`fees-tab ${activeTab === 'certificates' ? 'active' : ''}`}
          onClick={() => { setActiveTab('certificates'); setTypeFilter('Certificates'); }}
        >
          <Award size={18} /> Certificates
        </button>
      </div>

      {/* Filters */}
      <div className="table-controls" style={{ marginBottom: '16px' }}>
        <div className="att-filters-left">
          <div className="table-search" style={{ width: '280px' }}>
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search Student or roll no......" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div style={{ position: 'relative' }}>
            <div 
              className="filter-btn" 
              style={{ padding: '10px 16px', color: '#64748B', cursor: 'pointer' }}
              onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            >
              {typeFilter} <ChevronDown size={16} />
            </div>
            {showTypeDropdown && (
              <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '8px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', zIndex: 10, width: '160px', overflow: 'hidden' }}>
                {['All Types', 'Certificates', 'Report Card', 'ID Card', 'Other'].map(type => (
                  <div 
                    key={type}
                    style={{ padding: '10px 16px', cursor: 'pointer', background: typeFilter === type ? '#F1F5F9' : 'white', fontSize: '14px', color: '#1E293B' }}
                    onClick={() => {
                      setTypeFilter(type);
                      setShowTypeDropdown(false);
                      // Update active tab logic dynamically based on selected type
                      if (type === 'Certificates') setActiveTab('certificates');
                      else if (type === 'Report Card' || type === 'ID Card') setActiveTab('records');
                      else setActiveTab('all');
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                    onMouseLeave={(e) => e.currentTarget.style.background = typeFilter === type ? '#F1F5F9' : 'white'}
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="documents-list-container">
        {filteredDocuments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
            No documents found matching your criteria.
          </div>
        ) : (
          filteredDocuments.map(doc => {
            const badgeStyle = getBadgeStyle(doc.category);
            return (
              <div key={doc.id} className="document-list-item">
                <div className="doc-info-left">
                  <div className="doc-icon" style={{ backgroundColor: getIconBg(doc.iconColor) }}>
                    {getIcon(doc.iconColor)}
                  </div>
                  <div className="doc-text">
                    <h3>{doc.title}</h3>
                    <p>{doc.meta}</p>
                  </div>
                </div>
                <div className="doc-actions-right">
                  <span className="doc-badge" style={{ backgroundColor: badgeStyle.bg, color: badgeStyle.color }}>
                    {doc.category}
                  </span>
                  <button className="icon-btn doc-action-btn"><Upload size={18} color="#0F172A" /></button>
                  <button className="icon-btn doc-action-btn"><Trash2 size={18} color="var(--red-main)" /></button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
