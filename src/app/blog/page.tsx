import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { BlogSidebar } from '@/components/BlogSidebar';

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <main style={{ background: 'var(--bg-light)', minHeight: '100vh' }}>
      <section className="section-padding" style={{ paddingBottom: '40px' }}>
        <div className="layout-wrapper">
          <span className="tag-label">Actualités</span>
          <h1 className="h1-hero" style={{ fontSize: 'clamp(36px,5vw,60px)', color: 'var(--ink)' }}>Le Blog</h1>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="layout-wrapper">
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '60px', alignItems: 'start' }}>
            {/* Main Content */}
            <div>
              {posts.length === 0 ? (
                <p style={{ opacity: 0.6 }}>Aucun article disponible pour le moment.</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
                  {posts.map(post => (
                    <article key={post.id} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease, box-shadow 0.3s ease', border: '1px solid rgba(0,0,0,0.03)' }}>
                      {post.coverImage && (
                        <Link href={`/blog/${post.slug}`} style={{ display: 'block', position: 'relative', height: '220px' }}>
                          <Image 
                            src={post.coverImage} 
                            alt={post.title} 
                            fill 
                            style={{ objectFit: 'cover', objectPosition: 'top' }} 
                          />
                        </Link>
                      )}
                      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontSize: '11px', opacity: 0.4, marginBottom: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                          {post.publishedAt.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '20px', fontWeight: 600, margin: '0 0 12px', lineHeight: 1.3 }}>{post.title}</h2>
                        </Link>
                        <p style={{ fontSize: '14px', lineHeight: 1.6, opacity: 0.6, margin: '0 0 24px', flex: 1 }}>
                          {post.excerpt.length > 120 ? post.excerpt.substring(0, 120) + '...' : post.excerpt}
                        </p>
                        <Link href={`/blog/${post.slug}`} style={{ alignSelf: 'flex-start', fontSize: '11px', padding: '10px 24px', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '30px', color: 'var(--accent)', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'all 0.2s' }} className="blog-card-btn">
                          Lire l'article
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="blog-sidebar-container">
              <BlogSidebar />
            </div>
          </div>

        </div>
      </section>

      {/* Adding a small style block to handle hover state and responsive grid */}
      <style dangerouslySetInnerHTML={{__html: `
        .blog-card-btn:hover {
          background: var(--accent);
          color: #fff !important;
          border-color: var(--accent) !important;
        }
        @media (max-width: 992px) {
          .layout-wrapper > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </main>
  );
}
