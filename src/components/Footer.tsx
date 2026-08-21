import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer">
      <div className="layout-wrapper">
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px', paddingBottom: '32px' }}>
          <div>
            <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 600, fontSize: '19px' }}>Mosayane</span>
            <p style={{ fontSize: '14px', opacity: 0.6, margin: '10px 0 0', maxWidth: '32ch' }}>Auteure-compositrice-interprète, Yaoundé, Cameroun.</p>
          </div>
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            <div className="footer-nav-col">
              <span className="footer-nav-title">Navigation</span>
              <Link href="/bio" className="footer-link">Bio</Link>
              <Link href="/music" className="footer-link">Music</Link>
              <Link href="/tour" className="footer-link">Tour</Link>
              <Link href="/contact" className="footer-link">Contact</Link>
            </div>
            <div className="footer-nav-col">
              <span className="footer-nav-title">Suivre</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a href="https://www.facebook.com/mosayaneofficiel" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook" className="footer-social-icon"><svg width="14" height="14" viewBox="0 0 320 512" fill="currentColor"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg></a>
                <a href="https://www.youtube.com/channel/UC0eHii8Hhu3l3Yqe-Yq99kg" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube" className="footer-social-icon"><svg width="16" height="16" viewBox="0 0 576 512" fill="currentColor"><path d="M549.66 124.83c-6.28-23.65-24.79-42.34-48.28-48.68C458.18 64 288 64 288 64S117.82 64 74.62 76.15c-23.5 6.34-42 25.03-48.28 48.68-11.5 43.19-11.5 133.29-11.5 133.29s0 90.1 11.5 133.29c6.28 23.65 24.79 41.5 48.28 47.84C117.82 448 288 448 288 448s170.18 0 213.38-12.15c23.5-6.34 42-24.19 48.28-47.84 11.5-43.19 11.5-133.29 11.5-133.29s0-90.1-11.5-133.29zM232 338.4V173.6L361.2 256z"/></svg></a>
                <a href="https://music.apple.com/us/artist/mosayane-2-claire/1533978227" target="_blank" rel="noopener noreferrer" aria-label="Apple Music" title="Apple Music" className="footer-social-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19 4.66 4.66 0 0 0-1.428-2.437A4.66 4.66 0 0 0 19.888.07 9.23 9.23 0 0 0 17.697 0H6.303C5.573 0 4.909.043 4.112.19c-1.005.194-1.85.598-2.437 1.303C1.036 2.198.62 3.043.427 4.048.19 4.845.147 5.509.147 6.239v11.522c0 .73.043 1.394.28 2.191.194 1.005.61 1.85 1.248 2.554.587.705 1.432 1.11 2.437 1.303.797.148 1.461.19 2.191.19h11.394c.73 0 1.394-.042 2.191-.19 1.005-.193 1.85-.598 2.437-1.303.638-.704 1.054-1.549 1.248-2.554.237-.797.28-1.461.28-2.191V6.239c0-.038-.001-.077-.002-.115zM15.94 5.686c.62-.037 1.108.42 1.15 1.043v9.256c0 1.256-.678 2.107-1.72 2.377-1.02.263-1.99-.226-2.281-1.17-.284-.918.181-1.876 1.13-2.216.406-.145.82-.24 1.24-.313V9.98l-5.65 1.14v6.11c0 1.256-.68 2.107-1.72 2.377-1.02.263-1.99-.226-2.28-1.17-.285-.918.18-1.876 1.13-2.216.405-.145.82-.24 1.24-.313V8.63c0-.51.343-.913.85-1.017l6.16-1.244c.25-.05.5-.086.75-.083z"/></svg></a>
              </div>
            </div>
          </div>
        </div>
        <p style={{ fontSize: '12.5px', opacity: 0.4, margin: '16px 0 0' }}>© 2026 Mosayane 2 Claire.</p>
      </div>
    </footer>
  );
}
