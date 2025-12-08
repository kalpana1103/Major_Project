import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Feed from './components/Feed';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CreatePost from './components/CreatePost';
import Profile from './components/Profile';
import Users from './components/Users';

export default function App() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  const nav = useNavigate();
  const token = localStorage.getItem('token');

  // Apply dark mode to body
  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const logout = () => {
    localStorage.clear();
    nav('/login');
  };

  return (
    <div>
      <header className="topbar">
        <div className="brand" onClick={() => nav('/')}>⚡️ SocialMERN</div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setOpen(!open)}>☰</button>

        {/* Dark Mode Toggle */}
        <button className="dark-btn" onClick={() => setDark(!dark)}>
          {dark ? "🌞" : "🌙"}
        </button>

        <div className="searchwrap">
          <input id="global-search" placeholder="Search posts or users..." />
        </div>

        <nav className={`navlinks ${open ? "show" : ""}`}>
          <Link to="/" onClick={() => setOpen(false)}>Feed</Link>
          <Link to="/users" onClick={() => setOpen(false)}>People</Link>

          {token ? (
            <>
              <Link to="/create" onClick={() => setOpen(false)}>Create</Link>
              <button className="btn small" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
            </>
          )}
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
    </div>
  );
}
