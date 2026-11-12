import VideoPlayer from '@/components/VideoPlayer';

// Videos come straight from YouTube (channel Mosayane Officiel), newest first.
const videos = [
  { id: 'Ujhzk2ewDXI', title: 'Ma sūg (répétition)' },
  { id: 'TNBlX8dF9XE', title: '"NO WAY", live acoustique (family time)' },
  { id: '9AYaUYrm4vo', title: 'Là-bas comme ici (JMC sound checking)' },
  { id: 'f9oxc6VCsJ8', title: 'Ekié (JMC sound checking)' },
  { id: 'dvaVBJ48Blc', title: 'AFIDI (paroles)' },
  { id: 'GLnSCQcNQ7c', title: 'Simplement (audio + lyric)' },
  { id: 'rnD-k3rYuzk', title: 'Simplement, live (avec le groupe 5th Race)' },
  { id: 'qe6_np3GDt0', title: 'Là-bas comme ici, live (JMC 2023)' },
  { id: 'U1cWcamBK1o', title: 'Wetam (Fest. Int. Kouleur Acoustic 2022)' },
];

export default function VideosPage() {
  return (
    <main>
      <section className="bg-dark section-padding">
        <div className="layout-wrapper">
          <span className="tag-label">Videos</span>
          <h1 className="h1-hero" style={{ fontSize: 'clamp(36px,5vw,64px)', maxWidth: '760px' }}>Sur scène et en studio</h1>
        </div>
      </section>

      <section className="bg-light section-padding">
        <div className="layout-wrapper">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {videos.map((video) => (
              <div key={video.id}>
                <VideoPlayer url={`https://www.youtube.com/embed/${video.id}`} title={video.title} />
                <p style={{ fontSize: '14.5px', margin: '12px 0 0' }}>{video.title}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <a href="https://www.youtube.com/channel/UC0eHii8Hhu3l3Yqe-Yq99kg" target="_blank" rel="noopener noreferrer" className="btn-primary">Regarder sur YouTube</a>
          </div>
        </div>
      </section>
    </main>
  );
}
