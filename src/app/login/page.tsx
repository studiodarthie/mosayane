"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <main className="section-padding bg-light" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', maxWidth: '400px', width: '100%' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', textAlign: 'center' }}>Connexion Admin</h1>
        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Mot de passe</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              required 
              style={{ width: '100%', boxSizing: 'border-box', border: '1px solid #DDD8CF', borderRadius: '6px', padding: '11px 14px', fontSize: '14.5px', fontFamily: 'var(--font-inter)' }} 
            />
          </div>
          {state?.error && <p style={{ color: 'red', fontSize: '14px', margin: 0 }}>{state.error}</p>}
          <button 
            type="submit" 
            disabled={isPending}
            style={{ width: '100%', padding: '12px', background: '#111', color: '#fff', borderRadius: '6px', fontWeight: 600, border: 'none', cursor: isPending ? 'not-allowed' : 'pointer', marginTop: '8px', opacity: isPending ? 0.7 : 1 }}
          >
            {isPending ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>
      </div>
    </main>
  );
}
