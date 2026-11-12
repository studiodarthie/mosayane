import VideoPlayer from '@/components/VideoPlayer';

// All videos of the YouTube channel @mosayaneofficiel2190 (Mosayane Officiel), newest first.
const videos = [
  { id: 'H1c55KY4ioA', title: 'Natural woman (reprise version Céline Dion)' },
  { id: 'Ujhzk2ewDXI', title: 'Ma sūg (répétition)' },
  { id: 'TNBlX8dF9XE', title: '"NO WAY", live acoustique (family time)' },
  { id: '9AYaUYrm4vo', title: 'Là-bas comme ici (JMC sound checking)' },
  { id: 'f9oxc6VCsJ8', title: 'Ekié (JMC sound checking)' },
  { id: 'dvaVBJ48Blc', title: 'AFIDI (paroles)' },
  { id: 'GLnSCQcNQ7c', title: 'Simplement (audio + lyric)' },
  { id: 'rnD-k3rYuzk', title: 'Simplement, live (avec le groupe 5th Race)' },
  { id: 'qe6_np3GDt0', title: 'Là-bas comme ici, live (JMC 2023)' },
  { id: 'IXeZXKfzoiA', title: 'La Tunisie s’enflamme sur un rythme de Mosayane' },
  { id: '9bbpg9X8mqs', title: 'Temps forts du show aux Journées musicales de Carthage' },
  { id: 'Oi7f2Qr1V8k', title: 'Mintié (sound checking JMC 2023)' },
  { id: 'oHCzLp1Vdpg', title: 'Ekié, live (JMC 2023)' },
  { id: 'crWp7K7vd_0', title: 'Dzemni, live extrait (JMC 2023)' },
  { id: 'PH7ACPQagsk', title: 'Massuk, live acoustique (WAN Show 2022)' },
  { id: '8W3TRj19mCE', title: 'Wetam (Fest. Int. Kouleur Acoustic 2022)' },
  { id: 'kHIga2OmOJI', title: 'Wetam (Institut Français du Cameroun)' },
  { id: 'mGYYfgRc16w', title: 'Mintié (Institut Français du Cameroun)' },
  { id: '625V2Na9010', title: 'Ekié (Institut Français du Cameroun)' },
  { id: 'qsGyYAJIGiA', title: 'Ekié (MASA 2022)' },
  { id: 'Svna7j8qMbw', title: 'Concert live' },
  { id: 'WHaRW1UEpYo', title: 'Afrika (live)' },
  { id: 'upHDIrSpD8s', title: 'Concert live, Institut Français de Yaoundé' },
  { id: '_4JWYIFqw4k', title: 'Mintié (live), Laboratoire musical de Bastos' },
  { id: 'zjZhEkcmtI8', title: 'Vidéo introductive, concert live' },
  { id: 'VVC8j2OsVww', title: 'Wétam (clip officiel)' },
  { id: 'U1cWcamBK1o', title: 'Wétam (version acoustique)' },
  { id: 'NYlx1Wif2OM', title: 'Mintié (version acoustique)' },
  { id: '9ebrqiHdu9k', title: 'Ebongw’a londo (cover)' },
  { id: 'k9DuyZRbing', title: 'Wétam (lyric vidéo officielle)' },
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
