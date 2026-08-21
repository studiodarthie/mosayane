import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export default async function BioPage() {
  const bio = await prisma.bioContent.findFirst({
    where: { id: 1 }
  });

  const defaultBio = `Delphine Mebonde, alias Mosayane 2 Claire, est une artiste camerounaise originaire du littoral et du Centre, avec une influence sénégalaise transmise par sa famille. C'est de son père qu'est née sa passion pour le chant et la guitare.

Le grand public la découvre avec son premier single « Yi Menga Sem » (Ai-je péché), mais elle est déjà une habituée de la scène. Titulaire d'un Master en production théâtrale, elle allie musique, danse, chant et théâtre dans ses performances, transportant le spectateur dans une toute autre dimension que celle connue du contexte des concerts.

Son premier spectacle, tiré de l'album « Dûlû eh akab » (Voyages et partages), a été créé à l'Institut français de Yaoundé avant de tourner sur les scènes africaines et internationales, dont les Journées musicales de Carthage, le Marché des Arts et du Spectacle d'Abidjan, et le Festival international de Musique et des arts de Dakar.

Originaire des régions du littoral camerounais par son père, et du Centre par sa mère, l'artiste chante en langue beti puis en français, tout en gardant l'influence de son pays natal, le Sénégal. C'est ce mélange de vécus et de cultures qui fait d'elle une artiste engagée, exceptionnelle, et remplie d'émotions sur scène.`;

  const bioText = bio?.content || defaultBio;

  return (
    <main>
      <section className="bg-dark section-padding">
        <div className="layout-wrapper">
          <span className="tag-label">Bio</span>
          <h1 className="h1-hero" style={{ maxWidth: '760px', fontSize: 'clamp(36px,5vw,64px)', color: 'var(--ink-dark)' }}>Une artiste façonnée par plusieurs cultures</h1>
        </div>
      </section>
      
      <section className="bg-light section-padding">
        <div className="layout-wrapper" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: '16px', lineHeight: 1.75, opacity: 0.82, margin: '0 0 24px', whiteSpace: 'pre-wrap' }}>
              {bioText}
            </div>
            
            <blockquote style={{ fontFamily: 'var(--font-fraunces)', fontStyle: 'italic', fontWeight: 500, fontSize: '21px', lineHeight: 1.5, margin: '0 0 24px', paddingLeft: '20px', borderLeft: '2px solid var(--accent)' }}>
              « Mon œuvre est tirée d'expériences vécues et entendues. Vécues du fait que d'où je suis née, j'ai transporté toute une histoire pour ici ; entendues parce que de là où je suis née, il m'a été raconté beaucoup d'histoires d'ici. »
            </blockquote>
            <p style={{ fontSize: '16px', lineHeight: 1.75, opacity: 0.82, margin: 0 }}>
              « Le monde est semblable à une maison familiale où chaque membre est l'exemple d'une pièce. Toutes les pièces sont interdépendantes bien qu'ayant chacune sa spécificité. Nous sommes tous égaux, par conséquent nous avons mutuellement besoin les uns des autres. »
            </p>
          </div>
          
          <div style={{ position: 'relative', paddingTop: '36px' }}>
            <div style={{ aspectRatio: '4/5', overflow: 'hidden', borderRadius: '2px', position: 'relative' }}>
              <Image 
                src="/uploads/img-20221214-wa0042.jpg" 
                alt="Portrait de Mosayane 2 Claire" 
                fill
                style={{ objectFit: 'cover' }} 
              />
            </div>
            <div style={{ position: 'absolute', left: '-28px', bottom: '-40px', width: '48%', aspectRatio: '4/5', overflow: 'hidden', borderRadius: '2px', boxShadow: '0 20px 50px rgba(0,0,0,0.25)', border: '6px solid var(--bg-light)' }}>
              <Image 
                src="/uploads/484902433_1268858508123492_3441982235380329345_n.jpg" 
                alt="Mosayane, collier rouge" 
                fill
                style={{ objectFit: 'cover' }} 
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
