import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { getApiBaseUrl } from './utils/api';

function Home() {
  return (
    <div className="container mt-5 mb-5">
      <div className="jumbotron bg-light p-5 rounded mb-4">
        <h1 className="display-4 mb-3">🎯 OctoFit Tracker</h1>
        <p className="lead mb-4">Track your fitness activities, compete with teams, and reach your goals!</p>
        <hr className="my-4" />
        <p className="mb-4">Use the navigation menu above to explore activities, leaderboards, teams, users, and workouts.</p>
      </div>
      <div className="row g-3">
        <div className="col-md-6 col-lg-3">
          <div className="card text-center h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">📊 Activities</h5>
              <p className="card-text">Log and track your fitness activities</p>
              <Link to="/activities" className="btn btn-primary btn-sm">View Activities</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card text-center h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">💪 Workouts</h5>
              <p className="card-text">Manage your workout routines</p>
              <Link to="/workouts" className="btn btn-primary btn-sm">View Workouts</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card text-center h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">👥 Teams</h5>
              <p className="card-text">Create and join teams</p>
              <Link to="/teams" className="btn btn-primary btn-sm">View Teams</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card text-center h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">🏆 Leaderboard</h5>
              <p className="card-text">See the rankings</p>
              <Link to="/leaderboard" className="btn btn-primary btn-sm">View Rankings</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  console.log('App component mounted');

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-custom">
          <div className="container-fluid">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img
                src="/octofitapp-small.svg"
                alt="OctoFit Small Logo"
                className="navbar-small-logo me-3"
              />
              <img 
                src="/octofit-logo.svg" 
                alt="OctoFit Logo" 
                className="navbar-logo me-3"
              />
              <span className="brand-text">🐙 OctoFit Tracker</span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    🏆 Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-white text-center py-4 mt-5">
          <p>&copy; 2026 OctoFit Tracker. All rights reserved.</p>
          <p className="small text-muted mb-0">API base: {getApiBaseUrl()}</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
