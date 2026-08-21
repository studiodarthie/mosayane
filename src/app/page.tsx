import Image from "next/image";
import Link from "next/link";
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const bio = await prisma.bioContent.findFirst({ where: { id: 1 } });
  
  const musicLinks = await prisma.mediaLink.findMany({
    where: { type: 'soundcloud' },
    orderBy: { createdAt: 'desc' }
  });

  const videoLinks = await prisma.mediaLink.findMany({
    where: { type: 'youtube' },
    orderBy: { createdAt: 'desc' },
    take: 4
  });

  const defaultBio = `Delphine Mebonde, alias Mosayane 2 Claire, est une artiste camerounaise qui allie musique, danse, chant et théâtre. Découverte avec son premier single « Yi Menga Sem », elle porte un mélange complexe de vécus et de cultures entre le Cameroun et le Sénégal.`;
  const bioText = bio?.content ? bio.content.substring(0, 250) + '...' : defaultBio;

  const defaultMusic = [
    { id: '1', title: 'Ekié', url: 'https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fuser-573562940%2F1-ekie-mosayane-web-mp3%3Futm_medium%3Dapi%26utm_campaign%3Dsocial_sharing%26utm_source%3Did_314642&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false' }
  ];
  const musicToDisplay = musicLinks.length > 0 ? musicLinks : defaultMusic;

  const defaultVideos = [
    { id: '1', title: 'MOSAYANE 2 Claire "NO WAY" — live acoustique (family time)', url: '' },
    { id: '2', title: 'MOSAYANE 2 CLAIRE — Là-bas comme ici (JMC sound checking)', url: '' },
    { id: '3', title: 'MOSAYANE 2 CLAIRE — Ekié, live (JMC 2023)', url: '' },
    { id: '4', title: 'MOSAYANE 2 CLAIRE — Massuk, live acoustique (WAN Show 2022)', url: '' },
  ];
  const videosToDisplay = videoLinks.length > 0 ? videoLinks : defaultVideos;

  return (
    <main>
      {/* Hero Section */}
      <section style={{ position: 'relative', height: '96vh', minHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: '#111' }}>
        <Image 
          src="/uploads/slider1-mosayane.jpg" 
          alt="Mosayane" 
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }} 
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.05) 55%, rgba(10,10,10,0.35) 100%)' }}></div>
        <div style={{ position: 'absolute', top: '100px', right: 'clamp(20px,5vw,72px)', fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#F7F5F2', opacity: 0.85 }}>Artiste indépendante — Cameroun ↗</div>
        <div style={{ position: 'absolute', left: '24px', bottom: '56px', writingMode: 'vertical-rl', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#F7F5F2', opacity: 0.7 }}>↓ Explore / Scroll</div>
        <div className="layout-wrapper" style={{ position: 'relative', paddingBottom: '64px' }}>
          <h1 className="h1-hero" style={{ color: '#F7F5F2' }}>Mosayane</h1>
          <p className="subtitle-hero" style={{ color: '#F7F5F2' }}>Une voix sans frontières</p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link href="/bio" className="btn-primary">Découvrir sa bio</Link>
            <Link href="/music" className="btn-outline">Écouter</Link>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-light" style={{ padding: '20px 0 40px', overflow: 'hidden' }}>
        <div className="marquee-container">
          <span className="marquee-text">Talent musical — Nous inspirons & connectons — Talent musical — Nous inspirons & connectons —</span>
          <span className="marquee-text">Talent musical — Nous inspirons & connectons — Talent musical — Nous inspirons & connectons —</span>
        </div>
      </section>

      {/* Bio Section */}
      <section className="bg-light section-padding">
        <div className="layout-wrapper" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
          <div style={{ aspectRatio: '4/5', overflow: 'hidden', borderRadius: '2px', position: 'relative' }}>
            <Image 
              src="/uploads/img-20221214-wa0042.jpg" 
              alt="Portrait de Mosayane 2 Claire" 
              fill
              style={{ objectFit: 'cover' }} 
            />
          </div>
          <div>
            <span className="tag-label">Bio</span>
            <h2 className="h2-title" style={{ marginBottom: '20px' }}>Une artiste façonnée par plusieurs cultures</h2>
            <p style={{ fontSize: '16px', lineHeight: 1.75, opacity: 0.82, margin: '0 0 24px' }}>
              {bioText}
            </p>
            <Link href="/bio" style={{ fontSize: '14px', fontWeight: 600, textDecoration: 'underline' }}>Lire sa bio complète →</Link>
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section className="bg-light section-padding-bottom">
        <div className="layout-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '24px', flexWrap: 'wrap', marginBottom: '28px' }}>
          <div>
            <span className="tag-label">Music</span>
            <h2 className="h2-subtitle" style={{ color: 'var(--ink-light)' }}>Dûlû eh akab — voyages et partages</h2>
          </div>
          <Link href="/music" style={{ fontSize: '14px', fontWeight: 600, textDecoration: 'underline', color: 'var(--ink-light)' }}>Tous les titres →</Link>
        </div>
        <div className="layout-wrapper">
          {musicToDisplay.slice(0, 1).map((music) => (
            <div key={music.id} style={{ background: '#fff', borderRadius: '4px', padding: '12px 28px', boxShadow: '0 30px 70px rgba(0,0,0,0.1)' }}>
              <iframe 
                title={music.title} 
                width="100%" 
                height="80" 
                scrolling="no" 
                frameBorder="no" 
                src={music.url} 
                style={{ borderRadius: '4px', display: 'block' }}>
              </iframe>
            </div>
          ))}
        </div>
      </section>

      {/* Image Section */}
      <figure style={{ margin: 0, height: '64vh', minHeight: '360px', overflow: 'hidden', position: 'relative' }}>
        <Image 
          src="/uploads/Mosayane-music.jpeg" 
          alt="Mosayane avec sa guitare, robe jaune" 
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 8%' }} 
        />
      </figure>

      {/* Tour Section */}
      <section className="bg-dark section-padding" style={{ textAlign: 'center' }}>
        <span className="tag-label">Sur les scènes internationales</span>
        <h2 className="h2-title" style={{ marginBottom: '28px' }}>De Yaoundé aux scènes du monde</h2>
        <Link href="/tour" className="btn-primary">Voir les scènes</Link>
      </section>

      {/* Videos Section */}
      <section className="bg-light section-padding">
        <div className="layout-wrapper">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '24px', flexWrap: 'wrap', marginBottom: '28px' }}>
            <div>
              <span className="tag-label">Videos</span>
              <h2 className="h2-subtitle">Sur scène et en studio</h2>
            </div>
            <Link href="/videos" style={{ fontSize: '14px', fontWeight: 600, textDecoration: 'underline' }}>Toutes les vidéos →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {videosToDisplay.map((video) => (
              <div key={video.id}>
                <div style={{ aspectRatio: '16/9', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  {video.url ? (
                    <iframe 
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      src={video.url}
                      title={video.title} 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  ) : (
                    <span style={{ color: '#F7F5F2', opacity: 0.4, fontSize: '13px' }}>Lien YouTube à ajouter</span>
                  )}
                </div>
                <p style={{ fontSize: '14.5px', margin: '12px 0 0' }}>{video.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
