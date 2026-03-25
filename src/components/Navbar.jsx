import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

function OnboardingHint() {
  const { onboardingProgress, activeHint, dismissHint } = useApp();
  
  if (!activeHint) return null;

  return (
    <div className="onboarding-hint">
      <div className="hint-content">
        <div className="hint-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
        </div>
        <div className="hint-text">
          <span className="hint-progress">{onboardingProgress}% Complete</span>
          <p>{activeHint.message}</p>
        </div>
        <button onClick={() => dismissHint(activeHint.id)} className="hint-dismiss">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div className="hint-progress-bar">
        <div className="hint-progress-fill" style={{ width: `${onboardingProgress}%` }}></div>
      </div>

      <style jsx>{`
        .onboarding-hint {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(217, 70, 239, 0.1));
          border-bottom: 1px solid rgba(139, 92, 246, 0.3);
          padding: 0.75rem 0;
        }

        .hint-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .hint-icon {
          width: 28px;
          height: 28px;
          background: rgba(139, 92, 246, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
          flex-shrink: 0;
        }

        .hint-text {
          flex: 1;
        }

        .hint-progress {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--accent-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .hint-text p {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.3;
        }

        .hint-dismiss {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .hint-dismiss:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
        }

        .hint-progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--bg-tertiary);
        }

        .hint-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
          transition: width 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default function Navbar() {
  const { cart, saved, theme, toggleTheme, onboardingProgress } = useApp();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const showHint = onboardingProgress < 100;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      {showHint && <OnboardingHint />}
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-accent">PR</span>Hive
        </Link>
        
        <div className="navbar-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
          <NavLink to="/marketplace" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Marketplace</NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Dashboard</NavLink>
        </div>

        <div className="navbar-actions">
          <button onClick={toggleTheme} className="icon-btn" title="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <Link to="/dashboard" className="icon-btn-wrapper" title="Saved items">
            <span className="icon-btn saved-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill={saved.length > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </span>
            {saved.length > 0 && <span className="badge-count">{saved.length}</span>}
          </Link>
          
          <Link to="/cart" className="icon-btn-wrapper" title="View Cart">
            <span className="icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </span>
            {cart.length > 0 && <span className="badge-count">{cart.length}</span>}
          </Link>
          
          {currentUser ? (
            <div className="user-menu">
              <button className="user-btn">
                <span className="user-avatar">{currentUser.name.charAt(0).toUpperCase()}</span>
                <span className="user-name">{currentUser.name}</span>
              </button>
              <div className="user-dropdown">
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            </div>
          ) : (
            <div className="auth-menu">
              <button className="btn btn-primary auth-toggle">
                Sign In
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              <div className="auth-dropdown">
                <Link to="/login" className="auth-option">Login</Link>
                <Link to="/signup" className="auth-option">Sign Up</Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 1rem 0;
          background: var(--glass-bg);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--glass-border);
        }

        .navbar-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-logo {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .logo-accent {
          color: var(--accent-primary);
          text-shadow: 0 0 20px var(--accent-glow);
        }

        .navbar-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
          padding: 0.5rem 0;
          position: relative;
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .nav-link.active {
          color: var(--text-primary);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
          border-radius: 1px;
        }

        .navbar-actions {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .icon-btn-wrapper {
          position: relative;
          display: inline-flex;
        }

        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 1.125rem;
          transition: all var(--transition-fast);
        }

        .icon-btn:hover {
          background: var(--bg-secondary);
          border-color: var(--accent-primary);
          transform: translateY(-2px);
        }

        .badge-count {
          position: absolute;
          top: -6px;
          right: -6px;
          background: var(--accent-primary);
          color: white;
          font-size: 0.625rem;
          font-weight: 700;
          padding: 0.2rem 0.4rem;
          border-radius: 9999px;
          min-width: 18px;
          text-align: center;
          box-shadow: 0 2px 8px var(--accent-glow);
        }

        .saved-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: color 0.3s;
        }

        .icon-btn-wrapper:hover .saved-icon {
          color: var(--accent-primary);
        }

        .connect-btn {
          margin-left: 0.5rem;
          padding: 0.75rem 1.5rem;
          font-size: 0.9rem;
        }

        .auth-menu {
          position: relative;
          margin-left: 0.5rem;
        }

        .auth-toggle {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.75rem 1.25rem;
        }

        .auth-toggle svg {
          transition: transform 0.2s;
        }

        .auth-menu:hover .auth-toggle svg {
          transform: rotate(180deg);
        }

        .auth-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 10px;
          padding: 0.5rem;
          display: none;
          min-width: 140px;
        }

        .auth-menu:hover .auth-dropdown {
          display: block;
        }

        .auth-option {
          display: block;
          padding: 0.75rem 1rem;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.875rem;
          border-radius: 6px;
          transition: all var(--transition-fast);
        }

        .auth-option:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .user-menu {
          position: relative;
          margin-left: 0.5rem;
        }

        .user-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 0.5rem 1rem;
          cursor: pointer;
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .user-btn:hover {
          border-color: var(--accent-primary);
        }

        .user-avatar {
          width: 28px;
          height: 28px;
          background: var(--accent-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
        }

        .user-name {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .user-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 10px;
          padding: 0.5rem;
          display: none;
          min-width: 120px;
        }

        .user-menu:hover .user-dropdown {
          display: block;
        }

        .logout-btn {
          width: 100%;
          padding: 0.5rem 1rem;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 0.875rem;
          text-align: left;
          cursor: pointer;
          border-radius: 6px;
          transition: all var(--transition-fast);
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        @media (max-width: 768px) {
          .navbar-links {
            display: none;
          }

          .connect-btn {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}
