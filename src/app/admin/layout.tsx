import Link from 'next/link';
import { ReactNode } from 'react';
import { logout } from '@/app/login/actions';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="section-padding bg-light" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div className="layout-wrapper">
        <h1 className="h1-hero" style={{ marginBottom: '40px' }}>Espace Admin</h1>
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          <aside style={{ flex: '1 1 250px', background: '#fff', padding: '24px', borderRadius: '12px', alignSelf: 'flex-start', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Menu CMS</h2>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/admin" style={{ display: 'block', padding: '10px', textDecoration: 'none', color: '#111', background: '#F7F5F2', borderRadius: '4px', fontWeight: 600 }}>Dashboard</Link>
              <Link href="/admin/bio" style={{ display: 'block', padding: '10px', textDecoration: 'none', color: '#111', background: '#F7F5F2', borderRadius: '4px' }}>Biographie</Link>
              <Link href="/admin/tour" style={{ display: 'block', padding: '10px', textDecoration: 'none', color: '#111', background: '#F7F5F2', borderRadius: '4px' }}>Tournées</Link>
              <Link href="/admin/media" style={{ display: 'block', padding: '10px', textDecoration: 'none', color: '#111', background: '#F7F5F2', borderRadius: '4px' }}>Médias (Musique/Vidéos)</Link>
              <Link href="/admin/blog" style={{ display: 'block', padding: '10px', textDecoration: 'none', color: '#111', background: '#F7F5F2', borderRadius: '4px' }}>Blog (Articles)</Link>
              <Link href="/admin/discographie" style={{ display: 'block', padding: '10px', textDecoration: 'none', color: '#111', background: '#F7F5F2', borderRadius: '4px' }}>Discographie</Link>
              <Link href="/admin/photos" style={{ display: 'block', padding: '10px', textDecoration: 'none', color: '#111', background: '#F7F5F2', borderRadius: '4px' }}>Galerie Photos</Link>
              <Link href="/admin/contact" style={{ display: 'block', padding: '10px', textDecoration: 'none', color: '#111', background: '#F7F5F2', borderRadius: '4px' }}>Messages Contact</Link>
              <Link href="/admin/newsletter" style={{ display: 'block', padding: '10px', textDecoration: 'none', color: '#111', background: '#F7F5F2', borderRadius: '4px' }}>Abonnés Newsletter</Link>
              <form action={logout} style={{ marginTop: '20px' }}>
                <button type="submit" style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px', textDecoration: 'none', color: '#fff', background: '#e11d48', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Déconnexion</button>
              </form>
            </nav>
          </aside>
          <div style={{ flex: '3 1 500px', background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
