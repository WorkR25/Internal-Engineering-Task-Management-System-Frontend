import React from 'react';
import './signin.css';

export default function SignInPage() {
  return (
    <div className="signin-container">
      {/* Left Pane - Branding (Hidden on smaller screens) */}
      <div className="left-pane">
        <div>
          <h1 className="brand-title">TaskReview</h1>
          
          <p className="subtitle">
            Internal Engineering Task & Review System
          </p>
          <h2 className="headline">
            One source of truth for engineering work, from assignment to review.
          </h2>
          
          <ul className="feature-list">
            <li className="feature-item">
              <span className="check-icon">✓</span>
              <span className="feature-text">Ownership, deadlines and submissions visible and auditable across every project.</span>
            </li>
            <li className="feature-item">
              <span className="check-icon">✓</span>
              <span className="feature-text">Objective review scoring across six dimensions for every PR submission.</span>
            </li>
            <li className="feature-item">
              <span className="check-icon">✓</span>
              <span className="feature-text">Full task activity history and developer performance analytics.</span>
            </li>
          </ul>
        </div>
        
        <div className="footer-text">
          © 2026 Internal Engineering Platform
        </div>
      </div>

      {/* Right Pane - Login Form */}
      <div className="right-pane">
        <div className="form-container">
          <h2 className="form-title">Sign in</h2>
          <p className="form-description">Access is provisioned by your Admin. No public sign-up.</p>

          <form className="form-wrapper">
            <div>
              <label className="input-label">Email</label>
              <input 
                type="email" 
                placeholder="arijit.ganguly@company.com" 
                className="text-input" 
              />
            </div>
            
            <div>
              <label className="input-label">Password</label>
              <input 
                type="password" 
                placeholder="••••••••••••" 
                className="text-input" 
              />
            </div>
            
            <button type="button" className="submit-button">
              Sign In
            </button>
          </form>

          <div className="divider-container">
            <div className="divider-line-wrapper">
              <div className="divider-line"></div>
            </div>
            <div className="divider-text-wrapper">
              <span className="divider-text">Need Access</span>
            </div>
          </div>

          <p className="help-text">
            Forgot your password or don't have an account yet?<br/>
            Contact your workspace Admin to get provisioned.
          </p>
        </div>
      </div>
    </div>
  );
}