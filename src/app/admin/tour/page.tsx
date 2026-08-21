import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

async function addTourDate(formData: FormData) {
  'use server';
  const date = formData.get('date') as string;
  const location = formData.get('location') as string;
  const ticketUrl = formData.get('ticketUrl') as string;
  
  if (date && location) {
    await prisma.tourDate.create({
      data: { date, location, ticketUrl: ticketUrl || null }
    });
    revalidatePath('/tour');
    revalidatePath('/admin/tour');
  }
}

async function deleteTourDate(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  if (id) {
    await prisma.tourDate.delete({ where: { id } });
    revalidatePath('/tour');
    revalidatePath('/admin/tour');
  }
}

export default async function AdminTourPage() {
  const dates = await prisma.tourDate.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '20px', fontFamily: 'var(--font-fraunces)' }}>Gérer les Dates de Tournée</h2>
      
      <div style={{ marginBottom: '40px', background: 'var(--bg-light)', padding: '20px', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Ajouter une date</h3>
        <form action={addTourDate} style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr' }}>
          <input type="text" name="date" placeholder="Date (ex: 25 OCT 2026)" required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
          <input type="text" name="location" placeholder="Lieu (ex: Yaoundé - IF)" required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
          <input type="url" name="ticketUrl" placeholder="Lien billetterie (Optionnel)" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', gridColumn: 'span 2' }} />
          <button type="submit" className="btn-primary" style={{ border: 'none', justifySelf: 'start', padding: '10px 24px' }}>Ajouter</button>
        </form>
      </div>

      <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Dates existantes</h3>
      {dates.length === 0 ? (
        <p style={{ opacity: 0.6 }}>Aucune date pour le moment.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {dates.map((d) => (
            <li key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
              <div>
                <strong style={{ display: 'block', marginBottom: '4px' }}>{d.date}</strong>
                <span style={{ fontSize: '14px', opacity: 0.7 }}>{d.location}</span>
                {d.ticketUrl && <a href={d.ticketUrl} target="_blank" rel="noreferrer" style={{ display: 'block', fontSize: '12px', marginTop: '4px', color: 'var(--accent)' }}>Lien billetterie</a>}
              </div>
              <form action={deleteTourDate}>
                <input type="hidden" name="id" value={d.id} />
                <button type="submit" style={{ background: '#ff4d4d', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>Supprimer</button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
