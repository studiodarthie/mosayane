import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export default async function TourPage() {
  const tourDates = await prisma.tourDate.findMany({
    orderBy: { date: 'asc' }
  });

  // Mockup fallback
  const defaultDates = [
    { id: '1', date: '', location: 'Institut français de Yaoundé — création du spectacle « Voyage et partage »', ticketUrl: '' },
    { id: '2', date: '', location: 'Journées musicales de Carthage (Tunisie)', ticketUrl: '' },
    { id: '3', date: '', location: "Marché des Arts et du Spectacle d'Abidjan", ticketUrl: '' },
    { id: '4', date: '', location: 'Festival international de Musique et des arts de Dakar', ticketUrl: '' },
  ];

  const datesToDisplay = tourDates.length > 0 ? tourDates : defaultDates;

  return (
    <main>
      <section className="bg-dark section-padding" style={{ textAlign: 'center' }}>
        <div className="layout-wrapper" style={{ maxWidth: '900px' }}>
          <span className="tag-label">Tour</span>
          <h1 className="h1-hero" style={{ fontSize: 'clamp(36px,5vw,60px)', marginBottom: '40px' }}>De Yaoundé aux scènes du monde</h1>
          <div style={{ textAlign: 'left' }}>
            {datesToDisplay.map((tour) => (
              <div key={tour.id} style={{ display: 'flex', gap: '16px', padding: '18px 0', borderTop: '1px solid rgba(247,245,242,0.15)', alignItems: 'center' }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-fraunces)' }}>—</span>
                <span style={{ fontSize: '16px', opacity: 0.9 }}>
                  {tour.date && <strong style={{ marginRight: '16px' }}>{tour.date}</strong>}
                  {tour.location}
                  {tour.ticketUrl && <a href={tour.ticketUrl} target="_blank" rel="noreferrer" style={{ marginLeft: '16px', color: 'var(--accent)', fontSize: '14px', textDecoration: 'underline' }}>Billets</a>}
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '13px', opacity: 0.5, marginTop: '24px' }}>Nouvelles dates à venir — suivez les réseaux sociaux pour les annonces.</p>
        </div>
      </section>

      <figure style={{ margin: 0, height: '56vh', minHeight: '320px', overflow: 'hidden', position: 'relative' }}>
        <Image 
          src="/uploads/485113089_1268796818129661_3258894131628726203_n.jpg" 
          alt="Mosayane en concert" 
          fill
          style={{ objectFit: 'cover' }} 
        />
      </figure>
    </main>
  );
}
