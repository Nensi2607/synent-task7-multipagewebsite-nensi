import React, { useState } from 'react';
import API from '../api';
import { toast } from 'react-toastify';

const faqs = [
  { q: 'Who can use CampusConnect?', a: 'Students, parents, and educational institution admins can all use CampusConnect with role-specific dashboards.' },
  { q: 'Is CampusConnect free to use?', a: 'Yes! CampusConnect is free for students and parents. Institutions can contact us for enterprise plans.' },
  { q: 'Can parents access student updates?', a: 'Yes, parents have a dedicated portal to stay informed about campus activities, events, and announcements.' },
  { q: 'How do I register for events?', a: 'Simply log in to your account, go to the Events page, and click "Register" on any upcoming event.' },
  { q: 'Is my data secure?', a: 'Yes, we use industry-standard JWT authentication and bcrypt password hashing to keep your data safe.' },
  { q: 'Can I reset my password?', a: 'Yes, use the "Forgot Password" option on the login page to reset your password via email.' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/contact', form);
      toast.success('Message sent successfully! We will get back to you soon. 📬');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message. Please try again.');
    }
    setLoading(false);
  };

  return (
    <>
      <div className="page-hero">
        <h1>📬 Contact Us</h1>
        <p>Have questions? We're here to help you.</p>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
            {/* Contact Form */}
            <div className="form-card">
              <h2 className="form-title">Send us a Message</h2>
              <p className="form-subtitle">Fill out the form and we'll get back to you within 24 hours.</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input name="subject" placeholder="What is this regarding?" value={form.subject} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea name="message" placeholder="Write your message here..." value={form.message} onChange={handleChange} rows={6} required />
                </div>
                <button type="submit" className="btn btn-indigo" style={{ width: '100%' }} disabled={loading}>
                  {loading ? 'Sending...' : '📤 Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Get in Touch</h2>
              {[
                { icon: '📍', title: 'Address', info: 'CampusConnect HQ, Ahmedabad, Gujarat 380001' },
                { icon: '📧', title: 'Email', info: 'support@campusconnect.in' },
                { icon: '📞', title: 'Phone', info: '+91 98765 43210' },
                { icon: '⏰', title: 'Support Hours', info: 'Mon–Sat, 9:00 AM – 6:00 PM' },
              ].map((i) => (
                <div key={i.title} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', padding: '1rem', background: 'white', borderRadius: 10, border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '1.5rem' }}>{i.icon}</span>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.2rem' }}>{i.title}</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{i.info}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Quick answers to common questions</p>
          {faqs.map((faq, i) => (
            <div className="faq-item" key={i}>
              <div className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{faq.q}</span>
                <span>{openFaq === i ? '▲' : '▼'}</span>
              </div>
              {openFaq === i && <div className="faq-answer">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 CampusConnect | Designed by Nensi Shingala</p>
      </footer>
    </>
  );
};

export default Contact;
