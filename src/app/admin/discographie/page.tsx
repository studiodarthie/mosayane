import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { put } from '@vercel/blob';

async function addRelease(formData: FormData) {
  'use server';
  const title = formData.get('title') as string;
  const year = formData.get('year') as string;
  const url = formData.get('url') as string;
  const file = formData.get('cover') as File;
  const type = formData.get('type') as string;
  
  if (title && url && type && year && file && file.size > 0) {
    const blob = await put(file.name, file, { access: 'public' });
    await prisma.release.create({
      data: { title, year, url, cover: blob.url, type }
    });
    revalidatePath('/discographie');
    revalidatePath('/admin/discographie');
  }
}

async function deleteRelease(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  if (id) {
    await prisma.release.delete({ where: { id } });
    revalidatePath('/discographie');
    revalidatePath('/admin/discographie');
  }
}

export default async function AdminDiscographiePage() {
  const releases = await prisma.release.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '20px', fontFamily: 'var(--font-fraunces)' }}>Gérer la Discographie</h2>
      
      <div style={{ marginBottom: '40px', background: 'var(--bg-light)', padding: '20px', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Ajouter un single ou album</h3>
        <form action={addRelease} style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr' }}>
          <select name="type" required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}>
            <option value="single">Single / EP</option>
            <option value="album">Album Live</option>
          </select>
          <input type="text" name="title" placeholder="Titre (ex: AFIDI)" required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
          <input type="text" name="year" placeholder="Année (ex: 2023)" required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
          <input type="file" name="cover" accept="image/*" required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', background: '#fff' }} />
          <input type="url" name="url" placeholder="Lien Apple Music / Spotify" required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', gridColumn: 'span 2' }} />
          <button type="submit" className="btn-primary" style={{ border: 'none', justifySelf: 'start', padding: '10px 24px' }}>Ajouter</button>
        </form>
      </div>

      <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Catalogue</h3>
      {releases.length === 0 ? (
        <p style={{ opacity: 0.6 }}>Aucune discographie pour le moment.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {releases.map((r) => (
            <li key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ width: '60px', height: '60px', background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                  <img src={r.cover} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <span style={{ display: 'inline-block', padding: '2px 6px', background: '#eee', borderRadius: '4px', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>{r.type}</span>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>{r.title} ({r.year})</strong>
                  <a href={r.url} target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--accent)' }}>Lien streaming</a>
                </div>
              </div>
              <form action={deleteRelease}>
                <input type="hidden" name="id" value={r.id} />
                <button type="submit" style={{ background: '#ff4d4d', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>Supprimer</button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
