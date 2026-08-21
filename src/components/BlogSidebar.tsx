import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';

export async function BlogSidebar() {
  const recentPosts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  const recentPhotos = await prisma.photo.findMany({
    orderBy: { createdAt: 'desc' },
    take: 4,
  });

  return (
    <aside style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      {/* Recent Posts Widget */}
      <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '20px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
          Articles Récents
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {recentPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id} style={{ display: 'flex', gap: '12px', textDecoration: 'none', color: 'inherit' }} className="group">
              {post.coverImage ? (
                <div style={{ position: 'relative', width: '70px', height: '70px', flexShrink: 0, borderRadius: '6px', overflow: 'hidden' }}>
                  <Image src={post.coverImage} alt={post.title} fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
                </div>
              ) : (
                <div style={{ width: '70px', height: '70px', background: '#eee', borderRadius: '6px', flexShrink: 0 }}></div>
              )}
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 500, margin: '0 0 6px', lineHeight: 1.4, transition: 'color 0.2s' }}>
                  {post.title}
                </h4>
                <div style={{ fontSize: '11px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {post.publishedAt.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Calendar Widget */}
      <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '20px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
          Calendrier
        </h3>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 600, marginBottom: '12px', color: 'var(--accent)' }}>Mars 2024</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', fontSize: '12px', opacity: 0.6, marginBottom: '8px' }}>
            <div>L</div><div>M</div><div>M</div><div>J</div><div>V</div><div>S</div><div>D</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', fontSize: '13px' }}>
            <div style={{ opacity: 0.3 }}>26</div><div style={{ opacity: 0.3 }}>27</div><div style={{ opacity: 0.3 }}>28</div><div style={{ opacity: 0.3 }}>29</div>
            <div>1</div><div>2</div><div>3</div>
            <div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div><div>10</div>
            <div>11</div><div>12</div><div style={{ background: 'var(--accent)', color: '#fff', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>13</div><div>14</div><div>15</div><div>16</div><div>17</div>
            <div>18</div><div>19</div><div>20</div><div>21</div><div>22</div><div>23</div><div>24</div>
            <div>25</div><div>26</div><div>27</div><div>28</div><div>29</div><div>30</div><div>31</div>
          </div>
        </div>
      </div>

      {/* Gallery Widget */}
      <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '20px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
          Galerie
        </h3>
        
        {recentPhotos.length === 0 ? (
          <p style={{ opacity: 0.5, fontSize: '13px' }}>Aucune photo pour le moment.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {recentPhotos.map((photo) => (
              <div key={photo.id} style={{ position: 'relative', aspectRatio: '1', borderRadius: '6px', overflow: 'hidden', background: '#eee' }}>
                <Image src={photo.url} alt={photo.title} fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
              </div>
            ))}
          </div>
        )}
      </div>

    </aside>
  );
}
