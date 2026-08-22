import Image from "next/image";
import Link from "next/link";
import HeroSlider from '@/components/HeroSlider';
import { prisma } from '@/lib/prisma';
import VideoPlayer from '@/components/VideoPlayer';

import CustomAudioPlayer from '@/components/CustomAudioPlayer';

export default async function Home() {
  const bio = await prisma.bioContent.findFirst({ where: { id: 1 } });
  
  const videoLinks = await prisma.mediaLink.findMany({
    where: { type: 'youtube' },
    orderBy: { createdAt: 'desc' },
    take: 6
  });

  const defaultBio = `Delphine Mebonde, alias Mosayane 2 Claire, est une artiste camerounaise qui allie musique, danse, chant et théâtre. Découverte avec son premier single « Yi Menga Sem », elle porte un mélange complexe de vécus et de cultures entre le Cameroun et le Sénégal.`;
  const bioText = bio?.content ? bio.content.substring(0, 250) + '...' : defaultBio;

  const defaultVideos = [
    { id: '1', title: '"NO WAY" — live acoustique (family time)', url: 'https://www.youtube.com/embed/zjZhEkcmtI8' },
    { id: '2', title: 'Là-bas comme ici (JMC sound checking)', url: 'https://www.youtube.com/embed/upHDIrSpD8s' },
    { id: '3', title: 'Ekié, live (JMC 2023)', url: 'https://www.youtube.com/embed/rnD-k3rYuzk' },
    { id: '4', title: 'Massuk, live acoustique (WAN Show 2022)', url: 'https://www.youtube.com/embed/qsGyYAJIGiA' },
    { id: '5', title: 'Afidi (paroles)', url: 'https://www.youtube.com/embed/qe6_np3GDt0' },
    { id: '6', title: 'Simplement (audio + lyric)', url: 'https://www.youtube.com/embed/oHCzLp1Vdpg' },
  ];
  const videosToDisplay = videoLinks.length > 0 ? videoLinks : defaultVideos;

  return (
    <main>
      {/* Hero Section */}
      <HeroSlider />

      {/* Mini Audio Player Section */}
      <section style={{ padding: '30px 20px', background: 'var(--bg-color)' }}>
        <CustomAudioPlayer 
          title="Mosayane - Mintie" 
          src="/uploads/Mintie.mp3" 
        />
      </section>

      {/* Marquee */}
      <section className="bg-light" style={{ padding: '20px 0 40px', overflow: 'hidden' }}>
        <div className="marquee-container">
          <span className="marquee-text">Musique, Danse & Théâtre — Vibrations afro-acoustiques — Une voix sans frontières — De Yaoundé au Monde — Racines & Universalité — </span>
          <span className="marquee-text">Musique, Danse & Théâtre — Vibrations afro-acoustiques — Une voix sans frontières — De Yaoundé au Monde — Racines & Universalité — </span>
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
                <VideoPlayer url={video.url} title={video.title} />

                <p style={{ fontSize: '14.5px', margin: '12px 0 0' }}>{video.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
