import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

async function deleteSubscriber(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  if (id) {
    await prisma.newsletterSubscriber.delete({ where: { id } });
    revalidatePath('/admin/newsletter');
    revalidatePath('/admin');
  }
}

export default async function AdminNewsletterPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // Calculate a simple CSV string for export
  const csvContent = "Email,Date d'inscription\n" + subscribers.map(sub => `${sub.email},${sub.createdAt.toISOString()}`).join('\n');
  const csvDataUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600, fontFamily: 'var(--font-fraunces)', margin: 0 }}>Abonnés Newsletter</h2>
        {subscribers.length > 0 && (
          <a href={csvDataUri} download="mosayane_newsletter_subscribers.csv" className="btn-primary" style={{ fontSize: '13px', padding: '8px 16px', textDecoration: 'none' }}>Exporter (CSV)</a>
        )}
      </div>
      
      {subscribers.length === 0 ? (
        <p style={{ opacity: 0.6 }}>Aucun abonné pour le moment.</p>
      ) : (
        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #eee', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead style={{ background: '#f9f9f9', textAlign: 'left' }}>
              <tr>
                <th style={{ padding: '16px', borderBottom: '1px solid #eee', fontWeight: 600 }}>Email</th>
                <th style={{ padding: '16px', borderBottom: '1px solid #eee', fontWeight: 600 }}>Date d'inscription</th>
                <th style={{ padding: '16px', borderBottom: '1px solid #eee', fontWeight: 600, textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr key={sub.id}>
                  <td style={{ padding: '16px', borderBottom: '1px solid #eee' }}>{sub.email}</td>
                  <td style={{ padding: '16px', borderBottom: '1px solid #eee', color: '#666' }}>{sub.createdAt.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                  <td style={{ padding: '16px', borderBottom: '1px solid #eee', textAlign: 'right' }}>
                    <form action={deleteSubscriber}>
                      <input type="hidden" name="id" value={sub.id} />
                      <button type="submit" style={{ background: 'transparent', color: '#ff4d4d', border: 'none', cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' }}>Désabonner</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
