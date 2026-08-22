'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const images = [
  '/uploads/slider1-mosayane.jpg',
  '/uploads/mo4.jpeg'
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000); // Change image every 6 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ position: 'relative', height: '96vh', minHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: '#111', overflow: 'hidden' }}>
      {/* Background Images */}
      {images.map((src, index) => (
        <div 
          key={src} 
          style={{ 
            position: 'absolute', inset: 0, 
            opacity: index === currentIndex ? 1 : 0, 
            transition: 'opacity 1.5s ease-in-out',
            zIndex: 0
          }}
        >
          <Image 
            src={src} 
            alt={`Slide ${index + 1}`} 
            fill
            style={{ 
              objectFit: 'cover', 
              objectPosition: 'center 30%',
              transform: index === currentIndex ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 7s ease-out'
            }} 
            priority={index === 0}
          />
        </div>
      ))}
      
      {/* Gradient Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.05) 55%, rgba(10,10,10,0.35) 100%)', zIndex: 1 }}></div>
      
      {/* Static Info Elements */}
      <div style={{ position: 'absolute', top: '100px', right: 'clamp(20px,5vw,72px)', fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#F7F5F2', opacity: 0.85, zIndex: 2 }}>Artiste indépendante — Cameroun | France ↗</div>
      <div style={{ position: 'absolute', left: '24px', bottom: '56px', writingMode: 'vertical-rl', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#F7F5F2', opacity: 0.7, zIndex: 2 }}>↓ Explore / Scroll</div>
      
      {/* Main Content */}
      <div className="layout-wrapper" style={{ position: 'relative', paddingBottom: '64px', zIndex: 2 }}>
        <h1 className="h1-hero" style={{ color: '#F7F5F2' }}>Mosayane 2 Claire</h1>
        <p className="subtitle-hero" style={{ color: '#F7F5F2' }}>Une voix sans frontières</p>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <Link href="/bio" className="btn-primary">Découvrir sa bio</Link>
          <Link href="/music" className="btn-outline">Écouter</Link>
        </div>
      </div>
      
      {/* Navigation Dots */}
      <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 2 }}>
        {images.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{ 
              width: '8px', height: '8px', borderRadius: '50%', 
              background: idx === currentIndex ? '#F7F5F2' : 'rgba(247,245,242,0.3)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'background 0.3s ease'
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
