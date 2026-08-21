import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

async function markAsRead(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  if (id) {
    await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true }
    });
    revalidatePath('/admin/contact');
    revalidatePath('/admin');
  }
}

async function deleteMessage(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  if (id) {
    await prisma.contactMessage.delete({ where: { id } });
    revalidatePath('/admin/contact');
    revalidatePath('/admin');
  }
}

export default async function AdminContactPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '20px', fontFamily: 'var(--font-fraunces)' }}>Messages Reçus</h2>
      
      {messages.length === 0 ? (
        <p style={{ opacity: 0.6 }}>Aucun message pour le moment.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ background: msg.isRead ? '#f9f9f9' : '#fff', borderRadius: '12px', border: msg.isRead ? '1px solid #eee' : '1px solid var(--accent)', padding: '24px', boxShadow: msg.isRead ? 'none' : '0 4px 20px rgba(0,0,0,0.05)', position: 'relative' }}>
              
              {!msg.isRead && (
                <span style={{ position: 'absolute', top: '24px', right: '24px', background: 'var(--accent)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>Nouveau</span>
              )}
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #eee' }}>
                <div>
                  <div style={{ fontSize: '12px', opacity: 0.5, textTransform: 'uppercase', marginBottom: '4px' }}>De</div>
                  <div style={{ fontWeight: 600 }}>{msg.name}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', opacity: 0.5, textTransform: 'uppercase', marginBottom: '4px' }}>Email</div>
                  <div><a href={`mailto:${msg.email}`} style={{ color: 'var(--accent)', textDecoration: 'none' }}>{msg.email}</a></div>
                </div>
                {msg.phone && (
                  <div>
                    <div style={{ fontSize: '12px', opacity: 0.5, textTransform: 'uppercase', marginBottom: '4px' }}>Téléphone</div>
                    <div><a href={`tel:${msg.phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>{msg.phone}</a></div>
                  </div>
                )}
                <div>
                  <div style={{ fontSize: '12px', opacity: 0.5, textTransform: 'uppercase', marginBottom: '4px' }}>Date</div>
                  <div>{msg.createdAt.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                </div>
              </div>
              
              <div style={{ fontSize: '15px', lineHeight: 1.6, whiteSpace: 'pre-wrap', marginBottom: '24px' }}>
                {msg.message}
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                {!msg.isRead && (
                  <form action={markAsRead}>
                    <input type="hidden" name="id" value={msg.id} />
                    <button type="submit" className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px', border: 'none' }}>Marquer comme lu</button>
                  </form>
                )}
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={msg.id} />
                  <button type="submit" style={{ background: 'transparent', color: '#ff4d4d', border: '1px solid #ff4d4d', padding: '8px 16px', borderRadius: '30px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Supprimer</button>
                </form>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
