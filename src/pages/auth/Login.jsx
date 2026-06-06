import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [role, setRole] = useState('admin'); // 'admin' or 'teacher'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin(role);
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

        <div className="login-role-toggle">
          <button 
            className={`role-btn ${role === 'admin' ? 'active' : ''}`}
            onClick={() => setRole('admin')}
            type="button"
          >
            Admin
          </button>
          <button 
            className={`role-btn ${role === 'teacher' ? 'active' : ''}`}
            onClick={() => setRole('teacher')}
            type="button"
          >
            Teacher
          </button>
        </div>

        <form onSubmit={handleSignIn} className="login-form">
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
        </form>
      </div>
    </div>
  );
}
