import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [role, setRole] = useState('admin'); // 'admin' or 'teacher'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');

    if (role === 'admin') {
      if (email.trim() === 'admin@gmail.com' && password === '1234') {
        onLogin('admin');
      } else {
        setError('Invalid admin credentials.');
      }
    } else if (role === 'teacher') {
      if (email.trim() === 'teacher@gmail.com' && password === '12345') {
        onLogin('teacher');
      } else {
        setError('Invalid teacher credentials.');
      }
    } else if (role === 'parent') {
      let storedParents = localStorage.getItem('MOCK_PARENTS');
      let parents = [];
      if (storedParents) {
        parents = JSON.parse(storedParents);
      } else {
        parents = [
          { id: 'PAR-5003', name: 'Robert Chen', email: 'r.chen@example.com', phone: '+1 234 567 8903', children: 'David Chen', status: 'Active', joined: 'Oct 18, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267043' },
          { id: 'PAR-5001', name: 'Michael Johnson', email: 'm.johnson@example.com', phone: '+1 234 567 8901', children: 'Alex Johnson', status: 'Active', joined: 'Oct 24, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267041' },
          { id: 'PAR-5002', name: 'Emma Williams', email: 'e.williams@example.com', phone: '+1 234 567 8902', children: 'Sarah Williams', status: 'Active', joined: 'Oct 22, 2023', avatar: 'https://i.pravatar.cc/150?u=c042581f4e290267042' }
        ];
        localStorage.setItem('MOCK_PARENTS', JSON.stringify(parents));
      }

      const inputEmail = email.trim().toLowerCase();
      let parentUser = null;
      if (inputEmail === 'parent@gmail.com') {
        parentUser = parents.find(p => p.id === 'PAR-5003') || parents[0];
      } else {
        parentUser = parents.find(p => p.email.toLowerCase() === inputEmail);
      }

      if (parentUser && password === '123456') {
        onLogin('parent', parentUser);
      } else {
        setError('Invalid parent credentials. Try parent@gmail.com / 123456.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>
      
      <div className="login-card animate-fade-in-up">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign into your EduSmart account</p>
        </div>

        <div className="login-role-toggle" style={{ gridTemplateColumns: 'repeat(3, 1fr)', display: 'grid', gap: '8px' }}>
          <button 
            className={`role-btn ${role === 'admin' ? 'active' : ''}`}
            onClick={() => { setRole('admin'); setError(''); }}
            type="button"
          >
            Admin
          </button>
          <button 
            className={`role-btn ${role === 'teacher' ? 'active' : ''}`}
            onClick={() => { setRole('teacher'); setError(''); }}
            type="button"
          >
            Teacher
          </button>
          <button 
            className={`role-btn ${role === 'parent' ? 'active' : ''}`}
            onClick={() => { setRole('parent'); setError(''); }}
            type="button"
          >
            Parent
          </button>
        </div>

        <form onSubmit={handleSignIn} className="login-form">
          {error && (
            <div style={{ color: '#EF4444', fontSize: '13px', backgroundColor: '#FEF2F2', padding: '10px', borderRadius: '6px', border: '1px solid #FCA5A5', marginBottom: '16px', textAlign: 'center' }}>
              {error}
            </div>
          )}
          <div className="login-form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-submit-btn">
            Sign in
          </button>
          
          <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '12px', color: '#64748B', background: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            {role === 'admin' && 'Demo: admin@gmail.com (pwd: 1234)'}
            {role === 'teacher' && 'Demo: teacher@gmail.com (pwd: 12345)'}
            {role === 'parent' && 'Demo: parent@gmail.com or r.chen@example.com (pwd: 123456)'}
          </div>
        </form>
      </div>
    </div>
  );
}
