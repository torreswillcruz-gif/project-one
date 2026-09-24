'use client';

// Importa o hook usado para controlar os estados interativos do formulário.
import { useState } from 'react';
import Link from 'next/link';
import { COMPANY_EMAIL, COMPANY_INITIAL, COMPANY_NAME } from '@/lib/brand';
import styles from './login-form.module.css';

// Componente responsável por renderizar o formulário de login.
export default function LoginForm() {
  // Controla se a senha está visível ou ocultada.
  const [showPassword, setShowPassword] = useState(false);

  // Indica se a requisição de login está sendo processada.
  const [loading, setLoading] = useState(false);

  // Armazena a mensagem de erro exibida ao usuário.
  const [error, setError] = useState('');

  // Envia os dados do formulário para a rota de autenticação.
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Impede o recarregamento padrão da página ao enviar o formulário.
    event.preventDefault();

    // Ativa o estado de carregamento e limpa erros anteriores.
    setLoading(true);
    setError('');

    // Obtém o formulário enviado e transforma seus campos em um objeto.
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    try {
      // Faz uma requisição POST para a API de login do próprio Next.js.
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      // Converte a resposta da API para JSON.
      const data = await response.json();

      // Interrompe o fluxo quando a API retorna erro.
      if (!response.ok) {
        throw new Error(data.error ?? 'Não foi possível realizar o login.');
      }

      // Após o login, redireciona o usuário para o dashboard.
      window.location.assign('/dashboard');
    } catch (requestError) {
      // Exibe uma mensagem amigável quando a autenticação falha.
      setError(requestError instanceof Error ? requestError.message : 'Não foi possível realizar o login.');

      // Libera o botão para permitir uma nova tentativa.
      setLoading(false);
    }
  }

  return (
    <main className={styles.authShell}>
      <section className={styles.authVisual}>
        <div className={styles.authOverlay}>
          <Link href="/" className={`${styles.brand} ${styles.brandLight}`}>
            <span className={styles.brandMark}>{COMPANY_INITIAL}</span>
            {COMPANY_NAME}<span className={styles.brandDot}>.</span>
          </Link>
          <h1>Welcome back</h1>
          <p>We build thoughtful systems that help teams move with clarity.</p>
        </div>
      </section>

      <section className={styles.authPanel}>
        <div className={styles.authCard}>
          <Link href="/" className={styles.brand}>
            <span className={styles.brandMark}>{COMPANY_INITIAL}</span>
            {COMPANY_NAME}<span className={styles.brandDot}>.</span>
          </Link>

          <h2>Entrar</h2>

          <form className={styles.authForm} onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="usuario@empresa.com" required />

            <label htmlFor="password">Senha</label>
            <div className={styles.passwordWrap}>
              <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" minLength={8} placeholder="Digite sua senha" required />
              <button type="button" className={styles.togglePassword} onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>

            <button type="submit" className={`${styles.button} ${styles.buttonDark}`} disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            {error && <p className={styles.authError} role="alert">{error}</p>}
          </form>

          <p className={styles.metaLink}>Ainda não tem conta? <Link href="/users">Criar cadastro</Link></p>
          <p className={styles.metaLink}>Contato: <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a></p>
        </div>
      </section>
    </main>
  );
}
