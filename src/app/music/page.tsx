import { prisma } from '@/lib/prisma';

export default async function MusicPage() {
  const musicLinks = await prisma.mediaLink.findMany({
    where: { type: 'soundcloud' },
    orderBy: { createdAt: 'desc' }
  });

  const defaultMusic = [
    { id: '1', title: 'Ekié', duration: "05:17", url: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fuser-573562940%2F1-ekie-mosayane-web-mp3%3Futm_medium%3Dapi%26utm_campaign%3Dsocial_sharing%26utm_source%3Did_314642&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false" },
    { id: '2', title: "Mintié", duration: "07:43", url: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fuser-573562940%2F2-mintie-mosayane-web-mp3%3Futm_medium%3Dapi%26utm_campaign%3Dsocial_sharing%26utm_source%3Did_314642&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false" },
    { id: '3', title: "Wétam", duration: "06:10", url: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fuser-573562940%2F3-we-tam-mosayane-web-mp3%3Futm_medium%3Dapi%26utm_campaign%3Dsocial_sharing%26utm_source%3Did_314642&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false" },
    { id: '4', title: "Masuk", duration: "05:31", url: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fuser-573562940%2F4-masuk-mosayane-web-mp3%3Futm_medium%3Dapi%26utm_campaign%3Dsocial_sharing%26utm_source%3Did_314642&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false" },
    { id: '5', title: "Là-bas comme ici", duration: "06:19", url: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fuser-573562940%2F5-la-bas-comme-ici-mosayane%3Futm_medium%3Dapi%26utm_campaign%3Dsocial_sharing%26utm_source%3Did_314642&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false" },
    { id: '6', title: "Afrika", duration: "07:56", url: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fuser-573562940%2F6-afrika-mosayane-web-mp3%3Futm_medium%3Dapi%26utm_campaign%3Dsocial_sharing%26utm_source%3Did_314642&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false" }
  ];

  const tracksToDisplay = musicLinks.length > 0 ? musicLinks : defaultMusic;

  return (
    <main>
      <section className="bg-dark section-padding">
        <div className="layout-wrapper">
          <span className="tag-label">Music</span>
          <h1 className="h1-hero" style={{ fontSize: 'clamp(36px,5vw,64px)', maxWidth: '760px' }}>Dûlû eh akab — voyages et partages</h1>
        </div>
      </section>
      <section className="bg-light section-padding">
        <div className="layout-wrapper" style={{ maxWidth: '900px' }}>
          <div>
            {tracksToDisplay.map((track: any) => (
              <div key={track.id} style={{ background: '#fff', borderRadius: '4px', padding: '20px 28px', boxShadow: '0 20px 50px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                  <h3 style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500, fontSize: '19px', margin: 0, color: 'var(--ink-light)' }}>{track.title}</h3>
                  <span style={{ fontSize: '13px', opacity: 0.5, fontVariantNumeric: 'tabular-nums', color: 'var(--ink-light)' }}>{track.duration || ''}</span>
                </div>
                <iframe 
                  title={track.title} 
                  width="100%" 
                  height="80" 
                  scrolling="no" 
                  frameBorder="no" 
                  src={track.url} 
                  style={{ borderRadius: '4px', display: 'block' }}>
                </iframe>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <a href="https://music.apple.com/us/artist/mosayane-2-claire/1533978227" target="_blank" rel="noopener noreferrer" className="btn-primary">Apple Music</a>
            <a href="https://www.deezer.com/fr/artist/108724322" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ borderColor: 'var(--ink-light)', color: 'var(--ink-light)' }}>Deezer</a>
          </div>
        </div>
      </section>
    </main>
  );
}
