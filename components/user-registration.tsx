'use client';

import { FormEvent, useState } from 'react';

export default function UserRegistration() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); setMessage(''); setError('');
    const form = event.currentTarget;
    try {
      const response = await fetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? 'Erro ao cadastrar usuário.');
      setMessage(data.message); form.reset();
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'Erro ao cadastrar usuário.'); }
    finally { setLoading(false); }
  }

  return <main className="registration-page"><div className="registration-card"><a className="brand" href="/dashboard"><span className="brand-mark">N</span>northstar<span className="brand-dot">.</span></a><p className="eyebrow">Administração</p><h1>Cadastrar usuário</h1><p className="registration-intro">Crie um acesso para um novo membro da equipe.</p><form className="registration-form" onSubmit={handleSubmit}><label htmlFor="name">Nome completo</label><input id="name" name="name" required placeholder="Nome do usuário" /><label htmlFor="email">E-mail corporativo</label><input id="email" name="email" type="email" required placeholder="usuario@empresa.com" /><label htmlFor="role">Perfil</label><select id="role" name="role" defaultValue="member"><option value="member">Membro</option><option value="manager">Gerente</option><option value="admin">Administrador</option></select><label htmlFor="password">Senha temporária</label><input id="password" name="password" type="password" minLength={8} required placeholder="Mínimo de 8 caracteres" /><button className="button primary-btn" disabled={loading}>{loading ? 'Cadastrando...' : 'Cadastrar usuário ↗'}</button>{message && <p className="success-message">{message}</p>}{error && <p className="error-message">{error}</p>}</form><a className="back-link" href="/dashboard">← Voltar ao dashboard</a></div></main>;
}
