import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const missions = [
    { icon: '🎯', title: 'Student Support', desc: 'Helping students access important academic resources and campus information easily and quickly.' },
    { icon: '👪', title: 'Parent Engagement', desc: 'Keeping parents informed about campus activities, announcements, and student progress in real time.' },
    { icon: '💡', title: 'Digital Campus', desc: 'Creating a smart and connected campus ecosystem through modern digital solutions and MERN stack technology.' },
  ];

  const team = [
    { name: 'Nensi Shingala', role: 'Full Stack Developer', icon: '👩‍💻' },
    { name: 'Campus Admin', role: 'Platform Administrator', icon: '🏫' },
    { name: 'Tech Team', role: 'MERN Stack Engineers', icon: '⚙️' },
  ];

  return (
    <>
      <div className="page-hero">
        <h1>About CampusConnect</h1>
        <p>Bridging the gap between students, parents, and institutions</p>
      </div>

      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>What is CampusConnect?</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.8 }}>
                CampusConnect is a smart digital platform designed to improve communication and
                accessibility between students, parents, and educational institutions.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.8 }}>
                Our goal is to simplify campus life by providing quick access to academic resources,
                campus updates, event notifications, and student support services — all powered by
                a robust MERN stack backend.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                We aim to create a connected and modern educational environment that enhances
                student experience and keeps parents engaged with campus life.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[['🎓', '5000+', 'Students'], ['📢', '200+', 'Announcements'], ['🗓️', '100+', 'Events'], ['👨‍🏫', '50+', 'Faculty']].map(([icon, num, label]) => (
                <div key={label} className="card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
                  <h3 style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>{num}</h3>
                  <p style={{ fontSize: '0.85rem' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-subtitle">What drives us to build better campus technology</p>
          <div className="grid-3">
            {missions.map((m) => (
              <div className="card" key={m.title}>
                <div className="card-icon">{m.icon}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <h2 className="section-title">Technology Stack</h2>
          <p className="section-subtitle">Built with modern, scalable technologies</p>
          <div className="grid-3">
            {[
              { icon: '⚛️', title: 'React.js (Frontend)', desc: 'Modern, responsive UI with React Router and Context API for state management.' },
              { icon: '🟢', title: 'Node.js + Express (Backend)', desc: 'RESTful API with JWT authentication, role-based access, and secure routes.' },
              { icon: '🍃', title: 'MongoDB (Database)', desc: 'Flexible NoSQL database with Mongoose ODM for users, events, and announcements.' },
            ].map((t) => (
              <div className="card" key={t.title}>
                <div className="card-icon">{t.icon}</div>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', textAlign: 'center' }}>
        <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>Join CampusConnect Today</h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2rem' }}>Be part of a smarter campus community</p>
        <Link to="/register" className="btn btn-primary">Get Started Free</Link>
      </section>

      <footer className="footer">
        <p>© 2026 CampusConnect | Designed by Nensi Shingala</p>
      </footer>
    </>
  );
};

export default About;
