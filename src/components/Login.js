import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';
import { CLIENT } from '../config';

export default function Login({ onAuthenticated }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Demo-only: any non-empty credentials succeed.
    setTimeout(() => {
      sessionStorage.setItem('aurivian.authed', '1');
      sessionStorage.setItem('aurivian.user', email || 'demo@aurivian.ai');
      onAuthenticated?.();
      navigate('/');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-auri-bg text-auri-text flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Brand row */}
        <div className="flex items-center mb-10 justify-center">
          <span className="font-michroma text-auri-text text-xl tracking-wider">AURIVIAN</span>
        </div>

        {/* Card */}
        <div className="bg-auri-bg border border-auri-border rounded-xl shadow-sm p-8">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-auri-text mb-1">Sign in</h1>
            <p className="text-sm text-auri-muted">
              {CLIENT?.name ? `Aurivian for ${CLIENT.name}` : 'Aurivian Intelligence Layer'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-auri-muted mb-1.5">Work email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full px-3 py-2.5 rounded-lg border border-auri-border bg-auri-card text-sm text-auri-text focus:outline-none focus:border-auri-text"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-auri-muted mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2.5 rounded-lg border border-auri-border bg-auri-card text-sm text-auri-text focus:outline-none focus:border-auri-text"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-auri-text text-auri-bg text-sm font-medium hover:bg-auri-text/90 transition-all disabled:opacity-60"
            >
              {submitting ? 'Signing in…' : (<>Sign in <ArrowRight size={16} /></>)}
            </button>
          </form>

          {/* Sovereign deployment cue */}
          <div className="mt-6 pt-5 border-t border-auri-border flex items-center gap-2 text-xs text-auri-muted">
            <Shield size={14} className="text-auri-text" />
            <span>
              Deployed inside <span className="text-auri-text font-medium">{CLIENT?.cloudLabel || 'your cloud'}</span>. Data never leaves your environment.
            </span>
          </div>
        </div>

        <p className="text-center text-xs text-auri-muted mt-6">
          Empowering those that transform medicine.
        </p>
      </div>
    </div>
  );
}
