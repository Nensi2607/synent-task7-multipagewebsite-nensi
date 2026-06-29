import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    { icon: '📢', title: 'Campus Announcements', desc: 'Get real-time notices about exams, holidays, and important college updates. Never miss a critical announcement again.', color: '#ede9fe', link: '/announcements' },
    { icon: '📚', title: 'Study Materials', desc: 'Access department-wise notes, previous papers, syllabi, and learning resources uploaded by faculty.', color: '#dbeafe', link: '#' },
    { icon: '🗓️', title: 'Event Management', desc: 'Register for cultural fests, technical events, workshops, and sports competitions directly through the platform.', color: '#d1fae5', link: '/events' },
    { icon: '👪', title: 'Parent Portal', desc: 'Parents can stay informed about student attendance, upcoming events, and campus notices through a dedicated dashboard.', color: '#fef3c7', link: '#' },
    { icon: '🚌', title: 'Transport Updates', desc: 'Real-time college bus schedules, route information, and transport notifications for commuting students.', color: '#fce7f3', link: '#' },
    { icon: '🎓', title: 'Student Support', desc: 'Access counseling resources, grievance forms, placement notifications, and academic help all in one place.', color: '#e0e7ff', link: '#' },
  ];

  return (
    <>
      <div className="page-hero">
        <h1>Our Services</h1>
        <p>Everything your campus needs in one powerful platform</p>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">What We Offer</h2>
          <p className="section-subtitle">Comprehensive tools to enhance your campus experience</p>
          <div className="grid-3">
            {services.map((s) => (
              <div className="card" key={s.title} style={{ borderTop: `4px solid var(--primary)` }}>
                <div className="card-icon" style={{ background: s.color }}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p style={{ marginBottom: '1rem' }}>{s.desc}</p>
                <Link to={s.link} className="btn btn-outline btn-sm">Explore →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title">Why Choose CampusConnect?</h2>
          <p className="section-subtitle">Built specifically for Indian educational institutions</p>
          <div className="grid-3" style={{ marginTop: '2rem' }}>
            {[
              { icon: '⚡', title: 'Fast & Reliable', desc: 'Real-time updates powered by a modern Node.js backend.' },
              { icon: '🔒', title: 'Secure', desc: 'JWT-based authentication and role-based access control.' },
              { icon: '📱', title: 'Mobile Friendly', desc: 'Fully responsive design that works on any device.' },
            ].map((f) => (
              <div key={f.title} style={{ padding: '2rem', borderRadius: 'var(--radius)', background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{f.icon}</div>
                <h3 style={{ marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 CampusConnect | Designed by Nensi Shingala</p>
      </footer>
    </>
  );
};

export default Services;
