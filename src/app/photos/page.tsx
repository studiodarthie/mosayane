import { prisma } from '@/lib/prisma';
import Image from 'next/image';

export default async function PhotosPage() {
  const photos = await prisma.photo.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main>
      <section className="bg-dark section-padding" style={{ minHeight: '100vh' }}>
        <div className="layout-wrapper">
          <span className="tag-label">Photos</span>
          <h1 className="h1-hero" style={{ fontSize: 'clamp(36px,5vw,64px)', maxWidth: '760px', marginBottom: '40px' }}>Un univers visuel entre scène et studio</h1>
          
          {photos.length === 0 ? (
            <p style={{ opacity: 0.5, color: '#fff' }}>Aucune photo dans la galerie pour le moment.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              {photos.map((photo) => (
                <figure key={photo.id} style={{ margin: 0, aspectRatio: '3/4', overflow: 'hidden', borderRadius: '2px', position: 'relative', background: '#111' }}>
                  <Image 
                    src={photo.url} 
                    alt={photo.title} 
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top' }} 
                  />
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
