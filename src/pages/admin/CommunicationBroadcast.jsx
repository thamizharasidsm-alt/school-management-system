import React, { useState } from 'react';
import { Radio, Mail, MessageSquare, Users, Send, ArrowUp, CheckCircle2 } from 'lucide-react';

export default function CommunicationBroadcast() {
  const [channel, setChannel] = useState('email');
  const [recipient, setRecipient] = useState('all_students');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) {
      alert("Please enter a subject and a message.");
      return;
    }
    
    // Simulate API call and show success message
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setSubject('');
      setMessage('');
      setChannel('email');
      setRecipient('all_students');
    }, 3000);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
      {/* Left Panel: Send Broadcast */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '32px', border: '1px solid #E2E8F0' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0F172A', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Radio size={20} color="#0F172A" /> Send Broadcast
        </h2>

        {/* Broadcast Channel */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#0F172A', marginBottom: '16px' }}>Broadcast channel</h3>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div 
              onClick={() => setChannel('email')}
              style={{ flex: 1, border: channel === 'email' ? '1px solid var(--blue-main)' : '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', cursor: 'pointer', background: channel === 'email' ? '#EFF6FF' : 'white' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: channel === 'email' ? 'var(--blue-main)' : '#64748B' }}>
                <Mail size={16} /> <span style={{ fontSize: '14px', fontWeight: 600 }}>Email</span>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>Send rich HTML email to selected groups.</p>
            </div>
            
            <div 
              onClick={() => setChannel('sms')}
              style={{ flex: 1, border: channel === 'sms' ? '1px solid var(--blue-main)' : '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', cursor: 'pointer', background: channel === 'sms' ? '#EFF6FF' : 'white' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: channel === 'sms' ? 'var(--blue-main)' : '#64748B' }}>
                <MessageSquare size={16} /> <span style={{ fontSize: '14px', fontWeight: 600 }}>SMS</span>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>Send SMS to registered phone numbers</p>
            </div>

            <div 
              onClick={() => setChannel('both')}
              style={{ flex: 1, border: channel === 'both' ? '1px solid var(--blue-main)' : '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', cursor: 'pointer', background: channel === 'both' ? '#EFF6FF' : 'white' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: channel === 'both' ? 'var(--blue-main)' : '#64748B' }}>
                <Radio size={16} /> <span style={{ fontSize: '14px', fontWeight: 600 }}>Email & SMS</span>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>Multi channel broadcast to maximum reach</p>
            </div>
          </div>
        </div>

        {/* Recipient Group */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#0F172A', marginBottom: '16px' }}>Recipient Group</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div 
              onClick={() => setRecipient('all_students')}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: recipient === 'all_students' ? '1px solid var(--blue-main)' : '1px solid #E2E8F0', borderRadius: '24px', padding: '12px 20px', cursor: 'pointer', background: recipient === 'all_students' ? '#EFF6FF' : 'white' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontWeight: 500, fontSize: '14px' }}>
                <Users size={16} /> All Students
              </div>
              <span style={{ fontSize: '14px', color: '#64748B' }}>512</span>
            </div>

            <div 
              onClick={() => setRecipient('all_parents')}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: recipient === 'all_parents' ? '1px solid var(--blue-main)' : '1px solid #E2E8F0', borderRadius: '24px', padding: '12px 20px', cursor: 'pointer', background: recipient === 'all_parents' ? '#EFF6FF' : 'white' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontWeight: 500, fontSize: '14px' }}>
                <Users size={16} /> All Parents
              </div>
              <span style={{ fontSize: '14px', color: '#64748B' }}>248</span>
            </div>

            <div 
              onClick={() => setRecipient('all_staff')}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: recipient === 'all_staff' ? '1px solid var(--blue-main)' : '1px solid #E2E8F0', borderRadius: '24px', padding: '12px 20px', cursor: 'pointer', background: recipient === 'all_staff' ? '#EFF6FF' : 'white' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontWeight: 500, fontSize: '14px' }}>
                <Users size={16} /> All Staff
              </div>
              <span style={{ fontSize: '14px', color: '#64748B' }}>47</span>
            </div>

            <div 
              onClick={() => setRecipient('specific_class')}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: recipient === 'specific_class' ? '1px solid var(--blue-main)' : '1px solid #E2E8F0', borderRadius: '24px', padding: '12px 20px', cursor: 'pointer', background: recipient === 'specific_class' ? '#EFF6FF' : 'white' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontWeight: 500, fontSize: '14px' }}>
                <Users size={16} /> Specific class
              </div>
              <span style={{ fontSize: '14px', color: '#64748B' }}>32</span>
            </div>
          </div>
        </div>

        {/* Subject */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#0F172A', marginBottom: '12px' }}>Subject</h3>
          <input 
            type="text" 
            placeholder="Eg Term 2 Fee Reminder" 
            value={subject}
            onChange={e => setSubject(e.target.value)}
            style={{ width: '100%', padding: '14px', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '14px', color: '#0F172A' }}
          />
        </div>

        {/* Message */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#0F172A', marginBottom: '12px' }}>Message</h3>
          <textarea 
            rows="5"
            placeholder="Write your message........." 
            value={message}
            onChange={e => setMessage(e.target.value)}
            style={{ width: '100%', padding: '14px', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '14px', color: '#0F172A', resize: 'vertical' }}
          />
        </div>

        {/* Send Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            {isSent && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontSize: '14px', fontWeight: 500, background: '#D1FAE5', padding: '8px 16px', borderRadius: '24px' }}>
                <CheckCircle2 size={16} /> Broadcast sent successfully!
              </span>
            )}
          </div>
          <button 
            className="btn-primary" 
            style={{ padding: '12px 24px', fontSize: '14px', borderRadius: '24px', opacity: isSent ? 0.7 : 1, pointerEvents: isSent ? 'none' : 'auto' }}
            onClick={handleSend}
          >
            <Send size={16} style={{ marginRight: '8px' }} /> Send Broadcast
          </button>
        </div>
      </div>

      {/* Right Panel: Stats Broadcast */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '32px', border: '1px solid #E2E8F0' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0F172A', marginBottom: '48px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Radio size={20} color="#0F172A" /> Stats Broadcast
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Card 1: Recipients */}
          <div style={{ 
            width: '75%', 
            background: 'white', 
            borderRadius: '12px', 
            padding: '24px', 
            borderLeft: '6px solid #10B981',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            borderTop: '1px solid #F1F5F9',
            borderRight: '1px solid #F1F5F9',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginRight: 'auto'
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#D1FAE5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>512+</h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>Recepitents</p>
            </div>
          </div>

          {/* Card 2: Total Sent */}
          <div style={{ 
            width: '75%', 
            background: 'white', 
            borderRadius: '12px', 
            padding: '24px', 
            borderLeft: '6px solid #3B82F6',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            borderTop: '1px solid #F1F5F9',
            borderRight: '1px solid #F1F5F9',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginLeft: 'auto'
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#DBEAFE', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowUp size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>807</h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>Total Sent</p>
            </div>
          </div>

          {/* Card 3: Email */}
          <div style={{ 
            width: '75%', 
            background: 'white', 
            borderRadius: '12px', 
            padding: '24px', 
            borderLeft: '6px solid #A855F7',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            borderTop: '1px solid #F1F5F9',
            borderRight: '1px solid #F1F5F9',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginRight: 'auto'
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#F3E8FF', color: '#A855F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mail size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>3</h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>Email</p>
            </div>
          </div>

          {/* Card 4: SMS */}
          <div style={{ 
            width: '75%', 
            background: 'white', 
            borderRadius: '12px', 
            padding: '24px', 
            borderLeft: '6px solid #F59E0B',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            borderTop: '1px solid #F1F5F9',
            borderRight: '1px solid #F1F5F9',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginLeft: 'auto'
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#FEF3C7', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquare size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#0F172A' }}>1</h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>SMS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
