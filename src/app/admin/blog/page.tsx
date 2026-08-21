import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import BlogEditor from '@/components/BlogEditor';

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' }
  });

  async function addPost(formData: FormData) {
    'use server';
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const coverImageFile = formData.get('coverImage') as File;
    let coverImage = null;

    if (coverImageFile && coverImageFile.size > 0) {
      const { put } = await import('@vercel/blob');
      const blob = await put(coverImageFile.name, coverImageFile, { access: 'public' });
      coverImage = blob.url;
    }

    if (title && slug && content) {
      await prisma.blogPost.create({
        data: {
          title,
          slug,
          excerpt,
          content,
          coverImage,
        }
      });
      revalidatePath('/admin/blog');
      revalidatePath('/blog');
    }
  }

  async function deletePost(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    if (id) {
      await prisma.blogPost.delete({ where: { id } });
      revalidatePath('/admin/blog');
      revalidatePath('/blog');
    }
  }

  return (
    <div>
      <h1 className="h1-hero" style={{ fontSize: '32px', marginBottom: '24px' }}>Gestion du Blog</h1>
      
      <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', marginBottom: '40px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Ajouter un article</h2>
        <form action={addPost} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Titre</label>
            <input type="text" name="title" required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Slug (URL ex: mon-article)</label>
            <input type="text" name="slug" required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Extrait (Résumé)</label>
            <textarea name="excerpt" rows={2} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Contenu (Texte)</label>
            <BlogEditor name="content" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Image de couverture à uploader</label>
            <input type="file" name="coverImage" accept="image/*" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <button type="submit" className="btn-primary" style={{ border: 'none', cursor: 'pointer', alignSelf: 'flex-start' }}>Ajouter l'article</button>
        </form>
      </div>

      <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Articles publiés ({posts.length})</h2>
        {posts.length === 0 ? (
          <p style={{ opacity: 0.6 }}>Aucun article pour le moment.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {posts.map((post) => (
              <li key={post.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #eee', borderRadius: '6px' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px', fontSize: '16px' }}>{post.title}</h3>
                  <div style={{ fontSize: '13px', opacity: 0.6 }}>Slug: /{post.slug} | Date: {post.publishedAt.toLocaleDateString('fr-FR')}</div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link href={`/blog/${post.slug}`} target="_blank" className="btn-outline" style={{ fontSize: '12px', padding: '6px 12px' }}>Voir</Link>
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id} />
                    <button type="submit" style={{ background: '#ff4444', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Supprimer</button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
