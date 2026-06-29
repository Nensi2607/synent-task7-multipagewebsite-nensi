import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api';
import { toast } from 'react-toastify';

// ─── Student Dashboard ───────────────────────────────────────────
const StudentDashboard = ({ user }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get('/announcements').then(({ data }) => setAnnouncements(data.data.slice(0, 5)));
    API.get('/events', { params: { status: 'upcoming' } }).then(({ data }) => setEvents(data.data.slice(0, 4)));
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: '0.25rem' }}>Welcome back, {user.name}! 👋</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{user.department || 'Student'} {user.year ? `— Year ${user.year}` : ''} {user.rollNumber ? `| ${user.rollNumber}` : ''}</p>

      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        {[['📢', 'Announcements', announcements.length, '#ede9fe'], ['🗓️', 'Upcoming Events', events.length, '#dbeafe'], ['🎓', 'My Role', user.role, '#d1fae5']].map(([icon, label, val, bg]) => (
          <div key={label} style={{ background: bg, borderRadius: 'var(--radius)', padding: '1.5rem', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{icon}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{val}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div>
          <h3 style={{ marginBottom: '1rem' }}>📢 Latest Announcements</h3>
          {announcements.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No announcements yet.</p> : announcements.map((a) => (
            <div key={a._id} className={`announcement-card ${a.priority}`} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <strong style={{ fontSize: '0.95rem' }}>{a.title}</strong>
                <span className={`badge badge-${a.priority === 'high' ? 'danger' : a.priority === 'medium' ? 'warning' : 'success'}`}>{a.priority}</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{a.content.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>🗓️ Upcoming Events</h3>
          {events.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No upcoming events.</p> : events.map((e) => (
            <div key={e._id} className="card" style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <strong style={{ fontSize: '0.95rem' }}>{e.title}</strong>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '0.25rem' }}>
                    📅 {new Date(e.date).toLocaleDateString()} • 📍 {e.location}
                  </div>
                </div>
                <span className="badge badge-info">{e.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Admin Dashboard ──────────────────────────────────────────────
const AdminDashboard = ({ activeView, setActiveView }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    API.get('/announcements').then(({ data }) => setAnnouncements(data.data));
    API.get('/events').then(({ data }) => setEvents(data.data));
    API.get('/contact').then(({ data }) => setContacts(data.data));
    API.get('/users').then(({ data }) => setUsers(data.data));
  }, []);

  const createAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await API.post('/announcements', form);
      toast.success('Announcement created!');
      setShowForm(false);
      setForm({});
      const { data } = await API.get('/announcements');
      setAnnouncements(data.data);
    } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
  };

  const deleteAnnouncement = async (id) => {
    if (!window.confirm('Delete this announcement?')) return;
    await API.delete(`/announcements/${id}`);
    setAnnouncements(announcements.filter((a) => a._id !== id));
    toast.success('Deleted!');
  };

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      await API.post('/events', form);
      toast.success('Event created!');
      setShowForm(false);
      setForm({});
      const { data } = await API.get('/events');
      setEvents(data.data);
    } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    await API.delete(`/events/${id}`);
    setEvents(events.filter((ev) => ev._id !== id));
    toast.success('Deleted!');
  };

  const views = {
    overview: (
      <div>
        <h2 style={{ marginBottom: '2rem' }}>Admin Overview 📊</h2>
        <div className="grid-3" style={{ marginBottom: '2rem' }}>
          {[['👥', 'Total Users', users.length, '#ede9fe'], ['📢', 'Announcements', announcements.length, '#dbeafe'], ['🗓️', 'Events', events.length, '#d1fae5'], ['📬', 'Messages', contacts.length, '#fef3c7']].map(([icon, label, val, bg]) => (
            <div key={label} style={{ background: bg, borderRadius: 'var(--radius)', padding: '1.5rem', border: '1px solid var(--border)', cursor: 'pointer' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>{val}</div>
              <div style={{ color: 'var(--text-muted)' }}>{label}</div>
            </div>
          ))}
        </div>
        <div className="alert alert-info">Use the sidebar to manage announcements, events, users, and contact messages.</div>
      </div>
    ),
    announcements: (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Announcements</h2>
          <button className="btn btn-indigo btn-sm" onClick={() => { setShowForm(!showForm); setForm({ category: 'general', priority: 'medium' }); }}>
            {showForm ? 'Cancel' : '+ New Announcement'}
          </button>
        </div>
        {showForm && (
          <div className="form-card" style={{ marginBottom: '1.5rem' }}>
            <form onSubmit={createAnnouncement}>
              <div className="form-group"><label>Title *</label><input required onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div className="form-group"><label>Content *</label><textarea required rows={4} onChange={(e) => setForm({ ...form, content: e.target.value })} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group"><label>Category</label><select onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {['general', 'academic', 'event', 'placement', 'exam'].map((c) => <option key={c} value={c}>{c}</option>)}
                </select></div>
                <div className="form-group"><label>Priority</label><select onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                  {['low', 'medium', 'high'].map((p) => <option key={p} value={p}>{p}</option>)}
                </select></div>
              </div>
              <button type="submit" className="btn btn-indigo">Create Announcement</button>
            </form>
          </div>
        )}
        <div className="table-wrap">
          <table>
            <thead><tr><th>Title</th><th>Category</th><th>Priority</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {announcements.map((a) => (
                <tr key={a._id}>
                  <td><strong>{a.title}</strong></td>
                  <td><span className="badge badge-info">{a.category}</span></td>
                  <td><span className={`badge badge-${a.priority === 'high' ? 'danger' : a.priority === 'medium' ? 'warning' : 'success'}`}>{a.priority}</span></td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(a.createdAt).toLocaleDateString()}</td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => deleteAnnouncement(a._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    events: (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Events</h2>
          <button className="btn btn-indigo btn-sm" onClick={() => { setShowForm(!showForm); setForm({ category: 'academic', status: 'upcoming', maxCapacity: 100 }); }}>
            {showForm ? 'Cancel' : '+ New Event'}
          </button>
        </div>
        {showForm && (
          <div className="form-card" style={{ marginBottom: '1.5rem' }}>
            <form onSubmit={createEvent}>
              <div className="form-group"><label>Title *</label><input required onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div className="form-group"><label>Description *</label><textarea required rows={3} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group"><label>Date *</label><input type="date" required onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
                <div className="form-group"><label>Time *</label><input type="time" required onChange={(e) => setForm({ ...form, time: e.target.value })} /></div>
                <div className="form-group"><label>Location *</label><input required onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
                <div className="form-group"><label>Max Capacity</label><input type="number" defaultValue={100} onChange={(e) => setForm({ ...form, maxCapacity: e.target.value })} /></div>
                <div className="form-group"><label>Category</label><select onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {['cultural', 'technical', 'sports', 'academic', 'workshop'].map((c) => <option key={c} value={c}>{c}</option>)}
                </select></div>
              </div>
              <button type="submit" className="btn btn-indigo">Create Event</button>
            </form>
          </div>
        )}
        <div className="table-wrap">
          <table>
            <thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Registered</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev._id}>
                  <td><strong>{ev.title}</strong></td>
                  <td><span className="badge badge-info">{ev.category}</span></td>
                  <td style={{ fontSize: '0.85rem' }}>{new Date(ev.date).toLocaleDateString()}</td>
                  <td>{ev.registeredStudents?.length || 0} / {ev.maxCapacity}</td>
                  <td><span className={`badge badge-${ev.status === 'upcoming' ? 'info' : ev.status === 'ongoing' ? 'success' : 'warning'}`}>{ev.status}</span></td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => deleteEvent(ev._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    messages: (
      <div>
        <h2 style={{ marginBottom: '1.5rem' }}>Contact Messages 📬</h2>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Subject</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c._id}>
                  <td><strong>{c.name}</strong></td>
                  <td style={{ fontSize: '0.85rem' }}>{c.email}</td>
                  <td style={{ fontSize: '0.85rem' }}>{c.subject || 'General'}</td>
                  <td><span className={`badge badge-${c.status === 'unread' ? 'danger' : c.status === 'read' ? 'warning' : 'success'}`}>{c.status}</span></td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    users: (
      <div>
        <h2 style={{ marginBottom: '1.5rem' }}>All Users 👥</h2>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Department</th><th>Joined</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td><strong>{u.name}</strong></td>
                  <td style={{ fontSize: '0.85rem' }}>{u.email}</td>
                  <td><span className={`badge badge-${u.role === 'admin' ? 'danger' : u.role === 'parent' ? 'warning' : 'info'}`}>{u.role}</span></td>
                  <td style={{ fontSize: '0.85rem' }}>{u.department || '—'}</td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  };

  return views[activeView] || views.overview;
};

// ─── Main Dashboard ───────────────────────────────────────────────
const Dashboard = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('overview');
  const [editProfile, setEditProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({});

  if (!user) { navigate('/login'); return null; }

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileForm);
      toast.success('Profile updated!');
      setEditProfile(false);
    } catch { toast.error('Failed to update profile'); }
  };

  const adminLinks = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'announcements', label: '📢 Announcements' },
    { id: 'events', label: '🗓️ Events' },
    { id: 'messages', label: '📬 Messages' },
    { id: 'users', label: '👥 Users' },
  ];

  const studentLinks = [
    { id: 'overview', label: '🏠 Dashboard' },
    { id: 'profile', label: '👤 Profile' },
  ];

  const links = user.role === 'admin' ? adminLinks : studentLinks;

  return (
    <div className="dashboard-grid">
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ padding: '1rem', marginBottom: '1rem', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: 'var(--radius)', color: 'white' }}>
          <div style={{ fontWeight: 700, fontSize: '1rem' }}>{user.name}</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.85, marginTop: '0.2rem' }}>{user.email}</div>
          <span style={{ marginTop: '0.5rem', display: 'inline-block', background: 'rgba(255,255,255,0.25)', padding: '0.15rem 0.6rem', borderRadius: 20, fontSize: '0.75rem' }}>{user.role}</span>
        </div>
        {links.map(({ id, label }) => (
          <button key={id} className={`sidebar-link ${activeView === id ? 'active' : ''}`} onClick={() => setActiveView(id)}>
            {label}
          </button>
        ))}
        <hr style={{ margin: '1rem 0', borderColor: 'var(--border)' }} />
        <button className="sidebar-link" style={{ color: 'var(--danger)' }} onClick={() => { logout(); navigate('/'); }}>
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        {activeView === 'profile' ? (
          <div style={{ maxWidth: 500 }}>
            <h2 style={{ marginBottom: '1.5rem' }}>My Profile 👤</h2>
            {!editProfile ? (
              <div className="form-card">
                {[['Name', user.name], ['Email', user.email], ['Role', user.role], ['Department', user.department], ['Year', user.year && `Year ${user.year}`], ['Roll No', user.rollNumber], ['Phone', user.phone]].map(([label, val]) => val && (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{label}</span>
                    <span style={{ fontWeight: 600 }}>{val}</span>
                  </div>
                ))}
                <button className="btn btn-indigo" style={{ marginTop: '1.5rem', width: '100%' }} onClick={() => { setEditProfile(true); setProfileForm({ name: user.name, phone: user.phone, department: user.department, year: user.year, rollNumber: user.rollNumber }); }}>Edit Profile</button>
              </div>
            ) : (
              <div className="form-card">
                <form onSubmit={handleProfileSave}>
                  {[['name', 'Full Name', 'text'], ['phone', 'Phone', 'text'], ['department', 'Department', 'text'], ['rollNumber', 'Roll Number', 'text']].map(([key, label, type]) => (
                    <div className="form-group" key={key}>
                      <label>{label}</label>
                      <input type={type} value={profileForm[key] || ''} onChange={(e) => setProfileForm({ ...profileForm, [key]: e.target.value })} />
                    </div>
                  ))}
                  <div className="form-group">
                    <label>Year</label>
                    <select value={profileForm.year || ''} onChange={(e) => setProfileForm({ ...profileForm, year: e.target.value })}>
                      <option value="">Select</option>
                      {['1', '2', '3', '4'].map((y) => <option key={y} value={y}>Year {y}</option>)}
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" className="btn btn-indigo">Save Changes</button>
                    <button type="button" className="btn btn-outline" onClick={() => setEditProfile(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : user.role === 'admin' ? (
          <AdminDashboard activeView={activeView} setActiveView={setActiveView} />
        ) : (
          <StudentDashboard user={user} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
