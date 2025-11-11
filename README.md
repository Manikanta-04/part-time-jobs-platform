# Part-Time Jobs Platform 🚀

A modern, full-stack web application for finding and posting part-time job opportunities. Built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS.

## ✨ Features

### For Job Seekers
- 🔍 Advanced job search with filters
- 📝 Easy job application process
- 💼 Personal dashboard to track applications
- 📊 Application status tracking
- 🔖 Save favorite jobs
- 👤 Complete profile management

### For Employers
- ➕ Post job listings
- 📋 Manage job postings
- 👥 View and manage applications
- ✅ Review and update application status
- 📈 Track job performance

### General Features
- 🔐 Secure authentication with JWT
- 📱 Fully responsive design
- 🎨 Modern, attractive UI with Tailwind CSS
- ⚡ Fast and optimized performance
- 🔄 Real-time updates

## 🛠️ Tech Stack

### Frontend
- React.js 18
- React Router DOM v6
- Tailwind CSS 3
- Axios
- date-fns

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd part-time-jobs-platform
```

### 2. Setup Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/parttime-jobs
# JWT_SECRET=your_super_secret_key
# JWT_EXPIRE=7d
# NODE_ENV=development
# CLIENT_URL=http://localhost:3000

# Start the server
npm run dev
```

The server will run on `http://localhost:5000`

### 3. Setup Frontend

```bash
# Open a new terminal and navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file (if needed)
# REACT_APP_API_URL=http://localhost:5000/api

# Start the development server
npm start
```

The application will open at `http://localhost:3000`

### 4. Setup MongoDB

Make sure MongoDB is running on your system:

```bash
# For macOS (using Homebrew)
brew services start mongodb-community

# For Linux
sudo systemctl start mongod

# For Windows
# MongoDB should start automatically, or use:
net start MongoDB
```

## 📦 Project Structure

```
part-time-jobs-platform/
├── client/                  # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React Context
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   └── package.json
│
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `GET /api/auth/logout` - Logout user
- `PUT /api/auth/updateprofile` - Update user profile
- `PUT /api/auth/updatepassword` - Update password

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create job (Employer only)
- `PUT /api/jobs/:id` - Update job (Employer only)
- `DELETE /api/jobs/:id` - Delete job (Employer only)
- `GET /api/jobs/employer/my-jobs` - Get employer's jobs

### Applications
- `POST /api/applications` - Apply for job (Job Seeker)
- `GET /api/applications/my-applications` - Get user's applications
- `GET /api/applications/job/:jobId` - Get job applications (Employer)
- `PUT /api/applications/:id/status` - Update application status (Employer)
- `DELETE /api/applications/:id` - Delete application

## 🎨 UI Components

The application includes several pre-built, styled components:

- **Navbar** - Responsive navigation with authentication
- **Footer** - Site-wide footer with links
- **JobCard** - Beautiful job listing cards
- **JobFilters** - Advanced filtering sidebar
- **Dashboard** - User dashboard with stats
- **Forms** - Login, Register, and application forms

All components are styled with Tailwind CSS and follow modern design principles.

## 🔐 Authentication Flow

1. User registers or logs in
2. JWT token is generated and stored
3. Token is sent with each API request
4. Protected routes verify token
5. User role determines access level

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

## 🧪 Testing

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

## 🚢 Deployment

### Backend Deployment (e.g., Render, Railway, Heroku)

1. Set environment variables
2. Build command: `npm install`
3. Start command: `npm start`

### Frontend Deployment (e.g., Vercel, Netlify)

1. Build command: `npm run build`
2. Publish directory: `build`
3. Set `REACT_APP_API_URL` environment variable

### Database (MongoDB Atlas)

1. Create a free cluster on MongoDB Atlas
2. Get connection string
3. Update `MONGODB_URI` in backend

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Manikanta Chowdary**  - [238w1a12a7@vrsec.ac.in ]
🌐 [GitHub Profile](https://github.com/Manikanta-04)

## 🙏 Acknowledgments

- React Team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the database
- All open-source contributors

## 📞 Support

For support, email support@partjobs.com or create an issue in this repository.

---

**Happy Coding! 🎉**
