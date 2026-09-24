'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { COMPANY_INITIAL, COMPANY_NAME } from '@/lib/brand';

export default function UserRegistration() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error ?? 'Não foi possível criar o cadastro.');
      setMessage(data.message ?? 'Cadastro criado com sucesso.');
      form.reset();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Não foi possível criar o cadastro.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="registration-page">
      <div className="registration-card">
        <Link href="/" className="brand" aria-label={`${COMPANY_NAME} home`}>
          <span className="brand-mark">{COMPANY_INITIAL}</span>
          {COMPANY_NAME}<span className="brand-dot">.</span>
        </Link>

        <div className="registration-header">
          <p className="eyebrow">Administração</p>
          <h1>Novo cadastro</h1>
          <p>Crie um acesso para um novo membro da equipe.</p>
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Nome completo</label>
          <input id="name" name="name" type="text" autoComplete="name" placeholder="Digite o nome completo" required />

          <label htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="usuario@empresa.com" required />

          <label htmlFor="role">Perfil de acesso</label>
          <select id="role" name="role" defaultValue="member">
            <option value="member">Membro</option>
            <option value="manager">Gerente</option>
            <option value="admin">Administrador</option>
          </select>

          <label htmlFor="password">Senha</label>
          <input id="password" name="password" type="password" autoComplete="new-password" minLength={8} placeholder="Mínimo de 8 caracteres" required />
          <small className="field-help">A senha será protegida com hash antes de ser salva.</small>

          <button className="button primary-btn" type="submit" disabled={loading}>
            {loading ? 'Criando cadastro...' : 'Criar cadastro ↗'}
          </button>

          {message && <p className="success-message" role="status">{message}</p>}
          {error && <p className="error-message" role="alert">{error}</p>}
        </form>

        <Link href="/dashboard" className="back-link">← Voltar ao dashboard</Link>
      </div>
    </main>
  );
}
