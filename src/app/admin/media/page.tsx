import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

async function addMedia(formData: FormData) {
  'use server';
  const title = formData.get('title') as string;
  const url = formData.get('url') as string;
  const type = formData.get('type') as string;
  
  if (title && url && type) {
    await prisma.mediaLink.create({
      data: { title, url, type }
    });
    revalidatePath('/music');
    revalidatePath('/videos');
    revalidatePath('/admin/media');
  }
}

async function deleteMedia(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  if (id) {
    await prisma.mediaLink.delete({ where: { id } });
    revalidatePath('/music');
    revalidatePath('/videos');
    revalidatePath('/admin/media');
  }
}

export default async function AdminMediaPage() {
  const mediaList = await prisma.mediaLink.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '20px', fontFamily: 'var(--font-fraunces)' }}>Gérer les Médias</h2>
      
      <div style={{ marginBottom: '40px', background: 'var(--bg-light)', padding: '20px', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Ajouter un média</h3>
        <form action={addMedia} style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr' }}>
          <select name="type" required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}>
            <option value="youtube">Vidéo (YouTube Embed URL)</option>
            <option value="soundcloud">Musique (SoundCloud Player Embed URL)</option>
          </select>
          <input type="text" name="title" placeholder="Titre du morceau ou de la vidéo" required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
          <input type="url" name="url" placeholder="URL d'intégration (embed)" required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
          <button type="submit" className="btn-primary" style={{ border: 'none', justifySelf: 'start', padding: '10px 24px' }}>Ajouter</button>
        </form>
      </div>

      <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Médias existants</h3>
      {mediaList.length === 0 ? (
        <p style={{ opacity: 0.6 }}>Aucun média ajouté.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {mediaList.map((m) => (
            <li key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
              <div>
                <span style={{ display: 'inline-block', padding: '4px 8px', background: m.type === 'youtube' ? '#ffcccc' : '#ffebd6', color: m.type === 'youtube' ? '#cc0000' : '#d95d00', borderRadius: '4px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>{m.type}</span>
                <strong style={{ display: 'block', marginBottom: '4px' }}>{m.title}</strong>
                <a href={m.url} target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: '#666', wordBreak: 'break-all' }}>{m.url}</a>
              </div>
              <form action={deleteMedia}>
                <input type="hidden" name="id" value={m.id} />
                <button type="submit" style={{ background: '#ff4d4d', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>Supprimer</button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
