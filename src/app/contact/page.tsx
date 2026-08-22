"use client";

import { useState } from 'react';
import Image from 'next/image';
import { submitContactForm, subscribeNewsletter } from './actions';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Call server action
    await submitContactForm(formData);
    
    setIsSubmitted(true);
  };

  return (
    <main>
      <section className="bg-dark section-padding">
        <div className="layout-wrapper">
          <span className="tag-label">Contact</span>
          <h1 className="h1-hero" style={{ fontSize: 'clamp(36px,5vw,60px)', maxWidth: '760px' }}>Une question, une proposition de scène ?</h1>
        </div>
      </section>
      
      <section className="bg-light section-padding">
        <div className="layout-wrapper" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '56px', alignItems: 'stretch' }}>
          <div style={{ borderRadius: '2px', overflow: 'hidden', minHeight: '420px', position: 'relative' }}>
            <Image 
              src="/uploads/489817738_1288800069462669_3896681577553211210_n.jpg" 
              alt="Mosayane, portrait assis" 
              fill
              style={{ objectFit: 'cover', objectPosition: 'top' }} 
            />
          </div>
          
          <div style={{ background: '#fff', borderRadius: '4px', padding: '40px', boxShadow: '0 30px 70px rgba(0,0,0,0.1)' }}>
            <span className="tag-label">Écrivez-nous</span>
            
            {!isSubmitted ? (
              <form onSubmit={handleFormSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase', opacity: 0.6, marginBottom: '6px' }}>Nom *</label>
                    <input type="text" name="name" placeholder="Votre nom" required style={{ width: '100%', boxSizing: 'border-box', border: '1px solid #DDD8CF', borderRadius: '6px', padding: '11px 14px', fontSize: '14.5px', fontFamily: 'var(--font-inter)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase', opacity: 0.6, marginBottom: '6px' }}>Email *</label>
                    <input type="email" name="email" placeholder="vous@example.com" required style={{ width: '100%', boxSizing: 'border-box', border: '1px solid #DDD8CF', borderRadius: '6px', padding: '11px 14px', fontSize: '14.5px', fontFamily: 'var(--font-inter)' }} />
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase', opacity: 0.6, marginBottom: '6px' }}>Téléphone (optionnel)</label>
                  <input type="tel" name="phone" placeholder="+237 6 99 42 31 71" style={{ width: '100%', boxSizing: 'border-box', border: '1px solid #DDD8CF', borderRadius: '6px', padding: '11px 14px', fontSize: '14.5px', fontFamily: 'var(--font-inter)' }} />
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <label style={{ display: 'block', fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase', opacity: 0.6, marginBottom: '6px' }}>Message *</label>
                  <textarea name="message" placeholder="Booking, presse, collaboration..." rows={5} required style={{ width: '100%', boxSizing: 'border-box', border: '1px solid #DDD8CF', borderRadius: '6px', padding: '11px 14px', fontSize: '14.5px', fontFamily: 'var(--font-inter)', resize: 'vertical' }}></textarea>
                </div>
                <button type="submit" className="btn-primary" style={{ marginTop: '14px', border: 'none', cursor: 'pointer' }}>Envoyer le message</button>
              </form>
            ) : (
              <div style={{ marginTop: '20px' }}>
                <h3 className="h2-subtitle" style={{ fontSize: '22px', margin: '0 0 10px', color: 'var(--ink-light)' }}>Merci !</h3>
                <p style={{ fontSize: '15px', lineHeight: 1.6, opacity: 0.75, margin: '0 0 20px' }}>Votre message a bien été envoyé. Nous vous répondrons dès que possible.</p>
                <div style={{ marginTop: '20px' }}>
                  <button type="button" onClick={() => setIsSubmitted(false)} style={{ background: 'none', border: 'none', color: 'var(--ink-light)', opacity: 0.6, fontSize: '13px', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>Envoyer un autre message</button>
                </div>
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '28px', paddingTop: '24px', borderTop: '1px solid #EAE6DF' }}>
              <a href="tel:+237699423171" style={{ color: 'var(--ink-light)', fontSize: '14px', textDecoration: 'none' }}>+237 699 423 171</a>
              <span style={{ opacity: 0.3 }}>•</span>
              <a href="https://www.facebook.com/mosayaneofficiel" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink-light)', fontSize: '14px', textDecoration: 'none' }}>Facebook</a>
              <span style={{ opacity: 0.3 }}>•</span>
              <a href="https://mosayanemusic.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink-light)', fontSize: '14px', textDecoration: 'none' }}>Site web</a>
            </div>
          </div>
        </div>
      </section>
      
      <section style={{ background: 'var(--accent)', padding: 'calc(2.5 * 28px) clamp(20px,5vw,72px)' }}>
        <div className="layout-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '32px', flexWrap: 'wrap', padding: 0 }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500, fontSize: '24px', margin: '0 0 6px', color: '#fff' }}>Restez informés</h3>
            <p style={{ fontSize: '14.5px', color: '#fff', opacity: 0.9, margin: 0 }}>Sorties, dates de scène et actualités de Mosayane, directement par email.</p>
          </div>
          <form 
            onSubmit={async (e) => { 
              e.preventDefault(); 
              const formData = new FormData(e.currentTarget);
              await subscribeNewsletter(formData);
              alert('Inscription réussie !'); 
              e.currentTarget.reset();
            }} 
            style={{ display: 'flex', gap: '10px', maxWidth: '420px', flex: 1, minWidth: '280px' }}
          >
            <input name="email" type="email" placeholder="vous@example.com" aria-label="Adresse email" required style={{ flex: 1, border: 'none', borderRadius: '999px', padding: '0 20px', fontSize: '14px' }} />
            <button type="submit" style={{ background: '#111', color: '#fff', border: 'none', fontSize: '12.5px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '12px 22px', borderRadius: '999px', cursor: 'pointer' }}>S'inscrire</button>
          </form>
        </div>
      </section>
    </main>
  );
}
