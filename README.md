# 🎓 CampusConnect — Full MERN Stack

A complete campus communication platform built with **MongoDB, Express, React, and Node.js**.

---

## 🚀 Features

### Authentication & Users
- ✅ Register / Login with JWT
- ✅ Role-based access: **Student**, **Parent**, **Admin**
- ✅ Profile management (name, department, year, roll number, phone)
- ✅ Password hashing with bcrypt

### Announcements
- ✅ Public listing (no login needed)
- ✅ Filter by category & priority
- ✅ Admin can create / delete announcements
- ✅ Priority levels: High / Medium / Low

### Events
- ✅ Public event listing with category filter
- ✅ Student can register / unregister for events
- ✅ Capacity management
- ✅ Admin can create / delete events

### Contact
- ✅ Contact form (no login needed)
- ✅ Messages stored in MongoDB
- ✅ Admin can view all messages

### Dashboard
- ✅ Student: recent announcements + upcoming events
- ✅ Admin: full CRUD for announcements, events, user list, messages

---

## 📂 Project Structure

```
campusconnect/
├── server/                  # Express + Node.js backend
│   ├── config/db.js         # MongoDB connection
│   ├── middleware/auth.js   # JWT + role middleware
│   ├── models/
│   │   ├── User.js
│   │   ├── Announcement.js
│   │   ├── Event.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── announcements.js
│   │   ├── events.js
│   │   ├── contact.js
│   │   └── users.js
│   ├── .env                 # ⚠️ Configure this
│   └── index.js             # Entry point
│
├── client/                  # React frontend
│   ├── public/index.html
│   └── src/
│       ├── api.js            # Axios instance
│       ├── context/
│       │   └── AuthContext.js
│       ├── components/
│       │   └── Navbar.js
│       ├── pages/
│       │   ├── Home.js
│       │   ├── About.js
│       │   ├── Services.js
│       │   ├── Announcements.js
│       │   ├── Events.js
│       │   ├── Contact.js
│       │   ├── Login.js
│       │   ├── Register.js
│       │   └── Dashboard.js
│       ├── App.js
│       ├── index.js
│       └── index.css
│
└── package.json             # Root scripts
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v16+
- MongoDB (local or MongoDB Atlas)
- npm

### 1. Clone & Install

```bash
# Install root concurrently
npm install

# Install backend deps
cd server && npm install

# Install frontend deps
cd ../client && npm install
```

### 2. Configure Environment

Edit `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/campusconnect
# OR for Atlas:
# MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/campusconnect

JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
```

### 3. Run Development Servers

From the root folder:

```bash
# Run both frontend + backend concurrently
npm run dev

# OR separately:
npm run server   # Backend on https://campusconnector-backend.onrender.com/api
npm run client   # Frontend on http://localhost:3000
```

### 4. Create an Admin User

Register via the UI and then in MongoDB shell:
```js
db.users.updateOne({ email: "your@email.com" }, { $set: { role: "admin" } })
```

---

## 🌐 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | — | Register user |
| POST | /api/auth/login | — | Login |
| GET | /api/auth/me | ✅ | Get current user |
| PUT | /api/auth/profile | ✅ | Update profile |
| GET | /api/announcements | — | List announcements |
| POST | /api/announcements | Admin | Create announcement |
| DELETE | /api/announcements/:id | Admin | Delete announcement |
| GET | /api/events | — | List events |
| POST | /api/events | Admin | Create event |
| POST | /api/events/:id/register | ✅ | Register for event |
| DELETE | /api/events/:id/register | ✅ | Unregister from event |
| POST | /api/contact | — | Submit contact form |
| GET | /api/contact | Admin | View all messages |
| GET | /api/users | Admin | List all users |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Axios, React Toastify |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Auth | JWT + bcryptjs |
| Styling | Custom CSS with Poppins font |

---

## 👩‍💻 Author

**Nensi Shingala** — Web Development Internship Project  
Extended to full MERN Stack with complete backend functionality.

---

## 🔮 Future Enhancements

- [ ] Email notifications (Nodemailer)
- [ ] File upload for study materials (Multer + Cloudinary)
- [ ] Attendance tracking
- [ ] Parent-student linking
- [ ] Real-time notifications (Socket.io)
- [ ] PWA support
