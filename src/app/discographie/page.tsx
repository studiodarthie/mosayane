import { prisma } from '@/lib/prisma';
import Image from 'next/image';

export default async function DiscographiePage() {
  const releases = await prisma.release.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const singles = releases.filter(r => r.type === 'single');
  const liveAlbums = releases.filter(r => r.type === 'album');

  return (
    <main>
      <section className="bg-dark section-padding">
        <div className="layout-wrapper">
          <span className="tag-label">Discographie</span>
          <h1 className="h1-hero" style={{ fontSize: 'clamp(36px,5vw,64px)', maxWidth: '760px' }}>Singles, EPs et albums live</h1>
          <p style={{ fontSize: '15px', opacity: 0.6, margin: '16px 0 0' }}>
            Retrouvez toute la discographie sur <a href="https://music.apple.com/us/artist/mosayane-2-claire/1533978227" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>Apple Music</a>.
          </p>
        </div>
      </section>
      
      <section className="bg-light section-padding" style={{ paddingBottom: 0 }}>
        <div className="layout-wrapper" style={{ maxWidth: '1000px' }}>
          <h2 className="h2-subtitle" style={{ marginBottom: '24px' }}>Singles &amp; EPs</h2>
          
          {singles.length === 0 ? (
            <p style={{ opacity: 0.5 }}>Aucun single disponible pour le moment.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '20px' }}>
              {singles.map((release) => (
                <a key={release.id} href={release.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', background: '#fff', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 15px 40px rgba(0,0,0,0.06)', display: 'block' }}>
                  <div style={{ aspectRatio: '1/1', overflow: 'hidden', background: '#111', position: 'relative' }}>
                    <Image src={release.cover} alt={release.title} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '16px 18px' }}>
                    <h3 style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500, fontSize: '16px', margin: '0 0 6px' }}>{release.title}</h3>
                    <span style={{ fontSize: '13px', opacity: 0.55 }}>{release.year}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
      
      <section className="bg-light section-padding">
        <div className="layout-wrapper" style={{ maxWidth: '1000px' }}>
          <h2 className="h2-subtitle" style={{ marginBottom: '24px' }}>Albums live</h2>
          
          {liveAlbums.length === 0 ? (
            <p style={{ opacity: 0.5 }}>Aucun album disponible pour le moment.</p>
          ) : (
            <div>
              {liveAlbums.map((album) => (
                <a key={album.id} href={album.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: '20px', alignItems: 'center', background: '#fff', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 15px 40px rgba(0,0,0,0.06)', maxWidth: '480px', marginBottom: '20px' }}>
                  <div style={{ width: '140px', aspectRatio: '1/1', flexShrink: 0, overflow: 'hidden', background: '#111', position: 'relative' }}>
                    <Image src={album.cover} alt={album.title} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '16px 20px 16px 0' }}>
                    <h3 style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500, fontSize: '18px', margin: '0 0 8px' }}>{album.title}</h3>
                    <span style={{ fontSize: '13px', opacity: 0.55 }}>{album.year}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
      
      <section className="bg-light section-padding-bottom" style={{ textAlign: 'center' }}>
        <a href="https://music.apple.com/us/artist/mosayane-2-claire/1533978227" target="_blank" rel="noopener noreferrer" className="btn-primary">Écouter sur Apple Music</a>
      </section>
    </main>
  );
}
