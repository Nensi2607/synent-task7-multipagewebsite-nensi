import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    role: 'student', rollNumber: '', department: '', year: '', phone: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const { confirmPassword, ...data } = form;
      await register(data);
      toast.success('Account created successfully! Welcome to CampusConnect 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page" style={{ padding: '2rem' }}>
      <div className="auth-card" style={{ maxWidth: 540 }}>
        <div className="form-card">
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎓</div>
            <h2 className="form-title">Create Account</h2>
            <p className="form-subtitle">Join CampusConnect today</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Full Name *</label>
                <input name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Role *</label>
                <select name="role" value={form.role} onChange={handleChange}>
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Password *</label>
                <input type="password" name="password" placeholder="Min 6 characters" value={form.password} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Confirm Password *</label>
                <input type="password" name="confirmPassword" placeholder="Repeat password" value={form.confirmPassword} onChange={handleChange} required />
              </div>
            </div>
            {form.role === 'student' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Roll Number</label>
                  <input name="rollNumber" placeholder="e.g. CS2021001" value={form.rollNumber} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input name="department" placeholder="e.g. CSE" value={form.department} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Year</label>
                  <select name="year" value={form.year} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
              </div>
            )}
            <div className="form-group">
              <label>Phone Number</label>
              <input name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-indigo" style={{ width: '100%', padding: '0.875rem', fontSize: '1rem' }} disabled={loading}>
              {loading ? 'Creating Account...' : '🚀 Create Account'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
