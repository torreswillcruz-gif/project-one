import { useState } from 'react';
import Link from 'next/link';
import { COMPANY_EMAIL, COMPANY_INITIAL, COMPANY_NAME } from '@/lib/brand';
import { apiFetch } from '@/lib/api';
import styles from './login-form.module.css';

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
      const response = await apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify(values) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? 'Não foi possível realizar o login.');
      window.location.assign('/dashboard');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Não foi possível realizar o login.');
      setLoading(false);
    }
  }

  return (
    <main className={styles.authShell}>
      <section className={styles.authVisual}><div className={styles.authOverlay}><Link href="/" className={`${styles.brand} ${styles.brandLight}`}><span className={styles.brandMark}>{COMPANY_INITIAL}</span>{COMPANY_NAME}<span className={styles.brandDot}>.</span></Link><h1>Welcome back</h1><p>We build thoughtful systems that help teams move with clarity.</p></div></section>
      <section className={styles.authPanel}><div className={styles.authCard}>
        <Link href="/" className={styles.brand}><span className={styles.brandMark}>{COMPANY_INITIAL}</span>{COMPANY_NAME}<span className={styles.brandDot}>.</span></Link>
        <h2>Entrar</h2>
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail</label><input id="email" name="email" type="email" autoComplete="email" placeholder="usuario@empresa.com" required />
          <label htmlFor="password">Senha</label><div className={styles.passwordWrap}><input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" minLength={8} placeholder="Digite sua senha" required /><button type="button" className={styles.togglePassword} onClick={() => setShowPassword((value) => !value)}>{showPassword ? 'Ocultar' : 'Mostrar'}</button></div>
          <button type="submit" className={`${styles.button} ${styles.buttonDark}`} disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
          {error && <p className={styles.authError} role="alert">{error}</p>}
        </form>
        <p className={styles.metaLink}>Ainda não tem conta? <Link href="/users">Criar cadastro</Link></p><p className={styles.metaLink}>Contato: <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a></p>
      </div></section>
    </main>
  );
}
