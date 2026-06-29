import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const features = [
    { icon: '📢', title: 'Campus Announcements', desc: 'Stay updated with real-time notices, exam schedules, and important campus updates.' },
    { icon: '📚', title: 'Study Resources', desc: 'Access academic materials, notes, and learning resources all in one place.' },
    { icon: '👨‍👩‍👧', title: 'Parent Portal', desc: 'Keep parents informed about events, performance, and campus activities.' },
    { icon: '🗓️', title: 'Event Management', desc: 'Discover and register for campus events, workshops, and cultural fests.' },
    { icon: '🚌', title: 'Transport Updates', desc: 'Get real-time bus schedules and transport information.' },
    { icon: '🎓', title: 'Placement Updates', desc: 'Never miss placement drives, internship opportunities, and career events.' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <h1>Smart Campus Helper Platform 🎓</h1>
          <p>
            Connecting students, parents, and colleges through one modern
            and interactive digital platform — all in one place.
          </p>
          <div className="hero-buttons">
            {user ? (
              <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary">Get Started Free</Link>
                <Link to="/about" className="btn btn-secondary">Learn More</Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <h2 className="section-title">Everything Your Campus Needs</h2>
          <p className="section-subtitle">A complete digital platform built for modern educational institutions</p>
          <div className="grid-3">
            {features.map((f, i) => (
              <div className="card" key={i}>
                <div className="card-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stats-grid">
          {[['5,000+', 'Students Connected'], ['100+', 'Campus Events'], ['50+', 'Faculty Members'], ['24/7', 'Support Available']].map(([num, label], i) => (
            <div className="stat-card" key={i}>
              <h2>{num}</h2>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: 'center', background: 'white' }}>
        <div className="container">
          <h2 className="section-title">Ready to Transform Your Campus Experience?</h2>
          <p className="section-subtitle">Join thousands of students and parents already using CampusConnect</p>
          {!user && (
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn btn-indigo">Create Free Account</Link>
              <Link to="/services" className="btn btn-outline">Explore Services</Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 CampusConnect | Built with ❤️ using MERN Stack | Designed by Nensi Shingala</p>
      </footer>
    </>
  );
};

export default Home;
