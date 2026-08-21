import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';

async function addPhoto(formData: FormData) {
  'use server';
  const title = formData.get('title') as string;
  const url = formData.get('url') as string;
  
  if (title && url) {
    await prisma.photo.create({
      data: { title, url }
    });
    revalidatePath('/photos');
    revalidatePath('/blog');
    revalidatePath('/admin/photos');
  }
}

async function deletePhoto(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  if (id) {
    await prisma.photo.delete({ where: { id } });
    revalidatePath('/photos');
    revalidatePath('/blog');
    revalidatePath('/admin/photos');
  }
}

export default async function AdminPhotosPage() {
  const photos = await prisma.photo.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '20px', fontFamily: 'var(--font-fraunces)' }}>Gérer la Galerie Photos</h2>
      
      <div style={{ marginBottom: '40px', background: 'var(--bg-light)', padding: '20px', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Ajouter une photo</h3>
        <form action={addPhoto} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 200px' }}>
            <input type="text" name="title" placeholder="Description de la photo" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ flex: '2 1 300px' }}>
            <input type="text" name="url" placeholder="URL de l'image (ex: /uploads/photo.jpg)" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
          <button type="submit" className="btn-primary" style={{ border: 'none', padding: '10px 24px' }}>Ajouter</button>
        </form>
      </div>

      <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Photos existantes</h3>
      {photos.length === 0 ? (
        <p style={{ opacity: 0.6 }}>Aucune photo dans la galerie.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
          {photos.map((p) => (
            <div key={p.id} style={{ background: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', background: '#e0e0e0' }}>
                <Image src={p.url} alt={p.title} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <strong style={{ fontSize: '13px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={p.title}>{p.title}</strong>
                <form action={deletePhoto}>
                  <input type="hidden" name="id" value={p.id} />
                  <button type="submit" style={{ width: '100%', background: '#ff4d4d', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Supprimer</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
