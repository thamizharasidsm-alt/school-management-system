import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const NOTIFICATIONS = [
  {
    id: 1,
    group: 'Today',
    title: 'New Admission Request',
    description: 'A new admission request has been submitted for Grade 5',
    time: '08.30AM',
    type: 'info-check'
  },
  {
    id: 2,
    group: 'Today',
    title: 'Fee payment overdue',
    description: '12 students have overdue fee payments',
    time: '07.15AM',
    type: 'warning'
  },
  {
    id: 3,
    group: 'Today',
    title: 'Attendance Alert',
    description: 'Attendance below 75% for 5 students this week.',
    time: '09.00AM',
    type: 'warning'
  },
  {
    id: 4,
    group: 'Yesterday',
    title: 'System update',
    description: 'System will undergo maintenance at midnight',
    time: '08.30AM',
    type: 'info-alert'
  },
  {
    id: 5,
    group: 'Yesterday',
    title: 'New exam schedule posted',
    description: 'Term 1 exam schedule has been published for all grades',
    time: '07.15AM',
    type: 'info-alert'
  },
  {
    id: 6,
    group: 'Yesterday',
    title: 'Grade 5A Attendance marked',
    description: 'Class teacher has marked attendance for Grade 5A',
    time: '09.00AM',
    type: 'success'
  },
  {
    id: 7,
    group: 'Earlier',
    title: 'Approval Request',
    description: 'Sarah connor submitted a leave request',
    time: '08.30AM',
    type: 'info-alert'
  },
  {
    id: 8,
    group: 'Earlier',
    title: 'Student Fee payment Received',
    description: 'Liam smith paid $5,200 tution fee for term 1',
    time: '07.15AM',
    type: 'success'
  }
];

export default function CommunicationNotifications() {
  const getIcon = (type) => {
    switch(type) {
      case 'info-check':
        return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#EFF6FF', color: '#3B82F6', flexShrink: 0 }}><CheckCircle2 size={20} /></div>;
      case 'warning':
        return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FFF7ED', color: '#F97316', flexShrink: 0 }}><AlertCircle size={20} /></div>;
      case 'info-alert':
        return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#EFF6FF', color: '#3B82F6', flexShrink: 0 }}><AlertCircle size={20} /></div>;
      case 'success':
        return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F0FDF4', color: '#22C55E', flexShrink: 0 }}><CheckCircle2 size={20} /></div>;
      default:
        return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F1F5F9', color: '#64748B', flexShrink: 0 }}><Info size={20} /></div>;
    }
  };

  const groupedNotifications = NOTIFICATIONS.reduce((acc, notif) => {
    if (!acc[notif.group]) acc[notif.group] = [];
    acc[notif.group].push(notif);
    return acc;
  }, {});

  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '32px' }}>
      {Object.entries(groupedNotifications).map(([group, notifications], groupIndex) => (
        <div key={group} style={{ marginBottom: groupIndex === Object.keys(groupedNotifications).length - 1 ? '0' : '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0F172A', marginBottom: '24px', marginTop: 0 }}>{group}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {notifications.map((notif) => (
              <div key={notif.id} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {getIcon(notif.type)}
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600, color: '#0F172A' }}>{notif.title}</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>{notif.description}</p>
                  </div>
                </div>
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A' }}>{notif.time}</span>
              </div>
            ))}
          </div>
          {groupIndex !== Object.keys(groupedNotifications).length - 1 && (
            <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '32px 0 0 0' }} />
          )}
        </div>
      ))}
    </div>
  );
}
