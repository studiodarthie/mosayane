import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const messagesCount = await prisma.contactMessage.count({ where: { isRead: false } });
  const newsletterCount = await prisma.newsletterSubscriber.count();
  const articlesCount = await prisma.blogPost.count();
  const mediaCount = await prisma.mediaLink.count();
  const photosCount = await prisma.photo.count();
  const releasesCount = await prisma.release.count();

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', fontFamily: 'var(--font-fraunces)' }}>Vue d'ensemble</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        
        <div style={{ background: '#f9f9f9', padding: '24px', borderRadius: '12px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '13px', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Nouveaux Messages</div>
          <div style={{ fontSize: '36px', fontWeight: 700, color: messagesCount > 0 ? 'var(--accent)' : 'inherit', marginBottom: '12px' }}>{messagesCount}</div>
          <Link href="/admin/contact" style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}>Gérer les messages →</Link>
        </div>

        <div style={{ background: '#f9f9f9', padding: '24px', borderRadius: '12px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '13px', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Abonnés Newsletter</div>
          <div style={{ fontSize: '36px', fontWeight: 700, marginBottom: '12px' }}>{newsletterCount}</div>
          <Link href="/admin/newsletter" style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}>Voir la liste →</Link>
        </div>

        <div style={{ background: '#f9f9f9', padding: '24px', borderRadius: '12px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '13px', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Articles de blog</div>
          <div style={{ fontSize: '36px', fontWeight: 700, marginBottom: '12px' }}>{articlesCount}</div>
          <Link href="/admin/blog" style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}>Gérer le blog →</Link>
        </div>

        <div style={{ background: '#f9f9f9', padding: '24px', borderRadius: '12px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '13px', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Releases (Musique)</div>
          <div style={{ fontSize: '36px', fontWeight: 700, marginBottom: '12px' }}>{releasesCount}</div>
          <Link href="/admin/discographie" style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}>Gérer la discographie →</Link>
        </div>

        <div style={{ background: '#f9f9f9', padding: '24px', borderRadius: '12px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '13px', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Photos (Galerie)</div>
          <div style={{ fontSize: '36px', fontWeight: 700, marginBottom: '12px' }}>{photosCount}</div>
          <Link href="/admin/photos" style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}>Gérer les photos →</Link>
        </div>

        <div style={{ background: '#f9f9f9', padding: '24px', borderRadius: '12px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '13px', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Médias Embeds</div>
          <div style={{ fontSize: '36px', fontWeight: 700, marginBottom: '12px' }}>{mediaCount}</div>
          <Link href="/admin/media" style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}>Gérer les médias →</Link>
        </div>
        
      </div>
    </div>
  );
}
