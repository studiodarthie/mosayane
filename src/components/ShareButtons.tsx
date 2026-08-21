'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  if (!url) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, color: '#1877F2' },
    { name: 'X / Twitter', url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, color: '#1DA1F2' },
    { name: 'LinkedIn', url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`, color: '#0A66C2' },
    { name: 'WhatsApp', url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`, color: '#25D366' },
  ];

  return (
    <div style={{ marginTop: '40px', padding: '24px 0', borderTop: '1px solid rgba(0,0,0,0.1)', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Partager cet article</h3>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '8px 16px',
              borderRadius: '24px',
              background: link.color,
              color: '#fff',
              fontSize: '14px',
              textDecoration: 'none',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'opacity 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
