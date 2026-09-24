'use client';

import { useState } from 'react';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.assign('/dashboard');
  };

  return (
    <main className="auth-shell">
      <section className="auth-visual">
        <div className="auth-overlay">
          <a href="/" className="brand brand-light">
            <span className="brand-mark">N</span>
            northstar<span className="brand-dot">.</span>
          </a>
          <div className="auth-copy">
            <p className="eyebrow eyebrow-light">Welcome back</p>
            <h1>Good work starts with a clear <span>north.</span></h1>
          </div>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <a href="/" className="brand brand-dark">
            <span className="brand-mark">N</span>
            northstar<span className="brand-dot">.</span>
          </a>
          <div className="auth-header">
            <p className="eyebrow">Account access</p>
            <h2>Sign in</h2>
          </div>
          <p className="auth-subtitle">Welcome back. Enter your details to continue.</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required />
            <label htmlFor="password">Password</label>
            <div className="password-wrap">
              <input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" autoComplete="current-password" required minLength={6} />
              <button type="button" className="password-toggle" onClick={() => setShowPassword((value) => !value)}>{showPassword ? 'Hide' : 'Show'}</button>
            </div>
            <div className="form-row">
              <label className="checkbox-row"><input type="checkbox" name="remember" /><span>Remember me</span></label>
              <a href="mailto:support@northstar.studio?subject=Reset%20password">Forgot password?</a>
            </div>
            <button type="submit" className="button primary-btn">Sign in <span aria-hidden="true">↗</span></button>
          </form>
          <p className="signup-copy">New to Northstar? <a href="mailto:hello@northstar.studio?subject=Northstar%20account">Request an account</a></p>
        </div>
      </section>
    </main>
  );
}
