import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BlogSidebar } from '@/components/BlogSidebar';
import ShareButtons from '@/components/ShareButtons';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) {
    notFound();
  }

  const htmlContent = post.content;

  return (
    <main style={{ background: '#fff', minHeight: '100vh', paddingBottom: '80px' }}>
      {post.coverImage && (
        <section style={{ position: 'relative', height: '60vh', minHeight: '400px', background: '#111' }}>
          <Image 
            src={post.coverImage} 
            alt={post.title} 
            fill 
            style={{ objectFit: 'cover', objectPosition: 'top' }} 
            priority
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
          <div className="layout-wrapper" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '60px' }}>
            <Link href="/blog" style={{ color: '#fff', opacity: 0.6, fontSize: '13px', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '24px', display: 'inline-block' }}>← Retour au blog</Link>
            <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(32px, 5vw, 56px)', color: '#fff', margin: '0 0 16px', lineHeight: 1.2, maxWidth: '800px' }}>{post.title}</h1>
            <div style={{ color: '#fff', opacity: 0.6, fontSize: '14px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Publié le {post.publishedAt.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
        </section>
      )}

      {!post.coverImage && (
        <section className="section-padding" style={{ paddingBottom: '40px' }}>
          <div className="layout-wrapper">
            <Link href="/blog" style={{ color: 'var(--ink)', opacity: 0.5, fontSize: '13px', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '32px', display: 'inline-block' }}>← Retour au blog</Link>
            <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(32px, 5vw, 56px)', color: 'var(--ink)', margin: '0 0 24px', lineHeight: 1.2, maxWidth: '800px' }}>{post.title}</h1>
            <div style={{ color: 'var(--ink)', opacity: 0.5, fontSize: '14px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Publié le {post.publishedAt.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
        </section>
      )}

      <section style={{ padding: '64px 0' }}>
        <div className="layout-wrapper">
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '80px', alignItems: 'start' }} className="article-layout">
            
            {/* Article Content */}
            <article>
              <div style={{ fontSize: '20px', lineHeight: 1.6, fontFamily: 'var(--font-fraunces)', fontWeight: 500, opacity: 0.9, marginBottom: '48px', color: 'var(--accent)', borderLeft: '4px solid var(--accent)', paddingLeft: '24px' }}>
                {post.excerpt}
              </div>
              
              <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
              
              <ShareButtons title={post.title} />
            </article>

            {/* Sidebar */}
            <div className="blog-sidebar-container">
              <BlogSidebar />
            </div>

          </div>

        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .rich-text-content p { margin-bottom: 24px; line-height: 1.8; font-size: 17px; color: var(--ink); opacity: 0.85; }
        .rich-text-content a { color: var(--accent); text-decoration: underline; }
        .rich-text-content ul, .rich-text-content ol { margin-bottom: 24px; padding-left: 24px; color: var(--ink); opacity: 0.85; line-height: 1.8; font-size: 17px; }
        .rich-text-content h2, .rich-text-content h3, .rich-text-content h4 { font-family: var(--font-fraunces); margin: 32px 0 16px; color: var(--ink); }
        .rich-text-content img { max-width: 100%; height: auto; border-radius: 8px; margin: 24px 0; }
        @media (max-width: 992px) {
          .article-layout {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}} />
    </main>
  );
}
