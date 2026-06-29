import React, { useState, useEffect } from 'react';
import API from '../api';

const CATEGORIES = ['all', 'general', 'academic', 'event', 'placement', 'exam'];
const PRIORITIES = ['all', 'high', 'medium', 'low'];

const priorityBadge = (p) => {
  const map = { high: 'badge-danger', medium: 'badge-warning', low: 'badge-success' };
  return <span className={`badge ${map[p] || 'badge-primary'}`}>{p}</span>;
};
const categoryBadge = (c) => <span className="badge badge-info">{c}</span>;

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [priority, setPriority] = useState('all');

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const params = {};
      if (category !== 'all') params.category = category;
      if (priority !== 'all') params.priority = priority;
      const { data } = await API.get('/announcements', { params });
      setAnnouncements(data.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchAnnouncements(); }, [category, priority]);

  return (
    <>
      <div className="page-hero">
        <h1>📢 Announcements</h1>
        <p>Stay updated with the latest campus notices and important information</p>
      </div>

      <section className="section">
        <div className="container">
          {/* Filters */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem', alignItems: 'center' }}>
            <div>
              <label style={{ fontWeight: 600, marginRight: '0.5rem', fontSize: '0.9rem' }}>Category:</label>
              <select className="form-group" style={{ display: 'inline-block', width: 'auto', padding: '0.5rem 1rem', borderRadius: 8, border: '1.5px solid var(--border)' }}
                value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontWeight: 600, marginRight: '0.5rem', fontSize: '0.9rem' }}>Priority:</label>
              <select style={{ display: 'inline-block', width: 'auto', padding: '0.5rem 1rem', borderRadius: 8, border: '1.5px solid var(--border)', fontFamily: 'Poppins', fontSize: '0.9rem' }}
                value={priority} onChange={(e) => setPriority(e.target.value)}>
                {PRIORITIES.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading"><div className="spinner"></div></div>
          ) : announcements.length === 0 ? (
            <div className="alert alert-info">No announcements found. Check back later!</div>
          ) : (
            announcements.map((a) => (
              <div key={a._id} className={`announcement-card ${a.priority}`}>
                <div className="announcement-meta">
                  {priorityBadge(a.priority)}
                  {categoryBadge(a.category)}
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {new Date(a.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  {a.author && <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>— {a.author.name}</span>}
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>{a.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{a.content}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 CampusConnect</p>
      </footer>
    </>
  );
};

export default Announcements;
