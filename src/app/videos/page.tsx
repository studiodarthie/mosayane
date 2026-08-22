import { prisma } from '@/lib/prisma';
import VideoPlayer from '@/components/VideoPlayer';
export default async function VideosPage() {
  const videoLinks = await prisma.mediaLink.findMany({
    where: { type: 'youtube' },
    orderBy: { createdAt: 'desc' }
  });

  const defaultVideos = [
    { id: '1', title: '"NO WAY" — live acoustique (family time)', url: "https://www.youtube.com/embed/TNBlX8dF9XE" },
    { id: '2', title: 'Wetam (Fest. Int. Kouleur Acoustic 2022)', url: "https://www.youtube.com/embed/U1cWcamBK1o" },
  ];
  
  const additionalVideosList = [
    { title: "Ma sūg (répétition)", date: "2 mars 2026" },
    { title: '"NO WAY" — live acoustique (family time)', date: "21 oct. 2024" },
    { title: "Là-bas comme ici (JMC sound checking)", date: "28 avr. 2024" },
    { title: "Ekié (JMC) sound checking", date: "28 avr. 2024" },
    { title: "Afidi (paroles)", date: "6 oct. 2023" },
    { title: "Simplement (audio + lyric)", date: "27 févr. 2023" },
    { title: "Simplement, live (avec le groupe 5th Race)", date: "27 févr. 2023" },
    { title: "Journées musicales de Carthage — Là-bas comme ici (live JMC 2023)", date: "8 févr. 2023" }
  ];

  const videosToDisplay = videoLinks.length > 0 ? videoLinks : defaultVideos;

  return (
    <main>
      <section className="bg-dark section-padding">
        <div className="layout-wrapper">
          <span className="tag-label">Videos</span>
          <h1 className="h1-hero" style={{ fontSize: 'clamp(36px,5vw,64px)', maxWidth: '760px', marginBottom: '40px' }}>Sur scène et en studio</h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '24px', marginBottom: '40px' }}>
            {videosToDisplay.map((video) => (
              <div key={video.id}>
                <VideoPlayer url={video.url} title={video.title} />
                <p style={{ fontSize: '14px', margin: '10px 0 0', color: 'var(--ink-dark)' }}>{video.title}</p>
              </div>
            ))}
          </div>
          
          <div style={{ color: 'var(--ink-dark)' }}>
            {additionalVideosList.map((video, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', gap: '24px', alignItems: 'baseline', padding: '15px 0', borderTop: '1px solid rgba(247,245,242,0.12)' }}>
                <span style={{ fontSize: '15.5px' }}>{video.title}</span>
                <span style={{ fontSize: '12.5px', opacity: 0.5, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{video.date}</span>
              </div>
            ))}
          </div>
          <a href="https://www.youtube.com/channel/UC0eHii8Hhu3l3Yqe-Yq99kg" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: '32px' }}>Regarder sur YouTube</a>
        </div>
      </section>
    </main>
  );
}
