import React, { useState, useEffect } from 'react';
import API from '../api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const CATEGORIES = ['all', 'cultural', 'technical', 'sports', 'academic', 'workshop'];

const Events = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [registering, setRegistering] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = {};
      if (category !== 'all') params.category = category;
      const { data } = await API.get('/events', { params });
      setEvents(data.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchEvents(); }, [category]);

  const isRegistered = (event) => user && event.registeredStudents?.some(s => (s._id || s) === user.id);

  const handleRegister = async (event) => {
    if (!user) { toast.error('Please login to register for events'); return; }
    setRegistering(event._id);
    try {
      if (isRegistered(event)) {
        await API.delete(`/events/${event._id}/register`);
        toast.success('Unregistered from event');
      } else {
        await API.post(`/events/${event._id}/register`);
        toast.success('Registered successfully! 🎉');
      }
      fetchEvents();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
    setRegistering(null);
  };

  const statusBadge = (s) => {
    const map = { upcoming: 'badge-info', ongoing: 'badge-success', completed: 'badge-warning' };
    return <span className={`badge ${map[s]}`}>{s}</span>;
  };

  return (
    <>
      <div className="page-hero">
        <h1>🗓️ Campus Events</h1>
        <p>Discover and register for exciting campus events and activities</p>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {CATEGORIES.map((c) => (
              <button key={c} className={`btn btn-sm ${category === c ? 'btn-indigo' : 'btn-outline'}`}
                onClick={() => setCategory(c)}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading"><div className="spinner"></div></div>
          ) : events.length === 0 ? (
            <div className="alert alert-info">No events found in this category.</div>
          ) : (
            <div className="grid-3">
              {events.map((event) => (
                <div className="event-card" key={event._id}>
                  <div className="event-header">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <span className="badge" style={{ background: 'rgba(255,255,255,0.25)', color: 'white' }}>{event.category}</span>
                      {statusBadge(event.status)}
                    </div>
                    <h3 style={{ color: 'white', fontSize: '1.15rem' }}>{event.title}</h3>
                  </div>
                  <div className="event-body">
                    <div className="event-meta" style={{ marginBottom: '1rem' }}>
                      <span>📅 {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} — {event.time}</span>
                      <span>📍 {event.location}</span>
                      <span>👥 {event.registeredStudents?.length || 0} / {event.maxCapacity} registered</span>
                      {event.organizer && <span>🎙️ {event.organizer.name}</span>}
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>{event.description}</p>
                    {event.status === 'upcoming' && (
                      <button
                        className={`btn btn-sm ${isRegistered(event) ? 'btn-danger' : 'btn-indigo'}`}
                        onClick={() => handleRegister(event)}
                        disabled={registering === event._id || (!isRegistered(event) && event.registeredStudents?.length >= event.maxCapacity)}>
                        {registering === event._id ? 'Processing...' : isRegistered(event) ? 'Unregister' : event.registeredStudents?.length >= event.maxCapacity ? 'Full' : 'Register'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 CampusConnect</p>
      </footer>
    </>
  );
};

export default Events;
