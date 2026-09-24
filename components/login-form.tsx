'use client';

import { useState } from 'react';
import Link from 'next/link';
import { COMPANY_EMAIL, COMPANY_INITIAL, COMPANY_NAME } from '@/lib/brand';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error ?? 'Não foi possível realizar o login.');
      window.location.assign('/dashboard');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Não foi possível realizar o login.');
      setLoading(false);
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-visual"><div className="auth-overlay"><Link href="/" className="brand brand-light"><span className="brand-mark">{COMPANY_INITIAL}</span>{COMPANY_NAME}<span className="brand-dot">.</span></Link><div className="auth-copy"><p className="eyebrow eyebrow-light">Welcome back</p><h1>Good work starts with a clear <span>direction.</span></h1></div></div></section>
      <section className="auth-panel"><div className="auth-card"><Link href="/" className="brand"><span className="brand-mark">{COMPANY_INITIAL}</span>{COMPANY_NAME}<span className="brand-dot">.</span></Link><div className="auth-header"><p className="eyebrow">Account access</p><h2>Sign in</h2></div><p className="auth-subtitle">Welcome back. Enter your details to continue.</p><form className="login-form" onSubmit={handleSubmit}><label htmlFor="email">Email address</label><input id="email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required /><label htmlFor="password">Password</label><div className="password-wrap"><input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" autoComplete="current-password" required /><button type="button" className="password-toggle" onClick={() => setShowPassword((value) => !value)}>{showPassword ? 'Hide' : 'Show'}</button></div><div className="form-row"><label className="checkbox-row"><input type="checkbox" name="remember" /><span>Remember me</span></label><a href={`mailto:${COMPANY_EMAIL}?subject=Reset%20password`}>Forgot password?</a></div><button type="submit" className="button primary-btn" disabled={loading}>{loading ? 'Signing in...' : 'Sign in ↗'}</button>{error && <p className="error-message" role="alert">{error}</p>}</form><p className="signup-copy">New to {COMPANY_NAME}? <Link href="/users">Request an account</Link></p></div></section>
    </main>
  );
}
