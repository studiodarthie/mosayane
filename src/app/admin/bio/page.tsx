import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

async function updateBio(formData: FormData) {
  'use server';
  const content = formData.get('content') as string;
  
  if (content) {
    await prisma.bioContent.upsert({
      where: { id: 1 },
      update: { content },
      create: { id: 1, content }
    });
    revalidatePath('/bio');
    revalidatePath('/admin/bio');
  }
}

export default async function AdminBioPage() {
  const bio = await prisma.bioContent.findFirst({
    where: { id: 1 }
  });

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '20px', fontFamily: 'var(--font-fraunces)' }}>Modifier la Biographie</h2>
      <form action={updateBio} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <textarea 
          name="content" 
          defaultValue={bio?.content || ''}
          rows={12}
          style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '15px', fontFamily: 'inherit', resize: 'vertical' }}
          placeholder="Entrez le texte de la biographie ici..."
        ></textarea>
        <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', border: 'none' }}>Enregistrer</button>
      </form>
    </div>
  );
}
